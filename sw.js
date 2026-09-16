/* Malaysia Trip: versioned shell + network revalidation + offline fallback. */
const VERSION = '20260916-plan-02';
const CACHE = 'malaysia-trip-' + VERSION;
const APP_SHELL = [
  './', './index.html',
  './css/style.css?v=' + VERSION,
  './js/data.js?v=' + VERSION,
  './js/map.js?v=' + VERSION,
  './js/app.js?v=' + VERSION,
  './vendor/leaflet/leaflet.js', './vendor/leaflet/leaflet.css',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-512.png', './icons/favicon.svg', './img/hero.webp',
  './img/mov-hotel.webp', './img/lexis-hibiscus.webp', './img/petronas-towers.webp',
  './img/melaka-river.webp', './img/zoo-negara.webp'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(APP_SHELL.map(function (url) { return new Request(url, { cache: 'reload' }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) {
      return key.indexOf('malaysia-trip-') === 0 && key !== CACHE;
    }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});

function isTile(url) {
  return /(^|\.)basemaps\.cartocdn\.com$/.test(url.hostname) ||
    /(^|\.)tile\.openstreetmap\.org$/.test(url.hostname) ||
    /(^|\.)arcgisonline\.com$/.test(url.hostname);
}

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !isTile(url)) return;
  // Only this project's scope may enter its cache.
  if (sameOrigin && !url.href.startsWith(self.registration.scope)) return;
  const navigation = req.mode === 'navigate' || req.destination === 'document';
  const code = /\.(?:js|css)$/.test(url.pathname) || url.pathname.endsWith('.webmanifest');
  event.respondWith(caches.open(CACHE).then(async function (cache) {
    const cached = await cache.match(navigation ? new URL('index.html', self.registration.scope).href : req);
    if (!navigation && !code && cached) return cached;
    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, 5000);
    try {
      const response = await fetch(req, { cache: 'no-cache', signal: controller.signal });
      if (!response.ok) {
        if (cached) return cached;
        return response;
      }
      try {
        await cache.put(navigation ? new URL('index.html', self.registration.scope).href : req, response.clone());
      } catch (_) { /* Quota errors must not hide a successful network response. */ }
      return response;
    } catch (_) {
      return cached || Response.error();
    } finally {
      clearTimeout(timer);
    }
  }));
});
