import {test,expect} from '@playwright/test';
import {suffixChainQuestions} from '../src/suffixChains';
async function open(page:import('@playwright/test').Page, method='build-from-base'){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 await page.getByLabel('Practice method',{exact:true}).selectOption(method);
 return page.getByRole('region',{name:method==='build-from-base'?'Build endings from base':'Typed possessed case practice',exact:true});
}
test('owner-specific full-chain sessions and review intersect case/number, and survive backups',async({page})=>{
 const area=await open(page),owners=area.getByLabel('Owner to practice',{exact:true});
 await expect(owners).toHaveValue('mixed');
 await area.getByLabel('Required case to build',{exact:true}).selectOption('suffix_chain_locative');
 await area.getByLabel('Possessed noun number',{exact:true}).selectOption('singular');
 for(const owner of ['sen','o']){
  await owners.selectOption(owner);await expect(area.getByRole('button',{name:'Start building from base'})).toBeEnabled();
  await area.getByRole('button',{name:'Start building from base'}).click();
  const text=await area.innerText(),q=suffixChainQuestions.find(q=>text.includes(q.sentence))!;
  expect(q.owner).toBe(owner);expect(q.nounNumber).toBe('singular');expect(q.requiredCase).toBe('locative');
  await area.getByLabel('Complete word built from base').fill('wrong');
  await area.getByLabel('Complete word built from base').press('Enter');
  await area.getByRole('button',{name:'End typed session'}).click();
  await expect(area.getByRole('button',{name:'Review build-from-base mistakes (1)',exact:true})).toBeEnabled();
 }
 await owners.selectOption('mixed');await expect(area.getByRole('button',{name:'Review build-from-base mistakes (2)',exact:true})).toBeEnabled();
 await area.getByLabel('Required case to build',{exact:true}).selectOption('suffix_chain_dative');
 await expect(area.getByRole('button',{name:'Review build-from-base mistakes (0)',exact:true})).toBeDisabled();
 await area.getByLabel('Required case to build',{exact:true}).selectOption('suffix_chain_locative');
 await area.getByRole('button',{name:'Review build-from-base mistakes (2)',exact:true}).click();
 for(let i=0;i<2;i++){
  const text=await area.innerText(),q=suffixChainQuestions.find(q=>text.includes(q.sentence))!;
  await area.getByLabel('Complete word built from base').fill(q.answer);
  await area.getByRole('button',{name:'Check typed answer'}).click();
  await area.getByRole('button',{name:i===1?'See typed results':'Next typed question'}).click();
 }
 await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review build-from-base mistakes (0)',exact:true})).toBeDisabled();
 await owners.selectOption('onlar');await expect(area.getByRole('button',{name:'Start building from base'})).toBeDisabled();
 await expect(area.getByRole('status')).toHaveText('No questions match these filters. Change the case, number or owner to continue.');
 await area.getByLabel('Possessed noun number',{exact:true}).selectOption('plural');
 await expect(area.getByRole('button',{name:'Start building from base'})).toBeEnabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles((await(await download).path())!);
 await expect(page.getByText(/Imported 4 typed grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});
 await expect(page.getByText(/Imported 0 typed grammar results/)).toBeVisible();
 const attempts=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(attempts).toHaveLength(4);expect(attempts.every((a:any)=>['sen','o'].includes(a.owner))).toBe(true);
});
test('Add case only filters personal and named owners and explains empty combinations',async({page})=>{
 const area=await open(page,'add-case'),owners=area.getByLabel('Owner to practice',{exact:true});
 await owners.selectOption('onlar');await expect(area.getByRole('button',{name:'Start possessed case practice'})).toBeDisabled();
 await area.getByLabel('Possessed noun number',{exact:true}).selectOption('plural');
 await area.getByLabel('Required case on possessed noun',{exact:true}).selectOption('possessed_locative');
 await area.getByRole('button',{name:'Start possessed case practice'}).click();
 await expect(area.getByText(/Question 1 of 1/)).toBeVisible();await expect(area.getByText(/Given meaning:/)).toContainText('they / their');
 await area.getByLabel('Complete inflected word or phrase').fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();
 await area.getByRole('button',{name:'End typed session'}).click();
 await expect(area.getByRole('button',{name:'Review possessed case mistakes (1)',exact:true})).toBeEnabled();
 await owners.selectOption('ben');await expect(area.getByRole('button',{name:'Review possessed case mistakes (0)',exact:true})).toBeDisabled();
 await owners.selectOption('named');await expect(area.getByRole('button',{name:'Start possessed case practice'})).toBeDisabled();
 await area.getByLabel('Possessed noun number',{exact:true}).selectOption('singular');await area.getByRole('button',{name:'Start possessed case practice'}).click();
 await expect(area.getByText(/Given possessed form:/)).toContainText(/çocuğun odası|komşunun evi/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
