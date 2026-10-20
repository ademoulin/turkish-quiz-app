import {test,expect} from '@playwright/test';
import {pronounCaseQuestions as bank} from '../src/pronounCases';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice'}).click();
 await expect(page.getByLabel('Word type',{exact:true})).toHaveValue('nouns');
 await page.getByLabel('Word type',{exact:true}).selectOption('personal-pronouns');
 return page.getByRole('region',{name:'Personal pronoun case forms',exact:true});
}
test('24 pronoun forms: explicit case/base, touch, keyboard, delayed feedback and original correction',async({page})=>{
 const area=await open(page);await expect(page.getByRole('region',{name:'Case Forms',exact:true})).not.toBeVisible();
 await area.getByRole('button',{name:'Start pronoun case practice'}).click();const seen=new Set<string>();
 for(let i=0;i<24;i++){
  const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=bank.find(q=>q.id===id)!;expect(seen.has(q.id)).toBe(false);seen.add(q.id);
  await expect(area.getByText('Base pronoun: '+q.pronoun,{exact:true})).toBeVisible();await expect(area.getByText(/Required case:/)).toBeVisible();
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
  const field=area.getByLabel('Complete inflected pronoun',{exact:true});await expect(field).toBeFocused();
  if(i===0){
   await area.getByRole('button',{name:'ş',exact:true}).tap();await expect(field).toHaveValue('ş');await field.fill('wrong');await field.press('Enter');
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);
   await area.getByRole('button',{name:'My answer was correct'}).click();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);expect(after.id).toBe(before.id);expect(after.time).toBe(before.time);
  }else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
  await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();await expect(area.getByText(`${i+1} / ${i+1} typed answers correct / attempted`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===23?'See typed results':'Next typed question'}).click();
 }
 await expect(area.getByText('Pronoun case session complete')).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(24);expect(saved.every((a:any)=>a.pronoun&&a.requiredCase&&a.exerciseType==='typed_pronoun_case'&&a.practiceMode==='pronoun_cases')).toBe(true);
 expect(saved.filter((a:any)=>a.manual)).toHaveLength(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('noun/pronoun switching keeps sessions and separate review; pronoun evidence survives reload and backups',async({page})=>{
 const area=await open(page);await page.getByLabel('Word type',{exact:true}).selectOption('nouns');
 const nouns=page.getByRole('region',{name:'Case Forms',exact:true});await nouns.getByRole('button',{name:'Start typed case practice'}).click();await nouns.getByLabel('Complete inflected word',{exact:true}).fill('kept');
 await page.getByLabel('Word type',{exact:true}).selectOption('personal-pronouns');
 await area.getByLabel('Required pronoun case',{exact:true}).selectOption('pronoun_dative');await area.getByRole('button',{name:'Start pronoun case practice'}).click();
 await expect(area.getByText(/Question 1 of 6/)).toBeVisible();const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=bank.find(q=>q.id===id)!;
 await area.getByLabel('Complete inflected pronoun',{exact:true}).fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();await area.getByRole('button',{name:'End typed session'}).click();
 await expect(area.getByRole('button',{name:'Review pronoun case mistakes (1)',exact:true})).toBeEnabled();
 await area.getByLabel('Required pronoun case',{exact:true}).selectOption('pronoun_locative');await expect(area.getByRole('button',{name:'Review pronoun case mistakes (0)',exact:true})).toBeDisabled();await area.getByLabel('Required pronoun case',{exact:true}).selectOption('pronoun_dative');
 await area.getByRole('button',{name:'Review pronoun case mistakes (1)',exact:true}).click();await area.getByLabel('Complete inflected pronoun',{exact:true}).fill(q.answer);await area.getByRole('button',{name:'Check typed answer'}).click();await area.getByRole('button',{name:'See typed results'}).click();await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review pronoun case mistakes (0)',exact:true})).toBeDisabled();
 await page.getByLabel('Word type',{exact:true}).selectOption('nouns');await expect(nouns.getByLabel('Complete inflected word',{exact:true})).toHaveValue('kept');await nouns.getByRole('button',{name:'End typed session'}).click();await expect(nouns.getByRole('button',{name:'Review grammar mistakes (0)',exact:true})).toBeDisabled();
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Word type',{exact:true}).selectOption('personal-pronouns');
 await expect(area.getByText('2 saved typed attempts · 1 correct, including self-corrections',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 2 typed grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});await expect(page.getByText(/Imported 0 typed grammar results/)).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(2);expect(saved.every((a:any)=>a.pronoun&&a.requiredCase)).toBe(true);
});
test('pronoun checking works in the sandbox on the Pages route',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.setContent('<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>');
 const frame=page.frameLocator('iframe');await frame.getByRole('button',{name:'Open grammar practice'}).click();await frame.getByLabel('Word type',{exact:true}).selectOption('personal-pronouns');const area=frame.getByRole('region',{name:'Personal pronoun case forms',exact:true});await area.getByRole('button',{name:'Start pronoun case practice'}).click();await area.getByLabel('Complete inflected pronoun',{exact:true}).fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();await expect(area.getByText('Incorrect.',{exact:true})).toBeVisible();
});
