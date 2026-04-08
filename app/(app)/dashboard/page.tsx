"use client";

import { Trophy, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Countdown } from "@/components/ui/countdown";
import { MatchCard } from "@/components/ui/match-card";
import { MATCHES, SQUAD_MEMBERS } from "@/lib/data";

export default function DashboardPage() {
  const nextMatches = MATCHES.slice(0, 3);
  const topPlayers = SQUAD_MEMBERS.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Hero countdown */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0b0d17] to-[#1c2038] px-6 py-8 text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,168,67,0.3),_transparent_70%)]" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-brand-gold-light" />
              <span className="text-[11px] font-bold tracking-[3px] text-white/50 uppercase">
                FIFA World Cup
              </span>
            </div>
            <h1 className="text-[28px] font-bold text-white mb-1">2026</h1>
            <p className="text-[13px] text-white/60 mb-5">
              USA &middot; Mexikó &middot; Kanada
            </p>
            <Countdown />
            <p className="text-[11px] text-white/40 mt-4">a nyitómeccsig</p>
          </div>
        </div>
      </Card>

      {/* Section: Next matches */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold text-text-primary">Következő meccsek</h2>
          <Link
            href="/matches"
            className="flex items-center gap-1 text-[13px] font-semibold text-brand-gold hover:text-brand-gold-hover transition-colors"
          >
            Összes
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {nextMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Section: Mini leaderboard */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold text-text-primary">Ranglista</h2>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1 text-[13px] font-semibold text-brand-gold hover:text-brand-gold-hover transition-colors"
          >
            Teljes lista
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            {topPlayers.map((player, i) => (
              <div
                key={player.id}
                className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle last:border-b-0"
              >
                <span className="w-6 text-center font-mono font-bold text-[14px] text-medal-gold">
                  {i + 1}
                </span>
                <Avatar initials={player.avatar} size="sm" rank={i + 1} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-text-primary truncate">
                    {player.name}
                  </p>
                </div>
                <span className="font-mono font-bold text-[15px] text-text-primary">
                  {player.pts}
                </span>
                <Badge variant="gold">pts</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Meccsek", value: "48+", icon: <Calendar className="w-4 h-4" /> },
          { label: "Csapatok", value: "24", icon: <span className="text-[14px]">🏴</span> },
          { label: "Helyszínek", value: "16", icon: <span className="text-[14px]">🏟️</span> },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center py-4 text-center">
              <span className="mb-1">{stat.icon}</span>
              <span className="font-mono font-bold text-[20px] text-text-primary">
                {stat.value}
              </span>
              <span className="text-[11px] text-text-tertiary font-medium">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
