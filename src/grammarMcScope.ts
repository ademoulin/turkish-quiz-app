import type {GrammarQuestion} from './yeniHitit';

// Editorial scope, not a runtime prompt heuristic. Finite verb drills belong in
// Conjugation; abstract rule identification and answer spotting leave practice.
// Keep the original source objects available for saved history and backups.
const finiteFamilies=new Set([
 'YH1-02-01','YH1-04-01','YH1-04-03','YH1-05-01','YH1-05-03',
 'YH1-07-01','YH1-07-02','YH1-08-01','YH1-08-03','YH1-08-04',
 'YH1-09-01','YH1-09-02','YH1-09-03','YH1-09-04',
]);
const theorySkills=new Set(['YH1-FOUND-01-S01','YH1-FOUND-02-S01','YH1-FOUND-07-S03']);
const excludedIds=new Set([
 'YH1-V58-Q002', // Finite past drill filed under object marking.
 'YH1-V13-Q008','YH1-V14-Q005','YH1-V14-Q012','YH1-V14-Q014',
 'YH1-V14-Q018','YH1-V70-Q002',
]);
export function filterMcScope(questions:GrammarQuestion[]){
 const active:GrammarQuestion[]=[],retired:GrammarQuestion[]=[];
 for(const q of questions){
  const family=q.skill_id.replace(/-S\d+$/,'');
  const excluded=finiteFamilies.has(family)||family==='YH1-00-01'||theorySkills.has(q.skill_id)||excludedIds.has(q.id);
  (excluded?retired:active).push(q);
 }
 return {active,retired};
}
