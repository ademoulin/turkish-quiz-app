import {test} from 'node:test';
import assert from 'node:assert/strict';
import {retiredLessonQuestions} from './verbNouns';
import {lessonPool,lessonTasks,lessonMistakes,recordLesson} from './verbNounPractice';
import {grammarProgress} from './grammarProgress';
import {grammarMistakes} from './grammarRegistry';
import {correctPilot,validatePilotImport} from './casePilot';
const lesson='relative_building' as const;
test(lesson+' retains guided assembly and retires interpretation/analysis',()=>{
 assert.deepEqual(lessonTasks(lesson),['structure','type','build']);assert.equal(lessonPool(lesson).length,36);
 const old=retiredLessonQuestions.filter(q=>q.lessonId===lesson);assert.equal(old.length,36);assert.equal(old.filter(q=>q.task==='meaning').length,12);assert.equal(old.filter(q=>q.task==='structure').length,24);
});
test(lesson+' preserves old backups separately and updates the original assembly correction',()=>{
 const history=retiredLessonQuestions.filter(q=>q.lessonId===lesson).map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:history}),history);const row=grammarProgress(history).concepts.find(c=>c.id==='lesson_'+lesson)!;assert.equal(row.legacyChecks,36);assert.equal(row.attempts,0);assert.equal(row.modes.structure?.attempts,0);assert.equal(row.modes.meaning,undefined);assert.equal(grammarMistakes(history).length,0);
 const q=lessonPool(lesson,'build')[0],ids=[...q.expectedChunkIds!];ids[1]=q.chunks!.find(c=>c.id.endsWith('-wrong-case'))!.id;
 const wrong=recordLesson(history,q,JSON.stringify(ids),'new'),a=wrong.at(-1)!;assert.equal(lessonMistakes(wrong,lesson).length,1);assert.equal(recordLesson(wrong,q,JSON.stringify(q.expectedChunkIds),'new').length,wrong.length);
 const fixed=correctPilot(wrong,a.id),b=fixed.at(-1)!;for(const key of ['id','time','sessionId','answer','questionId','selectedChunkIds'] as const)assert.deepEqual(b[key],a[key]);assert.equal(grammarMistakes(fixed).length,0);assert.deepEqual(validatePilotImport({version:1,pilotAttempts:fixed}),fixed);
});
