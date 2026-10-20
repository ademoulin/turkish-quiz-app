import {caseQuestions, matchesCase, type PilotAttempt} from './casePilot';
import {shuffle} from './shuffle';
import {latestMistakes} from './practiceReview';
export const choiceCases = {locative:'Locative · at / in / on',dative:'Dative · to / toward',ablative:'Ablative · from / out of',accusative:'Accusative · specific direct object',bare:'No case ending · nonspecific object / activity'} as const;
export type ChoiceCase = keyof typeof choiceCases;
export interface ChoiceQuestion {
 id:string; conceptId:`case_choice_${ChoiceCase}`; requiredCase:ChoiceCase;
 base:string; sentence:string; meaning:string; answer:string; explanation:string; supportingRuleIds:string[];
 exerciseType:'case_choice_completion'; source:'newly_authored'; reviewStatus:'draft_needs_independent_review';
}
// Yeni Hitit 1 §2.2, printed pp.28–29: location, destination and source.
// Newly authored, not quotations. Ödkem 14/15/16 are partial mappings for usage;
// no dedicated case-selection catalog entry has been verified.
// New accusative/bare contrasts follow §6.1 printed p.73; Ödkem 35 maps
// accusative only, not the independent decision to leave an object unmarked.
const rows:Record<ChoiceCase,[string,string,string,string,string][]> = {
 locative:[
 ['ev','Şu anda ___ dinleniyorum.','I am resting at home right now.','evde','The resting happens at home: location takes the locative.'],
 ['okul','Çocuklar ___ ders çalışıyor.','The children are studying at school.','okulda','School is where the studying happens: use the locative.'],
 ['park','Biz ___ piknik yapıyoruz.','We are having a picnic in the park.','parkta','The park is the location of the picnic: use the locative.'],
 ['sınıf','Öğrenciler ___ oturuyor.','The students are sitting in the classroom.','sınıfta','The students are inside the classroom: use the locative.'],
 ['mutfak','Annem ___ yemek yapıyor.','My mother is cooking in the kitchen.','mutfakta','The kitchen is where she is cooking: use the locative.'],
 ['otobüs','Şu anda ___ oturuyorum.','I am sitting on the bus right now.','otobüste','Sitting on the bus describes a location: use the locative.'],
 ['köy','Dedem ___ yaşıyor.','My grandfather lives in the village.','köyde','The village is where he lives: use the locative.'],
 ['bahçe','Kedi ___ uyuyor.','The cat is sleeping in the garden.','bahçede','The garden is where the cat is sleeping: use the locative.'],
 ['masa','Anahtarlar ___ duruyor.','The keys are on the table.','masada','The table is the location of the keys: use the locative.'],
 ['müze','Turistler ___ fotoğraf çekiyor.','The tourists are taking photos in the museum.','müzede','The museum is where the photos are being taken: use the locative.'],
 ],
 dative:[
 ['ev','Dersten sonra ___ dönüyorum.','I am returning home after class.','eve','Home is the destination of the return: use the dative.'],
 ['okul','Her sabah ___ gidiyorum.','I go to school every morning.','okula','School is the destination: use the dative.'],
 ['park','Çocuklar ___ gidiyor.','The children are going to the park.','parka','The park is the destination: use the dative.'],
 ['bahçe','Kedi ___ giriyor.','The cat is entering the garden.','bahçeye','The garden is the destination of entering: use the dative.'],
 ['araba','Şimdi ___ biniyoruz.','We are getting into the car now.','arabaya','Binmek takes the dative for the vehicle being boarded.'],
 ['köprü','Yavaşça ___ yaklaşıyoruz.','We are slowly approaching the bridge.','köprüye','Yaklaşmak takes the dative for what you approach.'],
 ['kapı','Birisi ___ vuruyor.','Someone is knocking on the door.','kapıya','Kapıya vurmak means to knock on the door; this use takes the dative.'],
 ['çocuk','Öğretmen ___ bir soru soruyor.','The teacher is asking the child a question.','çocuğa','The child receives the question: use the dative.'],
 ['kitap','Merakla ___ bakıyorum.','I am looking at the book with curiosity.','kitaba','Bakmak takes the dative for what you look at, despite English “at”.'],
 ['müze','Yarın ___ gidiyoruz.','We are going to the museum tomorrow.','müzeye','The museum is the destination: use the dative.'],
 ],
 ablative:[
 ['ev','Sabah erkenden ___ çıkıyorum.','I leave the house early in the morning.','evden','The house is where you come out of: use the ablative.'],
 ['okul','Çocuklar ___ geliyor.','The children are coming from school.','okuldan','School is the source of their journey: use the ablative.'],
 ['park','Akşam ___ dönüyoruz.','We are returning from the park in the evening.','parktan','The park is where you return from: use the ablative.'],
 ['sınıf','Öğrenciler ___ çıkıyor.','The students are leaving the classroom.','sınıftan','The classroom is where they come out of: use the ablative.'],
 ['otobüs','Bir sonraki durakta ___ iniyorum.','I am getting off the bus at the next stop.','otobüsten','İnmek takes the ablative for the vehicle you get off.'],
 ['iş','Babam saat altıda ___ dönüyor.','My father returns from work at six.','işten','Work is where he returns from: use the ablative.'],
 ['köy','Bu sabah ___ geldik.','We came from the village this morning.','köyden','The village is the source of the journey: use the ablative.'],
 ['bahçe','Kedi ___ içeri giriyor.','The cat is coming inside from the garden.','bahçeden','The garden is where the cat comes from: use the ablative.'],
 ['ağaç','Sonbaharda yapraklar ___ düşüyor.','Leaves fall from the tree in autumn.','ağaçtan','The tree is where the leaves fall from: use the ablative.'],
 ['köpek','Çocuk ___ korkuyor.','The child is afraid of the dog.','köpekten','Korkmak takes the ablative for what you fear; English “of” does not determine the Turkish case.'],
 ],
 accusative:[
 ['kitap','Bu ___ okuyorum.','I am reading this book.','kitabı','Bu identifies a particular book as the direct object: use the accusative. Form: kitap → kitabı; a selects ı and p softens to b.'],
 ['gazete','Şu ___ okur musun?','Would you read that newspaper?','gazeteyi','Şu identifies the newspaper: use the accusative for this direct object. Form: gazete → gazeteyi; e selects i and buffer y separates the vowels.'],
 ['dergi','Bu ___ satın almak istiyorum.','I want to buy this magazine.','dergiyi','Bu identifies the magazine being bought: use the accusative. Form: dergi → dergiyi; i selects i and buffer y separates the vowels.'],
 ['kahve','Bu ___ çok beğendim.','I really liked this coffee.','kahveyi','This particular coffee is the direct object of beğenmek: use the accusative. Form: kahve → kahveyi; e selects i and buffer y separates the vowels.'],
 ['çay','Bu ___ içmek istiyorum.','I want to drink this tea.','çayı','Bu identifies the tea: use the accusative for this direct object. Form: çay → çayı; a selects ı. The y is already part of the base word.'],
 ['su','Şu ___ bana verir misin?','Would you give me that water?','suyu','Şu identifies the water being given: use the accusative. Form: su → suyu; u selects u and buffer y separates the vowels.'],
 ['süt','Bu ___ buzdolabına koy.','Put this milk in the refrigerator.','sütü','Bu identifies the milk being put away: use the accusative for the direct object. Form: süt → sütü; ü selects ü and t stays unchanged in süt.'],
 ['ekmek','Bu ___ dilimliyorum.','I am slicing this bread.','ekmeği','Bu identifies the bread being sliced: use the accusative. Form: ekmek → ekmeği; e selects i and k softens to ğ.'],
 ['film','Bu ___ daha önce izledim.','I have watched this film before.','filmi','Bu identifies the film being watched: use the accusative. Form: film → filmi; i selects i.'],
 ['mektup','Şu ___ lütfen oku.','Please read that letter.','mektubu','Şu identifies the letter: use the accusative for the direct object. Form: mektup → mektubu; u selects u and p softens to b.'],
 ],
 bare:[
 ['kitap','Akşamları ___ okuyorum.','I read books in the evenings, as an activity; no particular book is meant.','kitap','Kitap okumak describes book-reading without identifying a particular book. Leave the object unmarked, immediately before okuyorum. Type the unchanged word kitap.'],
 ['gazete','Her sabah ___ okuyorum.','I read newspapers every morning, as a habit; no particular newspaper is meant.','gazete','Gazete okumak describes newspaper-reading as a habit. No particular newspaper is identified, so use the bare object before okuyorum. Type gazete unchanged.'],
 ['dergi','Boş zamanlarımda ___ okuyorum.','I read magazines in my free time; no particular magazine is meant.','dergi','Dergi okumak describes magazine-reading rather than reading an identified magazine. Use the unmarked object immediately before okuyorum. Type dergi unchanged.'],
 ['kahve','Sabahları ___ içiyorum.','I drink coffee in the mornings, as a habit; no particular coffee is meant.','kahve','Kahve içmek describes drinking coffee in general. Leave this nonspecific object unmarked before içiyorum. Type kahve unchanged.'],
 ['çay','Akşamları ___ içiyorum.','I drink tea in the evenings, as a habit; no particular tea is meant.','çay','Çay içmek describes drinking tea in general. Leave this nonspecific object unmarked before içiyorum. Type çay unchanged.'],
 ['su','Spor yaparken ___ içiyorum.','I drink water while exercising; no particular water is meant.','su','Su içmek describes drinking water in general. Leave this nonspecific object unmarked before içiyorum. Type su unchanged.'],
 ['süt','Kahvaltıda ___ içiyorum.','I drink milk at breakfast; no particular milk is meant.','süt','Süt içmek describes drinking milk in general. Leave this nonspecific object unmarked before içiyorum. Type süt unchanged.'],
 ['ekmek','Bu fırında ___ satıyorlar.','They sell bread at this bakery, as a product; no particular bread is meant.','ekmek','Ekmek satmak describes selling bread as a product. The bakery is identified, but the bread is not. Use the bare object before satıyorlar; type ekmek unchanged.'],
 ['film','Hafta sonları ___ izliyorum.','I watch films on weekends, as an activity; no particular film is meant.','film','Film izlemek describes film-watching as an activity. Use the unmarked object immediately before izliyorum. Type film unchanged.'],
 ['mektup','Boş zamanlarımda ___ yazıyorum.','I write letters in my free time, as an activity; no particular letter is meant.','mektup','Mektup yazmak describes letter-writing as an activity. Use the unmarked object before yazıyorum. Type mektup unchanged.'],
 ]
};
export const choiceQuestions:ChoiceQuestion[]=(Object.keys(rows) as ChoiceCase[]).flatMap(requiredCase=>rows[requiredCase].map(([base,sentence,meaning,answer,explanation],i)=>{
 const last=base.at(-1)!;
 const supportingRuleIds=requiredCase==='bare'?[]:requiredCase==='accusative'?['four_way_vowel_harmony',...(['gazete','dergi','kahve','su'].includes(base)?['buffer_y']:[]),...(['kitap','ekmek','mektup'].includes(base)?['consonant_softening']:[])]:['two_way_vowel_harmony',...((requiredCase!=='dative' && 'fstkçşhp'.includes(last))?['voiceless_assimilation']:[]),...((requiredCase==='dative' && 'aeıioöuü'.includes(last))?['buffer_y']:[]),...((requiredCase==='dative' && ['kitap','çocuk'].includes(base))?['consonant_softening']:[])];
 return {id:`choose-${requiredCase}-${String(i+1).padStart(2,'0')}`,conceptId:`case_choice_${requiredCase}`,requiredCase,base,sentence,meaning,answer,explanation:(requiredCase==='accusative'||requiredCase==='bare')?explanation:explanation+' Form: '+base+' → '+answer+'. '+(caseQuestions.find(q=>q.answer===answer)?.explanation || (answer==='müzede'?'Front vowel e selects -de.':'Front vowel e selects e; voiceless k requires t.')),supportingRuleIds,exerciseType:'case_choice_completion',source:'newly_authored',reviewStatus:'draft_needs_independent_review'};
}));
export function selectChoiceQuestions(){
 const categories=shuffle(Object.keys(choiceCases) as ChoiceCase[]);
 // Twelve questions, two per category plus one extra for two randomized categories.
 return shuffle(categories.flatMap((c,i)=>shuffle(choiceQuestions.filter(q=>q.requiredCase===c)).slice(0,i<2?3:2)));
}
export const choiceMistakes=(attempts:PilotAttempt[])=>latestMistakes(choiceQuestions,attempts);
export function recordChoice(attempts:PilotAttempt[],q:ChoiceQuestion,selectedCase:ChoiceCase,answer:string,sessionId:string):PilotAttempt[]{
 if(!Object.hasOwn(choiceCases,selectedCase)||!answer.trim()||attempts.some(a=>a.sessionId===sessionId&&a.questionId===q.id))return attempts;
 const caseCorrect=selectedCase===q.requiredCase,formCorrect=matchesCase(answer,q.answer);
 return [...attempts,{id:crypto.randomUUID(),sessionId,practiceMode:'choose_case',questionId:q.id,conceptId:q.conceptId,exerciseType:q.exerciseType,baseNoun:q.base,requiredCase:q.requiredCase,selectedCase,caseCorrect,formCorrect,answer:answer.trim(),expected:q.answer,supportingRuleIds:q.supportingRuleIds,correct:caseCorrect&&formCorrect,manual:false,time:new Date().toISOString()}];
}
export function correctChoice(attempts:PilotAttempt[],id:string,part:'case'|'form'){
 return attempts.map(a=>{if(a.id!==id||a.exerciseType!=='case_choice_completion')return a; const caseCorrect=part==='case'?true:!!a.caseCorrect,formCorrect=part==='form'?true:!!a.formCorrect;return {...a,caseCorrect,formCorrect,correct:caseCorrect&&formCorrect,manual:true};});
}
