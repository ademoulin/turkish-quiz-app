import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {grammarSections,sectionHeading,grammarLessonCatalog,numberedTitle} from '../src/grammarNavigation';
import {verbNounQuestions as bank} from '../src/verbNouns';
import {recordLesson} from '../src/verbNounPractice';
test.use({hasTouch:true});
test('numbered sections navigate directly to lessons and keep keyboard answers and older progress IDs',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 const q=bank.find(q=>q.lessonId==='content_dik'&&q.task==='type')!,old=recordLesson([],q,'wrong','existing');
 await page.evaluate(attempts=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=attempts;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},old);await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();const picker=page.getByLabel('Practice activity',{exact:true});
 await expect(picker.locator('optgroup')).toHaveCount(5);for(const section of grammarSections)await expect(picker.locator(`optgroup[label="${sectionHeading(section)}"]`)).toHaveCount(1);
 await picker.selectOption('cases');await expect(page.getByRole('region',{name:'Case Forms',exact:true})).toBeVisible();await picker.selectOption('possessives');await expect(picker.locator('option:checked')).toHaveText('2.1: Possessive forms');
 const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});
 for(const id of ['content_dik','relative_negation','converb_ip'] as const){await picker.selectOption('lesson:'+id);await expect(area).toBeVisible();await expect(area.getByLabel('Lesson',{exact:true})).toHaveValue(id);await expect(area.getByRole('region',{name:'Lesson guide',exact:true}).getByRole('heading')).toHaveText(numberedTitle(grammarLessonCatalog[id]));}
 await area.getByLabel('Lesson',{exact:true}).selectOption('object_relatives');await expect(picker).toHaveValue('lesson:object_relatives');await page.getByRole('button',{name:'Close grammar practice',exact:true}).tap();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await expect(area.getByLabel('Lesson',{exact:true})).toHaveValue('object_relatives');
 await picker.selectOption('lesson:content_dik');await area.getByLabel('Lesson practice',{exact:true}).selectOption('type');await area.getByRole('button',{name:'Review lesson mistakes (1)',exact:true}).tap();await expect(area.locator('.exercise-eyebrow')).toHaveText('Lesson 3.7');const field=area.getByRole('textbox');await field.fill(q.expected);
 // Existing activity navigation still preserves unfinished answers.
 await picker.selectOption('cases');await picker.selectOption('verb-nouns');await expect(field).toHaveValue(q.expected);await field.press('Enter');await expect(area.getByRole('status',{name:'Session score'})).toHaveText('1 / 1 correct');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts);expect(saved).toHaveLength(2);expect(saved[0]).toEqual(old[0]);expect(saved[1].questionId).toBe(q.id);expect(saved[1].conceptId).toBe(q.conceptId);
 await picker.selectOption('progress');const progress=page.getByRole('region',{name:'Your grammar progress',exact:true});await progress.getByLabel('Search concepts',{exact:true}).fill('3.7');await expect(progress.locator('[data-concept-id="lesson_content_dik"]')).toContainText('3.7: -DIK: facts inside a sentence');
 await page.getByRole('button',{name:'Your progress',exact:true}).tap();await expect(page.locator('.history').getByText(/3\.7: -DIK: facts inside a sentence/).first()).toBeVisible();
 mkdirSync('test-results',{recursive:true});await page.screenshot({path:'test-results/layout-numbered-grammar-mobile.png'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
