import type {VerbNounQuestion} from './verbNouns';

// Authored pilot, not textbook quotations. Each prompt fixes the intended
// subject and event order. Alternatives are curated, not generated.
const rows=[
 ['Before I went to work, I called my friend.','işe gitmek; arkadaşım; aramak','İşe gitmeden önce arkadaşımı aradım.','Arkadaşımı işe gitmeden önce aradım.'],
 ['After I finished dinner, I watched a film.','akşam yemeğini bitirmek; film izlemek','Akşam yemeğini bitirdikten sonra film izledim.','Film izledim akşam yemeğini bitirdikten sonra.'],
 ['When I arrived home, I called my mother.','eve varmak; annem; aramak','Eve varınca annemi aradım.','Annemi eve varınca aradım.'],
 ['While I was studying, my friend called me.','ders çalışmak; arkadaşım; beni aramak','Ben ders çalışırken arkadaşım beni aradı.','Arkadaşım ben ders çalışırken beni aradı.'],
 ['Before we left the hotel, we bought water.','otelden ayrılmak; su almak','Otelden ayrılmadan önce su aldık.','Su aldık otelden ayrılmadan önce.'],
 ['After she bought the tickets, she called me.','biletleri almak; beni aramak','Biletleri aldıktan sonra beni aradı.','Beni biletleri aldıktan sonra aradı.'],
] as const;
export const fullSentencePilotAlternatives=new Map<string,readonly string[]>();
export const fullSentencePilotQuestions:VerbNounQuestion[]=rows.map(([meaning,vocabulary,expected,alternative],index)=>{
 const id=`vn59-full-${index+1}`;
 fullSentencePilotAlternatives.set(id,[expected,alternative]);
 return {
  id,exampleId:id,lessonId:'sentence_building',conceptId:'vn_sentence_building_type',task:'type',
  exerciseType:'typed_verb_noun',
  prompt:`Translate into a complete Turkish sentence: ${meaning} Vocabulary: ${vocabulary}. Use the intended tense and person. Write the entire sentence.`,
  sentence:meaning,expected,source:'newly_authored',reviewStatus:'draft_needs_independent_review',supportingRuleIds:[],
 };
});
