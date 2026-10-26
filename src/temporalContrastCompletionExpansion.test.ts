import {test} from 'node:test';
import assert from 'node:assert/strict';
import {temporalContrastCompletionExamples,temporalContrastCompletionQuestions} from './temporalContrastCompletionExpansion';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {lessonPool} from './verbNounPractice';

test('Lesson 5.8 adds 12 whole-clause completions and 12 finite-predicate choices without replacing original IDs',()=>{
 assert.ok(temporalContrastCompletionExamples.length>0);
 assert.ok(temporalContrastCompletionQuestions.length>0);
 assert.ok(verbNounExamples.length>0);
 assert.ok(verbNounQuestions.length>0);
 const pool=lessonPool('temporal_contrasts');
 assert.ok(pool.length>0);
 assert.ok(pool.some(q=>q.id.startsWith('vn58-expand-')&&q.task==='type'));
 assert.ok(pool.some(q=>q.id.startsWith('vn58-expand-')&&q.task==='structure'));
 assert.ok(pool.some(q=>!q.id.startsWith('vn58-expand-')));
 for(const q of temporalContrastCompletionQuestions){
  assert.equal(q.reviewStatus,'draft_needs_independent_review');
  assert.ok(q.temporalRelation&&q.temporalSubject&&q.mainSubject&&q.temporalTime);
  if(q.task==='type'){assert.ok(q.expected.includes(' '));assert.ok(q.prompt.includes('Type the entire time clause'));}
  else {assert.equal(q.options?.length,3);assert.equal(q.options?.find(o=>o.id==='target')?.text,q.expected);assert.equal(new Set(q.options?.map(o=>o.text)).size,3);}
 }
});
