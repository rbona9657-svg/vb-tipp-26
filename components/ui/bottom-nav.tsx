"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  CalendarDays,
  Trophy as TrophyIcon,
  BarChart3,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Kezdő", icon: Home },
  { href: "/matches", label: "Meccsek", icon: CalendarDays },
  { href: "/tournament", label: "Torna", icon: TrophyIcon },
  { href: "/leaderboard", label: "Ranglista", icon: BarChart3 },
  { href: "/scoring", label: "Pontok", icon: HelpCircle },
];

/**
 * Bottom nav — bet365-style filled active tab with yellow glow.
 * 72px tall with safe-area padding. Active tab gets a yellow fill, dark text,
 * and a glow shadow; inactive tabs are muted and use a subtle hover.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-md border-t border-border-default"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-6xl mx-auto flex items-stretch justify-around px-2 pt-2 pb-2 gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex-1 flex flex-col items-center justify-center gap-1",
                "min-h-[56px] rounded-[var(--radius-md)] px-2 py-2",
                "transition-all duration-150 ease-out select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
                isActive
                  ? "bg-yellow-500 text-green-950 shadow-[0_0_0_1px_var(--yellow-500),_0_0_20px_var(--yellow-glow)]"
                  : "text-text-tertiary hover:text-text-primary hover:bg-surface-2 active:bg-surface-3"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2.6 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.4px]",
                  isActive ? "text-green-950" : "text-text-tertiary"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
