import type {VerbNounExample} from './verbNouns';
/** Newly authored drafts, informed by Yeni Hitit 1 §12.1/12.2 and
 * Yeni Hitit 2 §11.3 p.136 / nominalization support p.188. Not quotations.
 * Independent review and exact Ödkem mapping pending. */
export type NominalConstruction='ma'|'dik'|'acak';
export const contrastExamples:VerbNounExample[]=[
 {
  "id": "vn8-01",
  "lessonId": "contrasts",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "choose_nominalizer",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "nominalConstruction": "ma",
  "unit": "Senin buraya gelmeni",
  "main": "istiyorum",
  "sentence": "Senin buraya gelmeni istiyorum.",
  "template": "Senin buraya ___ istiyorum.",
  "answer": "gelmeni",
  "meaning": "I want you to come here.",
  "distractors": [
   "I know that you came here yesterday.",
   "I know that you will come here tomorrow."
  ],
  "breakdown": "gel + me (action noun) + n (your agreement) + i (accusative)",
  "structurePrompt": "Intended message: I want you to come here. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-mA + agreement + accusative",
  "structureDistractors": [
   "-DIK + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message expresses wanting an action. In this istemek construction use -mA, agreement and accusative. It does not claim knowledge that the action happened or will happen. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn8-02",
  "lessonId": "contrasts",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "choose_nominalizer",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "nominalConstruction": "dik",
  "unit": "Senin dün buraya geldiğini",
  "main": "biliyorum",
  "sentence": "Senin dün buraya geldiğini biliyorum.",
  "template": "Senin dün buraya ___ biliyorum.",
  "answer": "geldiğini",
  "meaning": "I know that you came here yesterday.",
  "distractors": [
   "I want you to come here.",
   "I know that you will come here tomorrow."
  ],
  "breakdown": "gel + diğ (DIK; k → ğ) + in (your agreement) + i (accusative)",
  "structurePrompt": "Intended message: I know that you came here yesterday. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-DIK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message presents a past event or habitual fact as known content. Use -DIK with agreement and accusative. Dün gives a past event; her gün / her hafta gives a habit, so -DIK is not simply past tense. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn8-03",
  "lessonId": "contrasts",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "choose_nominalizer",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "nominalConstruction": "acak",
  "unit": "Senin yarın buraya geleceğini",
  "main": "biliyorum",
  "sentence": "Senin yarın buraya geleceğini biliyorum.",
  "template": "Senin yarın buraya ___ biliyorum.",
  "answer": "geleceğini",
  "meaning": "I know that you will come here tomorrow.",
  "distractors": [
   "I want you to come here.",
   "I know that you came here yesterday."
  ],
  "breakdown": "gel + eceğ (future nominalizer; k → ğ) + in (your agreement) + i (accusative)",
  "structurePrompt": "Intended message: I know that you will come here tomorrow. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-(y)AcAK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-DIK + agreement + accusative"
  ],
  "explanation": "The intended message presents future content as known: yarın locates the action tomorrow. Use -(y)AcAK with agreement and accusative, rather than the desired-action form or a nonfuture content form. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn8-04",
  "lessonId": "contrasts",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "choose_nominalizer",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "nominalConstruction": "ma",
  "unit": "Onun bu kitabı okumasını",
  "main": "istiyorum",
  "sentence": "Onun bu kitabı okumasını istiyorum.",
  "template": "Onun bu kitabı ___ istiyorum.",
  "answer": "okumasını",
  "meaning": "I want him/her to read this book.",
  "distractors": [
   "I know that he/she read this book yesterday.",
   "I know that he/she will read this book tomorrow."
  ],
  "breakdown": "oku + ma (action noun) + s + ı (his/her agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "Intended message: I want him/her to read this book. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-mA + agreement + accusative",
  "structureDistractors": [
   "-DIK + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message expresses wanting an action. In this istemek construction use -mA, agreement and accusative. It does not claim knowledge that the action happened or will happen. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "buffer_n",
   "buffer_s"
  ]
 },
 {
  "id": "vn8-05",
  "lessonId": "contrasts",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "choose_nominalizer",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "nominalConstruction": "dik",
  "unit": "Onun dün bu kitabı okuduğunu",
  "main": "biliyorum",
  "sentence": "Onun dün bu kitabı okuduğunu biliyorum.",
  "template": "Onun dün bu kitabı ___ biliyorum.",
  "answer": "okuduğunu",
  "meaning": "I know that he/she read this book yesterday.",
  "distractors": [
   "I want him/her to read this book.",
   "I know that he/she will read this book tomorrow."
  ],
  "breakdown": "oku + duğ (DIK; k → ğ) + u (his/her agreement) + n (buffer) + u (accusative)",
  "structurePrompt": "Intended message: I know that he/she read this book yesterday. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-DIK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message presents a past event or habitual fact as known content. Use -DIK with agreement and accusative. Dün gives a past event; her gün / her hafta gives a habit, so -DIK is not simply past tense. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening",
   "buffer_n"
  ]
 },
 {
  "id": "vn8-06",
  "lessonId": "contrasts",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "choose_nominalizer",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "nominalConstruction": "acak",
  "unit": "Onun yarın bu kitabı okuyacağını",
  "main": "biliyorum",
  "sentence": "Onun yarın bu kitabı okuyacağını biliyorum.",
  "template": "Onun yarın bu kitabı ___ biliyorum.",
  "answer": "okuyacağını",
  "meaning": "I know that he/she will read this book tomorrow.",
  "distractors": [
   "I want him/her to read this book.",
   "I know that he/she read this book yesterday."
  ],
  "breakdown": "oku + y (buffer) + acağ (future nominalizer; k → ğ) + ı (his/her agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "Intended message: I know that he/she will read this book tomorrow. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-(y)AcAK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-DIK + agreement + accusative"
  ],
  "explanation": "The intended message presents future content as known: yarın locates the action tomorrow. Use -(y)AcAK with agreement and accusative, rather than the desired-action form or a nonfuture content form. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening",
   "buffer_y",
   "buffer_n"
  ]
 },
 {
  "id": "vn8-07",
  "lessonId": "contrasts",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "choose_nominalizer",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "nominalConstruction": "ma",
  "unit": "Bizim burada çalışmamızı",
  "main": "istiyor",
  "sentence": "Bizim burada çalışmamızı istiyor.",
  "template": "Bizim burada ___ istiyor.",
  "answer": "çalışmamızı",
  "meaning": "He/she wants us to work here.",
  "distractors": [
   "He/she knows that we work here every day.",
   "He/she knows that we will work here tomorrow."
  ],
  "breakdown": "çalış + ma (action noun) + mız (our agreement) + ı (accusative)",
  "structurePrompt": "Intended message: He/she wants us to work here. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-mA + agreement + accusative",
  "structureDistractors": [
   "-DIK + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message expresses wanting an action. In this istemek construction use -mA, agreement and accusative. It does not claim knowledge that the action happened or will happen. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn8-08",
  "lessonId": "contrasts",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "choose_nominalizer",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "nominalConstruction": "dik",
  "unit": "Bizim her gün burada çalıştığımızı",
  "main": "biliyor",
  "sentence": "Bizim her gün burada çalıştığımızı biliyor.",
  "template": "Bizim her gün burada ___ biliyor.",
  "answer": "çalıştığımızı",
  "meaning": "He/she knows that we work here every day.",
  "distractors": [
   "He/she wants us to work here.",
   "He/she knows that we will work here tomorrow."
  ],
  "breakdown": "çalış + tığ (DIK; ş requires t, k → ğ) + ımız (our agreement) + ı (accusative)",
  "structurePrompt": "Intended message: He/she knows that we work here every day. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-DIK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message presents a past event or habitual fact as known content. Use -DIK with agreement and accusative. Dün gives a past event; her gün / her hafta gives a habit, so -DIK is not simply past tense. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn8-09",
  "lessonId": "contrasts",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "choose_nominalizer",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "nominalConstruction": "acak",
  "unit": "Bizim yarın burada çalışacağımızı",
  "main": "biliyor",
  "sentence": "Bizim yarın burada çalışacağımızı biliyor.",
  "template": "Bizim yarın burada ___ biliyor.",
  "answer": "çalışacağımızı",
  "meaning": "He/she knows that we will work here tomorrow.",
  "distractors": [
   "He/she wants us to work here.",
   "He/she knows that we worked here yesterday."
  ],
  "breakdown": "çalış + acağ (future nominalizer; k → ğ) + ımız (our agreement) + ı (accusative)",
  "structurePrompt": "Intended message: He/she knows that we will work here tomorrow. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-(y)AcAK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-DIK + agreement + accusative"
  ],
  "explanation": "The intended message presents future content as known: yarın locates the action tomorrow. Use -(y)AcAK with agreement and accusative, rather than the desired-action form or a nonfuture content form. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn8-10",
  "lessonId": "contrasts",
  "stem": "hazırla",
  "verbMeaning": "prepare",
  "form": "choose_nominalizer",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "nominalConstruction": "ma",
  "unit": "Sizin raporu hazırlamanızı",
  "main": "istiyorum",
  "sentence": "Sizin raporu hazırlamanızı istiyorum.",
  "template": "Sizin raporu ___ istiyorum.",
  "answer": "hazırlamanızı",
  "meaning": "I want you to prepare the report.",
  "distractors": [
   "I know that you prepare the report every week.",
   "I know that you will prepare the report tomorrow."
  ],
  "breakdown": "hazırla + ma (action noun) + nız (your plural/polite agreement) + ı (accusative)",
  "structurePrompt": "Intended message: I want you to prepare the report. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-mA + agreement + accusative",
  "structureDistractors": [
   "-DIK + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message expresses wanting an action. In this istemek construction use -mA, agreement and accusative. It does not claim knowledge that the action happened or will happen. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn8-11",
  "lessonId": "contrasts",
  "stem": "hazırla",
  "verbMeaning": "prepare",
  "form": "choose_nominalizer",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "nominalConstruction": "dik",
  "unit": "Sizin her hafta raporu hazırladığınızı",
  "main": "biliyorum",
  "sentence": "Sizin her hafta raporu hazırladığınızı biliyorum.",
  "template": "Sizin her hafta raporu ___ biliyorum.",
  "answer": "hazırladığınızı",
  "meaning": "I know that you prepare the report every week.",
  "distractors": [
   "I want you to prepare the report.",
   "I know that you will prepare the report tomorrow."
  ],
  "breakdown": "hazırla + dığ (DIK; k → ğ) + ınız (your plural/polite agreement) + ı (accusative)",
  "structurePrompt": "Intended message: I know that you prepare the report every week. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-DIK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-(y)AcAK + agreement + accusative"
  ],
  "explanation": "The intended message presents a past event or habitual fact as known content. Use -DIK with agreement and accusative. Dün gives a past event; her gün / her hafta gives a habit, so -DIK is not simply past tense. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn8-12",
  "lessonId": "contrasts",
  "stem": "hazırla",
  "verbMeaning": "prepare",
  "form": "choose_nominalizer",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "nominalConstruction": "acak",
  "unit": "Sizin yarın raporu hazırlayacağınızı",
  "main": "biliyorum",
  "sentence": "Sizin yarın raporu hazırlayacağınızı biliyorum.",
  "template": "Sizin yarın raporu ___ biliyorum.",
  "answer": "hazırlayacağınızı",
  "meaning": "I know that you will prepare the report tomorrow.",
  "distractors": [
   "I want you to prepare the report.",
   "I know that you prepared the report yesterday."
  ],
  "breakdown": "hazırla + y (buffer) + acağ (future nominalizer; k → ğ) + ınız (your plural/polite agreement) + ı (accusative)",
  "structurePrompt": "Intended message: I know that you will prepare the report tomorrow. Which nominalizing construction fits the missing word?",
  "structureAnswer": "-(y)AcAK + agreement + accusative",
  "structureDistractors": [
   "-mA + agreement + accusative",
   "-DIK + agreement + accusative"
  ],
  "explanation": "The intended message presents future content as known: yarın locates the action tomorrow. Use -(y)AcAK with agreement and accusative, rather than the desired-action form or a nonfuture content form. The agreement identifies the embedded subject; accusative connects the whole clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening",
   "buffer_y"
  ]
 }
];
