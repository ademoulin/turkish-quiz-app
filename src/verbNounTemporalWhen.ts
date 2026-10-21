import type {VerbNounExample} from './verbNouns';
/** Authored drafts informed by supplied Yeni Hitit 2 §9.2 p.107,
 * including its same/different subject and ongoing-main-action examples.
 * Not quotations; independent review and exact Ödkem mapping pending. */
export const temporalWhenExamples:VerbNounExample[]=[
 {
  "id": "vn11e-01",
  "lessonId": "temporal_when",
  "stem": "gül",
  "verbMeaning": "smile",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "ben",
  "mainSubject": "ben",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "ben gülünce",
  "unit": "Dün ben gülünce",
  "main": "kendimi daha iyi hissettim",
  "sentence": "Dün ben gülünce kendimi daha iyi hissettim.",
  "template": "Dün ben ___ kendimi daha iyi hissettim.",
  "answer": "gülünce",
  "meaning": "I felt better yesterday when I smiled.",
  "distractors": [
   "I felt better yesterday before I smiled.",
   "You felt better yesterday when I smiled."
  ],
  "breakdown": "gül + ünce (when/once converb)",
  "structurePrompt": "Who smiled and who felt better?",
  "structureAnswer": "Ben identifies me as smiling, and hissettim identifies me as feeling better.",
  "structureDistractors": [
   "I smiled, but you felt better.",
   "The -ünce ending means you."
  ],
  "explanation": "“ben gülünce” establishes when the supplied main action or response happens in this model. Time-clause actor: ben; main-clause actor: ben. The actors are the same. The time phrase and finite main verb supply the past context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-02",
  "lessonId": "temporal_when",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "ben",
  "mainSubject": "sen",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "ben adresi okuyunca",
  "unit": "Yarın ben adresi okuyunca",
  "main": "sen adresi haritada işaretleyeceksin",
  "sentence": "Yarın ben adresi okuyunca sen adresi haritada işaretleyeceksin.",
  "template": "Yarın ben adresi ___ sen adresi haritada işaretleyeceksin.",
  "answer": "okuyunca",
  "meaning": "Tomorrow, when I read the address, you will mark it on the map.",
  "distractors": [
   "Tomorrow, before I read the address, you will mark it on the map.",
   "Tomorrow, when you read the address, I will mark it on the map."
  ],
  "breakdown": "oku + y (buffer) + unca (when/once converb)",
  "structurePrompt": "Where does the future context come from?",
  "structureAnswer": "Yarın and işaretleyeceksin give the future context; okuyunca does not carry future tense or person agreement.",
  "structureDistractors": [
   "-yunca is the first-person future ending.",
   "Okuyunca reports a past reading because every converb is past."
  ],
  "explanation": "“ben adresi okuyunca” establishes when the supplied main action or response happens in this model. Time-clause actor: ben; main-clause actor: sen. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the future context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11e-03",
  "lessonId": "temporal_when",
  "stem": "başla",
  "verbMeaning": "begin",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "sen",
  "mainSubject": "o",
  "temporalTime": "habitual",
  "converbLead": "Her derste",
  "converbClause": "sen konuşmaya başlayınca",
  "unit": "Her derste sen konuşmaya başlayınca",
  "main": "o not alıyor",
  "sentence": "Her derste sen konuşmaya başlayınca o not alıyor.",
  "template": "Her derste sen konuşmaya ___ o not alıyor.",
  "answer": "başlayınca",
  "meaning": "In every lesson, they take notes when you begin speaking.",
  "distractors": [
   "In every lesson, they take notes before you begin speaking.",
   "In every lesson, you take notes when they begin speaking."
  ],
  "breakdown": "başla + y (buffer) + ınca (when/once converb)",
  "structurePrompt": "Who begins speaking, and who takes notes?",
  "structureAnswer": "Sen begins speaking; O takes notes at that point.",
  "structureDistractors": [
   "O begins speaking; Sen takes notes.",
   "Sen must do both actions because -ınca requires one shared actor."
  ],
  "explanation": "“sen konuşmaya başlayınca” establishes when the supplied main action or response happens in this model. Time-clause actor: sen; main-clause actor: o. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the habitual context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11e-04",
  "lessonId": "temporal_when",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "sen",
  "mainSubject": "sen",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "sen eve gelince",
  "unit": "Dün sen eve gelince",
  "main": "dinlendin",
  "sentence": "Dün sen eve gelince dinlendin.",
  "template": "Dün sen eve ___ dinlendin.",
  "answer": "gelince",
  "meaning": "You rested yesterday when you got home.",
  "distractors": [
   "You rested yesterday before you got home.",
   "I rested yesterday when you got home."
  ],
  "breakdown": "gel + ince (when/once converb)",
  "structurePrompt": "Does gelince contain possessive agreement for you?",
  "structureAnswer": "No. Sen supplies the time-clause actor; dinlendin carries finite you agreement.",
  "structureDistractors": [
   "Yes. -ince is a second-person possessive ending.",
   "No. Add -n to gelince to make it agree with Sen."
  ],
  "explanation": "“sen eve gelince” establishes when the supplied main action or response happens in this model. Time-clause actor: sen; main-clause actor: sen. The actors are the same. The time phrase and finite main verb supply the past context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-05",
  "lessonId": "temporal_when",
  "stem": "dinle",
  "verbMeaning": "listen",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "o",
  "mainSubject": "o",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "o kaydı dinleyince",
  "unit": "Yarın o kaydı dinleyince",
  "main": "soruyu cevaplayacak",
  "sentence": "Yarın o kaydı dinleyince soruyu cevaplayacak.",
  "template": "Yarın o kaydı ___ soruyu cevaplayacak.",
  "answer": "dinleyince",
  "meaning": "Tomorrow, they will answer the question once they listen to the recording.",
  "distractors": [
   "Tomorrow, they will answer the question before listening to the recording.",
   "Tomorrow, I will answer the question once they listen to the recording."
  ],
  "breakdown": "dinle + y (buffer) + ince (when/once converb)",
  "structurePrompt": "Why is there y in dinleyince?",
  "structureAnswer": "Dinle ends in a vowel; buffer y joins it to -ince.",
  "structureDistractors": [
   "Y marks third-person agreement.",
   "Y is an accusative ending on a noun clause."
  ],
  "explanation": "“o kaydı dinleyince” establishes when the supplied main action or response happens in this model. Time-clause actor: o; main-clause actor: o. The actors are the same. The time phrase and finite main verb supply the future context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11e-06",
  "lessonId": "temporal_when",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "o",
  "mainSubject": "biz",
  "temporalTime": "habitual",
  "converbLead": "Her sabah",
  "converbClause": "o hızlı yürüyünce",
  "unit": "Her sabah o hızlı yürüyünce",
  "main": "biz de hızlanıyoruz",
  "sentence": "Her sabah o hızlı yürüyünce biz de hızlanıyoruz.",
  "template": "Her sabah o hızlı ___ biz de hızlanıyoruz.",
  "answer": "yürüyünce",
  "meaning": "Every morning, we speed up too when they walk fast.",
  "distractors": [
   "Every morning, we speed up before they walk fast.",
   "Every morning, they speed up when we walk fast."
  ],
  "breakdown": "yürü + y (buffer) + ünce (when/once converb)",
  "structurePrompt": "Are the grammatical subjects the same?",
  "structureAnswer": "No. O walks fast; Biz speed up too when that happens.",
  "structureDistractors": [
   "Yes. -yünce is a we ending.",
   "No. Biz walks fast and O speeds up."
  ],
  "explanation": "“o hızlı yürüyünce” establishes when the supplied main action or response happens in this model. Time-clause actor: o; main-clause actor: biz. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the habitual context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11e-07",
  "lessonId": "temporal_when",
  "stem": "bul",
  "verbMeaning": "find",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "biz",
  "mainSubject": "siz",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "biz anahtarı bulunca",
  "unit": "Dün biz anahtarı bulunca",
  "main": "siz kapıyı açtınız",
  "sentence": "Dün biz anahtarı bulunca siz kapıyı açtınız.",
  "template": "Dün biz anahtarı ___ siz kapıyı açtınız.",
  "answer": "bulunca",
  "meaning": "Yesterday, you opened the door when we found the key.",
  "distractors": [
   "Yesterday, you opened the door before we found the key.",
   "Yesterday, we opened the door when you found the key."
  ],
  "breakdown": "bul + unca (when/once converb)",
  "structurePrompt": "Which event is the time reference for opening the door?",
  "structureAnswer": "Our finding the key is the time reference; Siz then opened the door in this model.",
  "structureDistractors": [
   "Your finding the key is the time reference; Biz opened the door.",
   "Our finding the key happened only after you had opened the door."
  ],
  "explanation": "“biz anahtarı bulunca” establishes when the supplied main action or response happens in this model. Time-clause actor: biz; main-clause actor: siz. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the past context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-08",
  "lessonId": "temporal_when",
  "stem": "kalk",
  "verbMeaning": "get up",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "biz",
  "mainSubject": "biz",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "biz erken kalkınca",
  "unit": "Yarın biz erken kalkınca",
  "main": "kahvaltı hazırlayacağız",
  "sentence": "Yarın biz erken kalkınca kahvaltı hazırlayacağız.",
  "template": "Yarın biz erken ___ kahvaltı hazırlayacağız.",
  "answer": "kalkınca",
  "meaning": "Tomorrow, we will prepare breakfast when we get up early.",
  "distractors": [
   "Tomorrow, we will prepare breakfast before we get up.",
   "Tomorrow, you will prepare breakfast when we get up early."
  ],
  "breakdown": "kalk + ınca (when/once converb)",
  "structurePrompt": "Does kalkınca have a t/c change after k?",
  "structureAnswer": "No. Use kalk + ınca. The ending starts with a vowel and keeps its nc sequence.",
  "structureDistractors": [
   "Yes. Write kalkınça because k is voiceless.",
   "Yes. Write kalktınca because every converb after k needs t."
  ],
  "explanation": "“biz erken kalkınca” establishes when the supplied main action or response happens in this model. Time-clause actor: biz; main-clause actor: biz. The actors are the same. The time phrase and finite main verb supply the future context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-09",
  "lessonId": "temporal_when",
  "stem": "git",
  "verbMeaning": "go",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "siz",
  "mainSubject": "siz",
  "temporalTime": "habitual",
  "converbLead": "Her hafta",
  "converbClause": "siz pazara gidince",
  "unit": "Her hafta siz pazara gidince",
  "main": "meyve alıyorsunuz",
  "sentence": "Her hafta siz pazara gidince meyve alıyorsunuz.",
  "template": "Her hafta siz pazara ___ meyve alıyorsunuz.",
  "answer": "gidince",
  "meaning": "Every week, you buy fruit when you go to the market.",
  "distractors": [
   "Every week, you buy fruit before you go to the market.",
   "Every week, we buy fruit when you go to the market."
  ],
  "breakdown": "git → gid (stem softening) + ince (when/once converb)",
  "structurePrompt": "Why does the form use gid-?",
  "structureAnswer": "Git softens to gid before the vowel-initial -ince: gidince.",
  "structureDistractors": [
   "All t-final verbs always change t to d before every suffix.",
   "The d in gidince marks past tense."
  ],
  "explanation": "“siz pazara gidince” establishes when the supplied main action or response happens in this model. Time-clause actor: siz; main-clause actor: siz. The actors are the same. The time phrase and finite main verb supply the habitual context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn11e-10",
  "lessonId": "temporal_when",
  "stem": "konuş",
  "verbMeaning": "speak",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "siz",
  "mainSubject": "onlar",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "siz Türkçe konuşunca",
  "unit": "Dün siz Türkçe konuşunca",
  "main": "onlar sizi anladılar",
  "sentence": "Dün siz Türkçe konuşunca onlar sizi anladılar.",
  "template": "Dün siz Türkçe ___ onlar sizi anladılar.",
  "answer": "konuşunca",
  "meaning": "Yesterday, they understood you when you spoke Turkish.",
  "distractors": [
   "Yesterday, they understood you before you spoke Turkish.",
   "Yesterday, you understood them when they spoke Turkish."
  ],
  "breakdown": "konuş + unca (when/once converb)",
  "structurePrompt": "Who spoke and who understood?",
  "structureAnswer": "Siz spoke Turkish; Onlar understood you.",
  "structureDistractors": [
   "Onlar spoke Turkish; Siz understood them.",
   "Siz performed both actions because the time clause has no subject."
  ],
  "explanation": "“siz Türkçe konuşunca” establishes when the supplied main action or response happens in this model. Time-clause actor: siz; main-clause actor: onlar. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the past context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-11",
  "lessonId": "temporal_when",
  "stem": "aç",
  "verbMeaning": "open",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "onlar",
  "mainSubject": "ben",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "onlar kapıyı açınca",
  "unit": "Yarın onlar kapıyı açınca",
  "main": "ben içeri gireceğim",
  "sentence": "Yarın onlar kapıyı açınca ben içeri gireceğim.",
  "template": "Yarın onlar kapıyı ___ ben içeri gireceğim.",
  "answer": "açınca",
  "meaning": "Tomorrow, I will go inside when they open the door.",
  "distractors": [
   "Tomorrow, I will go inside before they open the door.",
   "Tomorrow, they will go inside when I open the door."
  ],
  "breakdown": "aç + ınca (when/once converb)",
  "structurePrompt": "Does açınca need plural agreement with Onlar?",
  "structureAnswer": "No. Onlar names the opening actor; Ben and gireceğim identify me as going inside.",
  "structureDistractors": [
   "Yes. Add -lar to açınca to agree with Onlar.",
   "No. Onlar is the subject of gireceğim, so both actors are plural."
  ],
  "explanation": "“onlar kapıyı açınca” establishes when the supplied main action or response happens in this model. Time-clause actor: onlar; main-clause actor: ben. The explicit subjects name different grammatical actors. The time phrase and finite main verb supply the future context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11e-12",
  "lessonId": "temporal_when",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "temporal_when",
  "temporalRelation": "when",
  "temporalSubject": "onlar",
  "mainSubject": "onlar",
  "temporalTime": "habitual",
  "converbLead": "Her hafta",
  "converbClause": "onlar arkadaşlarını görünce",
  "unit": "Her hafta onlar arkadaşlarını görünce",
  "main": "mutlu oluyorlar",
  "sentence": "Her hafta onlar arkadaşlarını görünce mutlu oluyorlar.",
  "template": "Her hafta onlar arkadaşlarını ___ mutlu oluyorlar.",
  "answer": "görünce",
  "meaning": "Every week, they become happy when they see their friends.",
  "distractors": [
   "Every week, they become happy before they see their friends.",
   "Every week, we become happy when they see their friends."
  ],
  "breakdown": "gör + ünce (when/once converb)",
  "structurePrompt": "Why does gör take -ünce?",
  "structureAnswer": "Ö selects ü in four-way harmony; the front-vowel form is -ünce, giving görünce.",
  "structureDistractors": [
   "Every rounded vowel selects -unca, so write gorunca.",
   "-ünce marks third-person plural possession."
  ],
  "explanation": "“onlar arkadaşlarını görünce” establishes when the supplied main action or response happens in this model. Time-clause actor: onlar; main-clause actor: onlar. The actors are the same. The time phrase and finite main verb supply the habitual context. -IncA carries no finite tense or person agreement. The link does not by itself guarantee immediate timing or prove a cause.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 }
];
