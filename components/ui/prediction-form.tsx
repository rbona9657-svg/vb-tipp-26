"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import type { Outcome } from "@/lib/types";

interface PredictionFormProps {
  matchId: number;
  /**
   * Controlled outcome state. When passed in, the form uses the parent's
   * state so the inline OddsButtons on the card stay in sync with the drawer.
   */
  outcome?: Outcome | null;
  onOutcomeChange?: (outcome: Outcome | null) => void;
}

export function PredictionForm({
  outcome: controlledOutcome,
  onOutcomeChange,
}: PredictionFormProps) {
  const [internalOutcome, setInternalOutcome] = useState<Outcome | null>(null);
  const outcome = controlledOutcome ?? internalOutcome;
  const setOutcome = (o: Outcome | null) => {
    if (onOutcomeChange) onOutcomeChange(o);
    else setInternalOutcome(o);
  };

  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [corners, setCorners] = useState("");
  const [yellows, setYellows] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-infer outcome from score
  const syncOutcomeFromScore = (h: string, a: string) => {
    const hn = parseInt(h, 10);
    const an = parseInt(a, 10);
    if (Number.isNaN(hn) || Number.isNaN(an)) return;
    if (hn > an) setOutcome("1");
    else if (hn < an) setOutcome("2");
    else setOutcome("X");
  };

  const handleSubmit = () => {
    if (!outcome) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="px-5 py-5 space-y-5 animate-slide-up">
      {/* ─── Score inputs ─── */}
      <div>
        <p className="text-[10px] font-bold text-text-tertiary mb-2 uppercase tracking-[0.8px]">
          Pontos végeredmény
        </p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={20}
            value={homeScore}
            onChange={(e) => {
              setHomeScore(e.target.value);
              syncOutcomeFromScore(e.target.value, awayScore);
            }}
            placeholder="–"
            className={cn(
              "flex-1 h-14 rounded-[var(--radius-sm)]",
              "bg-surface-0 border border-border-default",
              "text-center font-mono font-black text-[32px] tabular-nums",
              "text-yellow-400 placeholder:text-text-tertiary",
              "outline-none focus:border-yellow-500 focus:shadow-[0_0_0_2px_var(--yellow-glow)]",
              "transition-all [text-shadow:0_0_12px_var(--yellow-glow)]"
            )}
          />
          <span className="font-mono font-bold text-[18px] text-text-tertiary">:</span>
          <input
            type="number"
            min={0}
            max={20}
            value={awayScore}
            onChange={(e) => {
              setAwayScore(e.target.value);
              syncOutcomeFromScore(homeScore, e.target.value);
            }}
            placeholder="–"
            className={cn(
              "flex-1 h-14 rounded-[var(--radius-sm)]",
              "bg-surface-0 border border-border-default",
              "text-center font-mono font-black text-[32px] tabular-nums",
              "text-yellow-400 placeholder:text-text-tertiary",
              "outline-none focus:border-yellow-500 focus:shadow-[0_0_0_2px_var(--yellow-glow)]",
              "transition-all [text-shadow:0_0_12px_var(--yellow-glow)]"
            )}
          />
        </div>
      </div>

      {/* ─── Corners & yellows ─── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-bold text-text-tertiary mb-2 uppercase tracking-[0.8px]">
            🚩 Szögletek
          </p>
          <input
            type="number"
            min={0}
            max={30}
            value={corners}
            onChange={(e) => setCorners(e.target.value)}
            placeholder="–"
            className={cn(
              "w-full h-11 rounded-[var(--radius-sm)]",
              "bg-surface-0 border border-border-default",
              "text-center font-mono font-bold text-[16px] tabular-nums",
              "text-text-primary placeholder:text-text-tertiary",
              "outline-none focus:border-yellow-500 transition-all"
            )}
          />
        </div>
        <div>
          <p className="text-[10px] font-bold text-text-tertiary mb-2 uppercase tracking-[0.8px]">
            🟨 Sárgalapok
          </p>
          <input
            type="number"
            min={0}
            max={20}
            value={yellows}
            onChange={(e) => setYellows(e.target.value)}
            placeholder="–"
            className={cn(
              "w-full h-11 rounded-[var(--radius-sm)]",
              "bg-surface-0 border border-border-default",
              "text-center font-mono font-bold text-[16px] tabular-nums",
              "text-text-primary placeholder:text-text-tertiary",
              "outline-none focus:border-yellow-500 transition-all"
            )}
          />
        </div>
      </div>

      {/* ─── Submit ─── */}
      <Button
        onClick={handleSubmit}
        disabled={!outcome}
        className="w-full"
        size="lg"
        glow={!!outcome && !submitted}
      >
        {submitted ? "✓ Elmentve" : "Tipp mentése"}
      </Button>

      {submitted && (
        <p className="text-[12px] text-green-400 text-center font-semibold uppercase tracking-wide animate-fade-in">
          ✓ Tipp sikeresen elmentve
        </p>
      )}
    </div>
  );
}
