import {shuffle} from './shuffle';
import {latestMistakes} from './practiceReview';
import type {CaseQuestion,Concept,PilotAttempt} from './casePilot';
export const pronounCaseConcepts={
 pronoun_locative:'Locative on a personal pronoun (-DA)',
 pronoun_dative:'Dative on a personal pronoun (-A)',
 pronoun_ablative:'Ablative on a personal pronoun (-DAn)',
 pronoun_accusative:'Accusative on a personal pronoun (-I)',
} as const;
export const personalPronouns={ben:'I / me',sen:'you (singular)',o:'he/she/it',biz:'we / us',siz:'you (plural/formal)',onlar:'they / them'} as const;
export type PersonalPronoun=keyof typeof personalPronouns;
export type PronounCaseConcept=keyof typeof pronounCaseConcepts;
export type PronounCaseSelection=PronounCaseConcept|'mixed';
export interface PronounCaseQuestion extends Omit<CaseQuestion,'conceptId'|'exerciseType'>{
 conceptId:PronounCaseConcept;
 exerciseType:'typed_pronoun_case';
 pronoun:PersonalPronoun;
 requiredCase:Exclude<Concept,'genitive'>;
}
export const pronounCaseCatalogMapping={
 testedRules:{locative:15,dative:14,ablative:16,accusative:35},
 supportingRules:{two_way_vowel_harmony:2,four_way_vowel_harmony:3,buffer_n:8},
 irregularDativeCatalogRule:null,
 irregularMappingStatus:'Exact dedicated tutor-catalog mapping for ben → bana / sen → sana is pending; no rule ID invented.',
 textbook:'Yeni Hitit 1 case sections §2.2 printed p.29 and §6.1 printed p.73; grammar appendix §7.5(i) for n',
 source:'Newly authored drafts guided by the existing textbook/case-rule scope, not textbook quotations.',
 scope:'Produce an explicitly named case on a supplied personal pronoun. Locative contexts mean with someone / in their keeping, not automatic house-location meanings. No genitive, possession production or case choice.',
} as const;
const rows:Record<Exclude<Concept,'genitive'>,[PersonalPronoun,string,string,string,string[]][]> = {
 locative:[
  ['ben','Anahtar şu anda ___.','bende','ben + -de → bende. In this context the key is with me / I have it. This is not the possessive form benim.',['two_way_vowel_harmony']],
  ['sen','Biletler hâlâ ___ mı?','sende','sen + -de → sende. The tickets are with you. Front vowel e selects -de.',['two_way_vowel_harmony']],
  ['o','Aradığımız kitap ___.','onda','o → on- + -da → onda. Insert n before the case ending. The book is with him/her.',['two_way_vowel_harmony','buffer_n']],
  ['biz','Pasaportlar ___ kaldı.','bizde','biz + -de → bizde. The passports remained with us. Front vowel i selects -de.',['two_way_vowel_harmony']],
  ['siz','Bu belgenin bir kopyası ___ var mı?','sizde','siz + -de → sizde. You (plural/formal) have a copy. Front vowel i selects -de.',['two_way_vowel_harmony']],
  ['onlar','Yedek anahtar ___.','onlarda','onlar + -da → onlarda. The spare key is with them. Do not insert an extra n after onlar.',['two_way_vowel_harmony']],
 ],
 dative:[
  ['ben','Öğretmen ___ bir soru sordu.','bana','ben → bana is an irregular dative form meaning to me. Learn bana, not bene.',['irregular_dative']],
  ['sen','Yarın ___ haber vereceğim.','sana','sen → sana is an irregular dative form meaning to you (singular). Learn sana, not sene.',['irregular_dative']],
  ['o','Bu paketi ___ gönder.','ona','o → on- + -a → ona. Insert n before the case ending: to him/her/it.',['two_way_vowel_harmony','buffer_n']],
  ['biz','Arkadaşımız ___ yardım ediyor.','bize','biz + -e → bize. Front vowel i selects -e. Yardım etmek takes the dative: helping us.',['two_way_vowel_harmony']],
  ['siz','Görevli ___ yolu gösterecek.','size','siz + -e → size, to you (plural/formal). Front vowel i selects -e.',['two_way_vowel_harmony']],
  ['onlar','Bu kitapları ___ vereceğim.','onlara','onlar + -a → onlara, to them. The final vowel a selects -a; no extra n is needed.',['two_way_vowel_harmony']],
 ],
 ablative:[
  ['ben','Bu haberi ___ duydun mu?','benden','ben + -den → benden, from me. Front vowel e selects -den.',['two_way_vowel_harmony']],
  ['sen','___ bir şey isteyeceğim.','senden','sen + -den → senden, from you (singular). Front vowel e selects -den.',['two_way_vowel_harmony']],
  ['o','___ bir mektup aldım.','ondan','o → on- + -dan → ondan. Insert n before the case ending: from him/her.',['two_way_vowel_harmony','buffer_n']],
  ['biz','___ neden korkuyorsun?','bizden','biz + -den → bizden. Korkmak takes the ablative; here it means being afraid of us.',['two_way_vowel_harmony']],
  ['siz','Bu cevabı ___ bekliyorum.','sizden','siz + -den → sizden, from you (plural/formal). Front vowel i selects -den.',['two_way_vowel_harmony']],
  ['onlar','Bu hediyeler ___ geldi.','onlardan','onlar + -dan → onlardan, from them. Do not insert an extra n after onlar.',['two_way_vowel_harmony']],
 ],
 accusative:[
  ['ben','Öğretmen ___ çağırdı.','beni','ben + -i → beni, me as the direct object. Front unrounded e selects -i.',['four_way_vowel_harmony']],
  ['sen','Dün parkta ___ gördüm.','seni','sen + -i → seni, you (singular) as the direct object. Front unrounded e selects -i.',['four_way_vowel_harmony']],
  ['o','Kalabalıkta ___ tanıdım.','onu','o → on- + -u → onu, him/her as the direct object. Insert n, then use rounded -u.',['four_way_vowel_harmony','buffer_n']],
  ['biz','Arkadaşlarımız ___ bekliyor.','bizi','biz + -i → bizi, us as the direct object. Front unrounded i selects -i.',['four_way_vowel_harmony']],
  ['siz','Yarın ___ arayacağım.','sizi','siz + -i → sizi, you (plural/formal) as the direct object. Front unrounded i selects -i.',['four_way_vowel_harmony']],
  ['onlar','Çocuklar ___ tanıyor.','onları','onlar + -ı → onları, them as the direct object. Harmony follows the final a in onlar, so use -ı, not -u.',['four_way_vowel_harmony']],
 ],
};
export const pronounCaseQuestions:PronounCaseQuestion[]=(Object.keys(rows) as (keyof typeof rows)[]).flatMap(requiredCase=>rows[requiredCase].map(([pronoun,sentence,answer,explanation,supportingRuleIds])=>({
 id:`pronoun-${requiredCase}-${pronoun}`,conceptId:`pronoun_${requiredCase}` as PronounCaseConcept,
 exerciseType:'typed_pronoun_case',base:pronoun,pronoun,requiredCase,sentence,answer,explanation,supportingRuleIds,
 source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));
export const selectPronounCaseQuestions=(selection:PronounCaseSelection='mixed',random=Math.random)=>shuffle(pronounCaseQuestions.filter(q=>selection==='mixed'||q.conceptId===selection),random);
export const pronounCaseMistakes=(attempts:PilotAttempt[],selection:PronounCaseSelection='mixed')=>latestMistakes(pronounCaseQuestions,attempts,selection);
