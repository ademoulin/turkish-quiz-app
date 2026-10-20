import {caseQuestions,type TypedQuestion,type PilotAttempt} from './casePilot';
import {possessiveQuestions} from './possessives';
import {phraseQuestions} from './nounPhrases';
import {possessedCaseQuestions} from './possessedCases';
import {suffixChainQuestions} from './suffixChains';
import {latestMistakes} from './practiceReview';
import {shuffle} from './shuffle';
/** Reuse the original question objects and evidence IDs. No new authored content. */
export const mixedGrammarFamilies={
 cases:caseQuestions,
 possessives:possessiveQuestions,
 phrases:phraseQuestions,
 add_case:possessedCaseQuestions,
 build_from_base:suffixChainQuestions,
} as const;
export type MixedGrammarFamily=keyof typeof mixedGrammarFamilies;
export const mixedGrammarQuestions:TypedQuestion[]=Object.values(mixedGrammarFamilies).flat();
export function mixedGrammarFamily(q:TypedQuestion):MixedGrammarFamily {
 if(q.exerciseType==='typed_suffix_chain')return 'build_from_base';
 if(q.exerciseType==='typed_possessed_case')return 'add_case';
 if(q.exerciseType==='typed_noun_phrase')return 'phrases';
 return 'owner' in q?'possessives':'cases';
}
/** Rotate through shuffled families: 2–3 of each for a full 12-question session.
 * Scarce review families contribute all they can; never pad with cleared items.
 */
export function selectMixedGrammarPool(pool:TypedQuestion[],random=Math.random):TypedQuestion[]{
 const unique=[...new Map(pool.map(q=>[q.id,q])).values()];
 const families=shuffle(Object.keys(mixedGrammarFamilies) as MixedGrammarFamily[],random);
 const buckets=families.map(f=>shuffle(unique.filter(q=>mixedGrammarFamily(q)===f),random));
 const chosen:TypedQuestion[]=[];
 while(chosen.length<12){
  let added=false;
  for(const bucket of buckets){
   const q=bucket.pop();
   if(q){chosen.push(q);added=true;if(chosen.length===12)break;}
  }
  if(!added)break;
 }
 return shuffle(chosen,random);
}
export const selectMixedGrammarQuestions=(random=Math.random)=>selectMixedGrammarPool(mixedGrammarQuestions,random);
export const mixedGrammarMistakes=(attempts:PilotAttempt[])=>latestMistakes(mixedGrammarQuestions,attempts);
