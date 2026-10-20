import {test,expect} from '@playwright/test';
import {choiceQuestions as bank} from '../src/caseChoice';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');return page.getByRole('region',{name:'Choose the Case',exact:true});}
test('balanced session, delayed feedback, separate scores, touch and Enter; correction preserves original attempt',async({page})=>{
 const area=await open(page);await area.getByRole('button',{name:'Start case choice practice'}).click();const seen=new Set<string>();
 for(let i=0;i<12;i++){
 const id=await area.locator('[data-question-id]').getAttribute('data-question-id');const q=bank.find(q=>q.id===id)!;seen.add(q.id);
 await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);await expect(area.getByText('Intended meaning: '+q.meaning,{exact:true})).toBeVisible();
 const button=area.getByRole('button',{name:'Check case and word',exact:true}),field=area.getByLabel('2. Complete inflected word',{exact:true});await expect(button).toBeDisabled();
 await area.locator(`input[value="${q.requiredCase}"]`).check();
 if(i===0){await area.getByRole('button',{name:'ş',exact:true}).tap();await field.fill('wrong');await button.tap();const original=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);await expect(area.getByText('Case choice: Correct. Word form: Incorrect.',{exact:true})).toBeVisible();await area.getByRole('button',{name:'My word form was correct'}).click();const corrected=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);expect(corrected.id).toBe(original.id);expect(corrected.time).toBe(original.time);expect(corrected.caseCorrect).toBe(true);expect(corrected.formCorrect).toBe(true);
 }else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
 await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();await area.getByRole('button',{name:i===11?'See case choice results':'Next case choice question',exact:true}).click();
 }
 expect(seen.size).toBe(12);await expect(area.getByText('Case choice session complete')).toBeVisible();await expect(area.getByText('Case choices: 12 / 12 · Word forms: 12 / 12',{exact:true})).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(12);expect(saved.every((a:any)=>a.exerciseType==='case_choice_completion'&&a.selectedCase&&a.requiredCase&&a.sessionId&&a.time)).toBe(true);
});
test('switching retains answer; wrong choice with correct form saves independently and review survives reload',async({page})=>{
 const area=await open(page);await area.getByRole('button',{name:'Start case choice practice'}).click();const id=await area.locator('[data-question-id]').getAttribute('data-question-id');const q=bank.find(q=>q.id===id)!;
 await area.getByLabel('2. Complete inflected word',{exact:true}).fill(q.answer);await page.getByLabel('Practice activity',{exact:true}).selectOption('cases');await expect(area).not.toBeVisible();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');await expect(area.getByLabel('2. Complete inflected word',{exact:true})).toHaveValue(q.answer);
 await area.locator(`input[value="${q.requiredCase==='dative'?'locative':'dative'}"]`).check();await area.getByRole('button',{name:'Check case and word'}).dblclick();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(1);expect(saved[0].caseCorrect).toBe(false);expect(saved[0].formCorrect).toBe(true);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');await area.getByRole('button',{name:'Review case choice mistakes (1)',exact:true}).click();await expect(area.locator('[data-question-id]')).toHaveAttribute('data-question-id',q.id);await area.locator(`input[value="${q.requiredCase}"]`).check();await area.getByLabel('2. Complete inflected word',{exact:true}).fill(q.answer);await area.getByRole('button',{name:'Check case and word'}).click();await area.getByRole('button',{name:'See case choice results'}).click();await area.getByRole('button',{name:'Restart case choice practice'}).click();await expect(area.getByRole('button',{name:'Review case choice mistakes (0)',exact:true})).toBeDisabled();
});
