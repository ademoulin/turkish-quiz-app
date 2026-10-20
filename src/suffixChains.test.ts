import {test} from 'node:test';
import assert from 'node:assert/strict';
import {suffixChainQuestions as bank,selectSuffixChainQuestions,suffixChainMistakes,suffixChainCatalogMapping} from './suffixChains';
import {caseQuestions,recordPilot,correctPilot,validatePilotImport} from './casePilot';
import {possessedCaseQuestions,possessedCaseMistakes} from './possessedCases';
import {phraseQuestions} from './nounPhrases';
import {possessiveQuestions} from './possessives';
test('24 authored whole-chain questions are distinct, balanced and explicit',()=>{
 assert.equal(bank.length,24);assert.equal(bank.filter(q=>q.nounNumber==='singular').length,12);
 assert.equal(new Set([...bank,...caseQuestions,...possessedCaseQuestions,...phraseQuestions,...possessiveQuestions].map(q=>q.id)).size,190);
 for(const c of ['locative','dative','ablative','accusative']){
  const qs=bank.filter(q=>q.requiredCase===c);assert.equal(qs.length,6);assert.equal(qs.filter(q=>q.nounNumber==='plural').length,3);assert.deepEqual(qs.map(q=>q.owner),['ben','sen','o','biz','siz','onlar']);
 }
 for(const q of bank){assert.equal(q.base,q.baseNoun);assert.ok(q.baseMeaning);assert.equal(q.conceptId,`suffix_chain_${q.requiredCase}`);assert.equal(q.exerciseType,'typed_suffix_chain');assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.ok(q.explanation.includes(q.answer));if(q.owner==='onlar')assert.equal(q.nounNumber,'plural');}
 assert.equal(suffixChainCatalogMapping.testedRules.possession,20);assert.equal(suffixChainCatalogMapping.pluralCatalogRule,null);
});
test('complete words require plural/possession/case with softening and third-person n',()=>{
 const expected=['kitabımda','evlerinde','odasında','köylerimizde','okulunuzda','arabalarında','çantalarıma','köpeğine','kedilerine','evimize','bahçenize','odalarına','gözümden','arabandan','evinden','kitaplarımızdan','çantalarınızdan','okullarından','kitaplarımı','çantanı','gözünü','çocuğumuzu','evlerinizi','köpeklerini'];
 assert.deepEqual(bank.map(q=>q.answer),expected);
 for(const [i,q] of bank.entries())assert.equal(recordPilot([],q,' '+expected[i].normalize('NFD')+' ','s','build_from_base')[0].correct,true);
 for(const wrong of ['kitapta','kitabım','kitapımda','kitaplarımda','kitabında','kitabimda','benim kitabımda','kitabımda.'])assert.equal(recordPilot([],bank[0],wrong,'s')[0].correct,false);
 assert.equal(recordPilot([],bank[0],' KİTABIMDA ','s')[0].correct,true);
 assert.equal(recordPilot([],bank[2],'odasıda','s')[0].correct,false);
 assert.equal(recordPilot([],bank[23],'köpeklerlerini','s')[0].correct,false);
});
test('case and number filters select 24, 12, 6 or 3 without mutation',()=>{
 const before=JSON.stringify(bank);
 assert.equal(selectSuffixChainQuestions().length,24);
 for(const n of ['singular','plural'] as const){assert.equal(selectSuffixChainQuestions('mixed',n).length,12);assert.equal(selectSuffixChainQuestions('suffix_chain_locative',n).length,3);}
 assert.equal(selectSuffixChainQuestions('suffix_chain_dative','mixed').length,6);
 assert.notDeepEqual(selectSuffixChainQuestions('mixed','mixed',()=>.1),selectSuffixChainQuestions('mixed','mixed',()=>.9));assert.equal(JSON.stringify(bank),before);
});
test('full-chain evidence snapshots differ from add-case evidence and correction updates the original',()=>{
 const q=bank[0],old=recordPilot([],possessedCaseQuestions[0],'wrong','add');const a=recordPilot(old,q,'wrong','build','build_from_base');
 assert.equal(a[1].baseNoun,'kitap');assert.equal(a[1].owner,'ben');assert.equal(a[1].nounNumber,'singular');assert.equal(a[1].requiredCase,'locative');assert.equal(a[1].givenForm,undefined);
 assert.equal(recordPilot(a,q,q.answer,'build','build_from_base'),a);
 assert.deepEqual(suffixChainMistakes(a),[q]);assert.deepEqual(possessedCaseMistakes(a),[possessedCaseQuestions[0]]);
 const fixed=correctPilot(a,a[1].id);assert.equal(fixed.length,2);assert.equal(fixed[1].id,a[1].id);assert.equal(fixed[1].time,a[1].time);assert.equal(fixed[1].manual,true);assert.deepEqual(suffixChainMistakes(fixed),[]);
 assert.deepEqual(suffixChainMistakes(a,'suffix_chain_dative'),[]);
 assert.deepEqual(suffixChainMistakes(a,'mixed','plural'),[]);
 const next=recordPilot([],q,q.answer,'next','build_from_base')[0];assert.deepEqual(suffixChainMistakes([...a,{...next,time:'2090-01-01T00:00:00Z'}]),[]);
});
test('version-1 backups support full-chain snapshots alongside old result types',()=>{
 const a=recordPilot([],bank[0],'wrong','build','build_from_base')[0];
 const old=recordPilot([],caseQuestions[0],'wrong','case')[0];delete old.practiceMode;
 const all=[old,a,recordPilot([],possessedCaseQuestions[0],'wrong','add')[0],recordPilot([],phraseQuestions[0],'wrong','phrase')[0],recordPilot([],possessiveQuestions[0],'wrong','poss')[0]];
 assert.deepEqual(validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:all}))),all);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
 for(const patch of [{baseNoun:undefined},{baseNoun:''},{baseNoun:'iki kelime'},{owner:undefined},{owner:'teacher'},{nounNumber:undefined},{requiredCase:'genitive'},{requiredCase:'dative'},{exerciseType:'typed_possessed_case'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,exerciseType:'typed_suffix_chain'}]}));
});
