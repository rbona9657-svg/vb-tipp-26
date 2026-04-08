"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import type { Outcome } from "@/lib/types";

interface PredictionFormProps {
  matchId: number;
}

export function PredictionForm({ matchId }: PredictionFormProps) {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [corners, setCorners] = useState("");
  const [yellows, setYellows] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!outcome) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="px-5 py-4 space-y-4 animate-slide-up">
      {/* Outcome selector */}
      <div>
        <p className="text-[12px] font-semibold text-text-secondary mb-2 uppercase tracking-wide">
          Kimenetel
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(["1", "X", "2"] as Outcome[]).map((o) => (
            <button
              key={o}
              onClick={() => setOutcome(o)}
              className={cn(
                "h-10 rounded-[var(--radius-sm)] font-mono font-bold text-[15px] transition-all duration-150 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                outcome === o
                  ? "bg-brand-gold text-white shadow-sm"
                  : "bg-bg-tertiary text-text-secondary hover:bg-surface-active"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Score inputs */}
      <div>
        <p className="text-[12px] font-semibold text-text-secondary mb-2 uppercase tracking-wide">
          Végeredmény
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={20}
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            placeholder="–"
            className="flex-1 h-10 rounded-[var(--radius-sm)] bg-bg-secondary border border-border-subtle text-center font-mono font-semibold text-[16px] text-text-primary outline-none focus:border-brand-gold transition-colors"
          />
          <span className="text-[13px] font-bold text-text-tertiary">:</span>
          <input
            type="number"
            min={0}
            max={20}
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            placeholder="–"
            className="flex-1 h-10 rounded-[var(--radius-sm)] bg-bg-secondary border border-border-subtle text-center font-mono font-semibold text-[16px] text-text-primary outline-none focus:border-brand-gold transition-colors"
          />
        </div>
      </div>

      {/* Corners & yellows */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[12px] font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            🚩 Szögletek
          </p>
          <input
            type="number"
            min={0}
            max={30}
            value={corners}
            onChange={(e) => setCorners(e.target.value)}
            placeholder="–"
            className="w-full h-10 rounded-[var(--radius-sm)] bg-bg-secondary border border-border-subtle text-center font-mono font-semibold text-[16px] text-text-primary outline-none focus:border-brand-gold transition-colors"
          />
        </div>
        <div>
          <p className="text-[12px] font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            🟨 Sárgalapok
          </p>
          <input
            type="number"
            min={0}
            max={20}
            value={yellows}
            onChange={(e) => setYellows(e.target.value)}
            placeholder="–"
            className="w-full h-10 rounded-[var(--radius-sm)] bg-bg-secondary border border-border-subtle text-center font-mono font-semibold text-[16px] text-text-primary outline-none focus:border-brand-gold transition-colors"
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!outcome}
        className="w-full"
        size="lg"
      >
        {submitted ? "✓ Elmentve!" : "Tipp mentése"}
      </Button>

      {submitted && (
        <p className="text-[12px] text-success text-center font-medium">
          Tipp sikeresen elmentve!
        </p>
      )}
    </div>
  );
}
