import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leaderboard, users } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const squadId = searchParams.get("squadId");

  if (!squadId) {
    return NextResponse.json(
      { error: "squadId is required" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .select({
        userId: leaderboard.userId,
        name: users.name,
        avatarUrl: users.avatarUrl,
        totalPoints: leaderboard.totalPoints,
        exactScores: leaderboard.exactScores,
        correctOutcomes: leaderboard.correctOutcomes,
        currentStreak: leaderboard.currentStreak,
        rank: leaderboard.rank,
        prevRank: leaderboard.prevRank,
      })
      .from(leaderboard)
      .innerJoin(users, eq(leaderboard.userId, users.id))
      .where(eq(leaderboard.squadId, squadId))
      .orderBy(desc(leaderboard.totalPoints));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
