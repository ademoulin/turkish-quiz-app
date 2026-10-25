import {test} from 'node:test';
import assert from 'node:assert/strict';
import {relativeNegationExamples as models,validRelativeNegationEvidence} from './verbNounRelativeNegation';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport} from './casePilot';
import {assembledSentence} from './sentenceChunks';
import {grammarItems,itemGroup,recordGrammarItem,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
const pool=lessonPool('relative_negation').filter(q=>q.id.startsWith('vn12f-')),build=lessonPool('relative_negation','build');
const response=(q:typeof pool[number])=>q.task==='build'?JSON.stringify(q.expectedChunkIds):'target';
test('12F crosses three relative families with all four independent polarity combinations, keeping inner actors and outer case separate',()=>{
 assert.equal(models.length,12);assert.equal(pool.length,12);assert.equal(build.length,12);assert.equal(lessonPool('relative_negation','type').length,12);
 for(const form of ['an','dik','acak'])for(const relative of ['positive','negative'])for(const main of ['positive','negative'])assert.equal(models.filter(e=>e.relativeConstruction===form&&e.relativePolarity===relative&&e.relativeMainPolarity===main).length,1);
 for(const c of ['bare','accusative','dative','ablative'])assert.equal(models.filter(e=>e.relativeHeadCase===c).length,3);
 for(const [time,count] of [['past',3],['current',2],['habitual',3],['future',4]] as const)assert.equal(models.filter(e=>e.relativeTime===time).length,count);
 for(const e of models){assert.equal(validRelativeNegationEvidence(e),true);assert.equal(assembledSentence(e.expectedChunkIds!,e.chunks!),e.sentence);assert.equal(new Set(e.chunks!.map(c=>c.text)).size,6);assert.equal(e.nominalCase,undefined);assert.equal(e.nominalSubject,undefined);assert.equal(e.relativeForm,undefined);assert.deepEqual(e.supportingRuleIds,[]);assert.equal(e.sourceClauses!.length,2);assert.match(e.structureAnswer!,/\[\[/);assert.match(e.explanation,/complete noun phrase/);assert.match(e.explanation,/All forms and main predicates are supplied/);}
 for(const q of pool){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.deepEqual(q.supportingRuleIds,[]);if(q.task==='build'){assert.ok(q.prompt.includes(models.find(e=>e.id===q.exampleId)!.meaning));assert.notEqual(q.sentence,q.expected);}else{assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);}}
});
test('12F grades flipped relative and main polarity once, preserving original snapshots when corrected',()=>{
 for(const q of build)for(const part of ['wrong-modifier','wrong-predicate']){
  const selected=[...q.expectedChunkIds!];selected[part==='wrong-modifier'?0:3]=q.chunks!.find(c=>c.id.endsWith('-'+part))!.id;
  const a=recordLesson([],q,JSON.stringify(selected),'s');assert.equal(a[0].correct,false);assert.equal(recordLesson(a,q,response(q),'s').length,1);const fixed=correctPilot(a,a[0].id);
  for(const key of ['id','time','sessionId','questionId','conceptId','answer','chunks','selectedChunkIds','expectedChunkIds','relativePolarity','relativeMainPolarity','relativeConstruction','relativeHeadCase','relativeHeadBase','relativeActor','relativeHead','relativeTime'] as const)assert.deepEqual(fixed[0][key],a[0][key]);
  assert.equal(fixed[0].correct,true);assert.equal(fixed[0].manual,true);assert.equal(lessonMistakes(a,'relative_negation','build').length,1);assert.equal(lessonMistakes(a,'object_relatives').length,0);assert.equal(lessonMistakes(a,'relative_negation','structure').length,0);assert.equal(lessonMistakes(fixed,'relative_negation').length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
 for(const q of pool.filter(q=>q.task!=='build')){assert.equal(recordLesson([],q,'other-1','s')[0].correct,false);assert.equal(recordLesson([],q,'target','s')[0].correct,true);assert.deepEqual(recordLesson([],q,'not-an-option','s'),[]);}
});
test('12F backup metadata is required only for the new lesson and old version-1 results still import',()=>{
 for(const q of pool){const a=recordLesson([],q,response(q),'s');assert.equal(a[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.equal(a[0].conceptId,`vn_relative_negation_${q.task}`);
  for(const patch of [{relativePolarity:undefined},{relativePolarity:'both'},{relativePolarity:[]},{relativeMainPolarity:undefined},{relativeMainPolarity:'none'},{relativeMainPolarity:[]},{relativeInnerRole:'dative'},{relativeInnerForm:'evde'},{negationScope:'action'},{relativeConstruction:undefined},{relativeConstruction:'wrong'},{relativeConstruction:['an']},{relativeHeadCase:undefined},{relativeHeadCase:'locative'},{relativeHeadCase:['accusative']},{relativeHeadBase:''},{relativeActor:''},{relativeHead:undefined},{relativeTime:undefined},{relativeForm:'dik'},{nominalCase:'accusative'},{nominalSubject:'ben'},{lessonTask:'type'},{lessonId:'object_relatives'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 }
 for(const oldLesson of ['relative_building','relative_roles','negation','activity'] as const){const q=lessonPool(oldLesson,'meaning')[0]||lessonPool(oldLesson,'build')[0]||lessonPool(oldLesson,'type')[0],a=recordLesson([],q,'target','old');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);for(const patch of [{relativePolarity:'negative'},{relativeMainPolarity:'positive'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));}
 const older=lessonPool('object_relatives','type')[0],a=recordLesson([],older,older.expected,'old');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],relativeHeadCase:'bare'}]}));assert.deepEqual(validatePilotImport({version:1}),[]);
 const future=recordLesson([],pool.find(q=>q.relativeConstruction==='acak')!,'target','f')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...future,relativeTime:'past'}]}));
});
test('12F enters the broad mix, review and separate assembly evidence without granting typed credit',()=>{
 const items=grammarItems.filter(i=>i.kind==='lesson'&&i.q.lessonId==='relative_negation'&&i.q.id.startsWith('vn12f-'));assert.equal(items.length,12);assert.equal(selectGrammarMix(items).length,12);
 const i=items.find(i=>i.kind==='lesson'&&i.q.task==='build')!;if(i.kind!=='lesson')throw Error('lesson');const selected=[...i.q.expectedChunkIds!];selected[3]=i.q.chunks!.find(c=>c.id.endsWith('-wrong-predicate'))!.id;
 const a=recordGrammarItem([],i,JSON.stringify(selected),'random','');assert.equal(a[0].sessionKind,'random_grammar');assert.equal(grammarMistakes(a)[0].q.id,i.q.id);assert.equal(lessonMistakes(a,'relative_negation','build').length,1);
 const card=grammarProgress(a).concepts.find(c=>c.id===itemGroup(i))!;assert.equal(card.modes.assembly!.attempts,1);assert.equal(card.modes.typed?.available,12);assert.equal(card.modes.structure?.available,12);assert.equal(card.missed,1);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
});
test('12F mixed sessions assess each model once and balance meaning and assembly',()=>{
 for(let n=0;n<20;n++){const mixed=selectLessonQuestions('relative_negation','build');assert.equal(mixed.length,12);assert.equal(new Set(mixed.map(q=>q.exampleId)).size,12);for(const task of ['build'] as const){assert.equal(mixed.filter(q=>q.task===task).length,12);assert.equal(selectLessonQuestions('relative_negation',task).length,12);}}
});

