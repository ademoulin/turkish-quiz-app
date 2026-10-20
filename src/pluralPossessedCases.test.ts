import {test} from 'node:test';
import assert from 'node:assert/strict';
import {possessedCaseQuestions as all, pluralPossessedCaseQuestions as bank, singularPossessedCaseQuestions as singular, selectPossessedCaseQuestions, possessedCaseMistakes} from './possessedCases';
import {recordPilot,correctPilot,validatePilotImport} from './casePilot';
test('24 new plural drafts cover four cases and all six explicitly stated owners',()=>{
 assert.equal(bank.length,24);assert.equal(all.length,72);assert.equal(new Set(all.map(q=>q.id)).size,72);
 for(const c of ['locative','dative','ablative','accusative']){
  const qs=bank.filter(q=>q.requiredCase===c);assert.equal(qs.length,6);
  assert.deepEqual(qs.map(q=>q.owner),['ben','sen','o','biz','siz','onlar']);
 }
 for(const q of bank){assert.equal(q.nounNumber,'plural');assert.ok(q.givenMeaning);assert.equal(q.base,q.givenForm);assert.equal(q.answerScope,'word');assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');}
 assert.equal(bank.filter(q=>q.supportingRuleIds.includes('buffer_n')).length,8);
});
test('plural suffixes remain intact and the case ending follows the supplied possessed form',()=>{
 const answers=['evlerimde','kitaplarında','çantalarında','odalarımızda','defterlerinizde','arabalarında','evlerime','kitaplarına','çantalarına','odalarımıza','defterlerinize','arabalarına','gözlerimden','çantalarından','ceplerinden','odalarımızdan','defterlerinizden','arabalarından','kitaplarımı','evlerini','kedilerini','çantalarımızı','gözlüklerinizi','arabalarını'];
 assert.deepEqual(bank.map(q=>q.answer),answers);
 for(const q of bank){assert.ok(q.answer.startsWith(q.givenForm));assert.equal(recordPilot([],q,' '+q.answer.normalize('NFD')+' ','s')[0].correct,true);}
 for(const [id,wrong] of [['locative-03','çantalarıda'],['dative-03','çantalarıya'],['ablative-03','cepleriden'],['accusative-03','kedileriyi'],['dative-02','kitaplarıma'],['accusative-05','gozluklerinizi']]){
  const q=bank.find(q=>q.id===`possessed-plural-${id}`)!;assert.equal(recordPilot([],q,wrong,'s')[0].correct,false);
 }
});
test('number and case filters combine for shuffled practice without changing old singular defaults',()=>{
 const before=JSON.stringify(all);
 for(const [number,total,perCase] of [['singular',48,12],['plural',24,6],['mixed',72,18]] as const){
  const qs=selectPossessedCaseQuestions('mixed',()=>.2,number);assert.equal(qs.length,total);assert.equal(new Set(qs.map(q=>q.id)).size,total);
  for(const c of ['locative','dative','ablative','accusative']){
   const selected=selectPossessedCaseQuestions(`possessed_${c}` as any,()=>.3,number);assert.equal(selected.length,perCase);assert.ok(selected.every(q=>q.requiredCase===c));
  }
 }
 assert.equal(selectPossessedCaseQuestions().length,48);
 assert.notDeepEqual(selectPossessedCaseQuestions('mixed',()=>.1,'plural'),selectPossessedCaseQuestions('mixed',()=>.9,'plural'));
 assert.equal(JSON.stringify(all),before);
});
test('review respects both number and case; correction updates original plural evidence',()=>{
 const s=singular[0],p=bank[0];let a=recordPilot([],s,'wrong','old');a=recordPilot(a,p,'wrong','plural');
 assert.deepEqual(possessedCaseMistakes(a,'possessed_locative','singular'),[s]);
 assert.deepEqual(possessedCaseMistakes(a,'possessed_locative','plural'),[p]);
 assert.deepEqual(possessedCaseMistakes(a,'possessed_dative','mixed'),[]);
 assert.deepEqual(possessedCaseMistakes(a,'possessed_locative','mixed'),[s,p]);
 assert.equal(recordPilot(a,p,p.answer,'plural'),a);
 const original=a[1],corrected=correctPilot(a,original.id);
 assert.equal(corrected[1].time,original.time);assert.equal(corrected[1].id,original.id);assert.equal(corrected[1].nounNumber,'plural');assert.equal(corrected[1].manual,true);
 assert.deepEqual(possessedCaseMistakes(corrected,'mixed','mixed'),[s]);
});
test('version-1 backups preserve singular/plural snapshots and older histories',()=>{
 const a=recordPilot([],bank[5],bank[5].answer,'plural','mixed_possessed_cases')[0];
 assert.equal(a.owner,'onlar');assert.equal(a.nounNumber,'plural');assert.equal(a.givenForm,'arabaları');assert.equal(a.requiredCase,'locative');
 const old=recordPilot([],singular[0],'wrong','old')[0];delete old.practiceMode;
 assert.deepEqual(validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:[old,a]}))),[old,a]);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
 for(const patch of [{nounNumber:undefined},{nounNumber:'unknown'},{owner:''},{requiredCase:undefined}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a,...patch}]}));
});
