import {test,expect,type Page} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {verbNounQuestions as bank,retiredLessonQuestions,verbNounExamples} from '../src/verbNouns';
import {recordLesson} from '../src/verbNounPractice';
import type {PilotAttempt} from '../src/casePilot';
test.use({hasTouch:true});
async function open(page:Page){await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');return page.getByRole('region',{name:'Verb nouns and clauses',exact:true});}
async function seed(page:Page,attempts:PilotAttempt[]){await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},attempts);await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();}
test('3.4 offers only production, checks once and preserves manual correction',async({page})=>{
 const area=await open(page);await area.getByLabel('Lesson',{exact:true}).selectOption('clause_cases');await area.getByLabel('Lesson practice',{exact:true}).selectOption('structure');await area.getByLabel('Lesson',{exact:true}).selectOption('subjects');
 await expect(area.getByLabel('Lesson practice',{exact:true})).toHaveValue('mixed');await expect(area.getByLabel('Lesson practice',{exact:true}).locator('option[value="meaning"], option[value="structure"]')).toHaveCount(0);
 await area.getByRole('button',{name:'Start verb noun lesson',exact:true}).tap();await area.getByRole('textbox').fill('wrong');await area.getByRole('button',{name:'Check lesson answer',exact:true}).dblclick();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts.at(-1));await area.getByRole('button',{name:'My answer was correct',exact:true}).tap();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(1);expect(saved[0].id).toBe(before.id);expect(saved[0].time).toBe(before.time);expect(saved[0].answer).toBe('wrong');expect(saved[0].manual).toBe(true);
 await expect(area.getByRole('status',{name:'Session score'})).toHaveText('1 / 1 correct');await page.reload();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts)).toEqual(saved);
});
for(const lesson of ['temporal_contrasts','sentence_building'] as const)test(`${lesson} keeps production and retired interpretations separate`,async({page})=>{
 const area=await open(page),old=retiredLessonQuestions.filter(q=>q.lessonId===lesson).map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);
 await seed(page,old);await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');await area.getByLabel('Lesson',{exact:true}).selectOption(lesson);
 await expect(area.getByLabel('Lesson practice',{exact:true}).locator('option[value="meaning"], option[value="structure"]')).toHaveCount(0);await expect(area.getByRole('button',{name:'Review lesson mistakes (0)',exact:true})).toBeDisabled();await page.getByLabel('Practice activity',{exact:true}).selectOption('random');await expect(page.getByRole('button',{name:'Review all grammar mistakes (0)',exact:true})).toBeDisabled();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts)).toEqual(old);
});
test('5.6 offers active while-overlap practice and retains earlier progress',async({page})=>{
 const area=await open(page),old=retiredLessonQuestions.filter(q=>q.lessonId==='temporal_while').map(q=>recordLesson([],q,q.task==='type'?q.expected:'target','old-'+q.id)[0]);expect(old).toHaveLength(36);
 await seed(page,old);await page.getByLabel('Practice activity',{exact:true}).selectOption('lesson:temporal_while');
 await expect(area.getByLabel('Lesson practice',{exact:true})).toBeVisible();
 await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');
 await expect(area.getByRole('button',{name:'Start converb lesson',exact:true})).toBeEnabled();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('progress');
 const progress=page.getByRole('region',{name:'Your grammar progress',exact:true});
 await progress.getByLabel('Search concepts',{exact:true}).fill('5.6');
 const row=page.locator('[data-concept-id="lesson_temporal_while"]');await row.locator('summary').tap();
 await expect(row).toContainText('36 checks on earlier exercise versions');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts)).toEqual(old);
});
test('earlier version checks are visible separately, export unchanged and do not seed current review',async({page})=>{
 await open(page);const old=retiredLessonQuestions.filter(q=>q.lessonId==='subjects').map(q=>recordLesson([],q,'other-1','legacy-'+q.id)[0]);await seed(page,old);await page.getByLabel('Practice activity',{exact:true}).selectOption('progress');const progress=page.getByRole('region',{name:'Your grammar progress',exact:true});await progress.getByLabel('Search concepts',{exact:true}).fill('The action has its own subject');await progress.getByLabel('Practice filter',{exact:true}).selectOption('practised');const row=progress.locator('[data-concept-id="lesson_subjects"]');await expect(row.locator('summary')).toContainText('New');await row.locator('summary').tap();await expect(row).toContainText('No saved evidence');await expect(row).toContainText('12 available questions · 0 distinct attempted');
 await page.getByLabel('Practice activity',{exact:true}).selectOption('random');await expect(page.getByRole('region',{name:'Mix of everything',exact:true}).getByRole('button',{name:'Review all grammar mistakes (0)',exact:true})).toBeDisabled();await page.getByRole('button',{name:'Your progress',exact:true}).tap();const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress',exact:true}).tap();await page.locator('input[type=file]').setInputFiles((await(await download).path())!);await expect(page.getByText(/Imported 32 grammar results/)).toBeVisible();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toEqual(old);
});
