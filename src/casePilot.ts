import type {NominalCase} from "./verbNounClauseCases";
import {nominalSubjects,type NominalSubject} from "./verbNounSubjects";
import {verbNounConcepts,type VerbNounConcept,type VerbNounLesson,type VerbNounTask} from "./verbNouns";
import {pronounCaseConcepts,personalPronouns,type PersonalPronoun,type PronounCaseConcept,type PronounCaseQuestion} from './pronounCases';
import {suffixChainConcepts, type SuffixChainConcept, type SuffixChainQuestion} from "./suffixChains";
import { possessedCaseConcepts, type PossessedCaseConcept, type PossessedCaseQuestion } from "./possessedCases";
import {
  phraseConcepts,
  matchesPhrase,
  type PhraseConcept,
  type PhraseQuestion,
} from "./nounPhrases";
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
export type TypedQuestion = CaseQuestion | PossessiveQuestion | PhraseQuestion | PossessedCaseQuestion | SuffixChainQuestion | PronounCaseQuestion;
export interface PilotAttempt {
  id: string;
  sessionId: string;
  practiceMode?:
    | "single_case"
    | "mixed_cases"
    | "mistake_review"
    | "single_possessive"
    | "mixed_possessives"
    | "noun_phrases"
    | "single_possessed_case"
    | "mixed_possessed_cases"
    | "build_from_base"
    | "mixed_grammar"
    | "mixed_grammar_review"
    | "pronoun_cases"
    | "choose_case"
    | "verb_noun_lesson";
  questionId: string;
  conceptId: VerbNounConcept | `case_choice_${"locative" | "dative" | "ablative" | "accusative" | "bare"}` | Concept | PossessiveConcept | PhraseConcept | PossessedCaseConcept | SuffixChainConcept | PronounCaseConcept;
  pronoun?: PersonalPronoun;
  temporalPredicate?: "state"|"location";
  temporalRelation?: "before"|"after"|"when"|"while";
  temporalSubject?: NominalSubject;
  mainSubject?: NominalSubject;
  temporalTime?: "past"|"future"|"habitual";
  converbSubject?: NominalSubject;
  converbTime?: "past"|"future"|"habitual";
  relativeForm?: "dik"|"acak";
  relativeHead?: string;
  relativeTime?: "past"|"current"|"habitual"|"future";
  nominalConstruction?: "ma"|"dik"|"acak";
  contentTime?: "past_event"|"habitual_fact"|"future_now"|"future_report";
  negationScope?: "none"|"action"|"main";
  nominalCase?: NominalCase;
  nominalSubject?: NominalSubject;
  lessonId?: VerbNounLesson;
  lessonTask?: VerbNounTask;
  exampleId?: string;
  selectedOptionId?: string;
  expectedOptionId?: string;
  verbPatternId?: string;
  verbLemma?: string;
  selectedCase?: "locative" | "dative" | "ablative" | "accusative" | "bare";
  caseCorrect?: boolean;
  formCorrect?: boolean;
  baseNoun?: string;
  givenForm?: string;
  requiredCase?: Exclude<Concept, "genitive"> | "bare";
  answerScope?: "word" | "phrase";
  possessor?: string;
  possessed?: string;
  possessorNumber?: "singular";
  possessedNumber?: "singular";
  owner?: string;
  nounNumber?: "singular" | "plural";
  exerciseType: "converb_meaning" | "converb_structure" | "typed_converb" | "object_relative_meaning" | "object_relative_structure" | "subject_relative_meaning" | "subject_relative_structure" | "typed_participle" | "verb_noun_meaning" | "verb_noun_structure" | "typed_verb_noun" | "case_choice_completion" | "typed_form_completion" | "typed_noun_phrase" | "typed_possessed_case" | "typed_suffix_chain" | "typed_pronoun_case";
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
      ...("possessor" in q
        ? {
            possessor: q.possessor,
            possessed: q.possessed,
            possessorNumber: q.possessorNumber,
            possessedNumber: q.possessedNumber,
          }
        : {}),
      ...("givenForm" in q ? {givenForm:q.givenForm, requiredCase:q.requiredCase, answerScope:q.answerScope} : {}),
      ...("baseNoun" in q ? {baseNoun:q.baseNoun, requiredCase:q.requiredCase} : {}),
      ...("pronoun" in q ? {pronoun:q.pronoun,requiredCase:q.requiredCase} : {}),
      exerciseType: q.exerciseType,
      supportingRuleIds: q.supportingRuleIds,
      answer: answer.trim(),
      expected: q.answer,
      correct:
        q.exerciseType === "typed_noun_phrase" || (q.exerciseType === "typed_possessed_case" && q.answerScope === "phrase")
          ? matchesPhrase(answer, q.answer)
          : matchesCase(answer, q.answer),
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
          "noun_phrases",
          "single_possessed_case",
          "mixed_possessed_cases",
          "build_from_base",
          "mixed_grammar",
          "mixed_grammar_review",
          "pronoun_cases",
          "choose_case",
          "verb_noun_lesson",
        ].includes(a.practiceMode)) ||
      (!Object.hasOwn(concepts, a.conceptId) &&
        !Object.hasOwn(possessiveConcepts, a.conceptId) &&
        !Object.hasOwn(phraseConcepts, a.conceptId) &&
        !Object.hasOwn(possessedCaseConcepts, a.conceptId) &&
        !Object.hasOwn(suffixChainConcepts, a.conceptId) &&
        !Object.hasOwn(pronounCaseConcepts, a.conceptId) &&
        !Object.hasOwn(verbNounConcepts,a.conceptId) &&
        !["case_choice_locative","case_choice_dative","case_choice_ablative","case_choice_accusative","case_choice_bare"].includes(a.conceptId)) ||
      (Object.hasOwn(possessiveConcepts, a.conceptId) &&
        (typeof a.owner !== "string" ||
          !a.owner.trim() ||
          a.nounNumber === undefined)) ||
      (Object.hasOwn(possessedCaseConcepts, a.conceptId) &&
        (a.exerciseType !== "typed_possessed_case" ||
          typeof a.givenForm !== "string" || !a.givenForm.trim() ||
          !["locative", "dative", "ablative", "accusative"].includes(a.requiredCase || "") ||
          a.conceptId !== `possessed_${a.requiredCase}` ||
          !["word", "phrase"].includes(a.answerScope || "") ||
          (a.answerScope === "phrase") !== a.givenForm.trim().includes(" ") ||
          typeof a.owner !== "string" || !a.owner.trim() || !["singular", "plural"].includes(a.nounNumber || ""))) ||
      (Object.hasOwn(suffixChainConcepts, a.conceptId) &&
        (a.exerciseType !== "typed_suffix_chain" ||
          typeof a.baseNoun !== "string" || !a.baseNoun.trim() || /\s/u.test(a.baseNoun.trim()) ||
          !["locative","dative","ablative","accusative"].includes(a.requiredCase || "") ||
          a.conceptId !== `suffix_chain_${a.requiredCase}` ||
          !["ben","sen","o","biz","siz","onlar"].includes(a.owner || "") ||
          !["singular","plural"].includes(a.nounNumber || ""))) ||
      (Object.hasOwn(pronounCaseConcepts, a.conceptId) &&
        (a.exerciseType !== "typed_pronoun_case" ||
          typeof a.pronoun !== "string" || !Object.hasOwn(personalPronouns,a.pronoun) ||
          !["locative","dative","ablative","accusative"].includes(a.requiredCase || "") ||
          a.conceptId !== `pronoun_${a.requiredCase}`)) ||
      ((a.verbPatternId !== undefined || a.verbLemma !== undefined) &&
        (a.exerciseType !== "case_choice_completion" ||
          typeof a.verbPatternId !== "string" || !/^verb_case_[a-z_]+$/.test(a.verbPatternId) ||
          typeof a.verbLemma !== "string" || !a.verbLemma.trim())) ||
      ((a.temporalPredicate !== undefined || a.temporalRelation !== undefined || a.temporalSubject !== undefined || a.mainSubject !== undefined || a.temporalTime !== undefined || a.converbSubject !== undefined || a.converbTime !== undefined || a.relativeForm !== undefined || a.relativeHead !== undefined || a.relativeTime !== undefined || a.nominalConstruction !== undefined || a.contentTime !== undefined || a.negationScope !== undefined || a.nominalCase !== undefined || a.nominalSubject !== undefined || a.lessonId !== undefined || a.lessonTask !== undefined || a.exampleId !== undefined || a.selectedOptionId !== undefined || a.expectedOptionId !== undefined) &&
        !Object.hasOwn(verbNounConcepts,a.conceptId)) ||
      (a.owner !== undefined && typeof a.owner !== "string") ||
      (a.nounNumber !== undefined &&
        !["singular", "plural"].includes(a.nounNumber)) ||
      (Object.hasOwn(verbNounConcepts,a.conceptId)
        ? !["activity","cases","subjects","clause_cases","negation","content_dik","content_future","contrasts","subject_relatives","object_relatives","converb_ip","converb_arak","converb_madan","temporal_order","temporal_when","temporal_while","state_ken","temporal_contrasts"].includes(a.lessonId || "") ||
          !["meaning","structure","type"].includes(a.lessonTask || "") ||
          a.conceptId !== `vn_${a.lessonId}_${a.lessonTask}` ||
          (a.lessonId === "negation" ? (a.nominalSubject !== undefined && (typeof a.nominalSubject !== "string" || !Object.hasOwn(nominalSubjects,a.nominalSubject))) : ["subjects","clause_cases","content_dik","content_future","contrasts","object_relatives"].includes(a.lessonId || "") ? typeof a.nominalSubject !== "string" || !Object.hasOwn(nominalSubjects,a.nominalSubject) : a.nominalSubject !== undefined) ||
          (a.lessonId === "negation" ? (a.nominalCase !== undefined && (a.nominalCase !== "accusative" || a.nominalSubject === undefined)) : ["content_dik","content_future","contrasts"].includes(a.lessonId || "") ? a.nominalCase !== "accusative" : a.lessonId === "clause_cases" ? !["accusative","dative","ablative"].includes(a.nominalCase || "") : a.nominalCase !== undefined) ||
          (a.lessonId === "negation" ? !["none","action","main"].includes(a.negationScope || "") : a.negationScope !== undefined) ||
          (a.lessonId === "content_dik" ? !["past_event","habitual_fact"].includes(a.contentTime || "") : a.lessonId === "content_future" ? !["future_now","future_report"].includes(a.contentTime || "") : a.contentTime !== undefined) ||
          (a.lessonId === "contrasts" ? !["ma","dik","acak"].includes(a.nominalConstruction || "") : a.nominalConstruction !== undefined) ||
          (a.lessonId === "subject_relatives" ? typeof a.relativeHead !== "string" || !a.relativeHead.trim() || !["past","current","habitual"].includes(a.relativeTime || "") : a.lessonId === "object_relatives" ? typeof a.relativeHead !== "string" || !a.relativeHead.trim() || !["dik","acak"].includes(a.relativeForm || "") || (a.relativeForm === "acak" ? a.relativeTime !== "future" : !["past","current","habitual"].includes(a.relativeTime || "")) : a.relativeHead !== undefined || a.relativeTime !== undefined) ||
          (a.lessonId !== "object_relatives" && a.relativeForm !== undefined) ||
          (["converb_ip","converb_arak","converb_madan"].includes(a.lessonId || "") ? typeof a.converbSubject !== "string" || !Object.hasOwn(nominalSubjects,a.converbSubject) || !["past","future","habitual"].includes(a.converbTime || "") : a.converbSubject !== undefined || a.converbTime !== undefined) ||
          (["temporal_order","temporal_when","temporal_while","state_ken","temporal_contrasts"].includes(a.lessonId || "") ? (a.lessonId === "temporal_order" ? !["before","after"].includes(a.temporalRelation || "") : a.lessonId === "temporal_when" ? a.temporalRelation !== "when" : a.lessonId === "temporal_contrasts" ? !["before","after","when","while"].includes(a.temporalRelation || "") : a.temporalRelation !== "while") || typeof a.temporalSubject !== "string" || !Object.hasOwn(nominalSubjects,a.temporalSubject) || typeof a.mainSubject !== "string" || !Object.hasOwn(nominalSubjects,a.mainSubject) || !["past","future","habitual"].includes(a.temporalTime || "") : a.temporalRelation !== undefined || a.temporalSubject !== undefined || a.mainSubject !== undefined || a.temporalTime !== undefined) ||
          (a.lessonId === "state_ken" ? !["state","location"].includes(a.temporalPredicate || "") : a.temporalPredicate !== undefined) ||
          typeof a.exampleId !== "string" || !a.exampleId.trim() ||
          a.exerciseType !== (["converb_ip","converb_arak","converb_madan","temporal_order","temporal_when","temporal_while","state_ken","temporal_contrasts"].includes(a.lessonId || "") ? (a.lessonTask === "type" ? "typed_converb" : `converb_${a.lessonTask}`) : a.lessonId === "object_relatives" ? (a.lessonTask === "type" ? "typed_participle" : `object_relative_${a.lessonTask}`) : a.lessonId === "subject_relatives" ? (a.lessonTask === "type" ? "typed_participle" : `subject_relative_${a.lessonTask}`) : a.lessonTask === "type" ? "typed_verb_noun" : `verb_noun_${a.lessonTask}`) ||
          (a.lessonTask === "type"
            ? a.selectedOptionId !== undefined || a.expectedOptionId !== undefined || (!a.manual && a.correct !== (a.lessonId === "temporal_contrasts" ? matchesPhrase(a.answer,a.expected) : matchesCase(a.answer,a.expected)))
            : typeof a.selectedOptionId !== "string" || !a.selectedOptionId.trim() ||
              typeof a.expectedOptionId !== "string" || !a.expectedOptionId.trim() ||
              (!a.manual && a.correct !== (a.selectedOptionId === a.expectedOptionId)))
        : a.conceptId.startsWith("case_choice_")
        ? a.exerciseType !== "case_choice_completion" ||
          !["locative","dative","ablative","accusative","bare"].includes(a.requiredCase || "") ||
          a.conceptId !== `case_choice_${a.requiredCase}` ||
          !["locative","dative","ablative","accusative","bare"].includes(a.selectedCase || "") ||
          typeof a.baseNoun !== "string" || !a.baseNoun.trim() ||
          typeof a.caseCorrect !== "boolean" || typeof a.formCorrect !== "boolean" ||
          a.correct !== (a.caseCorrect && a.formCorrect) ||
          (!a.manual && (a.caseCorrect !== (a.selectedCase === a.requiredCase) || a.formCorrect !== matchesCase(a.answer,a.expected)))
        : Object.hasOwn(phraseConcepts, a.conceptId)
        ? a.exerciseType !== "typed_noun_phrase" ||
          typeof a.possessor !== "string" ||
          !a.possessor.trim() ||
          typeof a.possessed !== "string" ||
          !a.possessed.trim() ||
          a.possessorNumber !== "singular" ||
          a.possessedNumber !== "singular"
        : Object.hasOwn(possessedCaseConcepts, a.conceptId)
          ? a.exerciseType !== "typed_possessed_case"
          : Object.hasOwn(suffixChainConcepts, a.conceptId)
            ? a.exerciseType !== "typed_suffix_chain"
            : Object.hasOwn(pronounCaseConcepts, a.conceptId)
              ? a.exerciseType !== "typed_pronoun_case"
              : a.exerciseType !== "typed_form_completion") ||
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
