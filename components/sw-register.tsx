"use client";

import { useEffect } from "react";

/**
 * Previously this registered a service worker.
 * The SW was caching too aggressively and trapping PWAs on stale content,
 * so we now unregister any existing SW and clear all caches.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        })
        .catch(() => {});
    }

    if ("caches" in window) {
      caches
        .keys()
        .then((names) => Promise.all(names.map((name) => caches.delete(name))))
        .catch(() => {});
    }
  }, []);

  return null;
}
