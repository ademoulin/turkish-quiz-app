import {test,expect} from '@playwright/test';
import {activeGrammarQuestions,retiredGrammarQuestions,type GrammarQuestion} from '../src/yeniHitit';
import {recordGrammarChoice,mcConcept} from '../src/grammarMultipleChoice';
test.use({hasTouch:true});
for(const skill of ['YH1-12-01-S02','YH1-12-01-S03'])test(`${skill}: revised MC sessions, legacy progress, random review and backups preserve question identity`,async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 const legacy=retiredGrammarQuestions.filter(q=>q.skill_id===skill).map(q=>recordGrammarChoice([],q,q.options.find(o=>o.id!==q.correct_option_id)!.id,'old-'+q.id)[0]);
 await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},legacy);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();const grammar=page.getByRole('region',{name:'Grammar practice',exact:true});
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('multiple-choice');await grammar.getByLabel('Section',{exact:true}).selectOption('12.1');await grammar.getByLabel('Skill',{exact:true}).selectOption(skill);await grammar.getByRole('button',{name:'Start grammar practice',exact:true}).tap();
 const seen=new Set<string>();let missed:GrammarQuestion|undefined;
 for(let n=0;n<3;n++){
  const prompt=await grammar.locator('form:visible legend').innerText(),q=activeGrammarQuestions.find(q=>q.prompt===prompt)!;
  expect(q.skill_id).toBe(skill);seen.add(q.id);await expect(grammar.getByText(q.explanation,{exact:true})).toHaveCount(0);await expect(grammar.getByRole('radio')).toHaveCount(4);
  const answer=n<2?q.options.find(o=>o.id!==q.correct_option_id)!.id:q.correct_option_id;
  const radio=grammar.locator(`input[value="${answer}"]`);await radio.check();
  if(n===0)await grammar.getByRole('button',{name:'Check grammar answer',exact:true}).dblclick();else await radio.press('Enter');
  await expect(grammar.getByRole('button',{name:'Answer checked',exact:true})).toBeDisabled();await expect(grammar.getByText(q.explanation,{exact:true})).toBeVisible();
  if(n===0){
   const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));await grammar.getByRole('button',{name:'My answer was correct',exact:true}).tap();
   const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));for(const k of ['id','time','sessionId','answer','questionId'])expect(after[k]).toBe(before[k]);expect(after.manual).toBe(true);
  }else if(n===1)missed=q;
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(legacy.length+1+n);
  await grammar.getByRole('button',{name:n===2?'See grammar results':'Next grammar question',exact:true}).tap();
 }
 expect(seen.size).toBe(3);await expect(grammar.getByRole('heading',{name:'Grammar session complete',exact:true})).toBeVisible();
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('progress');const progress=page.getByRole('region',{name:'Your grammar progress',exact:true});await progress.getByLabel('Concept family').selectOption('multiple_choice');await progress.getByLabel('Search concepts').fill('Verb nouns');
 const card=progress.locator(`[data-concept-id="${mcConcept(skill)}"]`);await card.locator('summary').tap();await expect(card.getByText(`${legacy.length} checks on earlier exercise versions. They do not count toward current question results or current mistake review.`,{exact:true})).toBeVisible();await expect(card.locator('summary')).toContainText('3 saved checks · 1 questions to review');
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('random');const random=page.getByRole('region',{name:'Mix of everything',exact:true});await random.getByRole('button',{name:'Review all grammar mistakes (1)',exact:true}).tap();await expect(random.locator('[data-random-question-id]')).toHaveAttribute('data-random-question-id',missed!.id);
 await random.locator(`input[value="${missed!.correct_option_id}"]`).check();await random.getByRole('button',{name:'Check random answer',exact:true}).tap();
 await page.getByRole('button',{name:'Your progress',exact:true}).tap();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).tap();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(new RegExp(`Imported ${legacy.length+4} grammar results`))).toBeVisible();
 await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(legacy.length+4);expect(saved.slice(0,legacy.length)).toEqual(legacy);expect(saved.at(-1).sessionKind).toBe('random_grammar_review');expect(saved.slice(legacy.length,legacy.length+3).filter((a:any)=>a.questionId.endsWith('-v2'))).toHaveLength(legacy.length);
});
