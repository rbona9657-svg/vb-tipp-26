"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  CalendarDays,
  Trophy as TrophyIcon,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Kezdőlap", icon: Home },
  { href: "/matches", label: "Meccsek", icon: CalendarDays },
  { href: "/tournament", label: "Torna", icon: TrophyIcon },
  { href: "/leaderboard", label: "Ranglista", icon: BarChart3 },
  { href: "/scoring", label: "Pontok", icon: HelpCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary border-t border-border-subtle safe-bottom">
      <div className="max-w-5xl mx-auto flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative",
                isActive
                  ? "text-brand-gold"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {isActive && (
                <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-gold rounded-full" />
              )}
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
