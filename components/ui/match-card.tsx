"use client";

import { useState } from "react";
import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEAMS, VENUE_COLORS } from "@/lib/data";
import { Badge } from "./badge";
import { PredictionForm } from "./prediction-form";
import type { Match } from "@/lib/types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);
  const home = TEAMS[match.home];
  const away = TEAMS[match.away];
  const venueGradient = VENUE_COLORS[match.venue] || "from-gray-500 to-gray-700";

  return (
    <div className="rounded-[var(--radius-xl)] shadow-card overflow-hidden bg-bg-primary transition-shadow duration-200 hover:shadow-hover">
      {/* Venue hero – photography-forward (gradient placeholder) */}
      <div className={cn("relative h-28 bg-gradient-to-br", venueGradient)}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-white/80">
            <MapPin className="w-3 h-3" />
            <span className="text-[11px] font-medium">{match.venue}</span>
          </div>
          <Badge variant="gold">{match.group} csoport</Badge>
        </div>
      </div>

      {/* Match details */}
      <div className="px-5 py-4">
        {/* Date & time */}
        <div className="flex items-center gap-1.5 text-text-tertiary mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium">
            {match.date} &middot; {match.time}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">{home.flag}</span>
            <div>
              <p className="text-[15px] font-semibold text-text-primary leading-tight">{home.name}</p>
              <p className="text-[11px] text-text-tertiary font-mono">{match.home}</p>
            </div>
          </div>

          <div className="px-4">
            <span className="text-[13px] font-bold text-text-tertiary">vs</span>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end text-right">
            <div>
              <p className="text-[15px] font-semibold text-text-primary leading-tight">{away.name}</p>
              <p className="text-[11px] text-text-tertiary font-mono">{match.away}</p>
            </div>
            <span className="text-2xl">{away.flag}</span>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-sm)] bg-brand-gold-bg hover:bg-brand-gold-bg text-brand-gold text-[13px] font-semibold transition-colors cursor-pointer"
        >
          {expanded ? "Bezárás" : "Tipp leadása"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Prediction form */}
      {expanded && (
        <div className="border-t border-border-subtle">
          <PredictionForm matchId={match.id} />
        </div>
      )}
    </div>
  );
}
