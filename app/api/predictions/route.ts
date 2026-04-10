import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { matchPredictions, matches, squadMembers, leaderboard } from "@/drizzle/schema";
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

    // ─── Kickoff lockout: block predictions after match starts ─────
    const [match] = await db
      .select({ kickoffAt: matches.kickoffAt, status: matches.status })
      .from(matches)
      .where(eq(matches.id, matchId))
      .limit(1);

    if (!match) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }

    if (match.status === "live" || match.status === "finished") {
      return NextResponse.json(
        { error: "A meccs már elkezdődött, nem lehet tippelni" },
        { status: 403 }
      );
    }

    if (match.kickoffAt && new Date() >= new Date(match.kickoffAt)) {
      return NextResponse.json(
        { error: "A meccs már elkezdődött, nem lehet tippelni" },
        { status: 403 }
      );
    }

    // ─── Early bird bonus: 24h+ before kickoff ────────────────────
    const isEarlyBird =
      match.kickoffAt != null &&
      new Date(match.kickoffAt).getTime() - Date.now() > 24 * 60 * 60 * 1000;

    // ─── Save prediction ──────────────────────────────────────────
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
          isEarlyBird,
          submittedAt: new Date(),
        },
      })
      .returning();

    // ─── Ensure leaderboard row exists for user in all squads ─────
    const userSquads = await db
      .select({ squadId: squadMembers.squadId })
      .from(squadMembers)
      .where(eq(squadMembers.userId, userId));

    for (const { squadId } of userSquads) {
      await db
        .insert(leaderboard)
        .values({ userId, squadId })
        .onConflictDoNothing();
    }

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
