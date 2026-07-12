"use client";

import { useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Send } from "lucide-react";
import { addEntry, type GuestbookState } from "@/lib/guestbook";

type Props = {
  user: { name?: string | null; image?: string | null };
};

const initial: GuestbookState = {};

export function GuestbookForm({ user }: Props) {
  const [state, formAction, pending] = useActionState(addEntry, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the input after a successful post.
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name ?? "You"}
              width={24}
              height={24}
              className="rounded-full ring-1 ring-border"
            />
          )}
          <span className="min-w-0 truncate text-sm text-muted">
            Signed in as{" "}
            <span className="font-medium text-foreground">
              {user.name ?? "you"}
            </span>
          </span>
        </div>
        <SignOutButton redirectUrl="/guestbook">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </SignOutButton>
      </div>

      <form ref={formRef} action={formAction} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            name="message"
            maxLength={500}
            required
            autoComplete="off"
            placeholder="Leave a message…"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-faint focus:border-border-strong"
          />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {pending ? "Posting…" : "Post"}
          </button>
        </div>
        {state.error && (
          <p className="text-xs text-red-500">{state.error}</p>
        )}
      </form>
    </div>
  );
}
