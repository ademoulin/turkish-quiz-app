import type {VerbNounQuestion} from './verbNouns';

/** Audit implementation for 12B only. Keep the supplied frame, remove suffix recipes. */
export function refineNounClauseBuilding(original:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const actors={ben:'I',sen:'you (singular)',o:'that person',biz:'we',siz:'you (plural/polite)',onlar:'they'};
 const active=original.map(q=>{
  if(q.lessonId!=='noun_clause_building'||q.task==='meaning')return q;
  retired.push(q);
  if(q.task==='build')return {...q,id:q.id+'-v2'};
  const main=q.sentence.slice(0,q.sentence.indexOf(' '));
  const unit=q.expected.match(/\[([^\]]+)\]/)![1];
  const subject=unit.slice(0,unit.indexOf(' ')),phrase=unit.slice(subject.length+1);
  const predicate=q.sentence.slice(main.length+unit.length+2);
  const embedded=actors[q.nominalSubject!],outer=actors[q.nominalMainSubject!];
  const reading=(brackets:string,inside:string,outside:string)=>`${main} ${brackets} ${predicate} · ${inside} → ${outside}`;
  const expected=reading(`[${unit}]`,embedded,outer);
  return {...q,id:q.id+'-v2',prompt:'Choose the object brackets and actors (embedded → main).',expected,
   options:[{id:'target',text:expected},{id:'other-1',text:reading(`[${unit}]`,outer,embedded)},{id:'other-2',text:reading(`[${subject}] ${phrase}`,embedded,outer)}]};
 });
 return {active,retired};
}
