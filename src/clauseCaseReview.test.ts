import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as models} from './verbNouns';
import {lessonExerciseCopy} from './grammarCopy';
import {lessonPool,recordLesson,lessonMistakes} from './verbNounPractice';
import {grammarProgress} from './grammarProgress';
import {grammarItems} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const current=lessonPool('noun_clause_cases','structure').filter(q=>!q.id.startsWith('vn12c-expand-')),old=retired.filter(q=>q.lessonId==='noun_clause_cases');
test('3.11 chooses case forms without case/translation giveaways',()=>{
 assert.equal(current.length,36);assert.equal(old.length,36);assert.equal(bank.length,517);
 const forms=current.filter(q=>q.sentence.includes('___')),boundaries=current.filter(q=>!q.sentence.includes('___'));
 assert.equal(forms.length,36);assert.equal(boundaries.length,0);
 for(const q of current){const e=models.find(e=>e.id===q.exampleId)!;
  assert.ok(q.id.endsWith('-v3'));assert.equal(q.optionLanguage,'tr');
  const c=lessonExerciseCopy(q,e);assert.equal(c.meaning,undefined);assert.equal(c.construction,undefined);assert.equal(c.outerCase,undefined);
  assert.ok(!/dative|ablative|accusative/.test(q.prompt));assert.equal(q.reviewStatus,'draft_needs_independent_review');
  assert.ok(grammarItems.some(i=>i.q===q));
  for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
 }
 for(const q of forms){const e=models.find(e=>e.id===q.exampleId)!;assert.equal(q.sentence.replace('___',q.expected),e.sentence);assert.ok(q.options!.every(o=>!o.text.includes(' ')));assert.ok(q.options!.some(o=>o.id==='other-2'&&/[ıiuü]$/.test(o.text)));}

 // Evaluative predicates permit nominalizer overlap: assembly still requests one.
 for(const q of lessonPool('noun_clause_cases','build'))assert.ok(lessonExerciseCopy(q,models.find(e=>e.id===q.exampleId)!).construction);
 assert.equal(lessonPool('noun_clause_cases','meaning').length,0);
 assert.ok(lessonPool('noun_clause_cases','build').every(q=>!q.id.endsWith('-v3')));
});
test('12C earlier analysis survives backups separately and new corrections preserve attempt identity',()=>{
 const earlier=old.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:earlier}),earlier);
 const row=grammarProgress(earlier).concepts.find(c=>c.id==='lesson_noun_clause_cases')!;assert.equal(row.legacyChecks,36);assert.equal(row.attempts,0);assert.equal(lessonMistakes(earlier,'noun_clause_cases').length,0);
 for(const q of current){const wrong=recordLesson(earlier,q,'other-2','new-'+q.id),a=wrong.at(-1)!;assert.equal(recordLesson(wrong,q,'target',a.sessionId).length,wrong.length);const fixed=correctPilot(wrong,a.id),b=fixed.at(-1)!;for(const key of ['id','questionId','time','sessionId','answer','expected'] as const)assert.equal(b[key],a[key]);assert.equal(b.manual,true);assert.equal(b.correct,true);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);}
});
