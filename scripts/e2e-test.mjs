#!/usr/bin/env node

/**
 * E2E Test Script for Ziccer Tipper
 *
 * Usage:
 *   node scripts/e2e-test.mjs https://troll.up.railway.app
 *   node scripts/e2e-test.mjs http://localhost:3000
 *
 * What it does:
 *   1. Creates 2 users + 1 squad (team)
 *   2. Fetches available matches
 *   3. Both users place predictions on the first 2 matches
 *   4. Verifies predictions are saved
 *   5. Tries to modify predictions (should overwrite)
 *   6. Checks leaderboard
 *   7. Cleans up: reports all created IDs for manual deletion
 */

const BASE = process.argv[2] || "https://troll.up.railway.app";
const log = (msg) => console.log(`\n✅ ${msg}`);
const warn = (msg) => console.log(`\n⚠️  ${msg}`);
const fail = (msg) => {
  console.error(`\n❌ ${msg}`);
  process.exit(1);
};
const json = (res) => res.json();

const created = { users: [], squads: [], predictions: [] };

async function api(method, path, body) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

// ─── Step 1: Register user 1 + squad ───────────────────────────────

async function step1_register() {
  console.log("\n━━━ STEP 1: Register User 1 + Squad ━━━");

  const res = await api("POST", "/api/register", {
    teamName: "E2E Teszt Csapat",
    email: "e2e-test-user1@ziccer-test.com",
    name: "Teszt Elek",
  });

  if (!res.ok) fail(`Registration failed: ${JSON.stringify(res.data)}`);

  created.users.push(res.data.user);
  created.squads.push(res.data.squad);

  log(`User 1 created: ${res.data.user.name} (${res.data.user.id})`);
  log(`Squad created: ${res.data.squad.name} (invite: ${res.data.squad.inviteCode})`);

  return res.data;
}

// ─── Step 2: Register user 2 ──────────────────────────────────────

async function step2_register_user2() {
  console.log("\n━━━ STEP 2: Register User 2 ━━━");

  const res = await api("POST", "/api/register", {
    teamName: "E2E Teszt Csapat 2",
    email: "e2e-test-user2@ziccer-test.com",
    name: "Teszt Petra",
  });

  if (!res.ok) fail(`Registration failed: ${JSON.stringify(res.data)}`);

  created.users.push(res.data.user);
  if (res.data.squad) created.squads.push(res.data.squad);

  log(`User 2 created: ${res.data.user.name} (${res.data.user.id})`);

  return res.data;
}

// ─── Step 3: Fetch matches ─────────────────────────────────────────

async function step3_fetch_matches() {
  console.log("\n━━━ STEP 3: Fetch Matches ━━━");

  const res = await api("GET", "/api/matches");

  if (!res.ok) {
    warn(`Matches API returned ${res.status}: ${JSON.stringify(res.data)}`);
    warn("Database may not be seeded with matches. Skipping prediction tests.");
    return [];
  }

  const matches = Array.isArray(res.data) ? res.data : [];
  log(`Found ${matches.length} matches in database`);

  if (matches.length > 0) {
    console.log(`   First match: ${matches[0].homeTeam} vs ${matches[0].awayTeam} (${matches[0].id})`);
  }

  return matches;
}

// ─── Step 4: Place predictions ─────────────────────────────────────

async function step4_place_predictions(user, matches) {
  console.log(`\n━━━ STEP 4: ${user.name} Places Predictions ━━━`);

  if (matches.length === 0) {
    warn("No matches available — skipping predictions");
    return;
  }

  const testPredictions = [
    { matchId: matches[0].id, outcome: "1", homeScore: 2, awayScore: 1 },
    ...(matches.length > 1
      ? [{ matchId: matches[1].id, outcome: "X", homeScore: 1, awayScore: 1 }]
      : []),
  ];

  for (const pred of testPredictions) {
    const res = await api("POST", "/api/predictions", {
      userId: user.id,
      ...pred,
    });

    if (!res.ok) {
      warn(`Prediction failed for match ${pred.matchId}: ${JSON.stringify(res.data)}`);
      continue;
    }

    created.predictions.push({ userId: user.id, matchId: pred.matchId });
    log(`${user.name} predicted match ${pred.matchId}: ${pred.outcome} (${pred.homeScore}-${pred.awayScore})`);
  }
}

// ─── Step 5: Verify predictions ────────────────────────────────────

