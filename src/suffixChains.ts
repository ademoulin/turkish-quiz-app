import {matchesOwner,type OwnerSelection} from './practiceOwners';
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
  ["ev","house","ben","plural","___ bugün temizlik yapılıyor.","evlerimde","ev → evler → evlerim → evlerimde. Add plural -ler, my -im, then locative -de.",[]],
  ["ev","house","sen","singular","Bu akşam ___ buluşalım.","evinde","ev → evin → evinde. Add your -in, then locative -de. The n is already part of your possessive ending.",[]],
  ["ev","house","o","singular","Kitaplar ___ kaldı.","evinde","ev → evi → evinde. Add his/her -i, then n + locative -de.",["buffer_n"]],
  ["ev","house","biz","plural","___ ayrı mutfaklar var.","evlerimizde","ev → evler → evlerimiz → evlerimizde. Add plural -ler, our -imiz, then locative -de.",[]],
  ["ev","house","siz","singular","Bu gece ___ kaç kişi kalacak?","evinizde","ev → eviniz → evinizde. Add your (plural/formal owner) -iniz, then locative -de. The house is singular.",[]],
  ["ev","house","onlar","plural","Arkadaşlar ___ kalıyor.","evlerinde","ev → evleri → evlerinde. Their plural houses use evleri; add n + locative -de. Do not double the plural ending.",["buffer_n"]],
 ],
 dative:[
  ['çanta','bag','ben','plural','Kitapları ___ koydum.','çantalarıma','çanta → çantalar → çantalarım → çantalarıma. Add plural -lar, my -ım, then dative -a.',[]],
  ['köpek','dog','sen','singular','Veteriner ___ ilaç verdi.','köpeğine','köpek → köpeğin → köpeğine. Final k softens to ğ before your -in; then add dative -e. The n is already part of your possessive ending.',['consonant_softening']],
  ['kedi','cat','o','plural','Her sabah ___ mama veriyor.','kedilerine','kedi → kediler → kedileri → kedilerine. Add plural -ler, his/her -i, then n + dative -e.',['buffer_n']],
  ['ev','house','biz','singular','Yarın ___ misafir gelecek.','evimize','ev → evimiz → evimize. Add our -imiz, then dative -e. Do not add a plural ending for one house.',[]],
  ['bahçe','garden','siz','singular','Kedi ___ girdi.','bahçenize','bahçe → bahçeniz → bahçenize. Add your (plural/formal owner) -niz to vowel-final bahçe, then dative -e. The garden is singular.',[]],
  ['oda','room','onlar','plural','Akşam ___ döndüler.','odalarına','oda → odaları → odalarına. Their plural rooms use odaları; add n + dative -a.',['buffer_n']],
  ["kitap","book","ben","singular","Lütfen ___ dokunma.","kitabıma","kitap → kitabım → kitabıma. Final p softens to b before my -ım; then add dative -a.",["consonant_softening"]],
  ["ev","house","sen","plural","Bu hafta ___ yeni pencereler takıldı.","evlerine","ev → evler → evlerin → evlerine. Add plural -ler, your -in, then dative -e. Do not add another n.",[]],
  ["ev","house","o","singular","Akşam ___ uğrayacağız.","evine","ev → evi → evine. Add his/her -i, then n + dative -e.",["buffer_n"]],
  ["köpek","dog","biz","singular","Çocuk ___ su verdi.","köpeğimize","köpek → köpeğimiz → köpeğimize. Final k softens to ğ before our -imiz; then add dative -e.",["consonant_softening"]],
  ["çanta","bag","siz","plural","Eşyaları ___ yerleştirin.","çantalarınıza","çanta → çantalar → çantalarınız → çantalarınıza. Add plural -lar, your -ınız, then dative -a.",[]],
  ["ev","house","onlar","plural","Misafirler ___ geldi.","evlerine","ev → evleri → evlerine. Their plural houses use evleri; add n + dative -e.",["buffer_n"]],
 ],
 ablative:[
  ['göz','eye','ben','singular','___ bir damla yaş geldi.','gözümden','göz → gözüm → gözümden. Add my -üm, then ablative -den. The requested eye is singular.',[]],
  ['araba','car','sen','singular','Çantayı ___ aldım.','arabandan','araba → araban → arabandan. Add your -n to vowel-final araba, then ablative -dan. Do not insert an extra n.',[]],
  ['ev','house','o','singular','Sabah erkenden ___ çıktı.','evinden','ev → evi → evinden. Add his/her -i, then n + ablative -den.',['buffer_n']],
  ['kitap','book','biz','plural','Bu bilgileri ___ öğrendik.','kitaplarımızdan','kitap → kitaplar → kitaplarımız → kitaplarımızdan. Add plural -lar, our -ımız, then ablative -dan. The p stays before consonant-initial -lar.',[]],
  ['çanta','bag','siz','plural','Anahtarları ___ çıkarın.','çantalarınızdan','çanta → çantalar → çantalarınız → çantalarınızdan. Add plural -lar, your -ınız, then ablative -dan.',[]],
  ['okul','school','onlar','plural','Saat dörtte ___ ayrıldılar.','okullarından','okul → okulları → okullarından. Their plural schools use okulları; add n + ablative -dan.',['buffer_n']],
  ["ev","house","ben","plural","Bu yıl ___ birini satacağım.","evlerimden","ev → evler → evlerim → evlerimden. Add plural -ler, my -im, then ablative -den.",[]],
  ["ev","house","sen","plural","Dün ___ birinden çıktım.","evlerinden","ev → evler → evlerin → evlerinden. Add plural -ler, your -in, then ablative -den. Do not add another n.",[]],
  ["ev","house","o","singular","Dün ___ bir kitap aldım.","evinden","ev → evi → evinden. Add his/her -i, then n + ablative -den.",["buffer_n"]],
  ["oda","room","biz","singular","___ müzik sesi geliyor.","odamızdan","oda → odamız → odamızdan. Add our -mız to vowel-final oda, then ablative -dan.",[]],
  ["kitap","book","siz","singular","Bu cümleyi ___ aldım.","kitabınızdan","kitap → kitabınız → kitabınızdan. Final p softens to b before your -ınız; then add ablative -dan.",["consonant_softening"]],
  ["ev","house","onlar","plural","___ birinden duman çıkıyor.","evlerinden","ev → evleri → evlerinden. Their plural houses use evleri; add n + ablative -den.",["buffer_n"]],
 ],
 accusative:[
  ['kitap','book','ben','plural','Öğretmene ___ gösteriyorum.','kitaplarımı','kitap → kitaplar → kitaplarım → kitaplarımı. Add plural -lar, my -ım, then accusative -ı.',[]],
  ['çanta','bag','sen','singular','Lütfen ___ kapat.','çantanı','çanta → çantan → çantanı. Add your -n, then accusative -ı. Do not insert another n.',[]],
  ['göz','eye','o','singular','Doktor ___ muayene ediyor.','gözünü','göz → gözü → gözünü. Add his/her -ü, then n + accusative -ü.',['buffer_n']],
  ['çocuk','child','biz','singular','Okulun önünde ___ bekliyoruz.','çocuğumuzu','çocuk → çocuğumuz → çocuğumuzu. Final k softens to ğ before our -umuz; then add accusative -u.',['consonant_softening']],
  ['ev','house','siz','plural','Fotoğrafta ___ görüyorum.','evlerinizi','ev → evler → evleriniz → evlerinizi. Add plural -ler, your -iniz, then accusative -i.',[]],
  ['köpek','dog','onlar','plural','Veteriner ___ muayene etti.','köpeklerini','köpek → köpekleri → köpeklerini. Their plural dogs use köpekleri; add n + accusative -i. The k stays before consonant-initial -ler.',['buffer_n']],
  ["çanta","bag","ben","singular","Otobüste ___ unuttum.","çantamı","çanta → çantam → çantamı. Add my -m to vowel-final çanta, then accusative -ı.",[]],
  ["kitap","book","sen","plural","Yarın ___ getireceğim.","kitaplarını","kitap → kitaplar → kitapların → kitaplarını. Add plural -lar, your -ın, then accusative -ı. The p stays before consonant-initial -lar.",[]],
  ["ev","house","o","plural","Bu haritada ___ görüyorum.","evlerini","ev → evler → evleri → evlerini. Add plural -ler, his/her -i, then n + accusative -i.",["buffer_n"]],
  ["kutu","box","biz","singular","Paketi açmadan önce ___ masaya koyduk.","kutumuzu","kutu → kutumuz → kutumuzu. Add our -muz to vowel-final kutu, then accusative -u.",[]],
  ["köpek","dog","siz","singular","Bahçede ___ gördük.","köpeğinizi","köpek → köpeğiniz → köpeğinizi. Final k softens to ğ before your -iniz, then add accusative -i.",["consonant_softening"]],
  ["ev","house","onlar","plural","Geçen yaz ___ gezdik.","evlerini","ev → evleri → evlerini. Their plural houses use evleri; add n + accusative -i.",["buffer_n"]],
 ],
};
export const suffixChainQuestions:SuffixChainQuestion[]=(Object.keys(rows) as (keyof typeof rows)[]).flatMap(requiredCase=>rows[requiredCase].map(([baseNoun,baseMeaning,owner,nounNumber,sentence,answer,explanation,rules],i)=>({
 id:`suffix-chain-${requiredCase}-${String(i+1).padStart(2,'0')}`,
 conceptId:`suffix_chain_${requiredCase}` as SuffixChainConcept,
 exerciseType:'typed_suffix_chain',base:baseNoun,baseNoun,baseMeaning,owner,nounNumber,requiredCase,sentence,answer,explanation,
 supportingRuleIds:['two_way_vowel_harmony','four_way_vowel_harmony',...rules],
 source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));
export function selectSuffixChainQuestions(selection:SuffixChainSelection='mixed',number:PossessedNumberSelection='mixed',random=Math.random,owner:OwnerSelection='mixed'){
 return shuffle(suffixChainQuestions.filter(q=>(selection==='mixed'||q.conceptId===selection)&&(number==='mixed'||q.nounNumber===number)&&matchesOwner(q.owner,owner)),random);
}
export const suffixChainMistakes=(attempts:PilotAttempt[],selection:SuffixChainSelection='mixed',number:PossessedNumberSelection='mixed',owner:OwnerSelection='mixed')=>latestMistakes(suffixChainQuestions.filter(q=>(number==='mixed'||q.nounNumber===number)&&matchesOwner(q.owner,owner)),attempts,selection);

export const countSuffixChainQuestions=(selection:SuffixChainSelection='mixed',number:PossessedNumberSelection='mixed',owner:OwnerSelection='mixed')=>suffixChainQuestions.filter(q=>(selection==='mixed'||q.conceptId===selection)&&(number==='mixed'||q.nounNumber===number)&&matchesOwner(q.owner,owner)).length;
