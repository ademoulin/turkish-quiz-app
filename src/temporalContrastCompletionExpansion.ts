import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {temporalContrastExamples} from './verbNounTemporalContrasts';

/** Additive Lesson 5.8 practice: whole time clauses and finite predicates.
 * Authored exercises, not textbook quotations. Independent linguistic review pending.
 * The source examples explicitly specify the intended time relationship. */
export const temporalContrastCompletionExamples:VerbNounExample[]=temporalContrastExamples.flatMap((base,index)=>[
 {...base,id:`vn58-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${base.converbLead} ___ ${base.main}.`,answer:base.converbClause!},
 {...base,id:`vn58-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${base.converbLead} ${base.converbClause} ___.`,answer:base.main},
]);
export const temporalContrastCompletionQuestions:VerbNounQuestion[]=temporalContrastCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=temporalContrastExamples[Math.floor(index/2)];
 const alternatives=[...new Set(temporalContrastExamples.filter(e=>e.main!==source.main).map(e=>e.main))].slice(0,2);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_contrasts',conceptId:`vn_temporal_contrasts_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isClause?'typed_converb':'converb_structure',
  prompt:isClause?`Intended meaning: ${example.meaning} ${source.temporalIntent} Type the entire time clause, including its subject and the requested time construction. The final predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the complete final predicate. The time clause is supplied; the main predicate carries its own tense and person.`,
  sentence:example.template,expected:example.answer,
  ...(isClause?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:alternatives[0]},{id:'other-2',text:alternatives[1]}]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isClause?source.supportingRuleIds:[],
 };
});
