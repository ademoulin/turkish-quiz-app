import {test} from 'node:test';
import assert from 'node:assert/strict';
import {singularPossessedCaseQuestions as bank, possessedCaseConcepts, possessedCaseCatalogMapping, selectPossessedCaseQuestions, possessedCaseMistakes} from './possessedCases';
import {caseQuestions, recordPilot, correctPilot, validatePilotImport, pilotMistakes} from './casePilot';
import {possessiveQuestions, possessiveMistakes} from './possessives';
import {phraseQuestions, phraseMistakes} from './nounPhrases';
test('48 distinct authored possessed-case prompts, twelve per case, with explicit supplied possession',()=>{
 assert.ok(bank.length>0);
 const allQuestions=[...caseQuestions,...possessiveQuestions,...phraseQuestions,...bank];assert.equal(new Set(allQuestions.map(q=>q.id)).size,allQuestions.length);
 for(const c of Object.keys(possessedCaseConcepts)) assert.equal(bank.filter(q=>q.conceptId===c).length,12);
 for(const q of bank){
  assert.equal(q.conceptId,`possessed_${q.requiredCase}`);
  assert.equal(q.base,q.givenForm); assert.equal(q.nounNumber,'singular');
  assert.equal(q.source,'newly_authored'); assert.equal(q.reviewStatus,'draft_needs_independent_review');
  assert.ok(q.givenMeaning); assert.ok(q.sentence.includes('___')); assert.ok(q.explanation.includes(q.answer));
  assert.ok(q.answer.startsWith(q.givenForm));
  assert.equal(q.answerScope==='phrase',q.givenForm.includes(' '));
  if(q.answerScope==='phrase') assert.equal(q.answer.split(' ')[0],q.givenForm.split(' ')[0]);
 }
 assert.equal(bank.filter(q=>q.supportingRuleIds.includes('buffer_n')).length,16);
 assert.equal(possessedCaseCatalogMapping.testedRules.accusative,35);
});
test('correct stacked endings include third-person n and four-way accusative harmony',()=>{
 const expected=['evimde','çantanda','arabasında','köyümüzde','ofisinizde','çocuğun odasında','okuluma','odana','bahçesine','evimize','arabanıza','öğretmenin masasına','odamdan','cebinden','ofisinden','okulumuzdan','bahçenizden','kedinin yatağından','kalemimi','çantanı','gözünü','topumuzu','kedinizi','çocuğun kitabını'];
 assert.deepEqual(bank.filter(q=>Number(q.id.slice(-2))<=6).map(q=>q.answer),expected);
 for(const q of bank) assert.equal(recordPilot([],q,' '+q.answer.normalize('NFD')+' ','s','mixed_possessed_cases')[0].correct,true);
 for(const [given,wrong] of [['arabası','arabasıda'],['bahçesi','bahçesiye'],['ofisi','ofisiden'],['gözü','gözüyü'],['çantan','çantayı'],['evim','evinde']]){
  const q=bank.find(q=>q.givenForm===given)!;
  assert.equal(recordPilot([],q,wrong,'bad')[0].correct,false);
 }
});
test('stacked grading keeps Turkish spelling, punctuation and answer scope strict',()=>{
 const q=bank.find(q=>q.answer==='gözünü')!;
 for(const wrong of ['gozunu','gözuni','gözünü.','onun gözünü','gö zünü']) assert.equal(recordPilot([],q,wrong,'s')[0].correct,false);
 assert.equal(recordPilot([],q,' GÖZÜNÜ ','s')[0].correct,true);
 const phrase=bank.find(q=>q.id==='possessed-accusative-06')!;
 assert.equal(recordPilot([],phrase,' çocuğun   kitabını ','s')[0].correct,true);
 for(const wrong of ['kitabını','çocuğun kitabı','çocugun kitabını','çocuğun kitabını.','kitabını çocuğun']) assert.equal(recordPilot([],phrase,wrong,'s')[0].correct,false);
});
test('selection shuffles without mutating the bank and filters review by deliberate concept',()=>{
 const before=JSON.stringify(bank);
 assert.equal(selectPossessedCaseQuestions().length,48);
 assert.notDeepEqual(selectPossessedCaseQuestions('mixed',()=>.1),selectPossessedCaseQuestions('mixed',()=>.9));
 const q=bank[0], a=recordPilot([],q,'wrong','s');
 assert.deepEqual(possessedCaseMistakes(a,'possessed_locative'),[q]);
 assert.deepEqual(possessedCaseMistakes(a,'possessed_dative'),[]);
 assert.equal(selectPossessedCaseQuestions('possessed_accusative').length,12);
 assert.equal(JSON.stringify(bank),before);
});
test('stored snapshots, double-score lock, correction and later success preserve separate evidence',()=>{
 const q=bank.at(-1)!, bad=recordPilot([],q,'wrong','s','mixed_possessed_cases');
 assert.equal(recordPilot(bad,q,q.answer,'s'),bad);
 const a=bad[0];
 assert.equal(a.givenForm,q.givenForm);assert.equal(a.requiredCase,'accusative');assert.equal(a.answerScope,'phrase');
 assert.equal(a.exerciseType,'typed_possessed_case');assert.equal(a.owner,q.owner);assert.equal(a.nounNumber,'singular');
 const corrected=correctPilot(bad,a.id);
 assert.equal(corrected.length,1);assert.equal(corrected[0].time,a.time);assert.equal(corrected[0].id,a.id);assert.equal(corrected[0].manual,true);
 assert.deepEqual(possessedCaseMistakes(corrected),[]);
 const good=recordPilot([],q,q.answer,'next','single_possessed_case')[0];
 assert.deepEqual(possessedCaseMistakes([a,{...good,time:'2090-01-01T00:00:00Z'}]),[]);
 assert.deepEqual(pilotMistakes(bad),[]);assert.deepEqual(possessiveMistakes(bad),[]);assert.deepEqual(phraseMistakes(bad),[]);
});
test('version-1 backups round-trip new and old histories, rejecting missing or inconsistent new metadata',()=>{
 const a=recordPilot([],bank[0],'wrong','s','single_possessed_case')[0];
 const old=recordPilot([],caseQuestions[0],'wrong','old')[0];delete old.practiceMode;
 const all=[a,old,recordPilot([],possessiveQuestions[0],'wrong','p')[0],recordPilot([],phraseQuestions[0],'wrong','f')[0]];
 assert.deepEqual(validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:all}))),all);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
 for(const patch of [{givenForm:undefined},{requiredCase:'genitive'},{requiredCase:'dative'},{answerScope:undefined},{answerScope:'phrase'},{owner:''},{nounNumber:undefined},{exerciseType:'typed_form_completion'}]) assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,exerciseType:'typed_possessed_case'}]}));
});

test('owner contrasts keep distinct questions despite identical second/third-person surfaces',()=>{
 for(const [c,second,third] of [['locative','evinde','evinde'],['dative','evine','evine'],['ablative','evinden','evinden'],['accusative','evini','evini']]){
  const sen=bank.find(q=>q.requiredCase===c&&q.givenForm==='evin')!;
  const o=bank.find(q=>q.requiredCase===c&&q.givenForm==='evi')!;
  assert.equal(sen.owner,'sen');assert.equal(sen.givenMeaning,'your house');assert.equal(sen.answer,second);
  assert.equal(o.owner,'o');assert.equal(o.givenMeaning,'his/her house');assert.equal(o.answer,third);
  assert.ok(!sen.supportingRuleIds.includes('buffer_n'));assert.ok(o.supportingRuleIds.includes('buffer_n'));
  const missed=recordPilot([],sen,'wrong','s');assert.deepEqual(possessedCaseMistakes(missed),[sen]);
 }
});
