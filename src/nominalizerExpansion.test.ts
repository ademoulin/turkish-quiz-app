import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nominalizerExpansionExamples as models,nominalizerExpansionQuestions as questions} from './nominalizerExpansion';
import {lessonExerciseCopy,lessonReason} from './grammarCopy';
import {lessonPool,recordLesson,lessonMistakes,selectLessonQuestions} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {grammarItems,grammarMistakes} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
test('24 varied construction choices add equal family/interaction coverage without pre-answer hints',()=>{
 assert.ok(models.length>0);assert.equal(new Set(models.map(e=>e.sentence)).size,models.length);assert.equal(lessonPool('contrasts').length,48);
 for(const family of ['ma','dik','acak']){assert.equal(questions.filter(q=>q.nominalConstruction===family).length,8);for(const task of ['structure','type'])assert.equal(questions.filter(q=>q.nominalConstruction===family&&q.task===task).length,4);}
 for(const q of questions){const e=models.find(e=>e.id===q.exampleId)!,copy=lessonExerciseCopy(q,e);assert.equal(q.sentence.replace('___',q.expected),e.sentence);assert.equal(copy.meaning,e.meaning);assert.equal(copy.construction,undefined);assert.equal(copy.outerCase,undefined);assert.ok(!/-mA|-DIK|AcAK/.test(copy.instruction));assert.equal(lessonReason(e),e.explanation);assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);assert.ok(grammarItems.some(i=>i.q.id===q.id));}
 for(let i=0;i<10;i++){const mix=selectLessonQuestions('contrasts');assert.equal(new Set(mix.map(q=>q.exampleId)).size,12);assert.equal(mix.filter(q=>q.task==='type').length,6);}
});
test('strict spelling, all option keys, original-attempt correction, review and backups work for the expansion',()=>{
 for(const q of questions){if(q.task==='structure')for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
 const answer=q.task==='type'?' '+q.expected.normalize('NFD')+' ':'target',right=recordLesson([],q,answer,'s');assert.equal(right[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:right}),right);assert.equal(recordLesson(right,q,answer,'s'),right);
 const wrong=recordLesson([],q,q.task==='type'?'wrong':'other-1','s'),fixed=correctPilot(wrong,wrong[0].id);assert.equal(wrong[0].correct,false);assert.equal(lessonMistakes(wrong,'contrasts').length,1);assert.equal(grammarMistakes(wrong).length,1);assert.equal(lessonMistakes(fixed,'contrasts').length,0);for(const key of ['id','time','answer','expected','questionId','sessionId'] as const)assert.equal(fixed[0][key],wrong[0][key]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 if(q.task==='type'){for(const bad of models.find(e=>e.id===q.exampleId)!.structureDistractors!)assert.equal(recordLesson([],q,bad,'s')[0].correct,false);const ascii=q.expected.replaceAll('ı','i').replaceAll('ğ','g').replaceAll('ş','s').replaceAll('ç','c').replaceAll('ö','o').replaceAll('ü','u');if(ascii!==q.expected)assert.equal(recordLesson([],q,ascii,'s')[0].correct,false);}
 }
 const q=questions.find(q=>q.task==='type')!,row=grammarProgress(recordLesson([],q,q.expected,'s')).concepts.find(c=>c.id==='lesson_contrasts')!;assert.equal(row.modes.typed!.available,24);assert.equal(row.modes.typed!.attempts,1);assert.deepEqual(validatePilotImport({version:1}),[]);
});
