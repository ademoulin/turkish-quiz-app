import {shuffle} from './shuffle';
import {latestMistakes} from './practiceReview';
import type {CaseQuestion,Concept,PilotAttempt} from './casePilot';
import type {PossessedNumberSelection} from './possessedCases';
export const suffixChainConcepts={
 suffix_chain_locative:'Build number + possession + locative',
 suffix_chain_dative:'Build number + possession + dative',
 suffix_chain_ablative:'Build number + possession + ablative',
 suffix_chain_accusative:'Build number + possession + accusative',
} as const;
export type SuffixChainConcept=keyof typeof suffixChainConcepts;
export type SuffixChainSelection=SuffixChainConcept|'mixed';
export interface SuffixChainQuestion extends Omit<CaseQuestion,'conceptId'|'exerciseType'> {
 conceptId:SuffixChainConcept;
 exerciseType:'typed_suffix_chain';
 baseNoun:string;
 baseMeaning:string;
 requiredCase:Exclude<Concept,'genitive'>;
 owner:'ben'|'sen'|'o'|'biz'|'siz'|'onlar';
 nounNumber:'singular'|'plural';
}
export const suffixChainCatalogMapping={
 testedRules:{possession:20,cases:{locative:15,dative:14,ablative:16,accusative:35}},
 supportingRules:{two_way_vowel_harmony:2,four_way_vowel_harmony:3,consonant_softening:4,buffer_n:8,buffer_s:8},
 pluralCatalogRule:null,
 pluralMappingStatus:'No dedicated plural-noun row identified in the supplied catalog snapshot; textbook mapping used.',
 textbook:'Yeni Hitit 1 plural forms printed p.11, possessives §3.1 printed p.37, case sections §2.2 p.29 and §6.1 p.73; grammar appendix §7.5(i)',
 source:'Turkish Vocab Quiz - Source Vocab · Ödkem Rules (provided workbook snapshot)',
 scope:'Produce the full singular/plural + possessive + explicitly named case chain from a bare noun. Not case choice or sentence production. Their questions explicitly request plural possessions.',
} as const;
// Newly authored drafts. Base, meaning, owner, number, sentence, expected word,
// post-check chain explanation and supporting phonological rules.
const rows:Record<Exclude<Concept,'genitive'>,[string,string,SuffixChainQuestion['owner'],SuffixChainQuestion['nounNumber'],string,string,string,string[]][]>={
 locative:[
  ['kitap','book','ben','singular','Bu konu ___ anlatılıyor.','kitabımda','kitap → kitabım → kitabımda. For my one book, p softens to b before -ım; then add locative -da.',['consonant_softening']],
  ['ev','house','sen','plural','Bu kış ___ kim kalıyor?','evlerinde','ev → evler → evlerin → evlerinde. Add plural -ler, your -in, then locative -de. The n belongs to your possessive ending; do not insert another n.',[]],
  ['oda','room','o','singular','Anahtar ___ duruyor.','odasında','oda → odası → odasında. Add his/her -sı (buffer s), then n + locative -da.',['buffer_s','buffer_n']],
  ['köy','village','biz','plural','Yazın ___ şenlikler oluyor.','köylerimizde','köy → köyler → köylerimiz → köylerimizde. Add plural -ler, our -imiz, then locative -de.',[]],
  ['okul','school','siz','singular','Bugün ___ bir tören var.','okulunuzda','okul → okulunuz → okulunuzda. Add your (plural/formal owner) -unuz, then locative -da. There is only one school.',[]],
  ['araba','car','onlar','plural','Çocuk koltukları ___ duruyor.','arabalarında','araba → arabaları → arabalarında. Their plural cars use arabaları; add n + locative -da. Do not double the plural ending.',['buffer_n']],
 ],
 dative:[
  ['çanta','bag','ben','plural','Kitapları ___ koydum.','çantalarıma','çanta → çantalar → çantalarım → çantalarıma. Add plural -lar, my -ım, then dative -a.',[]],
  ['köpek','dog','sen','singular','Veteriner ___ ilaç verdi.','köpeğine','köpek → köpeğin → köpeğine. Final k softens to ğ before your -in; then add dative -e. The n is already part of your possessive ending.',['consonant_softening']],
  ['kedi','cat','o','plural','Her sabah ___ mama veriyor.','kedilerine','kedi → kediler → kedileri → kedilerine. Add plural -ler, his/her -i, then n + dative -e.',['buffer_n']],
  ['ev','house','biz','singular','Yarın ___ misafir gelecek.','evimize','ev → evimiz → evimize. Add our -imiz, then dative -e. Do not add a plural ending for one house.',[]],
  ['bahçe','garden','siz','singular','Kedi ___ girdi.','bahçenize','bahçe → bahçeniz → bahçenize. Add your (plural/formal owner) -niz to vowel-final bahçe, then dative -e. The garden is singular.',[]],
  ['oda','room','onlar','plural','Akşam ___ döndüler.','odalarına','oda → odaları → odalarına. Their plural rooms use odaları; add n + dative -a.',['buffer_n']],
 ],
 ablative:[
  ['göz','eye','ben','singular','___ bir damla yaş geldi.','gözümden','göz → gözüm → gözümden. Add my -üm, then ablative -den. The requested eye is singular.',[]],
  ['araba','car','sen','singular','Çantayı ___ aldım.','arabandan','araba → araban → arabandan. Add your -n to vowel-final araba, then ablative -dan. Do not insert an extra n.',[]],
  ['ev','house','o','singular','Sabah erkenden ___ çıktı.','evinden','ev → evi → evinden. Add his/her -i, then n + ablative -den.',['buffer_n']],
  ['kitap','book','biz','plural','Bu bilgileri ___ öğrendik.','kitaplarımızdan','kitap → kitaplar → kitaplarımız → kitaplarımızdan. Add plural -lar, our -ımız, then ablative -dan. The p stays before consonant-initial -lar.',[]],
  ['çanta','bag','siz','plural','Anahtarları ___ çıkarın.','çantalarınızdan','çanta → çantalar → çantalarınız → çantalarınızdan. Add plural -lar, your -ınız, then ablative -dan.',[]],
  ['okul','school','onlar','plural','Saat dörtte ___ ayrıldılar.','okullarından','okul → okulları → okullarından. Their plural schools use okulları; add n + ablative -dan.',['buffer_n']],
 ],
 accusative:[
  ['kitap','book','ben','plural','Öğretmene ___ gösteriyorum.','kitaplarımı','kitap → kitaplar → kitaplarım → kitaplarımı. Add plural -lar, my -ım, then accusative -ı.',[]],
  ['çanta','bag','sen','singular','Lütfen ___ kapat.','çantanı','çanta → çantan → çantanı. Add your -n, then accusative -ı. Do not insert another n.',[]],
  ['göz','eye','o','singular','Doktor ___ muayene ediyor.','gözünü','göz → gözü → gözünü. Add his/her -ü, then n + accusative -ü.',['buffer_n']],
  ['çocuk','child','biz','singular','Okulun önünde ___ bekliyoruz.','çocuğumuzu','çocuk → çocuğumuz → çocuğumuzu. Final k softens to ğ before our -umuz; then add accusative -u.',['consonant_softening']],
  ['ev','house','siz','plural','Fotoğrafta ___ görüyorum.','evlerinizi','ev → evler → evleriniz → evlerinizi. Add plural -ler, your -iniz, then accusative -i.',[]],
  ['köpek','dog','onlar','plural','Veteriner ___ muayene etti.','köpeklerini','köpek → köpekleri → köpeklerini. Their plural dogs use köpekleri; add n + accusative -i. The k stays before consonant-initial -ler.',['buffer_n']],
 ],
};
export const suffixChainQuestions:SuffixChainQuestion[]=(Object.keys(rows) as (keyof typeof rows)[]).flatMap(requiredCase=>rows[requiredCase].map(([baseNoun,baseMeaning,owner,nounNumber,sentence,answer,explanation,rules],i)=>({
 id:`suffix-chain-${requiredCase}-${String(i+1).padStart(2,'0')}`,
 conceptId:`suffix_chain_${requiredCase}` as SuffixChainConcept,
 exerciseType:'typed_suffix_chain',base:baseNoun,baseNoun,baseMeaning,owner,nounNumber,requiredCase,sentence,answer,explanation,
 supportingRuleIds:['two_way_vowel_harmony','four_way_vowel_harmony',...rules],
 source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));
export function selectSuffixChainQuestions(selection:SuffixChainSelection='mixed',number:PossessedNumberSelection='mixed',random=Math.random){
 return shuffle(suffixChainQuestions.filter(q=>(selection==='mixed'||q.conceptId===selection)&&(number==='mixed'||q.nounNumber===number)),random);
}
export const suffixChainMistakes=(attempts:PilotAttempt[],selection:SuffixChainSelection='mixed',number:PossessedNumberSelection='mixed')=>latestMistakes(suffixChainQuestions.filter(q=>number==='mixed'||q.nounNumber===number),attempts,selection);
