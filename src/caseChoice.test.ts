import {test} from 'node:test';
import assert from 'node:assert/strict';
import {choiceQuestions as bank,recordChoice,correctChoice,choiceMistakes,selectChoiceQuestions,choicePool} from './caseChoice';
import {validatePilotImport} from './casePilot';
test('74 distinct authored questions; balanced sessions, honest metadata and no answer in sentence',()=>{
 assert.ok(bank.length>0);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
 for(const c of ['locative','dative','ablative','accusative','bare'])assert.equal(bank.filter(q=>q.requiredCase===c).length,['locative','bare'].includes(c)?10:18);
 for(let i=0;i<10;i++){const pool=selectChoiceQuestions();assert.equal(new Set(pool.map(q=>q.id)).size,12);for(const c of ['locative','dative','ablative','accusative','bare'])assert.ok([2,3].includes(pool.filter(q=>q.requiredCase===c).length));}
 for(const q of bank){assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.ok(q.sentence.includes('___'));assert.ok(q.meaning&&q.explanation);}
});
test('case choice and strict form production score independently; duplicate checks are ignored',()=>{
 const q=bank.find(q=>q.answer==='otobüste')!;
 const wrongCase=recordChoice([],q,'dative',' '+q.answer.normalize('NFD')+' ','s');
 assert.equal(wrongCase[0].caseCorrect,false);assert.equal(wrongCase[0].formCorrect,true);assert.equal(wrongCase[0].correct,false);
 const wrongForm=recordChoice([],q,q.requiredCase,'otobuste','s');assert.equal(wrongForm[0].caseCorrect,true);assert.equal(wrongForm[0].formCorrect,false);
 assert.strictEqual(recordChoice(wrongForm,q,q.requiredCase,q.answer,'s'),wrongForm);
 assert.deepEqual(recordChoice([],q,q.requiredCase,'   ','s'),[]);
 const right=recordChoice([],q,q.requiredCase,q.answer,'s');assert.equal(right[0].correct,true);
});
test('part corrections update original evidence and review queue; later success clears mistakes',()=>{
 const q=bank[0],a=recordChoice([],q,'ablative','wrong','s');assert.equal(choiceMistakes(a).length,1);
 const b=correctChoice(a,a[0].id,'case');assert.equal(b[0].caseCorrect,true);assert.equal(b[0].formCorrect,false);assert.equal(b[0].correct,false);
 const c=correctChoice(b,b[0].id,'form');assert.equal(c[0].id,a[0].id);assert.equal(c[0].time,a[0].time);assert.equal(c[0].answer,'wrong');assert.equal(c[0].selectedCase,'ablative');assert.equal(c[0].manual,true);assert.equal(choiceMistakes(c).length,0);
 assert.equal(choiceMistakes(recordChoice(a,q,q.requiredCase,q.answer,'new')).length,0);
});
test('version-1 backups accept new evidence and old empty histories, reject inconsistent part scores',()=>{
 const a=recordChoice([],bank[0],'locative',bank[0].answer,'s');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);assert.deepEqual(validatePilotImport({version:1}),[]);
 for(const patch of [{selectedCase:'accusative'},{caseCorrect:'yes'},{formCorrect:false},{requiredCase:'genitive'},{exerciseType:'typed_form_completion'},{correct:false},{conceptId:'locative'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 // Actual corrected history, with the original timestamp and raw answers, round-trips.
 const bad=recordChoice([],bank[0],'dative','wrong','s');const fixed=correctChoice(correctChoice(bad,bad[0].id,'case'),bad[0].id,'form');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
});

test('accusative and bare objects grade independently, retain Turkish distinctions and round-trip with prior choice history',()=>{
 for(const q of bank.filter(q=>q.id.startsWith('choose-accusative-')||q.id.startsWith('choose-bare-'))){
  const right=recordChoice([],q,q.requiredCase,' '+q.answer.normalize('NFD')+' ','s');assert.equal(right[0].correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:right}),right);
  const selected=q.requiredCase==='bare'?'accusative':'bare';const wrong=recordChoice([],q,selected,q.answer,'s');assert.equal(wrong[0].caseCorrect,false);assert.equal(wrong[0].formCorrect,true);
  const other=bank.find(other=>other.base===q.base&&other.requiredCase===selected)!;const form=recordChoice([],q,q.requiredCase,other.answer,'s');assert.equal(form[0].caseCorrect,true);assert.equal(form[0].formCorrect,false);assert.equal(choiceMistakes(form).length,1);
  const fixed=correctChoice(form,form[0].id,'form');assert.equal(fixed[0].id,form[0].id);assert.equal(fixed[0].time,form[0].time);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(choiceMistakes(fixed).length,0);
  if(q.requiredCase==='bare'){assert.equal(q.base,q.answer);assert.deepEqual(q.supportingRuleIds,[]);}else assert.ok(q.supportingRuleIds.includes('four_way_vowel_harmony'));
 }
 for(const [expected,bad] of [['kitabı','kitabi'],['ekmeği','ekmegi'],['süt','sut'],['çay','cay']]){const q=bank.find(q=>q.answer===expected)!;assert.equal(recordChoice([],q,q.requiredCase,bad,'s')[0].formCorrect,false);}
 const legacy=recordChoice([],bank[0],'locative',bank[0].answer,'old');const bare=bank.find(q=>q.requiredCase==='bare')!;const combined=recordChoice(legacy,bare,'bare',bare.answer,'new');assert.deepEqual(validatePilotImport({version:1,pilotAttempts:combined}),combined);
 for(const conceptId of ['case_choice_genitive','case_choice_none'])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...combined[1],conceptId}]}));
});

