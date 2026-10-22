import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {lessonPresentation} from './practicePresentation';
/** Copy policy: identify named form targets; let choice tasks infer the form.
 * Keep ambiguity constraints and supplied bases. Put suffix recipes in feedback.
 * No question/answer/evidence objects are changed by these presentation helpers.
 */
const targets:Record<string,string>={
 mak_mek:'Complete the infinitive.',ma_accusative:'Complete the action noun in the accusative.',ma_dative:'Complete the action noun in the dative.',mak_ablative:'Complete the infinitive in the ablative.',
 ma_possessive:'Complete the -mA verbal noun with agreement.',ma_possessive_case:'Complete the -mA verbal noun with agreement and the required case.',
 contrast_infinitive:'Complete the infinitive.',contrast_possessive:'Complete the -mA verbal noun with agreement.',
 dik_possessive_case:'Complete the -DIK content-clause form.',future_possessive_case:'Complete the -(y)AcAK content-clause form.',
 subject_relative_an:'Complete the -(y)An participle.',object_relative_dik:'Complete the -DIK participle with agreement.',object_relative_acak:'Complete the -(y)AcAK participle with agreement.',
 converb_ip:'Complete the -(y)Ip converb.',converb_arak:'Complete the -(y)ArAk converb.',converb_madan:'Complete the -mAdAn converb meaning “without doing”.',
 temporal_before:'Complete the -mAdAn form before önce.',temporal_after:'Complete the -DIktAn form before sonra.',temporal_when:'Complete the -(y)IncA converb.',temporal_while:'Complete the -ken form.',state_ken:'Complete the -(y)ken form.',
 choose_nominalizer:'Complete the missing word.',choose_time_connection:'Complete the requested time expression.',
};
export const constructionNames={ma:'-mA',dik:'-DIK',acak:'-(y)AcAK'} as const;
export function lessonExerciseCopy(q:VerbNounQuestion,e:VerbNounExample){
 const old=lessonPresentation(q.prompt,e.meaning);
 let instruction=old.instruction;
 if(q.task==='build')instruction='Combine the source clauses in the guided frame.';
 else if(q.task==='type'&&q.lessonId!=='action_forms')instruction=targets[e.form]||'Complete the missing word.';
 const meaning=q.task==='type'&&q.lessonId==='negation'?e.meaning:old.meaning;
 // These families deliberately request a construction to avoid grading valid alternatives as wrong.
 const construction=q.task!=='meaning'&&['noun_clause_building','noun_clause_cases'].includes(q.lessonId)?constructionNames[e.nominalConstruction!]:undefined;
 const timing=(q.task==='type'||q.task==='build')&&e.temporalIntent?({before:'Explicit before',after:'Explicit after',when:'When/once',while:'While (overlap)'}[e.temporalRelation!]):undefined;
 const outerCase=q.task==='type'&&q.lessonId!=='contrasts'?e.nominalCase:undefined;
 const pluralAgreement=q.task==='type'&&e.nominalSubject==='onlar';
 return {instruction,meaning,construction,timing,outerCase,pluralAgreement};
}
/** Concise deciding clue. Full original explanation remains available after checking. */
export function lessonReason(e:VerbNounExample):string{
 switch(e.lessonId){
 case 'action_forms':
  if(e.sentence.includes(' için '))return 'İçin marks purpose here: use the infinitive.';
  if(/m[ae]kt[ae]$/.test(e.answer))return 'Zorlanmak uses -makta/-mekte in this pattern.';
  if(/m[ae]kt[ae]n$/.test(e.answer))return `${e.main.includes('kork')?'Korkmak':'Sıkılmak'} takes an ablative activity complement.`;
  if(/m[ae]y[ae]$/.test(e.answer))return 'Başlamak takes a dative activity complement.';
  if(/m[ae]y[ıi]$/.test(e.answer))return 'Sevmek takes the activity as an accusative object.';
  return e.main.includes('istiyor')?'This question requests the common infinitive + istemek pattern.':'The requested infinitive names the activity as the subject.';
 case 'activity':return e.explanation;
 case 'cases':return e.explanation;
 case 'subjects':return 'The agreement ending identifies the embedded actor; an explicit genitive pronoun can be omitted when its reference is clear.';
 case 'clause_cases':return 'Agreement identifies the embedded subject; the final case ending connects the whole clause to the main predicate.';
 case 'negation':return e.negationScope==='action'?'The embedded action is negative; distinguish the negative suffix from the action-noun ending.':e.negationScope==='main'?'The main predicate is negative; the embedded action form is affirmative.':'The action is affirmative. Agreement, where present, identifies the embedded subject.';
 case 'content_dik':return '-DIK expresses the nonfuture content here; context supplies its time. Agreement identifies the embedded subject.';
 case 'content_future':return '-(y)AcAK expresses future content from the supplied viewpoint; agreement identifies the embedded subject.';
 case 'contrasts':return e.nominalConstruction==='ma'?'The message presents a wanted action: -mA + agreement + accusative.':e.nominalConstruction==='dik'?'The message presents nonfuture content: -DIK + agreement + accusative.':'The message presents future content: -(y)AcAK + agreement + accusative.';
 case 'subject_relatives':return 'The described noun performs the relative-clause action: use -(y)An.';
 case 'object_relatives':return 'The genitive subject performs the relative action; participle agreement matches that actor.';
 case 'converb_ip':return '-(y)Ip links the actions; the final verb carries tense and person.';
 case 'converb_arak':return '-(y)ArAk describes how the main action happens.';
 case 'converb_madan':return '-mAdAn marks the action left undone while the main action happens.';
 case 'temporal_order':return e.temporalRelation==='before'?'Before: the main action precedes the time-clause action.':'After: the time-clause action precedes the main action.';
 case 'temporal_when':return '-(y)IncA supplies the when/once reference event; each clause keeps its own actor.';
 case 'temporal_while':return 'The supplied linking base + -ken gives the interval during which the main action happens.';
 case 'state_ken':return 'The state or location + -(y)ken supplies the setting during the main action.';
 case 'temporal_contrasts':case 'sentence_building':return 'The time connection links the two clauses; each clause keeps its own subject.';
 case 'noun_clause_building':return `The whole noun clause is the object of ${e.main}; its agreement matches the embedded subject.`;
 case 'noun_clause_cases':return `The whole noun clause takes ${e.nominalCase}, independently of the case roles inside it.`;
 case 'relative_building':return 'The modifier describes the head; the case on that head connects the whole phrase to the main sentence.';
 case 'relative_roles':return `Inside the description: ${e.relativeInnerForm} (${e.relativeInnerRole}). In the main sentence: ${e.relativeHead} (${e.relativeHeadCase}).`;
 case 'relative_negation':return `Description: ${e.relativePolarity}. Main statement: ${e.relativeMainPolarity}. Each keeps its own polarity.`;
 }
}
