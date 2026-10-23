import React from 'react';
import type {TypedQuestion} from './casePilot';
import type {ChoiceQuestion} from './caseChoice';
/** Presentation only: named-form drills already show the requested target and answer. */
export function formReason(q:TypedQuestion|ChoiceQuestion):string|undefined{
 if(q.exerciseType==='case_choice_completion')return q.explanation.split(' Form:')[0];
 if(q.exerciseType==='typed_pronoun_case'&&q.requiredCase==='dative'&&['ben','sen'].includes(q.pronoun))return 'Ben and sen have irregular dative forms: bana and sana.';
 return undefined;
}
export function FormFeedback({question:q}:{question:TypedQuestion|ChoiceQuestion}){
 const reason=formReason(q);
 return reason?<p className="feedback-reason">{reason}</p>:null;
}
