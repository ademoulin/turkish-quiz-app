import {test} from 'node:test';
import assert from 'node:assert/strict';
import {relativeRoleExamples as models,validRelativeRoleEvidence} from './verbNounRelativeRoles';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {assembledSentence} from './sentenceChunks';
import {grammarItems,itemGroup,recordGrammarItem,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
const pool=lessonPool('relative_roles').filter(q=>q.id.startsWith('vn12e-')),build=lessonPool('relative_roles','build');
const response=(q:typeof pool[number])=>q.task==='build'?JSON.stringify(q.expectedChunkIds):'target';
test('12E crosses three inner complement roles with four independent main-clause head roles, keeping inner actors and outer case separate',()=>{
 assert.ok(models.length>0);assert.ok(pool.length>0);assert.ok(build.length>0);assert.equal(lessonPool('relative_roles','type').length,12);
 for(const role of ['dative','locative','ablative'])for(const c of ['bare','accusative','dative','ablative'])assert.equal(models.filter(e=>e.relativeInnerRole===role&&e.relativeHeadCase===c).length,1);
 assert.equal(models.filter(e=>e.relativeConstruction==='dik').length,6);assert.equal(models.filter(e=>e.relativeConstruction==='acak').length,6);
 for(const actor of ['ben','sen','o','biz','siz','onlar'])assert.equal(models.filter(e=>e.relativeActor===actor).length,2);
 for(const [time,count] of [['past',4],['current',0],['habitual',2],['future',6]] as const)assert.equal(models.filter(e=>e.relativeTime===time).length,count);
 for(const e of models){assert.equal(validRelativeRoleEvidence(e),true);assert.equal(assembledSentence(e.expectedChunkIds!,e.chunks!),e.sentence);assert.equal(new Set(e.chunks!.map(c=>c.text)).size,6);assert.equal(e.nominalCase,undefined);assert.equal(e.nominalSubject,undefined);assert.equal(e.relativeForm,undefined);assert.deepEqual(e.supportingRuleIds,[]);assert.equal(e.sourceClauses!.length,2);assert.match(e.structureAnswer!,/\[\[/);assert.match(e.explanation,/complete noun phrase/);assert.match(e.explanation,/All forms and main predicates are supplied/);}
 for(const q of pool){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);if(q.task==='build'){assert.ok(q.prompt.includes(models.find(e=>e.id===q.exampleId)!.meaning));assert.notEqual(q.sentence,q.expected);}else{assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);}}
});
test('12E grades wrong modifiers and head cases once, preserving original snapshots when corrected',()=>{
 for(const q of build)for(const part of ['wrong-modifier','wrong-case']){
  const selected=[...q.expectedChunkIds!];selected[part==='wrong-modifier'?0:1]=q.chunks!.find(c=>c.id.endsWith('-'+part))!.id;
  const a=recordLesson([],q,JSON.stringify(selected),'s');assert.equal(a[0].correct,false);assert.equal(recordLesson(a,q,response(q),'s').length,1);const fixed=correctPilot(a,a[0].id);
  for(const key of ['id','time','sessionId','questionId','conceptId','answer','chunks','selectedChunkIds','expectedChunkIds','relativeInnerRole','relativeInnerForm','relativeConstruction','relativeHeadCase','relativeHeadBase','relativeActor','relativeHead','relativeTime'] as const)assert.deepEqual(fixed[0][key],a[0][key]);
  assert.equal(fixed[0].correct,true);assert.equal(fixed[0].manual,true);assert.equal(lessonMistakes(a,'relative_roles','build').length,1);assert.equal(lessonMistakes(a,'object_relatives').length,0);assert.equal(lessonMistakes(a,'relative_roles','structure').length,0);assert.equal(lessonMistakes(fixed,'relative_roles').length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
 for(const q of pool.filter(q=>q.task!=='build')){assert.equal(recordLesson([],q,'other-1','s')[0].correct,false);assert.equal(recordLesson([],q,'target','s')[0].correct,true);assert.deepEqual(recordLesson([],q,'not-an-option','s'),[]);}
});
test('12E backup metadata is required only for the new lesson and old version-1 results still import',()=>{
 for(const q of pool){const a=recordLesson([],q,response(q),'s');assert.equal(a[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.equal(a[0].conceptId,`vn_relative_roles_${q.task}`);assert.equal(a[0].relativeInnerRole,q.relativeInnerRole);assert.equal(a[0].relativeInnerForm,q.relativeInnerForm);
  for(const patch of [{relativeInnerRole:undefined},{relativeInnerRole:['dative']},{relativeInnerRole:'accusative'},{relativeInnerForm:undefined},{relativeInnerForm:[]},{relativeInnerForm:''},{relativeConstruction:'an'},{relativeConstruction:undefined},{relativeConstruction:'wrong'},{relativeConstruction:['an']},{relativeHeadCase:undefined},{relativeHeadCase:'locative'},{relativeHeadCase:['accusative']},{relativeHeadBase:''},{relativeActor:''},{relativeHead:undefined},{relativeTime:undefined},{relativeForm:'dik'},{nominalCase:'accusative'},{nominalSubject:'ben'},{lessonTask:'type'},{lessonId:'object_relatives'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 }
 for(const oldLesson of ['relative_building','object_relatives','activity'] as const){const q=lessonPool(oldLesson,'meaning')[0]||lessonPool(oldLesson,'build')[0]||lessonPool(oldLesson,'type')[0],a=recordLesson([],q,'target','old');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);for(const patch of [{relativeInnerRole:'dative'},{relativeInnerForm:'evde'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));}
 const older=lessonPool('object_relatives','type')[0],a=recordLesson([],older,older.expected,'old');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],relativeHeadCase:'bare'}]}));assert.deepEqual(validatePilotImport({version:1}),[]);
 const future=recordLesson([],pool.find(q=>q.relativeConstruction==='acak')!,'target','f')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...future,relativeTime:'past'}]}));
});
test('12E enters the broad mix, review and separate assembly evidence without granting typed credit',()=>{
 const items=grammarItems.filter(i=>i.kind==='lesson'&&i.q.lessonId==='relative_roles'&&i.q.id.startsWith('vn12e-'));assert.ok(items.length>0);assert.equal(selectGrammarMix(items).length,12);
 const i=items.find(i=>i.kind==='lesson'&&i.q.task==='build')!;if(i.kind!=='lesson')throw Error('lesson');const selected=[...i.q.expectedChunkIds!];selected[1]=i.q.chunks!.find(c=>c.id.endsWith('-wrong-case'))!.id;
 const a=recordGrammarItem([],i,JSON.stringify(selected),'random','');assert.equal(a[0].sessionKind,'random_grammar');assert.equal(grammarMistakes(a)[0].q.id,i.q.id);assert.equal(lessonMistakes(a,'relative_roles','build').length,1);
 const card=grammarProgress(a).concepts.find(c=>c.id===itemGroup(i))!;assert.equal(card.modes.assembly!.attempts,1);assert.equal(card.modes.typed?.available,12);assert.equal(card.modes.structure?.available,12);assert.equal(card.missed,1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
});
test('12E mixed sessions assess each model once and balance meaning, structure and assembly',()=>{
 for(let n=0;n<20;n++){const mixed=selectLessonQuestions('relative_roles','build');assert.ok(mixed.length>0);assert.equal(new Set(mixed.map(q=>q.exampleId)).size,mixed.length);for(const task of ['build'] as const){assert.equal(mixed.filter(q=>q.task===task).length,12);assert.equal(selectLessonQuestions('relative_roles',task).length,12);}}
});

test('12E reconstructs concrete inner-case sources instead of treating every relative head as a direct object',()=>{
 const expected=[['komşuya','komşu','bare'],['öğretmene','öğretmeni','accusative'],['öğrenciye','öğrenciye','dative'],['öğretmene','öğretmenden','ablative'],['kafede','kafe','bare'],['otelde','oteli','accusative'],['şehirde','şehre','dative'],['ofiste','ofisten','ablative'],['doktordan','doktor','bare'],['şehirden','şehri','accusative'],['mağazadan','mağazaya','dative'],['otelden','otelden','ablative']];
 for(let i=0;i<12;i++){const e=models[i],[inner,head,outer]=expected[i];assert.equal(e.relativeInnerForm,inner);assert.equal(e.relativeHead,head);assert.equal(e.relativeHeadCase,outer);assert.ok(e.sourceClauses![0].includes(inner));assert.ok(e.sourceClauses![1].toLocaleLowerCase('tr').includes(head));assert.match(e.explanation,/represented by a gap/);assert.match(e.structureAnswer!,/Inside: .* Outside:/);assert.equal(e.nominalCase,undefined);}
});