async function step5_verify_predictions(user) {
  console.log(`\n━━━ STEP 5: Verify ${user.name}'s Predictions ━━━`);

  const res = await api("GET", `/api/predictions?userId=${user.id}`);

  if (!res.ok) {
    warn(`Could not fetch predictions: ${JSON.stringify(res.data)}`);
    return;
  }

  const predictions = Array.isArray(res.data) ? res.data : [];
  log(`${user.name} has ${predictions.length} prediction(s)`);

  for (const p of predictions) {
    console.log(`   Match ${p.matchId}: ${p.outcome} (${p.homeScore ?? "?"}-${p.awayScore ?? "?"}) — ${p.pointsEarned} pts`);
  }
}

// ─── Step 6: Modify prediction retroactively ───────────────────────

async function step6_modify_prediction(user, matches) {
  console.log(`\n━━━ STEP 6: Modify Prediction Retroactively ━━━`);

  if (matches.length === 0) {
    warn("No matches — skipping modification test");
    return;
  }

  const res = await api("POST", "/api/predictions", {
    userId: user.id,
    matchId: matches[0].id,
    outcome: "2",
    homeScore: 0,
    awayScore: 3,
  });

  if (!res.ok) {
    warn(`Modification failed: ${JSON.stringify(res.data)}`);
    log("This could be expected if the API blocks retroactive changes.");
    return;
  }

  log(`Prediction modified: now 2 (0-3) — API allowed the change`);
  warn("Note: The API currently allows retroactive modification (no kickoff time check).");

  // Verify the change stuck
  const verify = await api("GET", `/api/predictions?userId=${user.id}&matchId=${matches[0].id}`);
  if (verify.ok && Array.isArray(verify.data) && verify.data.length > 0) {
    const p = verify.data[0];
    log(`Verified: outcome=${p.outcome}, score=${p.homeScore}-${p.awayScore}`);
  }
}

// ─── Step 7: Check leaderboard ─────────────────────────────────────

async function step7_check_leaderboard(squad) {
  console.log("\n━━━ STEP 7: Check Leaderboard ━━━");

  const res = await api("GET", `/api/leaderboard?squadId=${squad.id}`);

  if (!res.ok) {
    warn(`Leaderboard returned ${res.status}: ${JSON.stringify(res.data)}`);
    return;
  }

  const entries = Array.isArray(res.data) ? res.data : [];
  log(`Leaderboard has ${entries.length} entries for squad "${squad.name}"`);

  for (const e of entries) {
    console.log(`   #${e.rank ?? "?"} ${e.name} — ${e.totalPoints} pts (${e.exactScores} exact, ${e.correctOutcomes} correct)`);
  }
}

// ─── Step 8: Summary & cleanup info ────────────────────────────────

function step8_summary() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  E2E TEST COMPLETE — CREATED RESOURCES:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  console.log("\nUsers:");
  for (const u of created.users) {
    console.log(`  - ${u.name} (${u.email}) — ID: ${u.id}`);
  }

  console.log("\nSquads:");
  for (const s of created.squads) {
    console.log(`  - ${s.name} (invite: ${s.inviteCode}) — ID: ${s.id}`);
  }

  console.log("\nPredictions:");
  for (const p of created.predictions) {
    console.log(`  - User ${p.userId} → Match ${p.matchId}`);
  }

  console.log("\n━━━ CLEANUP ━━━");
  console.log("To delete test data, run SQL against your Neon DB:");
  console.log("─────────────────────────────────────────────────────");

  const userIds = created.users.map((u) => `'${u.id}'`).join(", ");
  const squadIds = created.squads.map((s) => `'${s.id}'`).join(", ");

  if (userIds) {
    console.log(`DELETE FROM match_predictions WHERE user_id IN (${userIds});`);
    console.log(`DELETE FROM tournament_predictions WHERE user_id IN (${userIds});`);
    console.log(`DELETE FROM leaderboard WHERE user_id IN (${userIds});`);
    console.log(`DELETE FROM squad_members WHERE user_id IN (${userIds});`);
    console.log(`DELETE FROM users WHERE id IN (${userIds});`);
  }
  if (squadIds) {
    console.log(`DELETE FROM squad_members WHERE squad_id IN (${squadIds});`);
    console.log(`DELETE FROM squads WHERE id IN (${squadIds});`);
  }

  console.log("─────────────────────────────────────────────────────\n");
}

// ─── Run ───────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🏟️  Ziccer Tipper E2E Test — ${BASE}\n`);

  const reg1 = await step1_register();
  const reg2 = await step2_register_user2();
  const matches = await step3_fetch_matches();

  await step4_place_predictions(reg1.user, matches);
  await step4_place_predictions(reg2.user, matches);

  await step5_verify_predictions(reg1.user);
  await step5_verify_predictions(reg2.user);

  await step6_modify_prediction(reg1.user, matches);

  await step7_check_leaderboard(reg1.squad);

  step8_summary();
}

run().catch((err) => {
  console.error("\n💀 Fatal error:", err.message);
  step8_summary();
  process.exit(1);
});
