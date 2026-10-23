import {LessonCues,LessonExplanation} from './LessonCopy';
import {lessonExerciseCopy} from './grammarCopy';
import {PracticeHeader,ExercisePrompt} from './PracticeLayout';
import {lessonHeading} from './practicePresentation';
import React,{useEffect,useRef,useState} from 'react';
import type {PracticeProps} from './TypedPractice';
import {grammarMistakes,itemLabel,recordGrammarItem,selectGrammarMix,type GrammarItem} from './grammarRegistry';
import {choiceCases,correctChoice,type ChoiceCase} from './caseChoice';
import {correctPilot} from './casePilot';
import {typedQuestionConfig} from './CasePilot';
import {verbNounExamples} from './verbNouns';
import {SentenceChunkBuilder} from './SentenceChunkBuilder';
import {parseChunkAnswer,completeChunks} from './sentenceChunks';
import {shuffle} from './shuffle';
export function GrammarRandom({attempts,updateAttempts,trigger=0}:PracticeProps&{trigger?:number}){
 const [items,setItems]=useState<GrammarItem[]>([]),[index,setIndex]=useState(0),[answer,setAnswer]=useState(''),[selectedCase,setSelectedCase]=useState<ChoiceCase|''>('');
 const session=useRef(''),locked=useRef(false),review=useRef(false),keyboard=useRef(false),next=useRef<HTMLButtonElement>(null),input=useRef<HTMLInputElement>(null),first=useRef<HTMLInputElement>(null);
 const item=items[index],q=item?.q,results=attempts.filter(a=>a.sessionId===session.current),feedback=q&&results.find(a=>a.questionId===q.id),mistakes=grammarMistakes(attempts);
 function start(isReview=false){const chosen=selectGrammarMix(isReview?mistakes:undefined);if(!chosen.length)return;review.current=isReview;session.current=crypto.randomUUID();locked.current=false;setIndex(0);setAnswer('');setSelectedCase('');setItems(chosen.map(item=>item.kind==='lesson'?{...item,q:{...item.q,options:item.q.options&&shuffle(item.q.options),chunks:item.q.chunks&&shuffle(item.q.chunks)}}:item.kind==='multiple_choice'?{...item,q:{...item.q,options:shuffle(item.q.options)}}:item));}
 useEffect(()=>{if(trigger>0)start();},[trigger]);
 const isBuild=item?.kind==='lesson'&&item.q.task==='build',isTyped=item?.kind==='typed'||item?.kind==='case_choice'||(item?.kind==='lesson'&&item.q.task==='type');
 const ready=!!item&&(isBuild?completeChunks(parseChunkAnswer(answer),(item as Extract<GrammarItem,{kind:'lesson'}>).q.chunks!):!!answer.trim())&&(item.kind!=='case_choice'||!!selectedCase);
 useEffect(()=>{if(feedback)next.current?.focus({preventScroll:!keyboard.current});else if(isTyped)input.current?.focus();else first.current?.focus();},[item,feedback]);
 function check(fromKeyboard=false){if(!item||!ready||locked.current||feedback)return;keyboard.current=fromKeyboard;locked.current=true;updateAttempts(a=>recordGrammarItem(a,item,answer,session.current,selectedCase,review.current));}
 function insert(c:string){const el=input.current,start=el?.selectionStart??answer.length,end=el?.selectionEnd??start;setAnswer(answer.slice(0,start)+c+answer.slice(end));requestAnimationFrame(()=>{el?.focus();el?.setSelectionRange(start+1,start+1);});}
 const lesson=item?.kind==='lesson'?item.q:undefined,example=lesson&&verbNounExamples.find(e=>e.id===lesson.exampleId),config=item?.kind==='typed'?typedQuestionConfig(item.q):undefined;
 const heading=item?lessonHeading(itemLabel(item)):{eyebrow:'Grammar practice',title:'Session results'};
 const presentation=lesson&&example&&lessonExerciseCopy(lesson,example);
 const options=item?.kind==='multiple_choice'?item.q.options:lesson?.options;
 return <section className="panel" aria-label="Mix of everything">{!items.length&&<h3>Mix of everything</h3>}
 {!items.length?<><p>12 varied questions across nine activity families: case forms, pronouns, possessives, noun phrases, adding case, building endings, case choices, clause lessons and Grammar Multiple Choice. Families rotate fairly so the largest banks don’t dominate.</p><p>Each question keeps its original task, grading and saved concept. Sentence tiles assess assembly; supplied finite verbs stay supplied. Multiple-choice recognition is distinct from typed production. All content remains draft pending linguistic review.</p><button className="primary" onClick={()=>start()}>Start a mix of everything</button><button className="secondary" disabled={!mistakes.length} onClick={()=>start(true)}>Review all grammar mistakes ({mistakes.length})</button><p className="hint">Review uses up to 12 unresolved questions, with no cleared questions added. Different task views of a model sentence stay out of the same session.</p></>:<>
 <PracticeHeader eyebrow={lesson?`Mix of everything · ${heading.eyebrow}`:'Mix of everything'} title={config?.title||heading.title} index={q?index:undefined} total={items.length} score={`${results.filter(a=>a.correct).length} / ${results.length} correct`}/>
 {item&&q?<div data-random-question-id={q.id} data-random-kind={item.kind}>
 {item.kind==='typed'&&config&&<><ExercisePrompt instruction={config.instruction?.(item.q)} sentence={<>{config.sentenceLabel}{item.q.sentence}</>} language={config.sentenceLanguage||'tr'}/><div className="exercise-cues"><p>{config.cue(item.q)}</p>{config.detail?.(item.q)}<p>{config.baseLabel||'Base word'}: <strong lang="tr">{item.q.base}</strong></p></div></>}
 {item.kind==='case_choice'&&<><ExercisePrompt instruction="Choose the case and complete the word." sentence={item.q.sentence} meaning={item.q.meaning} language="tr"/><div className="exercise-cues"><p>Base word: <strong lang="tr">{item.q.base}</strong></p></div><fieldset className="exercise-options" disabled={!!feedback}><legend>Choose the case</legend>{Object.entries(choiceCases).map(([id,label])=><label className="word-row" key={id}><input type="radio" name="random-case" value={id} checked={selectedCase===id} onChange={()=>setSelectedCase(id as ChoiceCase)}/>{label}</label>)}</fieldset></>}
 {lesson&&example&&presentation&&<><ExercisePrompt instruction={presentation.instruction} sentence={lesson.sentence} meaning={presentation.meaning} language="tr"/><LessonCues q={lesson} example={example}/>
 {isBuild&&<SentenceChunkBuilder key={q.id} relativePhrase={['relative_building','relative_roles','relative_negation'].includes(lesson.lessonId)} nounClause={['noun_clause_building','noun_clause_cases'].includes(lesson.lessonId)} caseComplement={lesson.lessonId==='noun_clause_cases'} bank={lesson.chunks!} value={answer} onChange={setAnswer} disabled={!!feedback}/>}</>}
 {options&&<fieldset className="exercise-options" disabled={!!feedback}><legend className={item.kind==='multiple_choice'?'exercise-sentence':'sr-only'}>{item.kind==='multiple_choice'?item.q.prompt:lesson?.task==='meaning'?'Sentence meaning':'Sentence structure'}</legend>{options.map((o,i)=><label className="word-row" key={o.id}><input ref={i===0?first:undefined} type="radio" name="random-option" value={o.id} checked={answer===o.id} onChange={()=>setAnswer(o.id)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();check(true);}}}/><span lang={lesson?.lessonId==='clause_cases'&&lesson.task==='structure'?'tr':undefined}>{o.text}</span></label>)}</fieldset>}
 {isTyped&&<><label className="field" htmlFor="random-answer">{config?.answerLabel||'Complete missing word or expression'}</label><input id="random-answer" className="answer" ref={input} value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.nativeEvent.isComposing){e.preventDefault();check(true);}}} disabled={!!feedback} lang="tr" autoComplete="off" autoCapitalize="none" spellCheck={false}/><div className="characters" aria-label="Turkish letters" aria-hidden={!!feedback} style={{visibility:feedback?'hidden':undefined}}>{'çğıöşü'.split('').map(c=><button type="button" key={c} disabled={!!feedback} onClick={()=>insert(c)}>{c}</button>)}</div></>}
 <button className="primary" disabled={!!feedback||!ready} onClick={e=>check(e.detail===0)}>{feedback?'Answer checked':'Check random answer'}</button>
 {feedback&&<><div role="status" className={'feedback '+(feedback.correct?'correct':'incorrect')}><strong>{feedback.correct?'Correct.':'Incorrect.'}</strong><p>Correct answer: {feedback.expected}</p>{item.kind==='case_choice'&&<p>Case choice: {feedback.caseCorrect?'Correct':'Incorrect'}. Word form: {feedback.formCorrect?'Correct':'Incorrect'}. Correct case: {choiceCases[item.q.requiredCase]}</p>}
 {example&&<><p lang="tr">{example.relativeConstruction?<>[[{example.relativeClause}] {example.relativeHead}] {example.main}.</>:example.mainLead?<>{example.mainLead} [{example.unit}] {example.main}.</>:example.converbSubject||example.temporalRelation?<>{example.converbLead} [{example.converbClause}] {example.main}.</>:example.relativeHead?<>[{example.relativeClause}] {example.relativeHead} {example.main}.</>:<>[{example.unit}] {example.main}.</>}</p><p>{example.meaning}</p><LessonExplanation example={example}/></>}
 {!example&&<p>{'explanation' in q?q.explanation:''}</p>}{feedback.manual&&<p>Includes a correction by you.</p>}</div>
 {item.kind==='case_choice'?<>{!feedback.caseCorrect&&<button className="secondary" onClick={()=>updateAttempts(a=>correctChoice(a,feedback.id,'case'))}>My case choice was correct</button>}{!feedback.formCorrect&&<button className="secondary" onClick={()=>updateAttempts(a=>correctChoice(a,feedback.id,'form'))}>My word form was correct</button>}</>:!feedback.correct&&<button className="secondary" onClick={()=>updateAttempts(a=>correctPilot(a,feedback.id))}>My answer was correct</button>}
 <button className="primary" ref={next} onClick={()=>{setIndex(i=>i+1);setAnswer('');setSelectedCase('');locked.current=false;}}>{index+1===items.length?'See random results':'Next random question'}</button></>}
 </div>:<h4>Random grammar session complete</h4>}
 <button className="text-button" onClick={()=>setItems([])}>{q?'End random session':'Choose another random session'}</button>
 </>}
 </section>;
}
