import { sql, ensureSchema } from "../../lib/db";

export const dynamic = "force-dynamic";

let schemaReady: Promise<void> | null = null;

export async function POST(req: Request) {
  try {
    if (!schemaReady) schemaReady = ensureSchema();
    await schemaReady;

    const body = await req.json().catch(() => ({}));
    const dest = typeof body.destination === "string" ? body.destination.slice(0, 64) : null;
    if (!dest) return new Response("bad", { status: 400 });

    const locale = typeof body.locale === "string" ? body.locale.slice(0, 8) : null;
    const ua = req.headers.get("user-agent")?.slice(0, 500) ?? null;
    const ref = req.headers.get("referer")?.slice(0, 500) ?? null;

    await sql`
      INSERT INTO clicks (destination, locale, user_agent, referrer)
      VALUES (${dest}, ${locale}, ${ua}, ${ref})
    `;

    return new Response("ok", { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("click log failed", err);
    return new Response("err", { status: 500 });
  }
}
