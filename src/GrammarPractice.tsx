import {grammarSections,grammarActivities,lessonNavigationGroups,sectionHeading,numberedTitle,type GrammarLessonId} from './grammarNavigation';
import {PracticeHeader} from './PracticeLayout';
import {GrammarProgress} from './GrammarProgress';
import {GrammarRandom} from './GrammarRandom';
import {recordGrammarChoice} from './grammarMultipleChoice';
import {correctPilot} from './casePilot';
import {VerbNounLessons} from './VerbNounLessons';
import {ChooseCase} from './ChooseCase';
import React, { useEffect, useRef, useState } from 'react';
import { activeGrammarQuestions, startSession, submitAnswer, nextQuestion, score, type Session } from './yeniHitit';
import { sectionLabel, skillLabel } from './grammarLabels';
import { CasePilot, PossessivePractice, NounPhrasePractice, PossessedCasePractice, MixedGrammarReview } from './CasePilot';
import type { PilotAttempt } from './casePilot';
export function GrammarPractice({attempts, updateAttempts}: {attempts: PilotAttempt[]; updateAttempts: (update: (a:PilotAttempt[])=>PilotAttempt[])=>void}) {
  const [randomTrigger,setRandomTrigger]=useState(0);
  const mcSession=useRef(''),mcLocked=useRef(false),mcNext=useRef<HTMLButtonElement>(null),mcKeyboard=useRef(false);
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState('cases');
  const [lessonRequest,setLessonRequest]=useState<{lessonId:GrammarLessonId;token:string}>();
  function chooseActivity(value:string){setActivity(value);if(value.startsWith('lesson:'))setLessonRequest({lessonId:value.slice(7) as GrammarLessonId,token:crypto.randomUUID()});}
  const [section, setSection] = useState('');
  const [skill, setSkill] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState('');
  const sections = [...new Set(activeGrammarQuestions.map(q => q.section))].sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
  const skills = [...new Set(activeGrammarQuestions.filter(q => !section || q.section === section).map(q => q.skill_id))].sort();
  const q = session?.questions[session.index];
  const checked = !!(q && session?.answers[q.id] !== undefined);
  const result = session && score(session);
  function startMix(){setActivity('random');setRandomTrigger(n=>n+1);}
  function checkMC(fromKeyboard=false){if(!q||!session||checked||mcLocked.current||!q.options.some(o=>o.id===selected))return;mcLocked.current=true;mcKeyboard.current=fromKeyboard;updateAttempts(a=>recordGrammarChoice(a,q,selected,mcSession.current));setSession(s=>s&&submitAnswer(s,selected));}
  useEffect(()=>{if(activity==='multiple-choice'&&checked)mcNext.current?.focus({preventScroll:!mcKeyboard.current});},[q,checked,activity]);
  return <section className="panel grammar-preview" aria-label="Grammar practice">
    <h2>Grammar practice</h2>
    <p className="hint">Practice Turkish grammar with exercises guided by Yeni Hitit 1, 2 and 3. We use Ödkem’s grammar table to track coverage as we work toward including every concept.</p>
    <details className="content-note"><summary>About this content</summary><p>Includes {activeGrammarQuestions.length} draft multiple-choice questions across {new Set(activeGrammarQuestions.map(q=>q.skill_id)).size} skills, plus focused grammar activities. The original 588-question source bank is preserved. New exercises are authored for this app; linguistic review and coverage mapping are ongoing. Grammar results are saved in this browser. Progress estimates familiarity from your saved results, with details by exercise type.</p></details>
    {!open ? <button className="secondary" onClick={() => setOpen(true)}>Open grammar practice</button> : <>
      <div className="button-row">{activity!=='random'&&activity!=='progress'&&<button className="primary" onClick={startMix}>Start a mix of everything</button>}{activity!=='progress'&&<button className="secondary" onClick={()=>setActivity('progress')}>Your grammar progress</button>}</div>
      <label className="field" htmlFor="grammar-activity">Practice activity</label>
      <select id="grammar-activity" value={activity} onChange={e => chooseActivity(e.target.value)}>
        <option value="random">Mix of everything</option>
        <option value="progress">Your grammar progress</option>
        {grammarSections.map(group=><optgroup key={group.number} label={sectionHeading(group)}>
          {group.number==='1'||group.number==='2'?Object.entries(grammarActivities).filter(([,item])=>item.section===group.number).map(([id,item])=><option key={id} value={id}>{numberedTitle(item)}</option>):lessonNavigationGroups.find(g=>g.number===group.number)!.lessons.map(item=><option key={item.id} value={`lesson:${item.id}`}>{numberedTitle(item)}</option>)}
        </optgroup>)}
        <option value="verb-nouns">All grammar lessons (3–5)</option>
        <option value="mixed-review">Mixed Grammar Review</option>
        <option value="multiple-choice">Grammar Multiple Choice</option>
      </select>
      {activity in grammarActivities&&<p className="exercise-eyebrow">Lesson {grammarActivities[activity as keyof typeof grammarActivities].number}</p>}
      <p className="hint">Choose a numbered lesson or an activity. Choosing another lesson opens its guide; completed answers are saved.</p>
      <div hidden={activity!=='random'}><GrammarRandom attempts={attempts} updateAttempts={updateAttempts} trigger={randomTrigger}/></div>
      <div hidden={activity!=='progress'}><GrammarProgress attempts={attempts} onMix={startMix}/></div>
      <div hidden={activity !== 'verb-nouns'&&!activity.startsWith('lesson:')}><VerbNounLessons attempts={attempts} updateAttempts={updateAttempts} requestedLesson={lessonRequest} onLessonChange={id=>{if(activity.startsWith('lesson:')){setActivity(`lesson:${id}`);setLessonRequest({lessonId:id,token:crypto.randomUUID()});}}} /></div>
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
        <PracticeHeader eyebrow="Grammar Multiple Choice" title={q?skillLabel(q.skill_id):"Session results"} index={q?session.index:undefined} total={session.questions.length} score={`${result!.correct} / ${result!.attempted} correct`}/>
        {q ? <>
          <p className="exercise-instruction">Choose the best answer.</p>
          <form onSubmit={e => {e.preventDefault();checkMC(true);}}>
            <fieldset className="exercise-options" disabled={checked}><legend className="exercise-sentence">{q.prompt}</legend>{q.options.map(o => <label className="word-row" key={o.id}><input type="radio" name="grammar-answer" value={o.id} checked={selected === o.id} onChange={() => setSelected(o.id)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();checkMC(true);}}} /><span lang="tr">{o.text}</span></label>)}</fieldset>
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
