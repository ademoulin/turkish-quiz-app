import type {VerbNounExample} from './verbNouns';
import {additionalClauseRules} from './clauseCaseCompletionContent';

const want='İstemek takes an accusative action clause here: the action someone wants goes in the accusative (-I).';
const glad='Sevinmek takes a dative complement: the event someone is glad about goes in the dative (-A).';
const bothered='Rahatsız olmak takes an ablative complement: the thing someone is bothered by goes in the ablative (-DAn).';
const reasons:Record<string,string>={
 istiyorum:want,istiyor:want,
 bekliyorum:'Beklemek takes an accusative action clause here: the event someone is waiting for goes in the accusative (-I).',
 sevindi:glad,sevindim:glad,
 'rahatsız oluyor':bothered,'rahatsız oluyorum':bothered,
 hoşlanıyorum:'Hoşlanmak takes an ablative complement: the activity or event someone likes goes in the ablative (-DAn).',
 memnunum:'Memnun olmak takes an ablative complement: the thing someone is pleased about goes in the ablative (-DAn).',
 seviniyorum:glad,sevindin:glad,sevindiniz:glad,sevindiler:glad,
 memnun:'Memnun olmak takes an ablative complement: the thing someone is pleased about goes in the ablative (-DAn).',
 'rahatsız oluyoruz':bothered,
 eminim:'Emin olmak takes the ablative (-DAn): the fact someone is sure of goes in the ablative.',
 eminsin:'Emin olmak takes the ablative (-DAn): the fact someone is sure of goes in the ablative.',
 eminler:'Emin olmak takes the ablative (-DAn): the fact someone is sure of goes in the ablative.',
 inanıyor:'İnanmak takes the dative (-A): the claim someone believes goes in the dative.',
 inanıyoruz:'İnanmak takes the dative (-A): the claim someone believes goes in the dative.',
 korkuyorsunuz:'Korkmak takes the ablative (-DAn): the event someone fears goes in the ablative.',
 ...additionalClauseRules,
};
export function clauseCaseFeedback(e:VerbNounExample){
 return {reason:e.id.startsWith('vn12c-expand-')?e.explanation:reasons[e.main],note:e.nominalSubject==='onlar'?'Singular agreement with onların is also possible in Turkish. This exercise requests overt plural agreement.':undefined};
}
