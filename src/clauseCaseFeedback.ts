import type {VerbNounExample} from './verbNouns';

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
};
export function clauseCaseFeedback(e:VerbNounExample){
 return {reason:reasons[e.main],note:e.nominalSubject==='onlar'?'Singular agreement with onların is also possible in Turkish. This exercise requests overt plural agreement.':undefined};
}
