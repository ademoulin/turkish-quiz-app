import {test,expect} from '@playwright/test';
import {mixedGrammarQuestions as bank,mixedGrammarFamilies,mixedGrammarFamily} from '../src/mixedGrammar';
import {recordPilot} from '../src/casePilot';
test.use({hasTouch:true});
async function open(page:import('@playwright/test').Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('mixed-review');
 return page.getByRole('region',{name:'Mixed Grammar Review',exact:true});
}
async function current(area:import('@playwright/test').Locator){
 const id=await area.locator('[data-question-id]').getAttribute('data-question-id');
 return bank.find(q=>q.id===id)!;
}
const labels={pronoun_cases:'Complete inflected pronoun',cases:'Complete inflected word',possessives:'Complete inflected word',phrases:'Complete Turkish noun phrase',add_case:'Complete inflected word or phrase',build_from_base:'Complete word built from base'};
const titles={pronoun_cases:'Case Forms · Personal pronouns',cases:'Case Forms',possessives:'Typed endings · Possessive forms',phrases:'Build a noun phrase · Genitive + possessive',add_case:'Combine endings · Possessive + case',build_from_base:'Build from base · Number + possessive + case'};
test('12 balanced typed tasks keep their own instructions, grading, keyboard/touch and original evidence',async({page})=>{
 const area=await open(page);
 await expect(area.getByRole('button',{name:'Review previous grammar mistakes (0)',exact:true})).toBeDisabled();
 await expect(area.getByRole('region',{name:'How to practice'})).toBeVisible();
 await area.getByRole('button',{name:'Start mixed grammar review'}).click();
 const families=new Map<string,number>(),seen=new Set<string>();
 for(let i=0;i<12;i++){
  const q=await current(area),family=mixedGrammarFamily(q);expect(q).toBeTruthy();expect(seen.has(q.id)).toBe(false);seen.add(q.id);families.set(family,(families.get(family)||0)+1);
  await expect(area.getByRole('heading',{name:titles[family],exact:true})).toBeVisible();
  await expect(area.getByRole('region',{name:'How to practice'})).toHaveCount(0);
  await expect(area.getByText(q.explanation,{exact:true})).toHaveCount(0);
  if(family==='phrases')await expect(area.getByText('Meaning: '+q.sentence,{exact:true})).toBeVisible();
  if(family==='add_case')await expect(area.getByText('Given possessed form: '+q.base,{exact:true})).toBeVisible();
  if(family==='build_from_base')await expect(area.getByText('Base noun: '+q.base,{exact:true})).toBeVisible();
  const field=area.getByLabel(labels[family],{exact:true});await expect(field).toBeFocused();await expect(field).toHaveValue('');
  await expect(area.getByRole('button',{name:'Check typed answer'})).toBeDisabled();
  if(i===0){
   await area.getByRole('button',{name:'ş',exact:true}).tap();await expect(field).toHaveValue('ş');
   await field.fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);
   await area.getByRole('button',{name:'My answer was correct'}).click();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts[0]);expect(after.id).toBe(before.id);expect(after.time).toBe(before.time);
  }else{
   await field.fill(' '+q.answer.normalize('NFD')+' ');await field.press('Enter');
  }
  await expect(field).toBeDisabled();await expect(area.locator(".feedback")).toContainText(q.answer);
  await expect(area.getByText(`${i+1} / ${i+1} correct`,{exact:true})).toBeVisible();
  await area.getByRole('button',{name:i===11?'See typed results':'Next typed question'}).click();
 }
 await expect(area.getByText('Mixed grammar session complete')).toBeVisible();
 expect(families.size).toBe(6);expect([...families.values()].every(n=>n===2)).toBe(true);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);
 expect(saved).toHaveLength(12);expect(new Set(saved.map((a:any)=>a.sessionId)).size).toBe(1);expect(saved.every((a:any)=>a.practiceMode==='mixed_grammar')).toBe(true);
 expect(saved.filter((a:any)=>a.manual)).toHaveLength(1);
 for(const a of saved){const q=bank.find(q=>q.id===a.questionId)!;expect(a.exerciseType).toBe(q.exerciseType);expect(a.conceptId).toBe(q.conceptId);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('mixed mistakes review is short when scarce, clears focused queues, and round-trips old/new backups',async({page})=>{
 const area=await open(page);
 const seed=Object.values(mixedGrammarFamilies).flatMap(qs=>recordPilot([],qs[0],'wrong','focused-'+qs[0].id));
 await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}');s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice'}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('mixed-review');
 await area.getByRole('button',{name:'Review previous grammar mistakes (6)',exact:true}).click();
 await expect(area.getByText(/Question 1 of 6/)).toBeVisible();
 const seen=new Set<string>();
 for(let i=0;i<6;i++){
  const q=await current(area);expect(seed.some(a=>a.questionId===q.id)).toBe(true);expect(seen.has(q.id)).toBe(false);seen.add(q.id);
  await area.getByLabel(labels[mixedGrammarFamily(q)],{exact:true}).fill(q.answer);await area.getByRole('button',{name:'Check typed answer'}).click();
  await area.getByRole('button',{name:i===5?'See typed results':'Next typed question'}).click();
 }
 await area.getByRole('button',{name:'Restart typed practice'}).click();
 await expect(area.getByRole('button',{name:'Review previous grammar mistakes (0)',exact:true})).toBeDisabled();
 for(const [activity,region,review] of [
  ['cases','Case Forms','Review grammar mistakes (0)'],
  ['possessives','Typed possessive practice','Review possessive mistakes (0)'],
  ['phrases','Typed noun phrase practice','Review noun phrase mistakes (0)'],
  ['possessed-cases','Typed possessed case practice','Review possessed case mistakes (0)'],
 ]){
  await page.getByLabel('Practice activity',{exact:true}).selectOption(activity);
  await expect(page.getByRole('region',{name:region,exact:true}).getByRole('button',{name:review,exact:true})).toBeDisabled();
 }
 await page.getByLabel('Practice method',{exact:true}).selectOption('build-from-base');
 await expect(page.getByRole('region',{name:'Build endings from base',exact:true}).getByRole('button',{name:'Review build-from-base mistakes (0)',exact:true})).toBeDisabled();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('cases');
 await page.getByLabel('Case word type',{exact:true}).selectOption('personal-pronouns');
 await expect(page.getByRole('region',{name:'Personal pronoun case forms',exact:true}).getByRole('button',{name:'Review pronoun case mistakes (0)',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');
 await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);
 await expect(page.getByText(/Imported 12 grammar results/)).toBeVisible();
 await page.locator('input[type=file]').setInputFiles({name:'legacy.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,attempts:[]}))});
 await expect(page.getByText(/Imported 0 grammar results/)).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(12);
 expect(saved.filter((a:any)=>a.practiceMode==='mixed_grammar_review')).toHaveLength(6);
});
test('mixed sessions retain unfinished answers when switching activities and reset on close',async({page})=>{
 const area=await open(page);await area.getByRole('button',{name:'Start mixed grammar review'}).click();const q=await current(area);
 await area.getByLabel(labels[mixedGrammarFamily(q)],{exact:true}).fill('unfinished');
 await page.getByLabel('Practice activity',{exact:true}).selectOption('cases');await expect(area).not.toBeVisible();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('mixed-review');
 expect((await current(area)).id).toBe(q.id);await expect(area.getByLabel(labels[mixedGrammarFamily(q)],{exact:true})).toHaveValue('unfinished');
 await page.getByRole('button',{name:'Close grammar practice'}).click();await page.getByRole('button',{name:'Open grammar practice'}).click();
 await expect(area.getByRole('button',{name:'Start mixed grammar review'})).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}').pilotAttempts?.length||0)).toBe(0);
});
test('mixed check works in the preview sandbox and on the Pages route',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.setContent('<iframe sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:4173/turkish-quiz-app/"></iframe>');
 const frame=page.frameLocator('iframe');await frame.getByRole('button',{name:'Open grammar practice'}).click();await frame.getByLabel('Practice activity',{exact:true}).selectOption('mixed-review');
 const area=frame.getByRole('region',{name:'Mixed Grammar Review',exact:true});await area.getByRole('button',{name:'Start mixed grammar review'}).click();
 await area.locator('input.answer').fill('wrong');await area.getByRole('button',{name:'Check typed answer'}).click();
 await expect(area.getByText('Incorrect.',{exact:true})).toBeVisible();
});
