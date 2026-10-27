import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {relativeRoleExamples} from './verbNounRelativeRoles';
/** New 4.4 completions derived from existing authored 12E case-role models.
 * Each model receives one independent modifier and one head-case exercise.
 * This deliberately retains the existing source meanings rather than inventing
 * potentially ambiguous case frames. */
export const relativeRoleCompletionExamples:VerbNounExample[]=relativeRoleExamples.flatMap((base,i)=>[0,1].map((kind)=>{
 const id=`vn44-expand-${String(i+1).padStart(2,'0')}-${kind===0?'modifier':'head'}`;
 const answer=kind===0?base.relativeClause!:base.relativeHead!;
 const template=kind===0?`___ ${base.relativeHead} ${base.main}.`:`${base.relativeClause} ___ ${base.main}.`;
 return {...base,id,template,answer,explanation:base.explanation,meaning:base.meaning};
}));
export const relativeRoleCompletionQuestions:VerbNounQuestion[]=relativeRoleCompletionExamples.map((e,i)=>{
 const kind=i%2,task=kind===0?'type' as const:'structure' as const;
 const base=relativeRoleExamples[Math.floor(i/2)];
 const other=kind===0?[base.chunks!.find(c=>c.id.endsWith('wrong-modifier'))!.text]:[base.chunks!.find(c=>c.id.endsWith('wrong-case'))!.text];
 // Bare main-clause subjects otherwise leave only two distinct case choices.
 // Supply an accusative alternative for the two authored bare-subject heads.
 const bareSubjectAccusative=kind===1&&base.relativeHead===base.relativeHeadBase
  ?({komşu:'komşuyu',doktor:'doktoru'} as Record<string,string>)[base.relativeHeadBase!] :undefined;
 const distractors=kind===0?[]:[...other,base.relativeHeadBase!,base.relativeInnerForm!,...(bareSubjectAccusative?[bareSubjectAccusative]:[])].filter((x,j,a)=>x!==e.answer&&a.indexOf(x)===j);
 return {id:e.id+'-'+task,exampleId:e.id,lessonId:'relative_roles',conceptId:`vn_relative_roles_${task}` as VerbNounQuestion['conceptId'],task,exerciseType:task==='type'?'typed_verb_noun':'verb_noun_structure',prompt:`Intended meaning: ${e.meaning} ${task==='type'?'Complete the relative description.':'Choose the correct head-noun form.'}`,sentence:e.template!,expected:e.answer!,...(task==='structure'?{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:e.answer!},...distractors.map((text,j)=>({id:`other-${j+1}`,text}))]}:{}),source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[]};
});
