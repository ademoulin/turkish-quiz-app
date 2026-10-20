import { shuffle } from './shuffle';
import { latestMistakes } from './practiceReview';
import type { CaseQuestion, Concept, PilotAttempt } from './casePilot';
export const possessedCaseConcepts = {
  possessed_locative: 'Locative on a possessed noun (-DA)',
  possessed_dative: 'Dative on a possessed noun (-A)',
  possessed_ablative: 'Ablative on a possessed noun (-DAn)',
  possessed_accusative: 'Accusative on a possessed noun (-I)',
} as const;
export type PossessedCaseConcept = keyof typeof possessedCaseConcepts;
export type PossessedCaseSelection = PossessedCaseConcept | 'mixed';
export interface PossessedCaseQuestion extends Omit<CaseQuestion, 'conceptId' | 'exerciseType'> {
  conceptId: PossessedCaseConcept;
  exerciseType: 'typed_possessed_case';
  givenForm: string;
  givenMeaning: string;
  requiredCase: Exclude<Concept, 'genitive'>;
  answerScope: 'word' | 'phrase';
  owner: string;
  nounNumber: 'singular';
}
export const possessedCaseCatalogMapping = {
  testedRules: {locative:15, dative:14, ablative:16, accusative:35},
  supportingRules: {possessive_ending:20, genitive_possessive_phrase:21, two_way_vowel_harmony:2, four_way_vowel_harmony:3, buffer_n:8},
  source: 'Turkish Vocab Quiz - Source Vocab · Ödkem Rules (provided workbook snapshot)',
  textbook: 'Yeni Hitit 1 §2.2 printed p.29, §3.1–3.2 printed pp.37–40, §6.1 printed p.73; grammar appendix §7.5(i), possessive endings + case endings',
  scope: 'Add the explicitly requested case to a supplied singular possessed form. Not case choice, possessive-form production, plural possessions or sentence production. Third-person n also precedes consonant-initial locative/ablative; the catalog buffer rule is a supporting, partial mapping.',
} as const;
// Newly authored exercises. The supplied form already contains possession; only the added case is tested.
// given form, owner, sentence, answer, suffix, third-person n
const rows: Record<Exclude<Concept,'genitive'>, [string,string,string,string,string,boolean][]> = {
 locative: [
  ['evim','ben','Akşamları ___ dinleniyorum.','evimde','-de',false],
  ['çantan','sen','Anahtarlar ___ duruyor.','çantanda','-da',false],
  ['arabası','o','Telefon ___ kaldı.','arabasında','-da',true],
  ['köyümüz','biz','Yazın ___ çok turist oluyor.','köyümüzde','-de',false],
  ['ofisiniz','siz','Bugün ___ bir toplantı var.','ofisinizde','-de',false],
  ['çocuğun odası','çocuk','Oyuncaklar ___ duruyor.','çocuğun odasında','-da',true],
  ["odam", "ben", "Bu akşam ___ ders çalışıyorum.", "odamda", "-da", false],
  ["evin", "sen", "Bugün ___ kim var?", "evinde", "-de", false],
  ["evi", "o", "Bu akşam ___ kalıyoruz.", "evinde", "-de", true],
  ["arabamız", "biz", "Harita ___ duruyor.", "arabamızda", "-da", false],
  ["gözlüğünüz", "siz", "___ küçük bir çizik var.", "gözlüğünüzde", "-de", false],
  ["komşunun evi", "komşu", "Kedi ___ uyuyor.", "komşunun evinde", "-de", true],
 ],
 dative: [
  ['okulum','ben','Her sabah ___ yürüyorum.','okuluma','-a',false],
  ['odan','sen','Lütfen bu sandalyeyi ___ götür.','odana','-a',false],
  ['bahçesi','o','Kedi ___ girdi.','bahçesine','-e',true],
  ['evimiz','biz','Yarın ___ misafirler gelecek.','evimize','-e',false],
  ['arabanız','siz','Şimdi ___ biniyoruz.','arabanıza','-a',false],
  ['öğretmenin masası','öğretmen','Defteri ___ koyuyorum.','öğretmenin masasına','-a',true],
  ["evim", "ben", "Dersten sonra ___ dönüyorum.", "evime", "-e", false],
  ["evin", "sen", "Akşam ___ uğrayacağım.", "evine", "-e", false],
  ["evi", "o", "Yarın ___ gideceğiz.", "evine", "-e", true],
  ["köyümüz", "biz", "Yazın ___ dönüyoruz.", "köyümüze", "-e", false],
  ["gözlüğünüz", "siz", "Lütfen ___ dokunmayın.", "gözlüğünüze", "-e", false],
  ["arkadaşın evi", "arkadaş", "Birlikte ___ gidiyoruz.", "arkadaşın evine", "-e", true],
 ],
 ablative: [
  ['odam','ben','Sabah ___ çıktım.','odamdan','-dan',false],
  ['cebin','sen','Anahtarı ___ çıkar.','cebinden','-den',false],
  ['ofisi','o','Toplantıdan sonra ___ çıktık.','ofisinden','-den',true],
  ['okulumuz','biz','Saat dörtte ___ ayrılıyoruz.','okulumuzdan','-dan',false],
  ['bahçeniz','siz','Kedi ___ çıktı.','bahçenizden','-den',false],
  ['kedinin yatağı','kedi','Oyuncağı ___ aldım.','kedinin yatağından','-dan',true],
  ["evim", "ben", "Her sabah ___ erken çıkıyorum.", "evimden", "-den", false],
  ["evin", "sen", "Dün ___ saat kaçta çıktın?", "evinden", "-den", false],
  ["evi", "o", "Az önce ___ ayrıldık.", "evinden", "-den", true],
  ["arabamız", "biz", "Çantaları ___ aldık.", "arabamızdan", "-dan", false],
  ["cebiniz", "siz", "Telefonu ___ çıkarın.", "cebinizden", "-den", false],
  ["öğretmenin odası", "öğretmen", "Öğrenci ___ çıktı.", "öğretmenin odasından", "-dan", true],
 ],
 accusative: [
  ['kalemim','ben','Dün ___ kaybettim.','kalemimi','-i',false],
  ['çantan','sen','Lütfen ___ aç.','çantanı','-ı',false],
  ['gözü','o','Doktor ___ inceliyor.','gözünü','-ü',true],
  ['topumuz','biz','Çocuklar ___ buldu.','topumuzu','-u',false],
  ['kediniz','siz','Bahçede ___ gördüm.','kedinizi','-i',false],
  ['çocuğun kitabı','çocuk','Dün ___ okudum.','çocuğun kitabını','-ı',true],
  ["evim", "ben", "Bu hafta sonu ___ temizleyeceğim.", "evimi", "-i", false],
  ["evin", "sen", "Dün ___ gördüm.", "evini", "-i", false],
  ["evi", "o", "Bu fotoğrafta ___ görüyorum.", "evini", "-i", true],
  ["çocuğumuz", "biz", "Okulun önünde ___ bekliyoruz.", "çocuğumuzu", "-u", false],
  ["yüzünüz", "siz", "Lütfen ___ yıkayın.", "yüzünüzü", "-ü", false],
  ["komşunun köpeği", "komşu", "Parkta ___ gördük.", "komşunun köpeğini", "-i", true],
 ],
};
const givenMeanings: Record<string,string> = {
  "evim": "my house",
  "çantan": "your bag",
  "arabası": "his/her car",
  "köyümüz": "our village",
  "ofisiniz": "your office (plural/formal)",
  "çocuğun odası": "the child’s room",
  "okulum": "my school",
  "odan": "your room",
  "bahçesi": "his/her garden",
  "evimiz": "our house",
  "arabanız": "your car (plural/formal)",
  "öğretmenin masası": "the teacher’s desk",
  "odam": "my room",
  "cebin": "your pocket",
  "ofisi": "his/her office",
  "okulumuz": "our school",
  "bahçeniz": "your garden (plural/formal)",
  "kedinin yatağı": "the cat’s bed",
  "kalemim": "my pen",
  "gözü": "his/her eye",
  "topumuz": "our ball",
  "kediniz": "your cat (plural/formal)",
  "çocuğun kitabı": "the child’s book",
  "evin": "your house",
  "evi": "his/her house",
  "arabamız": "our car",
  "gözlüğünüz": "your pair of glasses",
  "komşunun evi": "the neighbor’s house",
  "arkadaşın evi": "the friend’s house",
  "cebiniz": "your pocket (plural/formal)",
  "öğretmenin odası": "the teacher’s room",
  "çocuğumuz": "our child",
  "yüzünüz": "your face (plural/formal)",
  "komşunun köpeği": "the neighbor’s dog"
};
export const possessedCaseQuestions: PossessedCaseQuestion[] = (Object.keys(rows) as (keyof typeof rows)[]).flatMap(requiredCase =>
 rows[requiredCase].map(([givenForm,owner,sentence,answer,suffix,buffer],i) => ({
  id:`possessed-${requiredCase}-${String(i+1).padStart(2,'0')}`,
  conceptId:`possessed_${requiredCase}` as PossessedCaseConcept,
  exerciseType:'typed_possessed_case', givenForm, givenMeaning:givenMeanings[givenForm], base:givenForm, requiredCase,
  answerScope:givenForm.includes(' ') ? 'phrase' : 'word', owner, nounNumber:'singular',
  sentence,answer,
  explanation:`${givenForm} already includes possession. ${buffer ? 'After the third-person possessive ending, insert n before the case suffix. ' : 'Add the case suffix directly after the supplied possessive ending; no extra buffer is needed. '}${requiredCase === 'accusative' ? 'Four-way' : 'Two-way'} vowel harmony selects ${suffix}: ${answer}.${givenForm.includes(' ') ? ' Keep the first (genitive) word unchanged.' : ''}`,
  supportingRuleIds:['possessive_ending',requiredCase === 'accusative' ? 'four_way_vowel_harmony' : 'two_way_vowel_harmony',...(buffer?['buffer_n']:[]),...(givenForm.includes(' ')?['genitive_possessive_phrase']:[])],
  source:'newly_authored',reviewStatus:'draft_needs_independent_review',
 })));
export function selectPossessedCaseQuestions(selection:PossessedCaseSelection='mixed', random=Math.random) {
 return shuffle(possessedCaseQuestions.filter(q=>selection==='mixed'||q.conceptId===selection),random);
}
export const possessedCaseMistakes=(attempts:PilotAttempt[], selection:PossessedCaseSelection='mixed')=>latestMistakes(possessedCaseQuestions,attempts,selection);
