"use client";

import { useEffect } from "react";

/**
 * Detects iOS standalone PWA mode and sets CSS custom properties
 * for safe area insets, bypassing CSS env() which is unreliable.
 */
export function IOSSafeArea() {
  useEffect(() => {
    const isStandalone =
      ("standalone" in window.navigator &&
        (window.navigator as unknown as { standalone: boolean }).standalone ===
          true) ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (!isStandalone) return;

    const root = document.documentElement;

    // Try reading the real env() value via JS
    const probe = document.createElement("div");
    probe.style.position = "fixed";
    probe.style.top = "0";
    probe.style.left = "0";
    probe.style.width = "0";
    probe.style.height = "0";
    probe.style.paddingTop = "env(safe-area-inset-top, 0px)";
    probe.style.paddingBottom = "env(safe-area-inset-bottom, 0px)";
    probe.style.visibility = "hidden";
    document.body.appendChild(probe);

    const topInset = parseFloat(getComputedStyle(probe).paddingTop) || 0;
    const bottomInset = parseFloat(getComputedStyle(probe).paddingBottom) || 0;

    document.body.removeChild(probe);

    // Use measured values, or sensible iOS defaults
    root.style.setProperty("--sat", topInset > 0 ? `${topInset}px` : "47px");
    root.style.setProperty(
      "--sab",
      bottomInset > 0 ? `${bottomInset}px` : "34px"
    );
    root.classList.add("pwa-standalone");
  }, []);

  return null;
}
