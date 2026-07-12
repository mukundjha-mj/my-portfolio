"use client";

import { useEffect, useState } from "react";
import { useLanyard } from "@/hooks/useLanyard";
import { pickPrimaryActivity, formatDuration } from "@/lib/lanyard";
import { profile } from "@/content/profile";

/**
 * Live "what I'm doing right now" pill, sourced from Discord Rich Presence
 * via Lanyard. Renders nothing until mounted (avoids hydration mismatch,
 * same guard as ThemeToggle) and nothing at all once mounted if there's no
 * Tier-1 activity to show — see lib/lanyard.ts for what counts.
 */
export function LiveActivity({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Re-render every second so the "active for Xm Ys" duration in the
  // tooltip keeps ticking live.
  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const presence = useLanyard(profile.discordId);
  const activity = pickPrimaryActivity(presence);

  if (!mounted || !activity) return null;

  const Icon = activity.icon;

  return (
    <span className={`group relative ${className}`}>
      <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-xs text-muted">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="max-w-[7rem] truncate">{activity.appName}</span>
      </span>

      {/* Hover card: bigger logo + what I'm doing + how long. */}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-44 -translate-x-1/2 rounded-lg border border-border bg-background p-2 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        <div className="flex items-center gap-1.5">
          <Icon className="h-4 w-4 shrink-0 text-foreground" />
          <span className="text-xs font-medium text-foreground">
            {activity.appName}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted">{activity.detail}</p>
        {activity.startedAt && (
          <p className="mt-0.5 text-[10px] text-faint">
            Active for {formatDuration(activity.startedAt)}
          </p>
        )}
        {activity.also.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-border pt-1.5">
            <span className="text-[10px] text-faint">Also:</span>
            {activity.also.map((extra) => {
              const AlsoIcon = extra.icon;
              return (
                <span
                  key={extra.appName}
                  className="inline-flex items-center gap-1 text-[10px] text-muted"
                >
                  <AlsoIcon className="h-2.5 w-2.5 shrink-0" />
                  {extra.appName}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </span>
  );
}
