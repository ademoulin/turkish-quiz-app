import type {VerbNounExample} from './verbNouns';
import type {NominalSubject} from './verbNounSubjects';
import type {NominalConstruction} from './verbNounContrasts';

// App-authored drafts. Yeni Hitit 2 §11.3 guides noun-clause scope; predicate
// patterns were cross-checked against grammar references. Independent review
// and exact Ödkem mapping remain pending. All three surface forms are authored.
type Row=[subject:NominalSubject,genitive:string,detail:string,dative:string,ablative:string,accusative:string,meaning:string];
const groups:{main:string;rule:string;outer:'dative'|'ablative';construction:NominalConstruction;rows:Row[]}[]=[
 {main:'alıştım',rule:'Alışmak takes the dative (-A): the situation someone gets used to goes in the dative.',outer:'dative',construction:'ma',rows:[
  ['sen','senin','evden ','çalışmana','çalışmandan','çalışmanı','I got used to your working from home.'],
  ['biz','bizim','her sabah erken ','kalkmamıza','kalkmamızdan','kalkmamızı','I got used to our getting up early every morning.'],
  ['siz','sizin','her hafta buraya ','gelmenize','gelmenizden','gelmenizi','I got used to your coming here every week.'],
  ['onlar','onların','akşamları müzik ','dinlemelerine','dinlemelerinden','dinlemelerini','I got used to their listening to music in the evenings.'],
 ]},
 {main:'kızdım',rule:'Kızmak takes the dative (-A): the action someone is angry about goes in the dative.',outer:'dative',construction:'ma',rows:[
  ['sen','senin','toplantıda yüksek sesle ','konuşmana','konuşmandan','konuşmanı','I was angry about your speaking loudly in the meeting.'],
  ['biz','bizim','kapıyı açık ','bırakmamıza','bırakmamızdan','bırakmamızı','I was angry about our leaving the door open.'],
  ['siz','sizin','toplantıya geç ','gelmenize','gelmenizden','gelmenizi','I was angry about your arriving late for the meeting.'],
  ['onlar','onların','bana haber ','vermemelerine','vermemelerinden','vermemelerini','I was angry about their not letting me know.'],
 ]},
 {main:'şaşırdım',rule:'Şaşırmak takes the dative (-A): the fact someone is surprised at goes in the dative.',outer:'dative',construction:'dik',rows:[
  ['sen','senin','dün bu kadar erken ','geldiğine','geldiğinden','geldiğini','I was surprised that you came so early yesterday.'],
  ['biz','bizim','raporu dün ','bitirdiğimize','bitirdiğimizden','bitirdiğimizi','I was surprised that we finished the report yesterday.'],
  ['siz','sizin','bu adresi önceden ','bildiğinize','bildiğinizden','bildiğinizi','I was surprised that you already knew this address.'],
  ['onlar','onların','dün maçı ','kazandıklarına','kazandıklarından','kazandıklarını','I was surprised that they won the match yesterday.'],
 ]},
 {main:'hoşlanıyorum',rule:'Hoşlanmak takes the ablative (-DAn): the activity or event someone likes goes in the ablative.',outer:'ablative',construction:'ma',rows:[
  ['sen','senin','bana yemek ','pişirmene','pişirmenden','pişirmeni','I like your cooking for me.'],
  ['biz','bizim','birlikte seyahat ','etmemize','etmemizden','etmemizi','I like our travelling together.'],
  ['siz','sizin','bize Türkçe şarkılar ','söylemenize','söylemenizden','söylemenizi','I like your singing Turkish songs to us.'],
  ['onlar','onların','bana sık sık ','yazmalarına','yazmalarından','yazmalarını','I like their writing to me often.'],
 ]},
 {main:'şikâyet ediyorum',rule:'Şikâyet etmek takes the ablative (-DAn): the situation someone complains about goes in the ablative.',outer:'ablative',construction:'ma',rows:[
  ['sen','senin','geceleri gürültü ','yapmana','yapmandan','yapmanı','I complain about your making noise at night.'],
  ['biz','bizim','her gün fazla mesai ','yapmamıza','yapmamızdan','yapmamızı','I complain about our working overtime every day.'],
  ['siz','sizin','toplantıda sürekli ','konuşmanıza','konuşmanızdan','konuşmanızı','I complain about your talking constantly in the meeting.'],
  ['onlar','onların','hiç ','çalışmamalarına','çalışmamalarından','çalışmamalarını','I complain about their not working at all.'],
 ]},
 {main:'şüpheleniyorum',rule:'Şüphelenmek takes the ablative (-DAn): the situation someone suspects goes in the ablative.',outer:'ablative',construction:'dik',rows:[
  ['sen','senin','dün benden bir şey ','sakladığına','sakladığından','sakladığını','I suspect that you hid something from me yesterday.'],
  ['biz','bizim','dün yanlış hesap ','yaptığımıza','yaptığımızdan','yaptığımızı','I suspect that we calculated incorrectly yesterday.'],
  ['siz','sizin','dün beni yanlış ','anladığınıza','anladığınızdan','anladığınızı','I suspect that you misunderstood me yesterday.'],
  ['onlar','onların','dünkü sınavda kopya ','çektiklerine','çektiklerinden','çektiklerini','I suspect that they cheated in yesterday’s exam.'],
 ]},
];
export const additionalClauseForms:Record<string,string[]>={};
export const additionalClauseRules:Record<string,string>={};
export const additionalClauseCaseExamples:VerbNounExample[]=groups.flatMap((group,g)=>{
 additionalClauseRules[group.main]=group.rule;
 return group.rows.map(([subject,genitive,detail,dat,abl,acc,meaning],r)=>{
  const id=`vn12c-${String(13+g*4+r).padStart(2,'0')}`,answer=group.outer==='dative'?dat:abl;
  additionalClauseForms[id]=[answer,...[dat,abl,acc].filter(form=>form!==answer)];
  const unit=`${genitive} ${detail}${answer}`;
  return {id,lessonId:'noun_clause_cases',form:group.construction==='ma'?'ma_possessive_case':'dik_possessive_case',stem:'',verbMeaning:'',nominalSubject:subject,nominalMainSubject:'ben',subjectGenitive:genitive,nominalCase:group.outer,nominalConstruction:group.construction,...(group.construction==='dik'?{contentTime:'past_event' as const}:{}),mainLead:'Ben',unit,main:group.main,sentence:`Ben ${unit} ${group.main}.`,template:`Ben ${genitive} ${detail}___ ${group.main}.`,answer,meaning,distractors:['',''],structureAnswer:answer,structurePrompt:'Choose the form that completes the sentence.',breakdown:'',explanation:group.rule,supportingRuleIds:[]};
 });
});
