import {contrastExamples,type NominalConstruction} from './verbNounContrasts';
import {contentFutureExamples} from './verbNounContentFuture';
import {contentDikExamples,type ContentTime} from './verbNounContentDik';
import {negationExamples,type NegationScope} from './verbNounNegation';
import {clauseCaseExamples,type NominalCase} from './verbNounClauseCases';
import {subjectExamples,nominalSubjects,type NominalSubject} from './verbNounSubjects';
/** Newly authored lesson content, not quotations. Yeni Hitit 1 §12.1 p.145
 * and §12.2 p.149 guide scope. Independent review and exact Ödkem mapping pending.
 * Finite predicates are supplied; production targets nominalized forms. */
export const verbNounLessons = {
 activity: '1 · Actions as nouns',
 cases: '2 · Action nouns with case endings',
 subjects: '3 · The action has its own subject',
 clause_cases: '4 · Case endings on the whole clause',
 negation: '5 · Negation and meaningful contrasts',
 content_dik: '6 · -DIK: facts inside a sentence',
 content_future: '7 · -(y)AcAK: future inside a sentence',
 contrasts: '8 · Choose -mA, -DIK or -(y)AcAK',
} as const;
export type VerbNounLesson = keyof typeof verbNounLessons;
export const verbNounTasks = {meaning:'Understand the meaning',structure:'Unpack the structure',type:'Build the action noun'} as const;
export type VerbNounTask = keyof typeof verbNounTasks;
export const verbNounConcepts = {
 vn_contrasts_meaning:'Nominalizer contrasts · meaning',vn_contrasts_structure:'Nominalizer contrasts · construction choice',vn_contrasts_type:'Nominalizer contrasts · production',
 vn_content_future_meaning:'Future content clause · meaning',vn_content_future_structure:'Future content clause · subject, suffix and viewpoint',vn_content_future_type:'Future content clause · production',
 vn_content_dik_meaning:'-DIK content clause · meaning',vn_content_dik_structure:'-DIK content clause · subject, suffix and time',vn_content_dik_type:'-DIK content clause · production',
 vn_negation_meaning:'Negation contrasts · meaning',vn_negation_structure:'Negation contrasts · suffix role and scope',vn_negation_type:'Negation contrasts · production',
 vn_activity_meaning:'Activity noun · meaning',vn_activity_structure:'Activity noun · structure',vn_activity_type:'Activity noun · production',
 vn_cases_meaning:'Action noun + case · meaning',vn_cases_structure:'Action noun + case · structure',vn_cases_type:'Action noun + case · production',
 vn_clause_cases_meaning:'Whole clause + case · meaning',vn_clause_cases_structure:'Whole clause + case · connection',vn_clause_cases_type:'Whole clause + case · production',
 vn_subjects_meaning:'Action subject · meaning',vn_subjects_structure:'Action subject · who acts',vn_subjects_type:'Action subject · production',
} as const;
export type VerbNounConcept = keyof typeof verbNounConcepts;
export type NominalForm = 'choose_nominalizer'|'future_possessive_case'|'dik_possessive_case'|'contrast_infinitive'|'contrast_possessive'|'mak_mek'|'ma_accusative'|'ma_dative'|'mak_ablative'|'ma_possessive'|'ma_possessive_case';
export interface VerbNounExample {
 nominalConstruction?:NominalConstruction;
 contentTime?:ContentTime;
 negationScope?:NegationScope;structurePrompt?:string;structureAnswer?:string;structureDistractors?:[string,string];
 nominalCase?:NominalCase;connection?:string;
 nominalSubject?:NominalSubject;subjectGenitive?:string;subjectAlternatives?:[NominalSubject,NominalSubject];
 id:string;lessonId:VerbNounLesson;stem:string;verbMeaning:string;form:NominalForm;
 sentence:string;meaning:string;distractors:[string,string];unit:string;main:string;
 template:string;answer:string;breakdown:string;explanation:string;supportingRuleIds:string[];
}
// Explicit forms: no automatic conjugator generates the teaching answers.
const activityRows:[string,string,string,string,string,string,string,string,string,string,string][] = [
 ['yüz','swim','Yüzmek sağlıklıdır.','Swimming is healthy.','I am swimming healthily.','Swimming is unhealthy.','Yüzmek','sağlıklıdır','___ sağlıklıdır.','yüzmek','yüz + mek: the action of swimming'],
 ['bekle','wait','Burada beklemek zor.','Waiting here is difficult.','I am waiting here.','Waiting here is easy.','Burada beklemek','zor','Burada ___ zor.','beklemek','bekle + mek: the action of waiting'],
 ['yürü','walk','Her gün yürümek faydalı.','Walking every day is beneficial.','I walked every day.','Walking every day is harmful.','Her gün yürümek','faydalı','Her gün ___ faydalı.','yürümek','yürü + mek: the action of walking'],
 ['öğren','learn','Türkçe öğrenmek zaman alır.','Learning Turkish takes time.','I learned Turkish quickly.','Teaching Turkish takes time.','Türkçe öğrenmek','zaman alır','Türkçe ___ zaman alır.','öğrenmek','öğren + mek: the action of learning'],
 ['oku','read','Kitap okumak güzel.','Reading books is enjoyable.','The book is beautiful.','I am writing a book.','Kitap okumak','güzel','Kitap ___ güzel.','okumak','oku + mak: the action of reading'],
 ['dinlen','rest','Evde dinlenmek istiyorum.','I want to rest at home.','I am resting at home right now.','Someone wants me to rest at home.','Evde dinlenmek','istiyorum','Evde ___ istiyorum.','dinlenmek','dinlen + mek: the action of resting'],
 ['uyu','sleep','Biraz uyumak istiyorum.','I want to sleep for a while.','I am sleeping for a while.','I do not want to sleep.','Biraz uyumak','istiyorum','Biraz ___ istiyorum.','uyumak','uyu + mak: the action of sleeping'],
 ['pişir','cook','Bu akşam yemek pişirmek istiyorum.','I want to cook food this evening.','I cooked food this evening.','Someone wants me to cook this evening.','Bu akşam yemek pişirmek','istiyorum','Bu akşam yemek ___ istiyorum.','pişirmek','pişir + mek: the action of cooking'],
 ['kalk','get up','Yarın erken kalkmak istiyorum.','I want to get up early tomorrow.','I got up early yesterday.','I want you to get up early tomorrow.','Yarın erken kalkmak','istiyorum','Yarın erken ___ istiyorum.','kalkmak','kalk + mak: the action of getting up'],
 ['çık','go out','Bugün dışarı çıkmak istiyorum.','I want to go out today.','I am going out right now.','I do not want to go out today.','Bugün dışarı çıkmak','istiyorum','Bugün dışarı ___ istiyorum.','çıkmak','çık + mak: the action of going out'],
 ['çöz','solve','Bu soruyu çözmek kolay.','Solving this question is easy.','This question is easy to write.','I solved this question yesterday.','Bu soruyu çözmek','kolay','Bu soruyu ___ kolay.','çözmek','çöz + mek: the action of solving'],
 ['gör','see','Yeni yerler görmek güzel.','Seeing new places is enjoyable.','The new places see me.','I saw new places yesterday.','Yeni yerler görmek','güzel','Yeni yerler ___ güzel.','görmek','gör + mek: the action of seeing'],
];
const activity:VerbNounExample[]=activityRows.map(([stem,verbMeaning,sentence,meaning,d1,d2,unit,main,template,answer,breakdown],i)=>({
 id:`vn1-${String(i+1).padStart(2,'0')}`,lessonId:'activity',stem,verbMeaning,sentence,meaning,distractors:[d1,d2],unit,main,template,answer,breakdown,form:'mak_mek',
 explanation:main==='istiyorum'?'The bracketed action unit is what I want to do. The wanting belongs to istiyorum; the action noun is not a finite statement that the action is happening.':'The bracketed action unit is what the sentence evaluates or describes. It includes words belonging to that action, not just the final verb noun.',supportingRuleIds:['two_way_vowel_harmony'],
}));
const caseRows:[string,string,NominalForm,string,string,string,string,string,string,string,string,string,string][] = [
 ['yüz','swim','ma_accusative','Denizde yüzmeyi seviyorum.','I like swimming in the sea.','I like the person swimming in the sea.','I am swimming in the sea right now.','Denizde yüzmeyi','seviyorum','Denizde ___ seviyorum.','yüzmeyi','yüz + me + y + i','The identified activity is the direct object of seviyorum. Use the modern -me + buffer y + accusative i form.'],
 ['oku','read','ma_accusative','Kitap okumayı seviyorum.','I like reading books.','I like the book that you read.','I am reading a book right now.','Kitap okumayı','seviyorum','Kitap ___ seviyorum.','okumayı','oku + ma + y + ı','The reading activity is the direct object of seviyorum. Use -ma + buffer y + accusative ı.'],
 ['öğren','learn','ma_accusative','Yeni şeyler öğrenmeyi seviyorum.','I like learning new things.','I like the things you learned.','I learned new things yesterday.','Yeni şeyler öğrenmeyi','seviyorum','Yeni şeyler ___ seviyorum.','öğrenmeyi','öğren + me + y + i','The learning activity is the direct object of seviyorum. Use -me + buffer y + accusative i.'],
 ['pişir','cook','ma_accusative','Yemek pişirmeyi seviyorum.','I like cooking food.','I like the food that you cooked.','I am cooking food right now.','Yemek pişirmeyi','seviyorum','Yemek ___ seviyorum.','pişirmeyi','pişir + me + y + i','The cooking activity is the direct object of seviyorum. Use -me + buffer y + accusative i.'],
 ['yüz','swim','ma_dative','Bu havuzda yüzmeye başladım.','I started swimming in this pool.','I finished swimming in this pool.','I started building this pool.','Bu havuzda yüzmeye','başladım','Bu havuzda ___ başladım.','yüzmeye','yüz + me + y + e','Başlamak takes a dative complement: the activity that begins. Use -me + buffer y + dative e.'],
 ['çalış','study','ma_dative','Kütüphanede çalışmaya başladım.','I started studying in the library.','I finished studying in the library.','I started building a library.','Kütüphanede çalışmaya','başladım','Kütüphanede ___ başladım.','çalışmaya','çalış + ma + y + a','Başlamak takes a dative complement for the activity that begins. Use -ma + buffer y + dative a.'],
 ['yürü','walk','ma_dative','Her gün yürümeye başladım.','I started walking every day.','I stopped walking every day.','I started watching someone walk.','Her gün yürümeye','başladım','Her gün ___ başladım.','yürümeye','yürü + me + y + e','Başlamak takes a dative complement for the activity that begins. Use -me + buffer y + dative e.'],
 ['oku','read','ma_dative','Bu kitabı okumaya başladım.','I started reading this book.','I finished reading this book.','I started writing this book.','Bu kitabı okumaya','başladım','Bu kitabı ___ başladım.','okumaya','oku + ma + y + a','Başlamak takes the dative on the reading unit. Bu kitabı is the object inside that unit; okumaya connects the whole activity to başladım.'],
 ['yüz','swim','mak_ablative','Denizde yüzmekten hoşlanıyorum.','I enjoy swimming in the sea.','I am afraid of swimming in the sea.','I enjoy the person swimming in the sea.','Denizde yüzmekten','hoşlanıyorum','Denizde ___ hoşlanıyorum.','yüzmekten','yüz + mek + ten','Hoşlanmak takes the ablative on the activity you enjoy. In this lesson use -mek + -ten; voiceless k requires t.'],
 ['konuş','speak','mak_ablative','Türkçe konuşmaktan hoşlanıyorum.','I enjoy speaking Turkish.','I want you to speak Turkish.','I do not enjoy speaking Turkish.','Türkçe konuşmaktan','hoşlanıyorum','Türkçe ___ hoşlanıyorum.','konuşmaktan','konuş + mak + tan','Hoşlanmak takes the ablative on the activity you enjoy. In this lesson use -mak + -tan; voiceless k requires t.'],
 ['bekle','wait','mak_ablative','Burada beklemekten sıkıldım.','I am tired of waiting here.','I started waiting here.','I want someone to wait here.','Burada beklemekten','sıkıldım','Burada ___ sıkıldım.','beklemekten','bekle + mek + ten','Sıkılmak takes the ablative for what you are tired of. In this lesson use -mek + -ten on the waiting activity.'],
 ['yap','make','mak_ablative','Hata yapmaktan korkuyorum.','I am afraid of making a mistake.','I want to make a mistake.','I know that you made a mistake.','Hata yapmaktan','korkuyorum','Hata ___ korkuyorum.','yapmaktan','yap + mak + tan','Korkmak takes the ablative for what you fear. In this lesson use -mak + -tan on the mistake-making activity.'],
];
const cases:VerbNounExample[]=caseRows.map(([stem,verbMeaning,form,sentence,meaning,d1,d2,unit,main,template,answer,breakdown,explanation],i)=>({
 id:`vn2-${String(i+1).padStart(2,'0')}`,lessonId:'cases',stem,verbMeaning,form,sentence,meaning,distractors:[d1,d2],unit,main,template,answer,breakdown,explanation,
 supportingRuleIds:form==='mak_ablative'?['two_way_vowel_harmony','voiceless_assimilation']:['two_way_vowel_harmony','buffer_y',...(form==='ma_accusative'?['four_way_vowel_harmony']:[])],
}));
export const verbNounExamples:VerbNounExample[]=[...activity,...cases,...subjectExamples,...clauseCaseExamples,...negationExamples,...contentDikExamples,...contentFutureExamples,...contrastExamples];
export const nominalFormLabels:Record<NominalForm,string>={choose_nominalizer:"Choose -mA, -DIK or -(y)AcAK to match the intended message and supplied main verb, then add subject agreement and accusative.",future_possessive_case:"Use -(y)acak/-(y)ecek + agreement for the supplied subject + accusative. Add y after a vowel-final stem. Suffix k becomes ğ before vowel-initial agreement; it stays k before overt plural -ları/-leri.",dik_possessive_case:"Use -DIK + agreement for the supplied subject + accusative. Choose d/t and the harmony vowel; soften suffix k to ğ before vowel-initial agreement. With overt plural -ları/-leri, k stays before l.",contrast_infinitive:"Use -mak/-mek after any required action negation. The main verb is supplied.",contrast_possessive:"Use -ma/-me with the supplied subject’s possessive agreement and stated outer case, if any. Add action negation only when requested.",ma_possessive_case:'Use -ma / -me + possessive agreement + the stated outer case ending.',ma_possessive:'Use -ma / -me + the possessive ending matching the supplied subject. Do not add an outer case ending.',mak_mek:'Use -mak / -mek, without a case ending.',ma_accusative:'Use -ma / -me + buffer y + accusative -ı / -i.',ma_dative:'Use -ma / -me + buffer y + dative -a / -e.',mak_ablative:'Use -mak / -mek + ablative -tan / -ten.'};
export interface LessonOption {id:string;text:string}
export interface VerbNounQuestion {
 nominalConstruction?:NominalConstruction;
 contentTime?:ContentTime;
 negationScope?:NegationScope;
 nominalCase?:NominalCase;
 nominalSubject?:NominalSubject;
 id:string;lessonId:VerbNounLesson;conceptId:VerbNounConcept;task:VerbNounTask;exampleId:string;
 exerciseType:'verb_noun_meaning'|'verb_noun_structure'|'typed_verb_noun';
 prompt:string;sentence:string;expected:string;options?:LessonOption[];expectedOptionId?:string;
 source:'newly_authored';reviewStatus:'draft_needs_independent_review';supportingRuleIds:string[];
}
export const verbNounQuestions:VerbNounQuestion[]=verbNounExamples.flatMap(e=>(['meaning','structure','type'] as const).map(task=>({
 ...(e.nominalConstruction?{nominalConstruction:e.nominalConstruction}:{}),
 ...(e.contentTime?{contentTime:e.contentTime}:{}),
 ...(e.negationScope?{negationScope:e.negationScope}:{}),
 ...(e.nominalCase?{nominalCase:e.nominalCase}:{}),
 ...(e.nominalSubject?{nominalSubject:e.nominalSubject}:{}),
 id:`${e.id}-${task}`,lessonId:e.lessonId,exampleId:e.id,task,conceptId:`vn_${e.lessonId}_${task}` as VerbNounConcept,
 exerciseType:task==='type'?'typed_verb_noun':task==='meaning'?'verb_noun_meaning':'verb_noun_structure',
 prompt:task==='meaning'?'Which meaning matches the whole sentence?':task==='structure'?(e.structurePrompt?e.structurePrompt:e.nominalCase?'What does the outer case ending connect the whole action clause to?':e.nominalSubject?'Who performs the action inside the noun-like clause?':'Which complete chunk names the action and its details?'):e.nominalConstruction?`Intended message: ${e.meaning} Build the complete missing word from the supplied stem.`:'Complete the action noun. The main verb or description is already supplied.',
 sentence:task==='type'||(task==='structure'&&e.nominalConstruction)?e.template:e.sentence,
 expected:task==='type'?e.answer:task==='meaning'?e.meaning:e.structureAnswer?e.structureAnswer:e.connection?e.connection:e.nominalSubject?nominalSubjects[e.nominalSubject]:e.unit,
 ...(task==='type'?{}:{expectedOptionId:'target',options:[{id:'target',text:task==='meaning'?e.meaning:e.structureAnswer?e.structureAnswer:e.connection?e.connection:e.nominalSubject?nominalSubjects[e.nominalSubject]:e.unit},{id:'other-1',text:task==='meaning'?e.distractors[0]:e.structureDistractors?e.structureDistractors[0]:e.connection?'The outer case ending connects only the genitive subject to the action noun.':e.subjectAlternatives?nominalSubjects[e.subjectAlternatives[0]]:e.main},{id:'other-2',text:task==='meaning'?e.distractors[1]:e.structureDistractors?e.structureDistractors[1]:e.connection?'The ending marks finite tense or person on the main verb.':e.subjectAlternatives?nominalSubjects[e.subjectAlternatives[1]]:e.sentence}]}),
 // Supporting spelling is deliberately assessed only in production questions.
 supportingRuleIds:task==='type'?e.supportingRuleIds:[],source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));
