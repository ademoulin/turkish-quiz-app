import type {VerbNounExample} from './verbNouns';
/** Newly authored drafts, informed by Yeni Hitit 2 §11.3 p.136,
 * Grammar Support nominalization p.188 and indirect-report guidance.
 * Not quotations. Independent review and exact Ödkem mapping pending. */
export const contentFutureExamples:VerbNounExample[]=[
 {
  "id": "vn7-01",
  "lessonId": "content_future",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "future_possessive_case",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Benim yarın geleceğimi",
  "main": "biliyorsun",
  "sentence": "Benim yarın geleceğimi biliyorsun.",
  "template": "Benim yarın ___ biliyorsun.",
  "answer": "geleceğimi",
  "meaning": "You know that I will come tomorrow.",
  "distractors": [
   "I know that you will come tomorrow.",
   "You know that I came yesterday."
  ],
  "breakdown": "gel + eceğ (future nominalizer; k → ğ) + im (my agreement) + i (accusative)",
  "structurePrompt": "Who comes, and who knows?",
  "structureAnswer": "I will come; you know.",
  "structureDistractors": [
   "You will come; I know.",
   "You will come; you know."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-02",
  "lessonId": "content_future",
  "stem": "başla",
  "verbMeaning": "start",
  "form": "future_possessive_case",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Benim ertesi gün işe başlayacağımı",
  "main": "söyledi",
  "sentence": "Benim ertesi gün işe başlayacağımı söyledi.",
  "template": "Benim ertesi gün işe ___ söyledi.",
  "answer": "başlayacağımı",
  "meaning": "He/she said that I would start work the following day.",
  "distractors": [
   "He/she said that I had started work the previous day.",
   "I said that he/she would start work the following day."
  ],
  "breakdown": "başla + y (buffer) + acağ (future nominalizer; k → ğ) + ım (my agreement) + ı (accusative)",
  "structurePrompt": "What does ertesi gün refer to in this report?",
  "structureAnswer": "The day after the past statement; the starting was future relative to that statement.",
  "structureDistractors": [
   "Necessarily tomorrow relative to the present moment.",
   "A completed start before the statement."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-03",
  "lessonId": "content_future",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "future_possessive_case",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Senin yarın bu kitabı okuyacağını",
  "main": "biliyorum",
  "sentence": "Senin yarın bu kitabı okuyacağını biliyorum.",
  "template": "Senin yarın bu kitabı ___ biliyorum.",
  "answer": "okuyacağını",
  "meaning": "I know that you will read this book tomorrow.",
  "distractors": [
   "You know that I will read this book tomorrow.",
   "I know that you read this book yesterday."
  ],
  "breakdown": "oku + y (buffer) + acağ (future nominalizer; k → ğ) + ın (your agreement) + ı (accusative)",
  "structurePrompt": "Why is y used in okuyacağını?",
  "structureAnswer": "It separates vowel-final oku from vowel-initial -acak.",
  "structureDistractors": [
   "It identifies me as the reader.",
   "It marks the whole clause as past."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-04",
  "lessonId": "content_future",
  "stem": "bekle",
  "verbMeaning": "wait",
  "form": "future_possessive_case",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Senin ertesi gün burada bekleyeceğini",
  "main": "söyledi",
  "sentence": "Senin ertesi gün burada bekleyeceğini söyledi.",
  "template": "Senin ertesi gün burada ___ söyledi.",
  "answer": "bekleyeceğini",
  "meaning": "He/she said that you would wait here the following day.",
  "distractors": [
   "He/she said that you had waited here the previous day.",
   "You said that he/she would wait here the following day."
  ],
  "breakdown": "bekle + y (buffer) + eceğ (future nominalizer; k → ğ) + in (your agreement) + i (accusative)",
  "structurePrompt": "What does -in identify in bekleyeceğini here?",
  "structureAnswer": "You as the person who would wait.",
  "structureDistractors": [
   "He/she as the person speaking.",
   "Me as the person who would wait."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-05",
  "lessonId": "content_future",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "future_possessive_case",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Onun yarın burada çalışacağını",
  "main": "düşünüyorum",
  "sentence": "Onun yarın burada çalışacağını düşünüyorum.",
  "template": "Onun yarın burada ___ düşünüyorum.",
  "answer": "çalışacağını",
  "meaning": "I think that he/she will work here tomorrow.",
  "distractors": [
   "He/she thinks that I will work here tomorrow.",
   "I think that he/she worked here yesterday."
  ],
  "breakdown": "çalış + acağ (future nominalizer; k → ğ) + ı (his/her agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "What is n after third-person agreement in çalışacağını?",
  "structureAnswer": "A buffer before accusative.",
  "structureDistractors": [
   "Second-person agreement meaning you work.",
   "The future nominalizer itself."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "consonant_softening",
   "buffer_n"
  ]
 },
 {
  "id": "vn7-06",
  "lessonId": "content_future",
  "stem": "uyu",
  "verbMeaning": "sleep",
  "form": "future_possessive_case",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Onun ertesi gün evde uyuyacağını",
  "main": "bana söyledin",
  "sentence": "Onun ertesi gün evde uyuyacağını bana söyledin.",
  "template": "Onun ertesi gün evde ___ bana söyledin.",
  "answer": "uyuyacağını",
  "meaning": "You told me that he/she would sleep at home the following day.",
  "distractors": [
   "You told me that he/she had slept at home the previous day.",
   "He/she told me that you would sleep at home the following day."
  ],
  "breakdown": "uyu + y (buffer) + acağ (future nominalizer; k → ğ) + ı (his/her agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "Who sleeps, and who spoke?",
  "structureAnswer": "He/she would sleep; you spoke.",
  "structureDistractors": [
   "You would sleep; he/she spoke.",
   "I would sleep; you spoke."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "consonant_softening",
   "buffer_n"
  ]
 },
 {
  "id": "vn7-07",
  "lessonId": "content_future",
  "stem": "git",
  "verbMeaning": "go",
  "form": "future_possessive_case",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Bizim yarın müzeye gideceğimizi",
  "main": "biliyorsun",
  "sentence": "Bizim yarın müzeye gideceğimizi biliyorsun.",
  "template": "Bizim yarın müzeye ___ biliyorsun.",
  "answer": "gideceğimizi",
  "meaning": "You know that we will go to the museum tomorrow.",
  "distractors": [
   "We know that you will go to the museum tomorrow.",
   "You know that we went to the museum yesterday."
  ],
  "breakdown": "git → gid (stem softening) + eceğ (future nominalizer; suffix k → ğ) + imiz (our agreement) + i (accusative)",
  "structurePrompt": "What softens in gideceğimizi?",
  "structureAnswer": "Stem t becomes d, and suffix k becomes ğ before vowel-initial agreement.",
  "structureDistractors": [
   "Stem t stays unchanged, and a buffer s is added.",
   "The agreement ending changes to second person."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-08",
  "lessonId": "content_future",
  "stem": "hazırla",
  "verbMeaning": "prepare",
  "form": "future_possessive_case",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Bizim ertesi gün raporu hazırlayacağımızı",
  "main": "söyledi",
  "sentence": "Bizim ertesi gün raporu hazırlayacağımızı söyledi.",
  "template": "Bizim ertesi gün raporu ___ söyledi.",
  "answer": "hazırlayacağımızı",
  "meaning": "He/she said that we would prepare the report the following day.",
  "distractors": [
   "He/she said that we had prepared the report the previous day.",
   "We said that he/she would prepare the report the following day."
  ],
  "breakdown": "hazırla + y (buffer) + acağ (future nominalizer; k → ğ) + ımız (our agreement) + ı (accusative)",
  "structurePrompt": "Does this report establish that the preparation actually happened?",
  "structureAnswer": "No: it reports a future action as viewed from the past statement.",
  "structureDistractors": [
   "Yes: -acak always guarantees the action happened.",
   "Yes: saying something makes it a completed fact."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-09",
  "lessonId": "content_future",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "future_possessive_case",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Sizin yarın öğretmeni göreceğinizi",
  "main": "biliyorum",
  "sentence": "Sizin yarın öğretmeni göreceğinizi biliyorum.",
  "template": "Sizin yarın öğretmeni ___ biliyorum.",
  "answer": "göreceğinizi",
  "meaning": "I know that you will see the teacher tomorrow.",
  "distractors": [
   "You know that I will see the teacher tomorrow.",
   "I know that you saw the teacher yesterday."
  ],
  "breakdown": "gör + eceğ (future nominalizer; k → ğ) + iniz (your plural/polite agreement) + i (accusative)",
  "structurePrompt": "What does the final i connect to biliyorum?",
  "structureAnswer": "The whole clause about you seeing the teacher.",
  "structureDistractors": [
   "Only the word for teacher inside the clause.",
   "Only the genitive subject sizin."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-10",
  "lessonId": "content_future",
  "stem": "öğren",
  "verbMeaning": "learn",
  "form": "future_possessive_case",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Sizin ertesi gün sonucu öğreneceğinizi",
  "main": "bana söylediler",
  "sentence": "Sizin ertesi gün sonucu öğreneceğinizi bana söylediler.",
  "template": "Sizin ertesi gün sonucu ___ bana söylediler.",
  "answer": "öğreneceğinizi",
  "meaning": "They told me that you would learn the result the following day.",
  "distractors": [
   "They told me that you had learned the result the previous day.",
   "You told me that they would learn the result the following day."
  ],
  "breakdown": "öğren + eceğ (future nominalizer; k → ğ) + iniz (your plural/polite agreement) + i (accusative)",
  "structurePrompt": "Who learns, and who spoke?",
  "structureAnswer": "You would learn; they spoke.",
  "structureDistractors": [
   "They would learn; you spoke.",
   "I would learn; they spoke."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. The agreement identifies the embedded subject, which can differ from the main-clause subject. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn7-11",
  "lessonId": "content_future",
  "stem": "dön",
  "verbMeaning": "return",
  "form": "future_possessive_case",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "nominalCase": "accusative",
  "contentTime": "future_now",
  "unit": "Onların yarın eve döneceklerini",
  "main": "biliyorum",
  "sentence": "Onların yarın eve döneceklerini biliyorum.",
  "template": "Onların yarın eve ___ biliyorum.",
  "answer": "döneceklerini",
  "meaning": "I know that they will return home tomorrow.",
  "distractors": [
   "They know that I will return home tomorrow.",
   "I know that they returned home yesterday."
  ],
  "breakdown": "dön + ecek (future nominalizer; k stays before l) + ler + i (their agreement) + n (buffer) + i (accusative)",
  "structurePrompt": "Why does k stay in döneceklerini?",
  "structureAnswer": "Overt plural agreement begins with consonant l.",
  "structureDistractors": [
   "The future nominalizer never softens.",
   "Accusative always blocks softening."
  ],
  "explanation": "Yarın places the embedded action tomorrow, viewed from the current knowing or thinking. This exercise requests overt plural agreement. Singular agreement with onların is also possible in Turkish. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_n"
  ]
 },
 {
  "id": "vn7-12",
  "lessonId": "content_future",
  "stem": "ara",
  "verbMeaning": "call",
  "form": "future_possessive_case",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "nominalCase": "accusative",
  "contentTime": "future_report",
  "unit": "Onların ertesi gün beni arayacaklarını",
  "main": "söyledim",
  "sentence": "Onların ertesi gün beni arayacaklarını söyledim.",
  "template": "Onların ertesi gün beni ___ söyledim.",
  "answer": "arayacaklarını",
  "meaning": "I said that they would call me the following day.",
  "distractors": [
   "I said that they had called me the previous day.",
   "They said that I would call them the following day."
  ],
  "breakdown": "ara + y (buffer) + acak (future nominalizer; k stays before l) + lar + ı (their agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "What are the jobs of y and n in arayacaklarını?",
  "structureAnswer": "y joins the vowel-final stem to -acak; n buffers accusative after third-person agreement.",
  "structureDistractors": [
   "y marks the caller as me; n marks past tense.",
   "Both consonants identify you as the caller."
  ],
  "explanation": "The main verb reports past speech. Ertesi gün means the day after that statement; the embedded action was future from that viewpoint. The sentence does not establish whether the action actually happened. This exercise requests overt plural agreement. Singular agreement with onların is also possible in Turkish. Accusative links the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_y",
   "buffer_n"
  ]
 }
];
