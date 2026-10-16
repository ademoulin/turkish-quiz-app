import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseVocab,
  matchesEnglish,
  matchesTurkish,
  normalize,
  englishAnswers,
  type Entry,
} from "./vocab";
const entry = (turkish: string, meaning: string, override = ""): Entry => ({
  id: turkish,
  turkish,
  type: "vt",
  meaning,
  override,
  case: "",
  caseNotes: "",
});
test("definition alternatives and optional parentheses", () => {
  const e = entry("kızmak", "get angry, be angry (with)");
  for (const a of ["get angry", "be angry", "be angry with", " To get angry! "])
    assert.ok(matchesEnglish(a, e));
  assert.ok(!matchesEnglish("angry", e));
});
test("commas inside notes are not separate answers", () => {
  const e = entry("takmak", "wear (glasses, jewelry); attach");
  assert.ok(!matchesEnglish("jewelry", e));
  assert.ok(matchesEnglish("wear", e));
});
test("override is authoritative", () => {
  const e = entry("varmak", "arrive, reach", "arrive | reach a destination");
  assert.ok(matchesEnglish("arrive", e));
  assert.ok(!matchesEnglish("reach", e));
});
test("Turkish dotted and dotless letters stay distinct", () => {
  assert.equal(normalize("IŞIK", "tr"), "ışık");
  assert.equal(normalize("İYİ", "tr"), "iyi");
  assert.notEqual(normalize("sık", "tr"), normalize("sik", "tr"));
});
test("matching synonyms and de/da both accepted", () => {
  const a = entry("demek", "say"),
    b = entry("söylemek", "say");
  assert.ok(matchesTurkish("SÖYLEMEK!", a, [a, b]));
  assert.ok(!matchesTurkish("soy lemek", a, [a, b]));
  assert.ok(matchesTurkish("da", entry("de / da", "also"), []));
});
test("CSV quoting, blank rows, duplicate IDs and missing rows", () => {
  const r = parseVocab(
    'ID,Verb,Type,Meaning\na,gelmek,vi,"come, arrive"\na,gitmek,vi,go\nb,,vi,empty\n,,,\nc,bina,n,building',
  );
  assert.equal(r.entries.length, 2);
  assert.equal(r.warnings.length, 2);
  assert.equal(r.entries[0].meaning, "come, arrive");
});
test("invalid schema fails instead of replacing cache", () =>
  assert.throws(() => parseVocab("<html>login</html>")));
test("IDs remain the identity after vocabulary edits and sorting", () => {
  const a = parseVocab(
    "ID,Verb,Type,Meaning\nv01,gelmek,vi,come\nv02,bina,n,building",
  );
  const b = parseVocab(
    'ID,Verb,Type,Meaning\nv02,bina,n,building\nv01,gelmek,vi,"come, arrive"',
  );
  assert.equal(a.entries[0].id, b.entries[1].id);
  assert.notEqual(a.entries[0].meaning, b.entries[1].meaning);
});
test("sheet content stays text even when it resembles HTML", () =>
  assert.equal(
    parseVocab("ID,Verb,Type,Meaning\nv01,bina,n,<img src=x onerror=alert(1)>")
      .entries[0].meaning,
    "<img src=x onerror=alert(1)>",
  ));

test('Word header supports the renamed live sheet and legacy aliases', () => {
  for (const header of ['Word', ' word ', 'WORD', 'Verb', 'Turkish']) {
    const parsed = parseVocab(`ID,${header},Type,Meaning\nv1,gelmek,vi,come`);
    assert.equal(parsed.entries[0].turkish, 'gelmek');
    assert.equal(parsed.entries[0].id, 'v1');
  }
});
