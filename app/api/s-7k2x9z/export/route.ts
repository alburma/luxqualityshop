import { sql, ensureSchema } from "../../../lib/db";

export const dynamic = "force-dynamic";

type Row = {
  ts: Date | string;
  destination: string;
  locale: string | null;
  referrer: string | null;
  user_agent: string | null;
};

function csvEscape(v: unknown): string {
  if (v == null) return "";
  const s = String(v).replace(/"/g, '""');
  return /[,"\n\r]/.test(s) ? `"${s}"` : s;
}

export async function GET() {
  await ensureSchema();
  const rows = (await sql`
    SELECT ts, destination, locale, referrer, user_agent
    FROM clicks
    ORDER BY ts DESC
    LIMIT 100000
  `) as unknown as Row[];

  const lines = ["ts,destination,locale,referrer,user_agent"];
  for (const r of rows) {
    const ts = typeof r.ts === "string" ? r.ts : new Date(r.ts).toISOString();
    lines.push([ts, r.destination, r.locale, r.referrer, r.user_agent].map(csvEscape).join(","));
  }

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="lqs-clicks-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
