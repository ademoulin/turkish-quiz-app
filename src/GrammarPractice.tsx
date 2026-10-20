import {ChooseCase} from './ChooseCase';
import React, { useState } from 'react';
import { bank, startSession, submitAnswer, nextQuestion, score, type Session } from './yeniHitit';
import { sectionLabel, skillLabel } from './grammarLabels';
import { CasePilot, PossessivePractice, NounPhrasePractice, PossessedCasePractice, MixedGrammarReview } from './CasePilot';
import type { PilotAttempt } from './casePilot';
export function GrammarPractice({attempts, updateAttempts}: {attempts: PilotAttempt[]; updateAttempts: (update: (a:PilotAttempt[])=>PilotAttempt[])=>void}) {
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
  return <section className="panel grammar-preview" aria-label="Grammar practice">
    <h2>Yeni Hitit 1 · Grammar practice</h2>
    <p className="hint">588 draft questions across 196 skills. Linguistic review is ongoing. Multiple-choice scores stay in this session only; typed grammar attempts are saved.</p>
    {!open ? <button className="secondary" onClick={() => setOpen(true)}>Open grammar practice</button> : <>
      <label className="field" htmlFor="grammar-activity">Practice activity</label>
      <select id="grammar-activity" value={activity} onChange={e => setActivity(e.target.value)}>
        <option value="cases">Case Forms</option>
        <option value="choose-case">Choose the Case</option>
        <option value="possessives">Typed endings · Possessive forms</option>
        <option value="phrases">Build a noun phrase · Genitive + possessive</option>
        <option value="possessed-cases">Combine endings · Possessive + case</option>
        <option value="mixed-review">Mixed Grammar Review</option>
        <option value="multiple-choice">Grammar Multiple Choice</option>
      </select>
      <p className="hint">Choose one activity. You can switch activities and return to your current question while grammar practice stays open.</p>
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
        <button className="primary" onClick={() => {setSession(startSession(section, skill)); setSelected('');}}>Start grammar practice</button>
      </> : <>
        <p role="status">{result!.correct} / {result!.attempted} correct / attempted</p>
        {q ? <>
          <p>Question {session.index + 1} of {session.questions.length} · Section {q.section} · {skillLabel(q.skill_id)}</p>
          <form onSubmit={e => {e.preventDefault(); if (checked) {setSession(s => s && nextQuestion(s)); setSelected('');} else if (selected) setSession(s => s && submitAnswer(s, selected));}}>
            <fieldset disabled={checked}><legend>{q.prompt}</legend>{q.options.map(o => <label className="word-row" key={o.id}><input type="radio" name="grammar-answer" value={o.id} checked={selected === o.id} onChange={() => setSelected(o.id)} /><span lang="tr">{o.text}</span></label>)}</fieldset>
            {checked && <div className={'feedback ' + (session.answers[q.id] === q.correct_option_id ? 'correct' : 'incorrect')} role="status"><strong>{session.answers[q.id] === q.correct_option_id ? 'Correct.' : 'Incorrect.'}</strong><p lang="tr">Correct answer: {q.options.find(o => o.id === q.correct_option_id)!.text}</p><p>{q.explanation}</p></div>}
            <button className="primary" disabled={!checked && !selected}>{checked ? session.index + 1 === session.questions.length ? 'See grammar results' : 'Next grammar question' : 'Check grammar answer'}</button>
          </form>
          <button className="text-button" onClick={() => setSession(s => s && ({...s, index:s.questions.length}))}>End grammar session</button>
        </> : <h3>Grammar session complete</h3>}
        <button className="secondary" onClick={() => {setSession(null); setSelected('');}}>Restart grammar practice</button>
      </>}
      </div>
      <button className="text-button" onClick={() => {setOpen(false); setSession(null); setSelected('');}}>Close grammar practice</button>
    </>}
  </section>;
}
