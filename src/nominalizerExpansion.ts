import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import type {NominalSubject} from './verbNounSubjects';
import type {NominalConstruction} from './verbNounContrasts';
// Newly authored drafts, guided by Yeni Hitit 1 noun clauses and Yeni Hitit 2
// unit XI nominalization (support p.188). Not quotations. Independent review
// and exact Ödkem mapping pending. Explicit forms; no conjugator-generated keys.
type Row=[template:string,answer:string,other1:string,other2:string,stem:string,actor:NominalSubject,construction:NominalConstruction,meaning:string,main:string,reason:string];
const rows:Row[]=[
 ['Bana hemen cevap ___ istiyorum.','vermeni','verdiğini','vereceğini','ver','sen','ma','I want you (singular) to answer me immediately.','istiyorum','İstemek requests an action here: use -mA with agreement and accusative.'],
 ['Bu kapıyı açık ___ istemiyorum.','bırakmanı','bıraktığını','bırakacağını','bırak','sen','ma','I do not want you (singular) to leave this door open.','istemiyorum','The main predicate is negative; the requested action stays affirmative: bırakmanı istemiyorum.'],
 ['Belgeleri bugün ___ rica ediyorum.','göndermenizi','gönderdiğinizi','göndereceğinizi','gönder','siz','ma','I request that you (plural/polite) send the documents today.','rica ediyorum','Rica etmek requests an action: use an accusative -mA clause.'],
 ['Beni dışarıda ___ rica ediyorum.','beklememeni','beklemediğini','beklemeyeceğini','bekle','sen','ma','I ask you (singular) not to wait for me outside.','rica ediyorum','The requested action is negative: beklememeni rica ediyorum means I ask you not to wait.'],
 ['Müdür bizim erken ___ istiyor.','çıkmamızı','çıktığımızı','çıkacağımızı','çık','biz','ma','The manager wants us to leave early.','istiyor','The manager requests our leaving: use -mA, with agreement for we.'],
 ['Onun bu akşam buraya ___ istemiyorum.','gelmesini','geldiğini','geleceğini','gel','o','ma','I do not want her to come here this evening.','istemiyorum','A future time word does not force -(y)AcAK: this is a wanted action with istemek.'],
 ['Yarın toplantıya zamanında ___ istiyorum.','gelmenizi','geldiğinizi','geleceğinizi','gel','siz','ma','I want you (plural/polite) to come to the meeting on time tomorrow.','istiyorum','Despite yarın, istemek requests an action, so use -mA rather than future content.'],
 ['Onun bunu kimseye ___ rica ediyorum.','söylememesini','söylemediğini','söylemeyeceğini','söyle','o','ma','I request that he not tell this to anyone.','rica ediyorum','The requested action is not telling: use negative -mA with third-person agreement.'],
 ['Dün neden ___ anlamıyorum.','gelmediğini','gelmemeni','gelmeyeceğini','gel','sen','dik','I do not understand why you (singular) did not come yesterday.','anlamıyorum','This asks about an actual past non-arrival: negative -DIK, not a requested action.'],
 ['Onun her sabah burada ___ fark ettim.','çalıştığını','çalışmasını','çalışacağını','çalış','o','dik','I noticed that she works here every morning.','fark ettim','-DIK expresses the habitual fact noticed here; it is not automatically past tense.'],
 ['Senin nerede ___ biliyorum.','oturduğunu','oturmanı','oturacağını','otur','sen','dik','I know where you (singular) live.','biliyorum','Where you live is a current fact: use -DIK with agreement, not a requested action.'],
 ['Anahtarları nereye ___ hatırlamıyorum.','koyduğumu','koymamı','koyacağımı','koy','ben','dik','I do not remember where I put the keys.','hatırlamıyorum','The memory concerns an earlier action: use -DIK with agreement for I.'],
 ['Onun geçen ay Ankara’ya ___ öğrendim.','taşındığını','taşınmasını','taşınacağını','taşın','o','dik','I learned that he moved to Ankara last month.','öğrendim','The move is a past fact being learned: use -DIK.'],
 ['Kapıyı ___ fark ettim.','kilitlemediğimi','kilitlemememi','kilitlemeyeceğimi','kilitle','ben','dik','I noticed that I had not locked the door.','fark ettim','The discovered fact is negative: kilitlemediğimi, not a request not to lock it.'],
 ['Bunu tek başına ___ biliyorum.','yapamadığını','yapamamanı','yapamayacağını','yap','sen','dik','I know that you (singular) cannot do this on your own.','biliyorum','The intended message describes present inability: use negative ability inside a -DIK content clause.'],
 ['Dün neden ___ anlamıyorum.','gelmediğinizi','gelmemenizi','gelmeyeceğinizi','gel','siz','dik','I do not understand why you (plural/polite) did not come yesterday.','anlamıyorum','The clause reports a past non-arrival; -DIK agreement must match you plural/polite.'],
 ['Yarın bize yardım ___ tahmin ediyorum.','edebileceğini','edebilmeni','edebildiğini','et','sen','acak','I predict that you (singular) will be able to help us tomorrow.','tahmin ediyorum','This predicts future ability: use -(y)AcAK after the ability form.'],
 ['Yarın toplantıya ___ biliyorum.','katılamayacağımızı','katılamamamızı','katılamadığımızı','katıl','biz','acak','I know that we will not be able to attend the meeting tomorrow.','biliyorum','The intended message is future inability, not past inability or a requested action.'],
 ['Senin bu sınavı ___ düşünüyorum.','geçeceğini','geçmeni','geçtiğini','geç','sen','acak','I think you (singular) will pass this exam.','düşünüyorum','The belief concerns a future outcome: use -(y)AcAK, not -mA for a proposed action.'],
 ['Onun yarın ___ biliyorum.','gelemeyeceğini','gelememesini','gelemediğini','gel','o','acak','I know that she will not be able to come tomorrow.','biliyorum','Future inability combines the negative ability form with -(y)AcAK.'],
 ['Yarın işe ___ biliyorum.','gelmeyeceğimi','gelmememi','gelmediğimi','gel','ben','acak','I know that I will not come to work tomorrow.','biliyorum','The intended message is future non-arrival, without the extra meaning cannot.'],
 ['Yarın yağmur ___ tahmin ediyorum.','yağacağını','yağmasını','yağdığını','yağ','o','acak','I predict that it will rain tomorrow.','tahmin ediyorum','A prediction about tomorrow takes future content in -(y)AcAK.'],
 ['Ayşe yarın geç ___ söylüyor.','kalacağını','kalmasını','kaldığını','kal','o','acak','Ayşe says that she will be late tomorrow.','söylüyor','This reports her future lateness; it is not a request for someone to be late.'],
 ['Bu soruna bir çözüm ___ düşünüyorum.','bulabileceğimizi','bulabilmemizi','bulabildiğimizi','bul','biz','acak','I think we will be able to find a solution to this problem.','düşünüyorum','The belief concerns our future ability: use -(y)AcAK with agreement for we.'],
];
export const nominalizerExpansionExamples:VerbNounExample[]=rows.map((r,i)=>{
 const [template,answer,,,stem,nominalSubject,nominalConstruction,meaning,main,explanation]=r;
 return {id:`vn8-expand-${String(i+1).padStart(2,'0')}`,lessonId:'contrasts',template,sentence:template.replace('___',answer),answer,stem,verbMeaning:'Complete the word for the intended message.',nominalSubject,nominalConstruction,nominalCase:'accusative',form:'choose_nominalizer',meaning,main,unit:template.replace('___',answer).slice(0,-main.length-2),distractors:['',''],breakdown:'',explanation,supportingRuleIds:[]};
});
export const nominalizerExpansionQuestions:VerbNounQuestion[]=rows.map((r,i)=>{
 const e=nominalizerExpansionExamples[i],task=i%2===0?'structure' as const:'type' as const;
 return {id:e.id+'-'+task,lessonId:'contrasts',exampleId:e.id,task,conceptId:task==='type'?'vn_contrasts_type':'vn_contrasts_structure',exerciseType:task==='type'?'typed_verb_noun':'verb_noun_structure',
 prompt:`Intended message: ${e.meaning} ${task==='type'?'Complete the missing word.':'Choose the form that completes the sentence.'}`,sentence:e.template,expected:e.answer,nominalSubject:e.nominalSubject,nominalConstruction:e.nominalConstruction,nominalCase:'accusative',
 ...(task==='structure'?{optionLanguage:'tr' as const,expectedOptionId:'target',options:[{id:'target',text:r[1]},{id:'other-1',text:r[2]},{id:'other-2',text:r[3]}]}:{}),source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[]};
});
