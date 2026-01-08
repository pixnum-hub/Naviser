const CACHE_NAME = 'naviser-cache-v1';
const APP_SHELL = [
  '/',
  'index.html',
  'manifest.json',
  'sw.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://unpkg.com/leaflet-geometryutil',
  'https://cdn.jsdelivr.net/npm/idb@7/build/iife/index-min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => { if(key !== CACHE_NAME) return caches.delete(key); })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        if(event.request.url.startsWith('http')){
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, fetchRes.clone()));
        }
        return fetchRes;
      }).catch(()=>{});
    })
  );
});
