const CACHE="naviser-v5";
const ASSETS=[
 "./Naviser/",
 "./Naviser/index.html",
 "./Naviser/manifest.json",
 "./Naviser/icons/icon-192.png",
 "./Naviser/icons/icon-512.png",
 "./Naviser/icons/icon-maskable-192.png",
 "./Naviser/icons/icon-maskable-512.png"
];

self.addEventListener("install",e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
 self.skipWaiting();
});

self.addEventListener("activate",e=>{
 e.waitUntil(
   caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))
 );
 self.clients.claim();
});

self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET") return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("./Naviser/index.html"))));
});
