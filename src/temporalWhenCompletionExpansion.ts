import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {temporalWhenExamples} from './verbNounTemporalWhen';

/** Additional 5.5 when/once production and finite-predicate tasks.
 * The source examples express when an event happens, without assigning tense to -(y)IncA.
 * These are authored exercises, not textbook quotations. */
export const temporalWhenCompletionExamples:VerbNounExample[]=temporalWhenExamples.flatMap((base,index)=>{
 const lead=base.converbLead!,clause=base.converbClause!,final=base.main;
 return [
  {...base,id:`vn55-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${final}.`,answer:clause},
  {...base,id:`vn55-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${clause} ___.`,answer:final},
 ];
});
export const temporalWhenCompletionQuestions:VerbNounQuestion[]=temporalWhenCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=temporalWhenExamples[Math.floor(index/2)];
 const alternatives=temporalWhenExamples.filter(e=>e.main!==source.main && (e.mainSubject!==source.mainSubject || e.temporalTime!==source.temporalTime)).filter((_,i,all)=>i===Math.floor(index/2)%all.length||i===(Math.floor(index/2)+1)%all.length);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_when',conceptId:`vn_temporal_when_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isClause?'typed_converb':'converb_structure',
  prompt:isClause?`Intended meaning: ${example.meaning} Type the entire time clause, including its subject and the correct -(y)IncA form. The final predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the complete final predicate. The time clause establishes when the main event happens; the final predicate carries the main action's tense and person.`,
  sentence:example.template,expected:example.answer,
  ...(isClause?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:alternatives[0].main},{id:'other-2',text:alternatives[1].main}]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isClause?source.supportingRuleIds:[],
 };
});
