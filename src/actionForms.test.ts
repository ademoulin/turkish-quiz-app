import {test} from 'node:test';
import assert from 'node:assert/strict';
import {actionFormExamples as models} from './verbNounActionForms';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {lessonPool,selectLessonQuestions,recordLesson,lessonMistakes} from './verbNounPractice';
import {correctPilot,validatePilotImport,recordPilot,caseQuestions} from './casePilot';
import {grammarItems,itemGroup,recordGrammarItem,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
const pool=lessonPool('action_forms'),choices=lessonPool('action_forms','structure');

test('2B asks for context-driven forms without person agreement or answer-bearing suffix cues',()=>{
 assert.equal(models.length,24);assert.equal(pool.length,48);
 assert.equal(verbNounExamples.length,384);assert.equal(verbNounQuestions.length,445);
 const expected=['yüzmek','yüzmek','yüzmeyi','yüzmeye','yüzmekten','yüzmek','yüzmekte','okumak','okumak','okumayı','okumaya','okumaktan','okumak','okumakta','dinlemeyi','öğrenmeyi','koşmaya','yürümeye','konuşmaktan','çalışmaktan','dinlenmek','konuşmak','öğrenmekte','anlamakta'];
 assert.deepEqual(models.map(e=>e.answer),expected);
 for(const [i,e] of models.entries()){
  assert.equal(e.id,`vn2b-${String(i+1).padStart(2,'0')}`);assert.equal(e.form,'choose_action_form');
  assert.equal(e.nominalSubject,undefined);assert.equal(e.nominalCase,undefined);assert.equal(e.nominalConstruction,undefined);
  for(const q of pool.filter(q=>q.exampleId===e.id)){
   assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');
   if(q.task!=='meaning'){assert.equal(q.sentence,e.template);assert.ok(q.sentence.includes('___'));assert.ok(!q.sentence.includes(e.answer));assert.ok(q.prompt.includes(e.meaning));}
   if(q.task==='structure'){assert.equal(q.expected,e.answer);assert.equal(q.options!.length,5);assert.equal(new Set(q.options!.map(o=>o.text)).size,5);assert.equal(q.options!.find(o=>o.id==='target')!.text,e.answer);assert.deepEqual(q.supportingRuleIds,[]);}
  }
 }
 for(const e of models.filter(e=>e.main==='istiyorum'))assert.match(e.explanation,/Accusative nominal complements with istemek can also occur/);
});
test('2B distinguishes every offered ending, normalizes NFC/whitespace, and preserves Turkish spelling',()=>{
 for(const q of choices){for(const option of q.options!){const a=recordLesson([],q,option.id,'s');assert.equal(a[0].correct,option.id==='target');assert.equal(a[0].answer,option.text);assert.equal(recordLesson(a,q,'target','s').length,1);}}
 for(const q of lessonPool('action_forms','type')){
  assert.equal(recordLesson([],q,' '+q.expected.normalize('NFD')+' ','s')[0].correct,true);
  assert.deepEqual(recordLesson([],q,' ','s'),[]);
  const other=choices.find(c=>c.exampleId===q.exampleId)!.options!.filter(o=>o.id!=='target');
  for(const o of other)assert.equal(recordLesson([],q,o.text,'s')[0].correct,false);
  const ascii=q.expected.replaceAll('ü','u').replaceAll('ö','o').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ç','c').replaceAll('ğ','g');
  if(ascii!==q.expected)assert.equal(recordLesson([],q,ascii,'s')[0].correct,false);
 }
});
test('2B corrections update original attempts and new/older backups retain task-specific review evidence',()=>{
 let history=recordPilot([],caseQuestions[0],caseQuestions[0].answer,'old');
 for(const q of pool)history=recordLesson(history,q,q.task==='type'?q.expected:'target','s-'+q.id);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);assert.deepEqual(validatePilotImport({version:1}),[]);
 const q=choices[0],wrong=recordLesson([],q,'other-1','wrong'),fixed=correctPilot(wrong,wrong[0].id);
 for(const key of ['id','time','sessionId','questionId','conceptId','lessonId','lessonTask','answer','expected','selectedOptionId','expectedOptionId'] as const)assert.equal(fixed[0][key],wrong[0][key]);
 assert.equal(lessonMistakes(wrong,'action_forms','structure').length,1);assert.equal(lessonMistakes(wrong,'action_forms','type').length,0);assert.equal(lessonMistakes(wrong,'cases').length,0);assert.equal(lessonMistakes(fixed,'action_forms').length,0);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 for(const patch of [{nominalSubject:'sen'},{nominalCase:'accusative'},{nominalConstruction:'ma'},{lessonTask:'build'},{exerciseType:'typed_verb_noun'},{conceptId:'vn_cases_structure'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...wrong[0],...patch}]}));
});
test('2B is included in random sessions and separates form-choice evidence from typed production',()=>{
 const items=grammarItems.filter(i=>i.kind==='lesson'&&i.q.lessonId==='action_forms');assert.equal(items.length,48);
 assert.equal(selectGrammarMix(items).length,12);
 const i=items.find(i=>i.q.id===choices[0].id)!;
 let history=recordGrammarItem([],i,'other-1','random','');assert.equal(history[0].sessionKind,'random_grammar');assert.equal(grammarMistakes(history)[0].q.id,i.q.id);
 const wrongCard=grammarProgress(history).concepts.find(c=>c.id===itemGroup(i))!;assert.equal(wrongCard.modes.structure!.attempts,1);assert.equal(wrongCard.modes.typed!.attempts,0);
 for(const q of pool)history=recordLesson(history,q,q.task==='type'?q.expected:'target','s-'+q.id);
 const card=grammarProgress(history).concepts.find(c=>c.id===itemGroup(i))!;
 assert.equal(card.modes.structure!.available,24);assert.equal(card.modes.typed!.available,24);assert.equal(card.modes.meaning,undefined);assert.equal(card.missed,0);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);
});
test('2B sessions use twelve distinct models and balance mixed tasks across the expanded bank',()=>{
 for(let i=0;i<20;i++){
  const mixed=selectLessonQuestions('action_forms');assert.equal(mixed.length,12);assert.equal(new Set(mixed.map(q=>q.exampleId)).size,12);
  for(const task of ['structure','type'] as const){assert.equal(mixed.filter(q=>q.task===task).length,6);const focused=selectLessonQuestions('action_forms',task);assert.equal(focused.length,12);assert.equal(new Set(focused.map(q=>q.id)).size,12);assert.ok(focused.every(q=>q.task===task));}
 }
});
