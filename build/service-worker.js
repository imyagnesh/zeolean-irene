importScripts("/precache-manifest.b8aabc3f97698d49a559f6b16c284598.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log('workbox is working');

//https://developers.google.com/web/tools/workbox/modules/workbox-strategies

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('https:.*min.(css|js)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cdn-cache',
  }),
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:3004/*'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
  }),
);

workbox.routing.registerRoute(
  new RegExp('http://localhost:5000/*'),
  new workbox.strategies.NetworkFirst(),
);

self.addEventListener('fetch', event => {
  if (
    event.request.method === 'POST' ||
    event.request.method === 'PUT' ||
    event.request.method === 'DELETE'
  ) {
    event.respondWith(
      fetch(event.request).catch(
        () =>
          new Response(
            JSON.stringify({
              error: 'This actions disabled while app is offline',
            }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ),
      ),
    );
  }
});

