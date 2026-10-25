import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {temporalWhileExamples} from './verbNounTemporalWhile';

/** Reactivated 5.6 while-overlap production and finite-predicate tasks.
 * The original -ken checks remain retired; new questions assess complete overlapping-action clauses.
 * These are authored exercises, not textbook quotations. */
export const temporalWhileCompletionExamples:VerbNounExample[]=temporalWhileExamples.flatMap((base,index)=>{
 const lead=base.converbLead!,clause=base.converbClause!,final=base.main;
 return [
  {...base,id:`vn56-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${final}.`,answer:clause},
  {...base,id:`vn56-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${clause} ___.`,answer:final},
 ];
});
export const temporalWhileCompletionQuestions:VerbNounQuestion[]=temporalWhileCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=temporalWhileExamples[Math.floor(index/2)];
 const alternatives=temporalWhileExamples.filter(e=>e.main!==source.main && (e.mainSubject!==source.mainSubject || e.temporalTime!==source.temporalTime)).slice(0,2);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_while',conceptId:`vn_temporal_while_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isClause?'typed_converb':'converb_structure',
  prompt:isClause?`Intended meaning: ${example.meaning} Type the entire time clause, including its subject and the supplied linking base with unchanged -ken. The final predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the complete final predicate. The -ken clause describes an overlapping action; the final predicate carries the main action's tense and person.`,
  sentence:example.template,expected:example.answer,
  ...(isClause?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:alternatives[0].main},{id:'other-2',text:alternatives[1].main}]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isClause?source.supportingRuleIds:[],
 };
});
