import {test} from 'node:test';
import assert from 'node:assert/strict';
import {grammarSections,grammarActivities,grammarLessonCatalog,lessonNavigationGroups,numberedTitle} from './grammarNavigation';
import {verbNounLessons,verbNounQuestions} from './verbNouns';
import {lessonHeading} from './practicePresentation';
import {grammarProgress} from './grammarProgress';
import {recordLesson} from './verbNounPractice';
import {validatePilotImport} from './casePilot';
test('five sections use contiguous two-level numbers with one label per stable lesson ID',()=>{
 assert.deepEqual(grammarSections.map(s=>s.number),['1','2','3','4','5']);
 const all=[...Object.values(grammarActivities),...Object.values(grammarLessonCatalog)];assert.equal(new Set(all.map(l=>l.number)).size,all.length);
 for(const section of grammarSections){const lessons=all.filter(l=>l.section===section.number);assert.deepEqual(lessons.map(l=>l.number),lessons.map((_,i)=>`${section.number}.${i+1}`));}
 assert.equal(lessonNavigationGroups.flatMap(g=>g.lessons).length,Object.keys(verbNounLessons).length);
 for(const [id,l] of Object.entries(grammarLessonCatalog)){assert.ok(verbNounQuestions.some(q=>q.lessonId===id));assert.equal(verbNounLessons[id as keyof typeof verbNounLessons],numberedTitle(l));assert.deepEqual(lessonHeading(numberedTitle(l)),{eyebrow:`Lesson ${l.number}`,title:l.title});}
 assert.deepEqual(lessonHeading('3.1.1: A future sublesson: with a colon'),{eyebrow:'Lesson 3.1.1',title:'A future sublesson: with a colon'});
 assert.deepEqual(lessonHeading('Grammar Multiple Choice'),{eyebrow:'Grammar practice',title:'Grammar Multiple Choice'});
});
test('new labels sort numerically in progress and existing attempts round-trip without migration',()=>{
 const q=verbNounQuestions.find(q=>q.lessonId==='content_dik'&&q.task==='type')!,attempt=recordLesson([],q,q.expected,'existing')[0];
 assert.deepEqual(validatePilotImport({version:1,pilotAttempts:[attempt]}),[attempt]);assert.equal(attempt.questionId,q.id);assert.equal(attempt.conceptId,q.conceptId);
 const progress=grammarProgress([attempt]);assert.equal(progress.unlinked,0);const lessonRows=progress.concepts.filter(c=>c.family==='lessons');assert.deepEqual(lessonRows.map(r=>r.label),Object.values(verbNounLessons));
 const row=lessonRows.find(r=>r.id==='lesson_content_dik')!;assert.equal(row.label,'3.7: -DIK: facts inside a sentence');assert.equal(row.attempts,1);assert.equal(row.modes.typed!.recentCorrect,1);
});
