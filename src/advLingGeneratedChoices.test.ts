import {test} from 'node:test';
import assert from 'node:assert/strict';
import {temporalWhenCompletionQuestions} from './temporalWhenCompletionExpansion';
import {temporalWhileCompletionQuestions} from './temporalWhileCompletionExpansion';
import {temporalOrderCompletionQuestions} from './temporalOrderCompletionExpansion';
import {relativeRoleCompletionQuestions} from './relativeRoleCompletionExpansion';
import {recordLesson} from './verbNounPractice';
import {matchesCase} from './casePilot';

const groups=[
 ['when',temporalWhenCompletionQuestions],
 ['while',temporalWhileCompletionQuestions],
 ['before/after',temporalOrderCompletionQuestions],
 ['relative roles',relativeRoleCompletionQuestions],
] as const;

test('ADV-LING generated choices are unique, keyed, and reconstruct their intended sentence',()=>{
 for(const [label,questions] of groups){
  assert.ok(questions.length>0,label);
  for(const q of questions){
   assert.ok(q.sentence.includes('___'),q.id);
   assert.ok(q.expected.trim(),q.id);
   if(q.task!=='structure')continue;
   assert.equal(q.expectedOptionId,'target',q.id);
   assert.ok(q.options&&q.options.length>=2,q.id);
   assert.equal(new Set(q.options!.map(o=>o.id)).size,q.options!.length,q.id);
   assert.equal(new Set(q.options!.map(o=>o.text.normalize('NFC').trim().toLocaleLowerCase('tr'))).size,q.options!.length,q.id);
   assert.equal(q.options!.find(o=>o.id==='target')?.text,q.expected,q.id);
   for(const option of q.options!){
    const attempt=recordLesson([],q,option.id,'adv-ling-choice');
    assert.equal(attempt.length,1,q.id);
    assert.equal(attempt[0].correct,option.id==='target',`${q.id}: ${option.id}`);
   }
  }
 }
});

test('ADV-LING typed grading preserves Turkish vowel and consonant contrasts',()=>{
 assert.equal(matchesCase('ÖĞRETMENİ','öğretmeni'),true);
 assert.equal(matchesCase('oğretmeni','öğretmeni'),false);
 assert.equal(matchesCase('ogretmeni','öğretmeni'),false);
 assert.equal(matchesCase('öğretmene','öğretmeni'),false);
 assert.equal(matchesCase('gelmeme','gelmeni'),false);
 assert.equal(matchesCase('gelmelerine','gelmesini'),false);
});

test('ADV-LING temporal distractors vary across generated questions',()=>{
 for(const questions of [temporalWhenCompletionQuestions,temporalWhileCompletionQuestions,temporalOrderCompletionQuestions]){
  const finite=questions.filter(q=>q.task==='structure');
  const firstWrong=finite.map(q=>q.options!.find(o=>o.id==='other-1')!.text);
  const secondWrong=finite.map(q=>q.options!.find(o=>o.id==='other-2')!.text);
  assert.ok(new Set(firstWrong).size>=5,'first distractor should vary across the lesson');
  assert.ok(new Set(secondWrong).size>=5,'second distractor should vary across the lesson');
 }
});
