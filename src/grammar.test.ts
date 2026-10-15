import { test } from "node:test";
import assert from "node:assert/strict";
import { conjugate, persons, type Tense } from "./grammar";
// Literal reference forms; expected answers are never produced by the conjugator.
const cases: [string, Tense, boolean, boolean, string[]][] = [
  [
    "gelmek",
    "present",
    false,
    false,
    [
      "geliyorum",
      "geliyorsun",
      "geliyor",
      "geliyoruz",
      "geliyorsunuz",
      "geliyorlar",
    ],
  ],
  [
    "gelmek",
    "present",
    true,
    false,
    [
      "gelmiyorum",
      "gelmiyorsun",
      "gelmiyor",
      "gelmiyoruz",
      "gelmiyorsunuz",
      "gelmiyorlar",
    ],
  ],
  [
    "gitmek",
    "past",
    false,
    false,
    ["gittim", "gittin", "gitti", "gittik", "gittiniz", "gittiler"],
  ],
  [
    "gitmek",
    "past",
    true,
    false,
    ["gitmedim", "gitmedin", "gitmedi", "gitmedik", "gitmediniz", "gitmediler"],
  ],
  [
    "gelmek",
    "future",
    false,
    false,
    [
      "geleceğim",
      "geleceksin",
      "gelecek",
      "geleceğiz",
      "geleceksiniz",
      "gelecekler",
    ],
  ],
  [
    "gelmek",
    "future",
    true,
    false,
    [
      "gelmeyeceğim",
      "gelmeyeceksin",
      "gelmeyecek",
      "gelmeyeceğiz",
      "gelmeyeceksiniz",
      "gelmeyecekler",
    ],
  ],
  [
    "gelmek",
    "pastContinuous",
    false,
    false,
    [
      "geliyordum",
      "geliyordun",
      "geliyordu",
      "geliyorduk",
      "geliyordunuz",
      "geliyorlardı",
    ],
  ],
  [
    "gelmek",
    "pastContinuous",
    true,
    false,
    [
      "gelmiyordum",
      "gelmiyordun",
      "gelmiyordu",
      "gelmiyorduk",
      "gelmiyordunuz",
      "gelmiyorlardı",
    ],
  ],
  [
    "gelmek",
    "conditional",
    false,
    false,
    ["gelirsem", "gelirsen", "gelirse", "gelirsek", "gelirseniz", "gelirseler"],
  ],
  [
    "gelmek",
    "conditional",
    true,
    false,
    [
      "gelmezsem",
      "gelmezsen",
      "gelmezse",
      "gelmezsek",
      "gelmezseniz",
      "gelmezseler",
    ],
  ],
  [
    "gelmek",
    "hypothetical",
    false,
    false,
    ["gelsem", "gelsen", "gelse", "gelsek", "gelseniz", "gelseler"],
  ],
  [
    "gelmek",
    "hypothetical",
    true,
    false,
    ["gelmesem", "gelmesen", "gelmese", "gelmesek", "gelmeseniz", "gelmeseler"],
  ],
  [
    "gelmek",
    "aorist",
    false,
    true,
    [
      "gelebilirim",
      "gelebilirsin",
      "gelebilir",
      "gelebiliriz",
      "gelebilirsiniz",
      "gelebilirler",
    ],
  ],
  [
    "gelmek",
    "aorist",
    true,
    true,
    [
      "gelemem",
      "gelemezsin",
      "gelemez",
      "gelemeyiz",
      "gelemezsiniz",
      "gelemezler",
    ],
  ],
  [
    "gelmek",
    "past",
    true,
    true,
    [
      "gelemedim",
      "gelemedin",
      "gelemedi",
      "gelemedik",
      "gelemediniz",
      "gelemediler",
    ],
  ],
  [
    "gelmek",
    "present",
    false,
    true,
    [
      "gelebiliyorum",
      "gelebiliyorsun",
      "gelebiliyor",
      "gelebiliyoruz",
      "gelebiliyorsunuz",
      "gelebiliyorlar",
    ],
  ],
  [
    "gelmek",
    "future",
    true,
    true,
    [
      "gelemeyeceğim",
      "gelemeyeceksin",
      "gelemeyecek",
      "gelemeyeceğiz",
      "gelemeyeceksiniz",
      "gelemeyecekler",
    ],
  ],
  [
    "gelmek",
    "pastContinuous",
    true,
    true,
    [
      "gelemiyordum",
      "gelemiyordun",
      "gelemiyordu",
      "gelemiyorduk",
      "gelemiyordunuz",
      "gelemiyorlardı",
    ],
  ],
];
for (const [verb, tense, negative, ability, expected] of cases)
  persons.forEach((person, i) =>
    test(`${verb} ${tense} ${person} neg=${negative} ability=${ability}`, () =>
      assert.equal(
        conjugate(verb, { tense, person, negative, ability }).answer,
        expected[i],
      )),
  );
