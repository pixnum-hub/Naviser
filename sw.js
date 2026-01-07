const CACHE_NAME='naviser-final-v2';
const OFFLINE_URLS=[
  './','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js'
];
const TILE_SERVERS=[
 'https://a.tile.openstreetmap.org/','https://b.tile.openstreetmap.org/','https://c.tile.openstreetmap.org/',
 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/',
 'https://a.tile.opentopomap.org/','https://b.tile.opentopomap.org/','https://c.tile.opentopomap.org/',
 'https://a.basemaps.cartocdn.com/dark_all/','https://a.basemaps.cartocdn.com/light_all/'
];

self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(OFFLINE_URLS)));
 self.skipWaiting();
});

self.addEventListener('fetch',e=>{
 const url=e.request.url;
 if(TILE_SERVERS.some(t=>url.startsWith(t))){
  e.respondWith(
   caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{ caches.open(CACHE_NAME).then(c=>c.put(e.request,resp.clone())); return resp; }).catch(()=>caches.match('./')))
  );
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
