import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pronounCaseQuestions as bank,personalPronouns,selectPronounCaseQuestions,pronounCaseMistakes} from './pronounCases';
import {recordPilot,correctPilot,validatePilotImport,caseQuestions,pilotMistakes} from './casePilot';
import {mixedGrammarFamily,mixedGrammarMistakes,mixedGrammarQuestions} from './mixedGrammar';
test('24 authored pronoun forms cover six pronouns and four explicit cases without colliding with old IDs',()=>{
 assert.equal(bank.length,24);assert.equal(new Set(mixedGrammarQuestions.map(q=>q.id)).size,mixedGrammarQuestions.length);
 for(const c of ['locative','dative','ablative','accusative']){const qs=bank.filter(q=>q.requiredCase===c);assert.equal(qs.length,6);assert.deepEqual(qs.map(q=>q.pronoun),Object.keys(personalPronouns));}
 for(const q of bank){assert.equal(q.base,q.pronoun);assert.equal(q.conceptId,`pronoun_${q.requiredCase}`);assert.equal(q.exerciseType,'typed_pronoun_case');assert.equal(q.source,'newly_authored');assert.equal(q.reviewStatus,'draft_needs_independent_review');assert.ok(q.explanation.includes(q.answer));assert.equal(mixedGrammarFamily(q),'pronoun_cases');}
});
test('irregular bana/sana, singular o n and final-vowel harmony on onlar grade exactly',()=>{
 const expected=['bende','sende','onda','bizde','sizde','onlarda','bana','sana','ona','bize','size','onlara','benden','senden','ondan','bizden','sizden','onlardan','beni','seni','onu','bizi','sizi','onları'];
 assert.deepEqual(bank.map(q=>q.answer),expected);
 for(const q of bank)assert.equal(recordPilot([],q,' '+q.answer.toLocaleUpperCase('tr').normalize('NFD')+' ','s','pronoun_cases')[0].correct,true);
 for(const [answer,wrong] of [['bana','bene'],['sana','sene'],['ona','oya'],['onda','oda'],['onlardan','onlarndan'],['onları','onlari'],['onları','onlaru'],['bende','benim'],['beni','beni.']]){
  const q=bank.find(q=>q.answer===answer)!;assert.equal(recordPilot([],q,wrong,'bad','pronoun_cases')[0].correct,false);
 }
});
test('case filters and shuffling keep six or 24 stable questions without mutation',()=>{
 const before=JSON.stringify(bank);assert.equal(selectPronounCaseQuestions().length,24);
 for(const c of ['locative','dative','ablative','accusative'])assert.equal(selectPronounCaseQuestions(`pronoun_${c}` as any).length,6);
 assert.notDeepEqual(selectPronounCaseQuestions('mixed',()=>.1),selectPronounCaseQuestions('mixed',()=>.9));assert.equal(JSON.stringify(bank),before);
});
test('pronoun results, correction and mixed review remain distinct from noun-case production',()=>{
 const q=bank[0],noun=caseQuestions[0];let a=recordPilot([],noun,'wrong','n');a=recordPilot(a,q,'wrong','p','pronoun_cases');
 const p=a[1];assert.equal(p.pronoun,'ben');assert.equal(p.requiredCase,'locative');assert.equal(p.owner,undefined);assert.equal(p.nounNumber,undefined);
 assert.equal(recordPilot(a,q,q.answer,'p','pronoun_cases'),a);
 assert.deepEqual(pronounCaseMistakes(a),[q]);assert.deepEqual(pilotMistakes(a),[noun]);assert.deepEqual(pronounCaseMistakes(a,'pronoun_dative'),[]);
 const fixed=correctPilot(a,p.id);assert.equal(fixed[1].id,p.id);assert.equal(fixed[1].time,p.time);assert.equal(fixed[1].manual,true);assert.deepEqual(pronounCaseMistakes(fixed),[]);assert.deepEqual(pilotMistakes(fixed),[noun]);
 const success=recordPilot([],q,q.answer,'mixed','mixed_grammar')[0];
 assert.deepEqual(pronounCaseMistakes([...a,{...success,time:'2090-01-01T00:00:00Z'}]),[]);
 assert.ok(mixedGrammarMistakes(a).includes(q));
});
test('version-1 backups preserve new pronoun snapshots and reject missing or mismatched context',()=>{
 const p=recordPilot([],bank[0],'wrong','p','pronoun_cases')[0],old=recordPilot([],caseQuestions[0],'wrong','old')[0];delete old.practiceMode;
 assert.deepEqual(validatePilotImport(JSON.parse(JSON.stringify({version:1,pilotAttempts:[old,p]}))),[old,p]);
 assert.deepEqual(validatePilotImport({version:1,attempts:[]}),[]);
 for(const patch of [{pronoun:undefined},{pronoun:'ev'},{pronoun:['ben']},{requiredCase:'genitive'},{requiredCase:'dative'},{exerciseType:'typed_form_completion'}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...p,...patch}]}));
 assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,exerciseType:'typed_pronoun_case'}]}));
});
