import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {mixedGrammarQuestions} from './mixedGrammar';
import {choiceQuestions} from './caseChoice';
import {FormFeedback,formReason} from './FormFeedback';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
import {LessonExplanation} from './LessonCopy';
import {lessonReason} from './grammarCopy';
test('form feedback keeps usage and irregular exceptions without changing the question bank',()=>{
 const before=JSON.stringify({mixedGrammarQuestions,choiceQuestions});
 for(const q of mixedGrammarQuestions){const reason=formReason(q);if(q.exerciseType==='typed_pronoun_case'&&q.requiredCase==='dative'&&['ben','sen'].includes(q.pronoun))assert.match(reason!,/irregular dative.*bana and sana/);else assert.equal(reason,undefined);}
 for(const q of choiceQuestions){assert.equal(formReason(q),q.explanation.split(' Form:')[0]);assert.ok(!renderToStaticMarkup(createElement(FormFeedback,{question:q})).includes('Form:'));}
 assert.equal(JSON.stringify({mixedGrammarQuestions,choiceQuestions}),before);
});
test('every active lesson has short deciding feedback without a default suffix build-up',()=>{
 const before=JSON.stringify({verbNounExamples,verbNounQuestions});
 for(const id of new Set(verbNounQuestions.map(q=>q.exampleId))){const e=verbNounExamples.find(e=>e.id===id)!;const html=renderToStaticMarkup(createElement(LessonExplanation,{example:e}));const visible=html.replace(/<details[\s\S]*?<\/details>/g,'');assert.ok(!/Build-up:|buffer|harmony|final case connects|case on that head connects/.test(visible));assert.ok(lessonReason(e).length<200);assert.ok(!html.includes('<details open'));}
 assert.match(lessonReason(verbNounExamples.find(e=>e.id==='vn2-09')!),/Hoşlanmak.*ablative/);
 assert.match(lessonReason(verbNounExamples.find(e=>e.id==='vn12d-03')!),/Teşekkür etmek.*dative/);
 assert.match(lessonReason(verbNounExamples.find(e=>e.id==='vn12d-11')!),/Bakmak.*dative/);
 assert.equal(JSON.stringify({verbNounExamples,verbNounQuestions}),before);
});
