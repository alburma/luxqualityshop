import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

export const sql = neon(url ?? "postgres://invalid");

export async function ensureSchema() {
  await sql`CREATE TABLE IF NOT EXISTS clicks (
    id BIGSERIAL PRIMARY KEY,
    destination TEXT NOT NULL,
    locale TEXT,
    ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    referrer TEXT
  )`;
  await sql`CREATE INDEX IF NOT EXISTS clicks_ts_idx ON clicks (ts DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS clicks_dest_idx ON clicks (destination)`;
}
