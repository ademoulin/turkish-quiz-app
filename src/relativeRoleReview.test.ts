import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired,verbNounExamples as models} from './verbNouns';
import {refineRelativeRoles} from './relativeRoleReview';
import {lessonPool,recordLesson,lessonMistakes} from './verbNounPractice';
import {lessonExerciseCopy} from './grammarCopy';
import {grammarProgress} from './grammarProgress';
import {grammarItems,grammarMistakes} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const current=lessonPool('relative_roles','structure');
const earlier=retired.filter(q=>q.lessonId==='relative_roles');
test('4.4 contrasts inner and outer roles independently across all twelve combinations',()=>{
 assert.equal(current.length,12);assert.equal(earlier.length,12);
 const inner={dative:'dative (to)',locative:'locative (in / at)',ablative:'ablative (from)'};
 const outer={bare:'subject',accusative:'direct object',dative:'dative complement',ablative:'ablative complement'};
 const pairs=new Set<string>();
 for(const q of current){
  const old=earlier.find(o=>o.exampleId===q.exampleId)!,e=models.find(e=>e.id===q.exampleId)!;
  assert.equal(q.id,old.id+'-v2');assert.equal(q.sentence,old.sentence);assert.equal(q.conceptId,old.conceptId);
  assert.equal(q.expected,`Inside: ${inner[q.relativeInnerRole!]} · Main: ${outer[q.relativeHeadCase!]}`);
  pairs.add(q.expected);const parts=q.options!.map(o=>o.text.split(' · '));
  assert.ok(parts.every(p=>p.length===2&&p[0].startsWith('Inside: ')&&p[1].startsWith('Main: ')));
  assert.notEqual(parts[0][0],parts[1][0]);assert.equal(parts[0][1],parts[1][1]);
  assert.equal(parts[0][0],parts[2][0]);assert.notEqual(parts[0][1],parts[2][1]);
  assert.equal(new Set(q.options!.map(o=>o.text)).size,3);
  assert.ok(!q.options!.some(o=>/must|copied|cannot|Relative actor|\[/.test(o.text)));
  assert.equal(lessonExerciseCopy(q,e).meaning,undefined);
  for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
 }
 assert.equal(pairs.size,12);
 // Matching inner/outer cases are valid too; never teach that they must differ.
 for(const role of ['dative','ablative'])assert.ok(current.some(q=>q.relativeInnerRole===role&&q.relativeHeadCase===role));
 const unchanged=bank.filter(q=>q.lessonId!=='relative_roles'||q.task!=='structure');
 const result=refineRelativeRoles(unchanged);assert.equal(result.retired.length,0);result.active.forEach((q,i)=>assert.equal(q,unchanged[i]));
});
test('4.4 preserves older backups separately and updates corrections without double scoring',()=>{
 const history=earlier.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);
 const report=grammarProgress(history),row=report.concepts.find(c=>c.id==='lesson_relative_roles')!;
 assert.equal(report.unlinked,0);assert.equal(row.legacyChecks,12);assert.equal(row.attempts,0);
 assert.equal(grammarMistakes(history).length,0);assert.equal(lessonMistakes(history,'relative_roles').length,0);
 assert.ok(grammarItems.every(i=>!earlier.some(q=>q.id===i.q.id)));
 for(const q of current){
  const wrong=recordLesson(history,q,'other-2','new-'+q.id),a=wrong.at(-1)!;
  assert.equal(recordLesson(wrong,q,'target',a.sessionId).length,wrong.length);
  const fixed=correctPilot(wrong,a.id);assert.equal(fixed.at(-1)!.correct,true);assert.equal(fixed.at(-1)!.manual,true);
  for(const k of ['id','time','sessionId','questionId','answer','relativeInnerRole','relativeInnerForm','relativeHeadCase'] as const)assert.equal(fixed.at(-1)![k],a[k]);
  assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
});
