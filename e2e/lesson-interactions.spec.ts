import {test,expect} from '@playwright/test';
import {verbNounQuestions as bank,type VerbNounLesson} from '../src/verbNouns';
import {lessonPool,lessonTasks,recordLesson} from '../src/verbNounPractice';
test.use({hasTouch:true});
// Exercise each available interaction once per lesson. Content matrices are checked
// by fast tests; @bank-walkthrough retains optional exhaustive browser sessions.
const lessons:VerbNounLesson[]=['activity','cases','subjects','clause_cases','noun_clause_building','noun_clause_cases','relative_building','relative_roles','relative_negation'];
for(const lesson of lessons)test(`${lesson}: representative choice/production interactions, completion and corrections`,async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 const sample=lessonTasks(lesson).map((task,i)=>lessonPool(lesson,task)[i]);
 const seed=sample.map(q=>{
  const wrong=q.task==='build'?JSON.stringify([q.chunks!.find(c=>!q.expectedChunkIds!.includes(c.id))!.id,...q.expectedChunkIds!.slice(1)]):q.task==='type'?'wrong':'other-1';
  return recordLesson([],q,wrong,'seed-'+q.id)[0];
 });
 await page.evaluate(attempts=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=attempts;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});await area.getByLabel('Lesson',{exact:true}).selectOption(lesson);await area.getByRole('button',{name:`Review lesson mistakes (${sample.length})`,exact:true}).tap();
 const seen=new Set<string>();
 for(let i=0;i<sample.length;i++){
  const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=bank.find(q=>q.id===id)!;seen.add(q.id);expect(sample.some(s=>s.id===q.id)).toBe(true);
  await expect(area.locator('.feedback')).toHaveCount(0);const check=area.getByRole('button',{name:'Check lesson answer',exact:true});await expect(check).toBeDisabled();
  if(q.task==='build'){
   const tiles=area.getByRole('group',{name:'Available chunks · two will be unused',exact:true});
   for(let j=0;j<4;j++){
    const tile=tiles.getByRole('button',{name:q.chunks!.find(c=>c.id===q.expectedChunkIds![j])!.text,exact:true});
    if(j===0){await tile.focus();await page.keyboard.press('Space');await area.getByRole('button',{name:'Undo last placement',exact:true}).tap();await tile.tap();await area.getByRole('button',{name:'Reset sentence',exact:true}).tap();}
    await tile.tap();if(j<3)await expect(check).toBeDisabled();
   }
   await area.getByRole('button',{name:'Clear slot 2',exact:true}).tap();await expect(check).toBeDisabled();await tiles.getByRole('button',{name:q.chunks!.find(c=>c.id===q.expectedChunkIds![1])!.text,exact:true}).tap();
   await check.dblclick();await expect(area.getByRole('button',{name:'Reset sentence',exact:true})).toBeDisabled();
  }else if(q.task==='type'){
   const field=area.getByRole('textbox');await expect(field).toBeFocused();await field.fill(' '+q.expected.normalize('NFD')+' ');await field.press('Enter');
  }else{
   // The meaning choice is deliberately wrong; correct that attempt in place.
   await area.locator(`input[value="${q.task==='meaning'?'other-1':'target'}"]`).check();await area.locator(`input[value="${q.task==='meaning'?'other-1':'target'}"]`).press('Enter');
  }
  await expect(check).toBeDisabled();await expect(area.locator('.feedback')).toBeVisible();
  if(q.task==='meaning'){
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));
   await area.getByRole('button',{name:'My answer was correct',exact:true}).tap();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));
   for(const key of ['id','time','answer','questionId'])expect(after[key]).toBe(before[key]);expect(after.manual).toBe(true);
  }
  await expect(area.getByRole('status',{name:'Session score'})).toHaveText(`${i+1} / ${i+1} correct`);
  await area.getByRole('button',{name:i===sample.length-1?'See lesson results':'Next lesson question',exact:true}).tap();
 }
 expect(seen.size).toBe(sample.length);await expect(area.locator('[data-question-id]')).toHaveCount(0);
 await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(sample.length*2);expect(saved.slice(sample.length).every((a:any)=>a.correct&&a.lessonId===lesson&&a.sessionId&&a.time)).toBe(true);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
