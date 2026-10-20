import {possessedCaseConcepts, possessedCaseQuestions, possessedCaseMistakes, selectPossessedCaseQuestions, type PossessedCaseSelection} from "./possessedCases";
import React from "react";
import {
  TypedPractice,
  type PracticeProps,
  type PracticeConfig,
} from "./TypedPractice";
import {
  caseQuestions,
  concepts,
  pilotMistakes,
  selectPilotQuestions,
  type CaseSelection,
  type Concept,
} from "./casePilot";
import {
  possessiveConcepts,
  possessiveQuestions,
  selectPossessiveQuestions,
  possessiveMistakes,
  type PossessiveSelection,
  type PossessiveConcept,
} from "./possessives";
import {
  phraseQuestions,
  phraseMistakes,
  selectPhraseQuestions,
} from "./nounPhrases";
const cases: PracticeConfig = {
  id: "pilot",
  region: "Case Forms",
  title: "Case Forms",
  description:
    "50 newly authored draft questions across five cases; independent linguistic review pending. Type the complete word with Turkish spelling. Attempts are saved; no mastery rating yet.",
  bank: caseQuestions,
  initialSelection: "locative",
  selectionLabel: "Required case",
  selections: [
    { id: "mixed", label: "Mixed cases · 12 questions" },
    ...Object.entries(concepts).map(([id, label]) => ({ id, label })),
  ],
  select: (s) => selectPilotQuestions(s as CaseSelection),
  mistakes: (a, s) => pilotMistakes(a, s as CaseSelection),
  mode: (s) => (s === "mixed" ? "mixed_cases" : "single_case"),
  startLabel: "Start typed case practice",
  setupHint: (s) =>
    s === "mixed"
      ? "Mixed practice: two or three questions per case, shuffled together. Each question still names the required case."
      : "Practice all 10 questions for this case.",
  reviewLabel: "Review grammar mistakes",
  sessionLabel: (m) =>
    m === "mistake_review"
      ? "Reviewing grammar mistakes"
      : m === "mixed_cases"
        ? "Mixed case practice"
        : "Single case practice",
  cue: (q) => `Required case: ${concepts[q.conceptId as Concept]}`,
  answerLabel: "Complete inflected word",
  completionLabel: "Typed case session complete",
};
const possessives: PracticeConfig = {
  id: "possessive",
  region: "Typed possessive practice",
  title: "Typed endings · Possessive forms",
  description:
    "24 newly authored draft questions across six owners, mapped to Ödkem rule 20. Type only the possessed noun for the stated owner and noun number. Independent linguistic review pending. Attempts are saved; no mastery rating yet.",
  bank: possessiveQuestions,
  initialSelection: "possessive_ben",
  selectionLabel: "Required owner",
  selections: [
    { id: "mixed", label: "Mixed owners · 12 questions" },
    ...Object.entries(possessiveConcepts).map(([id, label]) => ({ id, label })),
  ],
  select: (s) => selectPossessiveQuestions(s as PossessiveSelection),
  mistakes: (a, s) => possessiveMistakes(a, s as PossessiveSelection),
  mode: (s) => (s === "mixed" ? "mixed_possessives" : "single_possessive"),
  startLabel: "Start possessive practice",
  setupHint: (s) =>
    s === "mixed"
      ? "Mixed practice: two questions per owner, shuffled together. Each question names the owner and noun number."
      : "Practice all four questions for this owner.",
  reviewLabel: "Review possessive mistakes",
  sessionLabel: (m) =>
    m === "mistake_review"
      ? "Reviewing possessive mistakes"
      : m === "mixed_possessives"
        ? "Mixed possessive practice"
        : "Single owner practice",
  cue: (q) =>
    `Required owner: ${possessiveConcepts[q.conceptId as PossessiveConcept]}`,
  detail: (q) =>
    "nounNumber" in q ? (
      <p>
        Noun number: <strong>{q.nounNumber}</strong>. Type only the possessed
        noun, without the owner.
      </p>
    ) : null,
  answerLabel: "Complete inflected word",
  completionLabel: "Possessive session complete",
};
const phrases: PracticeConfig = {
  id: "noun-phrase",
  region: "Typed noun phrase practice",
  title: "Build a noun phrase · Genitive + possessive",
  description:
    "20 newly authored draft questions, mapped to Ödkem rule 21. Produce both words of the definite genitive–possessive phrase. Independent linguistic review pending. Results are saved; no mastery rating yet.",
  bank: phraseQuestions,
  initialSelection: "genitive_possessive_phrase",
  select: () => selectPhraseQuestions(),
  mistakes: (a) => phraseMistakes(a),
  mode: () => "noun_phrases",
  startLabel: "Start noun phrase practice",
  setupHint: () =>
    "Practice all 20 phrases in shuffled order. Use the supplied nouns and meaning; add endings to both words. Do not add a sentence or a case suffix.",
  reviewLabel: "Review noun phrase mistakes",
  sessionLabel: (m) =>
    m === "mistake_review"
      ? "Reviewing noun phrase mistakes"
      : "Genitive + possessive phrase practice",
  cue: () => "Required construction: definite genitive–possessive phrase",
  detail: () => (
    <p>
      Possessor: <strong>singular</strong> · Possessed item:{" "}
      <strong>singular</strong>.
    </p>
  ),
  sentenceLanguage: "en",
  sentenceLabel: "Meaning: ",
  baseLabel: "Given nouns (possessor + possessed)",
  answerLabel: "Complete Turkish noun phrase",
  completionLabel: "Noun phrase session complete",
};
export function CasePilot(props: PracticeProps) {
  return <TypedPractice {...props} config={cases} />;
}
export function PossessivePractice(props: PracticeProps) {
  return <TypedPractice {...props} config={possessives} />;
}
export function NounPhrasePractice(props: PracticeProps) {
  return <TypedPractice {...props} config={phrases} />;
}

