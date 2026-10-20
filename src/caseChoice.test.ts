import {test} from 'node:test';
import assert from 'node:assert/strict';
import {choiceQuestions as bank,recordChoice,correctChoice,choiceMistakes,selectChoiceQuestions} from './caseChoice';
import {validatePilotImport} from './casePilot';
test('30 distinct authored questions; balanced sessions, honest metadata and no answer in sentence',()=>{
 assert.equal(bank.length,30);assert.equal(new Set(bank.map(q=>q.id)).size,30);
 for(const c of ['locative','dative','ablative'])assert.equal(bank.filter(q=>q.requiredCase===c).length,10);
 for(let i=0;i<10;i++){const pool=selectChoiceQuestions();assert.equal(new Set(pool.map(q=>q.id)).size,12);for(const c of ['locative','dative','ablative'])assert.equal(pool.filter(q=>q.requiredCase===c).length,4);}
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
