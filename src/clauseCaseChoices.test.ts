import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions,verbNounExamples,retiredLessonQuestions} from './verbNouns';
import {lessonPool,lessonTasks,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarItems,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
import {validatePilotImport,correctPilot} from './casePilot';

test('early lessons retain production, retire repetitive boundary recognition everywhere',()=>{
 for(const lesson of ['activity','cases'] as const){assert.deepEqual(lessonTasks(lesson),['type']);assert.equal(lessonPool(lesson).length,12);assert.equal(lessonPool(lesson,'structure').length,0);
 for(let n=0;n<30;n++){const qs=selectLessonQuestions(lesson);assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.exampleId)).size,12);assert.equal(qs.filter(q=>q.task==='meaning').length,0);assert.equal(qs.filter(q=>q.task==='type').length,12);}
 const c=grammarProgress([]).concepts.find(c=>c.id===`lesson_${lesson}`)!;assert.equal(c.modes.meaning,undefined);assert.equal(c.modes.typed!.available,12);assert.equal(c.modes.structure,undefined);
 assert.ok(!grammarItems.some(i=>i.kind==='lesson'&&i.q.lessonId===lesson&&i.q.task==='structure'));}
});
test('clause case decisions hide the completed word and require choosing among same-actor outer-case forms',()=>{
 const pool=lessonPool('clause_cases','structure');assert.equal(pool.length,12);
 for(const q of pool){const e=verbNounExamples.find(e=>e.id===q.exampleId)!,typed=lessonPool('clause_cases','type').find(t=>t.exampleId===q.exampleId)!;
 assert.equal(q.expected,typed.expected);assert.equal(q.sentence,typed.sentence);assert.ok(q.sentence.includes('___'));assert.ok(q.id.endsWith('-v2'));assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.ok(q.options!.every(o=>!/[ .]/.test(o.text)));assert.ok(!/accusative|dative|ablative/.test(q.prompt));const c=lessonExerciseCopy(q,e);assert.equal(c.outerCase,undefined);assert.equal(c.meaning,undefined);assert.equal(c.construction,undefined);
 for(const o of q.options!){const result=recordLesson([],{...q,options:[...q.options!].reverse()},o.id,'s');assert.equal(result[0].correct,o.id==='target');assert.equal(result[0].answer,o.text);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:result}),result);assert.strictEqual(recordLesson(result,q,'target','s'),result);}
 assert.ok(lessonExerciseCopy(typed,e).outerCase);assert.equal(recordLesson([],typed,' '+typed.expected.normalize('NFD')+' ','s')[0].correct,true);}
 for(const c of ['accusative','dative','ablative'])assert.equal(pool.filter(q=>q.nominalCase===c).length,4);
 assert.equal(pool.find(q=>q.exampleId==='vn4-06')!.expected,'etmemize');assert.deepEqual(new Set(pool.find(q=>q.exampleId==='vn4-06')!.options!.map(o=>o.text)),new Set(['etmemizi','etmemize','etmemizden']));
});
test('retired boundary and connection results survive backups without giving revised case questions prior credit',()=>{
 const retired=retiredLessonQuestions.filter(q=>['activity','cases','clause_cases'].includes(q.lessonId));assert.equal(retired.length,72);const old=retired.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);
 const report=grammarProgress(old);assert.equal(report.unlinked,0);for(const id of ['activity','cases','clause_cases']){const c=report.concepts.find(c=>c.id===`lesson_${id}`)!;assert.equal(c.legacyChecks,24);assert.equal(c.attempts,0);assert.equal(lessonMistakes(old,id as 'activity').length,0);}assert.equal(grammarMistakes(old).length,0);
 const q=lessonPool('clause_cases','structure')[0],wrong=recordLesson(old,q,'other-1','new'),last=wrong.at(-1)!,fixed=correctPilot(wrong,last.id);assert.equal(grammarMistakes(wrong).length,1);assert.equal(selectGrammarMix(grammarMistakes(wrong))[0].q.id,q.id);assert.equal(grammarMistakes(fixed).length,0);for(const key of ['id','questionId','answer','expected','time','sessionId']as const)assert.equal(fixed.at(-1)![key],last[key]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 assert.equal(verbNounQuestions.length,589);
});
