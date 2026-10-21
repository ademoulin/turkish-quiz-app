import type {VerbNounExample} from './verbNouns';
import type {NominalSubject} from './verbNounSubjects';
/** Authored drafts, informed by Yeni Hitit 1 §11.1 p.133 and grammar support
 * p.171. Shared-subject, explicitly ordered affirmative examples only.
 * Not quotations; independent review and exact Ödkem mapping pending. */
export type ConverbTime='past'|'future'|'habitual';
export type ConverbSubject=NominalSubject;
export const converbSubjectForms:Record<ConverbSubject,string>={ben:'Ben',sen:'Sen',o:'O',biz:'Biz',siz:'Siz',onlar:'Onlar'};
export const converbIpExamples:VerbNounExample[]=[
 {
  "id": "vn11a-01",
  "lessonId": "converb_ip",
  "stem": "git",
  "verbMeaning": "go",
  "form": "converb_ip",
  "converbSubject": "ben",
  "converbTime": "past",
  "converbLead": "Ben dün",
  "converbClause": "eve gidip",
  "unit": "Ben dün eve gidip",
  "main": "sonra dinlendim",
  "sentence": "Ben dün eve gidip sonra dinlendim.",
  "template": "Ben dün eve ___ sonra dinlendim.",
  "answer": "gidip",
  "meaning": "I went home yesterday and then rested.",
  "distractors": [
   "You went home yesterday and then rested.",
   "I rested yesterday and then went home."
  ],
  "breakdown": "git → gid (stem softening) + ip (converb)",
  "structurePrompt": "Who went home and rested?",
  "structureAnswer": "I performed both actions; Ben and dinlendim identify the same actor.",
  "structureDistractors": [
   "I went home, but you rested.",
   "You performed both actions because -ip means you."
  ],
  "explanation": "Ben is the shared actor in this model. The converb links “eve gidip” to “sonra dinlendim”; sonra explicitly places the second action after the first. Dün and the supplied final verb give a past context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn11a-02",
  "lessonId": "converb_ip",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "converb_ip",
  "converbSubject": "ben",
  "converbTime": "future",
  "converbLead": "Ben yarın",
  "converbClause": "kitabı okuyup",
  "unit": "Ben yarın kitabı okuyup",
  "main": "sonra sana vereceğim",
  "sentence": "Ben yarın kitabı okuyup sonra sana vereceğim.",
  "template": "Ben yarın kitabı ___ sonra sana vereceğim.",
  "answer": "okuyup",
  "meaning": "I will read the book tomorrow and then give it to you.",
  "distractors": [
   "You will read the book tomorrow and then give it to me.",
   "I will give you the book tomorrow and then read it."
  ],
  "breakdown": "oku + y (buffer) + up (converb)",
  "structurePrompt": "Where are future time and first-person marking expressed?",
  "structureAnswer": "On the supplied final verb vereceğim; okuyup has no tense/person ending.",
  "structureDistractors": [
   "On -yup, which always means I will.",
   "On kitabı, because accusative marks future time."
  ],
  "explanation": "Ben is the shared actor in this model. The converb links “kitabı okuyup” to “sonra sana vereceğim”; sonra explicitly places the second action after the first. Yarın and the supplied final verb give a future context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11a-03",
  "lessonId": "converb_ip",
  "stem": "kalk",
  "verbMeaning": "get up",
  "form": "converb_ip",
  "converbSubject": "sen",
  "converbTime": "habitual",
  "converbLead": "Sen her sabah",
  "converbClause": "erken kalkıp",
  "unit": "Sen her sabah erken kalkıp",
  "main": "sonra kahve içiyorsun",
  "sentence": "Sen her sabah erken kalkıp sonra kahve içiyorsun.",
  "template": "Sen her sabah erken ___ sonra kahve içiyorsun.",
  "answer": "kalkıp",
  "meaning": "You get up early every morning and then drink coffee.",
  "distractors": [
   "I get up early every morning and then drink coffee.",
   "You drink coffee every morning and then get up."
  ],
  "breakdown": "kalk + ıp (converb)",
  "structurePrompt": "Does -ıp itself mean you perform a habitual action?",
  "structureAnswer": "No: her sabah gives the habit, and the final verb identifies you.",
  "structureDistractors": [
   "Yes: -ıp always means you do something every morning.",
   "No: it identifies a separate person who gets up."
  ],
  "explanation": "Sen is the shared actor in this model. The converb links “erken kalkıp” to “sonra kahve içiyorsun”; sonra explicitly places the second action after the first. The repeated-time phrase and supplied final verb give a habitual context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-04",
  "lessonId": "converb_ip",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "converb_ip",
  "converbSubject": "sen",
  "converbTime": "past",
  "converbLead": "Sen dün",
  "converbClause": "öğretmeni görüp",
  "unit": "Sen dün öğretmeni görüp",
  "main": "sonra selam verdin",
  "sentence": "Sen dün öğretmeni görüp sonra selam verdin.",
  "template": "Sen dün öğretmeni ___ sonra selam verdin.",
  "answer": "görüp",
  "meaning": "You saw the teacher yesterday and then said hello.",
  "distractors": [
   "I saw the teacher yesterday and then said hello.",
   "You said hello yesterday and then saw the teacher."
  ],
  "breakdown": "gör + üp (converb)",
  "structurePrompt": "Which action comes first in this sentence?",
  "structureAnswer": "Seeing the teacher comes before saying hello; sonra makes the order explicit.",
  "structureDistractors": [
   "Saying hello comes before seeing the teacher.",
   "There is no order because sonra means at the same time."
  ],
  "explanation": "Sen is the shared actor in this model. The converb links “öğretmeni görüp” to “sonra selam verdin”; sonra explicitly places the second action after the first. Dün and the supplied final verb give a past context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-05",
  "lessonId": "converb_ip",
  "stem": "dinle",
  "verbMeaning": "listen to",
  "form": "converb_ip",
  "converbSubject": "o",
  "converbTime": "future",
  "converbLead": "O yarın",
  "converbClause": "mesajı dinleyip",
  "unit": "O yarın mesajı dinleyip",
  "main": "sonra cevap yazacak",
  "sentence": "O yarın mesajı dinleyip sonra cevap yazacak.",
  "template": "O yarın mesajı ___ sonra cevap yazacak.",
  "answer": "dinleyip",
  "meaning": "He/she will listen to the message tomorrow and then write a reply.",
  "distractors": [
   "I will listen to the message tomorrow and then write a reply.",
   "He/she will write a reply tomorrow and then listen to the message."
  ],
  "breakdown": "dinle + y (buffer) + ip (converb)",
  "structurePrompt": "Which word carries the future marking for the linked actions here?",
  "structureAnswer": "Yazacak, the final verb; -ip only links the first action.",
  "structureDistractors": [
   "Dinleyip, because every -ip form is future.",
   "Mesajı, because the object supplies tense."
  ],
  "explanation": "O is the shared actor in this model. The converb links “mesajı dinleyip” to “sonra cevap yazacak”; sonra explicitly places the second action after the first. Yarın and the supplied final verb give a future context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11a-06",
  "lessonId": "converb_ip",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "converb_ip",
  "converbSubject": "o",
  "converbTime": "habitual",
  "converbLead": "O her akşam",
  "converbClause": "eve yürüyüp",
  "unit": "O her akşam eve yürüyüp",
  "main": "sonra dinleniyor",
  "sentence": "O her akşam eve yürüyüp sonra dinleniyor.",
  "template": "O her akşam eve ___ sonra dinleniyor.",
  "answer": "yürüyüp",
  "meaning": "He/she walks home every evening and then rests.",
  "distractors": [
   "We walk home every evening and then rest.",
   "He/she rests every evening and then walks home."
  ],
  "breakdown": "yürü + y (buffer) + üp (converb)",
  "structurePrompt": "Who walks home and rests?",
  "structureAnswer": "O, the same person, performs both actions in this example.",
  "structureDistractors": [
   "O walks home, but the speaker rests.",
   "The person walking must be plural because yürüyüp contains two y letters."
  ],
  "explanation": "O is the shared actor in this model. The converb links “eve yürüyüp” to “sonra dinleniyor”; sonra explicitly places the second action after the first. The repeated-time phrase and supplied final verb give a habitual context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11a-07",
  "lessonId": "converb_ip",
  "stem": "otur",
  "verbMeaning": "sit down",
  "form": "converb_ip",
  "converbSubject": "biz",
  "converbTime": "past",
  "converbLead": "Biz dün",
  "converbClause": "masaya oturup",
  "unit": "Biz dün masaya oturup",
  "main": "sonra yemek yedik",
  "sentence": "Biz dün masaya oturup sonra yemek yedik.",
  "template": "Biz dün masaya ___ sonra yemek yedik.",
  "answer": "oturup",
  "meaning": "We sat down at the table yesterday and then ate.",
  "distractors": [
   "They sat down at the table yesterday and then ate.",
   "We ate yesterday and then sat down at the table."
  ],
  "breakdown": "otur + up (converb)",
  "structurePrompt": "What sequence is stated here?",
  "structureAnswer": "We sat down first, then ate; both actions belong to us.",
  "structureDistractors": [
   "We ate first, then sat down.",
   "We sat down, but they ate."
  ],
  "explanation": "Biz is the shared actor in this model. The converb links “masaya oturup” to “sonra yemek yedik”; sonra explicitly places the second action after the first. Dün and the supplied final verb give a past context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-08",
  "lessonId": "converb_ip",
  "stem": "aç",
  "verbMeaning": "open",
  "form": "converb_ip",
  "converbSubject": "biz",
  "converbTime": "future",
  "converbLead": "Biz yarın",
  "converbClause": "kapıyı açıp",
  "unit": "Biz yarın kapıyı açıp",
  "main": "sonra içeri gireceğiz",
  "sentence": "Biz yarın kapıyı açıp sonra içeri gireceğiz.",
  "template": "Biz yarın kapıyı ___ sonra içeri gireceğiz.",
  "answer": "açıp",
  "meaning": "We will open the door tomorrow and then go inside.",
  "distractors": [
   "You will open the door tomorrow and then go inside.",
   "We will go inside tomorrow and then open the door."
  ],
  "breakdown": "aç + ıp (converb)",
  "structurePrompt": "Why is the missing word açıp rather than a finite past form?",
  "structureAnswer": "It links opening to the supplied final verb, which carries future time and we agreement.",
  "structureDistractors": [
   "Each linked action must have its own past-tense ending.",
   "The door is the subject, so açıp agrees with it."
  ],
  "explanation": "Biz is the shared actor in this model. The converb links “kapıyı açıp” to “sonra içeri gireceğiz”; sonra explicitly places the second action after the first. Yarın and the supplied final verb give a future context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-09",
  "lessonId": "converb_ip",
  "stem": "iç",
  "verbMeaning": "drink",
  "form": "converb_ip",
  "converbSubject": "siz",
  "converbTime": "habitual",
  "converbLead": "Siz her sabah",
  "converbClause": "kahve içip",
  "unit": "Siz her sabah kahve içip",
  "main": "sonra işe gidiyorsunuz",
  "sentence": "Siz her sabah kahve içip sonra işe gidiyorsunuz.",
  "template": "Siz her sabah kahve ___ sonra işe gidiyorsunuz.",
  "answer": "içip",
  "meaning": "You drink coffee every morning and then go to work.",
  "distractors": [
   "I drink coffee every morning and then go to work.",
   "You go to work every morning and then drink coffee."
  ],
  "breakdown": "iç + ip (converb)",
  "structurePrompt": "What does içip do here?",
  "structureAnswer": "It links drinking coffee to going to work; it does not name an action noun.",
  "structureDistractors": [
   "It turns coffee into the person who goes to work.",
   "It adds first-person possession to an action noun."
  ],
  "explanation": "Siz is the shared actor in this model. The converb links “kahve içip” to “sonra işe gidiyorsunuz”; sonra explicitly places the second action after the first. The repeated-time phrase and supplied final verb give a habitual context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-10",
  "lessonId": "converb_ip",
  "stem": "yıka",
  "verbMeaning": "wash",
  "form": "converb_ip",
  "converbSubject": "siz",
  "converbTime": "past",
  "converbLead": "Siz dün",
  "converbClause": "ellerinizi yıkayıp",
  "unit": "Siz dün ellerinizi yıkayıp",
  "main": "sonra sofraya oturdunuz",
  "sentence": "Siz dün ellerinizi yıkayıp sonra sofraya oturdunuz.",
  "template": "Siz dün ellerinizi ___ sonra sofraya oturdunuz.",
  "answer": "yıkayıp",
  "meaning": "You washed your hands yesterday and then sat down at the table.",
  "distractors": [
   "We washed our hands yesterday and then sat down at the table.",
   "You sat down at the table yesterday and then washed your hands."
  ],
  "breakdown": "yıka + y (buffer) + ıp (converb)",
  "structurePrompt": "Why is y added in yıkayıp?",
  "structureAnswer": "It separates vowel-final yıka from vowel-initial -ıp.",
  "structureDistractors": [
   "It identifies the actor as I.",
   "It marks the washing as future."
  ],
  "explanation": "Siz is the shared actor in this model. The converb links “ellerinizi yıkayıp” to “sonra sofraya oturdunuz”; sonra explicitly places the second action after the first. Dün and the supplied final verb give a past context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11a-11",
  "lessonId": "converb_ip",
  "stem": "bul",
  "verbMeaning": "find",
  "form": "converb_ip",
  "converbSubject": "onlar",
  "converbTime": "future",
  "converbLead": "Onlar yarın",
  "converbClause": "adresi bulup",
  "unit": "Onlar yarın adresi bulup",
  "main": "sonra bize haber verecekler",
  "sentence": "Onlar yarın adresi bulup sonra bize haber verecekler.",
  "template": "Onlar yarın adresi ___ sonra bize haber verecekler.",
  "answer": "bulup",
  "meaning": "They will find the address tomorrow and then let us know.",
  "distractors": [
   "We will find the address tomorrow and then let them know.",
   "They will let us know tomorrow and then find the address."
  ],
  "breakdown": "bul + up (converb)",
  "structurePrompt": "Where is plural actor agreement expressed?",
  "structureAnswer": "On the final verb verecekler; bulup stays unchanged for the shared actor.",
  "structureDistractors": [
   "On -up, which always means they.",
   "On adresi, which is the subject of both actions."
  ],
  "explanation": "Onlar is the shared actor in this model. The converb links “adresi bulup” to “sonra bize haber verecekler”; sonra explicitly places the second action after the first. Yarın and the supplied final verb give a future context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11a-12",
  "lessonId": "converb_ip",
  "stem": "düşün",
  "verbMeaning": "think",
  "form": "converb_ip",
  "converbSubject": "onlar",
  "converbTime": "habitual",
  "converbLead": "Onlar her toplantıda önce",
  "converbClause": "düşünüp",
  "unit": "Onlar her toplantıda önce düşünüp",
  "main": "sonra karar veriyorlar",
  "sentence": "Onlar her toplantıda önce düşünüp sonra karar veriyorlar.",
  "template": "Onlar her toplantıda önce ___ sonra karar veriyorlar.",
  "answer": "düşünüp",
  "meaning": "At every meeting they first think and then make a decision.",
  "distractors": [
   "At every meeting we first think and then make a decision.",
   "At every meeting they first make a decision and then think."
  ],
  "breakdown": "düşün + üp (converb)",
  "structurePrompt": "What does the sentence say about the action sequence?",
  "structureAnswer": "They think first, then decide; önce and sonra make that order explicit.",
  "structureDistractors": [
   "They decide first, then think.",
   "One group thinks while a different group decides."
  ],
  "explanation": "Onlar is the shared actor in this model. The converb links “düşünüp” to “sonra karar veriyorlar”; sonra explicitly places the second action after the first. The repeated-time phrase and supplied final verb give a habitual context. The -ip form itself has no tense or person agreement. These are guided shared-subject sequences, not a rule that every -ip sentence must express strict sequence.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 }
];
