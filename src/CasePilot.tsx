import {suffixChainConcepts,suffixChainQuestions,selectSuffixChainQuestions,suffixChainMistakes,type SuffixChainSelection} from "./suffixChains";
import {possessedCaseConcepts, possessedCaseQuestions, possessedCaseMistakes, selectPossessedCaseQuestions, type PossessedCaseSelection, type PossessedNumberSelection} from "./possessedCases";
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
const ownerLabels: Record<string,string> = {ben:"ben · I / my", sen:"sen · you / your (singular)", o:"o · he/she / his/her", biz:"biz · we / our", siz:"siz · you / your (plural or formal)", onlar:"onlar · they / their (plural owners)"};
const caseInstructions: Record<Concept,string> = {
 locative:"Add the ending for location: ‘in’, ‘on’ or ‘at’, as the sentence requires.",
 dative:"Add the ending for direction or a target: ‘to’ or ‘toward’.",
 ablative:"Add the ending meaning ‘from’ in this sentence.",
 accusative:"Add the ending that marks the specific thing the action affects (the direct object). It has no single English word equivalent.",
 genitive:"Add the ending meaning ‘of’ or ‘belonging to’. The next word is already supplied; type only the given word with its ending.",
};
const cases: PracticeConfig = {
  guide:<><h4>How to practice</h4><p>Read the required case and the base word. Add the ending and type the complete word into the blank, using Turkish spelling. Do not type the whole sentence.</p><p><strong>Worked example (not scored):</strong> şehir (city), locative (‘in/at’) → <span lang="tr">şehirde</span>. Type şehirde, then press Check typed answer or Enter.</p></>,
  instruction:q=>caseInstructions[q.conceptId as Concept],
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
  guide:<><h4>How to practice</h4><p>Change the base noun to show the stated owner: my, your, his/her, our or their. The prompt tells you whether there is one item or more than one. Type only the complete possessed noun.</p><p><strong>Worked example (not scored):</strong> bilet (ticket) + my, one ticket → <span lang="tr">biletim</span> (my ticket). Type biletim, without benim.</p></>,
  instruction:q=>`Make the base word show this owner: ${possessiveConcepts[q.conceptId as PossessiveConcept]}.`,
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
  guide:<><h4>How to practice</h4><p>Use the two given nouns to say who owns what. Add endings to both nouns and type the complete two-word phrase, keeping the given order.</p><p><strong>Worked example (not scored):</strong> misafir + bavul, ‘the guest’s suitcase’ → <span lang="tr">misafirin bavulu</span>. Type both words, without a sentence.</p></>,
  instruction:()=>"Use both given nouns to express the English meaning below. Type both words with their endings.",
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
 guide:<><h4>How to practice</h4><p>The given word already means my/your/his/her/our/their something. Keep that ownership and add the requested case ending. Type the whole changed word. The prompt states whether the possessions are singular or plural. Keep that number. If two words are given, type both and change only the last word.</p><p><strong>Worked example (not scored):</strong> bavulu (his/her suitcase) + from (ablative) → <span lang="tr">bavulundan</span>. After the third-person possessive ending, use n before the case ending: bavulu + n + dan.</p><p><strong>Plural example (not scored):</strong> bavulları (his/her suitcases, plural possessions) + from → <span lang="tr">bavullarından</span>. Keep the plural ending and add n + dan.</p></>,
 instruction:q=>'requiredCase' in q ? caseInstructions[q.requiredCase] : '',
 id:'possessed-case', region:'Typed possessed case practice',
 title:'Combine endings · Possessive + case',
 description:'72 newly authored draft questions: 48 singular and 24 plural. Add the named case to the supplied possessed form. Keep its owner and number; independent linguistic review pending. Attempts are saved; no mastery rating yet.',
 bank:possessedCaseQuestions, initialSelection:'mixed', selectionLabel:'Required case on possessed noun',
 selections:[{id:'mixed',label:'All four cases'},...Object.entries(possessedCaseConcepts).map(([id,label])=>({id,label}))],
 secondarySelection:{label:'Possessed noun number',initial:'singular',options:[{id:'singular',label:'Singular · 48 questions'},{id:'plural',label:'Plural · 24 questions'},{id:'mixed',label:'Mixed · 72 questions'}]},
 select:(s,n)=>selectPossessedCaseQuestions(s as PossessedCaseSelection,Math.random,(n||'singular') as PossessedNumberSelection),
 mistakes:(a,s,n)=>possessedCaseMistakes(a,s as PossessedCaseSelection,(n||'singular') as PossessedNumberSelection),
 mode:s=>s==='mixed'?'mixed_possessed_cases':'single_possessed_case',
 startLabel:'Start possessed case practice',
 setupHint:(s,n)=>{const total=n==='plural'?24:n==='mixed'?72:48;return `Practice ${s==='mixed'?total:total/4} questions for ${n||'singular'} possessions, shuffled. Each question names the owner, number and required case.`;},
 reviewLabel:'Review possessed case mistakes',
 sessionLabel:m=>m==='mistake_review'?'Reviewing possessed case mistakes':'Case endings on possessed nouns',
 cue:q=>'requiredCase' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 detail:q=>'givenForm' in q ? <p>Given meaning: <strong>{q.givenMeaning}</strong>. Owner: <strong>{ownerLabels[q.owner] || q.owner}</strong>. The given form already includes possession. Possessed noun number: <strong>{q.nounNumber}</strong>. {q.answerScope==='phrase'?'Type the complete phrase; keep its first word unchanged.':'Type the complete inflected word; do not add an owner.'}</p> : null,
 baseLabel:'Given possessed form', answerLabel:'Complete inflected word or phrase',
 completionLabel:'Possessed case session complete',
};
const suffixChains: PracticeConfig = {
 id:'suffix-chain',region:'Build endings from base',title:'Build from base · Number + possessive + case',
 description:'24 newly authored draft questions. Build all the endings from a bare noun using the stated owner, number and case. Independent linguistic review pending. Results are saved separately from Add case only; no mastery rating yet.',
 guide:<><h4>How to practice</h4><p>Start with the base noun. Add plural -lar/-ler only when plural possessions are requested, add the owner’s possessive ending, then add the required case. Type one complete word, without the owner pronoun or a sentence.</p><p><strong>Worked example (not scored):</strong> bavul (suitcase), our, plural, from (ablative) → <span lang="tr">bavullarımızdan</span>. Build it as bavul → bavullar → bavullarımız → bavullarımızdan.</p><p>For their, these questions explicitly request plural possessions. Do not double the plural ending. The correct build-up and explanation appear after you check.</p></>,
 bank:suffixChainQuestions,initialSelection:'mixed',selectionLabel:'Required case to build',
 selections:[{id:'mixed',label:'All four cases'},...Object.entries(suffixChainConcepts).map(([id,label])=>({id,label}))],
 secondarySelection:{label:'Possessed noun number',initial:'mixed',options:[{id:'singular',label:'Singular · 12 questions'},{id:'plural',label:'Plural · 12 questions'},{id:'mixed',label:'Mixed · 24 questions'}]},
 select:(s,n)=>selectSuffixChainQuestions(s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection),
 mistakes:(a,s,n)=>suffixChainMistakes(a,s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection),
 mode:()=> 'build_from_base',startLabel:'Start building from base',
 setupHint:(s,n)=>`Practice ${s==='mixed'?(n==='mixed'?24:12):(n==='mixed'?6:3)} questions. Build every required ending; number and owner are always stated.`,
 reviewLabel:'Review build-from-base mistakes',
 sessionLabel:m=>m==='mistake_review'?'Reviewing build-from-base mistakes':'Building the full ending chain',
 cue:q=>'baseNoun' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 instruction:q=>'baseNoun' in q ? caseInstructions[q.requiredCase] : '',
 detail:q=>'baseNoun' in q ? <p>Base meaning: <strong>{q.baseMeaning}</strong>. Owner: <strong>{ownerLabels[q.owner]}</strong>. Possessed noun number: <strong>{q.nounNumber}</strong>. Build the complete word from the base below. Do not add the owner pronoun.</p> : null,
 baseLabel:'Base noun',answerLabel:'Complete word built from base',completionLabel:'Build-from-base session complete',
};
export function PossessedCasePractice(props: PracticeProps) {
 const [method,setMethod]=React.useState('add-case');
 return <div>
  <label className="field" htmlFor="combined-practice-method">Practice method</label>
  <select id="combined-practice-method" value={method} onChange={e=>setMethod(e.target.value)}>
   <option value="add-case">Add case only</option><option value="build-from-base">Build from base</option>
  </select>
  <p className="hint">Add case only supplies the possessed form. Build from base asks you to produce every ending. You can switch methods and return to your current question while grammar practice stays open.</p>
  <div hidden={method!=='add-case'}><TypedPractice {...props} config={possessedCases} /></div>
  <div hidden={method!=='build-from-base'}><TypedPractice {...props} config={suffixChains} /></div>
 </div>;
}
