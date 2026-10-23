import {personalPronouns,pronounCaseConcepts,pronounCaseQuestions,selectPronounCaseQuestions,pronounCaseMistakes,type PronounCaseSelection} from './pronounCases';
import {mixedGrammarQuestions,mixedGrammarMistakes,selectMixedGrammarQuestions,selectMixedGrammarPool,mixedGrammarFamily} from './mixedGrammar';
import {ownerSelections,type OwnerSelection} from './practiceOwners';
import {suffixChainConcepts,suffixChainQuestions,selectSuffixChainQuestions,suffixChainMistakes,countSuffixChainQuestions,type SuffixChainSelection} from "./suffixChains";
import {possessedCaseConcepts, possessedCaseQuestions, possessedCaseMistakes, selectPossessedCaseQuestions, countPossessedCaseQuestions, type PossessedCaseSelection, type PossessedNumberSelection} from "./possessedCases";
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
const cases: PracticeConfig = {
  guide:<><h4>How to practice</h4><p>Read the required case and the base word. Add the ending and type the complete word into the blank, using Turkish spelling. Do not type the whole sentence.</p><p><strong>Worked example (not scored):</strong> şehir (city), locative (‘in/at’) → <span lang="tr">şehirde</span>. Type şehirde, then press Check typed answer or Enter.</p></>,
  instruction:()=>"Complete the missing word.",
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
  instruction:()=>"Complete the possessed noun.",
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
        Noun number: <strong>{q.nounNumber}</strong>.
      </p>
    ) : null,
  answerLabel: "Complete inflected word",
  completionLabel: "Possessive session complete",
};
const phrases: PracticeConfig = {
  guide:<><h4>How to practice</h4><p>Use the two given nouns to say who owns what. Add endings to both nouns and type the complete two-word phrase, keeping the given order.</p><p><strong>Worked example (not scored):</strong> misafir + bavul, ‘the guest’s suitcase’ → <span lang="tr">misafirin bavulu</span>. Type both words, without a sentence.</p></>,
  instruction:()=>"Complete the two-word noun phrase.",
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
const pronouns:PracticeConfig={
 id:'pronoun-case',region:'Personal pronoun case forms',title:'Case Forms · Personal pronouns',
 description:'24 newly authored draft questions: six personal pronouns across four cases. Type the full pronoun form. Independent linguistic review pending; attempts are saved separately from noun case forms.',
 bank:pronounCaseQuestions,initialSelection:'mixed',selectionLabel:'Required pronoun case',
 selections:[{id:'mixed',label:'All four cases · 24 questions'},...Object.entries(pronounCaseConcepts).map(([id,label])=>({id,label}))],
 select:s=>selectPronounCaseQuestions(s as PronounCaseSelection),
 mistakes:(a,s)=>pronounCaseMistakes(a,s as PronounCaseSelection),
 mode:()=> 'pronoun_cases',startLabel:'Start pronoun case practice',
 setupHint:s=>s==='mixed'?'Practice all 24 forms, shuffled. Every question names the required case and supplies a base pronoun.':'Practice all six pronouns for this case.',
 guide:<><h4>How to practice</h4><p>Read the base pronoun and required case. Type its complete inflected form, without a whole sentence. Locative forms here often mean that something is with a person / in their keeping.</p><p><strong>Worked example (not scored):</strong> ben (I) + dative (to me) → <span lang="tr">bana</span>. This is irregular: do not type bene. The answer and explanation for each practice question appear after checking.</p></>,
 reviewLabel:'Review pronoun case mistakes',sessionLabel:m=>m==='mistake_review'?'Reviewing pronoun case mistakes':'Personal pronoun case practice',
 cue:q=>'pronoun' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 instruction:()=> 'Complete the pronoun form.',
 detail:q=>'pronoun' in q ? <p>Base pronoun meaning: <strong>{personalPronouns[q.pronoun]}</strong>.</p> : null,
 baseLabel:'Base pronoun',answerLabel:'Complete inflected pronoun',completionLabel:'Pronoun case session complete',
};
export function CasePilot(props: PracticeProps) {
 const [wordType,setWordType]=React.useState('nouns');
 return <div>
  <label className="field" htmlFor="case-word-type">Case word type</label>
  <select id="case-word-type" value={wordType} onChange={e=>setWordType(e.target.value)}>
   <option value="nouns">Nouns · 50 questions</option><option value="personal-pronouns">Personal pronouns · 24 questions</option>
  </select>
  <div hidden={wordType!=='nouns'}><TypedPractice {...props} config={cases} /></div>
  <div hidden={wordType!=='personal-pronouns'}><TypedPractice {...props} config={pronouns} /></div>
 </div>;
}
export function PossessivePractice(props: PracticeProps) {
  return <TypedPractice {...props} config={possessives} />;
}
export function NounPhrasePractice(props: PracticeProps) {
  return <TypedPractice {...props} config={phrases} />;
}

const possessedCases: PracticeConfig = {
 guide:<><h4>How to practice</h4><p>Add the required case to the supplied possessed form. Keep its owner and number. If two words are given, type both and change only the last word.</p><p><strong>Worked example (not scored):</strong> bavulu (his/her suitcase) + from (ablative) → <span lang="tr">bavulundan</span>.</p><p><strong>Plural example (not scored):</strong> bavulları (his/her suitcases, plural possessions) + from → <span lang="tr">bavullarından</span>.</p></>,
 instruction:()=> 'Add the required case to the final word.',
 id:'possessed-case', region:'Typed possessed case practice',
 title:'Combine endings · Possessive + case',
 description:'72 newly authored draft questions: 48 singular and 24 plural. Add the named case to the supplied possessed form. Keep its owner and number; independent linguistic review pending. Attempts are saved; no mastery rating yet.',
 bank:possessedCaseQuestions, initialSelection:'mixed', selectionLabel:'Required case on possessed noun',
 selections:[{id:'mixed',label:'All four cases'},...Object.entries(possessedCaseConcepts).map(([id,label])=>({id,label}))],
 secondarySelection:{label:'Possessed noun number',initial:'singular',options:[{id:'singular',label:'Singular · 48 questions'},{id:'plural',label:'Plural · 24 questions'},{id:'mixed',label:'Mixed · 72 questions'}]},
 ownerSelection:{initial:'mixed',options:[...ownerSelections,{id:'named',label:'Named owner · noun phrases'}]},
 count:(s,n,o)=>countPossessedCaseQuestions(s as PossessedCaseSelection,(n||'singular') as PossessedNumberSelection,(o||'mixed') as OwnerSelection),
 select:(s,n,o)=>selectPossessedCaseQuestions(s as PossessedCaseSelection,Math.random,(n||'singular') as PossessedNumberSelection,(o||'mixed') as OwnerSelection),
 mistakes:(a,s,n,o)=>possessedCaseMistakes(a,s as PossessedCaseSelection,(n||'singular') as PossessedNumberSelection,(o||'mixed') as OwnerSelection),
 mode:s=>s==='mixed'?'mixed_possessed_cases':'single_possessed_case',
 startLabel:'Start possessed case practice',
 setupHint:(s,n,o)=>{const count=countPossessedCaseQuestions(s as PossessedCaseSelection,(n||'singular') as PossessedNumberSelection,(o||'mixed') as OwnerSelection);return `Practice ${count} questions for ${n||'singular'} possessions, shuffled. Each question names the owner, number and required case.`;},
 reviewLabel:'Review possessed case mistakes',
 sessionLabel:m=>m==='mistake_review'?'Reviewing possessed case mistakes':'Case endings on possessed nouns',
 cue:q=>'requiredCase' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 detail:q=>'givenForm' in q ? <p>Given meaning: <strong>{q.givenMeaning}</strong>. Owner: <strong>{ownerLabels[q.owner] || q.owner}</strong>. Possessed noun number: <strong>{q.nounNumber}</strong>.</p> : null,
 baseLabel:'Given possessed form', answerLabel:'Complete inflected word or phrase',
 completionLabel:'Possessed case session complete',
};
const suffixChains: PracticeConfig = {
 id:'suffix-chain',region:'Build endings from base',title:'Build from base · Number + possessive + case',
 description:'48 newly authored draft questions. Build all the endings from a bare noun using the stated owner, number and case. Independent linguistic review pending. Results are saved separately from Add case only; no mastery rating yet.',
 guide:<><h4>How to practice</h4><p>Use the stated owner, noun number and case to form one complete word. Omit the owner pronoun.</p><p><strong>Worked example (not scored):</strong> bavul (suitcase), our, plural, from (ablative) → <span lang="tr">bavullarımızdan</span>.</p><p>For their, use the requested plural possessions. Check to see the correct form.</p></>,
 bank:suffixChainQuestions,initialSelection:'mixed',selectionLabel:'Required case to build',
 selections:[{id:'mixed',label:'All four cases'},...Object.entries(suffixChainConcepts).map(([id,label])=>({id,label}))],
 secondarySelection:{label:'Possessed noun number',initial:'mixed',options:[{id:'singular',label:'Singular · 24 questions'},{id:'plural',label:'Plural · 24 questions'},{id:'mixed',label:'Mixed · 48 questions'}]},
 ownerSelection:{initial:'mixed',options:[...ownerSelections]},
 count:(s,n,o)=>countSuffixChainQuestions(s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection,(o||'mixed') as OwnerSelection),
 select:(s,n,o)=>selectSuffixChainQuestions(s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection,Math.random,(o||'mixed') as OwnerSelection),
 mistakes:(a,s,n,o)=>suffixChainMistakes(a,s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection,(o||'mixed') as OwnerSelection),
 mode:()=> 'build_from_base',startLabel:'Start building from base',
 setupHint:(s,n,o)=>`Practice ${countSuffixChainQuestions(s as SuffixChainSelection,(n||'mixed') as PossessedNumberSelection,(o||'mixed') as OwnerSelection)} questions. Build every required ending; number and owner are always stated.`,
 reviewLabel:'Review build-from-base mistakes',
 sessionLabel:m=>m==='mistake_review'?'Reviewing build-from-base mistakes':'Building the full ending chain',
 cue:q=>'baseNoun' in q ? `Required case: ${concepts[q.requiredCase]}` : '',
 instruction:()=> 'Build the word for the stated owner, number and case.',
 detail:q=>'baseNoun' in q ? <p>Base meaning: <strong>{q.baseMeaning}</strong>. Owner: <strong>{ownerLabels[q.owner]}</strong>. Possessed noun number: <strong>{q.nounNumber}</strong>. </p> : null,
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

const mixedGrammar:PracticeConfig={
 id:'mixed-grammar',region:'Mixed Grammar Review',title:'Mixed Grammar Review',
 description:'12-question sessions across six typed exercise families, reusing existing draft questions. Follow the task shown for each question. Results are saved under the original question and concept; independent linguistic review remains pending.',
 guide:<><h4>How to practice</h4><p>Switch between noun case forms, personal pronoun case forms, possessives, two-word noun phrases, adding a case to a supplied form, and building all endings from a base noun. Read the Task heading and requirements before typing. Some questions need one word; noun phrases need both words. Do not type a whole sentence.</p><p><strong>Worked example (not scored):</strong> If the task is Possessive forms, bilet (ticket) + my, singular → <span lang="tr">biletim</span>. Other tasks ask for different endings; follow their stated owner, number and case.</p><p>All questions gives 12 shuffled questions, with two from each family. Previous mistakes reviews up to 12 currently missed questions, with fewer when fewer are available. A correct answer or manual correction updates that question’s existing review history.</p></>,
 bank:mixedGrammarQuestions,initialSelection:'mixed',
 select:()=>selectMixedGrammarQuestions(),
 mistakes:a=>mixedGrammarMistakes(a),
 reviewSelect:questions=>selectMixedGrammarPool(questions),
 reviewMode:'mixed_grammar_review',mode:()=> 'mixed_grammar',
 startLabel:'Start mixed grammar review',
 setupHint:()=> 'All questions · 12 questions, balanced across six exercise families. Previous mistakes uses up to 12 latest missed questions without adding cleared items.',
 reviewLabel:'Review previous grammar mistakes',
 sessionLabel:m=>m==='mixed_grammar_review'?'Reviewing previous grammar mistakes':'Mixed grammar practice',
 questionConfig:typedQuestionConfig,
 cue:()=>'',answerLabel:'Your typed answer',completionLabel:'Mixed grammar session complete',
};
export function MixedGrammarReview(props:PracticeProps){
 return <TypedPractice {...props} config={mixedGrammar} />;
}

/** Shared task instructions for broad random practice; grading stays in recordPilot. */
export function typedQuestionConfig(q:import("./casePilot").TypedQuestion):PracticeConfig{return ({cases,pronoun_cases:pronouns,possessives,phrases,add_case:possessedCases,build_from_base:suffixChains})[mixedGrammarFamily(q)];}
