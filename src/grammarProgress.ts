import type {PilotAttempt} from './casePilot';
import {grammarItems,itemGroup,itemMode,itemConcept,type GrammarItem} from './grammarRegistry';
import {concepts} from './casePilot';
import {possessiveConcepts} from './possessives';
import {phraseConcepts} from './nounPhrases';
import {possessedCaseConcepts} from './possessedCases';
import {suffixChainConcepts} from './suffixChains';
import {pronounCaseConcepts} from './pronounCases';
import {choiceCases} from './caseChoice';
import {retiredLessonQuestions,verbNounLessons} from './verbNouns';
import {skillLabel} from './grammarLabels';
export const evidenceModes={meaning:'Meaning',structure:'Structure',typed:'Typed production',assembly:'Sentence assembly',recognition:'Recognition / case choice'} as const;
export type EvidenceMode=keyof typeof evidenceModes;
export interface EvidenceStats {available:number;attempts:number;distinct:number;sessions:number;days:number;successfulDays:number;manual:number;recentCorrect:number;recentCount:number;missed:number;last?:string}
export interface GrammarConceptProgress {id:string;label:string;family:'lessons'|'forms'|'case_choice'|'multiple_choice';modes:Partial<Record<EvidenceMode,EvidenceStats>>;attempts:number;missed:number;legacyChecks:number;last?:string}
const labels:Record<string,string>={...concepts,...possessiveConcepts,...phraseConcepts,...possessedCaseConcepts,...suffixChainConcepts,...pronounCaseConcepts};
function describe(item:GrammarItem){
 if(item.kind==='lesson')return {label:verbNounLessons[item.q.lessonId],family:'lessons' as const};
 if(item.kind==='multiple_choice')return {label:skillLabel(item.q.skill_id),family:'multiple_choice' as const};
 if(item.kind==='case_choice')return {label:`Choose the Case · ${choiceCases[item.q.requiredCase]}`,family:'case_choice' as const};
 return {label:labels[item.q.conceptId]||item.q.conceptId,family:'forms' as const};
}
const latest=(list:PilotAttempt[])=>{const map=new Map<string,PilotAttempt>();for(const a of list){const old=map.get(a.questionId);if(!old||Date.parse(a.time)>=Date.parse(old.time))map.set(a.questionId,a);}return [...map.values()];};
const utcDay=(time:string)=>new Date(time).toISOString().slice(0,10);
/** No mastery thresholds. Recent checks are the newest ten question/day results.
 * Manual corrections are displayed separately, never counted as independent success. */
export function summarizeEvidence(attempts:PilotAttempt[],available:number,mode:EvidenceMode):EvidenceStats{
 const success=(a:PilotAttempt)=>a.exerciseType==='case_choice_completion'?(mode==='typed'?!!a.formCorrect:!!a.caseCorrect):a.correct;
 const dayResults=new Map<string,PilotAttempt>();
 for(const a of attempts){const k=a.questionId+':'+utcDay(a.time),old=dayResults.get(k);if(!old||Date.parse(a.time)>=Date.parse(old.time))dayResults.set(k,a);}
 const independent=[...dayResults.values()].filter(a=>!a.manual).sort((a,b)=>Date.parse(b.time)-Date.parse(a.time)),recent=independent.slice(0,10);
 return {available,attempts:attempts.length,distinct:new Set(attempts.map(a=>a.questionId)).size,sessions:new Set(attempts.map(a=>a.sessionId)).size,days:new Set(attempts.map(a=>utcDay(a.time))).size,successfulDays:new Set(independent.filter(success).map(a=>utcDay(a.time))).size,manual:attempts.filter(a=>a.manual).length,recentCorrect:recent.filter(success).length,recentCount:recent.length,missed:latest(attempts).filter(a=>!success(a)).length,last:attempts.reduce<string|undefined>((v,a)=>!v||Date.parse(a.time)>Date.parse(v)?a.time:v,undefined)};
}
export function grammarProgress(history:PilotAttempt[]):{concepts:GrammarConceptProgress[];unlinked:number}{
 const attempts=[...new Map(history.map(a=>[a.id,a])).values()].filter(a=>Number.isFinite(Date.parse(a.time)));
 const byQuestion=new Map<string,PilotAttempt[]>();for(const a of attempts){const list=byQuestion.get(a.questionId)||[];list.push(a);byQuestion.set(a.questionId,list);}
 const groups=new Map<string,{item:GrammarItem;questions:Map<EvidenceMode,GrammarItem[]>}>(),linked=new Set<string>();
 for(const item of grammarItems){const id=itemGroup(item);if(!groups.has(id))groups.set(id,{item,questions:new Map()});const group=groups.get(id)!;const modes:EvidenceMode[]=item.kind==='case_choice'?['recognition','typed']:[itemMode(item)];for(const mode of modes){const list=group.questions.get(mode)||[];list.push(item);group.questions.set(mode,list);}}
 const legacyByLesson=new Map<string,number>();
 const retiredById=new Map(retiredLessonQuestions.map(q=>[q.id,q]));
 for(const a of attempts){const old=retiredById.get(a.questionId);if(old&&a.conceptId===old.conceptId&&a.exerciseType===old.exerciseType){linked.add(a.id);const id=`lesson_${old.lessonId}`;legacyByLesson.set(id,(legacyByLesson.get(id)||0)+1);}}
 const result:GrammarConceptProgress[]=[];
 for(const [id,group] of groups){const modes:GrammarConceptProgress['modes']={},all=new Map<string,PilotAttempt>();for(const [mode,items] of group.questions){const evidence=items.flatMap(item=>(byQuestion.get(item.q.id)||[]).filter(a=>a.conceptId===itemConcept(item)&&a.exerciseType===(item.kind==='multiple_choice'?'grammar_multiple_choice':item.q.exerciseType)));for(const a of evidence){linked.add(a.id);all.set(a.id,a);}modes[mode]=summarizeEvidence(evidence,items.length,mode);}const values=[...all.values()],stats=summarizeEvidence(values,0,'recognition');result.push({id,...describe(group.item),modes,legacyChecks:legacyByLesson.get(id)||0,attempts:all.size,missed:latest(values).filter(a=>!a.correct).length,last:stats.last});}
 result.sort((a,b)=>['lessons','forms','case_choice','multiple_choice'].indexOf(a.family)-['lessons','forms','case_choice','multiple_choice'].indexOf(b.family));
 return {concepts:result,unlinked:attempts.filter(a=>!linked.has(a.id)).length};
}
