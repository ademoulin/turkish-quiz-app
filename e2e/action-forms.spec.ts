import {test,expect,type Page} from '@playwright/test';
import {verbNounQuestions as bank,verbNounExamples as models} from '../src/verbNouns';
import {recordLesson} from '../src/verbNounPractice';
test.use({hasTouch:true});
async function open(page:Page){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice',exact:true}).click();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');
 const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});
 await area.getByLabel('Lesson',{exact:true}).selectOption('action_forms');return area;
}
test('2B opens into form choice, hides completed forms until check, and supports keyboard/touch corrections',async({page})=>{
 const area=await open(page);await expect(area.getByLabel('Lesson practice',{exact:true})).toHaveValue('structure');
 await area.getByLabel('Lesson',{exact:true}).selectOption('sentence_building');await area.getByLabel('Lesson practice',{exact:true}).selectOption('build');
 await area.getByLabel('Lesson',{exact:true}).selectOption('action_forms');await expect(area.getByLabel('Lesson practice',{exact:true})).toHaveValue('structure');
 await expect(area.getByText(/Call -mak\/-mek the infinitive/)).toBeVisible();
 await area.getByRole('button',{name:'Start verb noun lesson',exact:true}).tap();const seen=new Set<string>();
 for(let n=0;n<12;n++){
  const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=bank.find(q=>q.id===id)!,e=models.find(e=>e.id===q.exampleId)!;seen.add(q.exampleId);
  expect(q.task).toBe('structure');await expect(area.getByText(e.template,{exact:true})).toBeVisible();
  await expect(area.getByText(e.sentence,{exact:true})).toHaveCount(0);await expect(area.getByText(e.explanation,{exact:true})).toHaveCount(0);
  await expect(area.getByRole('radio')).toHaveCount(5);await expect(area.getByRole('button',{name:'Check lesson answer',exact:true})).toBeDisabled();
  const option=area.locator(`input[value="${n===0?'other-1':'target'}"]`);await option.check();
  if(n===0)await area.getByRole('button',{name:'Check lesson answer',exact:true}).dblclick();else await option.press('Enter');
  const next=area.getByRole('button',{name:n===11?'See lesson results':'Next lesson question',exact:true});if(n!==0)await expect(next).toBeFocused();
  await expect(area.getByText(e.explanation,{exact:true})).toBeVisible();
  if(n===0){
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));
   await area.getByRole('button',{name:'My answer was correct',exact:true}).tap();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));
   for(const key of ['id','time','answer','selectedOptionId','questionId','conceptId'])expect(after[key]).toEqual(before[key]);expect(after.manual).toBe(true);
  }
  await expect(area.getByText(`${n+1} / ${n+1} lesson answers correct / attempted`,{exact:true})).toBeVisible();await next.tap();
 }
 expect(seen.size).toBe(12);const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(12);
 expect(saved.every((a:any)=>a.lessonId==='action_forms'&&a.exerciseType==='verb_noun_structure'&&!a.nominalSubject)).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('2B typed production gives no form hint; strict mistakes survive reload and remain separate from choices',async({page})=>{
 const area=await open(page);await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');await area.getByRole('button',{name:'Start verb noun lesson',exact:true}).tap();
 const id=await area.locator('[data-question-id]').getAttribute('data-question-id'),q=bank.find(q=>q.id===id)!;
 await expect(area.getByText(/Choose the form from the supplied phrase/)).toBeVisible();
 await expect(area.getByText(q.expected,{exact:true})).toHaveCount(0);
 const field=area.getByLabel('Complete action noun',{exact:true});await field.fill(q.expected+'k');await field.press('Enter');
 await expect(area.getByText('Incorrect.',{exact:true})).toBeVisible();await page.reload();
 await page.getByRole('button',{name:'Open grammar practice',exact:true}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');await area.getByLabel('Lesson',{exact:true}).selectOption('action_forms');
 await expect(area.getByRole('button',{name:'Review lesson mistakes (0)',exact:true})).toBeDisabled();await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');await area.getByRole('button',{name:'Review lesson mistakes (1)',exact:true}).tap();
 await expect(area.locator('[data-question-id]')).toHaveAttribute('data-question-id',q.id);await field.fill(' '+q.expected.normalize('NFD')+' ');await field.press('Enter');await expect(area.getByText('Correct.',{exact:true})).toBeVisible();
 await area.getByRole('button',{name:'See lesson results',exact:true}).tap();await area.getByRole('button',{name:'Restart verb noun lesson',exact:true}).tap();await expect(area.getByRole('button',{name:'Review lesson mistakes (0)',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Your progress',exact:true}).click();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).click();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 2 grammar results/)).toBeVisible();
});
test('2B form choices are included in random review with their blank sentence and delayed feedback',async({page})=>{
 await open(page);const q=bank.find(q=>q.lessonId==='action_forms'&&q.task==='structure'&&q.expected==='yüzmeyi')!;
 const seed=recordLesson([],q,'other-1','seed');await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).click();await page.getByLabel('Practice activity',{exact:true}).selectOption('random');
 const area=page.getByRole('region',{name:'Mix of everything',exact:true});await area.getByRole('button',{name:'Review all grammar mistakes (1)',exact:true}).tap();
 await expect(area.getByText(q.sentence,{exact:true})).toBeVisible();await expect(area.getByText(models.find(e=>e.id===q.exampleId)!.explanation,{exact:true})).toHaveCount(0);
 await area.locator('input[value="target"]').check();await area.getByRole('button',{name:'Check random answer',exact:true}).tap();await expect(area.getByText('Correct.',{exact:true})).toBeVisible();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(2);expect(saved.at(-1).questionId).toBe(q.id);expect(saved.at(-1).sessionKind).toBe('random_grammar_review');
});
