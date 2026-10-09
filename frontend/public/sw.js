/* eslint-env serviceworker */

const DISABLE = false;
const CACHE = 'sd10-static-v1';

const PRECACHE = [
  '/offline.html',
  '/manifest.webmanifest',
  '/emblema.png',
  '/mascot/salut.png',
  '/mascot/mandru.png',
  '/mascot/gandeste.png',
  '/mascot/bucuros.png',
  '/mascot/explica.png',
  '/mascot/cap.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
  '/icons/favicon.svg',
  '/fonts/faces.css'
];

function isStaticAsset(url) {
  const path = url.pathname;
  if (path.startsWith('/assets/')) return true;
  if (path.startsWith('/icons/')) return true;
  if (path.startsWith('/fonts/')) return true;
  if (path.startsWith('/mascot/')) return true;
  return path === '/manifest.webmanifest' || path === '/offline.html' || path === '/emblema.png';
}

function leaveToNetwork(request) {
  if (request.method !== 'GET') return true;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return true;
  const path = url.pathname;
  if (path.startsWith('/api/')) return true;
  if (path.startsWith('/parinte')) return true;
  if (path.startsWith('/creator')) return true;
  if (request.headers.has('Authorization')) return true;
  return false;
}

async function storeStatic(request, response) {
  if (!response || response.status !== 200) return;
  if (response.headers.has('Set-Cookie')) return;
  const type = response.headers.get('content-type') || '';
  if (type.includes('text/html') && !request.url.endsWith('/offline.html')) return;
  if (!isStaticAsset(new URL(request.url))) return;
  const cache = await caches.open(CACHE);
  await cache.put(request, response.clone());
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  await storeStatic(request, response);
  return response;
}

async function networkFirstPage(request) {
  try {
    // Navigarea rămâne cu cookie-ul de sesiune. /api nu e interceptat.
    return await fetch(request, { credentials: 'include' });
  } catch {
    const offline = await caches.match('/offline.html');
    if (offline) return offline;
    return new Response('Nu ai internet acum. Lecțiile se încarcă din nou când revine conexiunea.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

self.addEventListener('install', (event) => {
  if (DISABLE) {
    self.skipWaiting();
    return;
  }
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => DISABLE || key !== CACHE).map((key) => caches.delete(key)));
    if (DISABLE) {
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: 'window' });
      await Promise.all(windows.map((client) => client.navigate(client.url)));
      return;
    }
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (DISABLE) return;
  if (leaveToNetwork(event.request)) return;
  const url = new URL(event.request.url);
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstPage(event.request));
  }
});
