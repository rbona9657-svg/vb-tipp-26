import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import type { Player, Trend } from "@/lib/types";

interface LeaderboardRowProps {
  player: Player;
  rank: number;
}

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-success" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-error" />;
  return <Minus className="w-3.5 h-3.5 text-text-tertiary" />;
}

export function LeaderboardRow({ player, rank }: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors",
        "hover:bg-surface-hover",
        rank <= 3 && "bg-brand-gold-bg"
      )}
    >
      {/* Rank */}
      <span
        className={cn(
          "w-7 text-center font-mono font-bold text-[14px]",
          rank === 1 && "text-medal-gold",
          rank === 2 && "text-medal-silver",
          rank === 3 && "text-medal-bronze",
          rank > 3 && "text-text-tertiary"
        )}
      >
        {rank}
      </span>

      {/* Avatar */}
      <Avatar initials={player.avatar} size="sm" rank={rank} />

      {/* Name & stats */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-text-primary truncate">{player.name}</p>
        <p className="text-[11px] text-text-tertiary">
          {player.exact} pontos &middot; {player.correct} helyes
        </p>
      </div>

      {/* Points & trend */}
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold text-[15px] text-text-primary">{player.pts}</span>
        <TrendIcon trend={player.trend} />
      </div>
    </div>
  );
}
