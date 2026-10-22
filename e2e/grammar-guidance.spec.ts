import {test,expect} from '@playwright/test';
test('all activities explain the task and keep unscored examples out of active sessions',async({page})=>{
 await page.route('https://docs.google.com/**',r=>r.abort());await page.goto('/');
 await page.getByRole('button',{name:'Open grammar practice'}).click();
 const chooser=page.getByLabel('Practice activity',{exact:true});
 const activities=[
  ['cases','Case Forms','Start typed case practice','şehirde'],
  ['possessives','Typed possessive practice','Start possessive practice','biletim'],
  ['phrases','Typed noun phrase practice','Start noun phrase practice','misafirin bavulu'],
  ['possessed-cases','Typed possessed case practice','Start possessed case practice','bavulundan'],
 ];
 for(const [activity,region,start,example] of activities){
  await chooser.selectOption(activity);
  const area=page.getByRole('region',{name:region,exact:true});
  const guide=area.getByRole('region',{name:'How to practice',exact:true});
  await expect(guide).toBeVisible();await expect(guide).toContainText('Worked example (not scored)');await expect(guide).toContainText(example);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}').pilotAttempts?.length||0)).toBe(0);
  await area.getByRole('button',{name:start,exact:true}).click();
  await expect(area.getByRole('region',{name:'How to practice',exact:true})).toHaveCount(0);
  await expect(area.getByText('0 / 0 correct',{exact:true})).toBeVisible();
  if(activity==='possessed-cases'){
   await expect(area.getByText(/Given meaning:/)).toBeVisible();
   await expect(area.getByText(/Owner:/)).toBeVisible();
  }
 }
 await chooser.selectOption('multiple-choice');
 const guide=page.getByRole('region',{name:'How to practice',exact:true});
 await expect(guide).toBeVisible();await expect(guide).toContainText('Select biz');
 await page.getByRole('button',{name:'Start grammar practice',exact:true}).click();
 await expect(guide).toHaveCount(0);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('quiz-my-turkish-v1')||'{}').pilotAttempts?.length||0)).toBe(0);
});
