"use client";

import { Trophy, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FlipCountdown } from "@/components/ui/flip-countdown";
import { LiveDot } from "@/components/ui/live-dot";
import { MatchCard } from "@/components/ui/match-card";
import { Podium } from "@/components/ui/podium";
import { MATCHES, SQUAD_MEMBERS } from "@/lib/data";
import type { Player } from "@/lib/types";
import { cn } from "@/lib/utils";

const KICKOFF = new Date("2026-06-11T19:00:00Z");

export default function DashboardPage() {
  const nextMatches = MATCHES.slice(0, 3);
  const topPlayers = SQUAD_MEMBERS.slice(0, 3) as [Player, Player, Player];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Hero countdown */}
      <Card variant="elevated" className="overflow-hidden animate-fade-in">
        <div
          className="relative px-6 py-10 text-center"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,204,0,0.08), transparent 65%), radial-gradient(circle at 50% 100%, rgba(16,184,110,0.10), transparent 60%), linear-gradient(180deg, #032B1E 0%, #021912 100%)",
          }}
        >
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-display font-extrabold text-[11px] tracking-[3px] text-text-tertiary uppercase">
                FIFA World Cup
              </span>
              <LiveDot variant="yellow" size="xs" />
            </div>
            <h1 className="font-display font-black text-[44px] sm:text-[52px] leading-none tracking-tight text-text-primary mb-2">
              2026
            </h1>
            <p className="text-[13px] text-text-tertiary mb-8 font-medium">
              USA &middot; Mexikó &middot; Kanada
            </p>
            <FlipCountdown target={KICKOFF} showSeconds />
            <p className="text-[11px] text-text-tertiary mt-5 font-medium uppercase tracking-[1px]">
              a nyitómeccsig
            </p>
          </div>
        </div>
      </Card>

      {/* Section: Next matches */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-black text-[20px] tracking-tight text-text-primary">
              Következő meccsek
            </h2>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5 uppercase tracking-[0.6px]">
              Tippeld meg és gyűjtsd a pontokat
            </p>
          </div>
          <Link
            href="/matches"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)]",
              "font-display font-bold text-[11px] uppercase tracking-[0.6px]",
              "text-yellow-400 hover:text-yellow-500 hover:bg-yellow-bg",
              "transition-colors"
            )}
          >
            Összes
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {nextMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Section: Top 3 podium */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-black text-[20px] tracking-tight text-text-primary">
              Csapat ranglista
            </h2>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5 uppercase tracking-[0.6px]">
              Dobogó &middot; élő
            </p>
          </div>
          <Link
            href="/leaderboard"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)]",
              "font-display font-bold text-[11px] uppercase tracking-[0.6px]",
              "text-yellow-400 hover:text-yellow-500 hover:bg-yellow-bg",
              "transition-colors"
            )}
          >
            Teljes lista
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <Podium players={topPlayers} />
      </section>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Meccs", value: "104", icon: <Calendar className="w-4 h-4 text-yellow-400" /> },
          { label: "Csapat", value: "48", icon: <span className="text-[14px]">🏴</span> },
          { label: "Helyszín", value: "16", icon: <span className="text-[14px]">🏟️</span> },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <div className="flex flex-col items-center text-center gap-1">
              <span>{stat.icon}</span>
              <span className="font-mono font-black text-[24px] text-yellow-400 tabular-nums [text-shadow:0_0_12px_var(--yellow-glow)] leading-none">
                {stat.value}
              </span>
              <span className="text-[9px] text-text-tertiary font-bold uppercase tracking-[0.8px]">
                {stat.label}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
