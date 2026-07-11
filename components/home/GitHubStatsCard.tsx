import { SiGithub } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/content/profile";

/**
 * GitHub stats card — mirrors the reference "stats card" layout with a big
 * headline number, sub-stats, a highlighted row, and two small stat boxes.
 * All numbers are pulled live from the GitHub API (no fake data).
 */
export async function GitHubStatsCard() {
  const stats = await getGitHubStats(profile.githubUsername);
  if (!stats) return null;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SiGithub className="h-5 w-5 text-foreground" />
          <span className="font-space text-sm font-semibold text-foreground">
            GitHub
          </span>
          <span className="text-xs text-muted">@{stats.login}</span>
        </div>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile"
          className="text-faint transition-colors hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Headline stats */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="font-space text-5xl font-bold leading-none text-foreground">
            {stats.totalContributions}
          </p>
          <p className="mt-2 text-xs text-muted">contributions</p>
        </div>
        <div className="text-right">
          <p className="font-space text-2xl font-bold leading-none text-foreground">
            {stats.repos}
          </p>
          <p className="mt-2 text-xs text-muted">repositories</p>
        </div>
      </div>

      {/* Highlighted row */}
      <div className="mt-6 rounded-lg border border-border bg-surface-2/60 px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-faint">
          Member since
        </p>
        <p className="mt-1 font-mono text-lg font-semibold text-foreground">
          {stats.memberSince}
        </p>
      </div>

      {/* Small stat boxes */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-surface-2/40 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-faint">
            Followers
          </p>
          <p className="mt-1 font-space text-lg font-bold text-foreground">
            {stats.followers}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2/40 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-faint">
            Following
          </p>
          <p className="mt-1 font-space text-lg font-bold text-foreground">
            {stats.following}
          </p>
        </div>
      </div>
    </div>
  );
}
