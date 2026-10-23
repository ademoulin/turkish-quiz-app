import type {VerbNounQuestion} from './verbNouns';

// Newly authored analysis choices for lesson 4.3; the Turkish models stay intact.
const actors:Record<string,string>={ben:'I',sen:'you (singular)',o:'that person',biz:'we',siz:'you (plural/polite)',onlar:'they'};
const roles={bare:'subject',accusative:'direct object',dative:'dative complement',ablative:'ablative complement'} as const;
const otherRole={bare:'accusative',accusative:'dative',dative:'ablative',ablative:'bare'} as const;

export function refineRelativeBuilding(original:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const active=original.map(q=>{
  if(q.lessonId!=='relative_building'||q.task!=='structure')return q;
  retired.push(q);
  const actor=actors[q.relativeActor!]||q.relativeActor!;
  const alternateActor=q.relativeActor==='sen'?actors.ben:q.relativeActor==='biz'?actors.siz:q.relativeActor==='siz'?actors.biz:actors.sen;
  const reading=(who:string,role:keyof typeof roles)=>`Relative actor: ${who} · Head: ${q.relativeHeadBase} · Main role: ${roles[role]}`;
  const expected=reading(actor,q.relativeHeadCase!);
  return {...q,id:q.id+'-v2',prompt:'Choose the relative actor, head noun and main-clause role.',expected,optionLanguage:'en' as const,
   options:[{id:'target',text:expected},{id:'other-1',text:reading(alternateActor,q.relativeHeadCase!)},{id:'other-2',text:reading(actor,otherRole[q.relativeHeadCase!])}]};
 });
 return {active,retired};
}
