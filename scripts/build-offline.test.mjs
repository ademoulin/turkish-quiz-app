import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildOffline } from './build-offline.mjs';
test('precache includes nested assets, excludes standalone export and changes version with content', async () => {
  const root = await mkdtemp(join(tmpdir(), 'turkish-offline-'));
  try {
    await mkdir(join(root, 'assets'));
    await writeFile(join(root, 'index.html'), 'first');
    await writeFile(join(root, 'assets/lazy.js'), 'exercise data');
    await writeFile(join(root, 'quiz-my-turkish.html'), 'export');
    await buildOffline(root);
    const first = await readFile(join(root, 'sw.js'), 'utf8');
    assert.match(first, /\["assets\/lazy.js","index.html"\]/);
    assert.doesNotMatch(first, /quiz-my-turkish.html/);
    await buildOffline(root);
    assert.equal(await readFile(join(root, 'sw.js'), 'utf8'), first);
    await writeFile(join(root, 'index.html'), 'second');
    await buildOffline(root);
    assert.notEqual(await readFile(join(root, 'sw.js'), 'utf8'), first);
  } finally { await rm(root, { recursive: true, force: true }); }
});
test('readiness and fetch checks never recreate deleted caches after an update', async () => {
  const { runInNewContext } = await import('node:vm');
  const handlers = {};
  const response = { ok: true };
  let matches = 0;
  let posted;
  const source = (await readFile('scripts/sw-template.js', 'utf8'))
    .replace('__VERSION__', 'test').replace('__ASSETS__', '["index.html"]');
  runInNewContext(source, {
    URL, Request,
    self: { location: { href: 'https://example.com/turkish-quiz-app/sw.js' }, addEventListener: (type, fn) => { handlers[type] = fn; } },
    caches: {
      open: () => { throw Error('Read checks must not create caches'); },
      match: async (url, options) => { assert.equal(options.cacheName, 'quiz-my-turkish-app-test'); matches++; return response; },
    },
    fetch: () => { throw Error('Should serve the cached response'); },
  });
  let work;
  handlers.message({ data: 'CHECK_OFFLINE', ports: [{ postMessage: value => { posted = value.ready; } }], waitUntil: promise => { work = promise; } });
  await work;
  assert.equal(posted, true);
  handlers.fetch({ request: { method: 'GET', mode: 'navigate', url: 'https://example.com/turkish-quiz-app/' }, respondWith: promise => { work = promise; } });
  assert.equal(await work, response);
  assert.equal(matches, 2);
});
test('activation retains the previous download and removes older app caches only', async () => {
  const { runInNewContext } = await import('node:vm');
  const handlers = {};
  const deleted = [];
  let claimed = false;
  runInNewContext((await readFile('scripts/sw-template.js', 'utf8')).replace('__VERSION__', 'third').replace('__ASSETS__', '[]'), {
    URL,
    self: { location: { href: 'https://example.com/turkish-quiz-app/sw.js' }, clients: { claim: async () => { claimed = true; } }, addEventListener: (type, fn) => { handlers[type] = fn; } },
    caches: { keys: async () => ['another-app', 'quiz-my-turkish-app-first', 'quiz-my-turkish-app-second', 'quiz-my-turkish-app-third'], delete: async name => { deleted.push(name); } },
  });
  let work;
  handlers.activate({ waitUntil: promise => { work = promise; } });
  await work;
  assert.deepEqual(deleted, ['quiz-my-turkish-app-first']);
  assert.equal(claimed, true);
});
