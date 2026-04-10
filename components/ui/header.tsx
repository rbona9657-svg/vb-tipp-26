"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { LiveDot } from "./live-dot";
import { MATCHES, TEAMS } from "@/lib/data";

/**
 * Sticky app header — bet365-inspired.
 * Layout:
 *   - top row: brand logo + name + squad pill + theme toggle + avatar
 *   - bottom row: live ticker (horizontal marquee of upcoming / live matches)
 */

interface TickerItem {
  id: number | string;
  home: { code: string; flag: string };
  away: { code: string; flag: string };
  status: "live" | "upcoming" | "final";
  score?: string;
  info?: string;
}

/** Build ticker from real match data — first 15 matches chronologically. */
function buildTickerItems(): TickerItem[] {
  return MATCHES
    .slice()
    .sort((a, b) => {
      const dayA = parseInt(a.date.split(" ")[1]);
      const dayB = parseInt(b.date.split(" ")[1]);
      if (dayA !== dayB) return dayA - dayB;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 15)
    .map((match) => ({
      id: match.id,
      home: { code: match.home, flag: TEAMS[match.home]?.flag ?? "" },
      away: { code: match.away, flag: TEAMS[match.away]?.flag ?? "" },
      status:
        match.status === "live"
          ? ("live" as const)
          : match.status === "finished"
            ? ("final" as const)
            : ("upcoming" as const),
      score:
        match.homeScore != null && match.awayScore != null
          ? `${match.homeScore}–${match.awayScore}`
          : undefined,
      info: `${match.date} · ${match.time}`,
    }));
}

const TICKER_ITEMS = buildTickerItems();

function TickerItemView({ item }: { item: TickerItem }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-medium text-text-secondary whitespace-nowrap shrink-0">
      <span className="text-[14px]">{item.home.flag}</span>
      <span className="font-mono font-bold text-text-primary">{item.home.code}</span>
      {item.score ? (
        <span className="font-mono font-extrabold text-yellow-400 tabular-nums mx-1">{item.score}</span>
      ) : (
        <span className="mx-1 text-text-tertiary">vs</span>
      )}
      <span className="font-mono font-bold text-text-primary">{item.away.code}</span>
      <span className="text-[14px]">{item.away.flag}</span>
      {item.info && (
        <>
          <span className="text-text-tertiary mx-1">·</span>
          <span className="text-[11px] text-text-tertiary font-mono">{item.info}</span>
        </>
      )}
    </div>
  );
}

export function Header() {
  const { theme, setTheme } = useTheme();
  // Duplicate once for seamless marquee loop
  const tickerLoop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <header
      className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* ─── Top row ─── */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/icon-192x192.png?v=ziccer3"
            alt="Ziccer Tipper"
            width={32}
            height={32}
            className="rounded-[6px]"
            unoptimized
          />
          <span className="font-display font-extrabold text-[15px] text-text-primary tracking-tight hidden xs:inline sm:inline">
            ZICCER <span className="text-yellow-400">TIPPER</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-surface-2 border border-border-default rounded-full px-3 py-1.5">
            <span className="text-[11px]">⚡</span>
            <span className="text-[12px] font-semibold text-text-primary">powered by AI Hungary</span>
            <LiveDot variant="green" size="xs" />
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
              "bg-surface-2 border border-border-default text-text-secondary",
              "hover:bg-surface-3 hover:text-text-primary hover:border-border-strong",
              "transition-all cursor-pointer"
            )}
            aria-label="Téma váltás"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Avatar initials="R" size="sm" rank={1} />
        </div>
      </div>

      {/* ─── Ticker row (only on app pages, scroll loop) ─── */}
      <div className="border-t border-border-subtle bg-surface-1/60 overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center gap-4 h-9 px-4">
          <div className="flex items-center gap-1.5 shrink-0">
            <LiveDot variant="red" size="xs" />
            <span className="font-display font-extrabold text-[10px] uppercase tracking-[0.8px] text-live-red">
              Ticker
            </span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center gap-8 animate-marquee will-change-transform">
              {tickerLoop.map((item, i) => (
                <TickerItemView key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
