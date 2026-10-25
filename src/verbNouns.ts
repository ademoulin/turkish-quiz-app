import {temporalWhileCompletionExamples,temporalWhileCompletionQuestions} from './temporalWhileCompletionExpansion';
import {temporalWhenCompletionExamples,temporalWhenCompletionQuestions} from './temporalWhenCompletionExpansion';
import {temporalOrderCompletionExamples,temporalOrderCompletionQuestions} from './temporalOrderCompletionExpansion';
import {converbMadanCompletionExamples,converbMadanCompletionQuestions} from './converbMadanCompletionExpansion';
import {converbArakCompletionExamples,converbArakCompletionQuestions} from './converbArakCompletionExpansion';
import {converbIpCompletionExamples,converbIpCompletionQuestions} from './converbIpCompletionExpansion';
import {relativeNegationCompletionExamples,relativeNegationCompletionQuestions} from './relativeNegationCompletionExpansion';
import {relativeRoleCompletionExamples,relativeRoleCompletionQuestions} from './relativeRoleCompletionExpansion';
import {relativeBuildingCompletionExamples,relativeBuildingCompletionQuestions} from './relativeBuildingCompletionExpansion';
import {relativeCompletionExamples,relativeCompletionQuestions} from './relativeCompletionExpansion';
import {nominalizerExpansionExamples,nominalizerExpansionQuestions} from './nominalizerExpansion';
import {expandedClauseExamples,expandedClauseQuestions} from './clauseCaseExpansion';
import {grammarLessonCatalog,numberedTitle} from './grammarNavigation';
import {additionalClauseCaseExamples} from './clauseCaseCompletionContent';
import {redesignLessons} from './lessonRedesign';
import {relativeNegationExamples,type RelativeNegationEvidence} from './verbNounRelativeNegation';
import {relativeRoleExamples,type RelativeRoleEvidence} from './verbNounRelativeRoles';
import {relativeBuildingExamples,type RelativeBuildingEvidence} from './verbNounRelativeBuilding';
import {actionFormExamples} from './verbNounActionForms';
import {nounCaseBuildingExamples} from './verbNounCaseBuilding';
import {nounClauseBuildingExamples} from './verbNounNounClauseBuilding';
import {sentenceBuildingExamples} from './verbNounSentenceBuilding';
import {temporalContrastExamples} from './verbNounTemporalContrasts';
import {stateKenExamples} from './verbNounStateKen';
import {temporalWhileExamples} from './verbNounTemporalWhile';
import {temporalWhenExamples} from './verbNounTemporalWhen';
import {temporalOrderExamples} from './verbNounTemporalOrder';
import {converbMadanExamples} from './verbNounConverbMadan';
import {converbArakExamples} from './verbNounConverbArak';
import {converbIpExamples,type ConverbSubject,type ConverbTime} from './verbNounConverbIp';
import {objectRelativeExamples,type RelativeForm} from './verbNounObjectRelatives';
import {subjectRelativeExamples,type RelativeTime} from './verbNounSubjectRelatives';
import {contrastExamples,type NominalConstruction} from './verbNounContrasts';
import {contentFutureExamples} from './verbNounContentFuture';
import {contentDikExamples,type ContentTime} from './verbNounContentDik';
import {negationExamples,type NegationScope} from './verbNounNegation';
import {clauseCaseExamples,type NominalCase} from './verbNounClauseCases';
import {subjectExamples,nominalSubjects,type NominalSubject} from './verbNounSubjects';
/** Newly authored lesson content, not quotations. Yeni Hitit 1 §12.1 p.145
 * and §12.2 p.149 guide scope. Independent review and exact Ödkem mapping pending.
 * Finite predicates are supplied; production targets nonfinite constructions. */
