import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bank,activeGrammarQuestions as active,retiredGrammarQuestions as retired,validateBank,selectQuestions,submitAnswer,score} from './yeniHitit';
import {applyMcRevisions} from './grammarMcRevisions';
import {recordGrammarChoice,mcConcept} from './grammarMultipleChoice';
import {grammarItems,grammarMistakes,selectGrammarMix,recordGrammarItem} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
import {validatePilotImport,correctPilot} from './casePilot';
const revised=active.filter(q=>q.replacesQuestionId),skill='YH1-12-01-S03';
test('five authored MC revisions preserve the 588 originals and unchanged questions',()=>{
 assert.equal(revised.length,5);assert.equal(retired.length,180);validateBank(bank);
 assert.deepEqual(revised.map(q=>q.id),['YH1-V11-Q038-v2','YH1-V13-Q034-v2','YH1-V52-Q015-v2','YH1-V64-Q019-v2','YH1-V64-Q020-v2']);
 assert.deepEqual(revised.map(q=>q.options.find(o=>o.id===q.correct_option_id)!.text),['çalışmakta','öğrenmek','içmekten','yürümeye','yüzmekten']);
 assert.ok(bank.questions.every(q=>!q.id.endsWith('-v2')));
 for(const q of revised){const old=retired.find(o=>o.id===q.replacesQuestionId)!;assert.equal(old.skill_id,q.skill_id);assert.equal(old.section,q.section);assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.notEqual(old.prompt,q.prompt);}
 const unchanged=bank.questions.filter(q=>!retired.includes(q));assert.equal(unchanged.length,408);
 for(const q of unchanged)assert.equal(active.find(a=>a.id===q.id),q);
 const copy=structuredClone(bank.questions),snapshot=structuredClone(copy);applyMcRevisions(copy);assert.deepEqual(copy,snapshot);
});
test('focused and random MC share revised IDs, filters, answer keys and single scoring',()=>{
 assert.equal(selectQuestions('12.1').length,9);assert.deepEqual(new Set(selectQuestions('',skill).map(q=>q.id)),new Set(revised.filter(q=>q.skill_id===skill).map(q=>q.id)));
 assert.ok(grammarItems.every(i=>!retired.some(q=>q.id===i.q.id)));
 const items=grammarItems.filter(i=>i.kind==='multiple_choice'&&i.q.skill_id===skill);assert.equal(items.length,3);assert.equal(selectGrammarMix(items).length,1);
 for(const q of selectQuestions('12.1','',()=>0.2))for(const o of q.options){
  const session=submitAnswer({questions:[q],index:0,answers:{}},o.id);assert.equal(score(session).correct,o.id===q.correct_option_id?1:0);assert.equal(submitAnswer(session,q.correct_option_id),session);
  const a=recordGrammarChoice([],q,o.id,'s');assert.equal(a[0].correct,o.id===q.correct_option_id);assert.equal(a[0].questionId,q.id);assert.equal(a[0].conceptId,mcConcept(q.skill_id));assert.equal(recordGrammarChoice(a,q,q.correct_option_id,'s'),a);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
 }
 const item=items[0];if(item.kind!=='multiple_choice')throw Error('MC');const a=recordGrammarItem([],item,item.q.correct_option_id,'random','');assert.equal(a[0].sessionKind,'random_grammar');assert.equal(a[0].questionId,item.q.id);
});
test('earlier MC evidence imports as legacy, while new misses and corrections keep original snapshots',()=>{
 const history=retired.map(q=>recordGrammarChoice([],q,q.options.find(o=>o.id!==q.correct_option_id)!.id,'old-'+q.id)[0]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);assert.deepEqual(validatePilotImport({version:1}),[]);
 const report=grammarProgress(history),row=report.concepts.find(c=>c.id===mcConcept(skill))!;
 assert.equal(report.unlinked,0);assert.equal(row.legacyChecks,3);assert.equal(row.attempts,0);assert.equal(row.modes.recognition!.available,3);assert.equal(grammarMistakes(history).length,0);assert.equal(report.concepts.find(c=>c.id===mcConcept('YH1-12-01-S02'))!.legacyChecks,2);
 const q=revised.find(q=>q.skill_id===skill)!,wrong=recordGrammarChoice(history,q,'A','new'),a=wrong.at(-1)!;assert.equal(grammarMistakes(wrong)[0].q.id,q.id);
 const fixed=correctPilot(wrong,a.id),last=fixed.at(-1)!;assert.equal(last.manual,true);assert.equal(last.correct,true);
 for(const k of ['id','time','sessionId','questionId','conceptId','answer','expected','selectedOptionId','expectedOptionId'] as const)assert.equal(last[k],a[k]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(grammarMistakes(fixed).length,0);
 const progress=grammarProgress(fixed).concepts.find(c=>c.id===mcConcept(skill))!;assert.equal(progress.legacyChecks,3);assert.equal(progress.attempts,1);assert.equal(progress.modes.recognition!.manual,1);assert.equal(progress.modes.recognition!.recentCount,0);
 const other=bank.questions.find(q=>!retired.includes(q))!,unaffected=recordGrammarChoice([],other,other.correct_option_id,'other');assert.equal(grammarProgress(unaffected).concepts.find(c=>c.id===mcConcept(other.skill_id))!.attempts,1);
 const unknown={...history[0],id:'unknown',questionId:'unknown-old-mc'};assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[unknown]}),[unknown]);assert.equal(grammarProgress([unknown]).unlinked,1);
});
test('MC scope preserves source objects and keeps retired-only history out of practice',()=>{
 const original=applyMcRevisions(bank.questions);
 assert.equal(active.length,413);assert.equal(retired.length,180);
 assert.equal(new Set([...active,...retired].map(q=>q.id)).size,593);
 for(const q of original.active){
  assert.deepEqual([...active,...retired].find(x=>x.id===q.id),q);
 }
 for(const id of ['YH1-V58-Q002','YH1-V14-Q012','YH1-V70-Q002'])assert.ok(retired.some(q=>q.id===id));
 assert.ok(active.some(q=>q.id==='YH1-V70-Q001'));
 assert.equal(selectQuestions('','YH1-04-01-S01').length,0);
 const old=retired.find(q=>q.skill_id==='YH1-04-01-S01')!;
 const attempts=recordGrammarChoice([],old,old.options.find(o=>o.id!==old.correct_option_id)!.id,'retired');
 const report=grammarProgress(attempts),row=report.concepts.find(c=>c.id===mcConcept(old.skill_id))!;
 assert.equal(report.unlinked,0);assert.equal(row.legacyChecks,1);assert.deepEqual(row.modes,{});assert.equal(row.attempts,0);
 assert.equal(grammarMistakes(attempts).length,0);
 const fixed=correctPilot(attempts,attempts[0].id);
 assert.equal(fixed[0].id,attempts[0].id);assert.equal(fixed[0].correct,true);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
});
