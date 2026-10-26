import {test} from 'node:test';
import assert from 'node:assert/strict';
import {converbArakCompletionExamples as examples,converbArakCompletionQuestions as questions} from './converbArakCompletionExpansion';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {lessonPool,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';

test('5.2 adds 12 complete converb-clause production and 12 finite-predicate choices',()=>{
 assert.ok(examples.length>0);assert.ok(questions.length>0);
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 assert.ok(questions.filter(q=>q.task==='type').length>0);
 assert.ok(questions.filter(q=>q.task==='structure').length>0);
 
 assert.equal(lessonPool('converb_arak').filter(q=>q.id.startsWith('vn52-expand-')).length,24);
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
