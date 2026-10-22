import {GrammarProgress} from './GrammarProgress';
import {GrammarRandom} from './GrammarRandom';
import {recordGrammarChoice} from './grammarMultipleChoice';
import {correctPilot} from './casePilot';
import {VerbNounLessons} from './VerbNounLessons';
import {ChooseCase} from './ChooseCase';
import React, { useEffect, useRef, useState } from 'react';
import { bank, startSession, submitAnswer, nextQuestion, score, type Session } from './yeniHitit';
import { sectionLabel, skillLabel } from './grammarLabels';
import { CasePilot, PossessivePractice, NounPhrasePractice, PossessedCasePractice, MixedGrammarReview } from './CasePilot';
import type { PilotAttempt } from './casePilot';
export function GrammarPractice({attempts, updateAttempts}: {attempts: PilotAttempt[]; updateAttempts: (update: (a:PilotAttempt[])=>PilotAttempt[])=>void}) {
  const [randomTrigger,setRandomTrigger]=useState(0);
  const mcSession=useRef(''),mcLocked=useRef(false),mcNext=useRef<HTMLButtonElement>(null),mcKeyboard=useRef(false);
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState('cases');
  const [section, setSection] = useState('');
  const [skill, setSkill] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState('');
  const sections = [...new Set(bank.questions.map(q => q.section))].sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
  const skills = [...new Set(bank.questions.filter(q => !section || q.section === section).map(q => q.skill_id))].sort();
  const q = session?.questions[session.index];
  const checked = !!(q && session?.answers[q.id] !== undefined);
  const result = session && score(session);
  function startMix(){setActivity('random');setRandomTrigger(n=>n+1);}
  function checkMC(fromKeyboard=false){if(!q||!session||checked||mcLocked.current||!q.options.some(o=>o.id===selected))return;mcLocked.current=true;mcKeyboard.current=fromKeyboard;updateAttempts(a=>recordGrammarChoice(a,q,selected,mcSession.current));setSession(s=>s&&submitAnswer(s,selected));}
  useEffect(()=>{if(activity==='multiple-choice'&&checked)mcNext.current?.focus({preventScroll:!mcKeyboard.current});},[q,checked,activity]);
  return <section className="panel grammar-preview" aria-label="Grammar practice">
    <h2>Yeni Hitit 1 · Grammar practice</h2>
    <p className="hint">588 draft questions across 196 skills. Linguistic review is ongoing. Grammar results are saved in this browser, including new Grammar Multiple Choice checks. Progress shows evidence by exercise type, without mastery ratings.</p>
    {!open ? <button className="secondary" onClick={() => setOpen(true)}>Open grammar practice</button> : <>
      <div className="button-row">{activity!=='random'&&activity!=='progress'&&<button className="primary" onClick={startMix}>Start a mix of everything</button>}{activity!=='progress'&&<button className="secondary" onClick={()=>setActivity('progress')}>Your grammar progress</button>}</div>
      <label className="field" htmlFor="grammar-activity">Practice activity</label>
      <select id="grammar-activity" value={activity} onChange={e => setActivity(e.target.value)}>
        <option value="random">Mix of everything</option>
        <option value="progress">Your grammar progress</option>
        <option value="cases">Case Forms</option>
        <option value="choose-case">Choose the Case</option>
        <option value="verb-nouns">Verb nouns and clauses</option>
        <option value="possessives">Typed endings · Possessive forms</option>
        <option value="phrases">Build a noun phrase · Genitive + possessive</option>
        <option value="possessed-cases">Combine endings · Possessive + case</option>
        <option value="mixed-review">Mixed Grammar Review</option>
        <option value="multiple-choice">Grammar Multiple Choice</option>
      </select>
      <p className="hint">Choose one activity. You can switch activities and return to your current question while grammar practice stays open.</p>
      <div hidden={activity!=='random'}><GrammarRandom attempts={attempts} updateAttempts={updateAttempts} trigger={randomTrigger}/></div>
      <div hidden={activity!=='progress'}><GrammarProgress attempts={attempts} onMix={startMix}/></div>
      <div hidden={activity !== 'verb-nouns'}><VerbNounLessons attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'choose-case'}><ChooseCase attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'cases'}><CasePilot attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'possessives'}><PossessivePractice attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'phrases'}><NounPhrasePractice attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'possessed-cases'}><PossessedCasePractice attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'mixed-review'}><MixedGrammarReview attempts={attempts} updateAttempts={updateAttempts} /></div>
      <div hidden={activity !== 'multiple-choice'}>
      {!session ? <>
        <section aria-label="How to practice"><h4>How to practice</h4><p>Choose a section or skill, or leave both set to All. Start a session, select one answer, then press Check grammar answer. The answer and explanation appear after checking.</p><p><strong>Worked example (not scored):</strong> Choose the Turkish word meaning ‘we’: ben / biz. Select biz, then check. Ben means ‘I’.</p></section>
        <label className="field" htmlFor="grammar-section">Section</label><select id="grammar-section" value={section} onChange={e => {setSection(e.target.value); setSkill('');}}><option value="">All sections</option>{sections.map(s => <option key={s} value={s}>{sectionLabel(s)}</option>)}</select>
        <label className="field" htmlFor="grammar-skill">Skill</label><select id="grammar-skill" value={skill} onChange={e => setSkill(e.target.value)}><option value="">All skills</option>{skills.map(s => <option key={s} value={s}>{skillLabel(s)}</option>)}</select>
        <button className="primary" onClick={() => {mcSession.current=crypto.randomUUID();mcLocked.current=false;setSession(startSession(section, skill)); setSelected('');}}>Start grammar practice</button>
      </> : <>
        <p role="status">{result!.correct} / {result!.attempted} correct / attempted</p>
        {q ? <>
          <p>Question {session.index + 1} of {session.questions.length} · Section {q.section} · {skillLabel(q.skill_id)}</p>
          <form onSubmit={e => {e.preventDefault();checkMC(true);}}>
            <fieldset disabled={checked}><legend>{q.prompt}</legend>{q.options.map(o => <label className="word-row" key={o.id}><input type="radio" name="grammar-answer" value={o.id} checked={selected === o.id} onChange={() => setSelected(o.id)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();checkMC(true);}}} /><span lang="tr">{o.text}</span></label>)}</fieldset>
            <button type="button" className="primary" disabled={checked||!selected} onClick={e=>checkMC(e.detail===0)}>{checked?'Answer checked':'Check grammar answer'}</button>
            {checked && <div className={'feedback ' + (session.answers[q.id] === q.correct_option_id ? 'correct' : 'incorrect')} role="status"><strong>{session.answers[q.id] === q.correct_option_id ? 'Correct.' : 'Incorrect.'}</strong><p lang="tr">Correct answer: {q.options.find(o => o.id === q.correct_option_id)!.text}</p><p>{q.explanation}</p>{attempts.some(a=>a.sessionId===mcSession.current&&a.questionId===q.id&&a.manual)&&<p>Marked correct by you.</p>}</div>}
            {checked&&<>{session.answers[q.id]!==q.correct_option_id&&<button type="button" className="secondary" onClick={()=>{const attempt=attempts.find(a=>a.sessionId===mcSession.current&&a.questionId===q.id);if(attempt)updateAttempts(a=>correctPilot(a,attempt.id));setSession(s=>s&&({...s,answers:{...s.answers,[q.id]:q.correct_option_id}}));}}>My answer was correct</button>}<button type="button" className="primary" ref={mcNext} onClick={()=>{setSession(s=>s&&nextQuestion(s));setSelected('');mcLocked.current=false;}}>{session.index+1===session.questions.length?'See grammar results':'Next grammar question'}</button></>}
          </form>
          <button className="text-button" onClick={() => setSession(s => s && ({...s, index:s.questions.length}))}>End grammar session</button>
        </> : <h3>Grammar session complete</h3>}
        <button className="secondary" onClick={() => {setSession(null); setSelected('');}}>Restart grammar practice</button>
      </>}
      </div>
      <button className="text-button" onClick={() => {setOpen(false); setRandomTrigger(0); setSession(null); setSelected('');}}>Close grammar practice</button>
    </>}
  </section>;
}
