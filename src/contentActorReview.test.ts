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
test('6–7 merge nine actor shortcuts into meaning and omit only unambiguous agreement pronouns',()=>{
 assert.equal(earlier.length,21);assert.equal(earlier.filter(q=>q.task==='structure').length,9);assert.equal(earlier.filter(q=>q.task==='meaning').length,12);
 for(const lesson of lessons){
  const meanings=lessonPool(lesson,'meaning');assert.equal(meanings.length,12);assert.equal(lessonPool(lesson,'type').length,12);assert.equal(lessonPool(lesson,'structure').length,lesson==='content_dik'?7:8);
  for(const q of meanings){const e=models.find(e=>e.id===q.exampleId)!;
   if(['ben','biz','siz'].includes(q.nominalSubject!)){assert.ok(q.id.endsWith('-v2'));assert.equal(q.sentence,e.sentence.slice(e.subjectGenitive!.length+1).replace(/^./,c=>c.toLocaleUpperCase('tr')));assert.ok(q.sentence.includes(e.answer));}
   else {assert.ok(!q.id.endsWith('-v2'));assert.equal(q.sentence,e.sentence);assert.ok(q.sentence.startsWith(e.subjectGenitive!+' '));}
   assert.equal(q.expected,e.meaning);assert.equal(q.reviewStatus,'draft_needs_independent_review');
  }
  for(const q of lessonPool(lesson,'structure'))assert.ok(!/^Who |What does -(iniz|ları|in) identify/.test(q.prompt));
  for(let i=0;i<30;i++){const session=selectLessonQuestions(lesson);assert.equal(session.length,12);assert.equal(new Set(session.map(q=>q.exampleId)).size,12);for(const task of ['meaning','structure','type'])assert.equal(session.filter(q=>q.task===task).length,4);}
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
 const progress=grammarProgress(old);assert.equal(progress.unlinked,0);assert.equal(progress.concepts.reduce((n,c)=>n+c.legacyChecks,0),21);assert.equal(grammarMistakes(old).length,0);
 for(const lesson of lessons){
  assert.equal(lessonMistakes(old,lesson).length,0);const q=lessonPool(lesson,'meaning').find(q=>q.id.endsWith('-v2'))!;assert.ok(grammarItems.some(i=>i.q===q));const wrong=recordLesson(old,q,'other-1','new'),a=wrong.at(-1)!;assert.equal(recordLesson(wrong,q,'target','new').length,wrong.length);const fixed=correctPilot(wrong,a.id),b=fixed.at(-1)!;for(const key of ['id','time','sessionId','questionId','answer','expected','nominalSubject','contentTime'] as const)assert.equal(b[key],a[key]);assert.equal(b.manual,true);assert.equal(b.correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
});
