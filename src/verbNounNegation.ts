import type {VerbNounExample} from './verbNouns';
/** Authored drafts, informed by Yeni Hitit 1 §12.1 p.145 and §12.2 p.149.
 * Not textbook quotations; independent review and exact Ödkem mapping pending. */
export type NegationScope='none'|'action'|'main';
export const negationExamples:VerbNounExample[]=[
 {
  "id": "vn5-01",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Gelmek",
  "main": "istiyorum",
  "sentence": "Gelmek istiyorum.",
  "template": "___ istiyorum.",
  "answer": "gelmek",
  "meaning": "I want to come.",
  "distractors": [
   "You want to come.",
   "I want you to come."
  ],
  "form": "contrast_infinitive",
  "negationScope": "none",
  "breakdown": "gel + mek (action noun)",
  "explanation": "The person wanting and the person coming are both me.",
  "structurePrompt": "Who wants, and who comes?",
  "structureAnswer": "I want; I come.",
  "structureDistractors": [
   "I want; you come.",
   "You want; I come."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn5-02",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Senin gelmeni",
  "main": "istiyorum",
  "sentence": "Senin gelmeni istiyorum.",
  "template": "Senin ___ istiyorum.",
  "answer": "gelmeni",
  "meaning": "I want you to come.",
  "distractors": [
   "You want me to come.",
   "I want to come."
  ],
  "form": "contrast_possessive",
  "negationScope": "none",
  "breakdown": "gel + me (action noun) + n (your possessive) + i (accusative)",
  "explanation": "Senin and possessive n identify you as the person coming; istiyorum identifies me as wanting.",
  "structurePrompt": "Who wants, and who comes?",
  "structureAnswer": "I want; you come.",
  "structureDistractors": [
   "I want; I come.",
   "You want; I come."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony"
  ],
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative"
 },
 {
  "id": "vn5-03",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Senin gelmen",
  "main": "önemli",
  "sentence": "Senin gelmen önemli.",
  "template": "Senin ___ önemli.",
  "answer": "gelmen",
  "meaning": "It is important that you come.",
  "distractors": [
   "It is important that you do not come.",
   "It is important that I come."
  ],
  "form": "contrast_possessive",
  "negationScope": "none",
  "breakdown": "gel + me (action noun) + n (your possessive)",
  "explanation": "The single me names coming; it does not negate it.",
  "structurePrompt": "What does -me do in gelmen?",
  "structureAnswer": "It makes an action noun.",
  "structureDistractors": [
   "It negates coming.",
   "It negates the main description."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ],
  "nominalSubject": "sen",
  "subjectGenitive": "Senin"
 },
 {
  "id": "vn5-04",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Senin gelmemen",
  "main": "önemli",
  "sentence": "Senin gelmemen önemli.",
  "template": "Senin ___ önemli.",
  "answer": "gelmemen",
  "meaning": "It is important that you do not come.",
  "distractors": [
   "It is important that you come.",
   "It is important that I do not come."
  ],
  "form": "contrast_possessive",
  "negationScope": "action",
  "breakdown": "gel + me (negative) + me (action noun) + n (your possessive)",
  "explanation": "The first me negates coming; the second names that negative action. The description önemli stays positive.",
  "structurePrompt": "What do the two -me parts do in gelmemen?",
  "structureAnswer": "First negation, then action noun.",
  "structureDistractors": [
   "First action noun, then main-verb negation.",
   "Both mark negation."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ],
  "nominalSubject": "sen",
  "subjectGenitive": "Senin"
 },
 {
  "id": "vn5-05",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Senin gelmemeni",
  "main": "istiyorum",
  "sentence": "Senin gelmemeni istiyorum.",
  "template": "Senin ___ istiyorum.",
  "answer": "gelmemeni",
  "meaning": "I want you not to come.",
  "distractors": [
   "You want me not to come.",
   "I want you to come."
  ],
  "form": "contrast_possessive",
  "negationScope": "action",
  "breakdown": "gel + me (negative) + me (action noun) + n (your possessive) + i (accusative)",
  "explanation": "Not coming is the action I want. Istiyorum itself is positive.",
  "structurePrompt": "Where is grammatical negation in this sentence?",
  "structureAnswer": "Inside the action noun: not coming.",
  "structureDistractors": [
   "On the main verb: not wanting.",
   "There is no negation."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony"
  ],
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative"
 },
 {
  "id": "vn5-06",
  "lessonId": "negation",
  "stem": "gel",
  "verbMeaning": "come",
  "unit": "Senin gelmeni",
  "main": "istemiyorum",
  "sentence": "Senin gelmeni istemiyorum.",
  "template": "Senin ___ istemiyorum.",
  "answer": "gelmeni",
  "meaning": "I do not want you to come.",
  "distractors": [
   "I want you to come.",
   "You do not want me to come."
  ],
  "form": "contrast_possessive",
  "negationScope": "main",
  "breakdown": "gel + me (action noun) + n (your possessive) + i (accusative); iste + mi (negative before -yor) + yor + um",
  "explanation": "The action noun is positive; negation is in istemiyorum. In everyday use this can convey a similar wish to gelmemeni istiyorum, but its grammatical scope differs.",
  "structurePrompt": "Where is grammatical negation in this sentence?",
  "structureAnswer": "On the main verb: not wanting.",
  "structureDistractors": [
   "Inside the action noun: not coming.",
   "Both clauses are negative."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony"
  ],
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "nominalCase": "accusative"
 },
 {
  "id": "vn5-07",
  "lessonId": "negation",
  "stem": "çık",
  "verbMeaning": "go out",
  "unit": "Bugün dışarı çıkmamak",
  "main": "istiyorum",
  "sentence": "Bugün dışarı çıkmamak istiyorum.",
  "template": "Bugün dışarı ___ istiyorum.",
  "answer": "çıkmamak",
  "meaning": "I want not to go out today.",
  "distractors": [
   "I want to go out today.",
   "You want me not to go out today."
  ],
  "form": "contrast_infinitive",
  "negationScope": "action",
  "breakdown": "çık + ma (negative) + mak (action noun)",
  "explanation": "The explicit negative infinitive names not going out. I am both the person wanting and the person who would go out.",
  "structurePrompt": "What do -ma and -mak do in çıkmamak?",
  "structureAnswer": "-ma negates; -mak makes an action noun.",
  "structureDistractors": [
   "Both endings negate the main verb.",
   "-ma makes an action noun; -mak marks past tense."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn5-08",
  "lessonId": "negation",
  "stem": "çık",
  "verbMeaning": "go out",
  "unit": "Bugün dışarı çıkmak",
  "main": "istemiyorum",
  "sentence": "Bugün dışarı çıkmak istemiyorum.",
  "template": "Bugün dışarı ___ istemiyorum.",
  "answer": "çıkmak",
  "meaning": "I do not want to go out today.",
  "distractors": [
   "I want to go out today.",
   "You do not want me to go out today."
  ],
  "form": "contrast_infinitive",
  "negationScope": "main",
  "breakdown": "çık + mak (action noun); iste + mi (negative before -yor) + yor + um",
  "explanation": "Negation is on wanting. The supplied main verb is negative; do not add negation to the missing action noun.",
  "structurePrompt": "Where is grammatical negation in this sentence?",
  "structureAnswer": "On the main verb: not wanting.",
  "structureDistractors": [
   "Inside the action noun: not going out.",
   "There is no negation."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn5-09",
  "lessonId": "negation",
  "stem": "konuş",
  "verbMeaning": "speak",
  "unit": "Onun yüksek sesle konuşmasını",
  "main": "istiyorum",
  "sentence": "Onun yüksek sesle konuşmasını istiyorum.",
  "template": "Onun yüksek sesle ___ istiyorum.",
  "answer": "konuşmasını",
  "meaning": "I want him/her to speak loudly.",
  "distractors": [
   "I want him/her not to speak loudly.",
   "He/she wants me to speak loudly."
  ],
  "form": "contrast_possessive",
  "negationScope": "none",
  "breakdown": "konuş + ma (action noun) + s + ı (his/her possessive) + n (buffer) + ı (accusative)",
  "explanation": "Ma names speaking; s joins the possessive vowel, and n buffers the outer accusative.",
  "structurePrompt": "What does -ma do in konuşmasını?",
  "structureAnswer": "It makes an action noun.",
  "structureDistractors": [
   "It negates speaking.",
   "It negates wanting."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_s",
   "buffer_n"
  ],
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative"
 },
 {
  "id": "vn5-10",
  "lessonId": "negation",
  "stem": "konuş",
  "verbMeaning": "speak",
  "unit": "Onun yüksek sesle konuşmamasını",
  "main": "istiyorum",
  "sentence": "Onun yüksek sesle konuşmamasını istiyorum.",
  "template": "Onun yüksek sesle ___ istiyorum.",
  "answer": "konuşmamasını",
  "meaning": "I want him/her not to speak loudly.",
  "distractors": [
   "I want him/her to speak loudly.",
   "He/she wants me not to speak loudly."
  ],
  "form": "contrast_possessive",
  "negationScope": "action",
  "breakdown": "konuş + ma (negative) + ma (action noun) + s + ı (his/her possessive) + n (buffer) + ı (accusative)",
  "explanation": "The first ma negates speaking, the second nominalizes it; possession and case follow both.",
  "structurePrompt": "What do the two -ma parts do in konuşmamasını?",
  "structureAnswer": "First negation, then action noun.",
  "structureDistractors": [
   "Both mark possession.",
   "First action noun, then main-verb negation."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony",
   "buffer_s",
   "buffer_n"
  ],
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "nominalCase": "accusative"
 },
 {
  "id": "vn5-11",
  "lessonId": "negation",
  "stem": "unut",
  "verbMeaning": "forget",
  "unit": "Sizin anahtarı unutmamanız",
  "main": "önemli",
  "sentence": "Sizin anahtarı unutmamanız önemli.",
  "template": "Sizin anahtarı ___ önemli.",
  "answer": "unutmamanız",
  "meaning": "It is important that you do not forget the key.",
  "distractors": [
   "It is important that you forget the key.",
   "It is important that I do not forget the key."
  ],
  "form": "contrast_possessive",
  "negationScope": "action",
  "breakdown": "unut + ma (negative) + ma (action noun) + nız (your plural/polite possessive)",
  "explanation": "Not forgetting is the important action. Sizin and nız identify you, plural or polite.",
  "structurePrompt": "What do the two -ma parts do in unutmamanız?",
  "structureAnswer": "First negation, then action noun.",
  "structureDistractors": [
   "First possession, then accusative.",
   "Both negate the main description."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony"
  ],
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin"
 },
 {
  "id": "vn5-12",
  "lessonId": "negation",
  "stem": "çalış",
  "verbMeaning": "work",
  "unit": "Bizim hafta sonu çalışmamamız",
  "main": "gerek",
  "sentence": "Bizim hafta sonu çalışmamamız gerek.",
  "template": "Bizim hafta sonu ___ gerek.",
  "answer": "çalışmamamız",
  "meaning": "We need not to work at the weekend.",
  "distractors": [
   "We need to work at the weekend.",
   "You need not to work at the weekend."
  ],
  "form": "contrast_possessive",
  "negationScope": "action",
  "breakdown": "çalış + ma (negative) + ma (action noun) + mız (our possessive)",
  "explanation": "The requirement is for us not to work, rather than merely an absence of an obligation to work. Gerek stays positive.",
  "structurePrompt": "What is negated here?",
  "structureAnswer": "Working: not working is required.",
  "structureDistractors": [
   "The requirement: working is not required.",
   "Nothing: working is required."
  ],
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "four_way_vowel_harmony"
  ],
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim"
 }
];
