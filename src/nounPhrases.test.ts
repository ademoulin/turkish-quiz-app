import { test } from "node:test";
import assert from "node:assert/strict";
import {
  phraseQuestions,
  phraseCatalogMapping,
  selectPhraseQuestions,
  matchesPhrase,
  phraseMistakes,
} from "./nounPhrases";
import {
  caseQuestions,
  recordPilot,
  correctPilot,
  validatePilotImport,
  pilotMistakes,
  matchesCase,
} from "./casePilot";
import { possessiveQuestions, possessiveMistakes } from "./possessives";
test("20 unique draft phrases explicitly target one possessor and one possessed item", () => {
  assert.ok(phraseQuestions.length>0);
  assert.equal(
    new Set(
      [...caseQuestions, ...possessiveQuestions, ...phraseQuestions].map(
        (q) => q.id,
      ),
    ).size,
    94,
  );
  for (const q of phraseQuestions) {
    assert.equal(q.conceptId, "genitive_possessive_phrase");
    assert.equal(q.exerciseType, "typed_noun_phrase");
    assert.equal(q.possessorNumber, "singular");
    assert.equal(q.possessedNumber, "singular");
    assert.equal(q.base, `${q.possessor} + ${q.possessed}`);
    assert.equal(q.answer.split(" ").length, 2);
    assert.ok(q.sentence);
    assert.ok(q.explanation);
    assert.equal(q.source, "newly_authored");
    assert.equal(q.reviewStatus, "draft_needs_independent_review");
  }
  assert.equal(phraseCatalogMapping.testedRule, 21);
  assert.match(phraseCatalogMapping.scope, /Not construction choice/);
});
test("phrase grading normalizes Unicode, Turkish capitalization and spacing only", () => {
  assert.ok(matchesPhrase("  ÇOCUĞUN  KİTABI  ", "çocuğun kitabı"));
  assert.ok(matchesPhrase("köpeğin\t\n oyuncağı", "köpeğin oyuncağı"));
  for (const wrong of [
    "çocuk kitabı",
    "çocuğun kitap",
    "kitabı çocuğun",
    "cocugun kitabi",
    "çocuğun kitabı.",
    "onun çocuğun kitabı",
    "çocuğunkitabı",
  ])
    assert.equal(matchesPhrase(wrong, "çocuğun kitabı"), false);
  for (const [a, b] of [
    ["i", "ı"],
    ["g", "ğ"],
    ["s", "ş"],
    ["c", "ç"],
    ["o", "ö"],
    ["u", "ü"],
  ])
    assert.equal(matchesPhrase(`bir ${a}`, `bir ${b}`), false);
  assert.equal(matchesCase("ev  de", "evde"), false);
});
test("phrase sessions shuffle all 20 without repeats or content mutation", () => {
  const before = JSON.stringify(phraseQuestions);
  const a = selectPhraseQuestions(() => 0.2),
    b = selectPhraseQuestions(() => 0.8);
  assert.ok(a.length>0);
  assert.equal(new Set(a.map((q) => q.id)).size,a.length);
  assert.notDeepEqual(
    a.map((q) => q.id),
    b.map((q) => q.id),
  );
  assert.equal(JSON.stringify(phraseQuestions), before);
});
test("phrase evidence, correction and review remain separate and backup compatible", () => {
  const q = phraseQuestions[0];
  const bad = recordPilot([], q, "wrong", "p1", "noun_phrases");
  assert.equal(recordPilot(bad, q, q.answer, "p1", "noun_phrases"), bad);
  const a = bad[0];
  assert.equal(a.exerciseType, "typed_noun_phrase");
  assert.equal(a.possessor, q.possessor);
  assert.equal(a.possessed, q.possessed);
  assert.equal(a.possessorNumber, "singular");
  assert.equal(a.possessedNumber, "singular");
  const good = recordPilot(
    [],
    q,
    "  çocuğun   kitabı  ",
    "p2",
    "noun_phrases",
  )[0];
  assert.equal(good.correct, true);
  const cases = recordPilot([], caseQuestions[0], "wrong", "c")[0];
  const poss = recordPilot(
    [],
    possessiveQuestions[0],
    "wrong",
    "s",
    "single_possessive",
  )[0];
  const loaded = validatePilotImport(
    JSON.parse(JSON.stringify({ version: 1, pilotAttempts: [a, cases, poss] })),
  );
  assert.deepEqual(phraseMistakes(loaded), [q]);
  assert.deepEqual(pilotMistakes(loaded), [caseQuestions[0]]);
  assert.deepEqual(possessiveMistakes(loaded), [possessiveQuestions[0]]);
  const corrected = correctPilot(loaded, a.id);
  assert.equal(corrected.length, 3);
  assert.equal(corrected[0].time, a.time);
  assert.equal(corrected[0].manual, true);
  assert.deepEqual(phraseMistakes(corrected), []);
  assert.deepEqual(
    phraseMistakes([a, { ...good, time: "2090-01-01T00:00:00Z" }]),
    [],
  );
  for (const patch of [
    { exerciseType: "typed_form_completion" },
    { possessor: undefined },
    { possessed: "" },
    { possessorNumber: "plural" },
    { possessedNumber: "plural" },
  ])
    assert.throws(() =>
      validatePilotImport({ version: 1, pilotAttempts: [{ ...a, ...patch }] }),
    );
  assert.throws(() =>
    validatePilotImport({
      version: 1,
      pilotAttempts: [{ ...cases, exerciseType: "typed_noun_phrase" }],
    }),
  );
  assert.deepEqual(validatePilotImport({ version: 1, attempts: [] }), []);
});
