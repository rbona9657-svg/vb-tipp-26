"use client";

/**
 * Template wraps every page in the (app) group and re-mounts on route change,
 * triggering a fresh fade-in animation for a premium navigation feel.
 */
export default function AppTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
