// UFT Syntropic Module - Service Worker for PWA
// Caches app shell + enables offline functionality

const CACHE_NAME = 'uft-syntropic-v1';
const ASSETS_TO_CACHE = [
  './',
  './syntropic-uft-master-module.html',
  './manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip requests to GitHub/external resources
  if (request.url.includes('github') || request.url.includes('htmlpreview')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          console.log('[ServiceWorker] Serving from cache:', request.url);
          return response;
        }

        console.log('[ServiceWorker] Fetching from network:', request.url);
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone response for caching
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('[ServiceWorker] Fetch failed, serving offline page:', error);
            // Return a simple offline response
            return new Response(
              '<html><body style="font-family: sans-serif; padding: 20px; background: #1a3a3a; color: #e0e0e0;">' +
              '<h1 style="color: #4affb1;">🌿 UFT Syntropic Module</h1>' +
              '<p>You are offline. The app is cached and ready to use!</p>' +
              '<p>Open <strong>syntropic-uft-master-module.html</strong> to continue.</p>' +
              '</body></html>',
              {
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
                status: 200
              }
            );
          });
      })
  );
});

// Background sync (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-designs') {
    console.log('[ServiceWorker] Background sync triggered');
  }
});
