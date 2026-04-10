import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, squads, squadMembers, leaderboard } from "@/drizzle/schema";

function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamName, email, name } = body;

    if (!teamName || !email || !name) {
      return NextResponse.json(
        { error: "Minden mező kitöltése kötelező" },
        { status: 400 }
      );
    }

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        name,
        email: email.toLowerCase().trim(),
      })
      .onConflictDoUpdate({
        target: users.email,
        set: { name },
      })
      .returning();

    // Create squad with invite code
    const inviteCode = generateInviteCode();
    const [squad] = await db
      .insert(squads)
      .values({
        name: teamName.trim(),
        inviteCode,
      })
      .returning();

    // Add user as admin
    await db.insert(squadMembers).values({
      squadId: squad.id,
      userId: user.id,
      role: "admin",
    });

    // Create leaderboard entry so user appears in rankings
    await db
      .insert(leaderboard)
      .values({ userId: user.id, squadId: squad.id })
      .onConflictDoNothing();

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      squad: { id: squad.id, name: squad.name, inviteCode: squad.inviteCode },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Hiba történt a regisztráció során";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
