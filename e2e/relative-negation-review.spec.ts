import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {verbNounQuestions as bank,retiredLessonQuestions as retired} from '../src/verbNouns';
import {recordLesson} from '../src/verbNounPractice';
test.use({hasTouch:true});
test('4.5 retires meaning/scope checks while preserving saved evidence',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 const old=retired.filter(q=>q.lessonId==='relative_negation').map(q=>recordLesson([],q,'other-1','old-'+q.id)[0]);expect(old).toHaveLength(24);
 await page.evaluate(a=>{const s=JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!);s.pilotAttempts=a;localStorage.setItem('quiz-my-turkish-v1',JSON.stringify(s));},old);await page.reload();await page.getByRole('button',{name:'Open grammar practice',exact:true}).tap();await page.getByLabel('Practice activity',{exact:true}).selectOption('lesson:relative_negation');const area=page.getByRole('region',{name:'Verb nouns and clauses',exact:true});
 await expect(area.getByLabel('Lesson practice',{exact:true}).locator('option[value="meaning"], option[value="structure"]')).toHaveCount(0);await expect(area.getByRole('button',{name:'Review lesson mistakes (0)',exact:true})).toBeDisabled();
 await page.getByLabel('Practice activity',{exact:true}).selectOption('progress');const progress=page.getByRole('region',{name:'Your grammar progress',exact:true});await progress.getByLabel('Search concepts',{exact:true}).fill('4.5');const row=progress.locator('[data-concept-id="lesson_relative_negation"]');await row.locator('summary').tap();await expect(row).toContainText('24 checks on earlier exercise versions');expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts)).toEqual(old);
});
