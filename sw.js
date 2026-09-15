/* ===== Malaysia Trip Service Worker v3 ===== */
const CACHE = 'malaysia-trip-v4';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './js/map.js',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/leaflet.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/favicon.svg'
];

const LOCAL_IMAGES = [
  './img/hero.webp', './img/hotel.webp',
  './img/d1-1.webp','./img/d1-2.webp','./img/d1-3.webp','./img/d1-4.webp','./img/d1-5.webp',
  './img/d2-1.webp','./img/d2-2.webp','./img/d2-3.webp','./img/d2-4.webp','./img/d2-5.webp','./img/d2-6.webp','./img/d2-7.webp',
  './img/d3-1.webp','./img/d3-2.webp','./img/d3-3.webp','./img/d3-4.webp','./img/d3-5.webp','./img/d3-6.webp','./img/d3-7.webp',
  './img/d4-1.webp','./img/d4-2.webp','./img/d4-3.webp','./img/d4-4.webp','./img/d4-5.webp',
  './img/d5-1.webp','./img/d5-2.webp','./img/d5-3.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(APP_SHELL.concat(LOCAL_IMAGES)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => {
        // 强制刷新所有已打开页面，确保用户立即看到新版本
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
      })
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // 地图瓦片：Network First（在线优先，失败回退缓存）
  if (url.hostname.includes('basemaps.cartocdn.com') ||
      url.hostname.includes('tile.openstreetmap.org') ||
      url.hostname.includes('arcgisonline.com')) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // 第三方 CDN 图片（Wikimedia/Unsplash）：Network First，失败回退本地 placeholder
  if (url.hostname.includes('upload.wikimedia.org') || url.hostname.includes('images.unsplash.com')) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => {
        // 回退到本地 placeholder（根据文件名推断）
        const name = url.pathname.split('/').pop().replace(/\.(jpg|jpeg|png|webp)$/, '');
        return caches.match('./img/' + name + '.webp').then((hit) => hit || caches.match('./img/hero.webp'));
      })
    );
    return;
  }

  // 同源资源：Cache First，网络回退并更新缓存
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => {
        if (hit) return hit;
        return fetch(req).then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        }).catch(() => {
          if (req.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        });
      })
    );
    return;
  }
});
