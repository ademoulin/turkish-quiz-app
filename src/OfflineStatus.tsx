import React, { useEffect, useState } from 'react';

export function OfflineStatus({ vocabularyReady, storageError }: { vocabularyReady: boolean; storageError: boolean }) {
  const [state, setState] = useState<'preparing' | 'ready' | 'failed'>('preparing');
  const [online, setOnline] = useState(navigator.onLine);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    let alive = true;
    let registration: ServiceWorkerRegistration | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      const worker = navigator.serviceWorker.controller;
      if (!worker) return;
      const channel = new MessageChannel();
      timer = setTimeout(() => { if (alive) setState('failed'); channel.port1.close(); }, 10000);
      channel.port1.onmessage = event => {
        clearTimeout(timer);
        channel.port1.close();
        if (alive) setState(event.data.ready ? 'ready' : 'failed');
      };
      worker.postMessage('CHECK_OFFLINE', [channel.port2]);
    };
    const connection = () => {
      setOnline(navigator.onLine);
      check();
      if (navigator.onLine) void registration?.update().catch(() => {});
    };
    const visible = () => { if (document.visibilityState === 'visible') connection(); };
    window.addEventListener('online', connection);
    window.addEventListener('offline', connection);
    document.addEventListener('visibilitychange', visible);
    if (!('serviceWorker' in navigator)) setState('failed');
    else {
      navigator.serviceWorker.addEventListener('controllerchange', check);
      const url = new URL('sw.js', new URL(import.meta.env.BASE_URL, location.href));
      void navigator.serviceWorker.register(url, { scope: './', updateViaCache: 'none' }).then(reg => {
        registration = reg;
        if (!alive) return;
        setUpdate(Boolean(reg.waiting));
        const watchInstall = () => {
          const worker = reg.installing;
          worker?.addEventListener('statechange', () => {
            if (!alive) return;
            if (worker.state === 'installed') { setUpdate(Boolean(reg.waiting)); check(); }
            if (worker.state === 'redundant') setState('failed');
          });
        };
        reg.addEventListener('updatefound', watchInstall);
        watchInstall();
        check();
      }).catch(() => { if (alive) setState('failed'); });
    }
    return () => {
      alive = false;
      clearTimeout(timer);
      window.removeEventListener('online', connection);
      window.removeEventListener('offline', connection);
      document.removeEventListener('visibilitychange', visible);
      navigator.serviceWorker?.removeEventListener('controllerchange', check);
    };
  }, []);
  if (!import.meta.env.PROD) return null;
  const ready = state === 'ready' && vocabularyReady && !storageError;
  return <aside className="offline-status" aria-label="Offline availability">
    <strong role="status">{ready ? 'Ready for offline practice' : storageError ? 'Offline progress saving unavailable' : state === 'failed' ? 'Offline download incomplete' : 'Preparing offline practice…'}</strong>
    <small>{ready ? `${online ? 'Downloaded' : 'Offline'} · All practice content is available on this device.` : 'Connect to the internet and reopen the app to finish downloading.'}</small>
    {update && <small>An update is downloaded. Close all app windows and reopen to apply it.</small>}
    <details><summary>Use on your iPhone</summary><p>In Safari, tap Share → Add to Home Screen. Open that app online and wait for “Ready for offline practice”, then test reopening in airplane mode. Answered questions save on this device; unfinished sessions restart after reopening. Export progress for a backup. Clearing website data removes downloads and progress.</p></details>
  </aside>;
}
