import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as examples} from './verbNouns';
import {lessonTasks,lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarProgress} from './grammarProgress';
import {grammarItems,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';

test('lessons 3.1–3.5 retain productive tasks and retire 68 exact meaning versions',()=>{
 const lessons=['activity','cases','action_forms','subjects','clause_cases'] as const;
 // Retired meaning questions are preserved without fixing a total that changes as lessons evolve.
 assert.ok(retired.some(q=>lessons.includes(q.lessonId as typeof lessons[number])&&q.task==='meaning'));
 for(const lesson of lessons){assert.equal(lessonPool(lesson,'meaning').length,0);assert.equal(selectLessonQuestions(lesson,'meaning').length,0);}
 assert.deepEqual(lessonTasks('subjects'),['type']);
 for(let n=0;n<30;n++){const qs=selectLessonQuestions('subjects');assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.exampleId)).size,12);assert.ok(qs.every(q=>q.task==='type'));}
});
test('time interpretation reads full Turkish without translation, requested timing or a blanked-out connection',()=>{
 for(const q of bank.filter(q=>q.task==='structure'&&!q.id.startsWith('vn58-expand-')&&['temporal_contrasts','sentence_building'].includes(q.lessonId))){const e=examples.find(e=>e.id===q.exampleId)!;assert.equal(q.sentence,e.sentence);assert.ok(q.id.endsWith('-v2'));assert.ok(!q.sentence.includes('___'));assert.ok(!q.prompt.includes(e.meaning));const copy=lessonExerciseCopy(q,e);assert.equal(copy.meaning,undefined);assert.equal(copy.timing,undefined);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);assert.ok(!q.options!.some(o=>/-mAdAn|-DIktAn|Linking base/.test(o.text)));for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 for(const q of lessonPool('temporal_contrasts','type')){assert.ok(!q.id.endsWith('-v2'));assert.ok(lessonExerciseCopy(q,examples.find(e=>e.id===q.exampleId)!).timing);}
});
test('earlier exercises survive backups separately from revised evidence and never enter playable review',()=>{
 assert.ok(retired.length>0);assert.equal(new Set([...bank,...retired].map(q=>q.id)).size,bank.length+retired.length);
 const old=retired.map(q=>recordLesson([],q,q.task==='build'?JSON.stringify([q.chunks!.find(c=>!q.expectedChunkIds!.includes(c.id))!.id,...q.expectedChunkIds!.slice(1)]):'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);
 let report=grammarProgress(old);assert.equal(report.unlinked,0);assert.equal(report.concepts.reduce((n,c)=>n+c.legacyChecks,0),retired.length);assert.equal(report.concepts.reduce((n,c)=>n+c.attempts,0),0);
 assert.equal(grammarMistakes(old).length,0);for(const lesson of ['subjects','temporal_contrasts','sentence_building'] as const)assert.equal(lessonMistakes(old,lesson).length,0);
 const q=lessonPool('subjects','type')[0],wrong=recordLesson(old,q,'wrong','new'),snapshot=wrong.at(-1)!;assert.equal(grammarMistakes(wrong).length,1);assert.equal(selectGrammarMix(grammarMistakes(wrong))[0].q.id,q.id);
 const fixed=correctPilot(wrong,snapshot.id);assert.equal(fixed.at(-1)!.id,snapshot.id);assert.equal(fixed.at(-1)!.answer,snapshot.answer);assert.equal(fixed.at(-1)!.time,snapshot.time);assert.equal(fixed.length,old.length+1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(grammarMistakes(fixed).length,0);
 report=grammarProgress(fixed);const row=report.concepts.find(c=>c.id==='lesson_subjects')!;assert.equal(row.legacyChecks,retired.filter(q=>q.lessonId==='subjects').length);assert.equal(row.attempts,1);assert.equal(row.modes.typed!.manual,1);assert.equal(row.modes.typed!.recentCount,0);assert.equal(row.modes.structure,undefined);
 assert.deepEqual(validatePilotImport({version:1}),[]);
});
test('focused, random and progress share current task availability and stable model identity',()=>{
 const activeIds=new Set(bank.map(q=>q.id));assert.ok(grammarItems.filter(i=>i.kind==='lesson').every(i=>activeIds.has(i.q.id)));
 const row=grammarProgress([]).concepts.find(c=>c.id==='lesson_subjects')!;assert.equal(row.modes.meaning,undefined);assert.equal(row.modes.typed!.available,lessonPool('subjects','type').length);assert.equal(row.modes.structure,undefined);
 for(let n=0;n<30;n++){const chosen=selectGrammarMix();const models=chosen.filter(i=>i.kind==='lesson').map(i=>i.kind==='lesson'&&i.q.exampleId);assert.equal(new Set(models).size,models.length);assert.ok(chosen.every(i=>!retired.some(q=>q.id===i.q.id)));}
});
test('batch 2 keeps application modes and versions nominalizer word choices separately from old schema choices',()=>{
 for(const lesson of ['negation','content_dik','content_future','noun_clause_building'] as const){assert.deepEqual(lessonTasks(lesson),[lesson==='noun_clause_building'?'build':'type']);assert.ok(lessonPool(lesson).length>0);}
 assert.deepEqual(lessonTasks('contrasts'),['structure','type']);
 const old=retired.filter(q=>q.lessonId==='contrasts'&&q.task==='structure');assert.ok(old.length>0);
 for(const q of lessonPool('contrasts','structure').filter(q=>!q.id.startsWith('vn8-expand-'))){
  assert.equal(q.id,old.find(o=>o.exampleId===q.exampleId)!.id+'-v2');assert.equal(q.expected,lessonPool('contrasts','type').find(t=>t.exampleId===q.exampleId)!.expected);
  assert.equal(q.optionLanguage,'tr');assert.ok(q.options!.every(o=>!/[ +]/.test(o.text)));
  for(const option of q.options!)assert.equal(recordLesson([],q,option.id,'choice')[0].correct,option.id==='target');
 }
 const history=old.map(q=>recordLesson([],q,'other-1','earlier-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);
 const row=grammarProgress(history).concepts.find(c=>c.id==='lesson_contrasts')!;assert.equal(row.legacyChecks,old.length);assert.equal(row.attempts,0);assert.equal(row.modes.structure!.attempts,0);assert.equal(grammarMistakes(history).length,0);
});
test('5.6 has active while overlap practice and retired results remain available',()=>{
 assert.deepEqual(lessonTasks('temporal_while'),['structure','type']);assert.equal(selectLessonQuestions('temporal_while').length,12);
 const old=retired.filter(q=>q.lessonId==='temporal_while');assert.ok(old.length>0);
 const history=old.map(q=>recordLesson([],q,q.task==='type'?q.expected:'target','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);
 const report=grammarProgress(history),row=report.concepts.find(c=>c.id==='lesson_temporal_while')!;assert.equal(report.unlinked,0);assert.equal(row.legacyChecks,old.length);assert.equal(row.attempts,0);assert.equal(row.modes.structure?.available,lessonPool('temporal_while','structure').length);assert.equal(row.modes.typed?.available,lessonPool('temporal_while','type').length);assert.equal(grammarMistakes(history).length,0);
 assert.ok(lessonPool('temporal_contrasts','type').some(q=>q.temporalRelation==='while'));
 assert.ok(lessonPool('sentence_building','build').some(q=>q.temporalRelation==='while'));
 for(const id of ['converb_ip','converb_arak','converb_madan','temporal_order','temporal_when','temporal_while','state_ken','temporal_contrasts'] as const){assert.deepEqual(lessonTasks(id),['converb_ip','converb_arak','converb_madan','temporal_order','temporal_when','temporal_while','state_ken','temporal_contrasts'].includes(id)?['structure','type']:['type']);assert.ok(lessonPool(id).length>0);}
 assert.deepEqual(lessonTasks('sentence_building'),['build']);
});
