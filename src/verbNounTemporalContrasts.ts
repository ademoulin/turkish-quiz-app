import type {VerbNounExample} from './verbNouns';
/** Authored paired contrasts, informed by Yeni Hitit 1 §10.3 p.130 /
 * support p.170 and Yeni Hitit 2 §§3.3 (p.38), 9.2 (p.107).
 * Explicit requested constructions avoid judging overlapping paraphrases.
 * Independent review and exact Ödkem mapping pending. */
export const temporalContrastExamples:VerbNounExample[]=[
 {
  "id": "vn11h-01",
  "lessonId": "temporal_contrasts",
  "stem": "dön",
  "verbMeaning": "return",
  "form": "choose_time_connection",
  "kenBase": "döner",
  "temporalIntent": "My stop at the shop comes first; my return home comes later. Express this with the explicit BEFORE construction.",
  "temporalRelation": "before",
  "temporalSubject": "ben",
  "mainSubject": "ben",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "ben eve dönmeden önce",
  "unit": "Dün ben eve dönmeden önce",
  "main": "markete uğradım",
  "sentence": "Dün ben eve dönmeden önce markete uğradım.",
  "template": "Dün ben eve ___ markete uğradım.",
  "answer": "dönmeden önce",
  "meaning": "I stopped at the shop yesterday before returning home.",
  "distractors": [
   "I stopped at the shop yesterday after returning home.",
   "You stopped at the shop yesterday before I returned home."
  ],
  "structurePrompt": "Intended message: I stopped at the shop yesterday before returning home. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-mAdAn önce · explicit before",
  "structureChoices": [
   {
    "id": "target",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-1",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "dön + meden + önce",
  "explanation": "The requested construction is -mAdAn önce · explicit before. My stop at the shop comes first; my return home comes later. Express this with the explicit BEFORE construction. Time-clause subject: ben; main-clause subject: ben. They are the same person/group. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11h-02",
  "lessonId": "temporal_contrasts",
  "stem": "dön",
  "verbMeaning": "return",
  "form": "choose_time_connection",
  "kenBase": "döner",
  "temporalIntent": "My return home comes first; my stop at the shop follows. Express the order with the explicit AFTER construction.",
  "temporalRelation": "after",
  "temporalSubject": "ben",
  "mainSubject": "ben",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "ben eve döndükten sonra",
  "unit": "Dün ben eve döndükten sonra",
  "main": "markete uğradım",
  "sentence": "Dün ben eve döndükten sonra markete uğradım.",
  "template": "Dün ben eve ___ markete uğradım.",
  "answer": "döndükten sonra",
  "meaning": "I stopped at the shop yesterday after returning home.",
  "distractors": [
   "I stopped at the shop yesterday before returning home.",
   "You stopped at the shop yesterday after I returned home."
  ],
  "structurePrompt": "Intended message: I stopped at the shop yesterday after returning home. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-DIktAn sonra · explicit after",
  "structureChoices": [
   {
    "id": "target",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "dön + dük + ten + sonra",
  "explanation": "The requested construction is -DIktAn sonra · explicit after. My return home comes first; my stop at the shop follows. Express the order with the explicit AFTER construction. Time-clause subject: ben; main-clause subject: ben. They are the same person/group. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11h-03",
  "lessonId": "temporal_contrasts",
  "stem": "gönder",
  "verbMeaning": "send",
  "form": "choose_time_connection",
  "kenBase": "gönderir",
  "temporalIntent": "The meeting starts first; you send the report later. Use the explicit BEFORE construction.",
  "temporalRelation": "before",
  "temporalSubject": "sen",
  "mainSubject": "o",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "sen raporu göndermeden önce",
  "unit": "Yarın sen raporu göndermeden önce",
  "main": "o toplantıyı başlatacak",
  "sentence": "Yarın sen raporu göndermeden önce o toplantıyı başlatacak.",
  "template": "Yarın sen raporu ___ o toplantıyı başlatacak.",
  "answer": "göndermeden önce",
  "meaning": "Tomorrow, they will start the meeting before you send the report.",
  "distractors": [
   "Tomorrow, they will start the meeting after you send the report.",
   "Tomorrow, you will start the meeting before they send the report."
  ],
  "structurePrompt": "Intended message: Tomorrow, they will start the meeting before you send the report. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-mAdAn önce · explicit before",
  "structureChoices": [
   {
    "id": "target",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-1",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "gönder + meden + önce",
  "explanation": "The requested construction is -mAdAn önce · explicit before. The meeting starts first; you send the report later. Use the explicit BEFORE construction. Time-clause subject: sen; main-clause subject: o. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11h-04",
  "lessonId": "temporal_contrasts",
  "stem": "gönder",
  "verbMeaning": "send",
  "form": "choose_time_connection",
  "kenBase": "gönderir",
  "temporalIntent": "Use your sending as the reference event for starting the meeting. Phrase it with the WHEN/ONCE construction, without a separate before/after word.",
  "temporalRelation": "when",
  "temporalSubject": "sen",
  "mainSubject": "o",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "sen raporu gönderince",
  "unit": "Yarın sen raporu gönderince",
  "main": "o toplantıyı başlatacak",
  "sentence": "Yarın sen raporu gönderince o toplantıyı başlatacak.",
  "template": "Yarın sen raporu ___ o toplantıyı başlatacak.",
  "answer": "gönderince",
  "meaning": "Tomorrow, they will start the meeting when you send the report.",
  "distractors": [
   "Tomorrow, they will start the meeting before you send the report.",
   "Tomorrow, you will start the meeting when they send the report."
  ],
  "structurePrompt": "Intended message: Tomorrow, they will start the meeting when you send the report. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-(y)IncA · when/once",
  "structureChoices": [
   {
    "id": "target",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "gönder + ince",
  "explanation": "The requested construction is -(y)IncA · when/once. Use your sending as the reference event for starting the meeting. Phrase it with the WHEN/ONCE construction, without a separate before/after word. Time-clause subject: sen; main-clause subject: o. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11h-05",
  "lessonId": "temporal_contrasts",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "choose_time_connection",
  "kenBase": "okur",
  "temporalIntent": "Your note-taking comes first; O reads later. Use the explicit BEFORE construction.",
  "temporalRelation": "before",
  "temporalSubject": "o",
  "mainSubject": "siz",
  "temporalTime": "habitual",
  "converbLead": "Her hafta",
  "converbClause": "o kitabı okumadan önce",
  "unit": "Her hafta o kitabı okumadan önce",
  "main": "siz not alıyorsunuz",
  "sentence": "Her hafta o kitabı okumadan önce siz not alıyorsunuz.",
  "template": "Her hafta o kitabı ___ siz not alıyorsunuz.",
  "answer": "okumadan önce",
  "meaning": "Every week, you take notes before they read the book.",
  "distractors": [
   "Every week, you take notes after they read the book.",
   "Every week, they take notes before you read the book."
  ],
  "structurePrompt": "Intended message: Every week, you take notes before they read the book. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-mAdAn önce · explicit before",
  "structureChoices": [
   {
    "id": "target",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-1",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "oku + madan + önce",
  "explanation": "The requested construction is -mAdAn önce · explicit before. Your note-taking comes first; O reads later. Use the explicit BEFORE construction. Time-clause subject: o; main-clause subject: siz. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "two_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11h-06",
  "lessonId": "temporal_contrasts",
  "stem": "oku",
  "verbMeaning": "read",
  "form": "choose_time_connection",
  "kenBase": "okur",
  "temporalIntent": "Your note-taking occurs during the ongoing reading interval. Use the WHILE/DURING construction.",
  "temporalRelation": "while",
  "temporalSubject": "o",
  "mainSubject": "siz",
  "temporalTime": "habitual",
  "converbLead": "Her hafta",
  "converbClause": "o kitabı okurken",
  "unit": "Her hafta o kitabı okurken",
  "main": "siz not alıyorsunuz",
  "sentence": "Her hafta o kitabı okurken siz not alıyorsunuz.",
  "template": "Her hafta o kitabı ___ siz not alıyorsunuz.",
  "answer": "okurken",
  "meaning": "Every week, you take notes while they are reading the book.",
  "distractors": [
   "Every week, you take notes after they finish reading the book.",
   "Every week, they take notes while you are reading the book."
  ],
  "structurePrompt": "Intended message: Every week, you take notes while they are reading the book. Choose the named construction requested by the timing cue.",
  "structureAnswer": "Linking base + -ken · while/during",
  "structureChoices": [
   {
    "id": "target",
    "text": "Linking base + -ken · while/during"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "-(y)IncA · when/once"
   }
  ],
  "breakdown": "okur (supplied linking base) + ken",
  "explanation": "The requested construction is Linking base + -ken · while/during. Your note-taking occurs during the ongoing reading interval. Use the WHILE/DURING construction. Time-clause subject: o; main-clause subject: siz. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": []
 },
 {
  "id": "vn11h-07",
  "lessonId": "temporal_contrasts",
  "stem": "bitir",
  "verbMeaning": "finish",
  "form": "choose_time_connection",
  "kenBase": "bitirir",
  "temporalIntent": "Finishing comes first; resting follows. Express the order with the explicit AFTER construction.",
  "temporalRelation": "after",
  "temporalSubject": "biz",
  "mainSubject": "biz",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "biz ödevi bitirdikten sonra",
  "unit": "Dün biz ödevi bitirdikten sonra",
  "main": "dinlendik",
  "sentence": "Dün biz ödevi bitirdikten sonra dinlendik.",
  "template": "Dün biz ödevi ___ dinlendik.",
  "answer": "bitirdikten sonra",
  "meaning": "We rested yesterday after finishing the homework.",
  "distractors": [
   "We rested yesterday before finishing the homework.",
   "They rested yesterday after we finished the homework."
  ],
  "structurePrompt": "Intended message: We rested yesterday after finishing the homework. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-DIktAn sonra · explicit after",
  "structureChoices": [
   {
    "id": "target",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "bitir + dik + ten + sonra",
  "explanation": "The requested construction is -DIktAn sonra · explicit after. Finishing comes first; resting follows. Express the order with the explicit AFTER construction. Time-clause subject: biz; main-clause subject: biz. They are the same person/group. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11h-08",
  "lessonId": "temporal_contrasts",
  "stem": "bitir",
  "verbMeaning": "finish",
  "form": "choose_time_connection",
  "kenBase": "bitirir",
  "temporalIntent": "Use finishing as the reference event for resting. Phrase it with WHEN/ONCE, without a separate before/after word.",
  "temporalRelation": "when",
  "temporalSubject": "biz",
  "mainSubject": "biz",
  "temporalTime": "past",
  "converbLead": "Dün",
  "converbClause": "biz ödevi bitirince",
  "unit": "Dün biz ödevi bitirince",
  "main": "dinlendik",
  "sentence": "Dün biz ödevi bitirince dinlendik.",
  "template": "Dün biz ödevi ___ dinlendik.",
  "answer": "bitirince",
  "meaning": "We rested yesterday when we finished the homework.",
  "distractors": [
   "We rested yesterday before we finished the homework.",
   "They rested yesterday when we finished the homework."
  ],
  "structurePrompt": "Intended message: We rested yesterday when we finished the homework. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-(y)IncA · when/once",
  "structureChoices": [
   {
    "id": "target",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "bitir + ince",
  "explanation": "The requested construction is -(y)IncA · when/once. Use finishing as the reference event for resting. Phrase it with WHEN/ONCE, without a separate before/after word. Time-clause subject: biz; main-clause subject: biz. They are the same person/group. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony"
  ]
 },
 {
  "id": "vn11h-09",
  "lessonId": "temporal_contrasts",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "choose_time_connection",
  "kenBase": "yürür",
  "temporalIntent": "Your walk is completed first; their call follows. Use the explicit AFTER construction.",
  "temporalRelation": "after",
  "temporalSubject": "siz",
  "mainSubject": "onlar",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "siz istasyona yürüdükten sonra",
  "unit": "Yarın siz istasyona yürüdükten sonra",
  "main": "onlar sizi arayacaklar",
  "sentence": "Yarın siz istasyona yürüdükten sonra onlar sizi arayacaklar.",
  "template": "Yarın siz istasyona ___ onlar sizi arayacaklar.",
  "answer": "yürüdükten sonra",
  "meaning": "Tomorrow, they will call you after you finish walking to the station.",
  "distractors": [
   "Tomorrow, they will call you before you walk to the station.",
   "Tomorrow, you will call them after they walk to the station."
  ],
  "structurePrompt": "Intended message: Tomorrow, they will call you after you finish walking to the station. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-DIktAn sonra · explicit after",
  "structureChoices": [
   {
    "id": "target",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "yürü + dük + ten + sonra",
  "explanation": "The requested construction is -DIktAn sonra · explicit after. Your walk is completed first; their call follows. Use the explicit AFTER construction. Time-clause subject: siz; main-clause subject: onlar. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "two_way_vowel_harmony",
   "voiceless_assimilation"
  ]
 },
 {
  "id": "vn11h-10",
  "lessonId": "temporal_contrasts",
  "stem": "yürü",
  "verbMeaning": "walk",
  "form": "choose_time_connection",
  "kenBase": "yürür",
  "temporalIntent": "Their call occurs during your ongoing walk. Use the WHILE/DURING construction; the call need not last for the whole walk.",
  "temporalRelation": "while",
  "temporalSubject": "siz",
  "mainSubject": "onlar",
  "temporalTime": "future",
  "converbLead": "Yarın",
  "converbClause": "siz istasyona yürürken",
  "unit": "Yarın siz istasyona yürürken",
  "main": "onlar sizi arayacaklar",
  "sentence": "Yarın siz istasyona yürürken onlar sizi arayacaklar.",
  "template": "Yarın siz istasyona ___ onlar sizi arayacaklar.",
  "answer": "yürürken",
  "meaning": "Tomorrow, they will call you while you are walking to the station.",
  "distractors": [
   "Tomorrow, they will call you after you finish walking to the station.",
   "Tomorrow, you will call them while they are walking to the station."
  ],
  "structurePrompt": "Intended message: Tomorrow, they will call you while you are walking to the station. Choose the named construction requested by the timing cue.",
  "structureAnswer": "Linking base + -ken · while/during",
  "structureChoices": [
   {
    "id": "target",
    "text": "Linking base + -ken · while/during"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "-(y)IncA · when/once"
   }
  ],
  "breakdown": "yürür (supplied linking base) + ken",
  "explanation": "The requested construction is Linking base + -ken · while/during. Their call occurs during your ongoing walk. Use the WHILE/DURING construction; the call need not last for the whole walk. Time-clause subject: siz; main-clause subject: onlar. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": []
 },
 {
  "id": "vn11h-11",
  "lessonId": "temporal_contrasts",
  "stem": "izle",
  "verbMeaning": "watch",
  "form": "choose_time_connection",
  "kenBase": "izler",
  "temporalIntent": "Use their viewing as the reference event for your note-taking. Choose the WHEN/ONCE construction, without a separate before/after word.",
  "temporalRelation": "when",
  "temporalSubject": "onlar",
  "mainSubject": "sen",
  "temporalTime": "habitual",
  "converbLead": "Her derste",
  "converbClause": "onlar videoyu izleyince",
  "unit": "Her derste onlar videoyu izleyince",
  "main": "sen not alıyorsun",
  "sentence": "Her derste onlar videoyu izleyince sen not alıyorsun.",
  "template": "Her derste onlar videoyu ___ sen not alıyorsun.",
  "answer": "izleyince",
  "meaning": "In every lesson, you take notes when they watch the video.",
  "distractors": [
   "In every lesson, you take notes before they watch the video.",
   "In every lesson, they take notes when you watch the video."
  ],
  "structurePrompt": "Intended message: In every lesson, you take notes when they watch the video. Choose the named construction requested by the timing cue.",
  "structureAnswer": "-(y)IncA · when/once",
  "structureChoices": [
   {
    "id": "target",
    "text": "-(y)IncA · when/once"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "Linking base + -ken · while/during"
   }
  ],
  "breakdown": "izle + y (buffer) + ince",
  "explanation": "The requested construction is -(y)IncA · when/once. Use their viewing as the reference event for your note-taking. Choose the WHEN/ONCE construction, without a separate before/after word. Time-clause subject: onlar; main-clause subject: sen. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": [
   "four_way_vowel_harmony",
   "buffer_y"
  ]
 },
 {
  "id": "vn11h-12",
  "lessonId": "temporal_contrasts",
  "stem": "izle",
  "verbMeaning": "watch",
  "form": "choose_time_connection",
  "kenBase": "izler",
  "temporalIntent": "Your note-taking occurs during their ongoing viewing interval. Use the WHILE/DURING construction.",
  "temporalRelation": "while",
  "temporalSubject": "onlar",
  "mainSubject": "sen",
  "temporalTime": "habitual",
  "converbLead": "Her derste",
  "converbClause": "onlar videoyu izlerken",
  "unit": "Her derste onlar videoyu izlerken",
  "main": "sen not alıyorsun",
  "sentence": "Her derste onlar videoyu izlerken sen not alıyorsun.",
  "template": "Her derste onlar videoyu ___ sen not alıyorsun.",
  "answer": "izlerken",
  "meaning": "In every lesson, you take notes while they are watching the video.",
  "distractors": [
   "In every lesson, you take notes after they finish watching the video.",
   "In every lesson, they take notes while you are watching the video."
  ],
  "structurePrompt": "Intended message: In every lesson, you take notes while they are watching the video. Choose the named construction requested by the timing cue.",
  "structureAnswer": "Linking base + -ken · while/during",
  "structureChoices": [
   {
    "id": "target",
    "text": "Linking base + -ken · while/during"
   },
   {
    "id": "other-1",
    "text": "-mAdAn önce · explicit before"
   },
   {
    "id": "other-2",
    "text": "-DIktAn sonra · explicit after"
   },
   {
    "id": "other-3",
    "text": "-(y)IncA · when/once"
   }
  ],
  "breakdown": "izler (supplied linking base) + ken",
  "explanation": "The requested construction is Linking base + -ken · while/during. Your note-taking occurs during their ongoing viewing interval. Use the WHILE/DURING construction. Time-clause subject: onlar; main-clause subject: sen. Keep the two clause subjects separate. These guided tasks grade the requested wording; another grammatical paraphrase may convey overlapping timing. When/once does not itself guarantee immediacy or causation. The main verb is supplied.",
  "supportingRuleIds": []
 }
];
