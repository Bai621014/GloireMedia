const CACHE_NAME = 'gloiremedia-cache-v10';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// 1. Installation du Service Worker et mise en cache des fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Force le SW à s'activer sans attendre
  );
});

// 2. Nettoyage des anciens caches lors de la mise à jour
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Prend le contrôle immédiat des pages
  );
});

// 3. Stratégie de Cache Intelligente : Économie de 3G + Mises à jour garanties
self.addEventListener('fetch', (event) => {
  // Sécurité : Ne pas interférer avec les requêtes de base de données (Supabase) ou Cloudinary
  if (event.request.url.includes('supabase.co') || event.request.url.includes('cloudinary.com')) {
    return;
  }

  // Uniquement pour les requêtes de type GET (le cache ne supporte pas POST/PUT)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Stratégie Stale-While-Revalidate : Vitesse maximale + mise à jour en arrière-plan
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Si la réponse réseau est valide, on met à jour le cache
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      }).catch(() => {
        // Gestion silencieuse des pannes réseau
      });

      // Renvoie la version en cache immédiatement si elle existe, sinon attend le réseau
      return cachedResponse || fetchPromise;
    })
  );
});
