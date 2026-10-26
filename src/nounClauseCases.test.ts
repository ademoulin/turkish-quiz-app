import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nounCaseBuildingExamples as models} from './verbNounCaseBuilding';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {assembledSentence} from './sentenceChunks';
import {grammarItems,itemGroup,recordGrammarItem,grammarMistakes} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
const pool=lessonPool('noun_clause_cases').filter(q=>!q.id.startsWith('vn12c-expand-')),build=lessonPool('noun_clause_cases','build');
const response=(q:typeof pool[number])=>q.task==='build'?JSON.stringify(q.expectedChunkIds):'target';
test('12C balances six dative/six ablative models and all nominalizers/subjects with explicit scope',()=>{
 assert.ok(models.length>0);assert.ok(pool.length>0);assert.ok(build.length>0);assert.equal(lessonPool('noun_clause_cases','type').length,12);
 for(const c of ['dative','ablative'])assert.equal(models.filter(e=>e.nominalCase===c).length,6);
 for(const c of ['ma','dik','acak']){assert.equal(models.filter(e=>e.nominalConstruction===c).length,4);for(const outer of ['dative','ablative'])assert.equal(models.filter(e=>e.nominalConstruction===c&&e.nominalCase===outer).length,2);}
 for(const s of ['ben','sen','o','biz','siz','onlar']){assert.equal(models.filter(e=>e.nominalSubject===s).length,2);assert.equal(models.filter(e=>e.nominalMainSubject===s).length,2);}
 for(const e of models){assert.equal(assembledSentence(e.expectedChunkIds!,e.chunks!),e.sentence);assert.equal(new Set(e.chunks!.map(c=>c.text)).size,6);assert.ok(e.structureAnswer!.includes(`[${e.unit}]`));assert.ok(e.explanation.includes('not automatically accusative'));assert.ok(e.explanation.includes('overlap'));assert.deepEqual(e.supportingRuleIds,[]);assert.equal(e.sourceClauses!.length,2);assert.notEqual(e.nominalSubject,e.nominalMainSubject);}
 assert.equal(models.filter(e=>e.contentTime==='habitual_fact').length,2);assert.equal(models.filter(e=>e.contentTime==='past_event').length,2);assert.equal(models.filter(e=>e.contentTime==='future_now').length,4);
 const mixed=selectLessonQuestions('noun_clause_cases');assert.equal(new Set(mixed.map(q=>q.exampleId)).size,mixed.length);for(const task of ['structure','type','build'])assert.equal(mixed.filter(q=>q.task===task).length,4);
});
test('12C grades wrong outer cases and bare subjects, deduplicates checks and corrects original evidence',()=>{
 for(const q of build){for(const part of ['bare-subject','wrong-case']){const ids=[...q.expectedChunkIds!];ids[part==='bare-subject'?1:2]=q.chunks!.find(c=>c.id.endsWith('-'+part))!.id;const wrong=recordLesson([],q,JSON.stringify(ids),'s'),fixed=correctPilot(wrong,wrong[0].id);assert.equal(wrong[0].correct,false);assert.equal(recordLesson(wrong,q,response(q),'s').length,1);for(const key of ['id','time','sessionId','answer','selectedChunkIds','expectedChunkIds','chunks','nominalCase','nominalConstruction','nominalSubject','nominalMainSubject'] as const)assert.deepEqual(fixed[0][key],wrong[0][key]);assert.equal(lessonMistakes(wrong,'noun_clause_cases','build').length,1);assert.equal(lessonMistakes(wrong,'noun_clause_building').length,0);assert.equal(lessonMistakes(fixed,'noun_clause_cases').length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);}}
});
test('12C snapshots round-trip with strict case, actor, construction and content-time validation',()=>{
 for(const q of pool){const saved=recordLesson([],q,response(q),'s');assert.equal(saved[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:saved}),saved);for(const patch of [{nominalCase:'accusative'},{nominalCase:undefined},{nominalSubject:undefined},{nominalMainSubject:undefined},{nominalConstruction:undefined},{contentTime:'future_report'},{lessonId:'noun_clause_building'},{exerciseType:'typed_verb_noun'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...saved[0],...patch}]}));assert.equal(saved[0].conceptId,`vn_noun_clause_cases_${q.task}`);assert.deepEqual(saved[0].supportingRuleIds,[]);}
 assert.deepEqual(validatePilotImport({version:1}),[]);
});
test('12C is automatically available in broad mix, separate progress modalities and cross-mode review',()=>{
 const items=grammarItems.filter(i=>i.kind==='lesson'&&i.q.lessonId==='noun_clause_cases');assert.ok(items.length>0);const i=items.find(i=>i.kind==='lesson'&&i.q.task==='build')!;if(i.kind!=='lesson')throw Error('lesson');const ids=[...i.q.expectedChunkIds!];ids[2]=i.q.chunks!.find(c=>c.id.endsWith('-wrong-case'))!.id;const a=recordGrammarItem([],i,JSON.stringify(ids),'random','');assert.equal(a[0].sessionKind,'random_grammar');assert.equal(grammarMistakes(a)[0].q.id,i.q.id);assert.equal(lessonMistakes(a,'noun_clause_cases','build').length,1);const card=grammarProgress(a).concepts.find(c=>c.id===itemGroup(i))!;assert.equal(card.modes.assembly!.attempts,1);assert.equal(card.modes.typed!.available,12);assert.equal(card.modes.meaning,undefined);assert.equal(card.missed,1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
});
