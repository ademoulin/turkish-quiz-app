import {matchesCase,type PilotAttempt} from './casePilot';
import {verbNounQuestions,type VerbNounQuestion,type VerbNounLesson,type VerbNounTask} from './verbNouns';
import {shuffle} from './shuffle';
import {latestMistakes} from './practiceReview';
export type LessonTaskSelection=VerbNounTask|'mixed';
export function lessonPool(lesson:VerbNounLesson,task:LessonTaskSelection='mixed'){
 return verbNounQuestions.filter(q=>q.lessonId===lesson&&(task==='mixed'||q.task===task));
}
export function selectLessonQuestions(lesson:VerbNounLesson,task:LessonTaskSelection='mixed'){
 const pool=lessonPool(lesson,task);
 if(task!=='mixed')return shuffle(pool).slice(0,12);
 // One task per model sentence in a session, four per task; no earlier question
 // supplies the answer to another task on the same model sentence.
 const examples=shuffle([...new Set(pool.map(q=>q.exampleId))]);
 const tasks=shuffle(['meaning','structure','type'] as VerbNounTask[]);
 return shuffle(examples.slice(0,12).map((id,i)=>pool.find(q=>q.exampleId===id&&q.task===tasks[Math.floor(i/4)])!));
}
export const lessonMistakes=(attempts:PilotAttempt[],lesson:VerbNounLesson,task:LessonTaskSelection='mixed')=>latestMistakes(lessonPool(lesson,task),attempts);
export function recordLesson(attempts:PilotAttempt[],q:VerbNounQuestion,answer:string,sessionId:string):PilotAttempt[]{
 if(!answer.trim()||attempts.some(a=>a.sessionId===sessionId&&a.questionId===q.id))return attempts;
 const option=q.options?.find(o=>o.id===answer);
 if(q.task!=='type'&&!option)return attempts;
 return [...attempts,{
  id:crypto.randomUUID(),sessionId,practiceMode:'verb_noun_lesson',questionId:q.id,conceptId:q.conceptId,
  ...(q.contentTime?{contentTime:q.contentTime}:{}),
  ...(q.negationScope?{negationScope:q.negationScope}:{}),
  ...(q.nominalCase?{nominalCase:q.nominalCase}:{}),
  ...(q.nominalSubject?{nominalSubject:q.nominalSubject}:{}),
  lessonId:q.lessonId,lessonTask:q.task,exampleId:q.exampleId,exerciseType:q.exerciseType,
  ...(q.task==='type'?{}:{selectedOptionId:answer,expectedOptionId:q.expectedOptionId}),
  answer:q.task==='type'?answer.trim():option!.text,expected:q.expected,
  supportingRuleIds:q.supportingRuleIds,correct:q.task==='type'?matchesCase(answer,q.expected):answer===q.expectedOptionId,
  manual:false,time:new Date().toISOString(),
 }];
}
