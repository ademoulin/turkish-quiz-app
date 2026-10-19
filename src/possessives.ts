import { shuffle } from "./shuffle";
import { latestMistakes } from "./practiceReview";
import type { CaseQuestion, PilotAttempt } from "./casePilot";
/** Newly authored drafts; Yeni Hitit 1 §3.1, printed p.37; Ödkem rule 20.
 * Explicit noun number limits third-person plural ambiguity; not whole noun-phrase production.
 */
export const possessiveConcepts = {
  possessive_ben: "My · benim",
  possessive_sen: "Your · senin",
  possessive_o: "His/her · onun",
  possessive_biz: "Our · bizim",
  possessive_siz: "Your (plural/formal) · sizin",
  possessive_onlar: "Their · onların",
} as const;
export type PossessiveConcept = keyof typeof possessiveConcepts;
export type PossessiveSelection = PossessiveConcept | "mixed";
export interface PossessiveQuestion extends Omit<CaseQuestion, "conceptId"> {
  conceptId: PossessiveConcept;
  owner: string;
  nounNumber: "singular" | "plural";
}
export const possessiveCatalogMapping = {
  testedRule: 20,
  supportingRules: {
    four_way_vowel_harmony: 3,
    two_way_vowel_harmony: 2,
    consonant_softening: 4,
    buffer_s: 8,
  },
  source:
    "Turkish Vocab Quiz - Source Vocab · Ödkem Rules (provided workbook snapshot)",
  textbook: "Yeni Hitit 1 §3.1, printed p.37",
  scope:
    "Produce one possessed noun for an explicit owner and noun number. Third-person plural items require plural possessions; singular possessions and whole genitive–possessive phrases are not assessed.",
} as const;
const rows: Record<string, [string, string, string, string, string[]][]> = {
  ben: [
    [
      "ev",
      "Benim ___ küçük.",
      "evim",
      "Front vowel e selects -im.",
      ["four_way_vowel_harmony"],
    ],
    [
      "araba",
      "Benim ___ temiz.",
      "arabam",
      "Vowel-final araba takes -m directly; no buffer consonant is needed.",
      [],
    ],
    [
      "top",
      "Benim ___ patladı.",
      "topum",
      "Final vowel o selects -um.",
      ["four_way_vowel_harmony"],
    ],
    [
      "göz",
      "Benim sol ___ ağrıyor.",
      "gözüm",
      "Final vowel ö selects -üm.",
      ["four_way_vowel_harmony"],
    ],
  ],
  sen: [
    [
      "kedi",
      "Senin ___ uyuyor.",
      "kedin",
      "Vowel-final kedi takes -n directly; no buffer consonant is needed.",
      [],
    ],
    [
      "kitap",
      "Senin ___ masada.",
      "kitabın",
      "Final vowel a selects -ın; p softens to b before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "çocuk",
      "Senin ___ parkta oynuyor.",
      "çocuğun",
      "Final vowel u selects -un; k softens to ğ before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "gül",
      "Senin ___ çok güzel kokuyor.",
      "gülün",
      "Final vowel ü selects -ün.",
      ["four_way_vowel_harmony"],
    ],
  ],
  o: [
    [
      "kedi",
      "Onun ___ kanepede uyuyor.",
      "kedisi",
      "Final vowel i selects i; vowel-final kedi needs buffer s: kedi-si.",
      ["four_way_vowel_harmony", "buffer_s"],
    ],
    [
      "araba",
      "Onun ___ dışarıda.",
      "arabası",
      "Final vowel a selects ı; vowel-final araba needs buffer s: araba-sı.",
      ["four_way_vowel_harmony", "buffer_s"],
    ],
    [
      "okul",
      "Onun ___ çok uzak.",
      "okulu",
      "Final vowel u selects -u; a consonant-final noun needs no buffer s.",
      ["four_way_vowel_harmony"],
    ],
    [
      "ütü",
      "Onun ___ bozuk.",
      "ütüsü",
      "Final vowel ü selects ü; vowel-final ütü needs buffer s: ütü-sü.",
      ["four_way_vowel_harmony", "buffer_s"],
    ],
  ],
  biz: [
    [
      "ev",
      "Bizim ___ geniş.",
      "evimiz",
      "Final vowel e selects -imiz.",
      ["four_way_vowel_harmony"],
    ],
    [
      "kitap",
      "Bizim ___ kütüphanede.",
      "kitabımız",
      "Final vowel a selects -ımız; p softens to b before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "okul",
      "Bizim ___ bugün kapalı.",
      "okulumuz",
      "Final vowel u selects -umuz.",
      ["four_way_vowel_harmony"],
    ],
    [
      "gül",
      "Bizim ___ çiçek açtı.",
      "gülümüz",
      "Final vowel ü selects -ümüz.",
      ["four_way_vowel_harmony"],
    ],
  ],
  siz: [
    [
      "ev",
      "Sizin ___ burada mı?",
      "eviniz",
      "Final vowel e selects -iniz.",
      ["four_way_vowel_harmony"],
    ],
    [
      "araba",
      "Sizin ___ hazır.",
      "arabanız",
      "After vowel-final araba use -nız; final vowel a selects ı.",
      ["four_way_vowel_harmony"],
    ],
    [
      "okul",
      "Sizin ___ nerede?",
      "okulunuz",
      "Final vowel u selects -unuz.",
      ["four_way_vowel_harmony"],
    ],
    [
      "gül",
      "Sizin ___ çok güzel.",
      "gülünüz",
      "Final vowel ü selects -ünüz.",
      ["four_way_vowel_harmony"],
    ],
  ],
  onlar: [
    [
      "ev",
      "Onların ___ çok büyük.",
      "evleri",
      "Use the requested plural possessed noun: ev-ler-i → evleri. Front vowel e selects -ler; after ler, use i.",
      ["two_way_vowel_harmony", "four_way_vowel_harmony"],
    ],
    [
      "kitap",
      "Onların ___ rafta.",
      "kitapları",
      "Use the requested plural possessed noun: kitap-lar-ı → kitapları. Back vowel a selects -lar; after lar, use ı. The p stays unchanged before l.",
      ["two_way_vowel_harmony", "four_way_vowel_harmony"],
    ],
    [
      "kedi",
      "Onların ___ bahçede oynuyor.",
      "kedileri",
      "Use the requested plural possessed noun: kedi-ler-i → kedileri. Front vowel i selects -ler; after ler, use i.",
      ["two_way_vowel_harmony", "four_way_vowel_harmony"],
    ],
    [
      "kapı",
      "Onların ___ açık.",
      "kapıları",
      "Use the requested plural possessed noun: kapı-lar-ı → kapıları. Back vowel ı selects -lar; after lar, use ı.",
      ["two_way_vowel_harmony", "four_way_vowel_harmony"],
    ],
  ],
};
export const possessiveQuestions: PossessiveQuestion[] = Object.entries(
  rows,
).flatMap(([person, items]) =>
  items.map(([base, sentence, answer, explanation, supportingRuleIds], i) => ({
    id: `possessive-${person}-${String(i + 1).padStart(2, "0")}`,
    conceptId: `possessive_${person}` as PossessiveConcept,
    exerciseType: "typed_form_completion",
    base,
    sentence,
    answer,
    explanation,
    supportingRuleIds,
    owner: possessiveConcepts[`possessive_${person}` as PossessiveConcept],
    nounNumber: person === "onlar" ? "plural" : "singular",
    source: "newly_authored",
    reviewStatus: "draft_needs_independent_review",
  })),
);
export function selectPossessiveQuestions(
  selection: PossessiveSelection,
  random = Math.random,
) {
  if (selection !== "mixed")
    return shuffle(
      possessiveQuestions.filter((q) => q.conceptId === selection),
      random,
    );
  return shuffle(
    (Object.keys(possessiveConcepts) as PossessiveConcept[]).flatMap((c) =>
      shuffle(
        possessiveQuestions.filter((q) => q.conceptId === c),
        random,
      ).slice(0, 2),
    ),
    random,
  );
}
export const possessiveMistakes = (
  attempts: PilotAttempt[],
  selection: PossessiveSelection = "mixed",
) => latestMistakes(possessiveQuestions, attempts, selection);
