import { shuffle } from "./shuffle";
import { latestMistakes } from "./practiceReview";
import type { CaseQuestion, PilotAttempt } from "./casePilot";
/** Newly authored drafts, guided by Yeni Hitit 1 §3.2 printed p.40; Ödkem 21.
 * Singular possessor + singular possessed item, no additional case suffixes.
 */
export const phraseConcepts = {
  genitive_possessive_phrase: "Definite genitive–possessive phrase",
} as const;
export type PhraseConcept = keyof typeof phraseConcepts;
export interface PhraseQuestion extends Omit<
  CaseQuestion,
  "conceptId" | "exerciseType"
> {
  conceptId: PhraseConcept;
  exerciseType: "typed_noun_phrase";
  possessor: string;
  possessed: string;
  possessorNumber: "singular";
  possessedNumber: "singular";
}
export const phraseCatalogMapping = {
  testedRule: 21,
  supportingRules: {
    possessive_ending: 20,
    four_way_vowel_harmony: 3,
    consonant_softening: 4,
    buffer_n: 8,
    buffer_s: 8,
  },
  source:
    "Turkish Vocab Quiz - Source Vocab · Ödkem Rules (provided workbook snapshot)",
  textbook: "Yeni Hitit 1 §3.2, printed p.40",
  scope:
    "Produce both words in a definite genitive–possessive phrase, using the supplied nouns and meaning. Singular possessor and singular possessed item only. Not construction choice, plural noun phrases, case stacking or sentence production.",
} as const;
const rows: [string, string, string, string, string, string[]][] = [
  [
    "çocuk",
    "kitap",
    "the child's book",
    "çocuğun kitabı",
    "Çocuk takes -un with k → ğ: çocuğun. Kitap takes third-person -ı with p → b: kitabı.",
    ["four_way_vowel_harmony", "consonant_softening"],
  ],
  [
    "öğretmen",
    "çanta",
    "the teacher's bag",
    "öğretmenin çantası",
    "Öğretmen takes -in. Çanta takes -sı; vowel-final çanta needs buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "kedi",
    "göz",
    "the cat's eye",
    "kedinin gözü",
    "Kedi takes -nin, with buffer n after the final vowel. Göz takes -ü.",
    ["four_way_vowel_harmony", "buffer_n"],
  ],
  [
    "ev",
    "kapı",
    "the house's door",
    "evin kapısı",
    "Ev takes -in. Kapı takes -sı; vowel-final kapı needs buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "araba",
    "anahtar",
    "the car's key",
    "arabanın anahtarı",
    "Araba takes -nın, with buffer n. Anahtar takes -ı.",
    ["four_way_vowel_harmony", "buffer_n"],
  ],
  [
    "okul",
    "bahçe",
    "the school's garden",
    "okulun bahçesi",
    "Okul takes -un. Bahçe takes -si, with buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "kız",
    "kalem",
    "the girl's pen",
    "kızın kalemi",
    "Kız takes -ın. Kalem takes -i. Each suffix follows its own noun’s last vowel.",
    ["four_way_vowel_harmony"],
  ],
  [
    "adam",
    "çanta",
    "the man's bag",
    "adamın çantası",
    "Adam takes -ın. Çanta takes -sı, with buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "doktor",
    "oda",
    "the doctor's room",
    "doktorun odası",
    "Doktor takes -un because its last vowel is o. Oda takes -sı, with buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "köpek",
    "oyuncak",
    "the dog's toy",
    "köpeğin oyuncağı",
    "Köpek takes -in with k → ğ: köpeğin. Oyuncak takes -ı with k → ğ: oyuncağı.",
    ["four_way_vowel_harmony", "consonant_softening"],
  ],
  [
    "bebek",
    "el",
    "the baby's hand",
    "bebeğin eli",
    "Bebek takes -in with k → ğ: bebeğin. El takes -i.",
    ["four_way_vowel_harmony", "consonant_softening"],
  ],
  [
    "öğrenci",
    "defter",
    "the student's notebook",
    "öğrencinin defteri",
    "Öğrenci takes -nin, with buffer n. Defter takes -i.",
    ["four_way_vowel_harmony", "buffer_n"],
  ],
  [
    "anne",
    "telefon",
    "the mother's phone",
    "annenin telefonu",
    "Anne takes -nin, with buffer n. Telefon takes -u because its last vowel is o.",
    ["four_way_vowel_harmony", "buffer_n"],
  ],
  [
    "baba",
    "araba",
    "the father's car",
    "babanın arabası",
    "Baba takes -nın, with buffer n. Araba takes -sı, with buffer s.",
    ["four_way_vowel_harmony", "buffer_n", "buffer_s"],
  ],
  [
    "arkadaş",
    "ev",
    "the friend's house",
    "arkadaşın evi",
    "Arkadaş takes -ın. Ev takes -i.",
    ["four_way_vowel_harmony"],
  ],
  [
    "komşu",
    "kedi",
    "the neighbor's cat",
    "komşunun kedisi",
    "Komşu takes -nun, with buffer n. Kedi takes -si, with buffer s.",
    ["four_way_vowel_harmony", "buffer_n", "buffer_s"],
  ],
  [
    "göl",
    "kıyı",
    "the lake's shore",
    "gölün kıyısı",
    "Göl takes -ün because its last vowel is ö. Kıyı takes -sı, with buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
  [
    "ağaç",
    "yaprak",
    "the tree's leaf",
    "ağacın yaprağı",
    "Ağaç takes -ın with ç → c: ağacın. Yaprak takes -ı with k → ğ: yaprağı.",
    ["four_way_vowel_harmony", "consonant_softening"],
  ],
  [
    "kuş",
    "kanat",
    "the bird's wing",
    "kuşun kanadı",
    "Kuş takes -un. Kanat takes -ı with t → d: kanadı.",
    ["four_way_vowel_harmony", "consonant_softening"],
  ],
  [
    "gül",
    "koku",
    "the rose's scent",
    "gülün kokusu",
    "Gül takes -ün. Koku takes -su, with buffer s.",
    ["four_way_vowel_harmony", "buffer_s"],
  ],
];
export const phraseQuestions: PhraseQuestion[] = rows.map(
  (
    [possessor, possessed, sentence, answer, explanation, supportingRuleIds],
    i,
  ) => ({
    id: `genitive-possessive-${String(i + 1).padStart(2, "0")}`,
    conceptId: "genitive_possessive_phrase",
    exerciseType: "typed_noun_phrase",
    base: `${possessor} + ${possessed}`,
    sentence,
    answer,
    explanation,
    supportingRuleIds: ["possessive_ending", ...supportingRuleIds],
    possessor,
    possessed,
    possessorNumber: "singular",
    possessedNumber: "singular",
    reviewStatus: "draft_needs_independent_review",
    source: "newly_authored",
  }),
);
/** Spacing is incidental in a two-word phrase; Turkish spelling and word order are not. */
export function matchesPhrase(answer: string, expected: string) {
  const normalize = (s: string) =>
    s.normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase("tr");
  return normalize(answer) === normalize(expected);
}
export const selectPhraseQuestions = (random = Math.random) =>
  shuffle(phraseQuestions, random);
export const phraseMistakes = (attempts: PilotAttempt[]) =>
  latestMistakes(phraseQuestions, attempts);
