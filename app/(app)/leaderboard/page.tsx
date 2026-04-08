"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryPills } from "@/components/ui/category-pills";
import { LeaderboardRow } from "@/components/ui/leaderboard-row";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SQUAD_MEMBERS, RIVAL_SQUADS } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = ["Játékosok", "Csapatok"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Játékosok");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-[22px] font-bold text-text-primary">Ranglista</h1>

      <CategoryPills categories={TABS} active={activeTab} onSelect={setActiveTab} />

      {activeTab === "Játékosok" ? (
        <Card>
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center px-4 py-2.5 border-b border-border-subtle text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
              <span className="w-7 text-center">#</span>
              <span className="ml-11 flex-1">Játékos</span>
              <span>Pont</span>
            </div>
            {/* Rows */}
            {SQUAD_MEMBERS.map((player, i) => (
              <LeaderboardRow key={player.id} player={player} rank={i + 1} />
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {RIVAL_SQUADS.map((squad) => (
            <Card key={squad.name} hoverable>
              <CardContent className="flex items-center gap-4 py-4">
                {/* Rank */}
                <span
                  className={cn(
                    "w-7 text-center font-mono font-bold text-[16px]",
                    squad.rank === 1 && "text-medal-gold",
                    squad.rank === 2 && "text-medal-silver",
                    squad.rank === 3 && "text-medal-bronze",
                    squad.rank > 3 && "text-text-tertiary"
                  )}
                >
                  {squad.rank}
                </span>

                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-[18px] shrink-0">
                  {squad.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-text-primary truncate">
                    {squad.name}
                  </p>
                  <p className="text-[11px] text-text-tertiary">
                    {squad.members} tag
                  </p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <span className="font-mono font-bold text-[15px] text-text-primary">
                    {squad.pts.toLocaleString()}
                  </span>
                  <Badge variant="gold" className="ml-2">pts</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
