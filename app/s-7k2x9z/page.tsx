import { sql, ensureSchema } from "../lib/db";

export const dynamic = "force-dynamic";

type DayRow = { day: string; destination: string; count: number };
type TotalRow = { destination: string; count: number };
type TodayRow = { count: number };

async function getData() {
  await ensureSchema();

  const days = (await sql`
    SELECT
      to_char((ts AT TIME ZONE 'Europe/Prague')::date, 'YYYY-MM-DD') as day,
      destination,
      COUNT(*)::int as count
    FROM clicks
    WHERE ts > NOW() - INTERVAL '30 days'
    GROUP BY 1, destination
    ORDER BY 1 DESC
  `) as unknown as DayRow[];

  const totals = (await sql`
    SELECT destination, COUNT(*)::int as count
    FROM clicks
    WHERE ts > NOW() - INTERVAL '30 days'
    GROUP BY destination
    ORDER BY count DESC
  `) as unknown as TotalRow[];

  const todayRows = (await sql`
    SELECT COUNT(*)::int as count
    FROM clicks
    WHERE (ts AT TIME ZONE 'Europe/Prague')::date = (NOW() AT TIME ZONE 'Europe/Prague')::date
  `) as unknown as TodayRow[];

  const allTimeRows = (await sql`
    SELECT COUNT(*)::int as count FROM clicks
  `) as unknown as TodayRow[];

  return {
    days,
    totals,
    todayCount: todayRows[0]?.count ?? 0,
    allTime: allTimeRows[0]?.count ?? 0,
  };
}

const LABELS: Record<string, string> = {
  social_instagram: "Instagram",
  social_telegram: "Telegram (соц)",
  social_whatsapp: "WhatsApp (соц)",
  social_facebook: "Facebook",
  catalog: "Каталог",
  manager_telegram: "Менеджер TG",
  manager_whatsapp: "Менеджер WA",
};

function label(key: string) {
  return LABELS[key] ?? key;
}

export default async function StatsPage() {
  const { days, totals, todayCount, allTime } = await getData();

  const dayList = Array.from(new Set(days.map((d) => d.day))).sort().reverse();
  const destList = totals.map((t) => t.destination);
  const matrix: Record<string, Record<string, number>> = {};
  for (const day of dayList) matrix[day] = {};
  for (const row of days) matrix[row.day][row.destination] = row.count;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 font-sans">
      <h1 className="mb-1 text-2xl font-bold">LQS · Клики</h1>
      <p className="mb-8 text-sm text-zinc-600">
        Сегодня: <strong className="text-zinc-900">{todayCount}</strong> · За 30 дней:{" "}
        <strong className="text-zinc-900">{totals.reduce((a, b) => a + b.count, 0)}</strong> · Всего:{" "}
        <strong className="text-zinc-900">{allTime}</strong>
      </p>

      <h2 className="mb-3 text-lg font-semibold">Итого за 30 дней</h2>
      {totals.length === 0 ? (
        <p className="text-sm text-zinc-500">Кликов пока нет.</p>
      ) : (
        <table className="mb-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-left">
              <th className="px-3 py-2">Куда</th>
              <th className="px-3 py-2 text-right">Кликов</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((t) => (
              <tr key={t.destination} className="border-b border-zinc-200">
                <td className="px-3 py-2">{label(t.destination)}</td>
                <td className="px-3 py-2 text-right font-mono">{t.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {dayList.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-semibold">По дням</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-300 text-left">
                  <th className="px-3 py-2">Дата</th>
                  {destList.map((d) => (
                    <th key={d} className="px-3 py-2 text-right">
                      {label(d)}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right">Всего</th>
                </tr>
              </thead>
              <tbody>
                {dayList.map((day) => {
                  const row = matrix[day];
                  const total = Object.values(row).reduce((a, b) => a + b, 0);
                  return (
                    <tr key={day} className="border-b border-zinc-200">
                      <td className="px-3 py-2 font-mono">{day}</td>
                      {destList.map((d) => (
                        <td key={d} className="px-3 py-2 text-right font-mono">
                          {row[d] ?? 0}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-right font-mono font-bold">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="mt-8 text-sm">
        <a
          href="/api/s-7k2x9z/export"
          className="inline-block rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 hover:bg-zinc-100"
        >
          Скачать CSV
        </a>
      </p>
    </main>
  );
}
