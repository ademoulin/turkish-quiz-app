import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {clauseCaseFeedback} from './clauseCaseFeedback';
import {lessonReason,lessonExerciseCopy} from './grammarCopy';
import {LessonExplanation} from './LessonCopy';
test('3.5 feedback names the predicate and the case required in every model',()=>{
 const expected=[['İstemek','accusative'],['Beklemek','accusative'],['İstemek','accusative'],['İstemek','accusative'],['Sevinmek','dative'],['Sevinmek','dative'],['Sevinmek','dative'],['Sevinmek','dative'],['Rahatsız olmak','ablative'],['Rahatsız olmak','ablative'],['Hoşlanmak','ablative'],['Memnun olmak','ablative']];
 const models=verbNounExamples.filter(e=>e.lessonId==='clause_cases');assert.equal(models.length,12);
 for(const [i,e] of models.entries()){
  const {reason,note}=clauseCaseFeedback(e);assert.ok(reason.startsWith(expected[i][0]));assert.ok(reason.includes(expected[i][1]));assert.equal(lessonReason(e),reason);
  const html=renderToStaticMarkup(createElement(LessonExplanation,{example:e}));assert.ok(html.includes(reason));assert.ok(!/Build-up|Full explanation|buffer|harmony|connects the whole/.test(html));assert.equal(!!note,e.nominalSubject==='onlar');assert.equal(html.includes('Agreement note'),!!note);
 }
 assert.ok(clauseCaseFeedback(models[11]).reason.includes('the thing someone is pleased about goes in the ablative'));
 const other=verbNounExamples.find(e=>e.lessonId==='cases')!;assert.ok(!renderToStaticMarkup(createElement(LessonExplanation,{example:other})).includes('Build-up:'));
 for(const q of verbNounQuestions.filter(q=>q.lessonId==='clause_cases'&&q.task==='structure'))assert.equal(lessonExerciseCopy(q,models.find(e=>e.id===q.exampleId)!).instruction,'Choose the form that completes the sentence.');
});
