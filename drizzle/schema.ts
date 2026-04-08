import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";

// ─── Users ───────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Squads ──────────────────────────────────────────────────────

export const squads = pgTable("squads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  inviteCode: text("invite_code").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const squadMembers = pgTable(
  "squad_members",
  {
    squadId: uuid("squad_id")
      .notNull()
      .references(() => squads.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    role: text("role", { enum: ["admin", "member"] }).default("member"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.squadId, table.userId] })]
);

// ─── Teams ───────────────────────────────────────────────────────

export const teams = pgTable("teams", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
  nameHu: text("name_hu"),
  flag: text("flag"),
  groupCode: text("group_code"),
  confederation: text("confederation"),
});

// ─── Venues ──────────────────────────────────────────────────────

export const venues = pgTable("venues", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  capacity: integer("capacity"),
  timezoneOffset: text("timezone_offset"),
});

// ─── Matches ─────────────────────────────────────────────────────

export const matches = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchNumber: integer("match_number").unique(),
  externalId: text("external_id").unique(),
  homeTeam: text("home_team")
    .notNull()
    .references(() => teams.code),
  awayTeam: text("away_team")
    .notNull()
    .references(() => teams.code),
  groupCode: text("group_code"),
  round: text("round", {
    enum: ["group", "r32", "r16", "qf", "sf", "final"],
  }).notNull(),
  venueId: uuid("venue_id").references(() => venues.id),
  kickoffAt: timestamp("kickoff_at", { withTimezone: true }).notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  totalCorners: integer("total_corners"),
  totalYellows: integer("total_yellows"),
  status: text("status", {
    enum: ["scheduled", "live", "finished"],
  }).default("scheduled"),
  multiplier: numeric("multiplier", { precision: 3, scale: 1 }).default("1.0"),
});

// ─── Match Predictions ───────────────────────────────────────────

export const matchPredictions = pgTable(
  "match_predictions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id),
    outcome: text("outcome", { enum: ["1", "X", "2"] }),
    homeScore: integer("home_score"),
    awayScore: integer("away_score"),
    totalCorners: integer("total_corners"),
    totalYellows: integer("total_yellows"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
    pointsEarned: integer("points_earned").default(0),
    isEarlyBird: boolean("is_early_bird").default(false),
  },
  (table) => [unique().on(table.userId, table.matchId)]
);

// ─── Tournament Predictions ──────────────────────────────────────

export const tournamentPredictions = pgTable("tournament_predictions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  predictionType: text("prediction_type", {
    enum: ["champion", "finalist", "semifinalist", "group_winner", "golden_boot"],
  }).notNull(),
  teamCode: text("team_code")
    .notNull()
    .references(() => teams.code),
  groupCode: text("group_code"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
  pointsEarned: integer("points_earned").default(0),
});

// ─── Leaderboard ─────────────────────────────────────────────────

export const leaderboard = pgTable(
  "leaderboard",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    squadId: uuid("squad_id")
      .notNull()
      .references(() => squads.id),
    totalPoints: integer("total_points").default(0),
    exactScores: integer("exact_scores").default(0),
    correctOutcomes: integer("correct_outcomes").default(0),
    currentStreak: integer("current_streak").default(0),
    rank: integer("rank"),
    prevRank: integer("prev_rank"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.squadId] })]
);
