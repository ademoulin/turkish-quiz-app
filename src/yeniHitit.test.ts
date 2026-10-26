import { test } from 'node:test';
import assert from 'node:assert/strict';
import {bank, activeGrammarQuestions, retiredGrammarQuestions, validateBank, selectQuestions, startSession, submitAnswer, nextQuestion, score} from './yeniHitit';
test('v82 schema, counts, exclusions and malformed content', () => {
 validateBank(bank);
 for (const mutate of [
 (d: typeof bank) => {d.questions[1].id=d.questions[0].id;},
 (d: typeof bank) => {d.questions[0].correct_option_id='missing';},
 (d: typeof bank) => {d.questions[0].options.pop();},
 (d: typeof bank) => {d.questions[0].options[1].text=d.questions[0].options[0].text;},
 (d: typeof bank) => {d.questions[0].prompt='';},
 (d: typeof bank) => {d.questions[0].explanation='';},
 (d: typeof bank) => {d.questions[0].prompt='Choose the word stress';},
 ]) {const d=structuredClone(bank);mutate(d);assert.throws(()=>validateBank(d));}
});
test('filters, empty/unknown skill and unique session pool', () => {
 const section=activeGrammarQuestions[0].section, skill=activeGrammarQuestions[0].skill_id;
 assert.ok(selectQuestions(section).every(q=>q.section===section));
 assert.ok(selectQuestions('',skill).length>0);
 assert.equal(selectQuestions('','unknown').length,0);
 assert.equal(selectQuestions('unknown').length,0);
 assert.equal(selectQuestions('','').length,407);
 assert.equal(new Set(selectQuestions().map(q=>q.id)).size,407);
 const retiredIds=['YH1-V10-Q007','YH1-V11-Q018','YH1-V14-Q003','YH1-V50-Q024','YH1-V66-Q019','YH1-V66-Q020'];
 for(const id of retiredIds){assert.ok(retiredGrammarQuestions.some(q=>q.id===id),`Missing retired history ${id}`);assert.ok(!activeGrammarQuestions.some(q=>q.id===id),`Still active ${id}`);}
});
test('every shuffled option retains answer mapping, only keyed option scores', () => {
 for(const q of selectQuestions('', '', ()=>0.1)) {
  const original=activeGrammarQuestions.find(x=>x.id===q.id)!;
  assert.equal(q.options.find(o=>o.id===q.correct_option_id)!.text,original.options.find(o=>o.id===original.correct_option_id)!.text);
  for(const o of q.options) assert.equal(score(submitAnswer({questions:[q],index:0,answers:{}},o.id)).correct,o.id===q.correct_option_id?1:0);
 }
});
test('duplicate submission, completion and reset', () => {
 let s=startSession('',activeGrammarQuestions[0].skill_id);
 assert.equal(nextQuestion(s),s);
 assert.equal(submitAnswer(s,'unknown'),s);
 for(const q of s.questions) {
  s=submitAnswer(s,q.correct_option_id);
  assert.equal(submitAnswer(s,q.options.find(o=>o.id!==q.correct_option_id)!.id),s);
  s=nextQuestion(s);
 }
 assert.equal(s.index,3);assert.deepEqual(score(s),{correct:3,attempted:3});
 assert.equal(submitAnswer(s,'A'),s);
 assert.deepEqual(score(startSession()),{correct:0,attempted:0});
});
