import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { matches } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get("group");
  const round = searchParams.get("round");

  try {
    let query = db.select().from(matches);

    if (group) {
      query = query.where(eq(matches.groupCode, group)) as typeof query;
    }
    if (round) {
      query = query.where(eq(matches.round, round as "group" | "r32" | "r16" | "qf" | "sf" | "final")) as typeof query;
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
