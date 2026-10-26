import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {temporalOrderExamples} from './verbNounTemporalOrder';

/** Archived questions remain available for historical attempt compatibility. */
export const retiredTemporalOrderCompletionExamples:VerbNounExample[]=temporalOrderExamples.flatMap((base,index)=>{
 const lead=base.converbLead!,clause=base.converbClause!,final=base.main;
 return [
  {...base,id:`vn54-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${final}.`,answer:clause},
  {...base,id:`vn54-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${clause} ___.`,answer:final},
 ];
});
export const retiredTemporalOrderCompletionQuestions:VerbNounQuestion[]=retiredTemporalOrderCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=temporalOrderExamples[Math.floor(index/2)];
 const alternatives=temporalOrderExamples.filter(e=>e.main!==source.main && (e.mainSubject!==source.mainSubject || e.temporalTime!==source.temporalTime)).filter((_,i,all)=>i===Math.floor(index/2)%all.length||i===(Math.floor(index/2)+1)%all.length);
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_order',conceptId:`vn_temporal_order_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isClause?'typed_converb':'converb_structure',
  prompt:isClause?`Intended meaning: ${example.meaning} Type the entire time clause, including its subject and the correct -mAdAn önce or -DIktAn sonra form. The final predicate is supplied.`:`Intended meaning: ${example.meaning} Choose the complete final predicate. The time clause fixes the order of events; the final predicate carries the main action's tense and person.`,
  sentence:example.template,expected:example.answer,
  ...(isClause?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:example.answer},{id:'other-1',text:alternatives[0].main},{id:'other-2',text:alternatives[1].main}]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isClause?source.supportingRuleIds:[],
 };
});

/** Same-verb distractors isolate the before/after converb rather than main-clause tense. */
const formDistractors:readonly [string,string][]=[
 ['çıktıktan','çıkarken'],['okumadan','okurken'],
 ['okuduktan','okurken'],['çalışmadan','çalışırken'],
 ['gittikten','giderken'],['dönmeden','dönerken'],
 ['geldikten','gelirken'],['bitirmeden','bitirirken'],
 ['başladıktan','başlarken'],['konuşmadan','konuşurken'],
 ['girdikten','girerken'],['görüşmeden','görüşürken'],
];
export const temporalOrderCompletionExamples:VerbNounExample[]=temporalOrderExamples.flatMap((base,index)=>[
 {...base,id:`vn54-form-${String(index+1).padStart(2,'0')}-typed`,template:base.template,answer:base.answer},
 {...base,id:`vn54-form-${String(index+1).padStart(2,'0')}-choice`,template:base.template,answer:base.answer},
]);
export const temporalOrderCompletionQuestions:VerbNounQuestion[]=temporalOrderCompletionExamples.map((example,index)=>{
 const source=temporalOrderExamples[Math.floor(index/2)];
 const isTyped=index%2===0;
 const task=isTyped?'type' as const:'structure' as const;
 const distractors=formDistractors[Math.floor(index/2)];
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_order',
  conceptId:`vn_temporal_order_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isTyped?'typed_converb':'converb_structure',
  prompt:`Intended meaning: ${example.meaning} ${isTyped?'Type only the correctly inflected verb form; önce or sonra is already supplied.':'Choose the correctly inflected verb form before the supplied önce or sonra.'}`,
  sentence:example.template,expected:example.answer,
  ...(isTyped?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[
   {id:'target',text:example.answer},
   {id:'other-1',text:distractors[0]},
   {id:'other-2',text:distractors[1]},
  ]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:isTyped?source.supportingRuleIds:[],
 };
});
