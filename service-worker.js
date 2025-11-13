// 即時更新（古いSWを残さない）
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  clients.claim();
});

// キャッシュ名
const CACHE_NAME = 'waku-ai-v3';

// キャッシュするファイル
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// インストール（キャッシュ登録）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// リソース取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
