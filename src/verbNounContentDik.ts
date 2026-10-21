import type {VerbNounExample} from './verbNouns';
/** Newly authored drafts, informed by Yeni Hitit 2 §11.3 p.136 and
 * Grammar Support p.188 (nominalization), and indirect-report guidance.
 * Not textbook quotations. Independent review and exact Ödkem mapping pending. */
export type ContentTime='past_event'|'habitual_fact'|'future_now'|'future_report';
export const contentDikExamples:VerbNounExample[]=[
 {
  "id": "vn6-01",
  "lessonId": "content_dik",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "dik_possessive_case",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Benim dün eve geldiğimi",
  "main": "biliyorsun",
  "sentence": "Benim dün eve geldiğimi biliyorsun.",
  "template": "Benim dün eve ___ biliyorsun.",
  "answer": "geldiğimi",
  "meaning": "You know that I came home yesterday.",
  "distractors": [
   "You want me to come home tomorrow.",
   "I know that you came home yesterday."
  ],
  "breakdown": "gel + diğ (DIK; k → ğ) + im (my agreement) + i (accusative)",
  "structurePrompt": "Who comes, and who knows?",
  "structureAnswer": "I came; you know.",
  "structureDistractors": [
   "You came; I know.",
   "You came; you know."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-02",
  "lessonId": "content_dik",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "dik_possessive_case",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Benim her gün burada çalıştığımı",
  "main": "biliyorsun",
  "sentence": "Benim her gün burada çalıştığımı biliyorsun.",
  "template": "Benim her gün burada ___ biliyorsun.",
  "answer": "çalıştığımı",
  "meaning": "You know that I work here every day.",
  "distractors": [
   "You know that I worked here only yesterday.",
   "You want me to work here every day."
  ],
  "breakdown": "çalış + tığ (DIK; ş requires t, k → ğ) + ım (my agreement) + ı (accusative)",
  "structurePrompt": "Does -DIK make this a completed past event?",
  "structureAnswer": "No: her gün gives a habitual fact here.",
  "structureDistractors": [
   "Yes: -DIK always means a completed past event.",
   "No: -DIK always means a future plan."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "voiceless_assimilation",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-03",
  "lessonId": "content_dik",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "dik_possessive_case",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Senin dün bu kitabı okuduğunu",
  "main": "biliyorum",
  "sentence": "Senin dün bu kitabı okuduğunu biliyorum.",
  "template": "Senin dün bu kitabı ___ biliyorum.",
  "answer": "okuduğunu",
  "meaning": "I know that you read this book yesterday.",
  "distractors": [
   "I want you to read this book tomorrow.",
   "You know that I read this book yesterday."
  ],
  "breakdown": "oku + duğ (DIK; k → ğ) + un (your agreement) + u (accusative)",
  "structurePrompt": "What does the final -u do in okuduğunu?",
  "structureAnswer": "Accusative: it makes the whole clause the object of biliyorum.",
  "structureDistractors": [
   "It marks the book as the object inside the clause.",
   "It identifies me as the person reading."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-04",
  "lessonId": "content_dik",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "dik_possessive_case",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Senin her sabah bu yoldan yürüdüğünü",
  "main": "biliyorum",
  "sentence": "Senin her sabah bu yoldan yürüdüğünü biliyorum.",
  "template": "Senin her sabah bu yoldan ___ biliyorum.",
  "answer": "yürüdüğünü",
  "meaning": "I know that you walk along this road every morning.",
  "distractors": [
   "I know that you walked along this road only yesterday.",
   "You know that I walk along this road every morning."
  ],
  "breakdown": "yürü + düğ (DIK; k → ğ) + ün (your agreement) + ü (accusative)",
  "structurePrompt": "Who walks, and who knows?",
  "structureAnswer": "You walk; I know.",
  "structureDistractors": [
   "I walk; you know.",
   "You walk; you know."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-05",
  "lessonId": "content_dik",
  "stem": "çık",
  "verbMeaning": "leave",
  "form": "dik_possessive_case",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Onun dün evden erken çıktığını",
  "main": "duydum",
  "sentence": "Onun dün evden erken çıktığını duydum.",
  "template": "Onun dün evden erken ___ duydum.",
  "answer": "çıktığını",
  "meaning": "I heard that he/she left home early yesterday.",
  "distractors": [
   "I heard that I left home early yesterday.",
   "I want him/her to leave home early tomorrow."
  ],
  "breakdown": "çık + tığ (DIK; k requires t, suffix k → ğ) + ı (his/her agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "What are the two different consonant changes in çıktığını?",
  "structureAnswer": "Stem k requires t; the suffix’s k softens to ğ before the agreement vowel.",
  "structureDistractors": [
   "The stem’s k disappears; the suffix’s k stays unchanged.",
   "A buffer s appears before every possessive ending."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "voiceless_assimilation",
   "consonant_softening",
   "buffer_n"
  ]
 },
 {
  "id": "vn6-06",
  "lessonId": "content_dik",
  "stem": "yüz",
  "verbMeaning": "swim",
  "form": "dik_possessive_case",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Onun her hafta bu havuzda yüzdüğünü",
  "main": "biliyorum",
  "sentence": "Onun her hafta bu havuzda yüzdüğünü biliyorum.",
  "template": "Onun her hafta bu havuzda ___ biliyorum.",
  "answer": "yüzdüğünü",
  "meaning": "I know that he/she swims in this pool every week.",
  "distractors": [
   "I know that he/she swam here only yesterday.",
   "I want him/her to swim in this pool every week."
  ],
  "breakdown": "yüz + düğ (DIK; k → ğ) + ü (his/her agreement) + n (buffer) + ü (accusative)",
  "structurePrompt": "What is the -n- between agreement and accusative in yüzdüğünü?",
  "structureAnswer": "A buffer after third-person agreement.",
  "structureDistractors": [
   "Second-person agreement identifying you.",
   "The negation ending."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening",
   "buffer_n"
  ]
 },
 {
  "id": "vn6-07",
  "lessonId": "content_dik",
  "stem": "bitir",
  "verbMeaning": "finish",
  "form": "dik_possessive_case",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Bizim dün raporu bitirdiğimizi",
  "main": "söyledi",
  "sentence": "Bizim dün raporu bitirdiğimizi söyledi.",
  "template": "Bizim dün raporu ___ söyledi.",
  "answer": "bitirdiğimizi",
  "meaning": "He/she said that we finished the report yesterday.",
  "distractors": [
   "He/she asked us to finish the report tomorrow.",
   "We said that he/she finished the report yesterday."
  ],
  "breakdown": "bitir + diğ (DIK; k → ğ) + imiz (our agreement) + i (accusative)",
  "structurePrompt": "Who finishes, and who speaks?",
  "structureAnswer": "We finished; he/she spoke.",
  "structureDistractors": [
   "He/she finished; we spoke.",
   "We finished; we spoke."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-08",
  "lessonId": "content_dik",
  "stem": "buluş",
  "verbMeaning": "meet",
  "form": "dik_possessive_case",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Bizim her hafta burada buluştuğumuzu",
  "main": "biliyorsun",
  "sentence": "Bizim her hafta burada buluştuğumuzu biliyorsun.",
  "template": "Bizim her hafta burada ___ biliyorsun.",
  "answer": "buluştuğumuzu",
  "meaning": "You know that we meet here every week.",
  "distractors": [
   "You know that we met here only yesterday.",
   "We know that you meet here every week."
  ],
  "breakdown": "buluş + tuğ (DIK; ş requires t, k → ğ) + umuz (our agreement) + u (accusative)",
  "structurePrompt": "What tells us this clause describes a regular activity?",
  "structureAnswer": "Her hafta supplies the habitual time context.",
  "structureDistractors": [
   "The -DIK suffix always means yesterday.",
   "Accusative makes the activity future."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "voiceless_assimilation",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-09",
  "lessonId": "content_dik",
  "stem": "gez",
  "verbMeaning": "visit",
  "form": "dik_possessive_case",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Sizin dün müzeyi gezdiğinizi",
  "main": "duydum",
  "sentence": "Sizin dün müzeyi gezdiğinizi duydum.",
  "template": "Sizin dün müzeyi ___ duydum.",
  "answer": "gezdiğinizi",
  "meaning": "I heard that you visited the museum yesterday.",
  "distractors": [
   "I want you to visit the museum tomorrow.",
   "You heard that I visited the museum yesterday."
  ],
  "breakdown": "gez + diğ (DIK; k → ğ) + iniz (your plural/polite agreement) + i (accusative)",
  "structurePrompt": "What does -iniz identify in gezdiğinizi?",
  "structureAnswer": "You, plural or polite, as the people/person visiting.",
  "structureDistractors": [
   "Me as the person hearing.",
   "The museum as the owner of the action."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-10",
  "lessonId": "content_dik",
  "stem": "pişir",
  "verbMeaning": "cook",
  "form": "dik_possessive_case",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Sizin her akşam yemek pişirdiğinizi",
  "main": "biliyorum",
  "sentence": "Sizin her akşam yemek pişirdiğinizi biliyorum.",
  "template": "Sizin her akşam yemek ___ biliyorum.",
  "answer": "pişirdiğinizi",
  "meaning": "I know that you cook food every evening.",
  "distractors": [
   "I know that you cooked food only yesterday evening.",
   "You know that I cook food every evening."
  ],
  "breakdown": "pişir + diğ (DIK; k → ğ) + iniz (your plural/polite agreement) + i (accusative)",
  "structurePrompt": "Does the -DIK clause assert only a past cooking event?",
  "structureAnswer": "No: her akşam makes it a habitual fact in this sentence.",
  "structureDistractors": [
   "Yes: every -DIK clause describes only a past event.",
   "No: -DIK always describes tomorrow."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. The possessive-style agreement identifies the embedded subject, not the person knowing or speaking. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn6-11",
  "lessonId": "content_dik",
  "stem": "et",
  "verbMeaning": "help (yardım et-)",
  "form": "dik_possessive_case",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "nominalCase": "accusative",
  "contentTime": "past_event",
  "unit": "Onların dün bize yardım ettiklerini",
  "main": "biliyorum",
  "sentence": "Onların dün bize yardım ettiklerini biliyorum.",
  "template": "Onların dün bize yardım ___ biliyorum.",
  "answer": "ettiklerini",
  "meaning": "I know that they helped us yesterday.",
  "distractors": [
   "I want them to help us tomorrow.",
   "They know that I helped you yesterday."
  ],
  "breakdown": "et + tik (DIK; t requires t, k stays before l) + ler + i (their agreement) + n (buffer) + i (accusative)",
  "structurePrompt": "Why does -DIK keep k in ettiklerini?",
  "structureAnswer": "The overt plural agreement starts with consonant l.",
  "structureDistractors": [
   "The final accusative prevents all softening.",
   "The stem ends in a vowel."
  ],
  "explanation": "Dün locates the embedded action yesterday; the main predicate reports knowledge, hearing or speech about it. This exercise requests overt plural agreement. Singular agreement with onların is also possible in Turkish. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation",
   "buffer_n"
  ]
 },
 {
  "id": "vn6-12",
  "lessonId": "content_dik",
  "stem": "kalk",
  "verbMeaning": "get up",
  "form": "dik_possessive_case",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "nominalCase": "accusative",
  "contentTime": "habitual_fact",
  "unit": "Onların her gün erken kalktıklarını",
  "main": "biliyorum",
  "sentence": "Onların her gün erken kalktıklarını biliyorum.",
  "template": "Onların her gün erken ___ biliyorum.",
  "answer": "kalktıklarını",
  "meaning": "I know that they get up early every day.",
  "distractors": [
   "I know that they got up early only yesterday.",
   "They know that I get up early every day."
  ],
  "breakdown": "kalk + tık (DIK; k requires t, suffix k stays before l) + lar + ı (their agreement) + n (buffer) + ı (accusative)",
  "structurePrompt": "What does -ları identify in kalktıklarını in this exercise?",
  "structureAnswer": "They, the group getting up, through overt plural agreement.",
  "structureDistractors": [
   "Me, the person knowing.",
   "A future time for getting up."
  ],
  "explanation": "The repeated-time phrase gives a habitual fact here. -DIK does not by itself mean a completed past event. This exercise requests overt plural agreement. Singular agreement with onların is also possible in Turkish. The final accusative connects the entire content clause to the supplied main verb.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation",
   "buffer_n"
  ]
 }
];
