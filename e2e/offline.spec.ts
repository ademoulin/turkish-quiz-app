import { test, expect } from '@playwright/test';
import { caseQuestions } from '../src/casePilot';

const url = 'http://127.0.0.1:4173/turkish-quiz-app/';
test('production download survives a closed tab, offline practice and saved results', async ({ page, context }) => {
  // No successful Google request or pre-existing vocabulary cache is needed.
  await context.route('https://docs.google.com/**', r => r.abort());
  await page.goto(url);
  await expect(page.getByText('Ready for offline practice', { exact: true })).toBeVisible();
  const count = await page.locator('.word-row').count();
  expect(count).toBeGreaterThan(100);
  await expect(page.getByText('Using bundled vocabulary · October 29')).toBeVisible();
  await expect(page.locator('link[rel=manifest]')).toHaveAttribute('href', './manifest.webmanifest');
  await context.setOffline(true);
  await page.close();
  const offline = await context.newPage();
  await offline.goto(url);
  await expect(offline.getByText('Ready for offline practice', { exact: true })).toBeVisible();
  await expect(offline.locator('.word-row')).toHaveCount(count);
  await offline.getByRole('button', { name: 'Select all matching' }).click();
  await offline.getByRole('button', { name: 'Let’s practice' }).click();
  await offline.locator('#answer').fill('wrong');
  await offline.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(offline.locator('.feedback')).toBeVisible();
  await offline.reload();
  await offline.getByRole('button', { name: 'Conjugation Put the endings to work.' }).click();
  await offline.getByRole('button', { name: 'Let’s practice' }).click();
  await offline.locator('#answer').fill('wrong');
  await offline.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(offline.locator('.expected')).toBeVisible();
  await offline.reload();
  await offline.getByRole('button', { name: 'Open grammar practice' }).click();
  const pilot = offline.getByRole('region', { name: 'Case Forms' });
  await pilot.getByRole('button', { name: 'Start typed case practice' }).click();
  const text = await pilot.innerText();
  const q = caseQuestions.find(q => text.includes(q.sentence))!;
  await pilot.getByLabel('Complete inflected word').fill(q.answer);
  await pilot.getByRole('button', { name: 'Check typed answer' }).click();
  await expect(pilot.locator('.feedback')).toContainText(q.answer);
  await offline.reload();
  await offline.getByRole('button', { name: 'Open grammar practice' }).click();
  await offline.getByLabel('Practice activity', { exact: true }).selectOption('multiple-choice');
  await offline.getByRole('button', { name: 'Start grammar practice' }).click();
  const area = offline.getByRole('region', { name: 'Grammar practice' });
  await area.getByRole('radio').first().check();
  await area.getByRole('button', { name: 'Check grammar answer' }).click();
  await expect(area.locator('.feedback')).toBeVisible();
  const saved = await offline.evaluate(() => JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!));
  expect(saved.attempts.map((a: any) => a.kind)).toEqual(['meaning', 'conjugation']);
  expect(saved.pilotAttempts).toHaveLength(2);
  await offline.reload();
  expect(await offline.evaluate(() => JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).pilotAttempts)).toEqual(saved.pilotAttempts);
  expect(await offline.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.setOffline(false);
  await offline.reload();
  expect(await offline.evaluate(() => JSON.parse(localStorage.getItem('quiz-my-turkish-v1')!).attempts)).toEqual(saved.attempts);
});

test('cached vocabulary takes priority over bundled fallback while offline', async ({ page, context }) => {
  await context.route('https://docs.google.com/**', r => r.fulfill({ body: 'ID,Word,Type,Meaning\ncustom,özel,adj,special' }));
  await page.goto(url);
  await expect(page.getByText('Your vocabulary is up to date')).toBeVisible();
  await expect(page.getByText('Ready for offline practice', { exact: true })).toBeVisible();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText('Using saved vocabulary')).toBeVisible();
  await expect(page.locator('.word-row')).toHaveCount(1);
  await expect(page.locator('.word-row')).toContainText('özel');
});

test('failed installs do not report ready; updates wait for session windows to close', async ({ browser }) => {
  const { createServer } = await import('node:http');
  const { readFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  let version = 'first';
  let fail = true;
  const server = createServer(async (req, res) => {
    const path = new URL(req.url!, 'http://localhost').pathname.replace('/turkish-quiz-app/', '') || 'index.html';
    if (fail && path.endsWith('.png')) { res.writeHead(503).end(); return; }
    try {
      let body: Buffer | string = await readFile(join('dist', path));
      if (path === 'sw.js') body = body.toString().replace(/const CACHE_NAME = CACHE_PREFIX \+ '[^']+';/, `const CACHE_NAME = CACHE_PREFIX + '${version}';`);
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Content-Type', path.endsWith('.js') ? 'application/javascript' : path.endsWith('.css') ? 'text/css' : path.endsWith('.png') ? 'image/png' : path.endsWith('.webmanifest') ? 'application/manifest+json' : 'text/html');
      res.end(body);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address() as import('node:net').AddressInfo;
  const target = `http://127.0.0.1:${address.port}/turkish-quiz-app/`;
  const context = await browser.newContext();
  try {
    await context.route('https://docs.google.com/**', r => r.abort());
    let tab = await context.newPage();
    await tab.goto(target);
    await expect(tab.getByText('Offline download incomplete', { exact: true })).toBeVisible();
    expect(await tab.evaluate(() => caches.keys())).toEqual([]);
    fail = false;
    await tab.reload();
    await expect(tab.getByText('Ready for offline practice', { exact: true })).toBeVisible();
    await tab.getByRole('button', { name: 'Select all matching' }).click();
    await tab.getByRole('button', { name: 'Let’s practice' }).click();
    await tab.locator('#answer').fill('my unfinished answer');
    version = 'second';
    await tab.evaluate(async () => { await (await navigator.serviceWorker.getRegistration())!.update(); });
    await expect(tab.getByText('An update is downloaded.', { exact: false })).toBeVisible();
    await expect(tab.locator('#answer')).toHaveValue('my unfinished answer');
    expect(await tab.evaluate(() => caches.keys())).toContain('quiz-my-turkish-app-first');
    await tab.close();
    // Let the browser finish natural activation with no old controlled window.
    await expect.poll(async () => {
      for (const worker of context.serviceWorkers()) {
        try {
          if (await worker.evaluate(() => {
            const sw = globalThis as any;
            return sw.registration.active?.state === 'activated' && !sw.registration.waiting &&
              // Generated worker constants are lexical globals.
              eval('CACHE_NAME') === 'quiz-my-turkish-app-second';
          })) return true;
        } catch { /* The outgoing worker can terminate during this check. */ }
      }
      return false;
    }, { timeout: 15000 }).toBe(true);
    tab = await context.newPage();
    await tab.goto(target);
    await expect.poll(() => tab.evaluate(() => caches.keys())).toEqual(['quiz-my-turkish-app-second']);
    await context.setOffline(true);
    await tab.reload();
    await expect(tab.getByText('Ready for offline practice', { exact: true })).toBeVisible();
  } finally {
    await context.close();
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
