const CACHE_NAME = "naviser-cache-v1";
const urlsToCache = [
  "/index.html","/manifest.json","/sw.js",
  "https://unpkg.com/leaflet/dist/leaflet.css",
  "https://unpkg.com/leaflet/dist/leaflet.js",
  "https://unpkg.com/leaflet-geometryutil",
  "/icons/icon-192.png","/icons/icon-512.png"
];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
