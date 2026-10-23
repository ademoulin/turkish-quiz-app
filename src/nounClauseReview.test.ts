import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as models} from './verbNouns';
import {refineNounClauseBuilding} from './nounClauseReview';
import {lessonExerciseCopy} from './grammarCopy';
import {nounClauseSlots} from './sentenceChunks';
import {recordLesson,lessonMistakes} from './verbNounPractice';
import {grammarProgress} from './grammarProgress';
import {grammarItems} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const current=bank.filter(q=>q.lessonId==='noun_clause_building');
const earlier=retired.filter(q=>q.lessonId==='noun_clause_building');
test('12B keeps full sentences and parallel alternatives without explanatory giveaways or suffix recipes',()=>{
 assert.equal(current.length,36);assert.equal(earlier.length,24);
 for(const q of current){const e=models.find(e=>e.id===q.exampleId)!;
  assert.equal(lessonExerciseCopy(q,e).construction,undefined);
  if(q.task==='meaning'){assert.ok(!q.id.endsWith('-v2'));continue;}
  assert.ok(q.id.endsWith('-v2'));
  if(q.task==='build'){const old=earlier.find(o=>o.exampleId===q.exampleId&&o.task===q.task)!;assert.deepEqual(q.chunks,old.chunks);assert.deepEqual(q.expectedChunkIds,old.expectedChunkIds);assert.equal(q.expected,old.expected);continue;}
  assert.equal(q.sentence,e.sentence);assert.ok(q.expected.includes(`[${e.unit}]`));
  assert.equal(new Set(q.options!.map(o=>o.text.length)).size,1);
  for(const o of q.options!){assert.equal(o.text.split(' · ')[0].replace(/[\[\]]/g,''),e.sentence);assert.ok(!/accusative|reversed|rather than|whole clause/.test(o.text));assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 }
 assert.ok(!nounClauseSlots.join(' ').match(/genitive|accusative|agreement/));
 const other=bank.filter(q=>q.lessonId!=='noun_clause_building');const refined=refineNounClauseBuilding(other);assert.equal(refined.retired.length,0);refined.active.forEach((q,i)=>assert.equal(q,other[i]));
});
test('12B earlier scaffold evidence round-trips separately; revised answers score and correct in place',()=>{
 const old=earlier.map(q=>recordLesson([],q,q.task==='build'?JSON.stringify(q.expectedChunkIds):'target','old-'+q.id)[0]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);
 const row=grammarProgress(old).concepts.find(c=>c.id==='lesson_noun_clause_building')!;
 assert.equal(row.legacyChecks,24);assert.equal(row.attempts,0);assert.equal(lessonMistakes(old,'noun_clause_building').length,0);
 for(const q of current.filter(q=>q.task==='structure')){
  assert.ok(grammarItems.some(i=>i.q===q));const wrong=recordLesson(old,q,'other-2','new-'+q.id),a=wrong.at(-1)!;
  assert.equal(recordLesson(wrong,q,'target',a.sessionId).length,wrong.length);
  const corrected=correctPilot(wrong,a.id),fixed=corrected.at(-1)!;
  for(const k of ['id','time','sessionId','questionId','answer'] as const)assert.equal(fixed[k],a[k]);
  assert.equal(fixed.correct,true);assert.equal(fixed.manual,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:corrected}),corrected);
 }
});
