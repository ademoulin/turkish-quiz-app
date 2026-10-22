import {test,expect} from '@playwright/test';
import {choiceQuestions as bank,recordChoice} from '../src/caseChoice';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');return page.getByRole('region',{name:'Choose the Case',exact:true});}
test('balanced session, delayed feedback, separate scores, touch and Enter; correction preserves original attempt',async({page})=>{
 const area=await open(page);await area.getByRole('button',{name:'Start case choice practice'}).click();const seen=new Set<string>();
 for(let i=0;i<12;i++){
 const id=await area.locator('[data-question-id]').getAttribute('data-question-id');const q=bank.find(q=>q.id===id)!;seen.add(q.id);
 await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);await expect(area.getByText(q.meaning,{exact:true})).toBeVisible();
 const button=area.getByRole('button',{name:'Check case and word',exact:true}),field=area.getByLabel('2. Complete inflected word',{exact:true});await expect(button).toBeDisabled();
 await area.locator(`input[value="${q.requiredCase}"]`).check();
 if(i===0){await area.getByRole('button',{name:'ş',exact:true}).tap();await field.fill('wrong');await button.tap();const original=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);await expect(area.getByText('Case choice: Correct. Word form: Incorrect.',{exact:true})).toBeVisible();await area.getByRole('button',{name:'My word form was correct'}).click();const corrected=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);expect(corrected.id).toBe(original.id);expect(corrected.time).toBe(original.time);expect(corrected.caseCorrect).toBe(true);expect(corrected.formCorrect).toBe(true);
 }else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
 await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();await area.getByRole('button',{name:i===11?'See case choice results':'Next case choice question',exact:true}).click();
 }
 expect(seen.size).toBe(12);for(const c of ['locative','dative','ablative','accusative','bare'])expect([2,3]).toContain([...seen].filter(id=>bank.find(q=>q.id===id)!.requiredCase===c).length);await expect(area.getByText('Case choice session complete')).toBeVisible();await expect(area.getByText('Case choices: 12 / 12 · Word forms: 12 / 12',{exact:true})).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(12);expect(saved.every((a:any)=>a.exerciseType==='case_choice_completion'&&a.selectedCase&&a.requiredCase&&a.sessionId&&a.time)).toBe(true);
});
test('switching retains answer; wrong choice with correct form saves independently and review survives reload',async({page})=>{
 const area=await open(page);await area.getByRole('button',{name:'Start case choice practice'}).click();const id=await area.locator('[data-question-id]').getAttribute('data-question-id');const q=bank.find(q=>q.id===id)!;
 await area.getByLabel('2. Complete inflected word',{exact:true}).fill(q.answer);await page.getByLabel('Practice activity',{exact:true}).selectOption('cases');await expect(area).not.toBeVisible();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');await expect(area.getByLabel('2. Complete inflected word',{exact:true})).toHaveValue(q.answer);
 await area.locator(`input[value="${q.requiredCase==='dative'?'locative':'dative'}"]`).check();await area.getByRole('button',{name:'Check case and word'}).dblclick();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(1);expect(saved[0].caseCorrect).toBe(false);expect(saved[0].formCorrect).toBe(true);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');await area.getByRole('button',{name:'Review case choice mistakes (1)',exact:true}).click();await expect(area.locator('[data-question-id]')).toHaveAttribute('data-question-id',q.id);await area.locator(`input[value="${q.requiredCase}"]`).check();await area.getByLabel('2. Complete inflected word',{exact:true}).fill(q.answer);await area.getByRole('button',{name:'Check case and word'}).click();await area.getByRole('button',{name:'See case choice results'}).click();await area.getByRole('button',{name:'Restart case choice practice'}).click();await expect(area.getByRole('button',{name:'Review case choice mistakes (0)',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 2 grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});await expect(page.getByText(/Imported 0 grammar results/)).toBeVisible();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(after).toHaveLength(2);expect(after[0].caseCorrect).toBe(false);expect(after[0].formCorrect).toBe(true);expect(after[1].correct).toBe(true);
});

test('two-part checks work inside the restricted preview on the Pages route',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.setContent('<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>');const frame=page.frameLocator('iframe');await frame.getByRole('button',{name:'Open grammar practice'}).click();await frame.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');const area=frame.getByRole('region',{name:'Choose the Case',exact:true});await area.getByRole('button',{name:'Start case choice practice'}).click();await area.locator('input[value="locative"]').check();await area.getByLabel('2. Complete inflected word',{exact:true}).fill('wrong');await area.getByRole('button',{name:'Check case and word'}).click();await expect(area.getByText(/Word form: Incorrect/)).toBeVisible();
});

test('new accusative and bare choices share review, corrections and version-1 backups with earlier questions',async({page})=>{
 const area=await open(page);const added=bank.filter(q=>q.id.startsWith('choose-accusative-')||q.id.startsWith('choose-bare-'));
 const seed=[...recordChoice([],bank[0],'locative',bank[0].answer,'legacy-choice'),...added.flatMap(q=>recordChoice([],q,'locative','wrong','seed-'+q.id))];
 await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}');s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');
 await expect(area.getByText(/With No case ending, type the unchanged base word/)).toBeVisible();const seen=new Set<string>();
 for(const [remaining,length] of [[20,12],[8,8]]){
  await area.getByRole('button',{name:`Review case choice mistakes (${remaining})`,exact:true}).click();
  for(let i=0;i<length;i++){
   const id=await area.locator('[data-question-id]').getAttribute('data-question-id');const q=added.find(q=>q.id===id)!;expect(q).toBeTruthy();expect(seen.has(q.id)).toBe(false);seen.add(q.id);
   await expect(area.getByRole('radio')).toHaveCount(5);await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
   const field=area.getByLabel('2. Complete inflected word',{exact:true});const chosen=i===0?(q.requiredCase==='bare'?'accusative':'bare'):q.requiredCase;
   await area.locator(`input[value="${chosen}"]`).check();await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');
   if(i===0){const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));await expect(area.getByText('Case choice: Incorrect. Word form: Correct.',{exact:true})).toBeVisible();await area.getByRole('button',{name:'My case choice was correct',exact:true}).click();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));expect(after.id).toBe(before.id);expect(after.time).toBe(before.time);expect(after.selectedCase).toBe(chosen);expect(after.correct).toBe(true);}
   await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();await area.getByRole('button',{name:i===length-1?'See case choice results':'Next case choice question',exact:true}).click();
  }
  await area.getByRole('button',{name:'Restart case choice practice'}).click();
 }
 expect(seen.size).toBe(20);await expect(area.getByRole('button',{name:'Review case choice mistakes (0)',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 41 grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});await expect(page.getByText(/Imported 0 grammar results/)).toBeVisible();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(41);expect(saved[0].questionId).toBe(bank[0].id);expect(saved.filter((a:any)=>a.requiredCase==='bare')).toHaveLength(20);expect(saved.filter((a:any)=>a.manual)).toHaveLength(2);
});
