import {
  possessiveConcepts,
  type PossessiveConcept,
  type PossessiveQuestion,
} from "./possessives";
import { latestMistakes } from "./practiceReview";
import { shuffle } from "./shuffle";
/** Newly authored draft exercises; not textbook quotations or tutor-certified content.
 * References: Yeni Hitit 1 §2.2 p.29, §3.2 p.40, §6.1 p.73 (printed pages). Ödkem Rules catalog mapping uses its explicit numeric IDs.
 */
export const concepts = {
  locative: "Locative (-DA)",
  dative: "Dative (-(y)A)",
  ablative: "Ablative (-DAn)",
  accusative: "Accusative (-(y)I)",
  genitive: "Genitive (-(n)In)",
} as const;
export const catalogMapping = {
  concepts: {
    locative: 15,
    dative: 14,
    ablative: 16,
    accusative: 35,
    genitive: 21,
  },
  supportingRules: {
    two_way_vowel_harmony: 2,
    four_way_vowel_harmony: 3,
    buffer_n: 8,
    consonant_softening: 4,
    voiceless_assimilation: 5,
    buffer_y: 8,
  },
  source:
    "Turkish Vocab Quiz - Source Vocab · Ödkem Rules (provided workbook snapshot)",
} as const;
export type Concept = keyof typeof concepts;
export const caseReferences = {
  locative: "Yeni Hitit 1 §2.2, printed p.29",
  dative: "Yeni Hitit 1 §2.2, printed p.29",
  ablative: "Yeni Hitit 1 §2.2, printed p.29",
  accusative: "Yeni Hitit 1 §6.1, printed p.73",
  genitive:
    "Yeni Hitit 1 §3.2, printed p.40; Ödkem 21 is a partial mapping: genitive form only, not whole genitive–possessive construction",
} as const;
export interface CaseQuestion {
  id: string;
  conceptId: Concept;
  exerciseType: "typed_form_completion";
  base: string;
  sentence: string;
  answer: string;
  explanation: string;
  supportingRuleIds: string[];
  reviewStatus: "draft_needs_independent_review";
  source: "newly_authored";
}
const rows: Record<Concept, [string, string, string, string, string[]][]> = {
  locative: [
    [
      "ev",
      "Akşamları ___ dinleniyorum.",
      "evde",
      "Front vowel e selects -de.",
      ["two_way_vowel_harmony"],
    ],
    [
      "okul",
      "Çocuklar ___ ders çalışıyor.",
      "okulda",
      "Back vowel u selects -da.",
      ["two_way_vowel_harmony"],
    ],
    [
      "park",
      "Bugün ___ buluşuyoruz.",
      "parkta",
      "Back vowel a selects a; voiceless k requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "sınıf",
      "Öğrenciler ___ bekliyor.",
      "sınıfta",
      "Back vowel ı selects a; voiceless f requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "mutfak",
      "Annem ___ yemek hazırlıyor.",
      "mutfakta",
      "Back vowel a selects a; voiceless k requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "otobüs",
      "Şimdi ___ oturuyorum.",
      "otobüste",
      "Front vowel ü selects e; voiceless s requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "köy",
      "Dedem ___ yaşıyor.",
      "köyde",
      "Front vowel ö selects -de.",
      ["two_way_vowel_harmony"],
    ],
    [
      "bahçe",
      "Kedi ___ uyuyor.",
      "bahçede",
      "Front vowel e selects -de; no buffer is needed.",
      ["two_way_vowel_harmony"],
    ],
    [
      "iş",
      "Babam şu anda ___.",
      "işte",
      "Front vowel i selects e; voiceless ş requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "masa",
      "Anahtarlar ___ duruyor.",
      "masada",
      "Back vowel a selects -da; no buffer is needed.",
      ["two_way_vowel_harmony"],
    ],
  ],
  dative: [
    [
      "ev",
      "Dersten sonra ___ dönüyorum.",
      "eve",
      "Front vowel e selects -e.",
      ["two_way_vowel_harmony"],
    ],
    [
      "okul",
      "Her sabah ___ yürüyorum.",
      "okula",
      "Back vowel u selects -a.",
      ["two_way_vowel_harmony"],
    ],
    [
      "park",
      "Çocuklar ___ gidiyor.",
      "parka",
      "Back vowel a selects -a; k stays unchanged here.",
      ["two_way_vowel_harmony"],
    ],
    [
      "bahçe",
      "Kedi ___ çıkıyor.",
      "bahçeye",
      "Front vowel e selects e; vowel-final bahçe needs buffer y.",
      ["two_way_vowel_harmony", "buffer_y"],
    ],
    [
      "araba",
      "Şimdi ___ biniyoruz.",
      "arabaya",
      "Back vowel a selects a; vowel-final araba needs buffer y.",
      ["two_way_vowel_harmony", "buffer_y"],
    ],
    [
      "köprü",
      "Yavaşça ___ yaklaşıyoruz.",
      "köprüye",
      "Front vowel ü selects e; vowel-final köprü needs buffer y.",
      ["two_way_vowel_harmony", "buffer_y"],
    ],
    [
      "kapı",
      "Birisi ___ vuruyor.",
      "kapıya",
      "Back vowel ı selects a; vowel-final kapı needs buffer y.",
      ["two_way_vowel_harmony", "buffer_y"],
    ],
    [
      "çocuk",
      "Öğretmen ___ bir soru soruyor.",
      "çocuğa",
      "Back vowel u selects a; final k softens to ğ before the vowel.",
      ["two_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "kitap",
      "Merakla ___ bakıyorum.",
      "kitaba",
      "Back vowel a selects a; final p softens to b before the vowel.",
      ["two_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "müze",
      "Yarın ___ gidiyoruz.",
      "müzeye",
      "Front vowel e selects e; vowel-final müze needs buffer y.",
      ["two_way_vowel_harmony", "buffer_y"],
    ],
  ],
  ablative: [
    [
      "ev",
      "Sabah erkenden ___ çıkıyorum.",
      "evden",
      "Front vowel e selects -den.",
      ["two_way_vowel_harmony"],
    ],
    [
      "okul",
      "Çocuklar ___ geliyor.",
      "okuldan",
      "Back vowel u selects -dan.",
      ["two_way_vowel_harmony"],
    ],
    [
      "park",
      "Akşam ___ dönüyoruz.",
      "parktan",
      "Back vowel a selects a; voiceless k requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "sınıf",
      "Öğrenciler ___ çıkıyor.",
      "sınıftan",
      "Back vowel ı selects a; voiceless f requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "otobüs",
      "Bir sonraki durakta ___ iniyorum.",
      "otobüsten",
      "Front vowel ü selects e; voiceless s requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "iş",
      "Babam saat altıda ___ dönüyor.",
      "işten",
      "Front vowel i selects e; voiceless ş requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
    [
      "köy",
      "Bu sabah ___ geldik.",
      "köyden",
      "Front vowel ö selects -den.",
      ["two_way_vowel_harmony"],
    ],
    [
      "bahçe",
      "Kedi ___ içeri giriyor.",
      "bahçeden",
      "Front vowel e selects -den; no buffer is needed.",
      ["two_way_vowel_harmony"],
    ],
    [
      "kapı",
      "Soğuk hava ___ giriyor.",
      "kapıdan",
      "Back vowel ı selects -dan; no buffer is needed.",
      ["two_way_vowel_harmony"],
    ],
    [
      "ağaç",
      "Sonbaharda yapraklar ___ düşüyor.",
      "ağaçtan",
      "Back vowel a selects a; voiceless ç requires t.",
      ["two_way_vowel_harmony", "voiceless_assimilation"],
    ],
  ],
  accusative: [
    [
      "ev",
      "Bu ___ satın almak istiyorum.",
      "evi",
      "Final vowel e selects -i.",
      ["four_way_vowel_harmony"],
    ],
    [
      "kitap",
      "Bu ___ dün okudum.",
      "kitabı",
      "Final vowel a selects -ı; p softens to b before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "top",
      "Bu ___ kutuya koyuyorum.",
      "topu",
      "Final vowel o selects -u.",
      ["four_way_vowel_harmony"],
    ],
    [
      "göl",
      "Bu ___ çok seviyorum.",
      "gölü",
      "Final vowel ö selects -ü.",
      ["four_way_vowel_harmony"],
    ],
    [
      "kapı",
      "Lütfen şu ___ kapat.",
      "kapıyı",
      "Final vowel ı selects ı; vowel-final kapı needs buffer y.",
      ["four_way_vowel_harmony", "buffer_y"],
    ],
    [
      "kedi",
      "Bahçedeki ___ görüyor musun?",
      "kediyi",
      "Final vowel i selects i; vowel-final kedi needs buffer y.",
      ["four_way_vowel_harmony", "buffer_y"],
    ],
    [
      "köprü",
      "Bu ___ her gün geçiyoruz.",
      "köprüyü",
      "Final vowel ü selects ü; vowel-final köprü needs buffer y.",
      ["four_way_vowel_harmony", "buffer_y"],
    ],
    [
      "araba",
      "Bu ___ park ediyorum.",
      "arabayı",
      "Final vowel a selects ı; vowel-final araba needs buffer y.",
      ["four_way_vowel_harmony", "buffer_y"],
    ],
    [
      "ağaç",
      "Şu ___ görüyor musun?",
      "ağacı",
      "Final vowel a selects -ı; ç softens to c before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "çocuk",
      "Parktaki ___ tanıyorum.",
      "çocuğu",
      "Final vowel u selects -u; k softens to ğ before the vowel.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
  ],
  genitive: [
    [
      "ev",
      "Bu ___ kapısı açık.",
      "evin",
      "Final vowel e selects -in. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony"],
    ],
    [
      "top",
      "Bu ___ rengi sarı.",
      "topun",
      "Final vowel o selects -un. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony"],
    ],
    [
      "göl",
      "Bu ___ suyu çok temiz.",
      "gölün",
      "Final vowel ö selects -ün. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony"],
    ],
    [
      "kız",
      "Şu ___ çantası kırmızı.",
      "kızın",
      "Final vowel ı selects -ın. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony"],
    ],
    [
      "araba",
      "Bu ___ kapısı kilitli.",
      "arabanın",
      "Final vowel a selects ın; vowel-final araba needs buffer n. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "buffer_n"],
    ],
    [
      "kedi",
      "Bu ___ gözleri yeşil.",
      "kedinin",
      "Final vowel i selects in; vowel-final kedi needs buffer n. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "buffer_n"],
    ],
    [
      "köprü",
      "Bu ___ ayakları sağlam.",
      "köprünün",
      "Final vowel ü selects ün; vowel-final köprü needs buffer n. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "buffer_n"],
    ],
    [
      "kitap",
      "Bu ___ kapağı mavi.",
      "kitabın",
      "Final vowel a selects -ın; p softens to b before the vowel. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "çocuk",
      "Bu ___ adı Deniz.",
      "çocuğun",
      "Final vowel u selects -un; k softens to ğ before the vowel. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
    [
      "ağaç",
      "Şu ___ yaprakları sarı.",
      "ağacın",
      "Final vowel a selects -ın; ç softens to c before the vowel. The possessed noun is already supplied; only the genitive form is tested.",
      ["four_way_vowel_harmony", "consonant_softening"],
    ],
  ],
};
export const caseQuestions: CaseQuestion[] = (
  Object.keys(rows) as Concept[]
).flatMap((conceptId) =>
  rows[conceptId].map(
    ([base, sentence, answer, explanation, supportingRuleIds], i) => ({
      id: `case-${conceptId}-${String(i + 1).padStart(2, "0")}`,
      conceptId,
      exerciseType: "typed_form_completion",
      base,
      sentence,
      answer,
      explanation,
      supportingRuleIds,
      reviewStatus: "draft_needs_independent_review",
      source: "newly_authored",
    }),
  ),
);
// Deliberately independent of tolerant conjugation grading. Only case, NFC and edge whitespace normalize.
export const matchesCase = (answer: string, expected: string) =>
  answer.normalize("NFC").trim().toLocaleLowerCase("tr") ===
  expected.normalize("NFC").trim().toLocaleLowerCase("tr");
export type TypedQuestion = CaseQuestion | PossessiveQuestion;
export interface PilotAttempt {
  id: string;
  sessionId: string;
  practiceMode?:
    | "single_case"
    | "mixed_cases"
    | "mistake_review"
    | "single_possessive"
    | "mixed_possessives";
  questionId: string;
  conceptId: Concept | PossessiveConcept;
  owner?: string;
  nounNumber?: "singular" | "plural";
  exerciseType: "typed_form_completion";
  supportingRuleIds: string[];
  answer: string;
  expected: string;
  correct: boolean;
  manual: boolean;
  time: string;
}
export function recordPilot(
  attempts: PilotAttempt[],
  q: TypedQuestion,
  answer: string,
  sessionId: string,
  practiceMode: NonNullable<PilotAttempt["practiceMode"]> = "single_case",
): PilotAttempt[] {
  if (
    !answer.trim() ||
    attempts.some((a) => a.sessionId === sessionId && a.questionId === q.id)
  )
    return attempts;
  return [
    ...attempts,
    {
      id: crypto.randomUUID(),
      sessionId,
      practiceMode,
      questionId: q.id,
      conceptId: q.conceptId,
      ...("owner" in q ? { owner: q.owner, nounNumber: q.nounNumber } : {}),
      exerciseType: q.exerciseType,
      supportingRuleIds: q.supportingRuleIds,
      answer: answer.trim(),
      expected: q.answer,
      correct: matchesCase(answer, q.answer),
      manual: false,
      time: new Date().toISOString(),
    },
  ];
}
export function correctPilot(attempts: PilotAttempt[], id: string) {
  return attempts.map((a) =>
    a.id === id && !a.correct ? { ...a, correct: true, manual: true } : a,
  );
}
export function validatePilotImport(value: unknown): PilotAttempt[] {
  const v = value as { version?: unknown; pilotAttempts?: unknown };
  if (!v || v.version !== 1) throw Error("Invalid progress export.");
  if (v.pilotAttempts === undefined) return [];
  if (!Array.isArray(v.pilotAttempts) || v.pilotAttempts.length > 100000)
    throw Error("Invalid pilot history.");
  return v.pilotAttempts.map((a: PilotAttempt) => {
    if (
      !a ||
      !["id", "sessionId", "questionId", "answer", "expected", "time"].every(
        (k) => typeof a[k as keyof PilotAttempt] === "string",
      ) ||
      !a.id ||
      !a.sessionId ||
      !a.questionId ||
      (a.practiceMode !== undefined &&
        ![
          "single_case",
          "mixed_cases",
          "mistake_review",
          "single_possessive",
          "mixed_possessives",
        ].includes(a.practiceMode)) ||
      (!Object.hasOwn(concepts, a.conceptId) &&
        !Object.hasOwn(possessiveConcepts, a.conceptId)) ||
      (Object.hasOwn(possessiveConcepts, a.conceptId) &&
        (typeof a.owner !== "string" ||
          !a.owner.trim() ||
          a.nounNumber === undefined)) ||
      (a.owner !== undefined && typeof a.owner !== "string") ||
      (a.nounNumber !== undefined &&
        !["singular", "plural"].includes(a.nounNumber)) ||
      a.exerciseType !== "typed_form_completion" ||
      !Array.isArray(a.supportingRuleIds) ||
      !a.supportingRuleIds.every((r) => typeof r === "string") ||
      typeof a.correct !== "boolean" ||
      typeof a.manual !== "boolean" ||
      !Number.isFinite(Date.parse(a.time))
    )
      throw Error("Invalid pilot result.");
    return a;
  });
}

export type CaseSelection = Concept | "mixed";
/** Latest evidence per question; merge duplicate attempt IDs like backup import.
 * Equal timestamps use the later history entry. Unknown questions stay in history,
 * but cannot enter a playable review pool.
 */
export function pilotMistakes(
  attempts: PilotAttempt[],
  selection: CaseSelection = "mixed",
) {
  return latestMistakes(caseQuestions, attempts, selection);
}
/** Keep 12 mixed questions, distributing extras across randomly chosen cases. */
export function selectPilotQuestions(
  selection: CaseSelection,
  random = Math.random,
) {
  if (selection !== "mixed")
    return shuffle(
      caseQuestions.filter((q) => q.conceptId === selection),
      random,
    );
  const cases = shuffle(Object.keys(concepts) as Concept[], random);
  const perCase = Math.floor(12 / cases.length);
  const extras = 12 % cases.length;
  return shuffle(
    cases.flatMap((c, i) =>
      shuffle(
        caseQuestions.filter((q) => q.conceptId === c),
        random,
      ).slice(0, perCase + (i < extras ? 1 : 0)),
    ),
    random,
  );
}
