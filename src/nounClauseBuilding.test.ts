import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nounClauseBuildingExamples as models} from './verbNounNounClauseBuilding';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {assembledSentence} from './sentenceChunks';
import {correctPilot,validatePilotImport,recordPilot,caseQuestions} from './casePilot';
const lesson='noun_clause_building',pool=lessonPool(lesson),build=lessonPool(lesson,'build');
const answer=(q:typeof pool[number])=>q.task==='build'?JSON.stringify(q.expectedChunkIds):'target';
test('12B balances three constructions and all six embedded/main actors without finite conjugation tasks',()=>{
 assert.equal(models.length,12);assert.equal(pool.length,12);assert.equal(build.length,12);assert.equal(lessonPool(lesson,'type').length,0);
 for(const family of ['ma','dik','acak'])assert.equal(models.filter(e=>e.nominalConstruction===family).length,4);
 for(const subject of ['ben','sen','o','biz','siz','onlar']){assert.equal(models.filter(e=>e.nominalSubject===subject).length,2);assert.equal(models.filter(e=>e.nominalMainSubject===subject).length,2);}
 for(const e of models){assert.notEqual(e.nominalSubject,e.nominalMainSubject);assert.equal(e.nominalCase,'accusative');assert.equal(e.chunks!.length,6);assert.equal(new Set(e.chunks!.map(c=>c.text)).size,6);assert.equal(assembledSentence(e.expectedChunkIds!,e.chunks!),e.sentence);assert.equal(e.chunks![1].text,e.subjectGenitive);assert.ok(e.unit.startsWith(e.subjectGenitive+' '));assert.ok(e.explanation.includes('not the main subject'));assert.ok(e.explanation.includes('entire unit'));assert.ok(e.structureAnswer!.includes(`[${e.unit}]`));assert.ok(e.structureDistractors![1].includes(`[${e.subjectGenitive}]`));assert.deepEqual(e.supportingRuleIds,[]);}
 assert.equal(models.filter(e=>e.contentTime==='past_event').length,2);assert.equal(models.filter(e=>e.contentTime==='habitual_fact').length,2);assert.equal(models.filter(e=>e.contentTime==='future_now').length,4);assert.equal(models.filter(e=>e.nominalConstruction==='ma'&&e.contentTime===undefined).length,4);
 for(const q of pool){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);if(q.task==='build'){assert.match(q.prompt,/Intended message/);assert.ok(!q.sentence.includes(q.expected));}else if(q.task==='structure'){assert.equal(q.sentence,models.find(e=>e.id===q.exampleId)!.sentence);}}
});
test('12B sessions balance three tasks and keep model answers from leaking across a session',()=>{
 for(let i=0;i<10;i++){const mixed=selectLessonQuestions(lesson);assert.equal(mixed.length,12);assert.equal(new Set(mixed.map(q=>q.exampleId)).size,12);for(const task of ['build'] as const){assert.equal(mixed.filter(q=>q.task===task).length,12);assert.equal(selectLessonQuestions(lesson,task).length,12);}}
});
test('12B saves construction, outer case, independent subjects and content viewpoint on every task',()=>{
 for(const q of pool){const a=recordLesson([],q,answer(q),'s')[0];assert.equal(a.correct,true);assert.equal(a.conceptId,`vn_noun_clause_building_${q.task}`);for(const key of ['nominalSubject','nominalMainSubject','nominalCase','nominalConstruction','contentTime'] as const)assert.equal(a[key],q[key]);assert.equal(a.temporalRelation,undefined);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[a]}),[a]);assert.equal(recordLesson([a],q,answer(q),'s').length,1);
 for(const patch of [{nominalMainSubject:undefined},{nominalMainSubject:'unknown'},{nominalSubject:undefined},{nominalCase:'dative'},{nominalConstruction:undefined},{nominalConstruction:'ken'},{temporalSubject:'ben'},{contentTime:'future_report'},{lessonId:'sentence_building'},{exerciseType:'typed_verb_noun'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
 }
 for(const q of pool.filter(q=>q.nominalConstruction==='ma')){const a=recordLesson([],q,answer(q),'s')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,contentTime:'past_event'}]}));}
 for(const q of pool.filter(q=>q.nominalConstruction!=='ma')){const a=recordLesson([],q,answer(q),'s')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,contentTime:undefined}]}));}
});
test('12B wrong subject forms, wrong nominalizers and wrong boundaries score once and correct in place',()=>{
 for(const q of build){for(const alternative of ['bare-subject','alternative-clause']){const ids=[...q.expectedChunkIds!];ids[alternative==='bare-subject'?1:2]=q.chunks!.find(c=>c.id.endsWith('-'+alternative))!.id;const wrong=recordLesson([],q,JSON.stringify(ids),'s');assert.equal(wrong[0].correct,false);assert.equal(lessonMistakes(wrong,lesson,'build').length,1);assert.equal(lessonMistakes(wrong,'sentence_building').length,0);assert.equal(lessonMistakes(wrong,lesson,'structure').length,0);const fixed=correctPilot(wrong,wrong[0].id);for(const key of ['id','time','sessionId','answer','chunks','selectedChunkIds','expectedChunkIds','nominalSubject','nominalMainSubject','nominalConstruction','nominalCase','contentTime'] as const)assert.deepEqual(fixed[0][key],wrong[0][key]);assert.equal(lessonMistakes(fixed,lesson).length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);}}
 assert.equal(lessonPool(lesson,'structure').length,0);
});
test('12B backups accept both earlier chunk and typed histories while rejecting leaked new metadata',()=>{
 let old=recordPilot([],caseQuestions[0],caseQuestions[0].answer,'old');const prior=lessonPool('sentence_building','build')[0];old=recordLesson(old,prior,JSON.stringify(prior.expectedChunkIds),'12a');let all=old;for(const q of pool)all=recordLesson(all,q,answer(q),'12b-'+q.id);assert.equal(all.length,14);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:all}),all);assert.deepEqual(validatePilotImport({version:1}),[]);
 for(const a of old)assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,nominalMainSubject:'ben'}]}));
 const q=build[0],a=recordLesson([],q,answer(q),'s')[0];for(const patch of [{selectedChunkIds:undefined},{chunks:undefined},{expectedChunkIds:undefined},{answer:'changed'},{expected:'changed'},{correct:false},{selectedOptionId:'target'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
});
