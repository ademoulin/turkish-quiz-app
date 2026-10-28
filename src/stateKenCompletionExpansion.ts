import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {stateKenExamples} from './verbNounStateKen';

/** Lesson 5.7 practices the state/location -(y)ken form in both modes.
 * Keep existing question IDs so stored attempts remain associated with their items. */
export const stateKenCompletionExamples:VerbNounExample[]=stateKenExamples.flatMap((base,index)=>{
 const clause=base.converbClause!,lead=base.converbLead!,predicate=base.main;
 return [
  {...base,id:`vn57-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${predicate}.`,answer:clause},
  {...base,id:`vn57-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${base.temporalSubject} ___ ${predicate}.`,answer:base.stem.endsWith('ken')?base.stem:clause.split(' ').at(-1)!},
 ];
});

/** Distinct, deliberately ungrammatical alternatives:
 * missing -(y)ken, missing buffer y after a vowel, and false -kan harmony.
 * The base is already a locative for place expressions (okulda, evde, etc.). */
function kenChoices(source:VerbNounExample){
 const correct=source.converbClause!.split(' ').at(-1)!;
 const base=source.stem;
 const vowelFinal=/[aeıioöuü]$/u.test(base);
 const wrong=[base, vowelFinal?`${base}ken`:`${base}yken`,`${base}${vowelFinal?'y':''}kan`];
 if(new Set([correct,...wrong]).size!==4)throw Error(`Non-distinct -(y)ken choices for ${source.id}`);
 return [correct,...wrong];
}

export const stateKenCompletionQuestions:VerbNounQuestion[]=stateKenCompletionExamples.map((example,index)=>{
 const typed=index%2===0,source=stateKenExamples[Math.floor(index/2)];
 const task=typed?'type' as const:'structure' as const;
 const choices=typed?[]:kenChoices(source);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'state_ken',conceptId:`vn_state_ken_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:typed?'typed_converb':'converb_structure',
  prompt:typed?`Intended meaning: ${example.meaning} Type the complete state/location time clause, including its subject and the correct -(y)ken form. The main predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the correctly formed -(y)ken expression. The subject and main predicate are supplied.`,
  sentence:example.template,expected:example.answer,
  ...(typed?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:choices.map((text,i)=>({id:i===0?'target':`other-${i}`,text}))}),
  temporalPredicate:source.temporalPredicate,temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:source.supportingRuleIds,
 };
});
