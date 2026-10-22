import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lessonExerciseCopy,lessonReason} from './grammarCopy';
import {verbNounExamples as es,verbNounQuestions as qs} from './verbNouns';
const model=(id:string)=>es.find(e=>e.id===id)!;
test('all lesson views keep meaning answers hidden and have explicit, finite copy without changing bank objects',()=>{
 const before=JSON.stringify({es,qs});for(const q of qs){const e=model(q.exampleId),c=lessonExerciseCopy(q,e);assert.ok(c.instruction.trim());assert.ok(lessonReason(e).trim());assert.ok(!lessonReason(e).includes('undefined'));if(q.task==='meaning'){assert.equal(c.meaning,undefined);assert.equal(c.construction,undefined);assert.equal(c.timing,undefined);}if(q.task==='type'&&q.lessonId==='negation')assert.equal(c.meaning,e.meaning);}
 assert.equal(JSON.stringify({es,qs}),before);
});
test('2B and nominalizer choice omit suffix recipes while retaining requests needed for a unique graded form',()=>{
 for(const q of qs.filter(q=>q.lessonId==='action_forms'&&q.task!=='meaning')){const c=lessonExerciseCopy(q,model(q.exampleId));assert.equal(c.outerCase,undefined);assert.equal(c.construction,undefined);assert.equal(c.pluralAgreement,false);assert.equal(c.meaning,model(q.exampleId).meaning);assert.ok(!/No possessive|buffer|harmony|agreement is needed/.test(c.instruction));}
 for(const cue of ['Name the general activity with an infinitive.','Use the common bare-infinitive wanting pattern.']){const q=qs.find(q=>q.lessonId==='action_forms'&&q.task==='type'&&q.prompt.includes(cue))!;assert.ok(lessonExerciseCopy(q,model(q.exampleId)).instruction.includes(cue));}
 for(const q of qs.filter(q=>q.lessonId==='contrasts'&&q.task==='type')){const c=lessonExerciseCopy(q,model(q.exampleId));assert.equal(c.outerCase,undefined);assert.equal(c.construction,undefined);assert.ok(!/-mA|-DIK|AcAK|accusative/.test(c.instruction));assert.ok(c.meaning);}
 const swim=model('vn2b-04');assert.equal(lessonReason(swim),'Başlamak takes a dative activity complement.');
});
test('named production drills retain their targets and all strict-grading construction, timing and plural constraints',()=>{
 for(const q of qs.filter(q=>q.task==='type'&&['clause_cases','content_dik','content_future'].includes(q.lessonId)))assert.equal(lessonExerciseCopy(q,model(q.exampleId)).outerCase,q.nominalCase);
 for(const q of qs.filter(q=>q.task!=='meaning'&&['noun_clause_building','noun_clause_cases'].includes(q.lessonId))){const c=lessonExerciseCopy(q,model(q.exampleId));assert.ok(c.construction);assert.ok(!/accusative|dative|ablative|agreement/.test(c.construction));assert.equal(c.outerCase,undefined);}
 for(const q of qs.filter(q=>(q.task==='type'||q.task==='build')&&model(q.exampleId).temporalIntent)){const c=lessonExerciseCopy(q,model(q.exampleId));assert.ok(c.timing);assert.ok(!/-mAdAn|-DIktAn|-(y)IncA/.test(c.timing));}
 for(const q of qs.filter(q=>q.task==='type'))assert.equal(lessonExerciseCopy(q,model(q.exampleId)).pluralAgreement,q.nominalSubject==='onlar');
});
