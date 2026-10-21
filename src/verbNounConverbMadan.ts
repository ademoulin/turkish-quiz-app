import type {VerbNounExample} from './verbNouns';
/** Newly authored shared-subject without-doing drafts, informed by supplied
 * Yeni Hitit 1 §11.1 p.133 and grammar support p.171. Not quotations.
 * Independent linguistic review and exact Ödkem mapping pending. */
export const converbMadanExamples:VerbNounExample[]=[
 {
  "id": "vn11c-01",
  "lessonId": "converb_madan",
  "stem": "bak",
  "verbMeaning": "look",
  "form": "converb_madan",
  "converbSubject": "ben",
  "converbTime": "past",
  "converbLead": "Ben dün",
  "converbClause": "ekrana bakmadan",
  "unit": "Ben dün ekrana bakmadan",
  "main": "cevap verdim",
  "sentence": "Ben dün ekrana bakmadan cevap verdim.",
  "template": "Ben dün ekrana ___ cevap verdim.",
  "answer": "bakmadan",
  "meaning": "I answered yesterday without looking at the screen.",
  "distractors": [
   "I looked at the screen yesterday but did not answer.",
   "You answered yesterday without looking at the screen."
  ],
  "breakdown": "bak + madan (without-doing converb)",
  "structurePrompt": "Which action was left undone when I answered?",
  "structureAnswer": "Looking at the screen was left undone; I did answer.",
  "structureDistractors": [
   "Answering was left undone; I looked at the screen.",
   "Both looking and answering were left undone."
  ],
  "explanation": "“ekrana bakmadan” is the action chunk left undone when the main action takes place. Ben is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its past context. Use bak + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-02",
  "lessonId": "converb_madan",
  "stem": "dinle",
  "verbMeaning": "listen",
  "form": "converb_madan",
  "converbSubject": "ben",
  "converbTime": "future",
  "converbLead": "Ben yarın",
  "converbClause": "ses kaydını dinlemeden",
  "unit": "Ben yarın ses kaydını dinlemeden",
  "main": "metni okuyacağım",
  "sentence": "Ben yarın ses kaydını dinlemeden metni okuyacağım.",
  "template": "Ben yarın ses kaydını ___ metni okuyacağım.",
  "answer": "dinlemeden",
  "meaning": "I will read the text tomorrow without listening to the audio recording.",
  "distractors": [
   "I will listen to the audio recording tomorrow without reading the text.",
   "You will read the text tomorrow without listening to the audio recording."
  ],
  "breakdown": "dinle + meden (without-doing converb)",
  "structurePrompt": "Where do future time and I agreement come from?",
  "structureAnswer": "Yarın and okuyacağım supply the future context and I agreement; dinlemeden leaves listening undone at that point.",
  "structureDistractors": [
   "-meden is the first-person future ending.",
   "Dinlemeden has possessive agreement with the recording."
  ],
  "explanation": "“ses kaydını dinlemeden” is the action chunk left undone when the main action takes place. Ben is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its future context. Use dinle + meden, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-03",
  "lessonId": "converb_madan",
  "stem": "yap",
  "verbMeaning": "do (kahvaltı yap: have breakfast)",
  "form": "converb_madan",
  "converbSubject": "sen",
  "converbTime": "habitual",
  "converbLead": "Sen her sabah",
  "converbClause": "kahvaltı yapmadan",
  "unit": "Sen her sabah kahvaltı yapmadan",
  "main": "evden çıkıyorsun",
  "sentence": "Sen her sabah kahvaltı yapmadan evden çıkıyorsun.",
  "template": "Sen her sabah kahvaltı ___ evden çıkıyorsun.",
  "answer": "yapmadan",
  "meaning": "You leave home every morning without having breakfast.",
  "distractors": [
   "You have breakfast every morning but do not leave home.",
   "I leave home every morning without having breakfast."
  ],
  "breakdown": "yap + madan (without-doing converb)",
  "structurePrompt": "Who leaves home and skips breakfast in this model?",
  "structureAnswer": "Sen is the shared actor: you leave home without having breakfast beforehand.",
  "structureDistractors": [
   "I skip breakfast, but you leave home.",
   "The -madan ending identifies a third-person actor."
  ],
  "explanation": "“kahvaltı yapmadan” is the action chunk left undone when the main action takes place. Sen is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its habitual context. Use yap + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-04",
  "lessonId": "converb_madan",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "converb_madan",
  "converbSubject": "sen",
  "converbTime": "past",
  "converbLead": "Sen dün",
  "converbClause": "menüyü okumadan",
  "unit": "Sen dün menüyü okumadan",
  "main": "yemek sipariş ettin",
  "sentence": "Sen dün menüyü okumadan yemek sipariş ettin.",
  "template": "Sen dün menüyü ___ yemek sipariş ettin.",
  "answer": "okumadan",
  "meaning": "You ordered food yesterday without reading the menu.",
  "distractors": [
   "You read the menu yesterday but did not order food.",
   "I ordered food yesterday without reading the menu."
  ],
  "breakdown": "oku + madan (without-doing converb)",
  "structurePrompt": "Does oku need buffer y before -madan?",
  "structureAnswer": "No. -madan starts with m, so oku + madan gives okumadan.",
  "structureDistractors": [
   "Yes. Oku ends in a vowel, so write okuymadan.",
   "Yes. Add accusative yı before the converb ending."
  ],
  "explanation": "“menüyü okumadan” is the action chunk left undone when the main action takes place. Sen is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its past context. Use oku + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-05",
  "lessonId": "converb_madan",
  "stem": "git",
  "verbMeaning": "go",
  "form": "converb_madan",
  "converbSubject": "o",
  "converbTime": "future",
  "converbLead": "O yarın",
  "converbClause": "mağazaya gitmeden",
  "unit": "O yarın mağazaya gitmeden",
  "main": "internetten alışveriş yapacak",
  "sentence": "O yarın mağazaya gitmeden internetten alışveriş yapacak.",
  "template": "O yarın mağazaya ___ internetten alışveriş yapacak.",
  "answer": "gitmeden",
  "meaning": "They will shop online tomorrow without going to the shop.",
  "distractors": [
   "They will go to the shop tomorrow without shopping online.",
   "I will shop online tomorrow without going to the shop."
  ],
  "breakdown": "git + meden (without-doing converb)",
  "structurePrompt": "Why is the target gitmeden, with t?",
  "structureAnswer": "The ending starts with m, so git keeps its final t: git + meden.",
  "structureDistractors": [
   "Git always changes to gid before any suffix.",
   "-meden is an ablative ending that forces t to become d."
  ],
  "explanation": "“mağazaya gitmeden” is the action chunk left undone when the main action takes place. O is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its future context. Use git + meden, without buffer y, an extra negative suffix or person agreement. The stem keeps t before m.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-06",
  "lessonId": "converb_madan",
  "stem": "düşün",
  "verbMeaning": "think",
  "form": "converb_madan",
  "converbSubject": "o",
  "converbTime": "habitual",
  "converbLead": "O her toplantıda",
  "converbClause": "düşünmeden",
  "unit": "O her toplantıda düşünmeden",
  "main": "konuşuyor",
  "sentence": "O her toplantıda düşünmeden konuşuyor.",
  "template": "O her toplantıda ___ konuşuyor.",
  "answer": "düşünmeden",
  "meaning": "They speak at every meeting without thinking.",
  "distractors": [
   "They think at every meeting but do not speak.",
   "You speak at every meeting without thinking."
  ],
  "breakdown": "düşün + meden (without-doing converb)",
  "structurePrompt": "Is the main speaking action negative here?",
  "structureAnswer": "No. Konuşuyor is affirmative; düşünmeden leaves thinking undone in this model.",
  "structureDistractors": [
   "Yes. -meden negates konuşuyor.",
   "Yes. Both verbs must be negative whenever -meden appears."
  ],
  "explanation": "“düşünmeden” is the action chunk left undone when the main action takes place. O is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its habitual context. Use düşün + meden, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-07",
  "lessonId": "converb_madan",
  "stem": "sor",
  "verbMeaning": "ask",
  "form": "converb_madan",
  "converbSubject": "biz",
  "converbTime": "past",
  "converbLead": "Biz dün",
  "converbClause": "kimseye sormadan",
  "unit": "Biz dün kimseye sormadan",
  "main": "karar verdik",
  "sentence": "Biz dün kimseye sormadan karar verdik.",
  "template": "Biz dün kimseye ___ karar verdik.",
  "answer": "sormadan",
  "meaning": "We decided yesterday without asking anyone.",
  "distractors": [
   "We asked someone yesterday but did not decide.",
   "They decided yesterday without asking anyone."
  ],
  "breakdown": "sor + madan (without-doing converb)",
  "structurePrompt": "Who made the decision without consulting anyone?",
  "structureAnswer": "Biz identifies us as the shared actor; verdik also carries we agreement.",
  "structureDistractors": [
   "We asked someone, but they made the decision.",
   "Kimseye is the person who made the decision."
  ],
  "explanation": "“kimseye sormadan” is the action chunk left undone when the main action takes place. Biz is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its past context. Use sor + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-08",
  "lessonId": "converb_madan",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "converb_madan",
  "converbSubject": "biz",
  "converbTime": "future",
  "converbLead": "Biz yarın",
  "converbClause": "evi görmeden",
  "unit": "Biz yarın evi görmeden",
  "main": "kira sözleşmesini imzalayacağız",
  "sentence": "Biz yarın evi görmeden kira sözleşmesini imzalayacağız.",
  "template": "Biz yarın evi ___ kira sözleşmesini imzalayacağız.",
  "answer": "görmeden",
  "meaning": "We will sign the rental agreement tomorrow without seeing the house.",
  "distractors": [
   "We will see the house tomorrow without signing the rental agreement.",
   "You will sign the rental agreement tomorrow without seeing the house."
  ],
  "breakdown": "gör + meden (without-doing converb)",
  "structurePrompt": "Does görmeden itself carry we agreement or future tense?",
  "structureAnswer": "No. The supplied imzalayacağız carries future time and we agreement; görmeden leaves seeing undone at signing.",
  "structureDistractors": [
   "Yes. -meden means we will.",
   "Yes. Add possessive -ümüz to görmeden to mark we."
  ],
  "explanation": "“evi görmeden” is the action chunk left undone when the main action takes place. Biz is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its future context. Use gör + meden, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-09",
  "lessonId": "converb_madan",
  "stem": "aç",
  "verbMeaning": "open",
  "form": "converb_madan",
  "converbSubject": "siz",
  "converbTime": "habitual",
  "converbLead": "Siz her derste",
  "converbClause": "kitabı açmadan",
  "unit": "Siz her derste kitabı açmadan",
  "main": "soruları cevaplıyorsunuz",
  "sentence": "Siz her derste kitabı açmadan soruları cevaplıyorsunuz.",
  "template": "Siz her derste kitabı ___ soruları cevaplıyorsunuz.",
  "answer": "açmadan",
  "meaning": "You answer the questions in every lesson without opening the book.",
  "distractors": [
   "You open the book in every lesson but do not answer the questions.",
   "We answer the questions in every lesson without opening the book."
  ],
  "breakdown": "aç + madan (without-doing converb)",
  "structurePrompt": "Why does aç take -madan here?",
  "structureAnswer": "The back vowel a selects -madan; the whole ending means without doing in this model.",
  "structureDistractors": [
   "A voiceless ç requires -matan instead.",
   "-madan is an outer ablative attached to an action noun açma."
  ],
  "explanation": "“kitabı açmadan” is the action chunk left undone when the main action takes place. Siz is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its habitual context. Use aç + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-10",
  "lessonId": "converb_madan",
  "stem": "bekle",
  "verbMeaning": "wait",
  "form": "converb_madan",
  "converbSubject": "siz",
  "converbTime": "past",
  "converbLead": "Siz dün",
  "converbClause": "yanıt beklemeden",
  "unit": "Siz dün yanıt beklemeden",
  "main": "toplantıyı başlattınız",
  "sentence": "Siz dün yanıt beklemeden toplantıyı başlattınız.",
  "template": "Siz dün yanıt ___ toplantıyı başlattınız.",
  "answer": "beklemeden",
  "meaning": "You started the meeting yesterday without waiting for a reply.",
  "distractors": [
   "You waited for a reply yesterday but did not start the meeting.",
   "We started the meeting yesterday without waiting for a reply."
  ],
  "breakdown": "bekle + meden (without-doing converb)",
  "structurePrompt": "How is beklemeden built?",
  "structureAnswer": "Bekle + meden. The stem ends in a front vowel; no buffer y or extra negative suffix is needed.",
  "structureDistractors": [
   "Bekle + y + meden, because every vowel-final stem needs y.",
   "Bekle + me + meden, because without requires two negative endings."
  ],
  "explanation": "“yanıt beklemeden” is the action chunk left undone when the main action takes place. Siz is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its past context. Use bekle + meden, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-11",
  "lessonId": "converb_madan",
  "stem": "et",
  "verbMeaning": "do (kontrol et: check)",
  "form": "converb_madan",
  "converbSubject": "onlar",
  "converbTime": "future",
  "converbLead": "Onlar yarın",
  "converbClause": "sonuçları kontrol etmeden",
  "unit": "Onlar yarın sonuçları kontrol etmeden",
  "main": "raporu gönderecekler",
  "sentence": "Onlar yarın sonuçları kontrol etmeden raporu gönderecekler.",
  "template": "Onlar yarın sonuçları kontrol ___ raporu gönderecekler.",
  "answer": "etmeden",
  "meaning": "They will send the report tomorrow without checking the results.",
  "distractors": [
   "They will check the results tomorrow without sending the report.",
   "We will send the report tomorrow without checking the results."
  ],
  "breakdown": "et + meden (without-doing converb)",
  "structurePrompt": "Which action will happen, and where is plural agreement?",
  "structureAnswer": "Sending will happen in the stated plan; gönderecekler carries plural agreement. Checking is left undone before sending.",
  "structureDistractors": [
   "Checking will happen; -meden supplies plural agreement.",
   "Neither action will happen because -meden negates the whole sentence."
  ],
  "explanation": "“sonuçları kontrol etmeden” is the action chunk left undone when the main action takes place. Onlar is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its future context. Use et + meden, without buffer y, an extra negative suffix or person agreement. The stem keeps t before m.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11c-12",
  "lessonId": "converb_madan",
  "stem": "kullan",
  "verbMeaning": "use",
  "form": "converb_madan",
  "converbSubject": "onlar",
  "converbTime": "habitual",
  "converbLead": "Onlar her hafta",
  "converbClause": "sözlük kullanmadan",
  "unit": "Onlar her hafta sözlük kullanmadan",
  "main": "Türkçe metinler okuyorlar",
  "sentence": "Onlar her hafta sözlük kullanmadan Türkçe metinler okuyorlar.",
  "template": "Onlar her hafta sözlük ___ Türkçe metinler okuyorlar.",
  "answer": "kullanmadan",
  "meaning": "They read Turkish texts every week without using a dictionary.",
  "distractors": [
   "They use a dictionary every week but do not read Turkish texts.",
   "We read Turkish texts every week without using a dictionary."
  ],
  "breakdown": "kullan + madan (without-doing converb)",
  "structurePrompt": "What does sözlük kullanmadan tell us here?",
  "structureAnswer": "It describes reading without dictionary use; -madan itself does not mean they never use a dictionary in any context.",
  "structureDistractors": [
   "It claims they have never used a dictionary in their lives.",
   "It identifies a dictionary as the actor doing the reading."
  ],
  "explanation": "“sözlük kullanmadan” is the action chunk left undone when the main action takes place. Onlar is the shared actor. The main action is affirmative; the supplied final verb and time phrase give its habitual context. Use kullan + madan, without buffer y, an extra negative suffix or person agreement.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 }
];
