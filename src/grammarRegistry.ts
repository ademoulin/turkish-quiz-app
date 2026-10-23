import {skillLabel} from './grammarLabels';
import {mixedGrammarQuestions,mixedGrammarFamily} from './mixedGrammar';
import {choiceQuestions,recordChoice,type ChoiceCase} from './caseChoice';
import {verbNounQuestions,verbNounLessons} from './verbNouns';
import {activeGrammarQuestions,type GrammarQuestion} from './yeniHitit';
import {mcConcept,recordGrammarChoice} from './grammarMultipleChoice';
import {recordPilot,type PilotAttempt} from './casePilot';
import {recordLesson} from './verbNounPractice';
import {latestMistakes} from './practiceReview';
import {shuffle} from './shuffle';
export type GrammarItem=
 |{kind:'typed';family:string;q:typeof mixedGrammarQuestions[number]}
 |{kind:'case_choice';family:'case_choice';q:typeof choiceQuestions[number]}
 |{kind:'lesson';family:'lessons';q:typeof verbNounQuestions[number]}
 |{kind:'multiple_choice';family:'multiple_choice';q:GrammarQuestion};
export const grammarItems:GrammarItem[]=[...mixedGrammarQuestions.map(q=>({kind:'typed' as const,family:mixedGrammarFamily(q),q})),...choiceQuestions.map(q=>({kind:'case_choice' as const,family:'case_choice' as const,q})),...verbNounQuestions.map(q=>({kind:'lesson' as const,family:'lessons' as const,q})),...activeGrammarQuestions.map(q=>({kind:'multiple_choice' as const,family:'multiple_choice' as const,q}))];
export const itemConcept=(item:GrammarItem)=>item.kind==='multiple_choice'?mcConcept(item.q.skill_id):item.q.conceptId;
export const itemGroup=(item:GrammarItem)=>item.kind==='lesson'?`lesson_${item.q.lessonId}`:itemConcept(item);
export const itemMode=(item:GrammarItem)=>item.kind==='lesson'?(item.q.task==='type'?'typed':item.q.task==='build'?'assembly':item.q.task):item.kind==='typed'?'typed':'recognition';
export const itemLabel=(item:GrammarItem)=>item.kind==='lesson'?verbNounLessons[item.q.lessonId]:item.kind==='multiple_choice'?`Grammar Multiple Choice · ${skillLabel(item.q.skill_id)}`:item.kind==='case_choice'?'Choose the Case':item.family.replaceAll('_',' ');
const identity=(item:GrammarItem)=>item.kind==='lesson'?`lesson:${item.q.exampleId}`:item.kind==='multiple_choice'?`mc:${item.q.skill_id}`:item.q.id;
/** Rotate over activity families so large banks do not crowd out small ones.
 * Never show two task views of one model, or two variants of one MC skill. */
export function selectGrammarMix(pool=grammarItems,random=Math.random):GrammarItem[]{
 const unique=[...new Map(pool.map(item=>[item.q.id,item])).values()];
 const families=shuffle([...new Set(unique.map(i=>i.family))],random),buckets=families.map(f=>shuffle(unique.filter(i=>i.family===f),random));
 const chosen:GrammarItem[]=[],seen=new Set<string>();
 while(chosen.length<12){let added=false;for(const b of buckets){let item:GrammarItem|undefined;while((item=b.pop())&&seen.has(identity(item))){}if(item){chosen.push(item);seen.add(identity(item));added=true;if(chosen.length===12)break;}}if(!added)break;}
 return shuffle(chosen,random);
}
export function grammarMistakes(attempts:PilotAttempt[]){const questions=grammarItems.map(i=>({id:i.q.id,conceptId:itemConcept(i)}));const missed=new Set(latestMistakes(questions,attempts).map(q=>q.id));return grammarItems.filter(i=>missed.has(i.q.id));}
export function recordGrammarItem(attempts:PilotAttempt[],item:GrammarItem,answer:string,session:string,selectedCase:ChoiceCase|'',review=false):PilotAttempt[]{
 const result=item.kind==='typed'?recordPilot(attempts,item.q,answer,session,'mixed_grammar'):item.kind==='lesson'?recordLesson(attempts,item.q,answer,session):item.kind==='case_choice'?recordChoice(attempts,item.q,selectedCase as ChoiceCase,answer,session):recordGrammarChoice(attempts,item.q,answer,session);
 if(result===attempts)return attempts;
 return result.map((a,i)=>i<attempts.length?a:{...a,sessionKind:review?'random_grammar_review':'random_grammar'});
}
