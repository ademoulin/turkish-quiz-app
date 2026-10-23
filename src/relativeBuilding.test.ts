import {test} from 'node:test';
import assert from 'node:assert/strict';
import {relativeBuildingExamples as models,validRelativeBuildingEvidence} from './verbNounRelativeBuilding';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {assembledSentence} from './sentenceChunks';
import {grammarItems,itemGroup,recordGrammarItem,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
const pool=lessonPool('relative_building'),build=lessonPool('relative_building','build');
const response=(q:typeof pool[number])=>q.task==='build'?JSON.stringify(q.expectedChunkIds):'target';
test('12D crosses three relative families with four head roles, keeping inner actors and outer case separate',()=>{
 assert.equal(models.length,12);assert.equal(pool.length,12);assert.equal(build.length,12);assert.equal(lessonPool('relative_building','type').length,0);
 for(const form of ['an','dik','acak'])for(const c of ['bare','accusative','dative','ablative'])assert.equal(models.filter(e=>e.relativeConstruction===form&&e.relativeHeadCase===c).length,1);
 for(const [time,count] of [['past',2],['current',2],['habitual',4],['future',4]] as const)assert.equal(models.filter(e=>e.relativeTime===time).length,count);
 for(const e of models){assert.equal(validRelativeBuildingEvidence(e),true);assert.equal(assembledSentence(e.expectedChunkIds!,e.chunks!),e.sentence);assert.equal(new Set(e.chunks!.map(c=>c.text)).size,6);assert.equal(e.nominalCase,undefined);assert.equal(e.nominalSubject,undefined);assert.equal(e.relativeForm,undefined);assert.deepEqual(e.supportingRuleIds,[]);assert.equal(e.sourceClauses!.length,2);assert.match(e.structureAnswer!,/\[\[/);assert.match(e.explanation,/complete noun phrase/);assert.match(e.explanation,/All forms and main predicates are supplied/);}
 for(const q of pool){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);if(q.task==='build'){assert.ok(q.prompt.includes(models.find(e=>e.id===q.exampleId)!.meaning));assert.notEqual(q.sentence,q.expected);}else{assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);}}
});
test('12D grades wrong modifiers and head cases once, preserving original snapshots when corrected',()=>{
 for(const q of build)for(const part of ['wrong-modifier','wrong-case']){
  const selected=[...q.expectedChunkIds!];selected[part==='wrong-modifier'?0:1]=q.chunks!.find(c=>c.id.endsWith('-'+part))!.id;
  const a=recordLesson([],q,JSON.stringify(selected),'s');assert.equal(a[0].correct,false);assert.equal(recordLesson(a,q,response(q),'s').length,1);const fixed=correctPilot(a,a[0].id);
  for(const key of ['id','time','sessionId','questionId','conceptId','answer','chunks','selectedChunkIds','expectedChunkIds','relativeConstruction','relativeHeadCase','relativeHeadBase','relativeActor','relativeHead','relativeTime'] as const)assert.deepEqual(fixed[0][key],a[0][key]);
  assert.equal(fixed[0].correct,true);assert.equal(fixed[0].manual,true);assert.equal(lessonMistakes(a,'relative_building','build').length,1);assert.equal(lessonMistakes(a,'object_relatives').length,0);assert.equal(lessonMistakes(a,'relative_building','structure').length,0);assert.equal(lessonMistakes(fixed,'relative_building').length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
 for(const q of pool.filter(q=>q.task!=='build')){assert.equal(recordLesson([],q,'other-1','s')[0].correct,false);assert.equal(recordLesson([],q,'target','s')[0].correct,true);assert.deepEqual(recordLesson([],q,'not-an-option','s'),[]);}
});
test('12D backup metadata is required only for the new lesson and old version-1 results still import',()=>{
 for(const q of pool){const a=recordLesson([],q,response(q),'s');assert.equal(a[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.equal(a[0].conceptId,`vn_relative_building_${q.task}`);
  for(const patch of [{relativeConstruction:undefined},{relativeConstruction:'wrong'},{relativeConstruction:['an']},{relativeHeadCase:undefined},{relativeHeadCase:'locative'},{relativeHeadCase:['accusative']},{relativeHeadBase:''},{relativeActor:''},{relativeHead:undefined},{relativeTime:undefined},{relativeForm:'dik'},{nominalCase:'accusative'},{nominalSubject:'ben'},{lessonTask:'type'},{lessonId:'object_relatives'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 }
 const older=lessonPool('object_relatives','type')[0],a=recordLesson([],older,older.expected,'old');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],relativeHeadCase:'bare'}]}));assert.deepEqual(validatePilotImport({version:1}),[]);
 const future=recordLesson([],pool.find(q=>q.relativeConstruction==='acak')!,'target','f')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...future,relativeTime:'past'}]}));
});
test('12D enters the broad mix, review and separate assembly evidence without granting typed credit',()=>{
 const items=grammarItems.filter(i=>i.kind==='lesson'&&i.q.lessonId==='relative_building');assert.equal(items.length,12);assert.equal(selectGrammarMix(items).length,12);
 const i=items.find(i=>i.kind==='lesson'&&i.q.task==='build')!;if(i.kind!=='lesson')throw Error('lesson');const selected=[...i.q.expectedChunkIds!];selected[1]=i.q.chunks!.find(c=>c.id.endsWith('-wrong-case'))!.id;
 const a=recordGrammarItem([],i,JSON.stringify(selected),'random','');assert.equal(a[0].sessionKind,'random_grammar');assert.equal(grammarMistakes(a)[0].q.id,i.q.id);assert.equal(lessonMistakes(a,'relative_building','build').length,1);
 const card=grammarProgress(a).concepts.find(c=>c.id===itemGroup(i))!;assert.equal(card.modes.assembly!.attempts,1);assert.equal(card.modes.typed,undefined);assert.equal(card.modes.structure,undefined);assert.equal(card.missed,1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
});
test('12D mixed sessions assess each model once and balance meaning, structure and assembly',()=>{
 for(let n=0;n<20;n++){const mixed=selectLessonQuestions('relative_building');assert.equal(mixed.length,12);assert.equal(new Set(mixed.map(q=>q.exampleId)).size,12);for(const task of ['build'] as const){assert.equal(mixed.filter(q=>q.task===task).length,12);assert.equal(selectLessonQuestions('relative_building',task).length,12);}}
});
