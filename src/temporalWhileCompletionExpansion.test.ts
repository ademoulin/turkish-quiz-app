import {test} from 'node:test';
import assert from 'node:assert/strict';
import {temporalWhileCompletionExamples as examples,temporalWhileCompletionQuestions as questions,retiredTemporalWhileCompletionQuestions as retired} from './temporalWhileCompletionExpansion';
import {verbNounQuestions,retiredLessonQuestions} from './verbNouns';
import {lessonPool,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';

test('5.6 practices overlapping -ken forms in both modes',()=>{
 assert.ok(examples.length>0);assert.ok(questions.length>0);
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 assert.ok(questions.filter(q=>q.task==='type').length>0);
 assert.ok(questions.filter(q=>q.task==='structure').length>0);
 
 assert.deepEqual(new Set(lessonPool('temporal_while').filter(q=>q.id.startsWith('vn56-form-')).map(q=>q.id)),new Set(questions.map(q=>q.id)));
 for(const q of questions){
  const e=examples.find(e=>e.id===q.exampleId)!;
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);
  assert.equal(q.expected,e.answer);assert.ok(q.expected.endsWith('ken'));assert.ok(!q.expected.includes(' '));
  const good=recordLesson([],q,q.task==='type'?q.expected:'target','good');
  assert.equal(good[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:good}),good);
  const bad=recordLesson([],q,q.task==='type'?'incorrect-form':'other-1','bad');
  assert.equal(bad[0].correct,false);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:bad}),bad);
  assert.equal(correctPilot(bad,bad[0].id)[0].correct,true);
  if(q.task==='structure'){assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.ok(q.options!.every(o=>!o.text.includes(' ')));assert.ok(q.options!.find(o=>o.id==='other-1')!.text.endsWith('madan')||q.options!.find(o=>o.id==='other-1')!.text.endsWith('meden'));}
 }
});

test('old 5.6 question IDs remain available only for historical attempts',()=>{assert.ok(retired.length>0);assert.deepEqual(new Set(retiredLessonQuestions.filter(q=>q.id.startsWith('vn56-expand-')).map(q=>q.id)),new Set(retired.map(q=>q.id)));for(const q of retired)assert.ok(!verbNounQuestions.some(active=>active.id===q.id));});
