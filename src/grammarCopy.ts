import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {lessonPresentation} from './practicePresentation';
import {clauseCaseFeedback} from './clauseCaseFeedback';
/** Copy policy: identify named form targets; let choice tasks infer the form.
 * Keep ambiguity constraints and supplied bases. Keep feedback focused on the deciding rule.
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
 else if(q.lessonId==='clause_cases'&&q.task==='structure')instruction='Choose the form that completes the sentence.';
 else if(q.task==='type'&&q.lessonId!=='action_forms')instruction=targets[e.form]||'Complete the missing word.';
 // The subject-choice options already exclude bare -ma; typing still needs
 // the explicit infinitive request to avoid rejecting another valid noun form.
 if(q.lessonId==='action_forms'&&q.task==='structure')instruction=instruction.replace(' Name the general activity with an infinitive.','');
 const meaning=q.task==='type'&&q.lessonId==='negation'?e.meaning:old.meaning;
 // These families deliberately request a construction to avoid grading valid alternatives as wrong.
 const construction=q.task==='build'&&q.lessonId==='noun_clause_cases'?constructionNames[e.nominalConstruction!]:undefined;
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
 case 'activity':return e.main.includes('istiyor')?'This drill uses infinitive + istemek for wanting to do the activity.':'The infinitive names the activity being evaluated.';
 case 'cases':return e.form==='ma_accusative'?'Sevmek takes the activity as an accusative object.':e.form==='ma_dative'?'Başlamak takes a dative activity complement.':`${e.main.includes('hoşlan')?'Hoşlanmak':e.main.includes('sıkıl')?'Sıkılmak':'Korkmak'} takes an ablative activity complement.`;
 case 'subjects':return `The verbal noun agrees with ${e.subjectGenitive}.`;
 case 'clause_cases':return clauseCaseFeedback(e).reason;
 case 'negation':return e.negationScope==='action'?'Negate the embedded action; keep the supplied main predicate.':e.negationScope==='main'?'Only the main predicate is negative; the embedded action stays affirmative.':'The requested action is affirmative.';
 case 'content_dik':return e.contentTime==='habitual_fact'?'-DIK expresses a habitual fact here, not necessarily a past event.':'-DIK expresses the past event in this context.';
 case 'content_future':return e.contentTime==='future_report'?'The event is future relative to the past statement.':'-(y)AcAK expresses the future event.';
 case 'contrasts':return e.nominalConstruction==='ma'?'Use -mA for the wanted action with istemek.':e.nominalConstruction==='dik'?'Use -DIK for the nonfuture fact introduced by bilmek.':'Use -(y)AcAK for the future content introduced by bilmek.';
 case 'subject_relatives':return 'The described noun performs the relative-clause action: use -(y)An.';
 case 'object_relatives':return `${e.relativeForm==='acak'?'-(y)AcAK describes the future action':'-DIK describes the nonfuture action'}; agreement matches ${e.subjectGenitive}.`;
 case 'converb_ip':return '-(y)Ip links the actions; the final verb carries tense and person.';
 case 'converb_arak':return '-(y)ArAk describes how the main action happens.';
 case 'converb_madan':return '-mAdAn marks the action left undone while the main action happens.';
 case 'temporal_order':return e.temporalRelation==='before'?'Before: the main action precedes the time-clause action.':'After: the time-clause action precedes the main action.';
 case 'temporal_when':return '-(y)IncA supplies the when/once reference event; each clause keeps its own actor.';
 case 'temporal_while':return 'The supplied linking base + -ken gives the interval during which the main action happens.';
 case 'state_ken':return 'The state or location + -(y)ken supplies the setting during the main action.';
 case 'temporal_contrasts':case 'sentence_building':return e.temporalRelation==='before'?'Use -mAdAn önce: the main action happens first.':e.temporalRelation==='after'?'Use -DIktAn sonra: the time-clause action happens first.':e.temporalRelation==='when'?'Use -(y)IncA for the when/once reference event.':'Use -ken for the interval during which the main action happens.';
 case 'noun_clause_building':return e.nominalConstruction==='ma'?'İstemek takes an accusative -mA clause for the wanted action.':e.nominalConstruction==='dik'?'Bilmek takes an accusative content clause; -DIK fits the nonfuture fact.':'Bilmek takes an accusative content clause; -(y)AcAK fits the future event.';
 case 'noun_clause_cases':return clauseCaseFeedback(e).reason;
 case 'relative_building':return e.relativeHeadCase==='bare'?`${e.relativeHeadBase} is the main-clause subject, so it stays unmarked.`:e.relativeHeadCase==='accusative'?`${e.relativeHead} is the identified direct object: use accusative.`:e.relativeHeadCase==='dative'?`${e.main.includes('teşekkür')?'Teşekkür etmek':e.main.includes('bakıyor')?'Bakmak':'Gitmek'} takes a dative complement.`:e.main.includes('uzak dur')?'Uzak durmak takes an ablative complement.':`${e.relativeHead} marks the source: use ablative.`;
 case 'relative_roles':return `Inside the description: ${e.relativeInnerForm} (${e.relativeInnerRole}). In the main sentence: ${e.relativeHead} (${e.relativeHeadCase}).`;
 case 'relative_negation':return `Description: ${e.relativePolarity}. Main statement: ${e.relativeMainPolarity}.`;
 }
}
