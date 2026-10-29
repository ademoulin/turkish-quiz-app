import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
export async function buildOffline(root = 'dist') {
  async function walk(dir = '') {
    const items = await readdir(join(root, dir), { withFileTypes: true });
    const files = await Promise.all(items.map(item => item.isDirectory()
      ? walk(join(dir, item.name)) : [join(dir, item.name).replaceAll('\\', '/')]));
    return files.flat();
  }
  // The separate single-file export isn't used by the installed app.
  const paths = (await walk()).filter(p => !['sw.js', 'quiz-my-turkish.html', '.nojekyll'].includes(p)).sort();
  const hash = createHash('sha256');
  for (const path of paths) hash.update(path).update(await readFile(join(root, path)));
  const template = await readFile('scripts/sw-template.js', 'utf8');
  hash.update(template);
  const worker = template.replace('__VERSION__', hash.digest('hex').slice(0, 16))
    .replace('__ASSETS__', JSON.stringify(paths));
  await writeFile(join(root, 'sw.js'), worker);
  console.log(`Offline worker generated for ${paths.length} resources.`);
}
if (process.argv[1]?.endsWith('build-offline.mjs')) await buildOffline();
