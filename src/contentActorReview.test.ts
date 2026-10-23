import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as models} from './verbNouns';
import {refineContentActors} from './contentActorReview';
import {lessonPool,recordLesson,lessonMistakes,selectLessonQuestions} from './verbNounPractice';
import {grammarProgress} from './grammarProgress';
import {grammarItems,grammarMistakes} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const lessons=['content_dik','content_future'] as const;
const earlier=retired.filter(q=>lessons.includes(q.lessonId as typeof lessons[number]));
test('3.7–3.8 retain only production with distinct models and archive all interpretation versions',()=>{
 assert.equal(earlier.length,60);
 for(const lesson of lessons){assert.equal(lessonPool(lesson,'meaning').length,0);assert.equal(lessonPool(lesson,'structure').length,0);assert.equal(lessonPool(lesson,'type').length,12);
  for(let i=0;i<30;i++){const qs=selectLessonQuestions(lesson);assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.exampleId)).size,12);assert.ok(qs.every(q=>q.task==='type'));}
 }
});
test('6–7 production drills and all other lesson objects are unchanged by the refinement',()=>{
 const originals=[...earlier,...bank.filter(q=>!q.id.endsWith('-v2'))];
 const result=refineContentActors(originals);
 for(const q of originals.filter(q=>q.task==='type'||!lessons.includes(q.lessonId as typeof lessons[number])))assert.equal(result.active.find(n=>n.id===q.id),q);
 for(const lesson of lessons)for(const q of lessonPool(lesson,'type')){const e=models.find(e=>e.id===q.exampleId)!;assert.equal(q.sentence,e.template);assert.ok(q.sentence.startsWith(e.subjectGenitive!+' '));assert.equal(q.expected,e.answer);}
});
test('6–7 old shortcuts remain exportable earlier evidence while revised corrections update in place',()=>{
 const old=earlier.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);
 const progress=grammarProgress(old);assert.equal(progress.unlinked,0);assert.equal(progress.concepts.reduce((n,c)=>n+c.legacyChecks,0),60);assert.equal(grammarMistakes(old).length,0);
 for(const lesson of lessons){
  assert.equal(lessonMistakes(old,lesson).length,0);const q=lessonPool(lesson,'type')[0];assert.ok(grammarItems.some(i=>i.q===q));const wrong=recordLesson(old,q,'other-1','new'),a=wrong.at(-1)!;assert.equal(recordLesson(wrong,q,q.expected,'new').length,wrong.length);const fixed=correctPilot(wrong,a.id),b=fixed.at(-1)!;for(const key of ['id','time','sessionId','questionId','answer','expected','nominalSubject','contentTime'] as const)assert.equal(b[key],a[key]);assert.equal(b.manual,true);assert.equal(b.correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
});
