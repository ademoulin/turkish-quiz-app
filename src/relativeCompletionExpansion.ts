import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
/** 24 newly authored completion drafts for lessons 4.1 and 4.2, informed by
 * Yeni Hitit 2 §8.1–8.2 (printed pp.91,95). Not textbook quotations.
 * Independent linguistic review and exact Ödkem mapping pending. */
type Row={lesson:'subject_relatives'|'object_relatives';template:string;answer:string;distractors:[string,string,string];stem:string;verbMeaning:string;time:'past'|'current'|'habitual'|'future';meaning:string;reason:string;subject?:'ben'|'sen'|'o'|'biz'|'siz';genitive?:string;form?:'dik'|'acak'};
const rows:Row[]=[
  {
    "lesson": "subject_relatives",
    "template": "Yarın sabah ilk otobüsle ___ yolcular bilet aldı.",
    "answer": "gelecek olan",
    "distractors": [
      "gelen",
      "gelmeyen",
      "gelmek"
    ],
    "stem": "come",
    "verbMeaning": "future",
    "time": "The passengers who will come on the first bus tomorrow morning bought tickets.",
    "meaning": "Future passengers take gelecek olan; gelen does not explicitly anchor the later arrival."
  },
  {
    "lesson": "subject_relatives",
    "template": "Dün toplantıya ___ çalışanlar bugün raporu okudu.",
    "answer": "katılmayan",
    "distractors": [
      "katılan",
      "katılacak olan",
      "katılmamız"
    ],
    "stem": "katıl",
    "verbMeaning": "attend",
    "time": "past",
    "meaning": "The employees who did not attend yesterday’s meeting read the report today.",
    "reason": "The employees did not attend; -mayan negates their action."
  },
  {
    "lesson": "subject_relatives",
    "template": "Her akşam bu sokakta ___ komşum bugün hasta.",
    "answer": "yürüyen",
    "distractors": [
      "yürüyecek olan",
      "yürümediği",
      "yürümeyen"
    ],
    "stem": "yürü",
    "verbMeaning": "walk",
    "time": "habitual",
    "meaning": "My neighbor who walks on this street every evening is sick today.",
    "reason": "Her akşam marks the habit; yürüyen modifies the walker."
  },
  {
    "lesson": "subject_relatives",
    "template": "Şu anda telefonla ___ adam müdürümüz.",
    "answer": "konuşan",
    "distractors": [
      "konuşacak olan",
      "konuşmadığı",
      "konuşmak"
    ],
    "stem": "konuş",
    "verbMeaning": "speak",
    "time": "current",
    "meaning": "The man speaking on the phone right now is our manager.",
    "reason": "The man performs the speaking; konuşan attaches to adam."
  },
  {
    "lesson": "subject_relatives",
    "template": "Yarın derse ___ öğrenciler öğretmene önceden haber verdi.",
    "answer": "gelmeyecek olan",
    "distractors": [
      "gelen",
      "gelmeyen",
      "gelecek olan"
    ],
    "stem": "gel",
    "verbMeaning": "come",
    "time": "future",
    "meaning": "The students who will not come to class tomorrow informed the teacher in advance.",
    "reason": "Gelmeyecek olan explicitly marks a future non-arrival."
  },
  {
    "lesson": "subject_relatives",
    "template": "Bu sabah kahvaltı ___ çocuklar şimdi acıktı.",
    "answer": "yapmayan",
    "distractors": [
      "yapan",
      "yapacak olan",
      "yaptığımız"
    ],
    "stem": "yap",
    "verbMeaning": "have breakfast",
    "time": "past",
    "meaning": "The children who did not have breakfast this morning are hungry now.",
    "reason": "Yapmayan describes children who did not perform the breakfast action."
  },
  {
    "lesson": "subject_relatives",
    "template": "Yarın sahnede ___ şarkıcı bugün prova yapıyor.",
    "answer": "şarkı söyleyecek olan",
    "distractors": [
      "şarkı söyleyen",
      "şarkı söylemeyen",
      "şarkı söylemek"
    ],
    "stem": "söyle",
    "verbMeaning": "sing",
    "time": "future",
    "meaning": "The singer who will sing on stage tomorrow is rehearsing today.",
    "reason": "Söyleyecek olan makes the stage performance future."
  },
  {
    "lesson": "subject_relatives",
    "template": "Dün hiçbir şey ___ bebek bugün çok sakin.",
    "answer": "yemeyen",
    "distractors": [
      "yiyen",
      "yiyecek olan",
      "yemediği"
    ],
    "stem": "ye",
    "verbMeaning": "eat",
    "time": "past",
    "meaning": "The baby who ate nothing yesterday is very calm today.",
    "reason": "Yemeyen negates the action performed by the baby."
  },
  {
    "lesson": "subject_relatives",
    "template": "Her gün erken ___ doktor bugün izinli.",
    "answer": "kalkan",
    "distractors": [
      "kalkacak olan",
      "kalkmadığı",
      "kalkmak"
    ],
    "stem": "kalk",
    "verbMeaning": "get up",
    "time": "habitual",
    "meaning": "The doctor who gets up early every day is off today.",
    "reason": "Kalkan describes the person who habitually gets up early."
  },
  {
    "lesson": "subject_relatives",
    "template": "Yarın bizimle ___ misafirler otel ayırttı.",
    "answer": "kalmayacak olan",
    "distractors": [
      "kalan",
      "kalacak olan",
      "kalmadığımız"
    ],
    "stem": "kal",
    "verbMeaning": "stay",
    "time": "future",
    "meaning": "The guests who will not stay with us tomorrow booked a hotel.",
    "reason": "Kalmayacak olan describes a future refusal/non-stay, not a past fact."
  },
  {
    "lesson": "subject_relatives",
    "template": "Dün beni ___ öğretmen bugün okulda yok.",
    "answer": "aramayan",
    "distractors": [
      "arayan",
      "arayacak olan",
      "aramadığım"
    ],
    "stem": "ara",
    "verbMeaning": "call",
    "time": "past",
    "meaning": "The teacher who did not call me yesterday is absent from school today.",
    "reason": "Aramayan negates the teacher’s calling action."
  },
  {
    "lesson": "subject_relatives",
    "template": "Şimdi kapıda ___ kadın annem.",
    "answer": "bekleyen",
    "distractors": [
      "bekleyecek olan",
      "beklemediğim",
      "beklemek"
    ],
    "stem": "bekle",
    "verbMeaning": "wait",
    "time": "current",
    "meaning": "The woman waiting at the door now is my mother.",
    "reason": "Bekleyen modifies kadın, the person waiting now."
  },
  {
    "lesson": "object_relatives",
    "template": "Benim dün ___ kitabı şimdi Ayşe okuyor.",
    "answer": "bitirdiğim",
    "distractors": [
      "bitireceğim",
      "bitirdiğini",
      "bitirmediğim"
    ],
    "stem": "bitir",
    "verbMeaning": "finish",
    "time": "past",
    "meaning": "Ayşe is now reading the book I finished yesterday.",
    "reason": "Bitirdiğim agrees with benim and modifies kitap; no extra object -i goes on the participle.",
    "subject": "ben",
    "genitive": "Benim",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Senin yarın ___ filmi biz geçen hafta izledik.",
    "answer": "izleyeceğin",
    "distractors": [
      "izlediğin",
      "izleyeceğini",
      "izlemeyeceğin"
    ],
    "stem": "izle",
    "verbMeaning": "watch",
    "time": "future",
    "meaning": "We watched last week the film that you will watch tomorrow.",
    "reason": "İzleyeceğin agrees with senin and gives the film a future viewing.",
    "subject": "sen",
    "genitive": "Senin",
    "form": "acak"
  },
  {
    "lesson": "object_relatives",
    "template": "Ayşe’nin dün ___ mektup masada duruyor.",
    "answer": "yazmadığı",
    "distractors": [
      "yazdığı",
      "yazacağı",
      "yazmadığını"
    ],
    "stem": "yaz",
    "verbMeaning": "write",
    "time": "past",
    "meaning": "The letter Ayşe did not write yesterday is lying on the table.",
    "reason": "Yazmadığı negates Ayşe’s writing; the head noun is mektup.",
    "subject": "o",
    "genitive": "Ayşe’nin",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Bizim yarın ___ yemek için bugün alışveriş yaptık.",
    "answer": "pişireceğimiz",
    "distractors": [
      "pişirdiğimiz",
      "pişireceğimizi",
      "pişirmeyeceğimiz"
    ],
    "stem": "pişir",
    "verbMeaning": "cook",
    "time": "future",
    "meaning": "We shopped today for the food we will cook tomorrow.",
    "reason": "Pişireceğimiz agrees with bizim; the cooking is future.",
    "subject": "biz",
    "genitive": "Bizim",
    "form": "acak"
  },
  {
    "lesson": "object_relatives",
    "template": "Senin bu sabah ___ anahtarı buldum.",
    "answer": "kaybettiğin",
    "distractors": [
      "kaybedeceğin",
      "kaybettiğini",
      "kaybetmediğin"
    ],
    "stem": "kaybet",
    "verbMeaning": "lose",
    "time": "past",
    "meaning": "I found the key you lost this morning.",
    "reason": "Kaybettiğin agrees with senin and modifies the lost key.",
    "subject": "sen",
    "genitive": "Senin",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Benim yarın ___ otel şehir merkezinde.",
    "answer": "kalacağım",
    "distractors": [
      "kaldığım",
      "kalacağımı",
      "kalmayacağım"
    ],
    "stem": "kal",
    "verbMeaning": "stay",
    "time": "future",
    "meaning": "The hotel where I will stay tomorrow is in the city center.",
    "reason": "Kalacağım agrees with benim and describes the hotel of the future stay.",
    "subject": "ben",
    "genitive": "Benim",
    "form": "acak"
  },
  {
    "lesson": "object_relatives",
    "template": "Mert’in her gün ___ kahveyi ben de seviyorum.",
    "answer": "içtiği",
    "distractors": [
      "içeceği",
      "içtiğini",
      "içmediği"
    ],
    "stem": "iç",
    "verbMeaning": "drink",
    "time": "habitual",
    "meaning": "I also like the coffee Mert drinks every day.",
    "reason": "İçtiği agrees with Mert’in; her gün makes drinking habitual.",
    "subject": "o",
    "genitive": "Mert’in",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Sizin yarın ___ toplantı iptal edildi.",
    "answer": "katılacağınız",
    "distractors": [
      "katıldığınız",
      "katılacağınızı",
      "katılmayacağınız"
    ],
    "stem": "katıl",
    "verbMeaning": "attend",
    "time": "future",
    "meaning": "The meeting you will attend tomorrow was cancelled.",
    "reason": "Katılacağınız agrees with sizin and modifies the future meeting.",
    "subject": "siz",
    "genitive": "Sizin",
    "form": "acak"
  },
  {
    "lesson": "object_relatives",
    "template": "Bizim dün ___ şarkıyı kimse tanımadı.",
    "answer": "söylemediğimiz",
    "distractors": [
      "söylediğimiz",
      "söyleyeceğimiz",
      "söylemediğimizi"
    ],
    "stem": "söyle",
    "verbMeaning": "sing",
    "time": "past",
    "meaning": "Nobody recognized the song we did not sing yesterday.",
    "reason": "Söylemediğimiz negates our singing; -DIK agrees with bizim.",
    "subject": "biz",
    "genitive": "Bizim",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Ayşe’nin yarın ___ arabayı babası hazırladı.",
    "answer": "kullanacağı",
    "distractors": [
      "kullandığı",
      "kullanacağını",
      "kullanmayacağı"
    ],
    "stem": "kullan",
    "verbMeaning": "drive",
    "time": "future",
    "meaning": "Her father prepared the car Ayşe will drive tomorrow.",
    "reason": "Kullanacağı agrees with Ayşe’nin and refers to tomorrow.",
    "subject": "o",
    "genitive": "Ayşe’nin",
    "form": "acak"
  },
  {
    "lesson": "object_relatives",
    "template": "Benim her hafta ___ gazeteyi kardeşim de okuyor.",
    "answer": "aldığım",
    "distractors": [
      "alacağım",
      "aldığımı",
      "almadığım"
    ],
    "stem": "al",
    "verbMeaning": "buy",
    "time": "habitual",
    "meaning": "My sibling also reads the newspaper I buy every week.",
    "reason": "Aldığım agrees with benim; her hafta expresses a regular habit.",
    "subject": "ben",
    "genitive": "Benim",
    "form": "dik"
  },
  {
    "lesson": "object_relatives",
    "template": "Senin yarın ___ paketi bugün kargoya verdim.",
    "answer": "almayacağın",
    "distractors": [
      "aldığın",
      "alacağın",
      "almayacağını"
    ],
    "stem": "al",
    "verbMeaning": "receive",
    "time": "future",
    "meaning": "I shipped today the package that you will not receive tomorrow.",
    "reason": "Almayacağın negates the future receipt; the participle agrees with senin.",
    "subject": "sen",
    "genitive": "Senin",
    "form": "acak"
  }
];
export const relativeCompletionExamples:VerbNounExample[]=rows.map((r,i)=>{
 const id=`vn-relative-expand-${String(i+1).padStart(2,'0')}`,sentence=r.template.replace('___',r.answer),head=r.template.split('___ ')[1].split(' ')[0],end=sentence.indexOf(' '+head,sentence.indexOf(r.answer))+head.length+1,unit=sentence.slice(0,end),main=sentence.slice(end+1,-1);
 return {id,lessonId:r.lesson,stem:r.stem,verbMeaning:r.verbMeaning,form:r.lesson==='subject_relatives'?'subject_relative_an':r.form==='acak'?'object_relative_acak':'object_relative_dik',relativeForm:r.form,relativeTime:r.time,relativeHead:head,relativeClause:unit.slice(0,-head.length-1),nominalSubject:r.subject,subjectGenitive:r.genitive,template:r.template,sentence,answer:r.answer,unit,main,meaning:r.meaning,distractors:['',''],breakdown:'',explanation:r.reason,supportingRuleIds:[]};
});
export const relativeCompletionQuestions:VerbNounQuestion[]=rows.map((r,i)=>{
 const e=relativeCompletionExamples[i],task=i%2===0?'structure' as const:'type' as const;
 return {id:e.id+'-'+task,lessonId:e.lessonId,exampleId:e.id,task,conceptId:task==='type'?e.lessonId==='subject_relatives'?'vn_subject_relatives_type':'vn_object_relatives_type':e.lessonId==='subject_relatives'?'vn_subject_relatives_structure':'vn_object_relatives_structure',exerciseType:task==='type'?'typed_participle':e.lessonId==='subject_relatives'?'subject_relative_structure':'object_relative_structure',prompt:`Intended message: ${e.meaning} ${task==='type'?'Complete the missing expression.':'Choose the form that completes the sentence.'}`,sentence:e.template,expected:e.answer,...(r.subject?{nominalSubject:r.subject,relativeForm:r.form}:{}),relativeTime:r.time,...(task==='structure'?{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:r.answer},...r.distractors.map((text,i)=>({id:`other-${i+1}`,text}))]}:{}),source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[]};
});
