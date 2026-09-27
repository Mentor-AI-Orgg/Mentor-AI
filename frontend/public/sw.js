/* Cache doar pentru fișiere statice. Oprește worker-ul punând SW_DISABLED = true. */
const SW_DISABLED = false;
const CACHE = 'sd10-static-v1';

function isStaticAsset(pathname) {
  return pathname.startsWith('/assets/')
    || pathname.startsWith('/icons/')
    || pathname.startsWith('/fonts/')
    || pathname === '/manifest.webmanifest'
    || pathname === '/offline.html';
}

function shouldHandle(request, url) {
  if (request.method !== 'GET') return false;
  if (url.origin !== self.location.origin) return false;
  if (request.headers.get('Authorization')) return false;
  const path = url.pathname;
  if (path.startsWith('/api/')) return false;
  if (path === '/parinte' || path.startsWith('/parinte/')) return false;
  if (path === '/creator' || path.startsWith('/creator/')) return false;
  if (path === '/' || path === '/index.html' || request.mode === 'navigate') return 'page';
  if (isStaticAsset(path)) return 'static';
  return false;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (!response || response.status !== 200 || response.headers.get('Set-Cookie')) return response;
    return response;
  } catch {
    const cached = await caches.match('/offline.html');
    return cached || new Response('Nu ai internet acum.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (!response || response.status !== 200 || response.headers.get('Set-Cookie')) return response;
  const copy = response.clone();
  const cache = await caches.open(CACHE);
  await cache.put(request, copy);
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    if (SW_DISABLED) return;
    const cache = await caches.open(CACHE);
    await cache.addAll(['/offline.html', '/manifest.webmanifest', '/icons/favicon.svg']);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE || SW_DISABLED).map(key => caches.delete(key)));
    if (SW_DISABLED) await self.registration.unregister();
    else await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (SW_DISABLED) return;
  const url = new URL(event.request.url);
  const kind = shouldHandle(event.request, url);
  if (!kind) return;
  if (kind === 'page') {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(cacheFirst(event.request));
});
