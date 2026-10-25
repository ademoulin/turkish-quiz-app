import {test} from 'node:test';
import assert from 'node:assert/strict';
import {relativeCompletionExamples as models,relativeCompletionQuestions as questions} from './relativeCompletionExpansion';
import {verbNounQuestions,verbNounExamples} from './verbNouns';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {lessonExerciseCopy,lessonReason} from './grammarCopy';
import {grammarItems,grammarMistakes} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
import {correctPilot,validatePilotImport} from './casePilot';

test('24 new relative completions balance 4.1 and 4.2, choice and typed production',()=>{
 assert.equal(models.length,24);assert.equal(questions.length,24);
 assert.equal(new Set(models.map(e=>e.id)).size,24);
 assert.equal(new Set(models.map(e=>e.sentence)).size,24);
 for(const lesson of ['subject_relatives','object_relatives'] as const){
  assert.equal(questions.filter(q=>q.lessonId===lesson).length,12);
  for(const task of ['structure','type'] as const)assert.equal(questions.filter(q=>q.lessonId===lesson&&q.task===task).length,6);
  for(let n=0;n<12;n++){
   const selected=selectLessonQuestions(lesson);
   assert.equal(selected.length,12);
   assert.equal(selected.filter(q=>q.task==='type').length,6);
   assert.equal(new Set(selected.map(q=>q.exampleId)).size,12);
  }
 }
 assert.equal(lessonPool('subject_relatives').length,31);
 assert.equal(lessonPool('object_relatives').length,30);
 assert.equal(verbNounExamples.length,576);
 assert.equal(verbNounQuestions.length,637);
 for(const q of questions){
  const e=models.find(e=>e.id===q.exampleId)!;
  assert.equal(e.template.replace('___',e.answer),e.sentence);
  assert.equal(e.unit+' '+e.main+'.',e.sentence);
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);
  assert.equal(q.reviewStatus,'draft_needs_independent_review');
  assert.equal(q.source,'newly_authored');
  assert.equal(lessonReason(e),e.explanation);
  const copy=lessonExerciseCopy(q,e);
  assert.equal(copy.construction,undefined);
  assert.equal(copy.outerCase,undefined);
  assert.ok(!/-(?:y\\)?An|-DIK|-\\(y\\)AcAK|genitive|subject|object/.test(copy.instruction));
  assert.ok(grammarItems.some(i=>i.q.id===q.id));
  if(q.task==='structure'){
   assert.equal(q.options!.length,4);
   assert.equal(new Set(q.options!.map(o=>o.text)).size,4);
   for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
  }else{
   assert.equal(q.options,undefined);
   assert.equal(recordLesson([],q,' '+q.expected.normalize('NFD')+' ','s')[0].correct,true);
   assert.equal(recordLesson([],q,q.expected+'!','s')[0].correct,false);
   assert.deepEqual(recordLesson([],q,' ','s'),[]);
  }
 }
});

test('relative completion progress, correction, and version-1 backups preserve original attempt evidence',()=>{
 for(const q of questions){
  const response=q.task==='type'?q.expected:'target';
  const saved=recordLesson([],q,response,'session');
  assert.equal(saved[0].correct,true);
  assert.equal(recordLesson(saved,q,response,'session'),saved);
  assert.deepEqual(validatePilotImport({version:1,pilotAttempts:saved}),saved);
  const wrong=recordLesson([],q,q.task==='type'?'not-the-form':'other-1','wrong-session');
  assert.equal(wrong[0].correct,false);
  assert.equal(lessonMistakes(wrong,q.lessonId).length,1);
  assert.equal(grammarMistakes(wrong).length,1);
  const fixed=correctPilot(wrong,wrong[0].id);
  assert.equal(fixed[0].correct,true);
  assert.equal(fixed[0].manual,true);
  assert.equal(lessonMistakes(fixed,q.lessonId).length,0);
  for(const key of ['id','time','questionId','answer','expected','sessionId'] as const)assert.equal(fixed[0][key],wrong[0][key]);
  assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
 const q=questions.find(q=>q.task==='type'&&q.lessonId==='object_relatives')!;
 const concept=grammarProgress(recordLesson([],q,q.expected,'s')).concepts.find(c=>c.id==='lesson_object_relatives')!;
 assert.equal(concept.modes.typed!.available,18);
 assert.equal(concept.modes.typed!.attempts,1);
});
