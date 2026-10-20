import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounExamples as examples,verbNounQuestions as bank} from './verbNouns';
import {lessonPool,selectLessonQuestions,lessonMistakes,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot,recordPilot,caseQuestions} from './casePilot';

test('72 authored model sentences produce 216 distinct meaning, structure and production tasks',()=>{
 assert.equal(examples.length,72);assert.equal(bank.length,216);assert.equal(new Set(bank.map(q=>q.id)).size,216);
 for(const lesson of ['activity','cases','subjects','clause_cases','negation','content_dik'] as const){assert.equal(lessonPool(lesson).length,36);for(const task of ['meaning','structure','type'] as const)assert.equal(lessonPool(lesson,task).length,12);}
 for(const e of examples){assert.equal(e.template.split('___').length,2);assert.equal(e.template.replace('___',e.answer).toLocaleLowerCase('tr'),e.sentence.toLocaleLowerCase('tr'));assert.equal(e.unit+' '+e.main+'.',e.sentence);assert.ok(e.unit.includes(e.answer)||e.unit.toLocaleLowerCase('tr').includes(e.answer));}
 for(const q of bank){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');if(q.task!=='type'){assert.equal(q.options?.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.equal(q.options!.find(o=>o.id===q.expectedOptionId)?.text,q.expected);assert.deepEqual(q.supportingRuleIds,[]);}}
 assert.equal(examples.filter(e=>e.form==='ma_accusative').length,4);assert.equal(examples.filter(e=>e.form==='ma_dative').length,4);assert.equal(examples.filter(e=>e.form==='mak_ablative').length,4);
});
test('mixed sessions balance tasks without reusing model sentences; focused sessions cover their whole task',()=>{
 for(const lesson of ['activity','cases','subjects','clause_cases','negation','content_dik'] as const){for(let i=0;i<10;i++){const pool=selectLessonQuestions(lesson);assert.equal(pool.length,12);assert.equal(new Set(pool.map(q=>q.exampleId)).size,12);for(const task of ['meaning','structure','type'])assert.equal(pool.filter(q=>q.task===task).length,4);}
 for(const task of ['meaning','structure','type'] as const){const pool=selectLessonQuestions(lesson,task);assert.equal(pool.length,12);assert.equal(pool.every(q=>q.task===task&&q.lessonId===lesson),true);}}
});
test('option identity grades meanings and structures; blank, unknown and duplicate submissions do not score',()=>{
 for(const task of ['meaning','structure'] as const){const q=bank.find(q=>q.task===task)!;
 const a=recordLesson([],q,'target','s');assert.equal(a[0].correct,true);assert.equal(a[0].answer,q.expected);assert.equal(a[0].selectedOptionId,'target');assert.equal(recordLesson([],q,'other-1','s')[0].correct,false);
 assert.deepEqual(recordLesson([],q,'not-an-option','s'),[]);assert.deepEqual(recordLesson([],q,' ','s'),[]);assert.strictEqual(recordLesson(a,q,'other-1','s'),a);
 assert.equal(recordLesson([], {...q,options:[...q.options!].reverse()},'target','s')[0].correct,true);
 }
});
test('typed action nouns normalize NFC and edge whitespace while preserving Turkish spelling and required form',()=>{
 for(const q of bank.filter(q=>q.task==='type')){assert.equal(recordLesson([],q,' '+q.expected.normalize('NFD')+' ','s')[0].correct,true);assert.equal(recordLesson([],q,q.expected+'!','s')[0].correct,false);assert.deepEqual(recordLesson([],q,' ','s'),[]);}
 for(const [expected,bad] of [['yüzmek','yuzmek'],['çıkmak','cikmak'],['görmek','gormek'],['okumayı','okumayi'],['yürümeye','yurumeye'],['konuşmaktan','konusmaktan'],['çalışmanız','calismaniz'],['öğrenmemiz','ogrenmemiz'],['çalışmaları','calismalari']]){const q=bank.find(q=>q.task==='type'&&q.expected===expected)!;assert.equal(recordLesson([],q,bad,'s')[0].correct,false);}
 const q=bank.find(q=>q.task==='type'&&q.expected==='yüzmeye')!;assert.equal(recordLesson([],q,'yüzmek','s')[0].correct,false);
});
test('lesson review isolates both lesson and task; correcting a choice retains the original evidence',()=>{
 const q=bank.find(q=>q.lessonId==='activity'&&q.task==='meaning')!,a=recordLesson([],q,'other-1','s');assert.equal(lessonMistakes(a,'activity').length,1);assert.equal(lessonMistakes(a,'cases').length,0);assert.equal(lessonMistakes(a,'activity','type').length,0);
 const fixed=correctPilot(a,a[0].id);assert.equal(fixed[0].id,a[0].id);assert.equal(fixed[0].time,a[0].time);assert.equal(fixed[0].answer,a[0].answer);assert.equal(fixed[0].selectedOptionId,'other-1');assert.equal(lessonMistakes(fixed,'activity').length,0);
 const type=bank.find(other=>other.exampleId===q.exampleId&&other.task==='type')!;const both=recordLesson(a,type,type.expected,'type-session');assert.equal(lessonMistakes(both,'activity').length,1);
 assert.equal(lessonMistakes(recordLesson(a,q,'target','retry'),'activity').length,0);
});
test('old and new version-1 histories round-trip with strict lesson/task/exercise and choice validation',()=>{
 let a=recordPilot([],caseQuestions[0],'evde','old');for(const q of bank)a=recordLesson(a,q,q.task==='type'?q.expected:'target','session-'+q.id);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.deepEqual(validatePilotImport({version:1}),[]);
 const q=bank[0],wrong=recordLesson([],q,'other-1','bad'),fixed=correctPilot(wrong,wrong[0].id);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 for(const patch of [{lessonId:'unknown'},{lessonTask:'unknown'},{lessonId:'cases'},{exampleId:''},{exerciseType:'typed_form_completion'},{selectedOptionId:''},{expectedOptionId:''},{correct:false},{conceptId:'vn_activity_unknown'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[1],...patch}]}));
 const typed=a.find(a=>a.exerciseType==='typed_verb_noun')!;for(const patch of [{selectedOptionId:'target'},{expectedOptionId:'target'},{correct:false}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...typed,...patch}]}));
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],lessonId:'activity'}]}));
});

