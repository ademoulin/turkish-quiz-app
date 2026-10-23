import type {VerbNounQuestion} from './verbNouns';

// These actor checks duplicate sentence meaning or merely read a supplied pronoun.
const redundantActors=new Set(['vn6-01','vn6-04','vn6-07','vn6-09','vn6-12','vn7-01','vn7-04','vn7-06','vn7-10']);
export function refineContentActors(original:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const active=original.flatMap(q=>{
  if(!['content_dik','content_future'].includes(q.lessonId))return [q];
  if(q.task==='structure'&&redundantActors.has(q.exampleId)){retired.push(q);return [];}
  // Second-person singular and third-person singular can share the surface form.
  // Keep their genitive cues, and the overt plural frame, rather than guessing reference.
  if(q.task==='meaning'&&['ben','biz','siz'].includes(q.nominalSubject!)){
   retired.push(q);
   const sentence=q.sentence.replace(/^(Benim|Bizim|Sizin) /,'').replace(/^./,c=>c.toLocaleUpperCase('tr'));
   return [{...q,id:q.id+'-v2',sentence}];
  }
  return [q];
 });
 return {active,retired};
}
