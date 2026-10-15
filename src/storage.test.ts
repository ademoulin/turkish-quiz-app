import { test } from "node:test";
import assert from "node:assert/strict";
import { validateImport } from "./storage";
const attempt = {
  id: "a1",
  entryId: "v001",
  kind: "meaning",
  direction: "tr",
  correct: false,
  manual: false,
  answer: "no",
  expected: "gelmek",
  time: "2026-10-15T12:00:00Z",
};
test("valid export round trip preserves results and manual grading", () =>
  assert.deepEqual(
    validateImport({
      version: 1,
      attempts: [{ ...attempt, correct: true, manual: true }],
    }),
    [{ ...attempt, correct: true, manual: true }],
  ));
test("malformed import cannot enter history", () => {
  for (const v of [
    {},
    { version: 2, attempts: [] },
    { version: 1, attempts: [{}] },
    {
      version: 1,
      attempts: [
        { ...attempt, kind: "conjugation", form: { tense: "made up" } },
      ],
    },
  ])
    assert.throws(() => validateImport(v));
});
