import {test} from 'node:test';
import assert from 'node:assert/strict';
import {relativeBuildingCompletionExamples as examples,relativeBuildingCompletionQuestions as questions} from './relativeBuildingCompletionExpansion';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {recordLesson,lessonPool} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';
import {lessonReason} from './grammarCopy';

test('4.3 expands by 24 unique completions with 12 choices and 12 typed',()=>{
 assert.equal(examples.length,24);assert.equal(questions.length,24);
 assert.equal(new Set(questions.map(q=>q.id)).size,24);
 assert.equal(new Set(examples.map(e=>e.sentence)).size,24);
 assert.equal(questions.filter(q=>q.task==='type').length,12);
 assert.equal(questions.filter(q=>q.task==='structure').length,12);
 assert.equal(verbNounExamples.length,600);
 assert.equal(verbNounQuestions.length,661);
 for(const q of questions){
  const e=examples.find(e=>e.id===q.exampleId)!;
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);
  assert.equal(lessonReason(e),e.explanation);
  const right=recordLesson([],q,q.task==='type'?q.expected:'target','test');
  assert.equal(right[0].correct,true);
  assert.deepEqual(validatePilotImport({version:1,pilotAttempts:right}),right);
  const wrong=recordLesson([],q,q.task==='type'?'not-the-answer':'other-1','test');
  assert.equal(wrong[0].correct,false);
  assert.equal(correctPilot(wrong,wrong[0].id)[0].correct,true);
  if(q.task==='structure')assert.equal(q.options?.length,4);
 }
 assert.equal(lessonPool('relative_building').filter(q=>q.id.startsWith('vn43-expand-')).length,24);
});
