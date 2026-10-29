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
