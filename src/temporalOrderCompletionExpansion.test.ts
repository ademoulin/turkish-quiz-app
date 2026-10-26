import {test} from 'node:test';
import assert from 'node:assert/strict';
import {temporalOrderCompletionExamples as examples,temporalOrderCompletionQuestions as questions,retiredTemporalOrderCompletionQuestions as retired} from './temporalOrderCompletionExpansion';
import {verbNounQuestions,retiredLessonQuestions} from './verbNouns';
import {lessonPool,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';

test('5.4 practices 12 typed and 12 selected before/after verb forms',()=>{
 assert.ok(examples.length>0);assert.equal(questions.length,examples.length);
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 assert.equal(questions.filter(q=>q.task==='type').length,12);
 assert.equal(questions.filter(q=>q.task==='structure').length,12);
 assert.deepEqual(new Set(lessonPool('temporal_order').filter(q=>q.id.startsWith('vn54-form-')).map(q=>q.id)),new Set(questions.map(q=>q.id)));
 assert.equal(questions.filter(q=>q.sentence.includes(' önce ')).length,12);
 assert.equal(questions.filter(q=>q.sentence.includes(' sonra ')).length,12);
 for(const q of questions){
  const e=examples.find(e=>e.id===q.exampleId)!;
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);
  assert.ok(q.sentence.includes('___ önce ')||q.sentence.includes('___ sonra '));
  assert.ok(!q.expected.includes(' '),'answer is only the inflected verb');
  const good=recordLesson([],q,q.task==='type'?q.expected:'target','good');
  assert.equal(good[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:good}),good);
  const bad=recordLesson([],q,q.task==='type'?'incorrect-form':'other-1','bad');
  assert.equal(bad[0].correct,false);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:bad}),bad);
  assert.equal(correctPilot(bad,bad[0].id)[0].correct,true);
  if(q.task==='structure'){
   assert.equal(q.options!.length,3);
   assert.equal(new Set(q.options!.map(o=>o.text)).size,3);
   assert.ok(q.options!.every(o=>!o.text.includes(' ')));
  }
 }
});

test('superseded Lesson 5.4 questions are retired without reusing historical IDs',()=>{
 assert.ok(retired.length>0);
 assert.deepEqual(new Set(retiredLessonQuestions.filter(q=>q.id.startsWith('vn54-expand-')).map(q=>q.id)),new Set(retired.map(q=>q.id)));
 for(const q of retired){
  assert.ok(!verbNounQuestions.some(active=>active.id===q.id));
  assert.ok(retiredLessonQuestions.some(saved=>saved.id===q.id));
 }
});