test('common verb focus balances twelve prompts and records pattern evidence without conjugation tasks',()=>{
 const bank=choicePool('verb_patterns');assert.ok(bank.length>0);assert.equal(new Set(bank.map(q=>q.verbPatternId)).size,12);
 for(const c of ['dative','ablative','accusative'])assert.equal(bank.filter(q=>q.requiredCase===c).length,8);
 const pool=selectChoiceQuestions('verb_patterns');assert.equal(new Set(pool.map(q=>q.id)).size,12);for(const c of ['dative','ablative','accusative'])assert.equal(pool.filter(q=>q.requiredCase===c).length,4);
 for(const q of bank){assert.ok(q.verbLemma);assert.ok(q.explanation.includes(q.base+' → '+q.answer));assert.ok(q.sentence.includes('___'));assert.equal(q.answer.includes(' '),false);
  const a=recordChoice([],q,q.requiredCase,' '+q.answer.normalize('NFD')+' ','focus');assert.equal(a[0].correct,true);assert.equal(a[0].verbPatternId,q.verbPatternId);assert.equal(a[0].verbLemma,q.verbLemma);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:a}),a);
  const wrong=recordChoice([],q,'bare',q.answer,'focus');assert.equal(wrong[0].caseCorrect,false);assert.equal(wrong[0].formCorrect,true);assert.equal(choiceMistakes(wrong,'verb_patterns').length,1);assert.equal(choiceMistakes(wrong).length,1);
  const fixed=correctChoice(wrong,wrong[0].id,'case');assert.equal(fixed[0].id,wrong[0].id);assert.equal(fixed[0].verbPatternId,q.verbPatternId);assert.equal(choiceMistakes(fixed,'verb_patterns').length,0);
 }
 const prior=recordChoice([],choicePool()[0],'bare','wrong','old');assert.equal(choiceMistakes(prior,'verb_patterns').length,0);assert.equal(choiceMistakes(prior).length,1);
 const q=bank[0],a=recordChoice([],q,q.requiredCase,q.answer,'s');for(const patch of [{verbPatternId:42},{verbPatternId:'bad pattern'},{verbLemma:''},{verbLemma:undefined},{verbPatternId:undefined}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
});
