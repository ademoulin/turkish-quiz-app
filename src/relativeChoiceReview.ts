import type {VerbNounQuestion} from './verbNouns';
import {meaningAlternatives} from './clauseMeaningChoices';
type Review=[prompt:string,answer:string,other1:string,other2:string,blank?:boolean];
const structure:Record<string,Review>={
 'vn9-01':['Choose the modifier that completes the noun phrase.','okuyan','okumak','okumayı',true],
 'vn9-02':['Choose the modifier before the plural head noun.','bekleyen','bekleyenler','beklemeleri',true],
 'vn9-03':['Choose the modifier that completes the noun phrase.','yürüyen','yürümek','yürümeyi',true],
 'vn9-04':['Choose the modifier that completes the noun phrase.','uyuyan','uyuması','uyumak',true],
 'vn9-05':['How are the visit and the present situation timed?','Visit: yesterday. At home: now.','Visit: now. At home: yesterday.','Visit: yesterday. At home: yesterday.'],
 'vn9-06':['How are winning and being here timed?','Winning: yesterday. Here: today.','Winning: today. Here: yesterday.','Winning: yesterday. Here: yesterday.'],
 'vn9-07':['What pattern of running is expressed?','He runs here every morning.','He ran here only yesterday.','He will start running here tomorrow.'],
 'vn9-08':['Choose the modifier before the plural head noun.','çalışan','çalışanlar','çalışmaları',true],
 'vn9-09':['Choose the modifier that completes the noun phrase.','dinleyen','dinlemek','dinlemeyi',true],
 'vn9-10':['Which brackets separate the relative description from its head noun?','[Şu anda resme bakan] kız','Şu anda [resme bakan kız]','[Şu anda resme] bakan kız'],
 'vn9-11':['Choose the modifier that completes the noun phrase.','oturan','oturmak','oturmayı',true],
 'vn9-12':['How are going home and being at school timed?','Going home: yesterday. At school: today.','Going home: today. At school: yesterday.','Going home: yesterday. At school: yesterday.'],
 'vn10-01':['Choose the form before the supplied head noun.','okuduğum','okuduğumu','okumam',true],
 'vn10-02':['What is the role of y in okuyacağım?','A joining consonant before the future suffix.','A case ending on the complete noun clause.','An agreement ending for the relative actor.'],
 'vn10-03':['What time pattern does the relative description express?','Seeing the photograph every day.','Seeing the photograph only yesterday.','Seeing the photograph for the first time tomorrow.'],
 'vn10-04':['Choose the form before the supplied head noun.','göreceğin','göreceğini','görmen',true],
 'vn10-05':['What is the role of final i in izlediği here?','Agreement with the relative-clause actor.','Accusative case on a complete content clause.','Accusative case on the described head noun.'],
 'vn10-06':['Choose the form before the supplied head noun.','izleyeceği','izleyeceğini','izlemesi',true],
 'vn10-07':['Choose the form before the supplied head noun.','pişirdiğimiz','pişirdiğimizi','pişirmemiz',true],
 'vn10-08':['Compare pişireceğimiz yemek with bu yemeği pişireceğimizi biliyorum. What does each do?','First: describe a dish. Second: report future cooking.','First: report future cooking. Second: describe a dish.','First: describe a dish. Second: request future cooking.'],
 'vn10-09':['Choose the form before the supplied head noun.','yazdığınız','yazdığınızı','yazmanız',true],
 'vn10-10':['How are the writing and the importance related in time?','The writing is future; the letter is important now.','The writing is past; the letter is important now.','The writing is future; the letter was important only yesterday.'],
 'vn10-11':['Choose the form before the supplied head noun.','yaptıkları','yaptıklarını','yapmaları',true],
 'vn10-12':['Why does k remain in yapacakları?','The following agreement ending starts with a consonant.','The following agreement ending starts with a vowel.','The following head noun supplies an accusative ending.'],
};
export const introductoryConverbs=['converb_ip','converb_arak','converb_madan'];
export function refineClauseChoices(questions:VerbNounQuestion[]){
 const retired:VerbNounQuestion[]=[];
 const active=questions.flatMap(q=>{
  if(q.task==='structure'&&introductoryConverbs.includes(q.lessonId)){retired.push(q);return [];}
  if(q.task==='meaning'&&meaningAlternatives[q.exampleId]){
   retired.push(q);const [one,two]=meaningAlternatives[q.exampleId];
   return [{...q,id:q.id+'-v2',optionLanguage:'en' as const,options:[{id:'target',text:q.expected},{id:'other-1',text:one},{id:'other-2',text:two}]}];
  }
  if(q.task==='structure'&&structure[q.exampleId]){
   retired.push(q);const [prompt,expected,one,two,blank]=structure[q.exampleId];
   const typed=questions.find(other=>other.exampleId===q.exampleId&&other.task==='type')!;
   const turkish=blank||q.exampleId==='vn9-10';
   return [{...q,id:q.id+'-v2',prompt,expected,sentence:blank?typed.sentence:q.sentence,optionLanguage:turkish?'tr' as const:'en' as const,
    options:[{id:'target',text:expected},{id:'other-1',text:one},{id:'other-2',text:two}]}];
  }
  return [q];
 });
 return {active,retired};
}
