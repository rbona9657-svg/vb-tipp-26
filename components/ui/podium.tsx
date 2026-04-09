import { Crown, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Player } from "@/lib/types";

interface PodiumProps {
  players: [Player, Player, Player]; // [gold, silver, bronze]
  className?: string;
}

const RANK_CONFIG = {
  1: {
    icon: Crown,
    border: "border-yellow-500",
    shadow: "shadow-[0_0_0_1px_var(--yellow-500),_0_0_28px_var(--yellow-glow)]",
    rankBg: "bg-yellow-500",
    rankColor: "text-green-950",
    avatarBorder: "border-yellow-500",
    avatarShadow: "shadow-[0_0_20px_var(--yellow-glow)]",
    ptsColor: "text-yellow-400",
    label: "BAJNOK",
  },
  2: {
    icon: Medal,
    border: "border-[#C0C0C0]",
    shadow: "shadow-[0_0_0_1px_#C0C0C0,_0_0_20px_var(--medal-silver-glow)]",
    rankBg: "bg-[#C0C0C0]",
    rankColor: "text-green-950",
    avatarBorder: "border-[#C0C0C0]",
    avatarShadow: "shadow-[0_0_16px_var(--medal-silver-glow)]",
    ptsColor: "text-[#E8E8E8]",
    label: "EZÜST",
  },
  3: {
    icon: Trophy,
    border: "border-[#CD7F32]",
    shadow: "shadow-[0_0_0_1px_#CD7F32,_0_0_20px_var(--medal-bronze-glow)]",
    rankBg: "bg-[#CD7F32]",
    rankColor: "text-green-950",
    avatarBorder: "border-[#CD7F32]",
    avatarShadow: "shadow-[0_0_16px_var(--medal-bronze-glow)]",
    ptsColor: "text-[#E8B07C]",
    label: "BRONZ",
  },
} as const;

interface PodiumCardProps {
  player: Player;
  rank: 1 | 2 | 3;
  tall?: boolean;
}

function PodiumCard({ player, rank, tall = false }: PodiumCardProps) {
  const cfg = RANK_CONFIG[rank];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-lg)] bg-bg-secondary border overflow-hidden",
        "transition-transform duration-200 hover:-translate-y-1",
        cfg.border,
        cfg.shadow,
        tall ? "pt-8 pb-5 px-4" : "pt-7 pb-4 px-3"
      )}
    >
      {/* Rank badge (top center) */}
      <div
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2",
          "w-7 h-7 rounded-full flex items-center justify-center",
          "font-mono font-black text-[13px]",
          cfg.rankBg,
          cfg.rankColor
        )}
      >
        {rank}
      </div>

      <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "rounded-full flex items-center justify-center shrink-0",
            "bg-bg-tertiary border-2",
            "font-display font-black text-text-primary",
            cfg.avatarBorder,
            cfg.avatarShadow,
            tall ? "w-16 h-16 text-[22px]" : "w-14 h-14 text-[18px]"
          )}
        >
          {player.avatar}
        </div>

        {/* Name */}
        <p
          className={cn(
            "font-display font-bold text-text-primary text-center truncate max-w-full",
            tall ? "text-[15px]" : "text-[13px]"
          )}
        >
          {player.name}
        </p>

        {/* Points */}
        <div className="flex flex-col items-center gap-0.5">
          <p
            className={cn(
              "font-mono font-black tabular-nums leading-none",
              cfg.ptsColor,
              tall ? "text-[28px]" : "text-[22px]"
            )}
          >
            {player.pts.toLocaleString()}
          </p>
          <p className="text-[9px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
            pont
          </p>
        </div>

        {/* Bottom label with icon */}
        <div
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-xs)]",
            "font-display font-extrabold text-[9px] uppercase tracking-[0.8px]",
            rank === 1 && "bg-yellow-bg text-yellow-400",
            rank === 2 && "bg-white/5 text-[#E8E8E8]",
            rank === 3 && "bg-white/5 text-[#E8B07C]"
          )}
        >
          <Icon className="w-2.5 h-2.5" />
          {cfg.label}
        </div>
      </div>
    </div>
  );
}

/**
 * Hero podium for the top 3 leaderboard entries.
 * Bet365-style: gold/silver/bronze glow borders with the gold (1st) card
 * slightly taller and in the center.
 */
export function Podium({ players, className }: PodiumProps) {
  const [first, second, third] = players;
  return (
    <div className={cn("grid grid-cols-3 gap-3 items-end", className)}>
      <PodiumCard player={second} rank={2} />
      <PodiumCard player={first} rank={1} tall />
      <PodiumCard player={third} rank={3} />
    </div>
  );
}
