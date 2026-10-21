import type {VerbNounExample} from './verbNouns';
/** Authored drafts, informed by Yeni Hitit 2 §8.2 p.95 and complement-relative
 * grammar support. This first set covers direct-object heads. Not quotations;
 * independent review and exact Ödkem mapping pending. */
export type RelativeForm='dik'|'acak';
export const objectRelativeExamples:VerbNounExample[]=[
 {
  "id": "vn10-01",
  "lessonId": "object_relatives",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "object_relative_dik",
  "relativeClause": "Benim dün okuduğum",
  "relativeHead": "kitap",
  "relativeTime": "past",
  "relativeForm": "dik",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "unit": "Benim dün okuduğum kitap",
  "main": "masada",
  "sentence": "Benim dün okuduğum kitap masada.",
  "template": "Benim dün ___ kitap masada.",
  "answer": "okuduğum",
  "meaning": "The book that I read yesterday is on the table.",
  "distractors": [
   "The book that you read yesterday is on the table.",
   "The book that I will read tomorrow is on the table."
  ],
  "breakdown": "oku + duğ (DIK; k → ğ) + um (my agreement)",
  "structurePrompt": "Who reads, and which noun is described?",
  "structureAnswer": "I read; kitap, the book, is what I read.",
  "structureDistractors": [
   "The book reads; I am the object.",
   "The book’s owner is reading, but the reader is not specified."
  ],
  "explanation": "The descriptive clause “Benim dün okuduğum” comes before “kitap”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Dün gives a past event. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-02",
  "lessonId": "object_relatives",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "object_relative_acak",
  "relativeClause": "Benim yarın okuyacağım",
  "relativeHead": "kitap",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "ben",
  "subjectGenitive": "Benim",
  "unit": "Benim yarın okuyacağım kitap",
  "main": "çantamda",
  "sentence": "Benim yarın okuyacağım kitap çantamda.",
  "template": "Benim yarın ___ kitap çantamda.",
  "answer": "okuyacağım",
  "meaning": "The book that I will read tomorrow is in my bag.",
  "distractors": [
   "The book that you will read tomorrow is in my bag.",
   "The book that I read yesterday is in my bag."
  ],
  "breakdown": "oku + y (buffer) + acağ (future relative; k → ğ) + ım (my agreement)",
  "structurePrompt": "Why is y present in okuyacağım?",
  "structureAnswer": "It joins vowel-final oku to the vowel-initial future suffix.",
  "structureDistractors": [
   "It marks the book as the reader.",
   "It is the outer accusative of a content clause."
  ],
  "explanation": "The descriptive clause “Benim yarın okuyacağım” comes before “kitap”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-03",
  "lessonId": "object_relatives",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "object_relative_dik",
  "relativeClause": "Senin her gün gördüğün",
  "relativeHead": "fotoğraf",
  "relativeTime": "habitual",
  "relativeForm": "dik",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "unit": "Senin her gün gördüğün fotoğraf",
  "main": "duvarda",
  "sentence": "Senin her gün gördüğün fotoğraf duvarda.",
  "template": "Senin her gün ___ fotoğraf duvarda.",
  "answer": "gördüğün",
  "meaning": "The photograph that you see every day is on the wall.",
  "distractors": [
   "The photograph that I see every day is on the wall.",
   "The photograph that you saw only yesterday is on the wall."
  ],
  "breakdown": "gör + düğ (DIK; k → ğ) + ün (your agreement)",
  "structurePrompt": "Does -DIK force a past event in this phrase?",
  "structureAnswer": "No: her gün supplies a habitual reading, and you see the photograph.",
  "structureDistractors": [
   "Yes: -DIK always means yesterday.",
   "No: the photograph is the person seeing."
  ],
  "explanation": "The descriptive clause “Senin her gün gördüğün” comes before “fotoğraf”, which is the object of the embedded action. The genitive subject and agreement identify who acts. The repeated-time phrase gives a habitual reading; -DIK is not automatically past. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-04",
  "lessonId": "object_relatives",
  "stem": "gör",
  "verbMeaning": "see",
  "form": "object_relative_acak",
  "relativeClause": "Senin yarın göreceğin",
  "relativeHead": "fotoğraf",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "sen",
  "subjectGenitive": "Senin",
  "unit": "Senin yarın göreceğin fotoğraf",
  "main": "albümde",
  "sentence": "Senin yarın göreceğin fotoğraf albümde.",
  "template": "Senin yarın ___ fotoğraf albümde.",
  "answer": "göreceğin",
  "meaning": "The photograph that you will see tomorrow is in the album.",
  "distractors": [
   "The photograph that I will see tomorrow is in the album.",
   "The photograph that you saw yesterday is in the album."
  ],
  "breakdown": "gör + eceğ (future relative; k → ğ) + in (your agreement)",
  "structurePrompt": "Which form belongs before the supplied noun fotoğraf?",
  "structureAnswer": "Göreceğin: agreement with senin, with no extra clause-object accusative.",
  "structureDistractors": [
   "Göreceğini: add a clause-object accusative before the noun.",
   "Gören: the photograph itself is doing the seeing."
  ],
  "explanation": "The descriptive clause “Senin yarın göreceğin” comes before “fotoğraf”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-05",
  "lessonId": "object_relatives",
  "stem": "izle",
  "verbMeaning": "watch",
  "form": "object_relative_dik",
  "relativeClause": "Onun dün izlediği",
  "relativeHead": "film",
  "relativeTime": "past",
  "relativeForm": "dik",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "unit": "Onun dün izlediği film",
  "main": "çok uzun",
  "sentence": "Onun dün izlediği film çok uzun.",
  "template": "Onun dün ___ film çok uzun.",
  "answer": "izlediği",
  "meaning": "The film that he/she watched yesterday is very long.",
  "distractors": [
   "The film that I watched yesterday is very long.",
   "The film that he/she will watch tomorrow is very long."
  ],
  "breakdown": "izle + diğ (DIK; k → ğ) + i (his/her agreement)",
  "structurePrompt": "What does final i in izlediği do here?",
  "structureAnswer": "It agrees with onun, the person watching; it is not outer accusative.",
  "structureDistractors": [
   "It is the accusative connecting a whole content clause to biliyorum.",
   "It identifies the film as the person watching."
  ],
  "explanation": "The descriptive clause “Onun dün izlediği” comes before “film”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Dün gives a past event. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-06",
  "lessonId": "object_relatives",
  "stem": "izle",
  "verbMeaning": "watch",
  "form": "object_relative_acak",
  "relativeClause": "Onun yarın izleyeceği",
  "relativeHead": "film",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "o",
  "subjectGenitive": "Onun",
  "unit": "Onun yarın izleyeceği film",
  "main": "komik",
  "sentence": "Onun yarın izleyeceği film komik.",
  "template": "Onun yarın ___ film komik.",
  "answer": "izleyeceği",
  "meaning": "The film that he/she will watch tomorrow is funny.",
  "distractors": [
   "The film that I will watch tomorrow is funny.",
   "The film that he/she watched yesterday is funny."
  ],
  "breakdown": "izle + y (buffer) + eceğ (future relative; k → ğ) + i (his/her agreement)",
  "structurePrompt": "Who will watch, and what will be watched?",
  "structureAnswer": "He/she will watch; film is the object being described.",
  "structureDistractors": [
   "The film will watch; he/she is its object.",
   "The main speaker must watch because every relative clause has a first-person actor."
  ],
  "explanation": "The descriptive clause “Onun yarın izleyeceği” comes before “film”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "buffer_y",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-07",
  "lessonId": "object_relatives",
  "stem": "pişir",
  "verbMeaning": "cook",
  "form": "object_relative_dik",
  "relativeClause": "Bizim her pazar pişirdiğimiz",
  "relativeHead": "yemek",
  "relativeTime": "habitual",
  "relativeForm": "dik",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "unit": "Bizim her pazar pişirdiğimiz yemek",
  "main": "lezzetli",
  "sentence": "Bizim her pazar pişirdiğimiz yemek lezzetli.",
  "template": "Bizim her pazar ___ yemek lezzetli.",
  "answer": "pişirdiğimiz",
  "meaning": "The dish that we cook every Sunday is delicious.",
  "distractors": [
   "The dish that they cook every Sunday is delicious.",
   "The dish that we cooked only yesterday is delicious."
  ],
  "breakdown": "pişir + diğ (DIK; k → ğ) + imiz (our agreement)",
  "structurePrompt": "What does -imiz agree with in pişirdiğimiz?",
  "structureAnswer": "Bizim: we are the cooks; yemek is what we cook.",
  "structureDistractors": [
   "Yemek: the dish is doing the cooking.",
   "The main description lezzetli supplies the actor."
  ],
  "explanation": "The descriptive clause “Bizim her pazar pişirdiğimiz” comes before “yemek”, which is the object of the embedded action. The genitive subject and agreement identify who acts. The repeated-time phrase gives a habitual reading; -DIK is not automatically past. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-08",
  "lessonId": "object_relatives",
  "stem": "pişir",
  "verbMeaning": "cook",
  "form": "object_relative_acak",
  "relativeClause": "Bizim yarın pişireceğimiz",
  "relativeHead": "yemek",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "biz",
  "subjectGenitive": "Bizim",
  "unit": "Bizim yarın pişireceğimiz yemek",
  "main": "etsiz",
  "sentence": "Bizim yarın pişireceğimiz yemek etsiz.",
  "template": "Bizim yarın ___ yemek etsiz.",
  "answer": "pişireceğimiz",
  "meaning": "The dish that we will cook tomorrow is meat-free.",
  "distractors": [
   "The dish that they will cook tomorrow is meat-free.",
   "The dish that we cooked yesterday is meat-free."
  ],
  "breakdown": "pişir + eceğ (future relative; k → ğ) + imiz (our agreement)",
  "structurePrompt": "What is the difference between pişireceğimiz yemek and bu yemeği pişireceğimizi biliyorum?",
  "structureAnswer": "The first describes a dish; the second adds accusative to make the whole content clause the object of knowing.",
  "structureDistractors": [
   "Both require exactly the same final ending before yemek.",
   "The first has no actor, while the second always has a singular actor."
  ],
  "explanation": "The descriptive clause “Bizim yarın pişireceğimiz” comes before “yemek”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-09",
  "lessonId": "object_relatives",
  "stem": "yaz",
  "verbMeaning": "write",
  "form": "object_relative_dik",
  "relativeClause": "Sizin dün yazdığınız",
  "relativeHead": "mektup",
  "relativeTime": "past",
  "relativeForm": "dik",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "unit": "Sizin dün yazdığınız mektup",
  "main": "burada",
  "sentence": "Sizin dün yazdığınız mektup burada.",
  "template": "Sizin dün ___ mektup burada.",
  "answer": "yazdığınız",
  "meaning": "The letter that you wrote yesterday is here.",
  "distractors": [
   "The letter that I wrote yesterday is here.",
   "The letter that you will write tomorrow is here."
  ],
  "breakdown": "yaz + dığ (DIK; k → ğ) + ınız (your plural/polite agreement)",
  "structurePrompt": "Who wrote the letter?",
  "structureAnswer": "Siz, the plural or polite you, identified by sizin and -ınız.",
  "structureDistractors": [
   "The letter wrote something; -ınız describes the letter.",
   "I wrote it; the possessive ending always marks the speaker."
  ],
  "explanation": "The descriptive clause “Sizin dün yazdığınız” comes before “mektup”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Dün gives a past event. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-10",
  "lessonId": "object_relatives",
  "stem": "yaz",
  "verbMeaning": "write",
  "form": "object_relative_acak",
  "relativeClause": "Sizin yarın yazacağınız",
  "relativeHead": "mektup",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "siz",
  "subjectGenitive": "Sizin",
  "unit": "Sizin yarın yazacağınız mektup",
  "main": "önemli",
  "sentence": "Sizin yarın yazacağınız mektup önemli.",
  "template": "Sizin yarın ___ mektup önemli.",
  "answer": "yazacağınız",
  "meaning": "The letter that you will write tomorrow is important.",
  "distractors": [
   "The letter that I will write tomorrow is important.",
   "The letter that you wrote yesterday is important."
  ],
  "breakdown": "yaz + acağ (future relative; k → ğ) + ınız (your plural/polite agreement)",
  "structurePrompt": "What does yarın clarify here?",
  "structureAnswer": "The writing is future; -acak plus agreement describes the letter that you will write.",
  "structureDistractors": [
   "The writing happened yesterday.",
   "The letter itself performs a present writing action."
  ],
  "explanation": "The descriptive clause “Sizin yarın yazacağınız” comes before “mektup”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. The supplied head noun is not the person doing the action.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 },
 {
  "id": "vn10-11",
  "lessonId": "object_relatives",
  "stem": "yap",
  "verbMeaning": "do",
  "form": "object_relative_dik",
  "relativeClause": "Onların her hafta yaptıkları",
  "relativeHead": "ödevler",
  "relativeTime": "habitual",
  "relativeForm": "dik",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "unit": "Onların her hafta yaptıkları ödevler",
  "main": "zor",
  "sentence": "Onların her hafta yaptıkları ödevler zor.",
  "template": "Onların her hafta ___ ödevler zor.",
  "answer": "yaptıkları",
  "meaning": "The assignments that they do every week are difficult.",
  "distractors": [
   "The assignments that we do every week are difficult.",
   "The assignments that they did only yesterday are difficult."
  ],
  "breakdown": "yap + tık (DIK; p requires t, k stays before l) + lar + ı (their agreement)",
  "structurePrompt": "What determines the overt plural agreement in yaptıkları here?",
  "structureAnswer": "Onların identifies the actors; ödevler is the plural object being described.",
  "structureDistractors": [
   "Ödevler is doing the work, so it supplies subject agreement.",
   "Plural objects always require -ları regardless of the actor."
  ],
  "explanation": "The descriptive clause “Onların her hafta yaptıkları” comes before “ödevler”, which is the object of the embedded action. The genitive subject and agreement identify who acts. The repeated-time phrase gives a habitual reading; -DIK is not automatically past. This phrase has no extra clause-object accusative after the agreement. Use overt -ları/-leri agreement with onların in this exercise; singular agreement is also grammatical.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn10-12",
  "lessonId": "object_relatives",
  "stem": "yap",
  "verbMeaning": "do",
  "form": "object_relative_acak",
  "relativeClause": "Onların yarın yapacakları",
  "relativeHead": "ödevler",
  "relativeTime": "future",
  "relativeForm": "acak",
  "nominalSubject": "onlar",
  "subjectGenitive": "Onların",
  "unit": "Onların yarın yapacakları ödevler",
  "main": "kısa",
  "sentence": "Onların yarın yapacakları ödevler kısa.",
  "template": "Onların yarın ___ ödevler kısa.",
  "answer": "yapacakları",
  "meaning": "The assignments that they will do tomorrow are short.",
  "distractors": [
   "The assignments that we will do tomorrow are short.",
   "The assignments that they did yesterday are short."
  ],
  "breakdown": "yap + acak (future relative; k stays before l) + lar + ı (their agreement)",
  "structurePrompt": "Why does k remain in yapacakları?",
  "structureAnswer": "The overt plural agreement starts with consonant l; no extra clause-object case ending follows here.",
  "structureDistractors": [
   "The future relative never softens before vowels.",
   "The plural object forces every k in the sentence to stay unchanged."
  ],
  "explanation": "The descriptive clause “Onların yarın yapacakları” comes before “ödevler”, which is the object of the embedded action. The genitive subject and agreement identify who acts. Yarın gives a future context, expressed by -(y)AcAK plus agreement. This phrase has no extra clause-object accusative after the agreement. Use overt -ları/-leri agreement with onların in this exercise; singular agreement is also grammatical.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony"
  ]
 }
];
