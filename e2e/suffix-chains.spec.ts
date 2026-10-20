import {test,expect} from '@playwright/test';
import {suffixChainQuestions as bank} from '../src/suffixChains';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 await page.getByLabel('Practice method',{exact:true}).selectOption('build-from-base');return page.getByRole('region',{name:'Build endings from base',exact:true});
}
test('48 full chains from bare nouns: explicit constraints, no answer leakage, touch, keyboard and correction',async({page})=>{
 const area=await open(page);await expect(area.getByRole('region',{name:'How to practice'})).toContainText('bavullarımızdan');
 await area.getByRole('button',{name:'Start building from base'}).click();const seen=new Set<string>();
 for(let i=0;i<48;i++){
  const text=await area.innerText(),q=bank.find(q=>text.includes(q.sentence))!;expect(q).toBeTruthy();expect(seen.has(q.id)).toBe(false);seen.add(q.id);
  await expect(area.getByRole('region',{name:'How to practice'})).toHaveCount(0);
  await expect(area.getByText(`Base noun: ${q.baseNoun}`,{exact:true})).toBeVisible();
  await expect(area.getByText(/Base meaning:/)).toContainText(q.baseMeaning);await expect(area.getByText(/Base meaning:/)).toContainText(q.nounNumber);
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);await expect(area.getByText(q.answer,{exact:true})).toHaveCount(0);
  const field=area.getByLabel('Complete word built from base');await expect(field).toBeFocused();
  if(i===0){await area.getByRole('button',{name:'ş',exact:true}).tap();await expect(field).toHaveValue('ş');await field.fill('wrong');await field.press('Enter');await area.getByRole('button',{name:'My answer was correct'}).click();}
  else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
  await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();
  await expect(area.getByText(`${i+1} / ${i+1} typed answers correct / attempted`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===47?'See typed results':'Next typed question'}).click();
 }
 await expect(area.getByText('Build-from-base session complete')).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(saved).toHaveLength(48);expect(saved.every((a:any)=>a.exerciseType==='typed_suffix_chain'&&a.baseNoun&&a.requiredCase&&a.owner&&a.nounNumber&&!a.givenForm)).toBe(true);expect(saved.filter((a:any)=>a.manual)).toHaveLength(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('method switching preserves unfinished sessions; filters, separate review, correction and backups',async({page})=>{
 const area=await open(page);await area.getByLabel('Required case to build',{exact:true}).selectOption('suffix_chain_locative');await area.getByLabel('Possessed noun number',{exact:true}).selectOption('plural');
 await area.getByRole('button',{name:'Start building from base'}).click();await expect(area.getByText(/Question 1 of 6/)).toBeVisible();
 const text=await area.innerText(),q=bank.find(q=>text.includes(q.sentence))!;
 await area.getByLabel('Complete word built from base').fill('unfinished');
 await page.getByLabel('Practice method',{exact:true}).selectOption('add-case');
 const add=page.getByRole('region',{name:'Typed possessed case practice',exact:true});
 await expect(add).toBeVisible();await expect(area).not.toBeVisible();await add.getByRole('button',{name:'Start possessed case practice'}).click();await add.getByLabel('Complete inflected word or phrase').fill('kept');
 await page.getByLabel('Practice method',{exact:true}).selectOption('build-from-base');await expect(area.getByLabel('Complete word built from base')).toHaveValue('unfinished');
 await area.getByRole('button',{name:'Check typed answer'}).click();await area.getByRole('button',{name:'End typed session'}).click();
 await expect(area.getByRole('button',{name:'Review build-from-base mistakes (1)',exact:true})).toBeEnabled();
 await area.getByLabel('Possessed noun number',{exact:true}).selectOption('singular');await expect(area.getByRole('button',{name:'Review build-from-base mistakes (0)',exact:true})).toBeDisabled();await area.getByLabel('Possessed noun number',{exact:true}).selectOption('plural');
 await area.getByRole('button',{name:'Review build-from-base mistakes (1)',exact:true}).click();await expect(area.getByText(`Base noun: ${q.baseNoun}`,{exact:true})).toBeVisible();await area.getByLabel('Complete word built from base').fill(q.answer);await area.getByRole('button',{name:'Check typed answer'}).click();await area.getByRole('button',{name:'See typed results'}).click();await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review build-from-base mistakes (0)',exact:true})).toBeDisabled();
 await page.getByLabel('Practice method',{exact:true}).selectOption('add-case');await expect(add.getByLabel('Complete inflected word or phrase')).toHaveValue('kept');await add.getByRole('button',{name:'End typed session'}).click();await expect(add.getByRole('button',{name:'Review possessed case mistakes (0)',exact:true})).toBeDisabled();
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');await page.getByLabel('Practice method',{exact:true}).selectOption('build-from-base');await expect(area.getByText('2 saved typed attempts · 1 correct, including self-corrections',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 2 typed grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});await expect(page.getByText(/Imported 0 typed grammar results/)).toBeVisible();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.length)).toBe(2);
});
test('build-from-base checks in the embedded sandbox on the Pages route',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.setContent('<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>');const frame=page.frameLocator('iframe');await frame.getByRole('button',{name:'Open grammar practice'}).click();await frame.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');await frame.getByLabel('Practice method',{exact:true}).selectOption('build-from-base');const area=frame.getByRole('region',{name:'Build endings from base',exact:true});await area.getByRole('button',{name:'Start building from base'}).click();await area.getByLabel('Complete word built from base').fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();await expect(area.getByText('Incorrect.',{exact:true})).toBeVisible();
});
