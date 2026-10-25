import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {converbIpExamples} from './verbNounConverbIp';

/** New 5.1 production and tense/person recognition tasks based on the 12
 * reviewed-in-app shared-subject models. These are not textbook quotations. */
export const converbIpCompletionExamples:VerbNounExample[]=converbIpExamples.flatMap((base,index)=>{
 const lead=base.converbLead!,first=base.converbClause!,final=base.main;
 return [
  {...base,id:`vn51-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${final}.`,answer:first},
  {...base,id:`vn51-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${first} ___.`,answer:final},
 ];
});
export const converbIpCompletionQuestions:VerbNounQuestion[]=converbIpCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=converbIpExamples[Math.floor(index/2)];
 const alternatives=converbIpExamples.filter(e=>e.converbSubject!==source.converbSubject || e.converbTime!==source.converbTime).slice(0,2);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'converb_ip',conceptId:`vn_converb_ip_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isClause?'typed_converb':'converb_structure',
  prompt:isClause?`Intended meaning: ${example.meaning} Type the entire first action phrase, including its object or direction and -(y)Ip. The final verb is provided.`:`Intended meaning: ${example.meaning} Choose the complete final predicate. The -(y)Ip phrase has no independent tense or person ending.`,
  sentence:example.template,expected:example.answer,
  ...(isClause?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:alternatives[0].main},{id:'other-2',text:alternatives[1].main}]}),
  converbSubject:source.converbSubject,converbTime:source.converbTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isClause?source.supportingRuleIds:[],
 };
});
