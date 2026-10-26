import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {relativeNegationExamples} from './verbNounRelativeNegation';
/** 4.5 targeted completion: relative negation versus main-clause negation.
 * Uses the 12 independently authored source-clause models, without altering
 * their original assembly questions or question IDs. */
export const relativeNegationCompletionExamples:VerbNounExample[]=relativeNegationExamples.flatMap((base,i)=>[0,1].map(kind=>{
 const id=`vn45-expand-${String(i+1).padStart(2,'0')}-${kind===0?'relative':'main'}`;
 const detail=base.chunks!.find(c=>c.id.endsWith('-detail'))!.text;
 const predicate=base.chunks!.find(c=>c.id.endsWith('-predicate'))!.text;
 const answer=kind===0?base.relativeClause!:predicate;
 const template=kind===0?`___ ${base.relativeHead} ${base.main}.`:`${base.unit} ${detail} ___.`;
 return {...base,id,template,answer};
}));
export const relativeNegationCompletionQuestions:VerbNounQuestion[]=relativeNegationCompletionExamples.map((e,i)=>{
 const kind=i%2,task=kind===0?'type' as const:'structure' as const,base=relativeNegationExamples[Math.floor(i/2)];
 const wrong=base.chunks!.find(c=>c.id.endsWith(kind===0?'wrong-modifier':'wrong-predicate'))!.text;
 return {id:e.id+'-'+task,exampleId:e.id,lessonId:'relative_negation',conceptId:`vn_relative_negation_${task}` as VerbNounQuestion['conceptId'],task,exerciseType:task==='type'?'typed_verb_noun':'verb_noun_structure',prompt:`Intended meaning: ${e.meaning} ${task==='type'?'Type the missing relative description.':'Choose the correct main-clause predicate.'}`,sentence:e.template!,expected:e.answer!,...(task==='structure'?{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:e.answer!},{id:'other-1',text:wrong}]}:{}),source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[]};
});
