import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounExamples,verbNounQuestions,retiredLessonQuestions} from './verbNouns';
import {lessonPool,lessonTasks,selectLessonQuestions,recordLesson} from './verbNounPractice';
import {clauseCaseFeedback} from './clauseCaseFeedback';
import {grammarProgress} from './grammarProgress';
import {grammarMistakes} from './grammarRegistry';
import {validatePilotImport} from './casePilot';
const choices=lessonPool('noun_clause_cases','structure').filter(q=>!q.id.startsWith('vn12c-expand-'));
test('3.11 has 36 distinct case scenarios, twelve predicate patterns and no interpretation tasks',()=>{
 assert.equal(choices.length,36);assert.equal(new Set(choices.map(q=>q.sentence)).size,36);
 assert.deepEqual(lessonTasks('noun_clause_cases'),['structure','type','build']);
 const rules=new Set<string>();
 for(const q of choices){
  const e=verbNounExamples.find(e=>e.id===q.exampleId)!,rule=clauseCaseFeedback(e).reason;assert.ok(rule);assert.ok(rule.includes(q.nominalCase!));rules.add(rule.split(' takes')[0]);
  assert.equal(q.sentence.replace('___',q.expected),e.sentence);assert.ok(q.sentence.includes('___'));assert.ok(!q.prompt.includes(q.nominalCase!));
  const roots=q.options!.map(o=>o.text.replace(/d[ae]n$|[aeıiuü]$/u,''));assert.equal(new Set(roots).size,1,'only the outer case changes');
  for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
 }
 assert.equal(rules.size,12);for(const c of ['dative','ablative'])assert.equal(choices.filter(q=>q.nominalCase===c).length,18);
 assert.ok(choices.some(q=>q.sentence.includes('hiç')));assert.ok(choices.some(q=>q.nominalConstruction==='acak'));assert.ok(choices.some(q=>q.nominalConstruction==='dik'));
});
test('mixed sessions combine case decisions and assembly without repeating a scenario',()=>{
 for(let n=0;n<30;n++){
  const mix=selectLessonQuestions('noun_clause_cases');assert.equal(mix.length,12);assert.equal(new Set(mix.map(q=>q.exampleId)).size,12);assert.equal(mix.filter(q=>q.task==='structure').length,4);assert.equal(mix.filter(q=>q.task==='build').length,4);
 }
 const removed=retiredLessonQuestions.filter(q=>q.lessonId==='noun_clause_cases');assert.equal(removed.length,36);
 const old=removed.map(q=>recordLesson([],q,'other-1','legacy-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:old}),old);assert.equal(grammarMistakes(old).length,0);
 const card=grammarProgress(old).concepts.find(c=>c.id==='lesson_noun_clause_cases')!;assert.equal(card.legacyChecks,36);assert.equal(card.attempts,0);assert.equal(card.modes.meaning,undefined);assert.equal(card.modes.structure!.available,48);
 assert.ok(verbNounQuestions.every(q=>q.lessonId!=='noun_clause_cases'||q.task==='structure'||q.task==='type'||q.task==='build'));
});
