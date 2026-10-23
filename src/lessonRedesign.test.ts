import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as examples} from './verbNouns';
import {lessonTasks,lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarProgress} from './grammarProgress';
import {grammarItems,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';

test('subject interpretation reads unambiguous agreement, merges redundant modes and keeps all guided production',()=>{
 assert.deepEqual(lessonTasks('subjects'),['meaning','type']);
 const reading=lessonPool('subjects','meaning');assert.equal(reading.length,8);assert.equal(lessonPool('subjects','structure').length,0);
 assert.equal(lessonPool('subjects','type').length,12);
 for(const q of reading){assert.ok(q.id.endsWith('-v2'));assert.ok(['ben','sen','biz','siz'].includes(q.nominalSubject!));assert.ok(!/benim|senin|bizim|sizin/i.test(q.sentence));assert.ok(q.sentence.toLocaleLowerCase('tr').includes(examples.find(e=>e.id===q.exampleId)!.answer));assert.equal(lessonExerciseCopy(q,examples.find(e=>e.id===q.exampleId)!).meaning,undefined);}
 for(let n=0;n<100;n++){const qs=selectLessonQuestions('subjects');assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.exampleId)).size,12);assert.equal(qs.filter(q=>q.task==='meaning').length,6);assert.equal(qs.filter(q=>q.task==='type').length,6);assert.ok(qs.every(q=>q.task!=='structure'));}
 assert.equal(selectLessonQuestions('subjects','meaning').length,8);
});
test('time interpretation reads full Turkish without translation, requested timing or a blanked-out connection',()=>{
 for(const q of bank.filter(q=>q.task==='structure'&&['temporal_contrasts','sentence_building'].includes(q.lessonId))){const e=examples.find(e=>e.id===q.exampleId)!;assert.equal(q.sentence,e.sentence);assert.ok(q.id.endsWith('-v2'));assert.ok(!q.sentence.includes('___'));assert.ok(!q.prompt.includes(e.meaning));const copy=lessonExerciseCopy(q,e);assert.equal(copy.meaning,undefined);assert.equal(copy.timing,undefined);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);assert.ok(!q.options!.some(o=>/-mAdAn|-DIktAn|Linking base/.test(o.text)));for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 for(const q of lessonPool('temporal_contrasts','type')){assert.ok(!q.id.endsWith('-v2'));assert.ok(lessonExerciseCopy(q,examples.find(e=>e.id===q.exampleId)!).timing);}
});
test('earlier exercises survive backups separately from revised evidence and never enter playable review',()=>{
 assert.equal(retired.length,261);assert.equal(new Set([...bank,...retired].map(q=>q.id)).size,bank.length+retired.length);
 const old=retired.map(q=>recordLesson([],q,q.task==='build'?JSON.stringify([q.chunks!.find(c=>!q.expectedChunkIds!.includes(c.id))!.id,...q.expectedChunkIds!.slice(1)]):'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);
 let report=grammarProgress(old);assert.equal(report.unlinked,0);assert.equal(report.concepts.reduce((n,c)=>n+c.legacyChecks,0),261);assert.equal(report.concepts.reduce((n,c)=>n+c.attempts,0),0);
 assert.equal(grammarMistakes(old).length,0);for(const lesson of ['subjects','temporal_contrasts','sentence_building'] as const)assert.equal(lessonMistakes(old,lesson).length,0);
 const q=lessonPool('subjects','meaning')[0],wrong=recordLesson(old,q,'other-1','new'),snapshot=wrong.at(-1)!;assert.equal(grammarMistakes(wrong).length,1);assert.equal(selectGrammarMix(grammarMistakes(wrong))[0].q.id,q.id);
 const fixed=correctPilot(wrong,snapshot.id);assert.equal(fixed.at(-1)!.id,snapshot.id);assert.equal(fixed.at(-1)!.answer,snapshot.answer);assert.equal(fixed.at(-1)!.time,snapshot.time);assert.equal(fixed.length,old.length+1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(grammarMistakes(fixed).length,0);
 report=grammarProgress(fixed);const row=report.concepts.find(c=>c.id==='lesson_subjects')!;assert.equal(row.legacyChecks,24);assert.equal(row.attempts,1);assert.equal(row.modes.meaning!.manual,1);assert.equal(row.modes.meaning!.recentCount,0);assert.equal(row.modes.structure,undefined);
 assert.deepEqual(validatePilotImport({version:1}),[]);
});
test('focused, random and progress share current task availability and stable model identity',()=>{
 const activeIds=new Set(bank.map(q=>q.id));assert.ok(grammarItems.filter(i=>i.kind==='lesson').every(i=>activeIds.has(i.q.id)));
 const row=grammarProgress([]).concepts.find(c=>c.id==='lesson_subjects')!;assert.equal(row.modes.meaning!.available,8);assert.equal(row.modes.typed!.available,12);assert.equal(row.modes.structure,undefined);
 for(let n=0;n<30;n++){const chosen=selectGrammarMix();const models=chosen.filter(i=>i.kind==='lesson').map(i=>i.kind==='lesson'&&i.q.exampleId);assert.equal(new Set(models).size,models.length);assert.ok(chosen.every(i=>!retired.some(q=>q.id===i.q.id)));}
});
