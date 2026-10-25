import {test,expect} from '@playwright/test';
import {expandedClauseQuestions as questions,expandedClauseExamples as models} from '../src/clauseCaseExpansion';
test('3.11 typed expansion hides case/answers, grades strict Turkish once and saves corrections',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice',exact:true}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');
 const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});await area.getByLabel('Lesson',{exact:true}).selectOption('noun_clause_cases');await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');await area.getByRole('button',{name:'Start noun clause case lesson',exact:true}).click();
 const seen=new Set<string>();
 for(let n=0;n<12;n++){
  const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=questions.find(q=>q.id===id)!,e=models.find(e=>e.id===q.exampleId)!;expect(q.task).toBe('type');expect(seen.has(id!)).toBe(false);seen.add(id!);
  await expect(area.locator('.exercise-meaning')).toContainText(e.meaning);await expect(area.getByText(/Outer case:/)).toHaveCount(0);await expect(area.getByText('Requested construction:',{exact:false})).toBeVisible();await expect(area.locator('.feedback')).toHaveCount(0);
  const input=area.getByLabel('Complete action noun',{exact:true});await input.fill(n===0?'wrong':' '+q.expected.normalize('NFD')+' ');await input.press('Enter');await expect(area.locator('.feedback-reason')).toHaveText(e.explanation);await expect(area.getByRole('button',{name:'Answer checked',exact:true})).toBeDisabled();
  if(n===0)await area.getByRole('button',{name:'My answer was correct',exact:true}).click();
  await expect(area.getByText(`${n+1} / ${n+1} correct`,{exact:true})).toBeVisible();await area.getByRole('button',{name:n===11?'See lesson results':'Next lesson question',exact:true}).click();
 }
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(12);expect(saved[0].manual).toBe(true);expect(saved.every((a:any)=>a.conceptId==='vn_noun_clause_cases_type')).toBe(true);
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 12 grammar results/)).toBeVisible();
});
