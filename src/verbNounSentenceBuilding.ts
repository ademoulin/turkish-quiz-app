import type {VerbNounExample} from './verbNouns';
import type {NominalSubject} from './verbNounSubjects';
/** Newly authored drafts. Scope: Yeni Hitit 1 §10.3 pp.130/170;
 * Yeni Hitit 2 §9.2 p.107 and §3.3 p.38, support p.182.
 * Not textbook quotations. Independent review and exact Ödkem mapping pending. */
type Row=[VerbNounExample['temporalRelation'],VerbNounExample['temporalTime'],NominalSubject,NominalSubject,string,string,string,string,string,string,string,string,string];
// relation, time, actors, lead, source clauses, time phrase, main phrase,
// alternative phrases, meaning, requested wording.
const rows:Row[]=[
 ['before','past','ben','sen','Dün','Ben evden çıktım.','Sen kapıyı kontrol ettin.','evden çıkmadan önce','kapıyı kontrol ettin','evden çıktıktan sonra','kapıyı kontrol ettim','Yesterday, you checked the door before I left home.','Explicit before: -mAdAn önce'],
 ['before','future','o','biz','Yarın','O yola çıkacak.','Biz hava durumuna bakacağız.','yola çıkmadan önce','hava durumuna bakacağız','yola çıkınca','hava durumuna bakacak','Tomorrow, we will check the weather before that person sets off.','Explicit before: -mAdAn önce'],
 ['before','habitual','siz','onlar','Her sabah','Siz işe gidersiniz.','Onlar kahvaltıyı hazırlarlar.','işe gitmeden önce','kahvaltıyı hazırlarlar','işe giderken','kahvaltıyı hazırlarsınız','Every morning, they prepare breakfast before you (plural/polite) go to work.','Explicit before: -mAdAn önce'],
 ['after','past','sen','o','Dün','Sen raporu bitirdin.','O dosyayı gönderdi.','raporu bitirdikten sonra','dosyayı gönderdi','raporu bitirmeden önce','dosyayı gönderdin','Yesterday, that person sent the file after you finished the report.','Explicit after: -DIktAn sonra'],
 ['after','future','biz','siz','Yarın','Biz biletleri alacağız.','Siz oteli arayacaksınız.','biletleri aldıktan sonra','oteli arayacaksınız','biletleri alırken','oteli arayacağız','Tomorrow, you (plural/polite) will call the hotel after we buy the tickets.','Explicit after: -DIktAn sonra'],
 ['after','habitual','onlar','ben','Her akşam','Onlar eve dönerler.','Ben çay yaparım.','eve döndükten sonra','çay yaparım','eve dönmeden önce','çay yaparlar','Every evening, I make tea after they return home.','Explicit after: -DIktAn sonra'],
 ['when','future','ben','biz','Yarın','Ben istasyona varacağım.','Biz taksiye bineceğiz.','istasyona varınca','taksiye bineceğiz','istasyona varmadan önce','taksiye bineceğim','Tomorrow, when I arrive at the station, we will get into a taxi.','When/once: -(y)IncA'],
 ['when','habitual','o','siz','Her sabah','O zile basar.','Siz kapıyı açarsınız.','zile basınca','kapıyı açarsınız','zile basarken','kapıyı açar','Every morning, when that person rings the bell, you (plural/polite) open the door.','When/once: -(y)IncA'],
 ['when','past','siz','ben','Dün','Siz salona girdiniz.','Ben telefonda konuşuyordum.','salona girince','telefonda konuşuyordum','salona girdikten sonra','telefonda konuşuyordunuz','Yesterday, when you (plural/polite) entered the lounge, I was talking on the phone.','When/once: -(y)IncA; the main action was already in progress'],
 ['while','habitual','sen','onlar','Her akşam','Sen ders çalışırsın.','Onlar sessiz konuşurlar.','ders çalışırken','sessiz konuşurlar','ders çalışınca','sessiz konuşursun','Every evening, they speak quietly while you study.','While/during: -ken'],
 ['while','past','biz','sen','Dün','Biz yemek hazırlıyorduk.','Sen müzik dinliyordun.','yemek hazırlarken','müzik dinliyordun','yemek hazırlamadan önce','müzik dinliyorduk','Yesterday, you were listening to music while we were preparing food.','While/during: -ken'],
 ['while','future','onlar','o','Yarın','Onlar bahçede oynayacaklar.','O kitap okuyacak.','bahçede oynarken','kitap okuyacak','bahçede oynadıktan sonra','kitap okuyacaklar','Tomorrow, that person will read a book while they play in the garden.','While/during: -ken'],
];
const who:Record<NominalSubject,string>={ben:'I',sen:'you (singular)',o:'that person',biz:'we',siz:'you (plural/polite)',onlar:'they'};
export const sentenceBuildingExamples:VerbNounExample[]=rows.map(([temporalRelation,temporalTime,temporalSubject,mainSubject,lead,first,second,phrase,mainPhrase,wrongTime,wrongMain,meaning,temporalIntent],i)=>{
 const id=`vn12a-${String(i+1).padStart(2,'0')}`,start=`${lead} ${temporalSubject}`,unit=`${start} ${phrase}`,main=`${mainSubject} ${mainPhrase}`;
 const chunks=[['time-subject',start],['time-phrase',phrase],['main-subject',mainSubject],['main-phrase',mainPhrase],['alternative-time',wrongTime],['alternative-main',wrongMain]].map(([part,text])=>({id:`${id}-${part}`,text}));
 const roles=`Time clause: ${who[temporalSubject]}. Main clause: ${who[mainSubject]}.`;
 return {id,lessonId:'sentence_building',form:'sentence_chunks',stem:'',verbMeaning:'',temporalRelation,temporalTime,temporalSubject,mainSubject,temporalIntent,
 sourceClauses:[first,second],chunks,expectedChunkIds:chunks.slice(0,4).map(c=>c.id),sentence:`${unit} ${main}.`,unit,main,template:`${start} ___ ${main}.`,answer:phrase,
 converbLead:lead,converbClause:`${temporalSubject} ${phrase}`,meaning,
 distractors:[`The two clause subjects are reversed: ${who[mainSubject]} performs the time-clause action, and ${who[temporalSubject]} performs the main action.`,`Both actions are performed only by ${who[temporalSubject]}.`],
 structurePrompt:'Who belongs inside the time clause, and who performs the main action?',structureAnswer:roles,
 structureDistractors:[`Time clause: ${who[mainSubject]}. Main clause: ${who[temporalSubject]}.`,`Both clauses have only the subject ${who[temporalSubject]}.`],
 breakdown:`[${temporalSubject} ${phrase}] + [${main}]`,
 explanation:`${roles} The requested wording is ${temporalIntent}. The supplied finite predicate ${mainPhrase} agrees with ${mainSubject}; the time expression does not add person agreement. ${temporalRelation==='when'?'When/once supplies a reference event, without guaranteeing immediacy or causation.':temporalRelation==='while'?'While places the main action within the other action’s interval; their durations need not match.':temporalRelation==='before'?'The main action comes before the time-clause event.':'The time-clause event comes before the main action.'} This exercise uses a time-clause-first frame; other Turkish word orders can also be grammatical.`,supportingRuleIds:[],
 };
});
