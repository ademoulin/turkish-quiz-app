import {test} from 'node:test';
import assert from 'node:assert/strict';
import {grammarItems,selectGrammarMix,recordGrammarItem,grammarMistakes,itemGroup,itemMode,itemConcept,type GrammarItem} from './grammarRegistry';
import {grammarProgress,summarizeEvidence} from './grammarProgress';
import {bank} from './yeniHitit';
import {recordGrammarChoice} from './grammarMultipleChoice';
import {correctPilot,validatePilotImport,type PilotAttempt} from './casePilot';
import {correctChoice} from './caseChoice';
const response=(item:GrammarItem)=>item.kind==='multiple_choice'?item.q.correct_option_id:item.kind==='lesson'?(item.q.task==='build'?JSON.stringify(item.q.expectedChunkIds):item.q.task==='type'?item.q.expected:'target'):item.q.answer;
const save=(item:GrammarItem,session='session')=>recordGrammarItem([],item,response(item),session,item.kind==='case_choice'?item.q.requiredCase:'')[0];
const typed=grammarItems.find(i=>i.kind==='typed')!;
const at=(a:PilotAttempt,id:string,time:string,patch:Partial<PilotAttempt>={})=>({...a,id,time,...patch});
test('broad registry retains every original question and mixes all nine families without answer leaks',()=>{
 assert.equal(new Set(grammarItems.map(i=>i.q.id)).size,grammarItems.length);
 assert.equal(grammarItems.filter(i=>i.kind==='multiple_choice').length,588);assert.equal(grammarItems.filter(i=>i.kind==='lesson').length,756);
 for(let n=0;n<40;n++){const pool=selectGrammarMix();assert.equal(pool.length,12);assert.equal(new Set(pool.map(i=>i.q.id)).size,12);assert.equal(new Set(pool.map(i=>i.family)).size,9);for(const family of new Set(pool.map(i=>i.family)))assert.ok(pool.filter(i=>i.family===family).length<=2);const models=pool.filter(i=>i.kind==='lesson').map(i=>i.kind==='lesson'&&i.q.exampleId);assert.equal(new Set(models).size,models.length);const skills=pool.filter(i=>i.kind==='multiple_choice').map(i=>i.kind==='multiple_choice'&&i.q.skill_id);assert.equal(new Set(skills).size,skills.length);}
 const lesson=grammarItems.filter(i=>i.kind==='lesson').slice(0,3);assert.equal(selectGrammarMix(lesson).length,1);const mc=grammarItems.filter(i=>i.kind==='multiple_choice'&&i.q.skill_id===bank.questions[0].skill_id);assert.equal(selectGrammarMix(mc).length,1);assert.deepEqual(selectGrammarMix([]),[]);
});
test('every registry item saves with its original grader, concept and backup-compatible snapshots',()=>{
 const all=grammarItems.map(i=>save(i));assert.equal(all.length,grammarItems.length);assert.ok(all.every(a=>a.correct&&a.sessionKind==='random_grammar'));assert.deepEqual(validatePilotImport({version:1,pilotAttempts:all}),all);
 for(const i of selectGrammarMix()){const a=save(i);assert.equal(a.conceptId,itemConcept(i));assert.equal(recordGrammarItem([a],i,response(i),'session',i.kind==='case_choice'?i.q.requiredCase:'').length,1);assert.deepEqual(recordGrammarItem([],i,'','s',''),[]);}
 assert.deepEqual(validatePilotImport({version:1}),[]);assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...all[0],sessionKind:'mastered'}]}));
});
test('new multiple-choice evidence grades option identities and updates the original manual correction',()=>{
 const q=bank.questions[0],wrong=q.options.find(o=>o.id!==q.correct_option_id)!,a=recordGrammarChoice([],q,wrong.id,'s'),fixed=correctPilot(a,a[0].id);assert.equal(a[0].correct,false);for(const key of ['id','sessionId','time','answer','selectedOptionId','expectedOptionId','conceptId','multipleChoiceSkill'] as const)assert.equal(a[0][key],fixed[0][key]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);assert.equal(recordGrammarChoice(a,q,q.correct_option_id,'s').length,1);assert.deepEqual(recordGrammarChoice([],q,'fake','s'),[]);
 for(const patch of [{multipleChoiceSkill:undefined},{multipleChoiceSkill:'other'},{conceptId:'mc_fake'},{exerciseType:'typed_form_completion'},{practiceMode:'single_case'},{expectedOptionId:undefined},{selectedOptionId:''},{correct:true},{supportingRuleIds:['four_way_vowel_harmony']},{lessonId:'activity'},{chunks:[]}])assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...a[0],...patch}]}));
 const old=save(typed);delete old.sessionKind;assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[old,...fixed]}),[old,...fixed]);assert.throws(()=>validatePilotImport({version:1,pilotAttempts:[{...old,multipleChoiceSkill:q.skill_id}]}));
});
test('progress deduplicates imported IDs and same-question/day checks without hiding raw experience',()=>{
 const a=save(typed),history=[at(a,'a','2026-10-01T08:00:00Z',{correct:false}),at(a,'b','2026-10-01T10:00:00Z',{correct:true}),at(a,'c','2026-10-02T08:00:00Z',{sessionId:'day2',correct:true})];const first=grammarProgress(history),c=first.concepts.find(c=>c.id===itemGroup(typed))!,s=c.modes.typed!;assert.equal(s.attempts,3);assert.equal(s.distinct,1);assert.equal(s.sessions,2);assert.equal(s.days,2);assert.equal(s.successfulDays,2);assert.equal(s.recentCount,2);assert.equal(s.recentCorrect,2);assert.equal(s.missed,0);assert.deepEqual(grammarProgress([...history,history[2]]),first);
 const changed=grammarProgress([...history,at(history[2],'c',history[2].time,{correct:false})]).concepts.find(c=>c.id===itemGroup(typed))!.modes.typed!;assert.equal(changed.attempts,3);assert.equal(changed.missed,1);assert.equal(changed.successfulDays,1);
 const fixed=correctPilot([history[0]],'a'),corrected=grammarProgress(fixed).concepts.find(c=>c.id===itemGroup(typed))!.modes.typed!;assert.equal(corrected.manual,1);assert.equal(corrected.recentCount,0);assert.equal(corrected.successfulDays,0);assert.equal(corrected.missed,0);
});
test('progress separates lesson modalities, unavailable production, choice components and supporting rules',()=>{
 const lesson=grammarItems.find(i=>i.kind==='lesson'&&i.q.lessonId==='noun_clause_building'&&i.q.task==='build')!,assembly=save(lesson),row=grammarProgress([assembly]).concepts.find(c=>c.id===itemGroup(lesson))!;assert.equal(itemMode(lesson),'assembly');assert.equal(row.modes.assembly!.attempts,1);assert.equal(row.modes.meaning!.attempts,0);assert.equal(row.modes.typed,undefined);
 const mc=grammarItems.find(i=>i.kind==='multiple_choice')!,recognition=grammarProgress([save(mc)]).concepts.find(c=>c.id===itemGroup(mc))!;assert.equal(recognition.modes.typed,undefined);assert.equal(recognition.modes.recognition!.attempts,1);
 const choice=grammarItems.find(i=>i.kind==='case_choice')!,a=save(choice);a.caseCorrect=false;a.correct=false;const split=grammarProgress([a]).concepts.find(c=>c.id===itemGroup(choice))!;assert.equal(split.modes.recognition!.recentCorrect,0);assert.equal(split.modes.typed!.recentCorrect,1);assert.equal(split.attempts,1);const fixed=correctChoice([a],a.id,'case');const corrected=grammarProgress(fixed).concepts.find(c=>c.id===itemGroup(choice))!;assert.equal(corrected.missed,0);assert.equal(corrected.modes.typed!.recentCount,0);
 const supported={...save(typed),supportingRuleIds:['four_way_vowel_harmony']};assert.ok(!grammarProgress([supported]).concepts.some(c=>c.id==='four_way_vowel_harmony'));assert.equal(grammarProgress([{...supported,questionId:'retired-question'}]).unlinked,1);
});
test('latest mistakes cross focused/random modes, preserve review limits and clear after correction',()=>{
 const a=save(typed);a.correct=false;assert.equal(grammarMistakes([a]).length,1);assert.equal(selectGrammarMix(grammarMistakes([a])).length,1);assert.equal(grammarMistakes(correctPilot([a],a.id)).length,0);const newer=at(a,'new','2099-01-01T00:00:00Z',{correct:true});assert.equal(grammarMistakes([a,newer]).length,0);assert.equal(recordGrammarItem([],typed,response(typed),'review','',true)[0].sessionKind,'random_grammar_review');
});
test('recent independent count is capped at ten question/day observations and dates use UTC',()=>{
 const a=save(typed),history=Array.from({length:15},(_,i)=>at(a,'a'+i,`2026-10-${String(i+1).padStart(2,'0')}T23:00:00Z`,{correct:i>=5})),stats=summarizeEvidence(history,10,'typed');assert.equal(stats.recentCount,10);assert.equal(stats.recentCorrect,10);assert.equal(stats.days,15);const utc=summarizeEvidence([at(a,'a','2026-10-02T01:00:00+02:00'),at(a,'b','2026-10-01T23:30:00Z')],10,'typed');assert.equal(utc.days,1);assert.equal(utc.recentCount,1);
});
