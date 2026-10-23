import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verbNounQuestions as bank,retiredLessonQuestions as retired} from './verbNouns';
import {refineRelativeBuilding} from './relativeBuildingReview';
import {lessonPool,recordLesson,lessonMistakes} from './verbNounPractice';
import {grammarProgress} from './grammarProgress';
import {grammarItems,grammarMistakes} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const revised=lessonPool('relative_building','structure');
const earlier=retired.filter(q=>q.lessonId==='relative_building');
test('4.3 replaces explanatory giveaways with parallel actor and role contrasts',()=>{
 assert.equal(revised.length,12);assert.equal(earlier.length,12);
 for(const q of revised){
  const old=earlier.find(o=>o.exampleId===q.exampleId)!;
  assert.equal(q.id,old.id+'-v2');assert.equal(q.sentence,old.sentence);
  assert.equal(q.conceptId,old.conceptId);assert.equal(q.exampleId,old.exampleId);
  const parts=q.options!.map(o=>o.text.split(' · '));
  assert.ok(parts.every(p=>p.length===3&&p[0].startsWith('Relative actor: ')&&p[1]===`Head: ${q.relativeHeadBase}`&&p[2].startsWith('Main role: ')));
  assert.notEqual(parts[0][0],parts[1][0]);assert.equal(parts[0][2],parts[1][2]);
  assert.equal(parts[0][0],parts[2][0]);assert.notEqual(parts[0][2],parts[2][2]);
  assert.equal(new Set(q.options!.map(o=>o.text)).size,3);
  assert.ok(!q.options!.some(o=>/tense|omitted|Only|complete noun phrase|\[/.test(o.text)));
  for(const o of q.options!)assert.equal(recordLesson([],q,o.id,'s')[0].correct,o.id==='target');
 }
 const untouched=bank.filter(q=>q.lessonId!=='relative_building'||q.task!=='structure');
 const result=refineRelativeBuilding(untouched);assert.equal(result.retired.length,0);result.active.forEach((q,i)=>assert.equal(q,untouched[i]));
});
test('4.3 earlier analysis remains importable without entering current progress or review',()=>{
 const history=earlier.map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);
 const row=grammarProgress(history).concepts.find(c=>c.id==='lesson_relative_building')!;
 assert.equal(row.legacyChecks,12);assert.equal(row.attempts,0);
 assert.equal(grammarProgress(history).unlinked,0);assert.equal(grammarMistakes(history).length,0);assert.equal(lessonMistakes(history,'relative_building').length,0);
 assert.ok(grammarItems.every(i=>!earlier.some(q=>q.id===i.q.id)));
 for(const q of revised){
  const wrong=recordLesson(history,q,'other-2','new-'+q.id),a=wrong.at(-1)!;
  assert.equal(recordLesson(wrong,q,'target',a.sessionId).length,wrong.length);
  const fixed=correctPilot(wrong,a.id);assert.equal(fixed.at(-1)!.correct,true);assert.equal(fixed.at(-1)!.manual,true);
  for(const k of ['id','time','sessionId','questionId','answer','relativeActor','relativeHeadCase'] as const)assert.equal(fixed.at(-1)![k],a[k]);
  assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
 }
});
