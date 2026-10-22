import type {VerbNounExample} from './verbNouns';
/** Authored drafts informed by supplied Yeni Hitit 2 §3.3 printed p.38
 * (gençken / üniversitedeyken). State and location bases are supplied.
 * Not quotations; independent review and exact Ödkem mapping pending. */
export const stateKenExamples:VerbNounExample[]=[
 {
  "id": "vn11g-01",
  "lessonId": "state_ken",
  "stem": "çocuk",
  "verbMeaning": "a child",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "ben",
  "mainSubject": "ben",
  "temporalTime": "past",
  "converbLead": "Eskiden",
  "converbClause": "ben çocukken",
  "unit": "Eskiden ben çocukken",
  "main": "her gün parkta oynardım",
  "sentence": "Eskiden ben çocukken her gün parkta oynardım.",
  "template": "Eskiden ben ___ her gün parkta oynardım.",
  "answer": "çocukken",
  "meaning": "I used to play in the park every day when I was a child.",
  "distractors": [
   "I started playing in the park every day only after I became an adult.",
   "You used to play in the park every day when I was a child."
  ],
  "breakdown": "çocuk + ken (unchanged)",
  "structurePrompt": "Does çocukken need an action verb or a joining y?",
  "structureAnswer": "No. Çocuk is a consonant-final noun: çocuk + ken describes my childhood state.",
  "structureDistractors": [
   "Yes. Use a finite olmak form before ken.",
   "Yes. Insert y after the consonant k."
  ],
  "explanation": "“ben çocukken” describes a state during which the supplied main action takes place. Time-clause subject: ben; main-clause subject: ben. The subjects are the same. Use the supplied çocuk + ken, without buffer y. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the past context.",
  "supportingRuleIds": []
 },
 {
  "id": "vn11g-02",
  "lessonId": "state_ken",
  "stem": "evde",
  "verbMeaning": "at home",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "ben",
  "mainSubject": "sen",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "ben evdeyken",
  "unit": "Yarın ben evdeyken",
  "main": "sen alışverişe gideceksin",
  "sentence": "Yarın ben evdeyken sen alışverişe gideceksin.",
  "template": "Yarın ben ___ sen alışverişe gideceksin.",
  "answer": "evdeyken",
  "meaning": "Tomorrow, you will go shopping while I am at home.",
  "distractors": [
   "Tomorrow, you will go shopping after I leave home.",
   "Tomorrow, I will go shopping while you are at home."
  ],
  "breakdown": "evde + y (buffer) + ken (unchanged)",
  "structurePrompt": "Who is at home, and who will go shopping?",
  "structureAnswer": "Ben is at home; Sen will go shopping during that time.",
  "structureDistractors": [
   "Sen is at home; Ben will go shopping.",
   "Ben must do both because -ken requires a shared subject."
  ],
  "explanation": "“ben evdeyken” describes a location during which the supplied main action takes place. Time-clause subject: ben; main-clause subject: sen. Keep the two subjects separate. Use the supplied evde + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the future context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-03",
  "lessonId": "state_ken",
  "stem": "yorgun",
  "verbMeaning": "tired",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "sen",
  "mainSubject": "o",
  "temporalTime": "habitual",
  "converbLead": "Her akşam",
  "converbClause": "sen yorgunken",
  "unit": "Her akşam sen yorgunken",
  "main": "o yemeği hazırlıyor",
  "sentence": "Her akşam sen yorgunken o yemeği hazırlıyor.",
  "template": "Her akşam sen ___ o yemeği hazırlıyor.",
  "answer": "yorgunken",
  "meaning": "Every evening, they prepare the meal while you are tired.",
  "distractors": [
   "Every evening, they prepare the meal only after you have recovered from being tired.",
   "Every evening, you prepare the meal while they are tired."
  ],
  "breakdown": "yorgun + ken (unchanged)",
  "structurePrompt": "Does the back vowel in yorgun change -ken to -kan?",
  "structureAnswer": "No. The suffix stays -ken: the state base is supplied.",
  "structureDistractors": [
   "Yes. Back vowels require -kan here.",
   "No. Add a second-person ending before -ken instead."
  ],
  "explanation": "“sen yorgunken” describes a state during which the supplied main action takes place. Time-clause subject: sen; main-clause subject: o. Keep the two subjects separate. Use the supplied yorgun + ken, without buffer y. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the habitual context.",
  "supportingRuleIds": []
 },
 {
  "id": "vn11g-04",
  "lessonId": "state_ken",
  "stem": "okulda",
  "verbMeaning": "at school",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "sen",
  "mainSubject": "sen",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "sen okuldayken",
  "unit": "Dün sen okuldayken",
  "main": "arkadaşlarınla konuştun",
  "sentence": "Dün sen okuldayken arkadaşlarınla konuştun.",
  "template": "Dün sen ___ arkadaşlarınla konuştun.",
  "answer": "okuldayken",
  "meaning": "You spoke with your friends yesterday while you were at school.",
  "distractors": [
   "You spoke with your friends yesterday after leaving school.",
   "I spoke with my friends yesterday while you were at school."
  ],
  "breakdown": "okulda + y (buffer) + ken (unchanged)",
  "structurePrompt": "What does okuldayken describe?",
  "structureAnswer": "Your being at school is the time setting for your conversation.",
  "structureDistractors": [
   "It means the school building was speaking.",
   "It says your conversation happened only after leaving school."
  ],
  "explanation": "“sen okuldayken” describes a location during which the supplied main action takes place. Time-clause subject: sen; main-clause subject: sen. The subjects are the same. Use the supplied okulda + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the past context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-05",
  "lessonId": "state_ken",
  "stem": "öğrenci",
  "verbMeaning": "a student",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "o",
  "mainSubject": "o",
  "temporalTime": "future",
  "converbLead": "Gelecek yıl",
  "converbClause": "o öğrenciyken",
  "unit": "Gelecek yıl o öğrenciyken",
  "main": "yurtta kalacak",
  "sentence": "Gelecek yıl o öğrenciyken yurtta kalacak.",
  "template": "Gelecek yıl o ___ yurtta kalacak.",
  "answer": "öğrenciyken",
  "meaning": "Next year, they will stay in a dormitory while they are a student.",
  "distractors": [
   "Next year, they will stay in a dormitory only after they stop being a student.",
   "Next year, I will stay in a dormitory while they are a student."
  ],
  "breakdown": "öğrenci + y (buffer) + ken (unchanged)",
  "structurePrompt": "Where does the future context come from?",
  "structureAnswer": "Gelecek yıl and kalacak give future context; öğrenciyken carries no finite tense or person ending.",
  "structureDistractors": [
   "-yken is a third-person future ending.",
   "Öğrenciyken can describe only a past childhood state."
  ],
  "explanation": "“o öğrenciyken” describes a state during which the supplied main action takes place. Time-clause subject: o; main-clause subject: o. The subjects are the same. Use the supplied öğrenci + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the future context.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-06",
  "lessonId": "state_ken",
  "stem": "işte",
  "verbMeaning": "at work",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "o",
  "mainSubject": "biz",
  "temporalTime": "habitual",
  "converbLead": "Her öğleden sonra",
  "converbClause": "o işteyken",
  "unit": "Her öğleden sonra o işteyken",
  "main": "biz evde ders çalışıyoruz",
  "sentence": "Her öğleden sonra o işteyken biz evde ders çalışıyoruz.",
  "template": "Her öğleden sonra o ___ biz evde ders çalışıyoruz.",
  "answer": "işteyken",
  "meaning": "Every afternoon, we study at home while they are at work.",
  "distractors": [
   "Every afternoon, we study at home only after they leave work.",
   "Every afternoon, they study at home while we are at work."
  ],
  "breakdown": "işte + y (buffer) + ken (unchanged)",
  "structurePrompt": "Do işte and evde refer to the same subject here?",
  "structureAnswer": "No. O is at work; Biz study at home.",
  "structureDistractors": [
   "Yes. Both locations must describe O.",
   "No. Biz is at work and O studies at home."
  ],
  "explanation": "“o işteyken” describes a location during which the supplied main action takes place. Time-clause subject: o; main-clause subject: biz. Keep the two subjects separate. Use the supplied işte + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the habitual context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-07",
  "lessonId": "state_ken",
  "stem": "meşgul",
  "verbMeaning": "busy",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "biz",
  "mainSubject": "siz",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "biz meşgulken",
  "unit": "Dün biz meşgulken",
  "main": "siz yemeği hazırladınız",
  "sentence": "Dün biz meşgulken siz yemeği hazırladınız.",
  "template": "Dün biz ___ siz yemeği hazırladınız.",
  "answer": "meşgulken",
  "meaning": "Yesterday, you prepared the meal while we were busy.",
  "distractors": [
   "Yesterday, you prepared the meal only after we stopped being busy.",
   "Yesterday, we prepared the meal while you were busy."
  ],
  "breakdown": "meşgul + ken (unchanged)",
  "structurePrompt": "What belongs in the bracketed clause?",
  "structureAnswer": "Biz meşgulken describes our being busy, not an action conjugated with an aorist ending.",
  "structureDistractors": [
   "Siz yemeği hazırladınız describes our being busy.",
   "Meşgul needs an aorist r before -ken because every base is a verb."
  ],
  "explanation": "“biz meşgulken” describes a state during which the supplied main action takes place. Time-clause subject: biz; main-clause subject: siz. Keep the two subjects separate. Use the supplied meşgul + ken, without buffer y. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the past context.",
  "supportingRuleIds": []
 },
 {
  "id": "vn11g-08",
  "lessonId": "state_ken",
  "stem": "tatilde",
  "verbMeaning": "on holiday",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "biz",
  "mainSubject": "biz",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "biz tatildeyken",
  "unit": "Yarın biz tatildeyken",
  "main": "bol bol fotoğraf çekeceğiz",
  "sentence": "Yarın biz tatildeyken bol bol fotoğraf çekeceğiz.",
  "template": "Yarın biz ___ bol bol fotoğraf çekeceğiz.",
  "answer": "tatildeyken",
  "meaning": "Tomorrow, we will take lots of photos while we are on holiday.",
  "distractors": [
   "Tomorrow, we will take lots of photos only after our holiday ends.",
   "Tomorrow, you will take lots of photos while we are on holiday."
  ],
  "breakdown": "tatilde + y (buffer) + ken (unchanged)",
  "structurePrompt": "Why is there y before ken?",
  "structureAnswer": "Tatilde ends in a vowel, so add buffer y and unchanged -ken.",
  "structureDistractors": [
   "Y is possessive agreement with Biz.",
   "Y marks accusative case on a noun clause."
  ],
  "explanation": "“biz tatildeyken” describes a location during which the supplied main action takes place. Time-clause subject: biz; main-clause subject: biz. The subjects are the same. Use the supplied tatilde + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the future context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-09",
  "lessonId": "state_ken",
  "stem": "hasta",
  "verbMeaning": "ill",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "siz",
  "mainSubject": "siz",
  "temporalTime": "habitual",
  "converbLead": "Genellikle",
  "converbClause": "siz hastayken",
  "unit": "Genellikle siz hastayken",
  "main": "evde dinleniyorsunuz",
  "sentence": "Genellikle siz hastayken evde dinleniyorsunuz.",
  "template": "Genellikle siz ___ evde dinleniyorsunuz.",
  "answer": "hastayken",
  "meaning": "You usually rest at home while you are ill.",
  "distractors": [
   "You usually rest at home only after recovering from illness.",
   "We usually rest at home while you are ill."
  ],
  "breakdown": "hasta + y (buffer) + ken (unchanged)",
  "structurePrompt": "Does Siz require an agreement ending on hastayken?",
  "structureAnswer": "No. Siz names the state subject; dinleniyorsunuz carries the finite agreement.",
  "structureDistractors": [
   "Yes. Add -sınız before -ken.",
   "Yes. Add plural -ler after -ken."
  ],
  "explanation": "“siz hastayken” describes a state during which the supplied main action takes place. Time-clause subject: siz; main-clause subject: siz. The subjects are the same. Use the supplied hasta + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the habitual context.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-10",
  "lessonId": "state_ken",
  "stem": "kütüphanede",
  "verbMeaning": "in the library",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "siz",
  "mainSubject": "onlar",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "siz kütüphanedeyken",
  "unit": "Dün siz kütüphanedeyken",
  "main": "onlar sizi aradılar",
  "sentence": "Dün siz kütüphanedeyken onlar sizi aradılar.",
  "template": "Dün siz ___ onlar sizi aradılar.",
  "answer": "kütüphanedeyken",
  "meaning": "Yesterday, they called you while you were in the library.",
  "distractors": [
   "Yesterday, they called you only after you left the library.",
   "Yesterday, you called them while they were in the library."
  ],
  "breakdown": "kütüphanede + y (buffer) + ken (unchanged)",
  "structurePrompt": "Is the location case ending being produced in this exercise?",
  "structureAnswer": "No. Kütüphanede is supplied; add y + ken to build the complete missing word.",
  "structureDistractors": [
   "Yes. Start from kütüphane and choose a new case from context.",
   "No. Remove the supplied de before attaching -ken."
  ],
  "explanation": "“siz kütüphanedeyken” describes a location during which the supplied main action takes place. Time-clause subject: siz; main-clause subject: onlar. Keep the two subjects separate. Use the supplied kütüphanede + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the past context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-11",
  "lessonId": "state_ken",
  "stem": "izinli",
  "verbMeaning": "on leave",
  "form": "state_ken",
  "temporalPredicate": "state",
  "temporalRelation": "while",
  "temporalSubject": "onlar",
  "mainSubject": "ben",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "onlar izinliyken",
  "unit": "Yarın onlar izinliyken",
  "main": "ben ofiste çalışacağım",
  "sentence": "Yarın onlar izinliyken ben ofiste çalışacağım.",
  "template": "Yarın onlar ___ ben ofiste çalışacağım.",
  "answer": "izinliyken",
  "meaning": "Tomorrow, I will work in the office while they are on leave.",
  "distractors": [
   "Tomorrow, I will work in the office only after their leave ends.",
   "Tomorrow, they will work in the office while I am on leave."
  ],
  "breakdown": "izinli + y (buffer) + ken (unchanged)",
  "structurePrompt": "Who is on leave, and who will work?",
  "structureAnswer": "Onlar is on leave; Ben will work. İzinliyken needs no plural agreement.",
  "structureDistractors": [
   "Ben is on leave; Onlar will work.",
   "Onlar requires -ler before -ken, and both subjects must be plural."
  ],
  "explanation": "“onlar izinliyken” describes a state during which the supplied main action takes place. Time-clause subject: onlar; main-clause subject: ben. Keep the two subjects separate. Use the supplied izinli + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the future context.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 },
 {
  "id": "vn11g-12",
  "lessonId": "state_ken",
  "stem": "bahçede",
  "verbMeaning": "in the garden",
  "form": "state_ken",
  "temporalPredicate": "location",
  "temporalRelation": "while",
  "temporalSubject": "onlar",
  "mainSubject": "onlar",
  "temporalTime": "habitual",
  "converbLead": "Her sabah",
  "converbClause": "onlar bahçedeyken",
  "unit": "Her sabah onlar bahçedeyken",
  "main": "çiçekleri suluyorlar",
  "sentence": "Her sabah onlar bahçedeyken çiçekleri suluyorlar.",
  "template": "Her sabah onlar ___ çiçekleri suluyorlar.",
  "answer": "bahçedeyken",
  "meaning": "Every morning, they water the flowers while they are in the garden.",
  "distractors": [
   "Every morning, they water the flowers only after leaving the garden.",
   "Every morning, we water the flowers while they are in the garden."
  ],
  "breakdown": "bahçede + y (buffer) + ken (unchanged)",
  "structurePrompt": "What does the location clause contribute?",
  "structureAnswer": "It places their watering during their time in the garden; no action verb is needed inside that location clause.",
  "structureDistractors": [
   "It describes a garden doing the watering.",
   "It says watering must happen only after they leave the garden."
  ],
  "explanation": "“onlar bahçedeyken” describes a location during which the supplied main action takes place. Time-clause subject: onlar; main-clause subject: onlar. The subjects are the same. Use the supplied bahçede + buffer y + ken. -ken stays unchanged and needs no action verb or person agreement. The time phrase and main verb give the habitual context. The location case form is already supplied.",
  "supportingRuleIds": [
   "buffer_y"
  ]
 }
];
