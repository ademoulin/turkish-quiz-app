import type {VerbNounExample,VerbNounQuestion} from './verbNouns';
import {matchesPhrase} from './nounPhrases';

// Small authored pilot: dictionary-form vocabulary, no suffix or grammar hints.
// Variants are curated; do not generate arbitrary word orders.
const rows=[
 {meaning:'Before I went to work, I called my friend.',vocab:'gitmek (go); iş (work); arkadaş (friend); aramak (call)',answers:['İşe gitmeden önce arkadaşımı aradım.','Arkadaşımı işe gitmeden önce aradım.']},
 {meaning:'After I finished dinner, I watched a film.',vocab:'bitirmek (finish); akşam yemeği (dinner); izlemek (watch); film (film)',answers:['Akşam yemeğini bitirdikten sonra film izledim.','Film izledim, akşam yemeğini bitirdikten sonra.']},
 {meaning:'When I arrived home, I called my mother.',vocab:'varmak (arrive); ev (home); anne (mother); aramak (call)',answers:['Eve varınca annemi aradım.','Annemi eve varınca aradım.']},
 {meaning:'While I was studying, my friend called me.',vocab:'ders çalışmak (study); arkadaş (friend); aramak (call)',answers:['Ben ders çalışırken arkadaşım beni aradı.','Ders çalışırken arkadaşım beni aradı.']},
 {meaning:'Before we left the hotel, we bought water.',vocab:'ayrılmak (leave); otel (hotel); almak (buy); su (water)',answers:['Otelden ayrılmadan önce su aldık.','Su aldık, otelden ayrılmadan önce.']},
 {meaning:'After she bought the tickets, she called me.',vocab:'almak (buy); bilet (ticket); aramak (call)',answers:['Biletleri aldıktan sonra beni aradı.','Beni biletleri aldıktan sonra aradı.']},
] as const;
export const fullSentencePilotAlternatives=new Map<string,readonly string[]>();
export const fullSentencePilotQuestions:VerbNounQuestion[]=rows.map((row,index)=>{
 const id=`vn59-full-${index+1}`;
 fullSentencePilotAlternatives.set(id,row.answers);
 return {id,exampleId:id,lessonId:'sentence_building',conceptId:'vn_sentence_building_type',task:'type',exerciseType:'typed_verb_noun',
 prompt:`Translate into Turkish: ${row.meaning} Vocabulary: ${row.vocab}`,
 sentence:row.meaning,expected:row.answers[0],source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[]};
});
export const fullSentencePilotExamples:VerbNounExample[]=rows.map((row,index)=>{
 const parts=row.answers[0].slice(0,-1).split(' ');
 const main=parts.pop()!;
 const unit=parts.join(' ');
 return ({
 id:`vn59-full-${index+1}`,lessonId:'sentence_building',stem:'',verbMeaning:'',form:'sentence_chunks',
 sentence:row.answers[0],meaning:row.meaning,distractors:['',''],unit,main,
 template:`___ ${main}.`,answer:unit,breakdown:'',explanation:'Use the supplied dictionary forms and construct the complete sentence.',supportingRuleIds:[]
 });
});
export const isFullSentencePilot=(id:string)=>fullSentencePilotAlternatives.has(id);
export const matchesFullSentencePilot=(id:string,answer:string)=>fullSentencePilotAlternatives.get(id)?.some(expected=>matchesPhrase(answer,expected))??false;
export function fullSentencePilotDecision(id:string,answer:string,previousMisses:number):'correct'|'retry'|'incorrect'{
 if(matchesFullSentencePilot(id,answer))return 'correct';
 return previousMisses===0?'retry':'incorrect';
}
