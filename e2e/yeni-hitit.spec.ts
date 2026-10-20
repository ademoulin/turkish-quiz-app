import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
const dataset: {questions: {prompt:string; explanation:string; correct_option_id:string; options:{id:string;text:string}[]}[]} = JSON.parse(readFileSync(new URL('../src/data/yeni_hitit_1_codex_staging_v82.json', import.meta.url), 'utf8'));
test('grammar preview filters, keyboard check, score, completion and reset on mobile', async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.fulfill({status:200,body:'ID,Verb,Type,Meaning\nv001,gelmek,vi,come'}));
 await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('multiple-choice');
 await page.getByLabel('Section',{exact:true}).selectOption('4.1');
 await page.getByLabel('Skill',{exact:true}).selectOption('YH1-04-01-S01');
 await page.getByRole('button',{name:'Start grammar practice'}).click();
 const seen=new Set<string>();
 for(let i=0;i<3;i++) {
  const area=page.getByRole('region',{name:'Grammar practice'});
  const prompt=await area.locator('legend').innerText();
  expect(seen.has(prompt)).toBe(false);seen.add(prompt);
  const q=dataset.questions.find(q=>q.prompt===prompt)!;
  await expect(area.locator('input[type=radio]')).toHaveCount(4);
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
  await area.getByRole('radio',{name:q.options.find(o=>o.id===q.correct_option_id)!.text,exact:true}).check();
  await area.getByRole('button',{name:'Check grammar answer'}).focus();
  await page.keyboard.press('Enter');
  await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();
  await expect(area.getByRole('radio').first()).toBeDisabled();
  await expect(area.getByText(`${i+1} / ${i+1} correct / attempted`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===2?'See grammar results':'Next grammar question'}).click();
 }
 await expect(page.getByText('Grammar session complete')).toBeVisible();
 await page.getByRole('button',{name:'Restart grammar practice'}).click();
 await page.getByRole('button',{name:'Start grammar practice'}).click();
 await expect(page.getByText('0 / 0 correct / attempted',{exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('production build includes enabled grammar bank',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());
 await page.goto('http://127.0.0.1:4173/turkish-quiz-app/');
 await expect(page.getByRole('button',{name:'Open grammar practice'})).toBeVisible();
});