test('subject lesson covers each person twice and separates who-acts recognition from earlier chunk tasks',()=>{
 const examples=lessonPool('subjects','type');assert.equal(examples.length,12);
 for(const subject of ['ben','sen','o','biz','siz','onlar'])assert.equal(examples.filter(q=>q.nominalSubject===subject).length,2);
 for(const q of lessonPool('subjects')){
  assert.ok(q.nominalSubject);const a=recordLesson([],q,q.task==='type'?q.expected:'target','s');assert.equal(a[0].nominalSubject,q.nominalSubject);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
  if(q.task==='structure'){assert.match(q.prompt,/Who performs/);assert.ok(q.expected.includes(' · '));}
 }
 const matrix:Record<string,string>={ben:'gelmem',sen:'gelmen',o:'gelmesi',biz:'gelmemiz',siz:'gelmeniz',onlar:'gelmeleri'};
 for(const [subject,answer] of Object.entries(matrix)){const q=examples.find(q=>q.nominalSubject===subject)!;assert.equal(q.expected,answer);for(const other of Object.values(matrix).filter(other=>other!==answer))assert.equal(recordLesson([],q,other,'s')[0].correct,false);}
 const plural=examples.find(q=>q.nominalSubject==='onlar')!;assert.equal(recordLesson([],plural,'gelmesi','s')[0].correct,false);
 const choice=lessonPool('subjects','structure')[0],wrong=recordLesson([],choice,'other-1','s');assert.equal(lessonMistakes(wrong,'subjects','structure').length,1);assert.equal(lessonMistakes(wrong,'activity').length,0);assert.equal(lessonMistakes(wrong,'subjects','type').length,0);
 const fixed=correctPilot(wrong,wrong[0].id);assert.equal(fixed[0].id,wrong[0].id);assert.equal(fixed[0].time,wrong[0].time);assert.equal(fixed[0].nominalSubject,choice.nominalSubject);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 const a=recordLesson([],choice,'target','s')[0];for(const patch of [{nominalSubject:undefined},{nominalSubject:'unknown'},{nominalSubject:42},{lessonId:'cases'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
 const old=recordLesson([],lessonPool('activity')[0],'target','old')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,nominalSubject:'ben'}]}));
});

