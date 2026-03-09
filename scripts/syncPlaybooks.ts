/**
 * scripts/syncPlaybooks.ts
 *
 * Pulls playbook rows from the "Playbooks" tab of the WorkflowStacks_Content
 * Google Sheet and writes the result to data/playbooks.json.
 *
 * Usage:
 *   bun run sync:playbooks
 *
 * Required environment variables (set in .env.local or your shell):
 *   GOOGLE_SHEETS_CLIENT_EMAIL  – service account email
 *   GOOGLE_SHEETS_PRIVATE_KEY   – service account private key (PEM, with \n)
 *   GOOGLE_SHEET_ID             – the spreadsheet ID from the Sheet URL
 *
 * The script filters rows where both `active` and `approved` are truthy
 * (any of: "true", "1", "yes", "TRUE", "YES").
 *
 * Array fields are delimited as follows:
 *   goal_tags, channel_tags, region_tags  → comma-separated
 *   before_bullets, after_bullets, how_steps, what_you_get  → pipe (|) separated
 *
 * Do NOT run this script during the production build. Run it locally whenever
 * you update the Sheet, then commit the updated data/playbooks.json.
 */

import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Playbook {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  category: "research" | "ads" | "nurture" | "ops";
  goal_tags: string[];
  channel_tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  region_tags: string[];
  outcome_text: string;
  who_this_is_for: string;
  prerequisites: string[];
  time_to_deploy: string;
  before_bullets: string[];
  after_bullets: string[];
  how_steps: string[];
  what_you_get: string[];
  technical_details: string;
  gumroad_url: string;
  price_usd: number;
  is_placeholder?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Split a comma-separated string into a trimmed string array. */
function splitComma(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Split a pipe-separated string into a trimmed string array. */
function splitPipe(value: string): string[] {
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Return true for any truthy-looking string value. */
function isTruthy(value: string): boolean {
  return ["true", "1", "yes"].includes(value.trim().toLowerCase());
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate env vars
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !sheetId) {
    console.error(
      "❌  Missing required environment variables:\n" +
        "    GOOGLE_SHEETS_CLIENT_EMAIL\n" +
        "    GOOGLE_SHEETS_PRIVATE_KEY\n" +
        "    GOOGLE_SHEET_ID"
    );
    process.exit(1);
  }

  // Authenticate with Google
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  console.log("📡  Fetching rows from Google Sheets…");

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Playbooks",
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) {
    console.error("❌  No data found in the Playbooks tab.");
    process.exit(1);
  }

  // First row is the header
  const [header, ...dataRows] = rows as string[][];

  // Build a column-index map for safe access
  const col: Record<string, number> = {};
  header.forEach((name, i) => {
    col[name.trim()] = i;
  });

  const requiredColumns = [
    "id",
    "slug",
    "name",
    "short_description",
    "category",
    "goal_tags",
    "channel_tags",
    "difficulty",
    "region_tags",
    "outcome_text",
    "who_this_is_for",
    "prerequisites",
    "time_to_deploy",
    "before_bullets",
    "after_bullets",
    "how_steps",
    "what_you_get",
    "technical_details",
    "gumroad_url",
    "price_usd",
    "is_placeholder",
    "active",
    "approved",
  ];

  const missingColumns = requiredColumns.filter((c) => !(c in col));
  if (missingColumns.length > 0) {
    console.error(`❌  Missing columns in sheet: ${missingColumns.join(", ")}`);
    process.exit(1);
  }

  const get = (row: string[], key: string): string => row[col[key]] ?? "";

  // Filter and map rows
  const playbooks: Playbook[] = dataRows
    .filter((row) => isTruthy(get(row, "active")) && isTruthy(get(row, "approved")))
    .map((row): Playbook => ({
      id: parseInt(get(row, "id"), 10),
      slug: get(row, "slug"),
      name: get(row, "name"),
      short_description: get(row, "short_description"),
      category: get(row, "category") as Playbook["category"],
      goal_tags: splitComma(get(row, "goal_tags")),
      channel_tags: splitComma(get(row, "channel_tags")),
      difficulty: get(row, "difficulty") as Playbook["difficulty"],
      region_tags: splitComma(get(row, "region_tags")),
      outcome_text: get(row, "outcome_text"),
      who_this_is_for: get(row, "who_this_is_for"),
      prerequisites: splitPipe(get(row, "prerequisites")),
      time_to_deploy: get(row, "time_to_deploy"),
      before_bullets: splitPipe(get(row, "before_bullets")),
      after_bullets: splitPipe(get(row, "after_bullets")),
      how_steps: splitPipe(get(row, "how_steps")),
      what_you_get: splitPipe(get(row, "what_you_get")),
      technical_details: get(row, "technical_details"),
      gumroad_url: get(row, "gumroad_url"),
      price_usd: parseFloat(get(row, "price_usd")),
      is_placeholder: isTruthy(get(row, "is_placeholder")),
    }));

  console.log(`✅  Found ${playbooks.length} active + approved playbook(s).`);

  // Write to data/playbooks.json
  const outputPath = path.resolve(process.cwd(), "data", "playbooks.json");
  fs.writeFileSync(outputPath, JSON.stringify(playbooks, null, 2) + "\n", "utf-8");

  console.log(`💾  Written to ${outputPath}`);
}

main().catch((err) => {
  console.error("❌  Sync failed:", err);
  process.exit(1);
});
