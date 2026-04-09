import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Player, Trend } from "@/lib/types";

interface LeaderboardRowProps {
  player: Player;
  rank: number;
  highlighted?: boolean;
}

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up")
    return <TrendingUp className="w-3.5 h-3.5 text-up" strokeWidth={2.4} />;
  if (trend === "down")
    return <TrendingDown className="w-3.5 h-3.5 text-down" strokeWidth={2.4} />;
  return <Minus className="w-3.5 h-3.5 text-text-tertiary" strokeWidth={2.4} />;
}

function RankBadge({ rank }: { rank: number }) {
  const topThree = rank <= 3;
  const colors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-[#E8E8E8]",
    3: "text-[#E8B07C]",
  };
  return (
    <div
      className={cn(
        "w-8 text-center font-mono font-black tabular-nums",
        topThree ? "text-[16px]" : "text-[14px] text-text-tertiary",
        topThree && colors[rank]
      )}
    >
      {rank}
    </div>
  );
}

/**
 * Dense leaderboard row — bet365 list style.
 * Self-rows get a subtle yellow border + bg, top 3 get colored rank.
 * Trend arrow on the right shows rank movement.
 */
export function LeaderboardRow({
  player,
  rank,
  highlighted = false,
}: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "border-b border-border-subtle last:border-b-0",
        "transition-colors hover:bg-surface-hover",
        highlighted && "bg-yellow-bg border-l-2 border-l-yellow-500"
      )}
    >
      <RankBadge rank={rank} />

      <div
        className={cn(
          "w-9 h-9 rounded-full shrink-0",
          "flex items-center justify-center",
          "font-display font-bold text-[13px]",
          "bg-bg-tertiary border border-border-default",
          rank === 1 && "border-yellow-500 text-yellow-400",
          rank === 2 && "border-[#C0C0C0] text-[#E8E8E8]",
          rank === 3 && "border-[#CD7F32] text-[#E8B07C]",
          rank > 3 && "text-text-primary"
        )}
      >
        {player.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-[14px] text-text-primary truncate leading-tight">
          {player.name}
        </p>
        <p className="text-[10px] text-text-tertiary font-medium mt-0.5">
          <span className="font-mono font-bold text-green-400">{player.exact}</span> pontos
          &middot; <span className="font-mono font-bold text-text-secondary">{player.correct}</span>{" "}
          helyes
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono font-black text-[15px] tabular-nums text-text-primary">
          {player.pts.toLocaleString()}
        </span>
        <TrendIcon trend={player.trend} />
      </div>
    </div>
  );
}
