/* Generated at build time; scoped to this GitHub Pages project. */
const CACHE_PREFIX = 'quiz-my-turkish-app-';
const CACHE_NAME = CACHE_PREFIX + '__VERSION__';
const ASSETS = __ASSETS__;
const base = new URL('./', self.location.href);
const assetUrls = ASSETS.map(path => new URL(path, base).href);
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(assetUrls.map(url => new Request(url, { cache: 'reload' })));
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
  })());
  // Updates wait until old app windows close; never interrupt an answer.
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data !== 'CHECK_OFFLINE') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const ready = (await Promise.all(assetUrls.map(url => cache.match(url)))).every(Boolean);
    event.ports[0]?.postMessage({ ready });
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  const target = event.request.mode === 'navigate' &&
    (url.pathname === base.pathname || url.pathname === base.pathname + 'index.html')
    ? new URL('index.html', base).href : url.href;
  if (!assetUrls.includes(target)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(target) || fetch(event.request);
  })());
});
