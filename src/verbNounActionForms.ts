import type {VerbNounExample} from './verbNouns';

/** Newly authored, not textbook quotations. Guidance: supplied Yeni Hitit 1
 * §10.2 p.125 (-mek için), §§12.1/12.2 pp.145/149 and support p.172.
 * Independent linguistic review and exact Ödkem mapping remain pending.
 * No possessive agreement, embedded subjects, negation or finite conjugation.
 */
type Pattern='subject'|'want'|'accusative'|'dative'|'ablative'|'purpose'|'locative';
type Forms=readonly [string,string,string,string,string]; // infinitive, ACC, DAT, ABL, LOC
const forms:Record<string,Forms>={
 yüz:['yüzmek','yüzmeyi','yüzmeye','yüzmekten','yüzmekte'],
 oku:['okumak','okumayı','okumaya','okumaktan','okumakta'],
 dinle:['dinlemek','dinlemeyi','dinlemeye','dinlemekten','dinlemekte'],
 öğren:['öğrenmek','öğrenmeyi','öğrenmeye','öğrenmekten','öğrenmekte'],
 koş:['koşmak','koşmayı','koşmaya','koşmaktan','koşmakta'],
 yürü:['yürümek','yürümeyi','yürümeye','yürümekten','yürümekte'],
 konuş:['konuşmak','konuşmayı','konuşmaya','konuşmaktan','konuşmakta'],
 çalış:['çalışmak','çalışmayı','çalışmaya','çalışmaktan','çalışmakta'],
 dinlen:['dinlenmek','dinlenmeyi','dinlenmeye','dinlenmekten','dinlenmekte'],
 anla:['anlamak','anlamayı','anlamaya','anlamaktan','anlamakta'],
};
const index:Record<Pattern,number>={subject:0,want:0,accusative:1,dative:2,ablative:3,purpose:0,locative:4};
const why:Record<Pattern,string>={
 subject:'The whole activity is the subject of the evaluation. Practise the infinitive naming the activity: -mak/-mek, with no object case.',
 want:'For the common bare-infinitive “want to” construction, use -mak/-mek + istemek. Do not automatically copy the accusative pattern of sevmek. Accusative nominal complements with istemek can also occur; this exercise requests the bare-infinitive pattern rather than declaring every alternative ungrammatical.',
 accusative:'Sevmek takes the activity as its accusative object in this pattern: -ma/-me + buffer y + -ı/-i. English “-ing” alone does not tell you the Turkish ending.',
 dative:'Başlamak connects to the activity with dative: -ma/-me + buffer y + -a/-e. Choose the ending from the supplied predicate, not from the English word “to”.',
 ablative:'The supplied predicate connects to the activity with ablative: -mak/-mek + -tan/-ten. Keep the infinitive k; d becomes t after voiceless k. The -madan/-meden “without doing” construction would express a different relationship.',
 purpose:'The supplied için expresses purpose, “in order to”. Use the infinitive -mak/-mek before it. İçin already supplies the connection; do not add an accusative or dative ending.',
 locative:'Zorlanmak takes the activity with locative in this pattern: -mak/-mek + -ta/-te. Keep k, and use t after voiceless k. Here the -makta form is a complement of zorlanmak, not a finite progressive predicate. Other -mada/-mede noun constructions exist; this lesson practises the infinitive pattern.',
};
const rows:readonly [string,string,Pattern,string,string,string,string][]=[
 ['yüz','swim','subject','Denizde ___ güzel.','Swimming in the sea is enjoyable.','Swimming in the sea is forbidden.','I want to swim in the sea.'],
 ['yüz','swim','want','Denizde ___ istiyorum.','I want to swim in the sea.','I like swimming in the sea.','I am afraid of swimming in the sea.'],
 ['yüz','swim','accusative','Denizde ___ seviyorum.','I like swimming in the sea.','I want to swim in the sea.','I started swimming in the sea.'],
 ['yüz','swim','dative','Denizde ___ başladım.','I started swimming in the sea.','I want to swim in the sea.','I got tired of swimming in the sea.'],
 ['yüz','swim','ablative','Denizde ___ korkuyorum.','I am afraid of swimming in the sea.','I like swimming in the sea.','I have difficulty swimming in the sea.'],
 ['yüz','swim','purpose','Denizde ___ için sahile geldim.','I came to the shore to swim in the sea.','I started swimming in the sea.','I came to the shore without swimming in the sea.'],
 ['yüz','swim','locative','Denizde ___ zorlanıyorum.','I have difficulty swimming in the sea.','I am afraid of swimming in the sea.','I enjoy swimming in the sea.'],
 ['oku','read','subject','Kitap ___ faydalı.','Reading books is beneficial.','I like reading books.','Reading books is harmful.'],
 ['oku','read','want','Kitap ___ istiyorum.','I want to read books.','I like reading books.','I got tired of reading books.'],
 ['oku','read','accusative','Kitap ___ seviyorum.','I like reading books.','I want to read books.','I started reading books.'],
 ['oku','read','dative','Kitap ___ başladım.','I started reading books.','I want to read books.','I have difficulty reading books.'],
 ['oku','read','ablative','Sürekli aynı kitabı ___ sıkıldım.','I got bored with constantly reading the same book.','I started reading the same book.','I want to read the same book again.'],
 ['oku','read','purpose','Kitap ___ için kütüphaneye gittim.','I went to the library to read books.','I went to the library without reading books.','I got tired of reading books in the library.'],
 ['oku','read','locative','Küçük yazıları ___ zorlanıyorum.','I have difficulty reading small print.','I enjoy reading small print.','I want to read small print.'],
 ['dinle','listen','accusative','Müzik ___ seviyorum.','I like listening to music.','I want to listen to music.','I started listening to music.'],
 ['öğren','learn','accusative','Yeni kelimeler ___ seviyorum.','I like learning new words.','I want to learn new words.','I have difficulty learning new words.'],
 ['koş','run','dative','Parkta ___ başladım.','I started running in the park.','I want to run in the park.','I am afraid of running in the park.'],
 ['yürü','walk','dative','Her sabah ___ başladım.','I started walking every morning.','I enjoy walking every morning.','I want to walk every morning.'],
 ['konuş','speak','ablative','Kalabalık önünde ___ korkuyorum.','I am afraid of speaking in front of a crowd.','I like speaking in front of a crowd.','I started speaking in front of a crowd.'],
 ['çalış','work','ablative','Bütün gün ___ sıkıldım.','I got fed up with working all day.','I want to work all day.','I like working all day.'],
 ['dinlen','rest','purpose','Biraz ___ için mola verdim.','I took a break to rest a little.','I took a break without resting.','I got tired of resting.'],
 ['konuş','speak','purpose','Seninle ___ için aradım.','I called to speak with you.','I am afraid of speaking with you.','I called without speaking with you.'],
 ['öğren','learn','locative','Yeni kelimeler ___ zorlanıyorum.','I have difficulty learning new words.','I like learning new words.','I want to learn new words.'],
 ['anla','understand','locative','Bu metni ___ zorlanıyorum.','I have difficulty understanding this text.','I want to understand this text.','I started understanding this text.'],
];
export const actionFormExamples:VerbNounExample[]=rows.map(([stem,verbMeaning,pattern,template,meaning,d1,d2],i)=>{
 const choices=forms[stem],answer=choices[index[pattern]],position=template.indexOf('___');
 const rest=template.slice(position+3).trim().replace(/\.$/,'');
 const purpose=pattern==='purpose';
 const unit=template.slice(0,position)+answer+(purpose?' için':'');
 const main=purpose?rest.slice('için '.length):rest;
 const front=choices[0].endsWith('mek');
 const suffix=([front?'mek':'mak',front?'me + y + i':'ma + y + ı',front?'me + y + e':'ma + y + a',front?'mek + ten':'mak + tan',front?'mek + te':'mak + ta'])[index[pattern]];
 return {
  id:`vn2b-${String(i+1).padStart(2,'0')}`,lessonId:'action_forms',stem,verbMeaning,form:'choose_action_form',
  sentence:template.replace('___',answer),template,answer,meaning,distractors:[d1,d2],unit,main,
  structurePrompt:`Intended message: ${meaning} Choose the complete word that fits the supplied phrase.${pattern==='want'?' Use the common bare-infinitive wanting pattern.':pattern==='subject'?' Name the general activity with an infinitive.':''}`,
  structureAnswer:answer,
  structureChoices:[{id:'target',text:answer},...choices.filter(f=>f!==answer).map((text,i)=>({id:`other-${i+1}`,text}))],
  breakdown:`${stem} + ${suffix}${purpose?' + için (purpose)':''}`,
  explanation:`${why[pattern]} The requested form is ${answer}. This question concerns the activity itself; no possessive agreement or separate embedded subject is added.`,
  supportingRuleIds:['two_way_vowel_harmony',...(['accusative','dative'].includes(pattern)?['buffer_y',...(pattern==='accusative'?['four_way_vowel_harmony']:[])]:[]),...(['ablative','locative'].includes(pattern)?['voiceless_assimilation']:[])],
 };
});
