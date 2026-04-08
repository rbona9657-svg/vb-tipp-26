import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { matchPredictions } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, matchId, outcome, homeScore, awayScore, totalCorners, totalYellows } = body;

    if (!userId || !matchId || !outcome) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if 24h+ before kickoff for early bird bonus
    const isEarlyBird = false; // TODO: compare with match kickoff time

    const result = await db
      .insert(matchPredictions)
      .values({
        userId,
        matchId,
        outcome,
        homeScore,
        awayScore,
        totalCorners,
        totalYellows,
        isEarlyBird,
      })
      .onConflictDoUpdate({
        target: [matchPredictions.userId, matchPredictions.matchId],
        set: {
          outcome,
          homeScore,
          awayScore,
          totalCorners,
          totalYellows,
          submittedAt: new Date(),
        },
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save prediction" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const matchId = searchParams.get("matchId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }
    );
  }

  try {
    let query = db
      .select()
      .from(matchPredictions)
      .where(eq(matchPredictions.userId, userId));

    if (matchId) {
      query = db
        .select()
        .from(matchPredictions)
        .where(
          and(
            eq(matchPredictions.userId, userId),
            eq(matchPredictions.matchId, matchId)
          )
        );
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
