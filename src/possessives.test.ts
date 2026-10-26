import { test } from "node:test";
import assert from "node:assert/strict";
import {
  possessiveQuestions,
  possessiveConcepts,
  selectPossessiveQuestions,
  possessiveMistakes,
  possessiveCatalogMapping,
} from "./possessives";
import {
  caseQuestions,
  recordPilot,
  correctPilot,
  matchesCase,
  validatePilotImport,
  pilotMistakes,
} from "./casePilot";
test("24 stable draft possessive questions, four per owner, explicit noun number and catalog scope", () => {
  assert.ok(possessiveQuestions.length>0);
  assert.equal(
    new Set([...caseQuestions, ...possessiveQuestions].map((q) => q.id)).size,
    74,
  );
  assert.equal(Object.keys(possessiveConcepts).length, 6);
  assert.deepEqual(
    new Set(
      possessiveQuestions.map((q) => q.base.match(/[aeıioöuü]/g)!.at(-1)),
    ),
    new Set("aeıioöuü"),
  );
  for (const c of Object.keys(possessiveConcepts))
    assert.equal(
      possessiveQuestions.filter((q) => q.conceptId === c).length,
      4,
    );
  for (const q of possessiveQuestions) {
    assert.equal(q.reviewStatus, "draft_needs_independent_review");
    assert.equal(q.source, "newly_authored");
    assert.equal(q.exerciseType, "typed_form_completion");
    assert.ok(q.owner);
    assert.ok(q.explanation);
    assert.ok(q.sentence.includes("___"));
    assert.ok(!q.answer.includes(" "));
    assert.equal(
      q.nounNumber,
      q.conceptId === "possessive_onlar" ? "plural" : "singular",
    );
  }
  assert.equal(possessiveCatalogMapping.testedRule, 20);
  assert.match(
    possessiveCatalogMapping.scope,
    /singular possessions.*not assessed/,
  );
});
test("balanced mixed owners and single-owner selection preserve the bank", () => {
  const original = JSON.stringify(possessiveQuestions);
  const mixed = selectPossessiveQuestions("mixed", () => 0.2);
  assert.equal(mixed.length, 12);
  assert.equal(new Set(mixed.map((q) => q.id)).size, 12);
  for (const c of Object.keys(
    possessiveConcepts,
  ) as (keyof typeof possessiveConcepts)[]) {
    assert.equal(mixed.filter((q) => q.conceptId === c).length, 2);
    assert.equal(selectPossessiveQuestions(c).length, 4);
  }
  assert.notDeepEqual(
    mixed.map((q) => q.id),
    selectPossessiveQuestions("mixed", () => 0.9).map((q) => q.id),
  );
  assert.equal(JSON.stringify(possessiveQuestions), original);
});
test("strict possessed-word grading rejects wrong owner, number, pronoun and plain spelling", () => {
  assert.ok(matchesCase("  GÖZÜM  ", "gözüm"));
  assert.ok(matchesCase("gözüm", "gözüm"));
  for (const [wrong, correct] of [
    ["gozum", "gözüm"],
    ["kitapın", "kitabın"],
    ["kediyi", "kedisi"],
    ["kedi", "kedin"],
    ["evim", "evimiz"],
    ["onların evleri", "evleri"],
    ["evi", "evleri"],
    ["ütüsu", "ütüsü"],
    ["arabam.", "arabam"],
  ])
    assert.equal(matchesCase(wrong, correct), false);
});
test("saved possessive evidence round-trips, corrects once and never enters case review", () => {
  const q = possessiveQuestions.find((q) => q.id === "possessive-o-04")!;
  const wrong = recordPilot([], q, "wrong", "p1", "single_possessive");
  assert.equal(
    recordPilot(wrong, q, q.answer, "p1", "single_possessive"),
    wrong,
  );
  const a = wrong[0];
  assert.equal(a.owner, q.owner);
  assert.equal(a.nounNumber, "singular");
  assert.equal(a.conceptId, "possessive_o");
  const loaded = validatePilotImport(
    JSON.parse(JSON.stringify({ version: 1, pilotAttempts: wrong })),
  );
  assert.deepEqual(loaded, wrong);
  assert.deepEqual(possessiveMistakes(loaded), [q]);
  assert.deepEqual(pilotMistakes(loaded), []);
  assert.deepEqual(possessiveMistakes(correctPilot(loaded, a.id)), []);
  const success = {
    ...recordPilot([], q, q.answer, "p2", "mixed_possessives")[0],
    time: "2090-01-01T00:00:00Z",
  };
  assert.deepEqual(possessiveMistakes([...loaded, success]), []);
  const laterMiss = { ...a, id: "later", time: "2091-01-01T00:00:00Z" };
  assert.deepEqual(possessiveMistakes([...loaded, success, laterMiss]), [q]);
  assert.deepEqual(possessiveMistakes([a], "possessive_ben"), []);
  assert.deepEqual(
    possessiveMistakes(recordPilot([], caseQuestions[0], "wrong", "case")),
    [],
  );
  for (const patch of [
    { owner: 123 },
    { owner: undefined },
    { nounNumber: undefined },
    { nounNumber: "both" },
    { practiceMode: "other" },
  ])
    assert.throws(() =>
      validatePilotImport({ version: 1, pilotAttempts: [{ ...a, ...patch }] }),
    );
  // Existing case evidence and backups without optional owner/number/mode fields remain supported.
  const old = recordPilot([], caseQuestions[0], "wrong", "old")[0];
  delete old.practiceMode;
  assert.deepEqual(validatePilotImport({ version: 1, pilotAttempts: [old] }), [
    old,
  ]);
  assert.deepEqual(validatePilotImport({ version: 1, attempts: [] }), []);
});
