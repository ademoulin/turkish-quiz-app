import React from 'react';
/** Presentation only: native graders, session state and question data stay with each activity. */
export function PracticeHeader({eyebrow,title,index,total,score}:{eyebrow:string;title:string;index?:number;total:number;score:React.ReactNode}){
 return <div className="exercise-header"><p className="exercise-eyebrow">{eyebrow}</p><h3>{title}</h3><div className="exercise-meta">{index!==undefined&&<p>Question {index+1} of {total}</p>}<p role="status" aria-label="Session score">{score}</p></div></div>;
}
export function ExercisePrompt({instruction,sentence,meaning,language}:{instruction?:React.ReactNode;sentence:React.ReactNode;meaning?:React.ReactNode;language?:string}){
 return <div className="exercise-prompt">{instruction&&<p className="exercise-instruction">{instruction}</p>}<p className="exercise-sentence" lang={language}>{sentence}</p>{meaning&&<p className="exercise-meaning"><span className="exercise-cue-label">Meaning</span><span>{meaning}</span></p>}</div>;
}
