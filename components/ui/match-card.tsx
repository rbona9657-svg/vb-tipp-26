"use client";

import { useState } from "react";
import { MapPin, Clock, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEAMS } from "@/lib/data";
import { LiveDot } from "./live-dot";
import { OddsButton } from "./odds-button";
import { PredictionForm } from "./prediction-form";
import type { Match, Outcome } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

const ROUND_MULTIPLIER: Record<string, string> = {
  group: "×1.0",
  r32: "×1.2",
  r16: "×1.5",
  qf: "×2.0",
  sf: "×2.5",
  final: "×3.0",
};

/**
 * Match card — bet365-inspired odds-button layout.
 * The 1/X/2 selectors are always visible; clicking one selects it, clicking
 * "Részletek" expands a drawer with the full prediction form (score, corners,
 * yellows) that reuses the same outcome selection. Live matches show a pulsing
 * red LiveDot + current score in the center.
 */
export function MatchCard({ match }: MatchCardProps) {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [expanded, setExpanded] = useState(false);

  const home = TEAMS[match.home];
  const away = TEAMS[match.away];
  const multiplier = ROUND_MULTIPLIER[match.round] ?? "×1.0";

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-lg)] overflow-hidden",
        "bg-bg-secondary border border-border-default",
        "shadow-card transition-all duration-200 ease-out",
        "hover:border-border-strong hover:shadow-hover hover:-translate-y-[2px]",
        isLive && "border-live-red shadow-[0_0_0_1px_var(--live-red),_0_0_24px_var(--live-red-glow)]"
      )}
    >
      {/* ─── Meta row ─── */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2.5 text-[10px] font-bold uppercase tracking-[0.6px] whitespace-nowrap overflow-hidden">
        {isLive ? (
          <LiveDot variant="red" size="xs" label="LIVE" />
        ) : (
          <span className="inline-flex items-center gap-1 text-text-tertiary shrink-0">
            <Clock className="w-3 h-3" />
            {match.date} · {match.time}
          </span>
        )}
        <span className="text-text-tertiary">·</span>
        <span className="text-text-secondary shrink-0">{match.group} csoport</span>
        <span className="text-text-tertiary shrink-0 hidden lg:inline">·</span>
        <span className="hidden lg:inline-flex items-center gap-1 text-text-tertiary truncate min-w-0">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{match.venue}</span>
        </span>
      </div>

      {/* ─── Teams row ─── */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-4 border-y border-border-subtle">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0">{home.flag}</span>
          <div className="min-w-0">
            <p className="font-display font-bold text-[15px] text-text-primary leading-tight">
              {home.name}
            </p>
            <p className="font-mono text-[10px] text-text-tertiary font-bold tracking-wider">
              {match.home}
            </p>
          </div>
        </div>

        {hasScore ? (
          <div className="font-mono font-black text-[28px] text-yellow-400 tabular-nums leading-none px-2 [text-shadow:0_0_16px_var(--yellow-glow)]">
            {match.homeScore}
            <span className="text-text-tertiary mx-1">·</span>
            {match.awayScore}
          </div>
        ) : (
          <div className="font-mono font-bold text-[13px] text-text-tertiary px-3">VS</div>
        )}

        <div className="flex items-center gap-3 justify-end min-w-0">
          <div className="min-w-0 text-right">
            <p className="font-display font-bold text-[15px] text-text-primary leading-tight">
              {away.name}
            </p>
            <p className="font-mono text-[10px] text-text-tertiary font-bold tracking-wider">
              {match.away}
            </p>
          </div>
          <span className="text-2xl shrink-0">{away.flag}</span>
        </div>
      </div>

      {/* ─── Odds row ─── */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.8px] text-text-tertiary">
          <span>Kimenetel</span>
          <span className="inline-flex items-center gap-1 text-yellow-400">
            <Sparkles className="w-3 h-3" />
            szorzó {multiplier}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <OddsButton
            label={<>1 <span className="ml-0.5">{home.flag}</span></>}
            oddsValue={multiplier}
            selected={outcome === "1"}
            onClick={() => setOutcome("1")}
            disabled={isFinished}
          />
          <OddsButton
            label="X"
            oddsValue={multiplier}
            selected={outcome === "X"}
            onClick={() => setOutcome("X")}
            disabled={isFinished}
          />
          <OddsButton
            label={<><span className="mr-0.5">{away.flag}</span> 2</>}
            oddsValue={multiplier}
            selected={outcome === "2"}
            onClick={() => setOutcome("2")}
            disabled={isFinished}
          />
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "mt-1 w-full flex items-center justify-center gap-1.5 py-2.5",
            "rounded-[var(--radius-sm)] border border-border-default",
            "bg-surface-2/60 text-text-secondary text-[11px] font-bold uppercase tracking-[0.6px]",
            "hover:bg-surface-2 hover:text-text-primary hover:border-border-strong",
            "transition-all cursor-pointer"
          )}
          aria-expanded={expanded}
        >
          {expanded ? "Bezárás" : "Részletes tipp"}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* ─── Drawer: detailed prediction form ─── */}
      {expanded && (
        <div className="border-t border-border-default bg-surface-0/40">
          <PredictionForm matchId={match.id} outcome={outcome} onOutcomeChange={setOutcome} />
        </div>
      )}
    </div>
  );
}
