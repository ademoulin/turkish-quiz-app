import type {VerbNounExample} from './verbNouns';
/** Newly authored drafts, informed by Yeni Hitit 2 §8.1 p.91 and
 * Grammar Support: subject participles. Not textbook quotations.
 * Independent linguistic review and exact Ödkem mapping pending. */
export type RelativeTime='past'|'current'|'habitual'|'future';
export const subjectRelativeExamples:VerbNounExample[]=[
 {
  "id": "vn9-01",
  "lessonId": "subject_relatives",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda kitap okuyan",
  "relativeHead": "öğrenci",
  "relativeTime": "current",
  "unit": "Şu anda kitap okuyan öğrenci",
  "main": "burada",
  "sentence": "Şu anda kitap okuyan öğrenci burada.",
  "template": "Şu anda kitap ___ öğrenci burada.",
  "answer": "okuyan",
  "meaning": "The student reading a book right now is here.",
  "distractors": [
   "The book reading a student is here.",
   "The student who read a book yesterday is here."
  ],
  "breakdown": "oku + y (buffer) + an (subject-relative participle)",
  "structurePrompt": "Who reads the book?",
  "structureAnswer": "Öğrenci, the student, reads it.",
  "structureDistractors": [
   "Kitap, the book, reads the student.",
   "The speaker reads it; the student is only the object."
  ],
  "explanation": "The descriptive clause “Şu anda kitap okuyan” comes before “öğrenci”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn9-02",
  "lessonId": "subject_relatives",
  "stem": "bekle",
  "verbMeaning": "wait",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda kapının önünde bekleyen",
  "relativeHead": "insanlar",
  "relativeTime": "current",
  "unit": "Şu anda kapının önünde bekleyen insanlar",
  "main": "sakin",
  "sentence": "Şu anda kapının önünde bekleyen insanlar sakin.",
  "template": "Şu anda kapının önünde ___ insanlar sakin.",
  "answer": "bekleyen",
  "meaning": "The people waiting in front of the door right now are calm.",
  "distractors": [
   "The door waiting for people is calm.",
   "The people who waited here yesterday are calm."
  ],
  "breakdown": "bekle + y (buffer) + en (subject-relative participle)",
  "structurePrompt": "Why is bekleyen not plural here?",
  "structureAnswer": "İnsanlar carries plural; the participle stays bekleyen.",
  "structureDistractors": [
   "The people must be singular because bekleyen has no plural ending.",
   "Plural people require bekleyenler before insanlar."
  ],
  "explanation": "The descriptive clause “Şu anda kapının önünde bekleyen” comes before “insanlar”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn9-03",
  "lessonId": "subject_relatives",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda parkta yürüyen",
  "relativeHead": "kadın",
  "relativeTime": "current",
  "unit": "Şu anda parkta yürüyen kadın",
  "main": "komşum",
  "sentence": "Şu anda parkta yürüyen kadın komşum.",
  "template": "Şu anda parkta ___ kadın komşum.",
  "answer": "yürüyen",
  "meaning": "The woman walking in the park right now is my neighbor.",
  "distractors": [
   "The woman who walked in the park yesterday is my neighbor.",
   "The woman watching someone walk is my neighbor."
  ],
  "breakdown": "yürü + y (buffer) + en (subject-relative participle)",
  "structurePrompt": "Which noun performs the walking action?",
  "structureAnswer": "Kadın, the woman described by the preceding clause.",
  "structureDistractors": [
   "Park, the place where the action happens.",
   "The speaker, because all participles have a first-person subject."
  ],
  "explanation": "The descriptive clause “Şu anda parkta yürüyen” comes before “kadın”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn9-04",
  "lessonId": "subject_relatives",
  "stem": "uyu",
  "verbMeaning": "sleep",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda odada uyuyan",
  "relativeHead": "bebek",
  "relativeTime": "current",
  "unit": "Şu anda odada uyuyan bebek",
  "main": "sessiz",
  "sentence": "Şu anda odada uyuyan bebek sessiz.",
  "template": "Şu anda odada ___ bebek sessiz.",
  "answer": "uyuyan",
  "meaning": "The baby sleeping in the room right now is quiet.",
  "distractors": [
   "The baby who slept here yesterday is quiet.",
   "The baby watching someone sleep is quiet."
  ],
  "breakdown": "uyu + y (buffer) + an (subject-relative participle)",
  "structurePrompt": "What does the clause before bebek do?",
  "structureAnswer": "It describes the baby as the one sleeping in the room.",
  "structureDistractors": [
   "It says that the room is sleeping.",
   "It identifies the baby as the object of someone else’s sleeping."
  ],
  "explanation": "The descriptive clause “Şu anda odada uyuyan” comes before “bebek”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn9-05",
  "lessonId": "subject_relatives",
  "stem": "gel",
  "verbMeaning": "come",
  "form": "subject_relative_an",
  "relativeClause": "Dün bize gelen",
  "relativeHead": "misafir",
  "relativeTime": "past",
  "unit": "Dün bize gelen misafir",
  "main": "şimdi evinde",
  "sentence": "Dün bize gelen misafir şimdi evinde.",
  "template": "Dün bize ___ misafir şimdi evinde.",
  "answer": "gelen",
  "meaning": "The guest who came to us yesterday is now at home.",
  "distractors": [
   "The guest coming to us right now is at home.",
   "The guest whom we visited yesterday is now at home."
  ],
  "breakdown": "gel + en (subject-relative participle)",
  "structurePrompt": "When did the guest come in this sentence?",
  "structureAnswer": "Yesterday: dün supplies the past context.",
  "structureDistractors": [
   "Right now: -en always means present time.",
   "Tomorrow: -en always means future time."
  ],
  "explanation": "The descriptive clause “Dün bize gelen” comes before “misafir”. That noun performs the embedded action. Dün gives a past context; -(y)An does not automatically mean present time. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-06",
  "lessonId": "subject_relatives",
  "stem": "kazan",
  "verbMeaning": "win",
  "form": "subject_relative_an",
  "relativeClause": "Dün yarışmayı kazanan",
  "relativeHead": "sporcu",
  "relativeTime": "past",
  "unit": "Dün yarışmayı kazanan sporcu",
  "main": "bugün burada",
  "sentence": "Dün yarışmayı kazanan sporcu bugün burada.",
  "template": "Dün yarışmayı ___ sporcu bugün burada.",
  "answer": "kazanan",
  "meaning": "The athlete who won the competition yesterday is here today.",
  "distractors": [
   "The athlete winning the competition right now is here today.",
   "The athlete whom the competition defeated is here today."
  ],
  "breakdown": "kazan + an (subject-relative participle)",
  "structurePrompt": "Who won, and when?",
  "structureAnswer": "The athlete won yesterday; dün gives the time.",
  "structureDistractors": [
   "The competition won yesterday.",
   "The athlete must be winning now because the suffix is -an."
  ],
  "explanation": "The descriptive clause “Dün yarışmayı kazanan” comes before “sporcu”. That noun performs the embedded action. Dün gives a past context; -(y)An does not automatically mean present time. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-07",
  "lessonId": "subject_relatives",
  "stem": "koş",
  "verbMeaning": "run",
  "form": "subject_relative_an",
  "relativeClause": "Her sabah burada koşan",
  "relativeHead": "adam",
  "relativeTime": "habitual",
  "unit": "Her sabah burada koşan adam",
  "main": "çok hızlı",
  "sentence": "Her sabah burada koşan adam çok hızlı.",
  "template": "Her sabah burada ___ adam çok hızlı.",
  "answer": "koşan",
  "meaning": "The man who runs here every morning is very fast.",
  "distractors": [
   "The man who ran here only yesterday is very fast.",
   "The man watching someone run is very fast."
  ],
  "breakdown": "koş + an (subject-relative participle)",
  "structurePrompt": "What establishes a repeated activity here?",
  "structureAnswer": "Her sabah gives a habit; the man is the runner.",
  "structureDistractors": [
   "-an by itself means every morning.",
   "Adam means yesterday, so this is one past run."
  ],
  "explanation": "The descriptive clause “Her sabah burada koşan” comes before “adam”. That noun performs the embedded action. The repeated-time phrase gives a habitual context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-08",
  "lessonId": "subject_relatives",
  "stem": "çalış",
  "verbMeaning": "work",
  "form": "subject_relative_an",
  "relativeClause": "Her gün bu kafede çalışan",
  "relativeHead": "öğrenciler",
  "relativeTime": "habitual",
  "unit": "Her gün bu kafede çalışan öğrenciler",
  "main": "meşgul",
  "sentence": "Her gün bu kafede çalışan öğrenciler meşgul.",
  "template": "Her gün bu kafede ___ öğrenciler meşgul.",
  "answer": "çalışan",
  "meaning": "The students who work in this café every day are busy.",
  "distractors": [
   "The students who worked here only yesterday are busy.",
   "The café where no students work is busy."
  ],
  "breakdown": "çalış + an (subject-relative participle)",
  "structurePrompt": "Which word carries the plural ending?",
  "structureAnswer": "Öğrenciler is plural; çalışan stays unchanged before it.",
  "structureDistractors": [
   "Çalışan must become çalışanlar before öğrenciler.",
   "The plural belongs to kafede, the café."
  ],
  "explanation": "The descriptive clause “Her gün bu kafede çalışan” comes before “öğrenciler”. That noun performs the embedded action. The repeated-time phrase gives a habitual context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-09",
  "lessonId": "subject_relatives",
  "stem": "dinle",
  "verbMeaning": "listen to",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda müzik dinleyen",
  "relativeHead": "çocuk",
  "relativeTime": "current",
  "unit": "Şu anda müzik dinleyen çocuk",
  "main": "mutlu",
  "sentence": "Şu anda müzik dinleyen çocuk mutlu.",
  "template": "Şu anda müzik ___ çocuk mutlu.",
  "answer": "dinleyen",
  "meaning": "The child listening to music right now is happy.",
  "distractors": [
   "The music listening to the child is happy.",
   "The child who listened to music yesterday is happy."
  ],
  "breakdown": "dinle + y (buffer) + en (subject-relative participle)",
  "structurePrompt": "Who listens, and what is listened to?",
  "structureAnswer": "The child listens; music is inside the descriptive clause as the object.",
  "structureDistractors": [
   "Music listens; the child is its object.",
   "The speaker listens; the child only knows about it."
  ],
  "explanation": "The descriptive clause “Şu anda müzik dinleyen” comes before “çocuk”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn9-10",
  "lessonId": "subject_relatives",
  "stem": "bak",
  "verbMeaning": "look at",
  "form": "subject_relative_an",
  "relativeClause": "Şu anda resme bakan",
  "relativeHead": "kız",
  "relativeTime": "current",
  "unit": "Şu anda resme bakan kız",
  "main": "kardeşim",
  "sentence": "Şu anda resme bakan kız kardeşim.",
  "template": "Şu anda resme ___ kız kardeşim.",
  "answer": "bakan",
  "meaning": "The girl looking at the picture right now is my sister.",
  "distractors": [
   "The picture looking at the girl is my sister.",
   "The girl who looked at the picture yesterday is my sister."
  ],
  "breakdown": "bak + an (subject-relative participle)",
  "structurePrompt": "What comes before the noun kız?",
  "structureAnswer": "The whole descriptive clause Şu anda resme bakan.",
  "structureDistractors": [
   "Only the word resme, which is the person acting.",
   "A separate genitive subject and possessive agreement on bakan."
  ],
  "explanation": "The descriptive clause “Şu anda resme bakan” comes before “kız”. That noun performs the embedded action. Şu anda gives a current-time context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-11",
  "lessonId": "subject_relatives",
  "stem": "otur",
  "verbMeaning": "sit",
  "form": "subject_relative_an",
  "relativeClause": "Her akşam balkonda oturan",
  "relativeHead": "adam",
  "relativeTime": "habitual",
  "unit": "Her akşam balkonda oturan adam",
  "main": "komşum",
  "sentence": "Her akşam balkonda oturan adam komşum.",
  "template": "Her akşam balkonda ___ adam komşum.",
  "answer": "oturan",
  "meaning": "The man who sits on the balcony every evening is my neighbor.",
  "distractors": [
   "The man who sat there only yesterday is my neighbor.",
   "The man watching someone sit there is my neighbor."
  ],
  "breakdown": "otur + an (subject-relative participle)",
  "structurePrompt": "Who sits on the balcony?",
  "structureAnswer": "The following noun adam identifies the person sitting.",
  "structureDistractors": [
   "Balkon identifies the person sitting.",
   "The main speaker must be sitting because oturan ends in n."
  ],
  "explanation": "The descriptive clause “Her akşam balkonda oturan” comes before “adam”. That noun performs the embedded action. The repeated-time phrase gives a habitual context. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn9-12",
  "lessonId": "subject_relatives",
  "stem": "git",
  "verbMeaning": "go",
  "form": "subject_relative_an",
  "relativeClause": "Dün eve giden",
  "relativeHead": "çocuk",
  "relativeTime": "past",
  "unit": "Dün eve giden çocuk",
  "main": "bugün okulda",
  "sentence": "Dün eve giden çocuk bugün okulda.",
  "template": "Dün eve ___ çocuk bugün okulda.",
  "answer": "giden",
  "meaning": "The child who went home yesterday is at school today.",
  "distractors": [
   "The child going home right now is at school today.",
   "The child whom we took home yesterday is at school today."
  ],
  "breakdown": "git → gid (stem softening) + en (subject-relative participle)",
  "structurePrompt": "Does giden force a present-time interpretation here?",
  "structureAnswer": "No: dün puts the going yesterday; the child is the one who went.",
  "structureDistractors": [
   "Yes: -en always means the action happens right now.",
   "No: the child is the object of someone else’s going."
  ],
  "explanation": "The descriptive clause “Dün eve giden” comes before “çocuk”. That noun performs the embedded action. Dün gives a past context; -(y)An does not automatically mean present time. The participle takes neither person agreement nor a plural ending in these phrases; the supplied noun carries its own number.",
  "supportingRuleIds": [
   "two_way_vowel_harmony",
   "consonant_softening"
  ]
 }
];
