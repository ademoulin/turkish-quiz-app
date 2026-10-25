import React from 'react';
import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {lessonExerciseCopy,lessonReason} from './grammarCopy';
import {clauseCaseFeedback} from './clauseCaseFeedback';
export function LessonCues({q,example:e}:{q:VerbNounQuestion;example:VerbNounExample}){
 const c=lessonExerciseCopy(q,e);
 return <>
 {(c.construction||c.timing)&&<div className="exercise-cues">{c.construction&&<p>Requested construction: <strong>{c.construction}</strong></p>}{c.timing&&<p>Requested timing: {c.timing}</p>}</div>}
 {q.task==='type'&&!e.id.startsWith('vn-relative-expand-')&&<div className="exercise-cues"><p>{e.temporalPredicate?'Given '+e.temporalPredicate+' base: ':'Verb stem: '}<strong lang="tr">{e.stem}{e.temporalPredicate?'':'-'}</strong> · {e.verbMeaning}</p>
 {c.outerCase&&<p>Outer case: {c.outerCase}</p>}
 {e.kenBase&&<p>{q.lessonId==='temporal_contrasts'?'Supplied linking base (for while):':'Supplied linking base:'} <strong lang="tr">{e.kenBase}-</strong></p>}
 {c.pluralAgreement&&<p>Use overt -ları/-leri agreement for onlar.</p>}
 </div>}
 </>;
}
export function LessonExplanation({example:e}:{example:VerbNounExample}){
 if(e.lessonId==='clause_cases'||e.lessonId==='noun_clause_cases'){
  const {reason,note}=clauseCaseFeedback(e);
  return <><p className="feedback-reason">{reason}</p>{note&&<details className="answer-detail"><summary>Agreement note</summary><p>{note}</p></details>}</>;
 }
 return <><p className="feedback-reason">{lessonReason(e)}</p>{lessonReason(e)!==e.explanation&&<details className="answer-detail"><summary>Full explanation</summary><p>{e.explanation}</p></details>}</>;
}
