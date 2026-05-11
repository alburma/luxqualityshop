import { neon } from "@neondatabase/serverless";

type SqlFn = ReturnType<typeof neon>;

let _client: SqlFn | undefined;

function client(): SqlFn {
  if (_client) return _client;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — connect Neon Postgres in Vercel dashboard");
  }
  _client = neon(url);
  return _client;
}

// Proxy that defers neon() construction until the first query is actually run,
// so importing this module at build time (page-data collection) does not require
// DATABASE_URL to be present.
export const sql: SqlFn = ((...args: Parameters<SqlFn>) =>
  (client() as (...a: Parameters<SqlFn>) => ReturnType<SqlFn>)(...args)) as SqlFn;

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