const exceptions: [string, Tense, string][] = [
  ["demek", "present", "diyorum"],
  ["yemek", "present", "yiyorum"],
  ["demek", "future", "diyeceğim"],
  ["yemek", "future", "yiyeceğim"],
  ["gitmek", "present", "gidiyorum"],
  ["etmek", "present", "ediyorum"],
  ["hissetmek", "future", "hissedeceğim"],
  ["yardım etmek", "present", "yardım ediyorum"],
  ["karar vermek", "past", "karar verdim"],
  ["anlamak", "present", "anlıyorum"],
  ["söylemek", "present", "söylüyorum"],
  ["okumak", "present", "okuyorum"],
  ["yürümek", "present", "yürüyorum"],
  ["uyumak", "present", "uyuyorum"],
  ["başlamak", "future", "başlayacağım"],
  ["korkmak", "past", "korktum"],
  ["içmek", "past", "içtim"],
  ["konuşmak", "past", "konuştum"],
  ["aramak", "aorist", "ararım"],
  ["beklemek", "aorist", "beklerim"],
  ["yemek", "aorist", "yerim"],
  ["demek", "aorist", "derim"],
];
for (const [v, tense, answer] of exceptions)
  test(`${v} exception ${tense}`, () =>
    assert.equal(
      conjugate(v, { tense, person: "ben", negative: false, ability: false })
        .answer,
      answer,
    ));
test("negative de/ye preserve vowel; ability changes stem", () => {
  assert.equal(
    conjugate("demek", {
      tense: "present",
      person: "ben",
      negative: true,
      ability: false,
    }).answer,
    "demiyorum",
  );
  assert.equal(
    conjugate("yemek", {
      tense: "aorist",
      person: "ben",
      negative: false,
      ability: true,
    }).answer,
    "yiyebilirim",
  );
});
test("third plural accepts explicit-onlar alternatives", () => {
  assert.deepEqual(
    conjugate("gelmek", {
      tense: "pastContinuous",
      person: "onlar",
      negative: false,
      ability: false,
    }).accepted,
    ["geliyorlardı", "geliyordu", "geliyordular"],
  );
});
test("unsupported combinations fail explicitly", () =>
  assert.throws(() =>
    conjugate("gelmek", {
      tense: "conditional",
      person: "ben",
      negative: false,
      ability: true,
    }),
  ));
const harmony: [string, Tense, boolean, boolean, string][] = [
  ["bakmak", "present", false, false, "bakıyorum"],
  ["görmek", "present", false, false, "görüyorum"],
  ["bulmak", "present", false, false, "buluyorum"],
  ["bilmek", "present", false, false, "biliyorum"],
  ["bakmak", "present", true, false, "bakmıyorum"],
  ["görmek", "present", true, false, "görmüyorum"],
  ["bulmak", "present", true, false, "bulmuyorum"],
  ["bilmek", "present", true, false, "bilmiyorum"],
  ["görmek", "past", false, false, "gördüm"],
  ["bulmak", "past", false, false, "buldum"],
  ["bakmak", "past", true, false, "bakmadım"],
  ["görmek", "past", true, false, "görmedim"],
  ["yemek", "past", false, false, "yedim"],
  ["demek", "past", false, false, "dedim"],
  ["yemek", "present", true, false, "yemiyorum"],
  ["demek", "future", true, false, "demeyeceğim"],
  ["yardım etmek", "future", false, false, "yardım edeceğim"],
  ["hissetmek", "present", false, false, "hissediyorum"],
  ["gitmek", "future", false, false, "gideceğim"],
  ["gitmek", "present", true, false, "gitmiyorum"],
  ["gitmek", "aorist", false, true, "gidebilirim"],
  ["gitmek", "aorist", true, true, "gidemem"],
  ["yemek", "present", false, true, "yiyebiliyorum"],
  ["demek", "past", true, true, "diyemedim"],
  ["aramak", "aorist", false, true, "arayabilirim"],
  ["aramak", "aorist", true, true, "arayamam"],
  ["etmek", "hypothetical", false, false, "etsem"],
  ["etmek", "conditional", false, false, "edersem"],
  ["yönetmek", "present", false, false, "yönetiyorum"],
  ["üretmek", "future", false, false, "üreteceğim"],
];
for (const [verb, tense, negative, ability, expected] of harmony)
  test(`harmony and exception: ${expected}`, () =>
    assert.equal(
      conjugate(verb, { tense, negative, ability, person: "ben" }).answer,
      expected,
    ));
test("open conditional plural placement alternatives", () =>
  assert.ok(
    conjugate("gelmek", {
      tense: "conditional",
      person: "onlar",
      negative: false,
      ability: false,
    }).accepted.includes("gelirlerse"),
  ));
