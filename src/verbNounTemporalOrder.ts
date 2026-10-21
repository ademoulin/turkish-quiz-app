import type {VerbNounExample} from './verbNouns';
/** Authored drafts, informed by supplied Yeni Hitit 1 §10.3 p.130 and
 * grammar support p.170 (event order and same/different subjects).
 * Not quotations; independent review and exact Ödkem mapping pending. */
export const temporalOrderExamples:VerbNounExample[]=[
 {
  "id": "vn11d-01",
  "lessonId": "temporal_order",
  "stem": "çık",
  "verbMeaning": "leave",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "ben",
  "mainSubject": "ben",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "ben evden çıkmadan önce",
  "unit": "Dün ben evden çıkmadan önce",
  "main": "kahvaltı yaptım",
  "sentence": "Dün ben evden çıkmadan önce kahvaltı yaptım.",
  "template": "Dün ben evden ___ önce kahvaltı yaptım.",
  "answer": "çıkmadan",
  "meaning": "I had breakfast yesterday before I left home.",
  "distractors": [
   "I left home yesterday before I had breakfast.",
   "You had breakfast yesterday before I left home."
  ],
  "breakdown": "çık + madan, then önce",
  "structurePrompt": "Which action came first, and who did both?",
  "structureAnswer": "I had breakfast first; I am also the person leaving home.",
  "structureDistractors": [
   "I left home first; I did both actions.",
   "You had breakfast first; I left home."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: ben; main-clause actor: ben. They are the same actor. The final verb and time phrase supply the past context. Type only çıkmadan; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-02",
  "lessonId": "temporal_order",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "ben",
  "mainSubject": "sen",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "ben bu kitabı okuduktan sonra",
  "unit": "Yarın ben bu kitabı okuduktan sonra",
  "main": "sen kitabı kütüphaneye götüreceksin",
  "sentence": "Yarın ben bu kitabı okuduktan sonra sen kitabı kütüphaneye götüreceksin.",
  "template": "Yarın ben bu kitabı ___ sonra sen kitabı kütüphaneye götüreceksin.",
  "answer": "okuduktan",
  "meaning": "Tomorrow, after I read this book, you will take it to the library.",
  "distractors": [
   "Tomorrow, before I read this book, you will take it to the library.",
   "Tomorrow, after you read this book, I will take it to the library."
  ],
  "breakdown": "oku + duk + tan, then sonra",
  "structurePrompt": "Does okuduktan mean that I already read the book in the past?",
  "structureAnswer": "No. Yarın gives a future context: my reading comes before your planned trip to the library.",
  "structureDistractors": [
   "Yes. Every form containing -DIK describes a completed past event.",
   "No. You will read it after I take it to the library."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: ben; main-clause actor: sen. Keep the two explicit subjects separate. The final verb and time phrase supply the future context. Type only okuduktan; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11d-03",
  "lessonId": "temporal_order",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "sen",
  "mainSubject": "o",
  "temporalTime": "habitual",
  "converbLead": "Her sabah",
  "converbClause": "sen gazeteyi okumadan önce",
  "unit": "Her sabah sen gazeteyi okumadan önce",
  "main": "o kahvaltı hazırlıyor",
  "sentence": "Her sabah sen gazeteyi okumadan önce o kahvaltı hazırlıyor.",
  "template": "Her sabah sen gazeteyi ___ önce o kahvaltı hazırlıyor.",
  "answer": "okumadan",
  "meaning": "Every morning, they prepare breakfast before you read the newspaper.",
  "distractors": [
   "Every morning, they prepare breakfast after you read the newspaper.",
   "Every morning, you prepare breakfast before they read the newspaper."
  ],
  "breakdown": "oku + madan, then önce",
  "structurePrompt": "Who reads, and who prepares breakfast?",
  "structureAnswer": "You read the newspaper; O prepares breakfast before that reading.",
  "structureDistractors": [
   "O reads the newspaper; you prepare breakfast.",
   "You perform both actions because these clauses must share a subject."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: sen; main-clause actor: o. Keep the two explicit subjects separate. The final verb and time phrase supply the habitual context. Type only okumadan; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-04",
  "lessonId": "temporal_order",
  "stem": "çalış",
  "verbMeaning": "study",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "sen",
  "mainSubject": "sen",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "sen ders çalıştıktan sonra",
  "unit": "Dün sen ders çalıştıktan sonra",
  "main": "dinlendin",
  "sentence": "Dün sen ders çalıştıktan sonra dinlendin.",
  "template": "Dün sen ders ___ sonra dinlendin.",
  "answer": "çalıştıktan",
  "meaning": "You rested yesterday after studying.",
  "distractors": [
   "You rested yesterday before studying.",
   "I rested yesterday after you studied."
  ],
  "breakdown": "çalış + tık + tan, then sonra",
  "structurePrompt": "Why does çalıştıktan contain tı and then tan?",
  "structureAnswer": "Voiceless ş selects tı in -DIK; the suffix k is followed by -tan with t.",
  "structureDistractors": [
   "Ş requires dı, so the target should be çalışdıktan.",
   "The k must soften to ğ before -tan."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: sen; main-clause actor: sen. They are the same actor. The final verb and time phrase supply the past context. Type only çalıştıktan; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11d-05",
  "lessonId": "temporal_order",
  "stem": "git",
  "verbMeaning": "go",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "o",
  "mainSubject": "o",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "o mağazaya gitmeden önce",
  "unit": "Yarın o mağazaya gitmeden önce",
  "main": "alışveriş listesi hazırlayacak",
  "sentence": "Yarın o mağazaya gitmeden önce alışveriş listesi hazırlayacak.",
  "template": "Yarın o mağazaya ___ önce alışveriş listesi hazırlayacak.",
  "answer": "gitmeden",
  "meaning": "Tomorrow, they will prepare a shopping list before going to the shop.",
  "distractors": [
   "Tomorrow, they will prepare a shopping list after going to the shop.",
   "Tomorrow, I will prepare a shopping list before they go to the shop."
  ],
  "breakdown": "git + meden, then önce",
  "structurePrompt": "Does gitmeden önce say that the shop visit will never happen?",
  "structureAnswer": "No. It orders the planned list-making before the shop visit; it does not say the visit never happens.",
  "structureDistractors": [
   "Yes. -meden önce always means never going anywhere.",
   "No. It places the shop visit before making the list."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: o; main-clause actor: o. They are the same actor. The final verb and time phrase supply the future context. Type only gitmeden; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-06",
  "lessonId": "temporal_order",
  "stem": "dön",
  "verbMeaning": "return",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "o",
  "mainSubject": "biz",
  "temporalTime": "habitual",
  "converbLead": "Her akşam",
  "converbClause": "o işten döndükten sonra",
  "unit": "Her akşam o işten döndükten sonra",
  "main": "biz birlikte yemek yiyoruz",
  "sentence": "Her akşam o işten döndükten sonra biz birlikte yemek yiyoruz.",
  "template": "Her akşam o işten ___ sonra biz birlikte yemek yiyoruz.",
  "answer": "döndükten",
  "meaning": "Every evening, we eat together after they return from work.",
  "distractors": [
   "Every evening, we eat together before they return from work.",
   "Every evening, they eat after we return from work."
  ],
  "breakdown": "dön + dük + ten, then sonra",
  "structurePrompt": "Are the two grammatical subjects the same?",
  "structureAnswer": "No. O returns from work; Biz eat together afterward.",
  "structureDistractors": [
   "Yes. Biz performs the returning and eating because -dükten means we.",
   "No. Biz returns from work and O eats afterward."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: o; main-clause actor: biz. Keep the two explicit subjects separate. The final verb and time phrase supply the habitual context. Type only döndükten; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11d-07",
  "lessonId": "temporal_order",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "biz",
  "mainSubject": "siz",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "biz eve gelmeden önce",
  "unit": "Dün biz eve gelmeden önce",
  "main": "siz yemeği hazırladınız",
  "sentence": "Dün biz eve gelmeden önce siz yemeği hazırladınız.",
  "template": "Dün biz eve ___ önce siz yemeği hazırladınız.",
  "answer": "gelmeden",
  "meaning": "Yesterday, you prepared the meal before we came home.",
  "distractors": [
   "Yesterday, you prepared the meal after we came home.",
   "Yesterday, we prepared the meal before you came home."
  ],
  "breakdown": "gel + meden, then önce",
  "structurePrompt": "Which subject and action belong inside the time clause?",
  "structureAnswer": "Biz eve gelmeden önce contains our coming home; your meal preparation happened before it.",
  "structureDistractors": [
   "Siz yemeği hazırladınız is inside the time clause; our arrival happened first.",
   "Biz is a genitive possessor, so gelmeden needs possessive agreement."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: biz; main-clause actor: siz. Keep the two explicit subjects separate. The final verb and time phrase supply the past context. Type only gelmeden; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-08",
  "lessonId": "temporal_order",
  "stem": "bitir",
  "verbMeaning": "finish",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "biz",
  "mainSubject": "biz",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "biz ödevi bitirdikten sonra",
  "unit": "Yarın biz ödevi bitirdikten sonra",
  "main": "dışarı çıkacağız",
  "sentence": "Yarın biz ödevi bitirdikten sonra dışarı çıkacağız.",
  "template": "Yarın biz ödevi ___ sonra dışarı çıkacağız.",
  "answer": "bitirdikten",
  "meaning": "Tomorrow, we will go out after finishing the homework.",
  "distractors": [
   "Tomorrow, we will go out before finishing the homework.",
   "Tomorrow, you will go out after we finish the homework."
  ],
  "breakdown": "bitir + dik + ten, then sonra",
  "structurePrompt": "Does bitirdikten need a we ending?",
  "structureAnswer": "No. Biz names the time-clause actor, and çıkacağız carries finite we agreement.",
  "structureDistractors": [
   "Yes. Add -imiz to bitirdikten to mark our finishing.",
   "Yes. Replace -dikten with -diğimizden even though sonra is supplied."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: biz; main-clause actor: biz. They are the same actor. The final verb and time phrase supply the future context. Type only bitirdikten; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11d-09",
  "lessonId": "temporal_order",
  "stem": "başla",
  "verbMeaning": "begin",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "siz",
  "mainSubject": "siz",
  "temporalTime": "habitual",
  "converbLead": "Her derste",
  "converbClause": "siz sunuma başlamadan önce",
  "unit": "Her derste siz sunuma başlamadan önce",
  "main": "notlarınıza bakıyorsunuz",
  "sentence": "Her derste siz sunuma başlamadan önce notlarınıza bakıyorsunuz.",
  "template": "Her derste siz sunuma ___ önce notlarınıza bakıyorsunuz.",
  "answer": "başlamadan",
  "meaning": "In every lesson, you look at your notes before beginning the presentation.",
  "distractors": [
   "In every lesson, you look at your notes after beginning the presentation.",
   "In every lesson, we look at our notes before you begin the presentation."
  ],
  "breakdown": "başla + madan, then önce",
  "structurePrompt": "Does başla need buffer y before -madan?",
  "structureAnswer": "No. Başla + madan gives başlamadan; önce makes this a before-time phrase.",
  "structureDistractors": [
   "Yes. Every vowel-final verb needs y before -madan.",
   "No. -madan is a finite past ending on başla."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: siz; main-clause actor: siz. They are the same actor. The final verb and time phrase supply the habitual context. Type only başlamadan; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-10",
  "lessonId": "temporal_order",
  "stem": "konuş",
  "verbMeaning": "speak",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "siz",
  "mainSubject": "onlar",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "siz öğretmenle konuştuktan sonra",
  "unit": "Dün siz öğretmenle konuştuktan sonra",
  "main": "onlar sınıfa girdiler",
  "sentence": "Dün siz öğretmenle konuştuktan sonra onlar sınıfa girdiler.",
  "template": "Dün siz öğretmenle ___ sonra onlar sınıfa girdiler.",
  "answer": "konuştuktan",
  "meaning": "Yesterday, they entered the classroom after you spoke with the teacher.",
  "distractors": [
   "Yesterday, they entered the classroom before you spoke with the teacher.",
   "Yesterday, you entered the classroom after they spoke with the teacher."
  ],
  "breakdown": "konuş + tuk + tan, then sonra",
  "structurePrompt": "What happened first, and who performed that action?",
  "structureAnswer": "You spoke with the teacher first; they entered the classroom afterward.",
  "structureDistractors": [
   "They entered first; you spoke afterward.",
   "They spoke with the teacher first; you entered afterward."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: siz; main-clause actor: onlar. Keep the two explicit subjects separate. The final verb and time phrase supply the past context. Type only konuştuktan; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11d-11",
  "lessonId": "temporal_order",
  "stem": "gir",
  "verbMeaning": "enter",
  "form": "temporal_before",
  "temporalRelation": "before",
  "temporalSubject": "onlar",
  "mainSubject": "ben",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "onlar toplantıya girmeden önce",
  "unit": "Yarın onlar toplantıya girmeden önce",
  "main": "ben belgeleri hazırlayacağım",
  "sentence": "Yarın onlar toplantıya girmeden önce ben belgeleri hazırlayacağım.",
  "template": "Yarın onlar toplantıya ___ önce ben belgeleri hazırlayacağım.",
  "answer": "girmeden",
  "meaning": "Tomorrow, I will prepare the documents before they enter the meeting.",
  "distractors": [
   "Tomorrow, I will prepare the documents after they enter the meeting.",
   "Tomorrow, they will prepare the documents before I enter the meeting."
  ],
  "breakdown": "gir + meden, then önce",
  "structurePrompt": "Where does I agreement appear, and who enters?",
  "structureAnswer": "Hazırlayacağım agrees with Ben; Onlar is the subject of entering.",
  "structureDistractors": [
   "Girmeden has first-person possessive agreement; Ben enters.",
   "Onlar forces a plural ending on girmeden and hazırlayacağım."
  ],
  "explanation": "Önce places the supplied main action before the action in the time clause. This temporal use does not say that the later action never happens. Time-clause actor: onlar; main-clause actor: ben. Keep the two explicit subjects separate. The final verb and time phrase supply the future context. Type only girmeden; önce is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11d-12",
  "lessonId": "temporal_order",
  "stem": "görüş",
  "verbMeaning": "meet",
  "form": "temporal_after",
  "temporalRelation": "after",
  "temporalSubject": "onlar",
  "mainSubject": "onlar",
  "temporalTime": "habitual",
  "converbLead": "Her hafta",
  "converbClause": "onlar arkadaşlarıyla görüştükten sonra",
  "unit": "Her hafta onlar arkadaşlarıyla görüştükten sonra",
  "main": "eve dönüyorlar",
  "sentence": "Her hafta onlar arkadaşlarıyla görüştükten sonra eve dönüyorlar.",
  "template": "Her hafta onlar arkadaşlarıyla ___ sonra eve dönüyorlar.",
  "answer": "görüştükten",
  "meaning": "Every week, they return home after meeting their friends.",
  "distractors": [
   "Every week, they return home before meeting their friends.",
   "Every week, we return home after they meet their friends."
  ],
  "breakdown": "görüş + tük + ten, then sonra",
  "structurePrompt": "What does görüştükten sonra establish?",
  "structureAnswer": "Meeting the friends comes before returning home; her hafta supplies the habitual context.",
  "structureDistractors": [
   "Returning home comes before meeting the friends.",
   "-tükten marks a past event, so a habitual context is impossible."
  ],
  "explanation": "Sonra places the action in the time clause before the supplied main action. -DIktAn expresses relative order here, not an automatic past tense. Time-clause actor: onlar; main-clause actor: onlar. They are the same actor. The final verb and time phrase supply the habitual context. Type only görüştükten; sonra is supplied. No possessive or person agreement is added to this converb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 }
];
