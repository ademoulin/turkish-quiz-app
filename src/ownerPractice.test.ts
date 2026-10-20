import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ownerSelections,matchesOwner} from './practiceOwners';
import {suffixChainQuestions as chains,selectSuffixChainQuestions,suffixChainMistakes,countSuffixChainQuestions} from './suffixChains';
import {possessedCaseQuestions as adds,selectPossessedCaseQuestions,possessedCaseMistakes,countPossessedCaseQuestions} from './possessedCases';
import {recordPilot,correctPilot,validatePilotImport} from './casePilot';
test('owner filters intersect case and number for both methods without changing their banks',()=>{
 const before=JSON.stringify([chains,adds]);
 for(const {id:owner} of ownerSelections){
  for(const number of ['mixed','singular','plural'] as const){
   for(const c of ['mixed','locative','dative','ablative','accusative']){
    const cc=c==='mixed'?'mixed':`suffix_chain_${c}` as any, ac=c==='mixed'?'mixed':`possessed_${c}` as any;
    const expectedChains=chains.filter(q=>(c==='mixed'||q.requiredCase===c)&&(number==='mixed'||q.nounNumber===number)&&matchesOwner(q.owner,owner));
    const expectedAdds=adds.filter(q=>(c==='mixed'||q.requiredCase===c)&&(number==='mixed'||q.nounNumber===number)&&matchesOwner(q.owner,owner));
    assert.deepEqual(new Set(selectSuffixChainQuestions(cc,number,()=>.3,owner).map(q=>q.id)),new Set(expectedChains.map(q=>q.id)));
    assert.equal(countSuffixChainQuestions(cc,number,owner),expectedChains.length);
    assert.deepEqual(new Set(selectPossessedCaseQuestions(ac,()=>.3,number,owner).map(q=>q.id)),new Set(expectedAdds.map(q=>q.id)));
    assert.equal(countPossessedCaseQuestions(ac,number,owner),expectedAdds.length);
   }
  }
 }
 assert.equal(JSON.stringify([chains,adds]),before);
 assert.equal(countSuffixChainQuestions('mixed','mixed','ben'),8);
 assert.equal(countSuffixChainQuestions('mixed','singular','onlar'),0);
 assert.equal(countPossessedCaseQuestions('mixed','singular','onlar'),0);
 const named=selectPossessedCaseQuestions('mixed',()=>.2,'mixed','named');assert.ok(named.length>0);assert.ok(named.every(q=>!['ben','sen','o','biz','siz','onlar'].includes(q.owner)));
 assert.ok(selectPossessedCaseQuestions('mixed',()=>.2,'mixed','o').every(q=>q.owner==='o'));
});
test('new forms have stable appended IDs and require the intended owner, number and spelling',()=>{
 const expected=['evlerimde','evinde','evinde','evlerimizde','evinizde','evlerinde','kitabıma','evlerine','evine','köpeğimize','çantalarınıza','evlerine','evlerimden','evlerinden','evinden','odamızdan','kitabınızdan','evlerinden','çantamı','kitaplarını','evlerini','kutumuzu','köpeğinizi','evlerini'];
 const added=chains.filter(q=>Number(q.id.slice(-2))>6);assert.deepEqual(added.map(q=>q.answer),expected);
 assert.equal(added.length,24);assert.equal(new Set(chains.map(q=>q.id)).size,48);
 for(const q of added){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.equal(recordPilot([],q,q.answer.normalize('NFD'),'s','build_from_base')[0].correct,true);}
 const q=added.find(q=>q.answer==='kitabıma')!;
 for(const wrong of ['kitapıma','kitabı','kitabima','kitabıma.','benim kitabıma'])assert.equal(recordPilot([],q,wrong,'s')[0].correct,false);
 const their=added.find(q=>q.owner==='onlar'&&q.requiredCase==='locative')!;
 assert.equal(recordPilot([],their,'evlerlerinde','s')[0].correct,false);
});
test('identical answer surfaces retain owner-specific IDs, review and correction evidence',()=>{
 const sen=chains.find(q=>q.requiredCase==='locative'&&q.owner==='sen'&&q.nounNumber==='singular'&&q.baseNoun==='ev')!;
 const o=chains.find(q=>q.requiredCase==='locative'&&q.owner==='o'&&q.nounNumber==='singular'&&q.baseNoun==='ev')!;
 assert.equal(sen.answer,o.answer);assert.notEqual(sen.id,o.id);
 let a=recordPilot([],sen,'wrong','s','build_from_base');a=recordPilot(a,o,'wrong','o','build_from_base');
 assert.deepEqual(suffixChainMistakes(a,'mixed','singular','sen'),[sen]);
 assert.deepEqual(suffixChainMistakes(a,'mixed','singular','o'),[o]);
 const fixed=correctPilot(a,a[0].id);assert.equal(fixed[0].time,a[0].time);assert.equal(fixed[0].id,a[0].id);
 assert.deepEqual(suffixChainMistakes(fixed,'mixed','singular','sen'),[]);assert.deepEqual(suffixChainMistakes(fixed,'mixed','singular','o'),[o]);
 const add=adds.find(q=>q.owner==='sen'&&q.nounNumber==='singular')!;const both=recordPilot(a,add,'wrong','add');
 assert.deepEqual(possessedCaseMistakes(both,'mixed','singular','sen'),[add]);
 const restored=validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:both})));assert.deepEqual(restored,both);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
});
