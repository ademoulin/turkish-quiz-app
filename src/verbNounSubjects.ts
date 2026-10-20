import type {VerbNounExample} from './verbNouns';
export const nominalSubjects={ben:'ben · I',sen:'sen · you (informal singular)',o:'o · he/she (one person)',biz:'biz · we',siz:'siz · you (plural or polite)',onlar:'onlar · they (a group)'} as const;
export type NominalSubject=keyof typeof nominalSubjects;
// Newly authored, guided by Yeni Hitit 1 §12.1 p.145 and grammar support.
// Two models per person. For onlar, explicitly practise overt -ları/-leri:
// singular agreement is also possible in Turkish, but is not this typed task.
const rows:{subject:NominalSubject;genitive:string;stem:string;verbMeaning:string;detail:string;answer:string;build:string;main:string;meaning:string;others:[NominalSubject,NominalSubject]}[]=[
 {subject:'ben',genitive:'Benim',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmem',build:'gel + me + m',main:'önemli',meaning:'It is important that I come.',others:['sen','biz']},
 {subject:'ben',genitive:'Benim',stem:'kalk',verbMeaning:'get up',detail:'erken ',answer:'kalkmam',build:'kalk + ma + m',main:'gerek',meaning:'It is necessary for me to get up early.',others:['sen','onlar']},
 {subject:'sen',genitive:'Senin',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmen',build:'gel + me + n',main:'önemli',meaning:'It is important that you come (one person).',others:['ben','siz']},
 {subject:'sen',genitive:'Senin',stem:'bekle',verbMeaning:'wait',detail:'burada ',answer:'beklemen',build:'bekle + me + n',main:'gerek',meaning:'It is necessary for you to wait here (one person).',others:['ben','biz']},
 {subject:'o',genitive:'Onun',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmesi',build:'gel + me + s + i',main:'önemli',meaning:'It is important that he/she comes (one person).',others:['ben','onlar']},
 {subject:'o',genitive:'Onun',stem:'dinlen',verbMeaning:'rest',detail:'',answer:'dinlenmesi',build:'dinlen + me + s + i',main:'gerek',meaning:'It is necessary for him/her to rest (one person).',others:['sen','biz']},
 {subject:'biz',genitive:'Bizim',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmemiz',build:'gel + me + miz',main:'önemli',meaning:'It is important that we come.',others:['ben','siz']},
 {subject:'biz',genitive:'Bizim',stem:'öğren',verbMeaning:'learn',detail:'Türkçe ',answer:'öğrenmemiz',build:'öğren + me + miz',main:'gerek',meaning:'It is necessary for us to learn Turkish.',others:['sen','onlar']},
 {subject:'siz',genitive:'Sizin',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmeniz',build:'gel + me + niz',main:'önemli',meaning:'It is important that you come (plural or polite).',others:['sen','biz']},
 {subject:'siz',genitive:'Sizin',stem:'çalış',verbMeaning:'work',detail:'dikkatli ',answer:'çalışmanız',build:'çalış + ma + nız',main:'gerek',meaning:'It is necessary for you to work carefully (plural or polite).',others:['ben','onlar']},
 {subject:'onlar',genitive:'Onların',stem:'gel',verbMeaning:'come',detail:'',answer:'gelmeleri',build:'gel + me + leri',main:'önemli',meaning:'It is important that they come (a group).',others:['o','biz']},
 {subject:'onlar',genitive:'Onların',stem:'çalış',verbMeaning:'work',detail:'birlikte ',answer:'çalışmaları',build:'çalış + ma + ları',main:'gerek',meaning:'It is necessary for them to work together (a group).',others:['o','siz']},
];
const nominative:Record<NominalSubject,string>={ben:'I come',sen:'you come (informal singular)',o:'he/she comes (one person)',biz:'we come',siz:'you come (plural or polite)',onlar:'they come (a group)'};
const oblique:Record<NominalSubject,string>={ben:'me',sen:'you (informal singular)',o:'him/her (one person)',biz:'us',siz:'you (plural or polite)',onlar:'them (a group)'};
const alternativeMeaning=(p:NominalSubject,detail:string,verbMeaning:string,main:string)=>{
 const action=verbMeaning==='get up'?'get up early':verbMeaning==='wait'?'wait here':verbMeaning==='learn'?'learn Turkish':verbMeaning==='work'?(detail.trim()==='birlikte'?'work together':'work carefully'):verbMeaning;
 return main==='önemli'?`It is important that ${nominative[p]}.`:`It is necessary for ${oblique[p]} to ${action}.`;
};
export const subjectExamples:VerbNounExample[]=rows.map((r,i)=>{
 const unit=`${r.genitive} ${r.detail}${r.answer}`;
 return {id:`vn3-${String(i+1).padStart(2,'0')}`,lessonId:'subjects',stem:r.stem,verbMeaning:r.verbMeaning,form:'ma_possessive',
  nominalSubject:r.subject,subjectGenitive:r.genitive,subjectAlternatives:r.others,
  sentence:`${unit} ${r.main}.`,meaning:r.meaning,distractors:r.others.map(p=>alternativeMeaning(p,r.detail,r.verbMeaning,r.main)) as [string,string],unit,main:r.main,
  template:`${r.genitive} ${r.detail}___ ${r.main}.`,answer:r.answer,breakdown:r.build,
  explanation:`${r.genitive} identifies who performs the action: ${nominalSubjects[r.subject]}. The -ma/-me part names the action; the possessive ending links it to that subject. ${r.subject==='o'?'Here s separates the vowels and i is the third-person possessive ending, not accusative. ':''}${r.subject==='onlar'?'This exercise uses overt plural agreement -ları/-leri. Singular agreement with onların can also occur in Turkish. ':''}The whole bracketed clause is the subject of ${r.main}. There is no outer case ending on the action noun in this lesson.`,
  supportingRuleIds:['two_way_vowel_harmony',...(['o','biz','siz','onlar'].includes(r.subject)?['four_way_vowel_harmony']:[]),...(r.subject==='o'?['buffer_s']:[])],
 };
});
