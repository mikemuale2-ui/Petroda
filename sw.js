// Petroda Service Worker — always fetch fresh, no caching
var CACHE = "petroda-v2";

self.addEventListener("install", function(e){
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  // Delete ALL old caches
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e){
  // Always go to network — never serve from cache
  e.respondWith(
    fetch(e.request).catch(function(){
      return new Response("Offline — please connect to internet", {status:503});
    })
  );
});