test('whole-clause case lesson balances cases and people, preserving both snapshots and separate structure evidence',()=>{
 const pool=lessonPool('clause_cases','type');assert.equal(pool.length,12);for(const c of ['accusative','dative','ablative'])assert.equal(pool.filter(q=>q.nominalCase===c).length,4);for(const p of ['ben','sen','o','biz','siz','onlar'])assert.equal(pool.filter(q=>q.nominalSubject===p).length,2);
 for(const q of lessonPool('clause_cases')){const a=recordLesson([],q,q.task==='type'?q.expected:'target','s');assert.equal(a[0].nominalCase,q.nominalCase);assert.equal(a[0].nominalSubject,q.nominalSubject);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);if(q.task==='structure'){assert.match(q.prompt,/outer case/);assert.match(q.expected,/connects the whole action clause/);}}
 const forms=['gelmeni','gelmesini','kalkmamızı','konuşmanızı','gelmeme','etmemize','gelmenize','gelmelerine','beklememden','konuşmandan','çalışmasından','çalışmalarından'];assert.deepEqual(pool.map(q=>q.expected),forms);
 for(const [expected,bad] of [['gelmeni','gelmen'],['gelmesini','gelmesii'],['gelmeme','gelmeye'],['gelmelerine','gelmelere'],['çalışmasından','çalışmasıdan'],['çalışmalarından','çalışmaların'],['kalkmamızı','kalkmamizi']]){const q=pool.find(q=>q.expected===expected)!;assert.equal(recordLesson([],q,bad,'s')[0].correct,false);}
 const examplesById=new Map(examples.map(e=>[e.id,e]));for(const q of pool){const e=examplesById.get(q.exampleId)!;assert.equal(e.supportingRuleIds.includes('buffer_n'),['o','onlar'].includes(q.nominalSubject!));}
 const q=lessonPool('clause_cases','structure')[0],wrong=recordLesson([],q,'other-1','s');assert.equal(lessonMistakes(wrong,'clause_cases','structure').length,1);assert.equal(lessonMistakes(wrong,'subjects').length,0);assert.equal(lessonMistakes(wrong,'clause_cases','type').length,0);const fixed=correctPilot(wrong,wrong[0].id);assert.equal(fixed[0].id,wrong[0].id);assert.equal(fixed[0].time,wrong[0].time);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 const a=recordLesson([],q,'target','s')[0];for(const patch of [{nominalCase:undefined},{nominalCase:'locative'},{nominalSubject:undefined},{nominalSubject:'unknown'},{lessonId:'subjects'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));const prior=recordLesson([],lessonPool('subjects')[0],'target','prior')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...prior,nominalCase:'dative'}]}));
});

test('negation contrasts distinguish suffix jobs, supplied main negation and actors without ambiguous meaning distractors',()=>{
 const models=examples.filter(e=>e.lessonId==='negation');
 assert.deepEqual(models.map(e=>e.answer),['gelmek','gelmeni','gelmen','gelmemen','gelmemeni','gelmeni','çıkmamak','çıkmak','konuşmasını','konuşmamasını','unutmamanız','çalışmamamız']);
 assert.deepEqual(models.map(e=>e.negationScope),['none','none','none','action','action','main','action','main','none','action','action','action']);
 for(const e of models){assert.ok(e.structurePrompt);assert.ok(e.structureAnswer);assert.ok(e.structureDistractors);assert.ok(e.negationScope);assert.equal(e.distractors.includes(e.meaning),false);}
 assert.match(models[3].breakdown,/me \(negative\) \+ me \(action noun\)/);
 assert.match(models[9].breakdown,/n \(buffer\)/);
 for(const e of models.filter(e=>e.main==='istemiyorum'))assert.equal(e.negationScope,'main');
 const pool=lessonPool('negation','type');for(const [index,bad] of [[3,'gelmen'],[4,'gelmeni'],[5,'gelmemeni'],[6,'çıkmak'],[7,'çıkmamak'],[9,'konuşmaması'],[11,'calismamamiz']] as const)assert.equal(recordLesson([],pool[index],bad,'s')[0].correct,false);
});
test('negation history, duplicate scoring, corrections and task review preserve scope and older backups',()=>{
 for(const q of lessonPool('negation')){
  const a=recordLesson([],q,q.task==='type'?q.expected:'target','s');assert.equal(a[0].negationScope,q.negationScope);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.strictEqual(recordLesson(a,q,'wrong','s'),a);
  for(const patch of [{negationScope:undefined},{negationScope:'both'},{nominalSubject:42},{nominalCase:'locative'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 }
 const q=lessonPool('negation','structure')[0],a=recordLesson([],q,'other-1','s');assert.equal(lessonMistakes(a,'negation','structure').length,1);assert.equal(lessonMistakes(a,'negation','type').length,0);assert.equal(lessonMistakes(a,'subjects').length,0);
 const corrected=correctPilot(a,a[0].id);assert.equal(corrected[0].id,a[0].id);assert.equal(corrected[0].time,a[0].time);assert.equal(corrected[0].answer,a[0].answer);assert.equal(corrected[0].negationScope,a[0].negationScope);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:corrected}),corrected);assert.equal(lessonMistakes(corrected,'negation').length,0);
 const old=recordLesson([],lessonPool('activity')[0],'target','old')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,negationScope:'none'}]}));
});

