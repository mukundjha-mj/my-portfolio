import Image from "next/image";
import { UserRound } from "lucide-react";

type Entry = {
  id: string;
  body: string;
  createdAt: Date;
  user: { name: string | null; image: string | null };
};

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "s"],
    [3600, "m"],
    [86400, "h"],
    [604800, "d"],
    [2629800, "w"],
    [31557600, "mo"],
  ];
  if (s < 60) return "just now";
  for (let i = units.length - 1; i >= 0; i--) {
    if (s >= units[i][0]) {
      const [div] = units[i];
      const prev = i > 0 ? units[i - 1][0] : 1;
      return `${Math.floor(s / prev)}${units[i][1]} ago`;
    }
  }
  return "just now";
}

export function GuestbookList({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted">
        No messages yet — be the first to sign the guestbook.
      </p>
    );
  }

  return (
    <ul className="mt-6 space-y-4">
      {entries.map((e) => (
        <li key={e.id} className="flex gap-3">
          {e.user.image ? (
            <Image
              src={e.user.image}
              alt={e.user.name ?? "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full ring-1 ring-border"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2">
              <UserRound className="h-4 w-4 text-muted" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-foreground">
                {e.user.name ?? "Anonymous"}
              </span>
              <span className="font-mono text-[11px] text-faint">
                {timeAgo(new Date(e.createdAt))}
              </span>
            </div>
            <p className="mt-0.5 break-words text-sm leading-6 text-muted">
              {e.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