const possessedCases: PracticeConfig = {
 id:'possessed-case', region:'Typed possessed case practice',
 title:'Combine endings · Possessive + case',
 description:'24 newly authored draft questions. Add the named case to the supplied possessed form. Singular possessions only; independent linguistic review pending. Attempts are saved; no mastery rating yet.',
 bank:possessedCaseQuestions, initialSelection:'mixed', selectionLabel:'Required case on possessed noun',
 selections:[{id:'mixed',label:'Mixed cases · 24 questions'},...Object.entries(possessedCaseConcepts).map(([id,label])=>({id,label}))],
 select:s=>selectPossessedCaseQuestions(s as PossessedCaseSelection),
 mistakes:(a,s)=>possessedCaseMistakes(a,s as PossessedCaseSelection),
 mode:s=>s==='mixed'?'mixed_possessed_cases':'single_possessed_case',
 startLabel:'Start possessed case practice',
 setupHint:s=>s==='mixed'?'Practice all 24 questions: six per case, shuffled together. Each question names the required case.':'Practice all six questions for this case on possessed nouns.',
 reviewLabel:'Review possessed case mistakes',
 sessionLabel:m=>m==='mistake_review'?'Reviewing possessed case mistakes':'Case endings on possessed nouns',
 cue:q=>'requiredCase' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 detail:q=>'givenForm' in q ? <p>The given form already includes possession. Possessed item: <strong>singular</strong>. {q.answerScope==='phrase'?'Type the complete phrase; keep its first word unchanged.':'Type the complete inflected word; do not add an owner.'}</p> : null,
 baseLabel:'Given possessed form', answerLabel:'Complete inflected word or phrase',
 completionLabel:'Possessed case session complete',
};
export function PossessedCasePractice(props: PracticeProps) {
 return <TypedPractice {...props} config={possessedCases} />;
}
