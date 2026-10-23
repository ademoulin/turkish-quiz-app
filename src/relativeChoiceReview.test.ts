import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions,verbNounExamples} from './verbNouns';
import {meaningAlternatives} from './clauseMeaningChoices';
import {introductoryConverbs} from './relativeChoiceReview';
import {lessonTasks,lessonPool,recordLesson,lessonMistakes,selectLessonQuestions} from './verbNounPractice';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarItems,grammarMistakes,selectGrammarMix} from './grammarRegistry';
import {grammarProgress} from './grammarProgress';
import {correctPilot,validatePilotImport} from './casePilot';
const families=['subject_relatives','object_relatives','converb_ip','converb_arak','converb_madan'];
test('reviewed choices stay on real clause contrasts, not impossible actors or longer answer explanations',()=>{
 const meanings=bank.filter(q=>q.task==='meaning'&&families.includes(q.lessonId));assert.equal(meanings.length,60);assert.equal(Object.keys(meaningAlternatives).length,60);
 for(const q of meanings){assert.ok(q.id.endsWith('-v2'));assert.equal(q.optionLanguage,'en');assert.equal(q.options!.length,3);assert.equal(new Set(q.options!.map(o=>o.text)).size,3);assert.ok(!q.options!.some(o=>/book reading a student|music listening to|picture looking at|competition defeated|door waiting/.test(o.text)));assert.equal(lessonExerciseCopy(q,verbNounExamples.find(e=>e.id===q.exampleId)!).meaning,undefined);for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 const first=bank.find(q=>q.id==='vn11c-01-meaning-v2')!;assert.ok(first.options!.every(o=>o.text.startsWith('I ')));assert.ok(first.options!.some(o=>o.text.includes('after looking')));
 const before=bank.find(q=>q.id==='vn11a-01-meaning-v2')!;assert.ok(before.options!.every(o=>o.text.startsWith('I ')));assert.ok(before.options!.some(o=>o.text.includes('without going')));
});
test('relative choices distinguish modifiers from action/content clauses without displaying their completed form',()=>{
 const qs=bank.filter(q=>q.task==='structure'&&['subject_relatives','object_relatives'].includes(q.lessonId));assert.equal(qs.length,24);
 for(const q of qs){assert.ok(q.id.endsWith('-v2'));assert.ok(q.optionLanguage);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);assert.ok(!q.options!.some(o=>/book reads|film will watch|dish is doing|photograph is the person/.test(o.text)));if(q.optionLanguage==='tr'&&q.exampleId!=='vn9-10'){assert.ok(q.sentence.includes('___'));assert.ok(!q.sentence.includes(q.expected));assert.ok(q.options!.every(o=>!o.text.includes(' ')));}for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 const sample=qs.find(q=>q.exampleId==='vn10-01')!;assert.deepEqual(new Set(sample.options!.map(o=>o.text)),new Set(['okuduğum','okuduğumu','okumam']));
});
test('introductory converbs use two available tracks with unchanged typed targets and independent model selection',()=>{
 for(const l of introductoryConverbs){const lesson=l as 'converb_ip';assert.deepEqual(lessonTasks(lesson),['meaning','type']);assert.equal(lessonPool(lesson).length,24);assert.equal(grammarProgress([]).concepts.find(c=>c.id===`lesson_${lesson}`)!.modes.structure,undefined);for(let n=0;n<30;n++){const pool=selectLessonQuestions(lesson);assert.equal(pool.length,12);assert.equal(new Set(pool.map(q=>q.exampleId)).size,12);assert.equal(pool.filter(q=>q.task==='meaning').length,6);assert.equal(pool.filter(q=>q.task==='type').length,6);}}
});
test('earlier clauses remain in backups without contaminating new evidence, random review or corrections',()=>{
 const retired=retiredLessonQuestions.filter(q=>families.includes(q.lessonId));assert.equal(retired.length,120);const old=retired.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);assert.equal(grammarProgress(old).unlinked,0);assert.equal(grammarMistakes(old).length,0);
 for(const family of families){const c=grammarProgress(old).concepts.find(c=>c.id===`lesson_${family}`)!;assert.equal(c.legacyChecks,24);assert.equal(c.attempts,0);assert.equal(lessonMistakes(old,family as 'converb_ip').length,0);}
 const q=bank.find(q=>q.id==='vn10-01-structure-v2')!,wrong=recordLesson(old,q,'other-1','new'),last=wrong.at(-1)!,fixed=correctPilot(wrong,last.id);assert.equal(grammarMistakes(wrong).length,1);assert.equal(selectGrammarMix(grammarMistakes(wrong))[0].q.id,q.id);assert.equal(grammarMistakes(fixed).length,0);for(const k of ['id','questionId','time','sessionId','answer','expected']as const)assert.equal(fixed.at(-1)![k],last[k]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 assert.ok(grammarItems.every(i=>!retired.some(q=>q.id===i.q.id)));assert.equal(bank.length,860);
});
