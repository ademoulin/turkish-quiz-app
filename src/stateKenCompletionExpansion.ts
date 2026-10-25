import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {stateKenExamples} from './verbNounStateKen';

/** Additional authored practice for 5.7: nominal states and locative predicates,
 * rather than verbal actions. The original questions remain untouched. */
export const stateKenCompletionExamples:VerbNounExample[]=stateKenExamples.flatMap((base,index)=>{
 const clause=base.converbClause!,lead=base.converbLead!,predicate=base.main;
 return [
  {...base,id:`vn57-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${predicate}.`,answer:clause},
  {...base,id:`vn57-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${clause} ___.`,answer:predicate},
 ];
});
export const stateKenCompletionQuestions:VerbNounQuestion[]=stateKenCompletionExamples.map((example,index)=>{
 const typed=index%2===0,source=stateKenExamples[Math.floor(index/2)];
 const distractors=stateKenExamples.filter(e=>e.main!==source.main && e.mainSubject!==source.mainSubject).slice(0,2);
 const task=typed?'type' as const:'structure' as const;
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'state_ken',conceptId:`vn_state_ken_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:typed?'typed_converb':'converb_structure',
  prompt:typed?`Intended meaning: ${example.meaning} Type the complete state/location time clause, including its subject and the correct -(y)ken form. The main predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the complete main predicate. The -(y)ken clause describes a state or place, not another verbal action; the main predicate supplies tense and agreement.`,
  sentence:example.template,expected:example.answer,
  ...(typed?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:distractors[0].main},{id:'other-2',text:distractors[1].main}]}),
  temporalPredicate:source.temporalPredicate,temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:typed?source.supportingRuleIds:[],
 };
});
