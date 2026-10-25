import {test,expect} from '@playwright/test';
import {nominalizerExpansionQuestions as bank,nominalizerExpansionExamples as models} from '../src/nominalizerExpansion';
import {recordLesson} from '../src/verbNounPractice';
test('new 3.9 production asks for construction choice, scores once and preserves corrected backups',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');const typed=bank.filter(q=>q.task==='type'),seed=typed.map(q=>recordLesson([],q,'wrong','seed-'+q.id)[0]);
 await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);await page.reload();
 await page.getByRole('button',{name:'Open grammar practice',exact:true}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});await area.getByLabel('Lesson',{exact:true}).selectOption('contrasts');await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');await area.getByRole('button',{name:'Review lesson mistakes (12)',exact:true}).click();
 const seen=new Set<string>();for(let n=0;n<12;n++){
 const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=typed.find(q=>q.id===id)!,e=models.find(e=>e.id===q.exampleId)!;expect(seen.has(id!)).toBe(false);seen.add(id!);
 await expect(area.locator('.exercise-meaning')).toContainText(e.meaning);await expect(area.getByText(/Requested construction:|Outer case:/)).toHaveCount(0);await expect(area.locator('.feedback')).toHaveCount(0);
 const input=area.getByRole('textbox');await input.fill(n===0?'wrong':' '+q.expected.normalize('NFD')+' ');await input.press('Enter');await expect(area.getByRole('button',{name:'Answer checked',exact:true})).toBeDisabled();await expect(area.locator('.feedback-reason')).toHaveText(e.explanation);if(n===0)await area.getByRole('button',{name:'My answer was correct',exact:true}).click();
 await expect(area.getByRole('status',{name:'Session score'})).toHaveText(`${n+1} / ${n+1} correct`);await area.getByRole('button',{name:n===11?'See lesson results':'Next lesson question',exact:true}).click();
 }
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(24);expect(saved[12].manual).toBe(true);expect(saved.slice(0,12)).toEqual(seed);
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 24 grammar results/)).toBeVisible();
});
