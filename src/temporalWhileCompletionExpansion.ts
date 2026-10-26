import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {temporalWhileExamples} from './verbNounTemporalWhile';

/** Reactivated 5.6 while-overlap production and finite-predicate tasks.
 * The original -ken checks remain retired; new questions assess complete overlapping-action clauses.
 * These are authored exercises, not textbook quotations. */
export const retiredTemporalWhileCompletionExamples:VerbNounExample[]=temporalWhileExamples.flatMap((base,index)=>{
 const lead=base.converbLead!,clause=base.converbClause!,final=base.main;
 return [
  {...base,id:`vn56-expand-${String(index+1).padStart(2,'0')}-clause`,template:`${lead} ___ ${final}.`,answer:clause},
  {...base,id:`vn56-expand-${String(index+1).padStart(2,'0')}-finite`,template:`${lead} ${clause} ___.`,answer:final},
 ];
});
export const retiredTemporalWhileCompletionQuestions:VerbNounQuestion[]=retiredTemporalWhileCompletionExamples.map((example,index)=>{
 const isClause=index%2===0,task=isClause?'type' as const:'structure' as const;
 const source=temporalWhileExamples[Math.floor(index/2)];
 const alternatives=temporalWhileExamples.filter(e=>e.main!==source.main && (e.mainSubject!==source.mainSubject || e.temporalTime!==source.temporalTime)).filter((_,i,all)=>i===Math.floor(index/2)%all.length||i===(Math.floor(index/2)+1)%all.length);
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

/** Active Lesson 5.6 forms: both tasks target the -ken converb, not a finite predicate. */
/** Same-verb near misses avoid revealing the answer merely by its -ken ending. */
const alternatives:readonly [string,string][]=[
 ['okuyarken','okururken'],['yapayken','yapararken'],['konuşarken','konuşururken'],
 ['yürüyürken','yürürürken'],['bekleyerken','beklererken'],['çalışarken','çalışırırken'],
 ['giterken','gidererken'],['hazırlayarken','hazırlararken'],['dinleyerken','dinlererken'],
 ['izleyerken','izlererken'],['yüzürken','yüzererken'],['koşurken','koşararken'],
];
export const temporalWhileCompletionExamples:VerbNounExample[]=temporalWhileExamples.flatMap((base,index)=>[
 {...base,id:`vn56-form-${String(index+1).padStart(2,'0')}-typed`,template:base.template,answer:base.answer},
 {...base,id:`vn56-form-${String(index+1).padStart(2,'0')}-choice`,template:base.template,answer:base.answer},
]);
export const temporalWhileCompletionQuestions:VerbNounQuestion[]=temporalWhileCompletionExamples.map((example,index)=>{
 const source=temporalWhileExamples[Math.floor(index/2)],isTyped=index%2===0,task=isTyped?'type' as const:'structure' as const;
 const distractors=alternatives[Math.floor(index/2)];
 return {
  id:`${example.id}-${task}`,exampleId:example.id,lessonId:'temporal_while',conceptId:`vn_temporal_while_${task}` as VerbNounQuestion['conceptId'],task,
  exerciseType:isTyped?'typed_converb':'converb_structure',
  prompt:`Intended meaning: ${example.meaning} ${isTyped?'Type only the -ken form of the verb expressing the overlapping action.':'Choose the correctly formed -ken construction; the alternatives contain incorrect linking bases.'}`,
  sentence:example.template,expected:example.answer,
  ...(isTyped?{}:{optionLanguage:'tr' as const,expectedOptionId:'target',options:[
   {id:'target',text:example.answer},{id:'other-1',text:distractors[0]},{id:'other-2',text:distractors[1]},
  ]}),
  temporalRelation:source.temporalRelation,temporalSubject:source.temporalSubject,mainSubject:source.mainSubject,temporalTime:source.temporalTime,
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:source.supportingRuleIds,
 };
});
