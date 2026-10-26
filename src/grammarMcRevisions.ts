import type {GrammarQuestion} from './yeniHitit';

// App-authored drafts guided by Yeni Hitit 1 purpose/nominalization material.
// Not textbook quotations; independent review and exact Ödkem mapping pending.
const revisions:Record<string,Pick<GrammarQuestion,'prompt'|'options'|'correct_option_id'|'explanation'>>={
 'YH1-V68-Q013':{
  prompt:'Choose the sentence with the repeated -A converb expressing how the child went home.',
  options:[{id:'A',text:'Çocuk koşa koşa eve gitti.'},{id:'B',text:'Çocuk koşmadan eve gitti.'},{id:'C',text:'Çocuk koşacak eve gitti.'},{id:'D',text:'Çocuk koşmuş eve gitti.'}],correct_option_id:'A',
  explanation:'Koşa koşa is the repeated -A converb of koşmak (“to run”), describing the child going home running. Unlike the conventional farewell güle güle, this is a straightforward manner expression.',
 },
 'YH1-V6-Q014':{
  prompt:'Complete the accusative ending of the marked direct object: Bu araba___ satın aldım. (I bought this car.)',
  options:[{id:'A',text:'yı'},{id:'B',text:'ya'},{id:'C',text:'da'},{id:'D',text:'dan'}],correct_option_id:'A',
  explanation:'Bu araba is the specified direct object of satın aldım. Add the accusative suffix -(y)I: araba + yı → arabayı. The buffer y joins the vowel-final noun to the suffix.',
 },
 'YH1-V7-Q014':{
  prompt:'Complete with the manner/means converb -(y)ArAk: Otobüse bin___ şehir merkezine gittim. (I went to the city center by taking the bus.)',
  options:[{id:'A',text:'erek'},{id:'B',text:'meden'},{id:'C',text:'miş'},{id:'D',text:'ecek'}],correct_option_id:'A',
  explanation:'Binerek = bin- (“board/get on”) + -erek. Otobüse binerek şehir merkezine gittim describes going to the center by taking the bus; binmek itself denotes boarding, not the whole journey. Binmeden means “without boarding.”',
 },
 'YH1-V11-Q038':{
  prompt:'Choose the word that completes the sentence: Uzun süre ___ zorlanıyorum. (çalışmak)',
  options:[{id:'A',text:'çalışmayı'},{id:'B',text:'çalışmak'},{id:'C',text:'çalışmakta'},{id:'D',text:'çalışmaktan'}],correct_option_id:'C',
  explanation:'Çalışmakta zorlanıyorum means “I have difficulty working.” This pattern uses -makta/-mekte.',
 },
 'YH1-V52-Q015':{
  prompt:'Choose the word that completes the sentence: Geç saatlerde kahve ___ vazgeçtim. (içmek)',
  options:[{id:'A',text:'içmekten'},{id:'B',text:'içmeyi'},{id:'C',text:'içmek'},{id:'D',text:'içmeye'}],correct_option_id:'A',
  explanation:'Vazgeçmek takes an ablative complement: kahve içmekten vazgeçtim means “I gave up drinking coffee.”',
 },
 'YH1-V13-Q034':{
  prompt:'Choose the word that completes the sentence: Türkçe ___ için her gün pratik yapıyorum. (öğrenmek)',
  options:[{id:'A',text:'öğrenmeyi'},{id:'B',text:'öğrenmek'},{id:'C',text:'öğrenmeye'},{id:'D',text:'öğrenmekten'}],correct_option_id:'B',
  explanation:'İçin expresses purpose here: Türkçe öğrenmek için means “in order to learn Turkish.” Use the infinitive before için.',
 },
 'YH1-V64-Q019':{
  prompt:'Choose the word that completes the sentence: Geçen hafta düzenli olarak ___ başladım. (yürümek)',
  options:[{id:'A',text:'yürümekten'},{id:'B',text:'yürümeyi'},{id:'C',text:'yürümek'},{id:'D',text:'yürümeye'}],correct_option_id:'D',
  explanation:'Başlamak takes a dative activity complement: yürümeye başladım means “I started walking.”',
 },
 'YH1-V64-Q020':{
  prompt:'Choose the word that completes the sentence: Denizde tek başıma ___ korkuyorum. (yüzmek)',
  options:[{id:'A',text:'yüzmekten'},{id:'B',text:'yüzmeye'},{id:'C',text:'yüzmeyi'},{id:'D',text:'yüzmek'}],correct_option_id:'A',
  explanation:'Korkmak takes an ablative activity complement here: yüzmekten korkuyorum means “I am afraid of swimming.” Keep k in -mekten.',
 },
};
export function applyMcRevisions(original:GrammarQuestion[]){
 const retired=original.filter(q=>Object.hasOwn(revisions,q.id));
 const active=original.map(q=>Object.hasOwn(revisions,q.id)?{...q,...revisions[q.id],id:q.id+'-v2',replacesQuestionId:q.id,source:'newly_authored' as const,reviewStatus:'draft_needs_independent_review' as const}:q);
 return {active,retired};
}
