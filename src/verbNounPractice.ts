import {parseChunkAnswer,completeChunks,assembledSentence,chunksCorrect} from './sentenceChunks';
import {matchesPhrase} from './nounPhrases';
import {matchesCase,type PilotAttempt} from './casePilot';
import {verbNounQuestions,type VerbNounQuestion,type VerbNounLesson,type VerbNounTask} from './verbNouns';
import {shuffle} from './shuffle';
import {latestMistakes} from './practiceReview';
export type LessonTaskSelection=VerbNounTask|'mixed';
export function lessonPool(lesson:VerbNounLesson,task:LessonTaskSelection='mixed'){
 return verbNounQuestions.filter(q=>q.lessonId===lesson&&(task==='mixed'||q.task===task));
}
export function lessonTasks(lesson:VerbNounLesson):VerbNounTask[]{
 return (['meaning','structure','type','build'] as const).filter(task=>lessonPool(lesson,task).length>0);
}
export function selectLessonQuestions(lesson:VerbNounLesson,task:LessonTaskSelection='mixed'){
 const pool=lessonPool(lesson,task);
 if(task!=='mixed')return shuffle(pool).slice(0,12);
 // Balance available tasks, choosing the most restricted pool first. A model
 // appears once so an interpretation cannot reveal its later production answer.
 const tasks=shuffle(lessonTasks(lesson)),limit=Math.min(12,new Set(pool.map(q=>q.exampleId)).size);
 const used=new Set<string>(),chosen:VerbNounQuestion[]=[];
 const quotas=tasks.map((t,i)=>({task:t,count:Math.floor(limit/tasks.length)+(i<limit%tasks.length?1:0),size:lessonPool(lesson,t).length})).sort((a,b)=>a.size-b.size);
 for(const {task,count} of quotas){const candidates=shuffle(pool.filter(q=>q.task===task&&!used.has(q.exampleId)));for(const q of candidates.slice(0,count)){chosen.push(q);used.add(q.exampleId);}}
 for(const q of shuffle(pool)){if(chosen.length===limit)break;if(!used.has(q.exampleId)){chosen.push(q);used.add(q.exampleId);}}
 return shuffle(chosen);
}
export const lessonMistakes=(attempts:PilotAttempt[],lesson:VerbNounLesson,task:LessonTaskSelection='mixed')=>latestMistakes(lessonPool(lesson,task),attempts);
export function recordLesson(attempts:PilotAttempt[],q:VerbNounQuestion,answer:string,sessionId:string):PilotAttempt[]{
 if(!answer.trim()||attempts.some(a=>a.sessionId===sessionId&&a.questionId===q.id))return attempts;
 const option=q.options?.find(o=>o.id===answer);
 const selected=parseChunkAnswer(answer);
 if(q.task==='build'&&(!q.chunks||!q.expectedChunkIds||!completeChunks(selected,q.chunks)))return attempts;
 if(q.task!=='type'&&q.task!=='build'&&!option)return attempts;
 return [...attempts,{
  id:crypto.randomUUID(),sessionId,practiceMode:'verb_noun_lesson',questionId:q.id,conceptId:q.conceptId,
  ...(q.nominalMainSubject?{nominalMainSubject:q.nominalMainSubject}:{}),
  ...(q.temporalPredicate?{temporalPredicate:q.temporalPredicate}:{}),
  ...(q.temporalRelation?{temporalRelation:q.temporalRelation,temporalSubject:q.temporalSubject,mainSubject:q.mainSubject,temporalTime:q.temporalTime}:{}),
  ...(q.converbSubject?{converbSubject:q.converbSubject,converbTime:q.converbTime}:{}),
  ...(q.relativePolarity?{relativePolarity:q.relativePolarity,relativeMainPolarity:q.relativeMainPolarity}:{}),
  ...(q.relativeInnerRole?{relativeInnerRole:q.relativeInnerRole,relativeInnerForm:q.relativeInnerForm}:{}),
  ...(q.relativeConstruction?{relativeConstruction:q.relativeConstruction,relativeHeadCase:q.relativeHeadCase,relativeHeadBase:q.relativeHeadBase,relativeActor:q.relativeActor}:{}),
  ...(q.relativeForm?{relativeForm:q.relativeForm}:{}),
  ...(q.relativeHead?{relativeHead:q.relativeHead,relativeTime:q.relativeTime}:{}),
  ...(q.nominalConstruction?{nominalConstruction:q.nominalConstruction}:{}),
  ...(q.contentTime?{contentTime:q.contentTime}:{}),
  ...(q.negationScope?{negationScope:q.negationScope}:{}),
  ...(q.nominalCase?{nominalCase:q.nominalCase}:{}),
  ...(q.nominalSubject?{nominalSubject:q.nominalSubject}:{}),
  lessonId:q.lessonId,lessonTask:q.task,exampleId:q.exampleId,exerciseType:q.exerciseType,
  ...(q.task==='build'?{chunks:q.chunks,selectedChunkIds:selected as string[],expectedChunkIds:q.expectedChunkIds}:{}),
  ...(['type','build'].includes(q.task)?{}:{selectedOptionId:answer,expectedOptionId:q.expectedOptionId}),
  answer:q.task==='build'?assembledSentence(selected as string[],q.chunks!):q.task==='type'?answer.trim():option!.text,expected:q.expected,
  supportingRuleIds:q.supportingRuleIds,correct:q.task==='build'?chunksCorrect(selected as string[],q.expectedChunkIds!):q.task==='type'?(q.lessonId==='temporal_contrasts'?matchesPhrase(answer,q.expected):matchesCase(answer,q.expected)):answer===q.expectedOptionId,
  manual:false,time:new Date().toISOString(),
 }];
}
