import {pronounCaseMistakes} from './pronounCases';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mixedGrammarQuestions as bank,mixedGrammarFamilies,mixedGrammarFamily,selectMixedGrammarPool,selectMixedGrammarQuestions,mixedGrammarMistakes} from './mixedGrammar';
import {caseQuestions,recordPilot,correctPilot,validatePilotImport,pilotMistakes} from './casePilot';
import {possessiveMistakes} from './possessives';
import {phraseMistakes} from './nounPhrases';
import {possessedCaseMistakes} from './possessedCases';
import {suffixChainMistakes} from './suffixChains';
test('mixed catalog reuses all 238 registered question objects with distinct IDs',()=>{
 assert.ok(bank.length>0);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const [family,qs] of Object.entries(mixedGrammarFamilies)){
  for(const q of qs){assert.equal(bank.find(b=>b.id===q.id),q);assert.equal(mixedGrammarFamily(q),family);}
 }
});
test('12-question practice balances every family with two, no repeats or mutation',()=>{
 const before=JSON.stringify(bank);
 for(const random of [()=>.1,()=>.6,()=>.9]){
  const qs=selectMixedGrammarQuestions(random);assert.equal(qs.length,12);assert.equal(new Set(qs.map(q=>q.id)).size,12);
  for(const family of Object.keys(mixedGrammarFamilies)){const count=qs.filter(q=>mixedGrammarFamily(q)===family).length;assert.equal(count,2);}
 }
 assert.notDeepEqual(selectMixedGrammarQuestions(()=>.1),selectMixedGrammarQuestions(()=>.9));
 assert.equal(JSON.stringify(bank),before);
});
test('previous-mistake pools cap at 12, fill scarce families, never pad or duplicate',()=>{
 assert.deepEqual(selectMixedGrammarPool([]),[]);
 const one=mixedGrammarFamilies.phrases[0];assert.deepEqual(selectMixedGrammarPool([one,one]),[one]);
 const scarce: typeof bank=[one,...caseQuestions.slice(0,20)];const chosen=selectMixedGrammarPool(scarce,()=>.2);
 assert.equal(chosen.length,12);assert.ok(chosen.includes(one));assert.ok(chosen.every(q=>scarce.includes(q)));assert.equal(new Set(chosen.map(q=>q.id)).size,12);
 const six=Object.values(mixedGrammarFamilies).map(qs=>qs[0]);assert.equal(selectMixedGrammarPool(six).length,6);
});
test('mixed correctness and correction clear the same focused queues without cross-credit',()=>{
 const questions=Object.values(mixedGrammarFamilies).map(qs=>qs[0]);
 const misses=questions.flatMap(q=>recordPilot([],q,'wrong','focused-'+q.id));
 assert.equal(mixedGrammarMistakes(misses).length,6);
 assert.deepEqual(pilotMistakes(misses),[mixedGrammarFamilies.cases[0]]);
 assert.deepEqual(possessiveMistakes(misses),[mixedGrammarFamilies.possessives[0]]);
 assert.deepEqual(phraseMistakes(misses),[mixedGrammarFamilies.phrases[0]]);
 assert.deepEqual(possessedCaseMistakes(misses),[mixedGrammarFamilies.add_case[0]]);
 assert.deepEqual(suffixChainMistakes(misses),[mixedGrammarFamilies.build_from_base[0]]);
 assert.deepEqual(pronounCaseMistakes(misses),[mixedGrammarFamilies.pronoun_cases[0]]);
 let reviewed=[...misses];
 for(const q of questions)reviewed=recordPilot(reviewed,q,q.answer,'mixed-review','mixed_grammar_review');
 // Later history wins on timestamp ties; give new successes an explicit later timestamp.
 reviewed=reviewed.map(a=>a.sessionId==='mixed-review'?{...a,time:'2090-01-01T00:00:00Z'}:a);
 assert.deepEqual(mixedGrammarMistakes(reviewed),[]);assert.deepEqual(pronounCaseMistakes(reviewed),[]);
 assert.deepEqual(pilotMistakes(reviewed),[]);assert.deepEqual(possessiveMistakes(reviewed),[]);
 assert.deepEqual(phraseMistakes(reviewed),[]);assert.deepEqual(possessedCaseMistakes(reviewed),[]);assert.deepEqual(suffixChainMistakes(reviewed),[]);
 const original=misses[0],corrected=correctPilot(misses,original.id);
 assert.equal(corrected.length,6);assert.equal(corrected[0].time,original.time);assert.equal(corrected[0].id,original.id);
 assert.equal(mixedGrammarMistakes(corrected).length,5);
 assert.deepEqual(mixedGrammarMistakes([...misses,{...original,correct:true,manual:true}]).map(q=>q.id),mixedGrammarMistakes(corrected).map(q=>q.id));
 const unknown={...original,id:'unknown-attempt',questionId:'retired-question'};
 assert.equal(mixedGrammarMistakes([unknown]).length,0);
});

test('mixed attempts preserve strict per-exercise grading, context, session and duplicate protection',()=>{
 for(const qs of Object.values(mixedGrammarFamilies)){
  const q=qs[0],input=' '+q.answer.normalize('NFD')+' ';
  const a=recordPilot([],q,input,'mix','mixed_grammar');const result=a[0];
  assert.equal(result.correct,true);assert.equal(result.questionId,q.id);assert.equal(result.conceptId,q.conceptId);assert.equal(result.exerciseType,q.exerciseType);assert.equal(result.sessionId,'mix');assert.equal(result.practiceMode,'mixed_grammar');
  assert.deepEqual(result.supportingRuleIds,q.supportingRuleIds);
  assert.equal(recordPilot(a,q,q.answer,'mix','mixed_grammar'),a);
  if('owner' in q){assert.equal(result.owner,q.owner);assert.equal(result.nounNumber,q.nounNumber);}
  if('baseNoun' in q)assert.equal(result.baseNoun,q.baseNoun);
  if('givenForm' in q)assert.equal(result.givenForm,q.givenForm);
  if('pronoun' in q)assert.equal(result.pronoun,q.pronoun);
  assert.equal(recordPilot([],q,q.answer+'.','bad','mixed_grammar')[0].correct,false);
 }
 const phrase=mixedGrammarFamilies.phrases[0];
 assert.equal(recordPilot([],phrase,phrase.answer.replace(' ','   '),'phrase','mixed_grammar')[0].correct,true);
 for(const [input,expected] of [['i','ı'],['g','ğ'],['s','ş'],['c','ç'],['o','ö'],['u','ü']]){
  assert.equal(recordPilot([],{...caseQuestions[0],answer:expected},input,'strict','mixed_grammar')[0].correct,false);
 }
});
test('version-1 backups support both mixed modes and retain legacy attempts',()=>{
 const attempts=Object.values(mixedGrammarFamilies).flatMap(qs=>['mixed_grammar','mixed_grammar_review'].flatMap(mode=>recordPilot([],qs[0],'wrong',mode+qs[0].id,mode as any)));
 const old=recordPilot([],caseQuestions[1],'wrong','old')[0];delete old.practiceMode;
 const all=[old,...attempts];assert.deepEqual(validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:all}))),all);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...attempts[0],practiceMode:'unrecognized'}]}));
});
