import {test} from 'node:test';
import assert from 'node:assert/strict';
import {temporalWhileCompletionExamples as examples,temporalWhileCompletionQuestions as questions} from './temporalWhileCompletionExpansion';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {lessonPool,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';

test('5.6 adds 12 complete while-overlap clause production and 12 finite-predicate choices',()=>{
 assert.equal(examples.length,24);assert.equal(questions.length,24);
 assert.equal(new Set(questions.map(q=>q.id)).size,24);
 assert.equal(questions.filter(q=>q.task==='type').length,12);
 assert.equal(questions.filter(q=>q.task==='structure').length,12);
 assert.equal(verbNounExamples.length,648);assert.equal(verbNounQuestions.length,709);
 assert.equal(lessonPool('temporal_while').filter(q=>q.id.startsWith('vn56-expand-')).length,24);
 for(const q of questions){
  const e=examples.find(e=>e.id===q.exampleId)!;
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);
  const good=recordLesson([],q,q.task==='type'?q.expected:'target','good');
  assert.equal(good[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:good}),good);
  const bad=recordLesson([],q,q.task==='type'?'incorrect-form':'other-1','bad');
  assert.equal(bad[0].correct,false);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:bad}),bad);
  assert.equal(correctPilot(bad,bad[0].id)[0].correct,true);
  if(q.task==='structure'){assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);}
 }
});
