import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounExamples as examples,verbNounQuestions as bank} from './verbNouns';
import {lessonPool,selectLessonQuestions,lessonMistakes,recordLesson} from './verbNounPractice';
import {validatePilotImport,correctPilot,recordPilot,caseQuestions} from './casePilot';

test('24 authored model sentences produce 72 distinct meaning, structure and production tasks',()=>{
 assert.equal(examples.length,24);assert.equal(bank.length,72);assert.equal(new Set(bank.map(q=>q.id)).size,72);
 for(const lesson of ['activity','cases'] as const){assert.equal(lessonPool(lesson).length,36);for(const task of ['meaning','structure','type'] as const)assert.equal(lessonPool(lesson,task).length,12);}
 for(const e of examples){assert.equal(e.template.split('___').length,2);assert.equal(e.template.replace('___',e.answer).toLocaleLowerCase('tr'),e.sentence.toLocaleLowerCase('tr'));assert.equal(e.unit+' '+e.main+'.',e.sentence);assert.ok(e.unit.includes(e.answer)||e.unit.toLocaleLowerCase('tr').includes(e.answer));}
 for(const q of bank){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');if(q.task!=='type'){assert.equal(q.options?.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.equal(q.options!.find(o=>o.id===q.expectedOptionId)?.text,q.expected);assert.deepEqual(q.supportingRuleIds,[]);}}
 assert.equal(examples.filter(e=>e.form==='ma_accusative').length,4);assert.equal(examples.filter(e=>e.form==='ma_dative').length,4);assert.equal(examples.filter(e=>e.form==='mak_ablative').length,4);
});
test('mixed sessions balance tasks without reusing model sentences; focused sessions cover their whole task',()=>{
 for(const lesson of ['activity','cases'] as const){for(let i=0;i<10;i++){const pool=selectLessonQuestions(lesson);assert.equal(pool.length,12);assert.equal(new Set(pool.map(q=>q.exampleId)).size,12);for(const task of ['meaning','structure','type'])assert.equal(pool.filter(q=>q.task===task).length,4);}
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
 for(const [expected,bad] of [['yüzmek','yuzmek'],['çıkmak','cikmak'],['görmek','gormek'],['okumayı','okumayi'],['yürümeye','yurumeye'],['konuşmaktan','konusmaktan']]){const q=bank.find(q=>q.task==='type'&&q.expected===expected)!;assert.equal(recordLesson([],q,bad,'s')[0].correct,false);}
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