test('12F concrete negative participles keep negation before the participle and main negatives keep separate meanings',()=>{
 const expected=[['oynamayan','evde'],['gelen','tanımıyoruz'],['çalışmayan','kopyalamıyorum'],['eden','teşekkür ettim'],['okumadığım','arıyorsun'],['okuduğun','masada değil'],['etmediği','gitmiyoruz'],['kullandığımız','kopyalıyorsun'],['izlemeyeceğiniz','gündemde'],['izleyecekleri','seçmedik'],['gitmeyeceğim','gitmiyorsun'],['kullanacağın','siliyorum']];
 for(let i=0;i<models.length;i++){const e=models[i];assert.ok(e.answer.endsWith(expected[i][0]));assert.ok(e.main.endsWith(expected[i][1]));assert.match(e.structureAnswer!,new RegExp(`Description: ${e.relativePolarity}\\. Main statement: ${e.relativeMainPolarity}`));assert.equal(e.negationScope,undefined);assert.equal(e.relativeInnerRole,undefined);
  if(e.relativePolarity==='negative'){assert.match(e.breakdown,/ma \(negation\)|me \(negation\)/);assert.match(e.explanation,/not the -mA action-noun ending/);}
  const q=build[i],both=[...q.expectedChunkIds!];both[0]=q.chunks!.find(c=>c.id.endsWith('-wrong-modifier'))!.id;both[3]=q.chunks!.find(c=>c.id.endsWith('-wrong-predicate'))!.id;assert.equal(recordLesson([],q,JSON.stringify(both),'flipped')[0].correct,false);
 }
 assert.match(models[5].explanation,/değil, which negates the location statement/);
});

test('12F retired scope checks remain older evidence; meaning and assembly keep current progress',async()=>{
 const {retiredLessonQuestions,verbNounQuestions}=await import('./verbNouns');
 const oldQuestions=retiredLessonQuestions.filter(q=>q.lessonId==='relative_negation');assert.equal(oldQuestions.length,24);assert.ok(oldQuestions.every(q=>q.task==='structure'||q.task==='meaning'));
 const old=oldQuestions.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);assert.equal(grammarMistakes(old).length,0);assert.equal(lessonMistakes(old,'relative_negation').length,0);
 const row=grammarProgress(old).concepts.find(c=>c.id==='lesson_relative_negation')!;assert.equal(row.legacyChecks,24);assert.equal(row.attempts,0);assert.equal(row.modes.structure?.attempts,0);assert.equal(row.modes.meaning,undefined);assert.equal(row.modes.assembly!.available,12);
 assert.equal(lessonPool('relative_negation','structure').length,12);assert.ok(verbNounQuestions.filter(q=>q.lessonId==='relative_negation').every(q=>!q.id.endsWith('-v2')));
 const q=build[0],wrong=recordLesson(old,q,JSON.stringify(q.expectedChunkIds!.slice().reverse()),'new'),a=wrong.at(-1)!,fixed=correctPilot(wrong,a.id);assert.equal(fixed.at(-1)!.id,a.id);assert.equal(fixed.at(-1)!.time,a.time);assert.equal(fixed.at(-1)!.answer,a.answer);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(grammarMistakes(fixed).length,0);
});
