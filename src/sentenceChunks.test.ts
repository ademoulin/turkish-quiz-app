import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sentenceBuildingExamples as models} from './verbNounSentenceBuilding';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport,caseQuestions,recordPilot} from './casePilot';
import {completeChunks,assembledSentence,parseChunkAnswer} from './sentenceChunks';
const pool=lessonPool('sentence_building'),build=lessonPool('sentence_building','build');
test('12A has 12 models, 36 exercises, balanced connections, times and independent subjects',()=>{
 assert.equal(models.length,12);assert.equal(pool.length,18);assert.equal(build.length,12);
 for(const r of ['before','after','when','while'])assert.equal(models.filter(m=>m.temporalRelation===r).length,3);
 for(const t of ['past','future','habitual'])assert.equal(models.filter(m=>m.temporalTime===t).length,4);
 for(const m of models){assert.notEqual(m.temporalSubject,m.mainSubject);assert.equal(m.sourceClauses!.length,2);assert.equal(m.chunks!.length,6);assert.equal(assembledSentence(m.expectedChunkIds!,m.chunks!),m.sentence);assert.ok(m.explanation.includes('other Turkish word orders'));}
 for(const q of pool){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);}
 const mixed=selectLessonQuestions('sentence_building');assert.equal(new Set(mixed.map(q=>q.exampleId)).size,12);
 assert.equal(mixed.filter(q=>q.task==='type').length,6);assert.equal(mixed.filter(q=>q.task==='build').length,6);assert.equal(selectLessonQuestions('sentence_building','build').length,12);
 assert.equal(selectLessonQuestions('sentence_building','type').length,6);
});
test('assembly grades stable IDs in guided slots, saves readable text and rejects incomplete or fabricated chunks',()=>{
 for(const q of build){const ids=q.expectedChunkIds!,answer=JSON.stringify(ids),a=recordLesson([],q,answer,'s')[0];assert.equal(a.correct,true);assert.equal(a.answer,q.expected);assert.deepEqual(a.selectedChunkIds,ids);assert.equal(a.exerciseType,'sentence_chunk_assembly');assert.ok(a.id&&a.time&&a.sessionId&&a.conceptId);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[a]}),[a]);
 for(const bad of ['', '[]','{}','not json',JSON.stringify([ids[0],null,null,null]),JSON.stringify([ids[0],ids[0],ids[2],ids[3]]),JSON.stringify([...ids.slice(0,3),'unknown'])])assert.deepEqual(recordLesson([],q,bad,'s'),[]);
 const wrong=[...ids];[wrong[0],wrong[2]]=[wrong[2],wrong[0]];assert.equal(recordLesson([],q,JSON.stringify(wrong),'s')[0].correct,false);
 const distractor=[...ids];distractor[1]=q.chunks![4].id;assert.equal(recordLesson([],q,JSON.stringify(distractor),'s')[0].correct,false);
 assert.strictEqual(recordLesson([a],q,answer,'s')[0],a);assert.equal(recordLesson([a],q,answer,'s').length,1);
 assert.deepEqual(parseChunkAnswer('malformed'),[null,null,null,null]);assert.equal(completeChunks(ids,[...q.chunks!].reverse()),true);
 }
});
test('manual corrections retain original assembly evidence and clear only that question from review',()=>{
 const q=build[0],ids=[...q.expectedChunkIds!];ids[1]=q.chunks![4].id;
 const wrong=recordLesson([],q,JSON.stringify(ids),'s'),fixed=correctPilot(wrong,wrong[0].id);
 for(const key of ['id','time','answer','selectedChunkIds','expectedChunkIds','chunks','questionId','conceptId','sessionId'] as const)assert.deepEqual(fixed[0][key],wrong[0][key]);
 assert.equal(fixed[0].manual,true);assert.equal(fixed[0].correct,true);assert.equal(lessonMistakes(wrong,'sentence_building','build').length,1);assert.equal(lessonMistakes(wrong,'sentence_building','meaning').length,0);assert.equal(lessonMistakes(fixed,'sentence_building').length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
});
test('version-1 imports validate assembly snapshots and retain older backups',()=>{
 const q=build[0],a=recordLesson([],q,JSON.stringify(q.expectedChunkIds),'s')[0];
 for(const patch of [{selectedChunkIds:undefined},{expectedChunkIds:undefined},{chunks:undefined},{selectedChunkIds:['fake','fake','fake','fake']},{chunks:[...a.chunks!,a.chunks![0]]},{answer:'invented'},{expected:'invented'},{correct:false},{selectedOptionId:'target'},{lessonTask:'type'},{exerciseType:'typed_converb'},{temporalRelation:undefined},{mainSubject:undefined}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
 const old=recordPilot([],caseQuestions[0],caseQuestions[0].answer,'old')[0];assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[old,a]}),[old,a]);assert.deepEqual(validatePilotImport({version:1}),[]);assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,chunks:a.chunks}]}));
});
