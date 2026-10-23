import {test,expect,type Page} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {verbNounQuestions} from '../src/verbNouns';
import {recordLesson} from '../src/verbNounPractice';
test.use({hasTouch:true});
async function open(page:Page,activity='verb-nouns'){
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await page.getByLabel('Practice activity',{exact:true}).selectOption(activity);
}
async function photo(page:Page,name:string){mkdirSync('test-results',{recursive:true});await page.locator('.exercise-header:visible').first().locator('..').screenshot({path:`test-results/layout-${name}.png`});}
test('2B separates title, compact progress, instruction, sentence and meaning on mobile and desktop',async({page})=>{
 await open(page);const q=verbNounQuestions.find(q=>q.lessonId==='action_forms'&&q.task==='structure'&&q.sentence.startsWith('Küçük yazıları'))!;
 const seed=recordLesson([],q,'other-1','seed');await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},seed);
 await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await page.getByLabel('Practice activity',{exact:true}).selectOption('verb-nouns');const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});
 await area.getByLabel('Lesson',{exact:true}).selectOption('action_forms');await expect(area.getByText(/312 model sentences/)).not.toBeVisible();await area.getByRole('button',{name:'Review lesson mistakes (1)',exact:true}).tap();
 await expect(area.getByRole('heading',{name:'Choose -mak or -ma',exact:true})).toBeVisible();await expect(area.locator('.exercise-eyebrow')).toHaveText('Lesson 3.3');await expect(area.getByRole('status',{name:'Session score'})).toHaveText('0 / 0 correct');
 await expect(area.locator('.exercise-instruction')).toHaveText('Choose the form that completes the sentence.');await expect(area.locator('.exercise-sentence')).toHaveText(q.sentence);await expect(area.locator('.exercise-meaning')).toHaveText('MeaningI have difficulty reading small print.');await expect(area.getByText(/312 model sentences/)).toHaveCount(0);
 await expect(area.getByRole('group',{name:'Choose the complete form',exact:true})).toBeVisible();await expect(area.locator('legend')).toHaveClass('sr-only');
 const sizes=await area.evaluate(el=>['.exercise-sentence','.exercise-instruction','.exercise-meta'].map(s=>parseFloat(getComputedStyle(el.querySelector(s)!).fontSize)));expect(sizes[0]).toBeGreaterThan(sizes[1]);expect(sizes[1]).toBeGreaterThan(sizes[2]);
 await photo(page,'2b-mobile');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize({width:1280,height:900});await photo(page,'2b-desktop');
 await area.locator('input[value="target"]').check();await area.locator('input[value="target"]').press('Enter');await expect(area.getByRole('status',{name:'Session score'})).toHaveText('1 / 1 correct');await expect(area.getByRole('button',{name:'See lesson results',exact:true})).toBeFocused();
});
test('meaning questions withhold translations and construction-choice cues stay visible',async({page})=>{
 await open(page);const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});await area.getByLabel('Lesson practice',{exact:true}).selectOption('meaning');await area.getByRole('button',{name:'Start verb noun lesson',exact:true}).tap();await expect(area.locator('.exercise-meaning')).toHaveCount(0);await expect(area.locator('.feedback')).toHaveCount(0);await area.getByRole('button',{name:'End lesson session',exact:true}).tap();
 await area.getByLabel('Lesson',{exact:true}).selectOption('noun_clause_cases');await area.getByLabel('Lesson practice',{exact:true}).selectOption('build');await area.getByRole('button',{name:'Start noun clause case lesson',exact:true}).tap();await expect(area.locator('.exercise-meaning')).toBeVisible();await expect(area.getByText(/Requested construction:/)).toBeVisible();await expect(area.getByRole('group',{name:'Sentence slots',exact:true})).toBeVisible();await photo(page,'assembly-mobile');
});
test('typed cases, case choice, random review and multiple choice use the same hierarchy',async({page})=>{
 await open(page,'cases');const grammar=page.getByRole('region',{name:'Grammar practice',exact:true}),typed=page.getByRole('region',{name:'Case Forms',exact:true});await typed.getByRole('button',{name:'Start typed case practice',exact:true}).tap();await expect(typed.locator('.exercise-header')).toBeVisible();await expect(typed.locator('.exercise-sentence')).toBeVisible();await expect(typed.locator('.exercise-cues')).toContainText('Required case:');await expect(typed.locator('.exercise-cues')).toContainText('Base word:');
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('choose-case');const choice=page.getByRole('region',{name:'Choose the Case',exact:true});await choice.getByRole('button',{name:'Start case choice practice',exact:true}).tap();await expect(choice.locator('.exercise-meaning')).toBeVisible();
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('random');const random=page.getByRole('region',{name:'Mix of everything',exact:true});await random.getByRole('button',{name:'Start a mix of everything',exact:true}).tap();await expect(random.locator('.exercise-header')).toBeVisible();await expect(random.locator('.exercise-sentence')).toBeVisible();
 await grammar.getByLabel('Practice activity',{exact:true}).selectOption('multiple-choice');await grammar.getByRole('button',{name:'Start grammar practice',exact:true}).tap();await expect(grammar.locator('div:not([hidden]) > .exercise-header').last()).toBeVisible();await expect(grammar.locator('legend.exercise-sentence').last()).toBeVisible();await photo(page,'multiple-choice-mobile');
});
