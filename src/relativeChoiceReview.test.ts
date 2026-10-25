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
test('current lesson practice has no scored translation tasks; retired alternatives remain available for backups',()=>{
 assert.equal(bank.filter(q=>q.task==='meaning').length,0);assert.equal(Object.keys(meaningAlternatives).length,60);
});
test('relative choices distinguish modifiers from action/content clauses without displaying their completed form',()=>{
 const qs=bank.filter(q=>q.task==='structure'&&['subject_relatives','object_relatives'].includes(q.lessonId));assert.equal(qs.length,25);
 for(const q of qs){if(!q.exampleId.startsWith('vn-relative-expand-'))assert.ok(q.id.endsWith('-v2'));assert.ok(q.optionLanguage);assert.equal(q.options!.find(o=>o.id==='target')!.text,q.expected);assert.ok(!q.options!.some(o=>/book reads|film will watch|dish is doing|photograph is the person/.test(o.text)));if(q.optionLanguage==='tr'&&q.exampleId!=='vn9-10'){assert.ok(q.sentence.includes('___'));assert.ok(!q.sentence.includes(q.expected));assert.ok(q.exampleId.startsWith('vn-relative-expand-')||q.options!.every(o=>!o.text.includes(' ')));}for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');}
 const sample=qs.find(q=>q.exampleId==='vn10-01')!;assert.deepEqual(new Set(sample.options!.map(o=>o.text)),new Set(['okuduğum','okuduğumu','okumam']));
});
test('introductory converbs use two available tracks with unchanged typed targets and independent model selection',()=>{
 for(const l of introductoryConverbs){const lesson=l as 'converb_ip';assert.deepEqual(lessonTasks(lesson),['type']);assert.equal(lessonPool(lesson).length,12);assert.equal(grammarProgress([]).concepts.find(c=>c.id===`lesson_${lesson}`)!.modes.structure,undefined);for(let n=0;n<30;n++){const pool=selectLessonQuestions(lesson);assert.equal(pool.length,12);assert.equal(new Set(pool.map(q=>q.exampleId)).size,12);assert.equal(pool.filter(q=>q.task==='meaning').length,0);assert.equal(pool.filter(q=>q.task==='type').length,12);}}
});
test('earlier clauses remain in backups without contaminating new evidence, random review or corrections',()=>{
 const retired=retiredLessonQuestions.filter(q=>families.includes(q.lessonId));assert.equal(retired.length,191);const old=retired.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);assert.equal(grammarProgress(old).unlinked,0);assert.equal(grammarMistakes(old).length,0);
 for(const family of families){const c=grammarProgress(old).concepts.find(c=>c.id===`lesson_${family}`)!;assert.equal(c.legacyChecks,family==='subject_relatives'?41:family==='object_relatives'?42:36);assert.equal(c.attempts,0);assert.equal(lessonMistakes(old,family as 'converb_ip').length,0);}
 const q=bank.find(q=>q.id==='vn10-01-structure-v2')!,wrong=recordLesson(old,q,'other-1','new'),last=wrong.at(-1)!,fixed=correctPilot(wrong,last.id);assert.equal(grammarMistakes(wrong).length,1);assert.equal(selectGrammarMix(grammarMistakes(wrong))[0].q.id,q.id);assert.equal(grammarMistakes(fixed).length,0);for(const k of ['id','questionId','time','sessionId','answer','expected']as const)assert.equal(fixed.at(-1)![k],last[k]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 assert.ok(grammarItems.every(i=>!retired.some(q=>q.id===i.q.id)));assert.equal(bank.length,493);
});
