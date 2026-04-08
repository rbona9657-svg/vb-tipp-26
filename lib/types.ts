// ─── Core Data Types ─────────────────────────────────────────────

export type MatchRound = "group" | "r32" | "r16" | "qf" | "sf" | "final";
export type MatchStatus = "scheduled" | "live" | "finished";
export type Outcome = "1" | "X" | "2";
export type Trend = "up" | "down" | "same";
export type SquadRole = "admin" | "member";

export interface Team {
  code: string;
  name: string;
  flag: string;
}

export interface Match {
  id: number;
  home: string;
  away: string;
  date: string;
  time: string;
  group: string;
  venue: string;
  round: MatchRound;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
}

export interface Prediction {
  matchId: number;
  outcome?: Outcome;
  homeScore?: number;
  awayScore?: number;
  totalCorners?: number;
  totalYellows?: number;
  isEarlyBird: boolean;
}

export interface Player {
  id: number;
  name: string;
  pts: number;
  exact: number;
  correct: number;
  trend: Trend;
  avatar: string;
}

export interface Squad {
  name: string;
  logo: string;
  members: number;
  pts: number;
  rank: number;
}

export interface ScoringRule {
  label: string;
  pts: number | string;
  icon: string;
}

export interface Multiplier {
  label: string;
  mult: string;
}
