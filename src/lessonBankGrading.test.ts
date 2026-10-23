import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank} from './verbNouns';
import {recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot} from './casePilot';

test('every current lesson question grades all supplied choices and preserves a corrected snapshot',()=>{
 for(const q of bank){
  const correct=q.task==='type'?q.expected:q.task==='build'?JSON.stringify(q.expectedChunkIds):q.expectedOptionId!;
  const good=recordLesson([],q,correct,'good');assert.equal(good.length,1,q.id);assert.equal(good[0].correct,true,q.id);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:good}),good);
  assert.deepEqual(recordLesson([],q,'','blank'),[]);assert.equal(recordLesson(good,q,correct,'good').length,1);
  const wrongAnswers=q.options?q.options.filter(o=>o.id!==q.expectedOptionId).map(o=>o.id):q.task==='type'?[q.expected+'!']:q.chunks!.filter(c=>!q.expectedChunkIds!.includes(c.id)).map(c=>JSON.stringify([c.id,...q.expectedChunkIds!.slice(1)]));
  for(const answer of wrongAnswers){
   const wrong=recordLesson([],q,answer,'wrong');assert.equal(wrong.length,1,q.id);assert.equal(wrong[0].correct,false,q.id);
   const corrected=correctPilot(wrong,wrong[0].id);assert.equal(corrected.length,1);assert.equal(corrected[0].manual,true);assert.equal(corrected[0].correct,true);
   for(const key of ['id','questionId','time','sessionId','answer','expected'] as const)assert.equal(corrected[0][key],wrong[0][key]);
   assert.deepEqual(validatePilotImport({version:1,pilotAttempts:corrected}),corrected);
  }
 }
});
