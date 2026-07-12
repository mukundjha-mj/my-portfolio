"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserRound, Reply as ReplyIcon, Trash2, Send } from "lucide-react";
import { addReply, deleteEntry, type GuestbookState } from "@/lib/guestbook";

export type Entry = {
  id: string;
  body: string;
  createdAt: Date;
  authorName: string | null;
  authorImage: string | null;
  deleted: boolean;
  deletedByName: string | null;
};

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  const units: [number, string][] = [
    [31557600, "y"],
    [2629800, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secondsPerUnit, label] of units) {
    if (s >= secondsPerUnit) {
      return `${Math.floor(s / secondsPerUnit)}${label} ago`;
    }
  }
  return "just now";
}

function EntryAvatar({ entry }: { entry: Entry }) {
  if (entry.deleted || !entry.authorImage) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2">
        <UserRound className="h-4 w-4 text-muted" />
      </span>
    );
  }
  return (
    <Image
      src={entry.authorImage}
      alt={entry.authorName ?? "User"}
      width={32}
      height={32}
      className="h-8 w-8 shrink-0 rounded-full ring-1 ring-border"
    />
  );
}

export function GuestbookEntryItem({
  entry,
  signedIn,
  canReply,
}: {
  entry: Entry;
  signedIn: boolean;
  /** Replies can't themselves be replied to — single-level threading. */
  canReply: boolean;
}) {
  const { user } = useUser();
  const [replying, setReplying] = useState(false);
  const [deleted, setDeleted] = useState(entry.deleted);
  const [deletedByName, setDeletedByName] = useState(entry.deletedByName);
  const [isDeleting, startDelete] = useTransition();

  function handleDelete() {
    if (!window.confirm("Delete this message? This can't be undone.")) return;
    startDelete(async () => {
      const result = await deleteEntry(entry.id);
      if (!result.error) {
        setDeleted(true);
        setDeletedByName(user?.fullName ?? user?.username ?? "someone");
      }
    });
  }

  return (
    <li className="flex gap-3">
      <EntryAvatar entry={entry} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">
            {deleted ? "[deleted]" : (entry.authorName ?? "Anonymous")}
          </span>
          <span className="font-mono text-[11px] text-faint">
            {timeAgo(new Date(entry.createdAt))}
          </span>
        </div>

        {deleted ? (
          <p className="mt-0.5 text-sm italic leading-6 text-faint">
            This message was deleted by {deletedByName ?? "someone"}.
          </p>
        ) : (
          <p className="mt-0.5 break-words text-sm leading-6 text-muted">
            {entry.body}
          </p>
        )}

        {!deleted && signedIn && (
          <div className="mt-1.5 flex items-center gap-3">
            {canReply && (
              <button
                type="button"
                onClick={() => setReplying((v) => !v)}
                className="inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-foreground"
              >
                <ReplyIcon className="h-3.5 w-3.5" />
                Reply
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-red-500 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        )}

        {replying && (
          <ReplyForm parentId={entry.id} onDone={() => setReplying(false)} />
        )}
      </div>
    </li>
  );
}

function ReplyForm({
  parentId,
  onDone,
}: {
  parentId: string;
  onDone: () => void;
}) {
  const initial: GuestbookState = {};
  const [state, formAction, pending] = useActionState(addReply, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-2 flex flex-col gap-1.5"
    >
      <input type="hidden" name="parentId" value={parentId} />
      <div className="flex gap-2">
        <input
          name="message"
          maxLength={500}
          required
          autoComplete="off"
          placeholder="Write a reply…"
          className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-faint focus:border-border-strong"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          {pending ? "Sending…" : "Reply"}
        </button>
      </div>
      {state.error && <p className="text-xs text-red-500">{state.error}</p>}
    </form>
  );
}
