/**
 * Fetches a user's real GitHub contribution calendar.
 *
 * Uses the public jogruber contributions API (no auth/token needed), which
 * mirrors the exact counts + levels GitHub shows on the profile heat-map.
 * Revalidated hourly so the graph stays fresh without hammering the API.
 */

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionData = {
  total: number;
  weeks: ContributionDay[][]; // columns of up to 7 days (Sun→Sat)
  months: { label: string; span: number }[]; // aligned to weeks
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Build a fallback so the UI still renders if the network call fails. */
function emptyCalendar(): ContributionData {
  const weeks: ContributionDay[][] = Array.from({ length: 53 }, () =>
    Array.from({ length: 7 }, () => ({
      date: "",
      count: 0,
      level: 0 as const,
    })),
  );
  return { total: 0, weeks, months: [] };
}

export type GitHubStats = {
  login: string;
  repos: number;
  followers: number;
  following: number;
  memberSince: string; // e.g. "2021"
  totalContributions: number;
};

/** Fetch public profile stats for the GitHub stats card. */
export async function getGitHubStats(
  username: string,
): Promise<GitHubStats | null> {
  try {
    const [userRes, calendar] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      getContributions(username),
    ]);
    if (!userRes.ok) return null;
    const u = (await userRes.json()) as {
      login: string;
      public_repos: number;
      followers: number;
      following: number;
      created_at: string;
    };
    return {
      login: u.login,
      repos: u.public_repos,
      followers: u.followers,
      following: u.following,
      memberSince: u.created_at.slice(0, 4),
      totalContributions: calendar.total,
    };
  } catch {
    return null;
  }
}

export async function getContributions(
  username: string,
): Promise<ContributionData> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return emptyCalendar();

    const data = (await res.json()) as ApiResponse;
    const days = data.contributions ?? [];
    if (days.length === 0) return emptyCalendar();

    // Group into GitHub-style week columns starting on Sunday.
    const weeks: ContributionDay[][] = [];
    let current: ContributionDay[] = [];

    // Pad the first week so day 0 lands in the right weekday row.
    const firstWeekday = new Date(days[0].date + "T00:00:00").getDay();
    for (let i = 0; i < firstWeekday; i++) {
      current.push({ date: "", count: 0, level: 0 });
    }

    for (const day of days) {
      current.push(day);
      if (current.length === 7) {
        weeks.push(current);
        current = [];
      }
    }
    if (current.length > 0) {
      while (current.length < 7) current.push({ date: "", count: 0, level: 0 });
      weeks.push(current);
    }

    // Month labels: one per week column, shown only when the month changes.
    const months: { label: string; span: number }[] = [];
    let lastMonth = -1;
    for (const week of weeks) {
      const firstReal = week.find((d) => d.date);
      if (!firstReal) {
        months.push({ label: "", span: 1 });
        continue;
      }
      const month = new Date(firstReal.date + "T00:00:00").getMonth();
      if (month !== lastMonth) {
        months.push({ label: MONTH_LABELS[month], span: 1 });
        lastMonth = month;
      } else {
        months.push({ label: "", span: 1 });
      }
    }

    const total =
      data.total?.lastYear ??
      Object.values(data.total ?? {}).reduce((a, b) => a + b, 0);

    return { total, weeks, months };
  } catch {
    return emptyCalendar();
  }
}
