self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('waku-ai-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',

        // 外部URLはそのまま書く（./ は絶対に付けない）
        'https://raw.githubusercontent.com/yagi0922/waku-tool/refs/heads/main/192.png',
        'https://raw.githubusercontent.com/yagi0922/waku-tool/refs/heads/main/512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});
