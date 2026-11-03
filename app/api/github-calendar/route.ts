import { NextResponse } from 'next/server';

export const revalidate = 3600;

/**
 * Live GitHub contributions (yesterday → 1 year back) for the activity section.
 * Data comes from the same API the react-activity-calendar ecosystem uses;
 * caching server-side keeps the site fast and avoids client rate limits.
 */
export async function GET() {
  const res = await fetch(
    'https://github-contributions-api.jogruber.de/v4/parth-valia?y=last',
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 });
  }

  const data = (await res.json()) as {
    total: Record<string, number>;
    contributions: { date: string; count: number; level: number }[];
  };

  const days = data.contributions.length;
  const total = data.contributions.reduce((sum, d) => sum + d.count, 0);
  const activeDays = data.contributions.filter((d) => d.count > 0).length;
  const best = data.contributions.reduce((m, d) => Math.max(m, d.count), 0);
  // Like GitHub, an empty today doesn't break the streak; it is still being written.
  const currentStreak = (() => {
    const list = data.contributions;
    let i = list.length - 1;
    if (list[i]?.count === 0) i -= 1;
    let streak = 0;
    for (; i >= 0 && list[i].count > 0; i -= 1) streak += 1;
    return streak;
  })();

  return NextResponse.json({
    ...data,
    stats: { total, activeDays, best, currentStreak, days },
  });
}
