import { test } from "node:test";
import assert from "node:assert/strict";
import { familiarityIndex, familiarityFor } from "./familiarity";
import { validateImport, type Attempt } from "./storage";
const answer = (
  i: number,
  correct = true,
  patch: Partial<Attempt> = {},
): Attempt => ({
  id: `a${i}`,
  entryId: "v1",
  kind: "meaning",
  direction: "tr",
  correct,
  manual: false,
  answer: "come",
  expected: "gelmek",
  time: new Date(Date.UTC(2026, 9, 1 + Math.floor(i / 4), i % 4)).toISOString(),
  sessionId: `s${i}`,
  ...patch,
});
const level = (history: Attempt[], direction: "tr" | "en" | "mixed" = "tr") =>
  familiarityFor(familiarityIndex(history), "v1", direction);
test("untested and conjugation-only entries are New", () => {
  assert.equal(level([]), "New");
  assert.equal(level([answer(0, true, { kind: "conjugation" })]), "New");
});
test("first right or wrong answer means Learning", () => {
  assert.equal(level([answer(0)]), "Learning");
  assert.equal(level([answer(0, false)]), "Learning");
});
test("four spaced successes across two days become Familiar", () =>
  assert.equal(level([0, 1, 4, 5].map((i) => answer(i))), "Familiar"));
test("same-day sessions cannot prove lasting recall", () =>
  assert.equal(
    level(
      Array.from({ length: 12 }, (_, i) =>
        answer(i, true, {
          time: new Date(Date.UTC(2026, 9, 1, i)).toISOString(),
        }),
      ),
    ),
    "Learning",
  ));
test("twelve successes across three days become Well known", () =>
  assert.equal(
    level(Array.from({ length: 12 }, (_, i) => answer(i))),
    "Well known",
  ));
test("one slip retains strong knowledge; repeated recent misses lower it", () => {
  const h = Array.from({ length: 12 }, (_, i) => answer(i));
  assert.equal(level([...h, answer(12, false)]), "Well known");
  assert.equal(level([...h, answer(12, false), answer(13, false)]), "Familiar");
  assert.equal(
    level([...h, ...[12, 13, 14, 15].map((i) => answer(i, false))]),
    "Learning",
  );
});
test("repeated attempts in one session cannot inflate knowledge", () =>
  assert.equal(
    level(
      Array.from({ length: 20 }, (_, i) =>
        answer(i, true, { sessionId: "same" }),
      ),
    ),
    "Learning",
  ));
test("a retry does not hide a miss in the same session", () => {
  const history = [0, 1, 4].map((i) => answer(i));
  assert.equal(
    level([...history, answer(5, false), answer(6, true, { sessionId: "s5" })]),
    "Learning",
  );
});
test("manual correction recalculates original attempt once", () => {
  const h = [0, 1, 4].map((i) => answer(i));
  assert.equal(level([...h, answer(5, false)]), "Learning");
  assert.equal(level([...h, answer(5, true, { manual: true })]), "Familiar");
});
test("directions are independent; mixed uses the lower level", () => {
  const h = [0, 1, 4, 5].map((i) => answer(i));
  assert.equal(level(h, "tr"), "Familiar");
  assert.equal(level(h, "en"), "New");
  assert.equal(level(h, "mixed"), "New");
});
test("legacy data is inferred by gaps and still contributes", () =>
  assert.equal(
    level([0, 1, 4, 5].map((i) => answer(i, true, { sessionId: undefined }))),
    "Familiar",
  ));
test("legacy rapid retries stay one session", () =>
  assert.equal(
    level(
      Array.from({ length: 20 }, (_, i) =>
        answer(i, true, {
          sessionId: undefined,
          time: new Date(Date.UTC(2026, 9, 1, 0, i)).toISOString(),
        }),
      ),
    ),
    "Learning",
  ));
test("export/import round trip preserves session evidence and accepts older backups", () => {
  const h = [0, 1, 4, 5].map((i) => answer(i));
  assert.equal(
    level(
      validateImport(JSON.parse(JSON.stringify({ version: 1, attempts: h }))),
    ),
    "Familiar",
  );
  assert.doesNotThrow(() =>
    validateImport({
      version: 1,
      attempts: [answer(0, true, { sessionId: undefined })],
    }),
  );
  assert.throws(() =>
    validateImport({
      version: 1,
      attempts: [answer(0, true, { sessionId: 5 as unknown as string })],
    }),
  );
});
test("history order and duplicate attempt IDs do not inflate familiarity", () => {
  const h = [0, 1, 4, 5].map((i) => answer(i));
  assert.equal(level([...h, ...h].reverse()), "Familiar");
});
test("entry IDs keep histories separate", () => {
  const h = [0, 1, 4, 5].map((i) => answer(i, true, { entryId: "different" }));
  assert.equal(level(h), "New");
});
