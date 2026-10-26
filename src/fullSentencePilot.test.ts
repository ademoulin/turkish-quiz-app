import assert from 'node:assert/strict';
import test from 'node:test';
import {fullSentencePilotQuestions,fullSentencePilotExamples,fullSentencePilotDecision,matchesFullSentencePilot} from './fullSentencePilot';
import {lessonPool,recordLesson} from './verbNounPractice';
test('six authored sentence questions have matching presentation models and dictionary hints',()=>{
 assert.equal(fullSentencePilotQuestions.length,6);
 assert.equal(fullSentencePilotExamples.length,6);
 for(const q of fullSentencePilotQuestions){
  assert.equal(q.task,'type');
  assert.ok(fullSentencePilotExamples.some(e=>e.id===q.exampleId));
  assert.match(q.prompt,/Vocabulary:/);
  assert.ok(lessonPool('sentence_building','type').some(item=>item.id===q.id));
 }
});
test('curated full-sentence alternatives are accepted but wrong person is not',()=>{
 const q=fullSentencePilotQuestions[0];
 assert.equal(matchesFullSentencePilot(q.id,'İşe gitmeden önce arkadaşımı aradım.'),true);
 assert.equal(matchesFullSentencePilot(q.id,'Arkadaşımı işe gitmeden önce aradım.'),true);
 assert.equal(matchesFullSentencePilot(q.id,'İşe gitmeden önce arkadaşımı aradık.'),false);
 assert.equal(fullSentencePilotDecision(q.id,'wrong',0),'retry');
 assert.equal(fullSentencePilotDecision(q.id,'wrong',1),'incorrect');
 assert.equal(fullSentencePilotDecision(q.id,q.expected,1),'correct');
});
test('pilot scoring preserves stable ID and stored answer',()=>{
 const q=fullSentencePilotQuestions[0];
 const attempts=recordLesson([],q,'Arkadaşımı işe gitmeden önce aradım.','pilot-test');
 assert.equal(attempts.length,1);
 assert.equal(attempts[0].correct,true);
 assert.equal(attempts[0].questionId,q.id);
 assert.equal(attempts[0].answer,'Arkadaşımı işe gitmeden önce aradım.');
});
