import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lessonPresentation} from './practicePresentation';
import {verbNounExamples,verbNounQuestions} from './verbNouns';
test('presentation separates only meanings already supplied and preserves construction-disambiguation cues',()=>{
 for(const q of verbNounQuestions){const e=verbNounExamples.find(e=>e.id===q.exampleId)!,p=lessonPresentation(q.prompt,e.meaning);assert.ok(p.instruction.trim());if(q.task==='meaning')assert.equal(p.meaning,undefined);if(p.meaning)assert.ok(q.prompt.startsWith(`Intended message: ${p.meaning} `));}
 for(const cue of ['Use the common bare-infinitive wanting pattern.','Name the general activity with an infinitive.']){const q=verbNounQuestions.find(q=>q.lessonId==='action_forms'&&q.task==='structure'&&q.prompt.includes(cue))!,e=verbNounExamples.find(e=>e.id===q.exampleId)!;const p=lessonPresentation(q.prompt,e.meaning);assert.equal(p.meaning,e.meaning);assert.ok(p.instruction.includes(cue));assert.ok(p.instruction.startsWith('Choose the form that completes the sentence.'));}
});
