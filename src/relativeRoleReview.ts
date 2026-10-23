import type {VerbNounQuestion} from './verbNouns';

// Newly authored choices for 4.4, not textbook content. Keep the source models.
const inside={dative:'dative (to)',locative:'locative (in / at)',ablative:'ablative (from)'} as const;
const outside={bare:'subject',accusative:'direct object',dative:'dative complement',ablative:'ablative complement'} as const;
const otherInside={dative:'locative',locative:'ablative',ablative:'dative'} as const;
const otherOutside={bare:'accusative',accusative:'dative',dative:'ablative',ablative:'bare'} as const;

export function refineRelativeRoles(original:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const active=original.map(q=>{
  if(q.lessonId!=='relative_roles'||q.task!=='structure')return q;
  retired.push(q);
  const reading=(inner:keyof typeof inside,outer:keyof typeof outside)=>`Inside: ${inside[inner]} · Main: ${outside[outer]}`;
  const inner=q.relativeInnerRole!,outer=q.relativeHeadCase!,expected=reading(inner,outer);
  return {...q,id:q.id+'-v2',prompt:'What role does the described noun have inside the relative clause, and what role does the whole phrase have in the main sentence?',expected,optionLanguage:'en' as const,
   options:[{id:'target',text:expected},{id:'other-1',text:reading(otherInside[inner],outer)},{id:'other-2',text:reading(inner,otherOutside[outer])}]};
 });
 return {active,retired};
}
