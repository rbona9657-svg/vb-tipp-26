"use client";

import { useState } from "react";
import { Users, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LeaderboardRow } from "@/components/ui/leaderboard-row";
import { Podium } from "@/components/ui/podium";
import { SQUAD_MEMBERS, RIVAL_SQUADS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Player } from "@/lib/types";

type Tab = "players" | "squads";

const TABS: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "players", label: "Játékosok", icon: Users },
  { id: "squads", label: "Csapatok", icon: Shield },
];

// Richard is the current user (rank 1 in this demo)
const CURRENT_USER_ID = 1;

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("players");

  const top3 = SQUAD_MEMBERS.slice(0, 3) as [Player, Player, Player];
  const rest = SQUAD_MEMBERS.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-[28px] tracking-tight text-text-primary">
            Ranglista
          </h1>
          <p className="text-[12px] text-text-tertiary font-medium mt-0.5">
            Valós idejű állás &middot; frissül minden meccs után
          </p>
        </div>
      </div>

      {/* Tabs (segmented control) */}
      <div className="inline-flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-surface-1 border border-border-default">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)]",
                "font-display font-bold text-[12px] uppercase tracking-[0.5px]",
                "transition-all cursor-pointer",
                active
                  ? "bg-yellow-500 text-green-950 shadow-[0_0_0_1px_var(--yellow-500),_0_0_16px_var(--yellow-glow)]"
                  : "text-text-tertiary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={active ? 2.6 : 2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "players" ? (
        <>
          {/* Podium hero (top 3) */}
          <div className="pt-3 pb-1">
            <Podium players={top3} />
          </div>

          {/* Rest of the list */}
          <Card variant="default" padding="none">
            <div className="flex items-center px-4 py-3 border-b border-border-default">
              <span className="w-8 text-center text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                #
              </span>
              <span className="ml-12 flex-1 text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                Játékos
              </span>
              <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                Pont
              </span>
            </div>
            <div className="stagger-children">
              {rest.map((player, i) => (
                <LeaderboardRow
                  key={player.id}
                  player={player}
                  rank={i + 4}
                  highlighted={player.id === CURRENT_USER_ID}
                />
              ))}
            </div>
          </Card>
        </>
      ) : (
        <div className="space-y-3 stagger-children">
          {RIVAL_SQUADS.map((squad) => {
            const isTop = squad.rank <= 3;
            const rankColors: Record<number, string> = {
              1: "text-yellow-400",
              2: "text-[#E8E8E8]",
              3: "text-[#E8B07C]",
            };
            return (
              <Card
                key={squad.name}
                variant={
                  squad.rank === 1
                    ? "glow-yellow"
                    : "default"
                }
                hoverable={squad.rank !== 1}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <span
                    className={cn(
                      "w-9 text-center font-mono font-black text-[20px] tabular-nums shrink-0",
                      isTop ? rankColors[squad.rank] : "text-text-tertiary"
                    )}
                  >
                    {squad.rank}
                  </span>

                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-[22px] shrink-0",
                      "bg-bg-tertiary border",
                      squad.rank === 1 && "border-yellow-500 shadow-[0_0_16px_var(--yellow-glow)]",
                      squad.rank === 2 && "border-[#C0C0C0]",
                      squad.rank === 3 && "border-[#CD7F32]",
                      squad.rank > 3 && "border-border-default"
                    )}
                  >
                    {squad.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[16px] text-text-primary truncate">
                      {squad.name}
                    </p>
                    <p className="text-[11px] text-text-tertiary font-medium mt-0.5">
                      {squad.members} tag &middot; top 3 átlag
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-[20px] text-yellow-400 tabular-nums leading-none">
                      {squad.pts.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-bold text-text-tertiary uppercase tracking-[0.8px] mt-1">
                      pont
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
