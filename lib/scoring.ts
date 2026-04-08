import type { MatchRound } from "./types";

// ─── Round multipliers ───────────────────────────────────────────

const MULTIPLIERS: Record<MatchRound, number> = {
  group: 1,
  r32: 1.2,
  r16: 1.5,
  qf: 2,
  sf: 2.5,
  final: 3,
};

// ─── Match point calculation ─────────────────────────────────────

interface MatchResult {
  homeScore: number;
  awayScore: number;
  totalCorners: number;
  totalYellows: number;
}

interface MatchPrediction {
  outcome: "1" | "X" | "2";
  homeScore: number;
  awayScore: number;
  totalCorners: number;
  totalYellows: number;
  isEarlyBird: boolean;
}

function getOutcome(home: number, away: number): "1" | "X" | "2" {
  if (home > away) return "1";
  if (home < away) return "2";
  return "X";
}

export function calculateMatchPoints(
  prediction: MatchPrediction,
  result: MatchResult,
  round: MatchRound
): number {
  let pts = 0;
  const actualOutcome = getOutcome(result.homeScore, result.awayScore);

  // Correct outcome: 3 pts
  if (prediction.outcome === actualOutcome) {
    pts += 3;
  }

  // Exact score: +5 (replaces goal difference bonus)
  if (
    prediction.homeScore === result.homeScore &&
    prediction.awayScore === result.awayScore
  ) {
    pts += 5;
  } else {
    // Goal difference bonus: +2
    const predDiff = prediction.homeScore - prediction.awayScore;
    const resDiff = result.homeScore - result.awayScore;
    if (predDiff === resDiff) {
      pts += 2;
    }
  }

  // Exact total goals: 3 pts
  const predTotal = prediction.homeScore + prediction.awayScore;
  const resTotal = result.homeScore + result.awayScore;
  if (predTotal === resTotal) {
    pts += 3;
  }

  // Corners: exact = 3, ±2 = 1
  const cornerDiff = Math.abs(prediction.totalCorners - result.totalCorners);
  if (cornerDiff === 0) pts += 3;
  else if (cornerDiff <= 2) pts += 1;

  // Yellow cards: exact = 3, ±1 = 1
  const yellowDiff = Math.abs(prediction.totalYellows - result.totalYellows);
  if (yellowDiff === 0) pts += 3;
  else if (yellowDiff <= 1) pts += 1;

  // Early bird bonus
  if (prediction.isEarlyBird) pts += 1;

  // Apply round multiplier
  return Math.round(pts * MULTIPLIERS[round]);
}

// ─── Tournament point values ─────────────────────────────────────

export const TOURNAMENT_POINTS = {
  champion: 25,
  finalist: 15,
  semifinalist: 10,
  group_winner: 5,
  golden_boot: 10,
} as const;
