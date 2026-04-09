// Self-destructing service worker.
// Previous versions cached aggressively and trapped PWAs on stale content.
// This version unregisters itself and clears all caches on activation.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete every cache
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));

      // Unregister this service worker entirely
      await self.registration.unregister();

      // Force all open clients to reload so they pick up fresh content
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        if ("navigate" in client) {
          client.navigate(client.url);
        }
      }
    })()
  );
});

// No fetch handler — all requests go straight to the network.
