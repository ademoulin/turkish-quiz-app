import type {ChoiceQuestion} from './caseChoice';

// Authored practice, guided by Yeni Hitit 1 case scope (§2.2 pp.28–29,
// §6.1 p.73) and lexical examples elsewhere in the book. Not textbook quotations.
// Exact per-verb Ödkem mapping and independent linguistic review are pending.
const patterns = [
 {id:'yardim_etmek',lemma:'yardım etmek',requiredCase:'dative',rule:'Yardım etmek takes the dative for the person you help; English help has no preposition.',rows:[
  ['çocuk','Öğretmen ___ yardım ediyor.','The teacher is helping the child.','çocuğa','u selects a; k softens to ğ.',['two_way_vowel_harmony','consonant_softening']],
  ['öğrenci','Görevli bu ___ yardım ediyor.','The staff member is helping this student.','öğrenciye','i selects e; buffer y separates the vowels.',['two_way_vowel_harmony','buffer_y']],
 ]},
 {id:'bakmak',lemma:'bakmak',requiredCase:'dative',rule:'Bakmak takes the dative for what you look at; English at does not mean Turkish locative here.',rows:[
  ['fotoğraf','Şu ___ bakıyorum.','I am looking at that photograph.','fotoğrafa','a selects a.',['two_way_vowel_harmony']],
  ['bahçe','Pencereden ___ bakıyorum.','I am looking at the garden through the window.','bahçeye','e selects e; buffer y separates the vowels.',['two_way_vowel_harmony','buffer_y']],
 ]},
 {id:'inanmak',lemma:'inanmak',requiredCase:'dative',rule:'İnanmak takes the dative for the person or information you believe.',rows:[
  ['öğretmen','Öğrenciler ___ inanıyor.','The students believe the teacher.','öğretmene','e selects e.',['two_way_vowel_harmony']],
  ['haber','Bu ___ inanmıyorum.','I do not believe this news.','habere','e selects e.',['two_way_vowel_harmony']],
 ]},
 {id:'guvenmek',lemma:'güvenmek',requiredCase:'dative',rule:'Güvenmek takes the dative for the person or group you trust.',rows:[
  ['doktor','Bu ___ güveniyorum.','I trust this doctor.','doktora','o selects a.',['two_way_vowel_harmony']],
  ['ekip','Bu ___ güveniyoruz.','We trust this team.','ekibe','i selects e; p softens to b.',['two_way_vowel_harmony','consonant_softening']],
 ]},
 {id:'hoslanmak',lemma:'hoşlanmak',requiredCase:'ablative',rule:'Hoşlanmak takes the ablative for what you like; English like does not use from.',rows:[
  ['müzik','Bu ___ hoşlanıyorum.','I like this music.','müzikten','i selects e; voiceless k requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
  ['film','Bu ___ hiç hoşlanmadım.','I did not like this film at all.','filmden','i selects e; voiced m keeps d.',['two_way_vowel_harmony']],
 ]},
 {id:'korkmak',lemma:'korkmak',requiredCase:'ablative',rule:'Korkmak takes the ablative for what you fear; English of does not determine the Turkish ending.',rows:[
  ['köpek','Bu ___ korkuyorum.','I am afraid of this dog.','köpekten','e selects e; voiceless k requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
  ['karanlık','Çocuk ___ korkuyor.','The child is afraid of the dark.','karanlıktan','ı selects a; voiceless k requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
 ]},
 {id:'nefret_etmek',lemma:'nefret etmek',requiredCase:'ablative',rule:'Nefret etmek takes the ablative for what you hate.',rows:[
  ['gürültü','Bu ___ nefret ediyorum.','I hate this noise.','gürültüden','ü selects e; no buffer is needed before d.',['two_way_vowel_harmony']],
  ['trafik','Bu ___ nefret ediyorum.','I hate this traffic.','trafikten','i selects e; voiceless k requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
 ]},
 {id:'sikilmak',lemma:'sıkılmak',requiredCase:'ablative',rule:'Sıkılmak takes the ablative for what you are bored with or tired of.',rows:[
  ['iş','Bu ___ çok sıkıldım.','I am really tired of this job.','işten','i selects e; voiceless ş requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
  ['ders','Öğrenciler bu ___ sıkılıyor.','The students are bored with this lesson.','dersten','e selects e; voiceless s requires t.',['two_way_vowel_harmony','voiceless_assimilation']],
 ]},
 {id:'beklemek',lemma:'beklemek',requiredCase:'accusative',rule:'Beklemek takes a direct object, without a Turkish equivalent of English for. This identified object takes the accusative; nonspecific objects can be bare in other contexts.',rows:[
  ['otobüs','Şu ___ bekliyorum.','I am waiting for that bus.','otobüsü','ü selects ü; s does not change.',['four_way_vowel_harmony']],
  ['çocuk','Öğretmen şu ___ bekliyor.','The teacher is waiting for that child.','çocuğu','u selects u; k softens to ğ.',['four_way_vowel_harmony','consonant_softening']],
 ]},
 {id:'aramak',lemma:'aramak',requiredCase:'accusative',rule:'Aramak takes a direct object when you search for something or call someone. This identified object takes the accusative; not every object of aramak must be marked.',rows:[
  ['anahtar','Şu ___ arıyorum.','I am looking for that key.','anahtarı','a selects ı.',['four_way_vowel_harmony']],
  ['doktor','Bu ___ arıyorum.','I am calling this doctor on the phone.','doktoru','o selects u.',['four_way_vowel_harmony']],
 ]},
 {id:'ozlemek',lemma:'özlemek',requiredCase:'accusative',rule:'Özlemek takes a direct object for the person or thing you miss. This identified object takes the accusative.',rows:[
  ['ev','Bu ___ çok özledim.','I really miss this house.','evi','e selects i.',['four_way_vowel_harmony']],
  ['arkadaş','Bu ___ çok özledim.','I really miss this friend.','arkadaşı','a selects ı; ş does not change.',['four_way_vowel_harmony']],
 ]},
 {id:'dinlemek',lemma:'dinlemek',requiredCase:'accusative',rule:'Dinlemek takes a direct object, without a Turkish equivalent of English to. This identified object takes the accusative; nonspecific objects can be bare in other contexts.',rows:[
  ['şarkı','Şu ___ dinliyorum.','I am listening to that song.','şarkıyı','ı selects ı; buffer y separates the vowels.',['four_way_vowel_harmony','buffer_y']],
  ['öğretmen','Bu ___ dikkatle dinliyoruz.','We are listening carefully to this teacher.','öğretmeni','e selects i.',['four_way_vowel_harmony']],
 ]},
] satisfies {id:string;lemma:string;requiredCase:'dative'|'ablative'|'accusative';rule:string;rows:[string,string,string,string,string,string[]][]}[];

export const verbCaseQuestions:ChoiceQuestion[]=patterns.flatMap(p=>p.rows.map(([base,sentence,meaning,answer,form,supportingRuleIds],i)=>({
 id:`choose-verb-${p.id}-${String(i+1).padStart(2,'0')}`,
 conceptId:`case_choice_${p.requiredCase}`,requiredCase:p.requiredCase,
 verbPatternId:`verb_case_${p.id}`,verbLemma:p.lemma,
 base,sentence,meaning,answer,explanation:`${p.rule} Form: ${base} → ${answer}; ${form}`,
 supportingRuleIds,exerciseType:'case_choice_completion',source:'newly_authored',reviewStatus:'draft_needs_independent_review',
})));