test('-DIK content models balance subjects and past/habitual contexts with explicit harmony, agreement and case forms',()=>{
 const models=examples.filter(e=>e.lessonId==='content_dik'),pool=lessonPool('content_dik','type');
 assert.deepEqual(pool.map(q=>q.expected),['geldiğimi','çalıştığımı','okuduğunu','yürüdüğünü','çıktığını','yüzdüğünü','bitirdiğimizi','buluştuğumuzu','gezdiğinizi','pişirdiğinizi','ettiklerini','kalktıklarını']);
 for(const person of ['ben','sen','o','biz','siz','onlar']){const pair=models.filter(e=>e.nominalSubject===person);assert.equal(pair.length,2);assert.deepEqual(pair.map(e=>e.contentTime),['past_event','habitual_fact']);}
 for(const e of models){assert.equal(e.nominalCase,'accusative');assert.ok(e.structurePrompt);assert.ok(e.structureAnswer);assert.equal(e.form,'dik_possessive_case');assert.equal(e.supportingRuleIds.includes('buffer_n'),['o','onlar'].includes(e.nominalSubject!));assert.equal(e.supportingRuleIds.includes('consonant_softening'),e.nominalSubject!=='onlar');assert.match(e.unit,e.contentTime==='past_event'?/dün/:/her /);}
 for(const [index,bad] of [[0,'geldikimi'],[1,'çalışdığımı'],[2,'okuduğumu'],[3,'yurudugunu'],[4,'çıkdığını'],[5,'yüzdüğü'],[6,'bitirdiğimi'],[7,'buluşduğumuzu'],[8,'gezdiğinizi!'],[10,'ettiğlerini'],[11,'kalkdıklarını']] as const)assert.equal(recordLesson([],pool[index],bad,'s')[0].correct,false);
 const plural=pool[10];assert.equal(recordLesson([],plural,'ettiğini','s')[0].correct,false); // explicit overt-plural cue, not a general grammatical ban
 for(const q of pool)assert.equal(recordLesson([],q,' '+q.expected.normalize('NFD')+' ','s')[0].correct,true);
});
test('-DIK results retain time context, subject and outer case across corrections, retries and legacy-compatible imports',()=>{
 for(const q of lessonPool('content_dik')){
  const saved=recordLesson([],q,q.task==='type'?q.expected:'target','s');assert.equal(saved[0].contentTime,q.contentTime);assert.equal(saved[0].nominalSubject,q.nominalSubject);assert.equal(saved[0].nominalCase,'accusative');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:saved}),saved);assert.strictEqual(recordLesson(saved,q,'wrong','s'),saved);
  for(const patch of [{contentTime:undefined},{contentTime:'future'},{nominalCase:undefined},{nominalCase:'dative'},{nominalSubject:undefined},{nominalSubject:42},{lessonId:'clause_cases'},{negationScope:'none'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...saved[0],...patch}]}));
 }
 const q=lessonPool('content_dik','structure')[0],wrong=recordLesson([],q,'other-1','s');assert.equal(lessonMistakes(wrong,'content_dik','structure').length,1);assert.equal(lessonMistakes(wrong,'content_dik','type').length,0);assert.equal(lessonMistakes(wrong,'negation').length,0);
 const corrected=correctPilot(wrong,wrong[0].id);for(const field of ['id','time','answer','contentTime','nominalSubject','nominalCase'] as const)assert.equal(corrected[0][field],wrong[0][field]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:corrected}),corrected);assert.equal(lessonMistakes(corrected,'content_dik').length,0);assert.equal(lessonMistakes(recordLesson(wrong,q,'target','retry'),'content_dik').length,0);
 const old=recordLesson([],lessonPool('activity')[0],'target','old')[0];assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,contentTime:'past_event'}]}));assert.deepEqual(validatePilotImport({version:1}),[]);
});
