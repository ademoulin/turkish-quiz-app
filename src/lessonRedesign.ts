import {refineClauseChoices} from './relativeChoiceReview';
import {clauseCaseChoices} from './clauseCaseChoices';
import type {VerbNounQuestion} from './verbNouns';

// Revised interpretation tasks get new IDs. Original objects remain available for
// identifying earlier evidence, never for current sessions or mistake review.
export function redesignLessons(original:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const active=original.flatMap(q=>{
  if(q.task==='structure'&&['activity','cases'].includes(q.lessonId)){
   // Boundary demonstrations belong in the guide; Lesson 2B already offers
   // activity-form choice. Do not manufacture a third scored track here.
   retired.push(q);return [];
  }
  if(q.task==='structure'&&q.lessonId==='clause_cases'){
   retired.push(q);
   const forms=clauseCaseChoices[q.exampleId],expected=forms[q.nominalCase!];
   const typed=original.find(other=>other.exampleId===q.exampleId&&other.task==='type')!;
   return [{...q,id:q.id+'-v2',sentence:typed.sentence,prompt:'Choose the form that completes the sentence.',expected,
    options:[{id:'target',text:expected},...Object.entries(forms).filter(([c])=>c!==q.nominalCase).map(([,text],i)=>({id:`other-${i+1}`,text}))]}];
  }
  if(q.lessonId==='subjects'&&q.task!=='type'){
   retired.push(q);
   // First/second-person agreement identifies the actor without discourse context.
   // Third-person reference needs context; retain it in the explicit form drills.
   if(q.task==='structure'||q.nominalSubject==='o'||q.nominalSubject==='onlar')return [];
   return [{...q,id:q.id+'-v2',prompt:'Who needs to do the action? Choose the sentence meaning.',sentence:q.sentence.replace(/^(Benim|Senin|Bizim|Sizin) /,'').replace(/^./,c=>c.toLocaleUpperCase('tr'))}];
  }
  if(q.task!=='structure'||!['temporal_contrasts','sentence_building'].includes(q.lessonId))return [q];
  retired.push(q);
  // The original meaning task holds the complete sentence; the old structure view
  // blanked out the connection, or supplied its English category in advance.
  const sentence=original.find(other=>other.exampleId===q.exampleId&&other.task==='meaning')!.sentence;
  const relations={before:'The main action happens before the time-clause action.',after:'The main action happens after the time-clause action.',when:'The time-clause event gives a when/once reference for the main action.',while:'The main action takes place during the time-clause situation.'};
  if(q.lessonId==='temporal_contrasts'){
   const expected=relations[q.temporalRelation!];
   return [{...q,id:q.id+'-v2',sentence,prompt:'Which connection does the Turkish sentence express?',expected,
    options:[{id:'target',text:expected},...Object.entries(relations).filter(([r])=>r!==q.temporalRelation).map(([,text],i)=>({id:`other-${i+1}`,text}))]}];
  }
  const actors={ben:'I',sen:'you (singular)',o:'that person',biz:'we',siz:'you (plural/polite)',onlar:'they'};
  const timing={before:'Main action first',after:'Time-clause action first',when:'When/once reference',while:'Overlapping actions'};
  const reversed={before:'after',after:'before',when:'while',while:'when'} as const;
  const reading=(relation:keyof typeof timing,timeActor:string,mainActor:string)=>`${timing[relation]}. Time clause: ${timeActor}. Main clause: ${mainActor}.`;
  const expected=reading(q.temporalRelation!,actors[q.temporalSubject!],actors[q.mainSubject!]);
  return [{...q,id:q.id+'-v2',sentence,prompt:'Which analysis matches the expressed connection and both actors?',expected,
   options:[{id:'target',text:expected},{id:'other-1',text:reading(reversed[q.temporalRelation!],actors[q.temporalSubject!],actors[q.mainSubject!])},{id:'other-2',text:reading(q.temporalRelation!,actors[q.mainSubject!],actors[q.temporalSubject!])}]}];
 });
 const reviewed=refineClauseChoices(active);
 return {active:reviewed.active,retired:[...retired,...reviewed.retired]};
}
