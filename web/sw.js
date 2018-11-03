importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

const staticAssets = [
  './',
  './fallback.json',
  './app.js',
  './js/vendor/es6-promise.min.js',
  './js/ie_polyfills.js',
  './js/components/modal.js',
  './js/vendor/lazy_loader.js',
  './js/rtcApp.js',
  './css/landing.opentok.css',
  './css/checkboxes.css',
  './css/buttons.css',
  './favicon.png',
  "./images/fetch-dog.jpg",
  "./images/icons/ctaarrow_white@2x.png",
  './images/background.jpg',
  './images/wechit_logo.jpeg',
  './images/wechit_logo_512.png'
];

// This will trigger the importScripts() for workbox.strategies and its dependencies:
workbox.loadModule('workbox-strategies');

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    // Referencing workbox.strategies will now work as expected.
    const staleWhileRevalidate = workbox.strategies.staleWhileRevalidate();
    event.respondWith(staleWhileRevalidate.makeRequest({ request: request }));
  }
});

// self.addEventListener('install', async () => {
//   const cache = await caches.open("WeChit-static");
//   cache.addAll(staticAssets);
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener('fetch', event => {
//   const request = event.request;
//   const url = new URL(request.url);
//   if (url.origin === location.origin) {
//     event.respondWith(cacheFirst(request));
//   } else {
//     event.respondWith(networkFirst(request));
//   }
// });

// async function cacheFirst(request) {
//   const cachedResponse = await caches.match(request);
//   return cachedResponse || fetch(request);
// };

// async function networkFirst(request) {
//   const dynamicCache = await caches.open('WeChit-dynamic');
//   try {
//     const networkResponse = await fetch(request);
//     dynamicCache.put(request, networkResponse.clone());
//     return networkResponse;
//   } catch (err) {
//     const cachedResponse = await dynamicCache.match(request);
//     return cachedResponse || await caches.match('./fallback.json');
//   }
// };