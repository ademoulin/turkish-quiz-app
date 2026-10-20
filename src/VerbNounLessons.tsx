import React,{useEffect,useRef,useState} from 'react';
import {nominalSubjects} from './verbNounSubjects';
import {correctPilot} from './casePilot';
import type {PracticeProps} from './TypedPractice';
import {verbNounExamples,verbNounLessons,verbNounTasks,nominalFormLabels,type VerbNounLesson,type VerbNounQuestion} from './verbNouns';
import {lessonMistakes,recordLesson,selectLessonQuestions,type LessonTaskSelection} from './verbNounPractice';
import {shuffle} from './shuffle';

export function VerbNounLessons({attempts,updateAttempts}:PracticeProps){
 const [lesson,setLesson]=useState<VerbNounLesson>('activity'),[task,setTask]=useState<LessonTaskSelection>('mixed');
 const [questions,setQuestions]=useState<VerbNounQuestion[]>([]),[index,setIndex]=useState(0),[answer,setAnswer]=useState('');
 const session=useRef(''),locked=useRef(false),input=useRef<HTMLInputElement>(null),next=useRef<HTMLButtonElement>(null),firstOption=useRef<HTMLInputElement>(null);
 const q=questions[index],example=q&&verbNounExamples.find(e=>e.id===q.exampleId)!;
 const results=attempts.filter(a=>a.sessionId===session.current),feedback=q&&results.find(a=>a.questionId===q.id),mistakes=lessonMistakes(attempts,lesson,task);
 useEffect(()=>{if(feedback)next.current?.focus();else if(q?.task==='type')input.current?.focus();else if(q)firstOption.current?.focus();},[q,feedback]);
 function start(review=false){const pool=review?shuffle(mistakes).slice(0,12):selectLessonQuestions(lesson,task);if(!pool.length)return;session.current=crypto.randomUUID();locked.current=false;setIndex(0);setAnswer('');setQuestions(pool.map(q=>({...q,options:q.options&&shuffle(q.options)})));}
 function check(){if(!q||feedback||locked.current||!answer.trim())return;locked.current=true;updateAttempts(a=>recordLesson(a,q,answer,session.current));}
 function insert(c:string){const el=input.current,start=el?.selectionStart??answer.length,end=el?.selectionEnd??start;setAnswer(answer.slice(0,start)+c+answer.slice(end));requestAnimationFrame(()=>{el?.focus();el?.setSelectionRange(start+1,start+1);});}
 return <section className="panel" aria-label="Verb nouns and clauses"><h3>Verb nouns and clauses</h3><p className="hint">First three lessons · 36 model sentences · 108 exercises. Newly authored drafts; independent linguistic review pending.</p>
 {!questions.length?<>
 <label className="field" htmlFor="verb-noun-lesson">Lesson</label><select id="verb-noun-lesson" value={lesson} onChange={e=>setLesson(e.target.value as VerbNounLesson)}>{Object.entries(verbNounLessons).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>
 <section aria-label="Lesson guide"><h4>{verbNounLessons[lesson]}</h4>
 {lesson==='activity'?<>
 <p>A verb can name an action, rather than say that someone is doing it. Add -mak or -mek to the stem: this creates an action noun. That noun-like chunk can be the subject of a sentence or the activity someone wants to do.</p>
 <p><strong>Worked example (not scored):</strong> <span lang="tr">[Bisiklet sürmek] eğlenceli.</span> Riding a bicycle is fun. The whole bracketed chunk names the activity; eğlenceli describes it.</p>
 <p>With istiyorum, the person wanting also performs the action in these examples. Later lessons will introduce a separate subject. No finite-verb conjugation is requested here.</p>
 </>:lesson==='subjects'?<>
 <p>The action can have its own subject. The subject appears in genitive form (benim, senin, onun, bizim, sizin, onların), and the action noun carries a matching possessive ending. Here the ending identifies who performs the action, rather than who owns an object.</p>
 <p><strong>Worked example (not scored):</strong> <span lang="tr">[Senin yüzmen] önemli.</span> It is important that you swim (informal singular). Senin identifies the swimmer; yüz + me names swimming; n links it to sen. The whole bracketed unit is the subject of önemli.</p>
 <ul><li>benim: -mam/-mem; senin: -man/-men; onun: -ması/-mesi.</li><li>bizim: -mamız/-memiz; sizin: -manız/-meniz; onların: -maları/-meleri in this exercise.</li></ul>
 <p>Onun is singular he/she; onların is a group. Sen is informal singular; siz is plural or polite. With onların, singular agreement is also possible in Turkish. Typed prompts in this lesson specifically request overt -ları/-leri agreement.</p>
 <p>The final i in gelmesi is possessive, not accusative. No outer case ending is added yet. The -ma/-me part names the action here, not negation. Lesson 4 will add case to the whole clause.</p>
 </>:<>
 <p>An action noun can take a case ending because the whole activity fills a role in the larger sentence. The main verb determines that role. Words inside the activity can have their own endings too.</p>
 <p><strong>Worked example (not scored):</strong> <span lang="tr">[Bisiklet sürmeye] başladım.</span> I started riding a bicycle. Sür + me names the activity; y separates vowels; e connects that activity to başladım, which takes dative.</p>
 <ul><li>Accusative: -ma/-me + y + ı/i, as the activity object of sevmek.</li><li>Dative: -ma/-me + y + a/e, as the activity complement of başlamak.</li><li>Ablative: -mak/-mek + tan/ten with hoşlanmak, sıkılmak or korkmak.</li></ul>
 <p>In these forms -ma/-me names the action; it is not negation. The label on each typed question specifies the form to practise. We will explore other constructions and their meanings later.</p>
 </>}
 <p>Understand: choose the sentence meaning. Unpack: {lesson==='subjects'?'identify who performs the action inside the noun-like clause.':'identify the whole action chunk, including its details.'} Build: type only the missing action noun from the supplied stem. After checking, see the translation, brackets and suffix breakdown. Study guides and examples are unscored.</p>
 </section>
 <label className="field" htmlFor="verb-noun-task">Lesson practice</label><select id="verb-noun-task" value={task} onChange={e=>setTask(e.target.value as LessonTaskSelection)}><option value="mixed">Mixed · understand, unpack and build</option>{Object.entries(verbNounTasks).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>
 <button className="primary" onClick={()=>start()}>Start verb noun lesson</button><p className="hint">12 questions per session. Mixed sessions include four of each task, using a different model sentence for each question. Each lesson has 36 exercises; repeat or choose a task to explore them.</p>
 <button className="secondary" disabled={!mistakes.length} onClick={()=>start(true)}>Review lesson mistakes ({mistakes.length})</button><p className="hint">Reviews up to 12 latest missed questions in the selected lesson and task. A later correct answer or manual correction clears that question. Different tasks keep separate evidence.</p>
 </>:<>
 <p>{verbNounLessons[lesson]}</p><p role="status">{results.filter(a=>a.correct).length} / {results.length} lesson answers correct / attempted</p>
 {q&&example?<div data-question-id={q.id}><p>Question {index+1} of {questions.length} · {verbNounTasks[q.task]}</p><p>{q.prompt}</p><p lang="tr">{q.sentence}</p>
 {q.task==='type'?<>
 <p>Verb stem: <strong lang="tr">{example.stem}-</strong> · {example.verbMeaning}</p><p>{nominalFormLabels[example.form]}</p>{example.nominalSubject&&<p>Action subject: {example.subjectGenitive} → {nominalSubjects[example.nominalSubject]}.{example.nominalSubject==='onlar'?' Use overt -ları/-leri plural agreement in this exercise.':''}</p>}
 <label className="field" htmlFor="verb-noun-answer">Complete action noun</label><input id="verb-noun-answer" className="answer" ref={input} value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.nativeEvent.isComposing){e.preventDefault();check();}}} disabled={!!feedback} lang="tr" autoCapitalize="none" autoComplete="off" spellCheck={false}/>
 {!feedback&&<div className="characters" aria-label="Turkish letters">{'çğıöşü'.split('').map(c=><button type="button" key={c} onClick={()=>insert(c)}>{c}</button>)}</div>}
 </>:<fieldset disabled={!!feedback}><legend>{q.task==='meaning'?'Sentence meaning':q.nominalSubject?'Action subject':'Action chunk'}</legend>{q.options?.map((o,i)=><label className="word-row" key={o.id}><input ref={i===0?firstOption:undefined} type="radio" name="verb-noun-choice" value={o.id} checked={answer===o.id} onChange={()=>setAnswer(o.id)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();check();}}}/><span lang={q.task==='structure'&&!q.nominalSubject?'tr':'en'}>{o.text}</span></label>)}</fieldset>}
 {feedback?<>
 <div role="status" className={'feedback '+(feedback.correct?'correct':'incorrect')}><strong>{feedback.correct?'Correct.':'Incorrect.'}</strong><p>Correct answer: <span lang={q.task==='meaning'||(q.task==='structure'&&q.nominalSubject)?'en':'tr'}>{q.expected}</span></p><p lang="tr">[{example.unit}] {example.main}.</p><p>{example.meaning}</p><p><strong>Build-up:</strong> <span lang="tr">{example.breakdown}</span></p><p>{example.explanation}</p><p>The brackets group the action and its details as one noun-like unit. {example.lessonId==='subjects'?'The genitive subject and possessive ending identify the person or people performing the action; the whole unit is the subject of the description.':example.lessonId==='cases'?'The case ending on that unit links it to the main verb.':'The remaining words describe that unit or express wanting it.'}</p>{feedback.manual&&<p>Marked correct by you.</p>}</div>
 {!feedback.correct&&<button className="secondary" onClick={()=>updateAttempts(a=>correctPilot(a,feedback.id))}>My answer was correct</button>}
 <button ref={next} className="primary" onClick={()=>{setIndex(i=>i+1);setAnswer('');locked.current=false;}}>{index+1===questions.length?'See lesson results':'Next lesson question'}</button>
 </>:<button type="button" className="primary" disabled={!answer.trim()} onClick={check}>Check lesson answer</button>}
 </div>:<h4>Verb noun lesson complete</h4>}
 <button className="text-button" onClick={()=>setQuestions([])}>{q?'End lesson session':'Restart verb noun lesson'}</button>
 </>}
 </section>;
}
