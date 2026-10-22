import type {PilotAttempt} from './casePilot';
import type {GrammarQuestion} from './yeniHitit';
export const mcConcept=(skill:string)=>`mc_${skill}` as const;
export function isMcConcept(value:unknown):value is `mc_${string}` {return typeof value==='string'&&/^mc_YH1-(?:FOUND-\d+|\d\d-(?:\d\d|TIME))-S\d+$/.test(value);}
export function validMcAttempt(a:PilotAttempt){
 return isMcConcept(a.conceptId)&&a.multipleChoiceSkill===a.conceptId.slice(3)&&a.exerciseType==='grammar_multiple_choice'&&a.practiceMode==='grammar_multiple_choice'&&
 typeof a.selectedOptionId==='string'&&!!a.selectedOptionId.trim()&&typeof a.expectedOptionId==='string'&&!!a.expectedOptionId.trim()&&!!a.answer.trim()&&!!a.expected.trim()&&a.supportingRuleIds.length===0&&
 (a.manual?a.correct===true:a.correct===(a.selectedOptionId===a.expectedOptionId));
}
export function recordGrammarChoice(attempts:PilotAttempt[],q:GrammarQuestion,selected:string,sessionId:string):PilotAttempt[]{
 const option=q.options.find(o=>o.id===selected);if(!option||attempts.some(a=>a.sessionId===sessionId&&a.questionId===q.id))return attempts;
 return [...attempts,{id:crypto.randomUUID(),sessionId,practiceMode:'grammar_multiple_choice',questionId:q.id,conceptId:mcConcept(q.skill_id),multipleChoiceSkill:q.skill_id,exerciseType:'grammar_multiple_choice',selectedOptionId:selected,expectedOptionId:q.correct_option_id,answer:option.text,expected:q.options.find(o=>o.id===q.correct_option_id)!.text,correct:selected===q.correct_option_id,manual:false,time:new Date().toISOString(),supportingRuleIds:[]}];
}
