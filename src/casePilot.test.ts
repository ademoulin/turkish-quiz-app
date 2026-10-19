import { test } from "node:test";
import assert from "node:assert/strict";
import {
  caseQuestions,
  matchesCase,
  recordPilot,
  correctPilot,
  validatePilotImport,
} from "./casePilot";
import { validateImport, readStore, writeStore } from "./storage";
test("30 stable draft questions, 10 per concept, separate supporting rules", () => {
  assert.equal(caseQuestions.length, 30);
  assert.equal(new Set(caseQuestions.map((q) => q.id)).size, 30);
  for (const concept of ["locative", "dative", "ablative"])
    assert.equal(
      caseQuestions.filter((q) => q.conceptId === concept).length,
      10,
    );
  for (const q of caseQuestions) {
    assert.ok(q.sentence.includes("___"));
    assert.ok(q.explanation);
    assert.equal(q.source, "newly_authored");
    assert.equal(q.reviewStatus, "draft_needs_independent_review");
    assert.ok(q.supportingRuleIds.length);
    assert.ok(matchesCase(q.answer, q.answer));
  }
});
test("NFC, edge whitespace and Turkish capitalization only; all letter distinctions remain", () => {
  assert.ok(matchesCase("  ÇOCUĞA  ", "çocuğa"));
  assert.ok(matchesCase("köyde", "köyde"));
  assert.ok(matchesCase("KAPIDA", "kapıda"));
  for (const [a, b] of [
    ["i", "ı"],
    ["g", "ğ"],
    ["s", "ş"],
    ["c", "ç"],
    ["o", "ö"],
    ["u", "ü"],
  ])
    assert.equal(matchesCase(a, b), false);
  assert.equal(matchesCase("evde.", "evde"), false);
});
test("duplicate submission guarded; correction replaces original evidence", () => {
  const q = caseQuestions[0];
  const a = recordPilot([], q, "wrong", "s");
  assert.equal(a.length, 1);
  assert.equal(a[0].correct, false);
  assert.equal(recordPilot(a, q, q.answer, "s"), a);
  assert.equal(recordPilot(a, q, "  ", "s"), a);
  const corrected = correctPilot(a, a[0].id);
  assert.equal(corrected.length, 1);
  assert.equal(corrected[0].id, a[0].id);
  assert.equal(corrected[0].time, a[0].time);
  assert.equal(corrected[0].manual, true);
  assert.equal(corrected[0].correct, true);
  assert.equal(recordPilot(corrected, q, q.answer, "new").length, 2);
});
test("old and new backups; validation is atomic before merging", () => {
  const pilot = recordPilot([], caseQuestions[0], "wrong", "s");
  assert.deepEqual(validatePilotImport({ version: 1, attempts: [] }), []);
  const payload = JSON.parse(
    JSON.stringify({ version: 1, attempts: [], pilotAttempts: pilot }),
  );
  assert.deepEqual(validateImport(payload), []);
  assert.deepEqual(validatePilotImport(payload), pilot);
  for (const patch of [
    { conceptId: "bad" },
    { exerciseType: "single_select" },
    { time: "bad" },
    { correct: "yes" },
    { supportingRuleIds: null },
  ])
    assert.throws(() =>
      validatePilotImport({
        ...payload,
        pilotAttempts: [{ ...pilot[0], ...patch }],
      }),
    );
  const memory = new Map<string, string>();
  Object.assign(globalThis, {
    localStorage: {
      getItem: (k: string) => memory.get(k),
      setItem: (k: string, v: string) => memory.set(k, v),
    },
  });
  const store = readStore();
  writeStore({ ...store, pilotAttempts: pilot });
  assert.deepEqual(readStore().pilotAttempts, pilot);
});

test("mixed pool is balanced, randomized, unique and leaves bank unchanged", async () => {
  const { selectPilotQuestions } = await import("./casePilot");
  const before = JSON.stringify(caseQuestions);
  const pool = selectPilotQuestions("mixed", () => 0.25);
  assert.equal(pool.length, 12);
  assert.equal(new Set(pool.map((q) => q.id)).size, 12);
  for (const c of ["locative", "dative", "ablative"] as const) {
    assert.equal(pool.filter((q) => q.conceptId === c).length, 4);
    assert.equal(selectPilotQuestions(c).length, 10);
  }
  assert.notDeepEqual(
    pool.map((q) => q.id),
    selectPilotQuestions("mixed", () => 0.8).map((q) => q.id),
  );
  assert.equal(JSON.stringify(caseQuestions), before);
});
test("review uses latest evidence per question, corrections, imports and case filter", async () => {
  const { pilotMistakes } = await import("./casePilot");
  const q = caseQuestions[0],
    other = caseQuestions[10];
  const a = recordPilot([], q, "wrong", "s1")[0];
  const b = {
    ...recordPilot([], q, q.answer, "s2")[0],
    time: "2090-01-01T00:00:00Z",
  };
  const c = {
    ...recordPilot([], q, "wrong", "s3")[0],
    time: "2091-01-01T00:00:00Z",
  };
  assert.deepEqual(pilotMistakes([]), []);
  assert.deepEqual(pilotMistakes([a]), [q]);
  assert.deepEqual(pilotMistakes([b, a]), []);
  assert.deepEqual(pilotMistakes([a, b, c]), [q]);
  assert.deepEqual(pilotMistakes(correctPilot([a, b, c], c.id)), []);
  assert.deepEqual(pilotMistakes(correctPilot([a, b, c], a.id)), [q]);
  const d = recordPilot([], other, "wrong", "d")[0];
  assert.deepEqual(pilotMistakes([a, a, d], "locative"), [q]);
  assert.deepEqual(pilotMistakes([a, d], "dative"), [other]);
  assert.deepEqual(pilotMistakes([a, { ...a, correct: true }]), []);
  assert.deepEqual(pilotMistakes([{ ...a, questionId: "deleted" }]), []);
  assert.deepEqual(
    pilotMistakes(validatePilotImport({ version: 1, pilotAttempts: [a, d] })),
    [q, other],
  );
});
test("practice mode is optional in old backups and retained in new evidence", () => {
  const a = recordPilot(
    [],
    caseQuestions[0],
    "wrong",
    "review",
    "mistake_review",
  )[0];
  assert.equal(a.practiceMode, "mistake_review");
  assert.equal(
    validatePilotImport({ version: 1, pilotAttempts: [a] })[0].practiceMode,
    "mistake_review",
  );
  const { practiceMode, ...old } = a;
  assert.deepEqual(validatePilotImport({ version: 1, pilotAttempts: [old] }), [
    old,
  ]);
  assert.throws(() =>
    validatePilotImport({
      version: 1,
      pilotAttempts: [{ ...a, practiceMode: "bad" }],
    }),
  );
});
