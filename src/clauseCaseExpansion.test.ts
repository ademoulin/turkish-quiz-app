import {test} from 'node:test';
import assert from 'node:assert/strict';
import {expandedClauseExamples as models,expandedClauseQuestions as questions} from './clauseCaseExpansion';
import {verbNounQuestions} from './verbNouns';
import {recordLesson,lessonPool,lessonMistakes,selectLessonQuestions} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarProgress} from './grammarProgress';
test('24 distinct new situations add choices and production without changing the old pools',()=>{
 assert.equal(models.length,24);assert.equal(new Set(models.map(e=>e.sentence)).size,24);
 assert.equal(questions.filter(q=>q.task==='type').length,12);assert.equal(questions.filter(q=>q.task==='structure').length,12);
 assert.equal(lessonPool('noun_clause_cases').length,72);assert.equal(lessonPool('noun_clause_cases','build').length,12);
 assert.equal(verbNounQuestions.filter(q=>!q.id.startsWith('vn12c-expand-')&&!q.id.startsWith('vn8-expand-')&&!q.id.startsWith('vn-relative-expand-')).length,397);
 for(const q of questions){const e=models.find(e=>e.id===q.exampleId)!;assert.equal(q.sentence.replace('___',q.expected),e.sentence);const copy=lessonExerciseCopy(q,e);assert.equal(copy.outerCase,undefined);assert.equal(copy.meaning,e.meaning);assert.equal(copy.construction,q.task==='type'?{ma:'-mA',dik:'-DIK',acak:'-(y)AcAK'}[q.nominalConstruction!]:undefined);assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);}
 for(let i=0;i<10;i++){const mix=selectLessonQuestions('noun_clause_cases');assert.equal(new Set(mix.map(q=>q.exampleId)).size,12);for(const task of ['structure','type','build'])assert.equal(mix.filter(q=>q.task===task).length,4);}
});
test('new forms use strict Turkish spelling, score once, correct in place and round-trip backups',()=>{
 for(const q of questions){
  if(q.task==='structure')for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
  const answer=q.task==='type'?' '+q.expected.normalize('NFD')+' ':'target',right=recordLesson([],q,answer,'s');assert.equal(right[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:right}),right);assert.equal(recordLesson(right,q,answer,'s'),right);
  const wrong=recordLesson([],q,q.task==='type'?'wrong':'other-1','s'),fixed=correctPilot(wrong,wrong[0].id);assert.equal(wrong[0].correct,false);assert.equal(lessonMistakes(wrong,'noun_clause_cases').length,1);assert.equal(lessonMistakes(fixed,'noun_clause_cases').length,0);for(const key of ['id','time','answer','expected','questionId','sessionId'] as const)assert.equal(fixed[0][key],wrong[0][key]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
  if(q.task==='type'){const ascii=q.expected.replaceAll('ı','i').replaceAll('ğ','g').replaceAll('ş','s').replaceAll('ç','c').replaceAll('ö','o').replaceAll('ü','u');if(ascii!==q.expected)assert.equal(recordLesson([],q,ascii,'s')[0].correct,false);}
 }
 const q=questions.find(q=>q.task==='type')!,history=recordLesson([],q,q.expected,'new'),row=grammarProgress(history).concepts.find(c=>c.id==='lesson_noun_clause_cases')!;assert.equal(row.modes.typed!.attempts,1);assert.equal(row.modes.typed!.available,12);assert.deepEqual(validatePilotImport({version:1}),[]);
});
