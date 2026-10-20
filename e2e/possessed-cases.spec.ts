import {test,expect} from '@playwright/test';
import {singularPossessedCaseQuestions as bank} from '../src/possessedCases';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 return page.getByRole('region',{name:'Typed possessed case practice',exact:true});
}
test('all 48 possessed-case answers, touch, keyboard, reveal, scoring and correction',async({page})=>{
 const area=await open(page); await area.getByRole('button',{name:'Start possessed case practice'}).click();
 const seen=new Set<string>();
 for(let i=0;i<48;i++){
  const text=await area.innerText(),q=bank.find(q=>text.includes(q.sentence))!;
  expect(seen.has(q.id)).toBe(false);seen.add(q.id);
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
  await expect(area.getByText(`Given possessed form: ${q.givenForm}`,{exact:true})).toBeVisible();
  await expect(area.getByText(/Required case:/)).toBeVisible();
  await expect(area.getByText(new RegExp('Given meaning:'))).toContainText(q.givenMeaning);
  const field=area.getByLabel('Complete inflected word or phrase');await expect(field).toBeFocused();
  if(i===0){
   await area.getByRole('button',{name:'ş',exact:true}).tap();await expect(field).toHaveValue('ş');
   await field.fill('wrong');await field.press('Enter');
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);
   await area.getByRole('button',{name:'My answer was correct'}).click();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);
   expect(after.id).toBe(before.id);expect(after.time).toBe(before.time);expect(after.manual).toBe(true);
  }else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
  await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();
  await expect(area.getByText(`${i+1} / ${i+1} typed answers correct / attempted`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===47?'See typed results':'Next typed question'}).click();
 }
 await expect(area.getByText('Possessed case session complete')).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(saved).toHaveLength(48);expect(saved.every((a:any)=>a.exerciseType==='typed_possessed_case'&&a.givenForm&&a.requiredCase&&a.answerScope&&a.nounNumber==='singular')).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('possessed-case review, selection, reload and old/new backups stay separate',async({page})=>{
 const area=await open(page);
 await area.getByLabel('Required case on possessed noun',{exact:true}).selectOption('possessed_accusative');
 await area.getByRole('button',{name:'Start possessed case practice'}).click();
 const text=await area.innerText();const current=bank.find(q=>text.includes(q.sentence))!;
 await area.getByLabel('Complete inflected word or phrase').fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();
 await area.getByRole('button',{name:'End typed session'}).click();
 await area.getByRole('button',{name:'Review possessed case mistakes (1)',exact:true}).click();
 await expect(area.getByText(`Given possessed form: ${current.givenForm}`,{exact:true})).toBeVisible();
 await area.getByLabel('Complete inflected word or phrase').fill(current.answer);await area.getByRole('button',{name:'Check typed answer'}).click();
 await area.getByRole('button',{name:'See typed results'}).click();await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review possessed case mistakes (0)',exact:true})).toBeDisabled();
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 await expect(area.getByText('2 saved typed attempts · 1 correct, including self-corrections',{exact:true})).toBeVisible();
 for(const [activity,region] of [['cases','Case Forms'],['possessives','Typed possessive practice'],['phrases','Typed noun phrase practice']]){
  await page.getByLabel('Practice activity',{exact:true}).selectOption(activity);
  await expect(page.getByRole('region',{name:region,exact:true}).getByText('0 saved typed attempts · 0 correct, including self-corrections',{exact:true})).toBeVisible();
 }
 await page.getByRole('button',{name:'Your progress',exact:true}).click();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles((await(await download).path())!);
 await expect(page.getByText(/Imported 2 typed grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});
 await expect(page.getByText(/Imported 0 typed grammar results/)).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.length)).toBe(2);
});
test('possessed-case checking works in embedded sandbox on Pages route',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.setContent('<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>');
 const frame=page.frameLocator('iframe');await frame.getByRole('button',{name:'Open grammar practice'}).click();
 await frame.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 const area=frame.getByRole('region',{name:'Typed possessed case practice',exact:true});
 await area.getByRole('button',{name:'Start possessed case practice'}).click();
 await area.getByLabel('Complete inflected word or phrase').fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();
 await expect(area.getByText('Incorrect.',{exact:true})).toBeVisible();
});
