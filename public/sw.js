const CACHE_NAME = 'gloiremedia-cache-v10';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Exclusion des APIs dynamiques (Supabase, Cloudinary, etc.)
  if (event.request.url.includes('supabase.co') || event.request.url.includes('cloudinary.com')) {
    return;
  }

  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Stratégie "Stale-While-Revalidate"
      const networkFetch = fetch(event.request).then((networkResponse) => {
        // Si réponse valide, on met à jour le cache
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        // On retourne null si le réseau échoue pour laisser le cache prendre le relais
        return null; 
      });

      // On retourne le cache si disponible, sinon on attend le réseau
      return cachedResponse || networkFetch;
    })
  );
});