export const verbNounLessons=Object.fromEntries(Object.entries(grammarLessonCatalog).map(([id,item])=>[id,numberedTitle(item)])) as {[K in keyof typeof grammarLessonCatalog]:string};
export type VerbNounLesson = keyof typeof verbNounLessons;
export const verbNounTasks = {meaning:'Understand the meaning',structure:'Unpack the structure',type:'Build the action noun',build:'Assemble the sentence'} as const;
export type VerbNounTask = keyof typeof verbNounTasks;
export const verbNounConcepts = {
 vn_relative_negation_meaning:"Relative negation · meaning",vn_relative_negation_structure:"Relative negation · scope and clause roles",vn_relative_negation_type:'Relative negation · typed description',vn_relative_negation_build:"Relative negation · guided assembly",
 vn_relative_roles_meaning:"Relative complements · meaning",vn_relative_roles_type:'Relative roles · typed modifier',vn_relative_roles_structure:'Relative roles · head-case choice',vn_relative_roles_build:"Relative complements · guided assembly",
 vn_relative_building_meaning:'Relative sentences · meaning',vn_relative_building_structure:'Relative sentences · actor, head and whole-phrase role',vn_relative_building_build:'Relative sentences · guided assembly',vn_relative_building_type:'Relative sentences · typed completion',
 vn_action_forms_meaning:'Activity forms · meaning',vn_action_forms_structure:'Activity forms · choose from context',vn_action_forms_type:'Activity forms · choose and produce',
 vn_noun_clause_cases_type:'Noun-clause complements · typed production',
 vn_noun_clause_cases_meaning:"Noun-clause complements · meaning",vn_noun_clause_cases_structure:"Noun-clause complements · whole-clause case",vn_noun_clause_cases_build:"Noun-clause complements · guided sentence assembly",
 vn_noun_clause_building_meaning:"Noun-clause building · meaning",vn_noun_clause_building_structure:"Noun-clause building · actors and whole-clause role",vn_noun_clause_building_build:"Noun-clause building · guided chunk assembly",
 vn_sentence_building_meaning:"Sentence building · meaning",vn_sentence_building_structure:"Sentence building · clause roles",vn_sentence_building_build:"Sentence building · guided chunk assembly",
 vn_temporal_contrasts_meaning:'Time connection · meaning',vn_temporal_contrasts_structure:'Time connection · requested construction',vn_temporal_contrasts_type:'Time connection · complete expression',
 vn_state_ken_meaning:'State/location -ken · meaning',vn_state_ken_structure:'State/location -ken · clause subjects and form',vn_state_ken_type:'State/location -ken · production',
 vn_temporal_while_meaning:'While · meaning',vn_temporal_while_structure:'While · overlap and actors',vn_temporal_while_type:'While · converb production',
 vn_temporal_when_meaning:'When/once · meaning',vn_temporal_when_structure:'When/once · event connection and actors',vn_temporal_when_type:'When/once · converb production',
 vn_temporal_order_meaning:'Before/after · meaning',vn_temporal_order_structure:'Before/after · event order and actors',vn_temporal_order_type:'Before/after · converb production',
 vn_converb_madan_meaning:'-mAdAn converb · meaning',vn_converb_madan_structure:'-mAdAn converb · omitted action, actor and tense source',vn_converb_madan_type:'-mAdAn converb · production',
 vn_converb_arak_meaning:'-ArAk converb · meaning',vn_converb_arak_structure:'-ArAk converb · manner, shared actor and tense source',vn_converb_arak_type:'-ArAk converb · production',
 vn_converb_ip_meaning:'-Ip converb · meaning',vn_converb_ip_structure:'-Ip converb · shared actor, sequence and tense source',vn_converb_ip_type:'-Ip converb · production',
 vn_object_relatives_meaning:'Object relatives · meaning',vn_object_relatives_structure:'Object relatives · actor, head and suffix role',vn_object_relatives_type:'Object relatives · participle production',
 vn_subject_relatives_meaning:'Subject relatives · meaning',vn_subject_relatives_structure:'Subject relatives · actor, modifier and time',vn_subject_relatives_type:'Subject relatives · participle production',
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
export type NominalForm = 'choose_action_form'|'sentence_chunks'|'choose_time_connection'|'state_ken'|'temporal_while'|'temporal_when'|'temporal_before'|'temporal_after'|'converb_madan'|'converb_arak'|'converb_ip'|'object_relative_dik'|'object_relative_acak'|'subject_relative_an'|'choose_nominalizer'|'future_possessive_case'|'dik_possessive_case'|'contrast_infinitive'|'contrast_possessive'|'mak_mek'|'ma_accusative'|'ma_dative'|'mak_ablative'|'ma_possessive'|'ma_possessive_case';
export interface VerbNounExample extends Partial<RelativeBuildingEvidence&RelativeRoleEvidence&RelativeNegationEvidence> {
 mainLead?:string;nominalMainSubject?:NominalSubject;
 sourceClauses?:[string,string];chunks?:SentenceChunk[];expectedChunkIds?:string[];
 temporalIntent?:string;structureChoices?:LessonOption[];
 temporalPredicate?:'state'|'location';
 kenBase?:string;
 temporalRelation?:'before'|'after'|'when'|'while';temporalSubject?:NominalSubject;mainSubject?:NominalSubject;temporalTime?:ConverbTime;
 converbLead?:string;converbClause?:string;converbSubject?:ConverbSubject;converbTime?:ConverbTime;
 relativeClause?:string;relativeHead?:string;relativeTime?:RelativeTime;relativeForm?:RelativeForm;
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
const originalExamples:VerbNounExample[]=[...activity,...cases,...subjectExamples,...clauseCaseExamples,...negationExamples,...contentDikExamples,...contentFutureExamples,...contrastExamples,...subjectRelativeExamples,...objectRelativeExamples,...converbIpExamples,...converbArakExamples,...converbMadanExamples,...temporalOrderExamples,...temporalWhenExamples,...temporalWhileExamples,...stateKenExamples,...temporalContrastExamples,...sentenceBuildingExamples,...nounClauseBuildingExamples,...nounCaseBuildingExamples,...additionalClauseCaseExamples,...actionFormExamples,...relativeBuildingExamples,...relativeRoleExamples,...relativeNegationExamples];
export const nominalFormLabels:Record<NominalForm,string>={choose_action_form:'Choose the form from the supplied phrase. Type the complete missing word; keep the finite predicate and any için unchanged. No possessive or person agreement is needed.',sentence_chunks:"Assemble supplied chunks in the guided frame; finite verbs are supplied.",choose_time_connection:"Build the whole expression for the requested connection. Include önce or sonra for explicit before/after; use one word for when/once or while. A linking base is supplied for the while option. Keep Turkish spelling and word order; the final verb is supplied.",state_ken:"Use the supplied state or location base with -ken: add buffer y after a vowel, no y after a consonant. Keep -ken unchanged. Add no action verb or person, plural, possessive or case ending; type the complete missing word.",temporal_while:"Use the supplied linking base plus unchanged -ken for while. Type the complete converb. Do not change -ken to -kan or add person, plural, possessive or case endings. The final verb is supplied.",temporal_when:"Use -(y)ınca/-(y)ince/-(y)unca/-(y)ünce for when/once. Use four-way harmony and buffer y after a vowel-final stem. For git-, use the softened stem gid-. Add no finite tense, person, plural, possessive or case endings; the final verb is supplied.",temporal_before:"Use -madan/-meden before the supplied önce (before doing). Use two-way harmony, no buffer y and no person or possessive agreement. Type only the complete missing word.",temporal_after:"Use -dıktan/-dikten/-duktan/-dükten or -tıktan/-tikten/-tuktan/-tükten before the supplied sonra (after doing). Choose d/t and four-way harmony; k stays before -tan/-ten. No person or possessive agreement. Type only the missing word.",converb_madan:"Use -madan/-meden to express without doing the action. Use two-way harmony. No buffer y or extra negative suffix is needed. Do not add tense, person, possessive or case endings; the affirmative final verb is supplied.",converb_arak:"Use -(y)arak/-(y)erek to express how the action happens. Use two-way harmony and buffer y after a vowel-final stem. Do not add tense, person, possessive or case endings; the final verb is supplied.",converb_ip:"Use -(y)ıp/-(y)ip/-(y)up/-(y)üp to link the actions. Use four-way harmony and buffer y after a vowel-final stem. Do not add tense, person or case endings; the finite verb is supplied.",object_relative_dik:"Use -DIK + agreement matching the supplied genitive subject. Do not add a clause-object accusative after the agreement. The head noun is supplied separately.",object_relative_acak:"Use -(y)acak/-(y)ecek + agreement matching the supplied genitive subject. Add y after a vowel-final stem. Do not add a clause-object accusative after the agreement.",subject_relative_an:"Use -(y)an/-(y)en to describe the supplied noun as the one doing the action. Add buffer y after a vowel-final stem. Do not add person or plural agreement to the participle in these phrases.",choose_nominalizer:"Choose -mA, -DIK or -(y)AcAK to match the intended message and supplied main verb, then add subject agreement and accusative.",future_possessive_case:"Use -(y)acak/-(y)ecek + agreement for the supplied subject + accusative. Add y after a vowel-final stem. Suffix k becomes ğ before vowel-initial agreement; it stays k before overt plural -ları/-leri.",dik_possessive_case:"Use -DIK + agreement for the supplied subject + accusative. Choose d/t and the harmony vowel; soften suffix k to ğ before vowel-initial agreement. With overt plural -ları/-leri, k stays before l.",contrast_infinitive:"Use -mak/-mek after any required action negation. The main verb is supplied.",contrast_possessive:"Use -ma/-me with the supplied subject’s possessive agreement and stated outer case, if any. Add action negation only when requested.",ma_possessive_case:'Use -ma / -me + possessive agreement + the stated outer case ending.',ma_possessive:'Use -ma / -me + the possessive ending matching the supplied subject. Do not add an outer case ending.',mak_mek:'Use -mak / -mek, without a case ending.',ma_accusative:'Use -ma / -me + buffer y + accusative -ı / -i.',ma_dative:'Use -ma / -me + buffer y + dative -a / -e.',mak_ablative:'Use -mak / -mek + ablative -tan / -ten.'};
export interface SentenceChunk {id:string;text:string}
export interface LessonOption {id:string;text:string}
export interface VerbNounQuestion extends Partial<RelativeBuildingEvidence&RelativeRoleEvidence&RelativeNegationEvidence> {
 optionLanguage?:'tr'|'en';
 nominalMainSubject?:NominalSubject;
 chunks?:SentenceChunk[];expectedChunkIds?:string[];
 temporalPredicate?:'state'|'location';
 temporalRelation?:'before'|'after'|'when'|'while';temporalSubject?:NominalSubject;mainSubject?:NominalSubject;temporalTime?:ConverbTime;
 converbSubject?:ConverbSubject;converbTime?:ConverbTime;
 relativeHead?:string;relativeTime?:RelativeTime;relativeForm?:RelativeForm;
 nominalConstruction?:NominalConstruction;
 contentTime?:ContentTime;
 negationScope?:NegationScope;
 nominalCase?:NominalCase;
 nominalSubject?:NominalSubject;
 id:string;lessonId:VerbNounLesson;conceptId:VerbNounConcept;task:VerbNounTask;exampleId:string;
 exerciseType:'sentence_chunk_assembly'|'converb_meaning'|'converb_structure'|'typed_converb'|'object_relative_meaning'|'object_relative_structure'|'subject_relative_meaning'|'subject_relative_structure'|'typed_participle'|'verb_noun_meaning'|'verb_noun_structure'|'typed_verb_noun';
 prompt:string;sentence:string;expected:string;options?:LessonOption[];expectedOptionId?:string;
 source:'newly_authored';reviewStatus:'draft_needs_independent_review';supportingRuleIds:string[];
}
export const verbNounExamples=[...originalExamples,...expandedClauseExamples,...nominalizerExpansionExamples,...relativeCompletionExamples,...relativeBuildingCompletionExamples,...relativeRoleCompletionExamples,...relativeNegationCompletionExamples,...converbIpCompletionExamples,...converbArakCompletionExamples,...converbMadanCompletionExamples,...temporalOrderCompletionExamples,...temporalWhenCompletionExamples,...temporalWhileCompletionExamples];
const originalLessonQuestions:VerbNounQuestion[]=originalExamples.flatMap(e=>(e.lessonId==='noun_clause_cases'&&!e.chunks?['structure'] as const:['sentence_building','noun_clause_building','noun_clause_cases','relative_building','relative_roles','relative_negation'].includes(e.lessonId)?['meaning','structure','build'] as const:['meaning','structure','type'] as const).map(task=>({
 ...(task==='build'?{chunks:e.chunks,expectedChunkIds:e.expectedChunkIds}:{}),
 ...(e.nominalMainSubject?{nominalMainSubject:e.nominalMainSubject}:{}),
 ...(e.temporalPredicate?{temporalPredicate:e.temporalPredicate}:{}),
 ...(e.temporalRelation?{temporalRelation:e.temporalRelation,temporalSubject:e.temporalSubject,mainSubject:e.mainSubject,temporalTime:e.temporalTime}:{}),
 ...(e.converbSubject?{converbSubject:e.converbSubject,converbTime:e.converbTime}:{}),
 ...(e.relativePolarity?{relativePolarity:e.relativePolarity,relativeMainPolarity:e.relativeMainPolarity}:{}),
 ...(e.relativeInnerRole?{relativeInnerRole:e.relativeInnerRole,relativeInnerForm:e.relativeInnerForm}:{}),
 ...(e.relativeConstruction?{relativeConstruction:e.relativeConstruction,relativeHeadCase:e.relativeHeadCase,relativeHeadBase:e.relativeHeadBase,relativeActor:e.relativeActor}:{}),
 ...(e.relativeForm?{relativeForm:e.relativeForm}:{}),
 ...(e.relativeHead?{relativeHead:e.relativeHead,relativeTime:e.relativeTime}:{}),
 ...(e.nominalConstruction?{nominalConstruction:e.nominalConstruction}:{}),
 ...(e.contentTime?{contentTime:e.contentTime}:{}),
 ...(e.negationScope?{negationScope:e.negationScope}:{}),
 ...(e.nominalCase?{nominalCase:e.nominalCase}:{}),
 ...(e.nominalSubject?{nominalSubject:e.nominalSubject}:{}),
 id:`${e.id}-${task}`,lessonId:e.lessonId,exampleId:e.id,task,conceptId:`vn_${e.lessonId}_${task}` as VerbNounConcept,
 exerciseType:task==='build'?'sentence_chunk_assembly':e.converbSubject||e.temporalRelation?(task==='type'?'typed_converb':`converb_${task}`):e.lessonId==='object_relatives'?(task==='type'?'typed_participle':`object_relative_${task}`):e.lessonId==='subject_relatives'?(task==='type'?'typed_participle':`subject_relative_${task}`):task==='type'?'typed_verb_noun':task==='meaning'?'verb_noun_meaning':'verb_noun_structure',
 prompt:task==='build'&&['relative_building','relative_roles','relative_negation'].includes(e.lessonId)?`Intended message: ${e.meaning} Describe ${e.relativeHeadBase}. Combine the relative modifier, head noun, main detail and supplied main predicate in that order.`:task==='build'&&['noun_clause_building','noun_clause_cases'].includes(e.lessonId)?`Intended message: ${e.meaning} Combine the actor/action cue with the supplied main predicate. Select a slot, then a chunk.`:task==='build'?'Combine the two source clauses to express the requested message. Select a slot, then a chunk.':task==='meaning'?'Which meaning matches the whole sentence?':task==='structure'?(e.structurePrompt?e.structurePrompt:e.nominalCase?'What does the outer case ending connect the whole action clause to?':e.nominalSubject?'Who performs the action inside the noun-like clause?':'Which complete chunk names the action and its details?'):e.lessonId==='action_forms'?e.structurePrompt!.replace('Choose the complete word','Type the complete word'):e.lessonId==='temporal_contrasts'?`Intended message: ${e.meaning} Build the complete expression requested by the timing cue.`:e.temporalPredicate?'Build the complete missing state/location word with -(y)ken. Use the supplied base; the final verb is supplied.':e.temporalRelation==='while'?'Complete the missing while converb using the supplied linking base plus -ken. The final verb is supplied.':e.temporalRelation==='when'?'Complete only the missing -(y)IncA converb for when/once. The final verb is supplied.':e.temporalRelation?`Complete the missing ${e.temporalRelation==='before'?'-madan/-meden before önce':'-DIktAn before sonra'} form. The time word and final verb are supplied.`:e.lessonId==='converb_madan'?'Complete only the missing -madan/-meden converb: without doing this action. The affirmative final verb is already supplied.':e.lessonId==='converb_arak'?'Complete only the missing -(y)arak/-(y)erek converb expressing how the action happens. The final verb is already supplied.':e.lessonId==='converb_ip'?'Complete only the missing -ip converb. The final verb is already supplied.':e.lessonId==='object_relatives'?'Complete the object-relative participle with agreement for the supplied actor. The described object noun and main description are supplied.':e.relativeHead?'Complete the subject-relative participle. The noun being described and the main description are supplied.':e.nominalConstruction?`Intended message: ${e.meaning} Build the complete missing word from the supplied stem.`:'Complete the action noun. The main verb or description is already supplied.',
 sentence:['noun_clause_building','noun_clause_cases'].includes(e.lessonId)&&task==='structure'?e.sentence:task==='build'?e.sourceClauses!.join(' / '):task==='type'||(task==='structure'&&(e.nominalConstruction||e.temporalIntent||e.lessonId==='action_forms'))?e.template:e.sentence,
 expected:task==='build'?e.sentence:task==='type'?e.answer:task==='meaning'?e.meaning:e.structureAnswer?e.structureAnswer:e.connection?e.connection:e.nominalSubject?nominalSubjects[e.nominalSubject]:e.unit,
 ...(['type','build'].includes(task)?{}:{expectedOptionId:'target',options:task==='structure'&&e.structureChoices?e.structureChoices:[{id:'target',text:task==='meaning'?e.meaning:e.structureAnswer?e.structureAnswer:e.connection?e.connection:e.nominalSubject?nominalSubjects[e.nominalSubject]:e.unit},{id:'other-1',text:task==='meaning'?e.distractors[0]:e.structureDistractors?e.structureDistractors[0]:e.connection?'The outer case ending connects only the genitive subject to the action noun.':e.subjectAlternatives?nominalSubjects[e.subjectAlternatives[0]]:e.main},{id:'other-2',text:task==='meaning'?e.distractors[1]:e.structureDistractors?e.structureDistractors[1]:e.connection?'The ending marks finite tense or person on the main verb.':e.subjectAlternatives?nominalSubjects[e.subjectAlternatives[1]]:e.sentence}]}),
 // Supporting spelling is deliberately assessed only in production questions.
 supportingRuleIds:task==='type'?e.supportingRuleIds:[],source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));

const redesigned=redesignLessons(originalLessonQuestions);
export const verbNounQuestions=[...redesigned.active,...expandedClauseQuestions,...nominalizerExpansionQuestions,...relativeCompletionQuestions,...relativeBuildingCompletionQuestions,...relativeRoleCompletionQuestions,...relativeNegationCompletionQuestions,...converbIpCompletionQuestions,...converbArakCompletionQuestions,...converbMadanCompletionQuestions,...temporalOrderCompletionQuestions,...temporalWhenCompletionQuestions,...temporalWhileCompletionQuestions];
export const retiredLessonQuestions=redesigned.retired;
