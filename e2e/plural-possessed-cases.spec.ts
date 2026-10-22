import {test,expect} from '@playwright/test';
import {pluralPossessedCaseQuestions as bank, singularPossessedCaseQuestions} from '../src/possessedCases';
import {recordPilot} from '../src/casePilot';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 return page.getByRole('region',{name:'Typed possessed case practice',exact:true});
}
test('all 24 plural answers, explicit owners/number, touch, correction and saved results',async({page})=>{
 const area=await open(page),numbers=area.getByLabel('Possessed noun number',{exact:true});
 await expect(numbers).toHaveValue('singular');await numbers.selectOption('plural');
 await expect(area.getByText('Practice 24 questions for plural possessions, shuffled. Each question names the owner, number and required case.',{exact:true})).toBeVisible();
 await area.getByRole('button',{name:'Start possessed case practice'}).click();
 const seen=new Set<string>();
 for(let i=0;i<24;i++){
  const text=await area.innerText(),q=bank.find(q=>text.includes(q.sentence))!;expect(q).toBeTruthy();expect(seen.has(q.id)).toBe(false);seen.add(q.id);
  await expect(area.getByText(/Given meaning:/)).toContainText(q.givenMeaning);
  await expect(area.getByText(/Given meaning:/)).toContainText('Possessed noun number: plural');
  if(q.owner==='onlar')await expect(area.getByText(/Given meaning:/)).toContainText('they / their (plural owners)');
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
  const field=area.getByLabel('Complete inflected word or phrase');await expect(field).toBeFocused();
  if(i===0){await area.getByRole('button',{name:'ş',exact:true}).tap();await expect(field).toHaveValue('ş');await field.fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();await area.getByRole('button',{name:'My answer was correct'}).click();}
  else{await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');}
  await expect(field).toBeDisabled();await expect(area.getByText(q.explanation,{exact:true})).toBeVisible();
  await expect(area.getByText(`${i+1} / ${i+1} correct`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===23?'See typed results':'Next typed question'}).click();
 }
 await expect(area.getByText('Possessed case session complete')).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(saved).toHaveLength(24);expect(saved.every((a:any)=>a.nounNumber==='plural'&&a.exerciseType==='typed_possessed_case'&&a.givenForm&&a.owner)).toBe(true);
 expect(saved.filter((a:any)=>a.manual)).toHaveLength(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('case/number review intersections, mixed pool, reload and version-1 backups',async({page})=>{
 const area=await open(page);const s=singularPossessedCaseQuestions[0],p=bank[0];
 const history=recordPilot(recordPilot([],s,'wrong','singular'),p,'wrong','plural');
 await page.evaluate(a=>{const v=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}');v.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(v));},history);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('possessed-cases');
 const numbers=area.getByLabel('Possessed noun number',{exact:true}),cases=area.getByLabel('Required case on possessed noun',{exact:true});
 await expect(area.getByRole('button',{name:'Review possessed case mistakes (1)',exact:true})).toBeEnabled();
 await numbers.selectOption('plural');await expect(area.getByRole('button',{name:'Review possessed case mistakes (1)',exact:true})).toBeEnabled();
 await numbers.selectOption('mixed');await expect(area.getByRole('button',{name:'Review possessed case mistakes (2)',exact:true})).toBeEnabled();
 await cases.selectOption('possessed_dative');await expect(area.getByRole('button',{name:'Review possessed case mistakes (0)',exact:true})).toBeDisabled();
 await cases.selectOption('possessed_locative');
 await expect(area.getByText('Practice 18 questions for mixed possessions, shuffled. Each question names the owner, number and required case.',{exact:true})).toBeVisible();
 await area.getByRole('button',{name:'Start possessed case practice'}).click();await expect(area.getByText(/Question 1 of 18/)).toBeVisible();await area.getByRole('button',{name:'End typed session'}).click();
 await area.getByRole('button',{name:'Review possessed case mistakes (2)',exact:true}).click();
 for(let i=0;i<2;i++){
  const text=await area.innerText(),q=[s,p].find(q=>text.includes(q.sentence))!;
  await area.getByLabel('Complete inflected word or phrase').fill(q.answer);await area.getByRole('button',{name:'Check typed answer'}).click();
  await area.getByRole('button',{name:i===1?'See typed results':'Next typed question'}).click();
 }
 await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review possessed case mistakes (0)',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);
 await expect(page.getByText(/Imported 4 grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});
 await expect(page.getByText(/Imported 0 grammar results/)).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(saved).toHaveLength(4);expect(saved.filter((a:any)=>a.nounNumber==='plural')).toHaveLength(2);
});
