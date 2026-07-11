import type { Metadata } from "next";
import { auth } from "@/auth";
import { getEntries } from "@/lib/guestbook";
import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import { GuestbookList } from "@/components/guestbook/GuestbookList";
import { SignIn } from "@/components/guestbook/SignIn";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Guestbook | ${profile.name}`,
  description: "Sign in and leave a message.",
};

export default async function GuestbookPage() {
  const configured = Boolean(
    process.env.DATABASE_URL && process.env.AUTH_SECRET,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Guestbook<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
        Leave a message, a hello, or where you&apos;re visiting from. Sign in
        with GitHub or Google to post.
      </p>

      <div className="mt-8">
        {configured ? <GuestbookContent /> : <SetupNotice />}
      </div>
    </div>
  );
}

async function GuestbookContent() {
  try {
    const [session, entries] = await Promise.all([auth(), getEntries()]);
    return (
      <>
        {session?.user ? <GuestbookForm user={session.user} /> : <SignIn />}
        <GuestbookList entries={entries} />
      </>
    );
  } catch {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-muted">
        Couldn&apos;t reach the database. Check your{" "}
        <code className="font-mono text-foreground">DATABASE_URL</code> and that
        migrations have run (<code className="font-mono">bunx prisma migrate dev</code>).
      </div>
    );
  }
}

function SetupNotice() {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5 text-sm leading-6 text-muted">
      <p className="font-medium text-foreground">Guestbook not configured yet</p>
      <p className="mt-2">
        To enable sign-in and posting, copy{" "}
        <code className="font-mono text-foreground">.env.example</code> to{" "}
        <code className="font-mono text-foreground">.env</code> and fill in your
        Postgres <code className="font-mono">DATABASE_URL</code>,{" "}
        <code className="font-mono">AUTH_SECRET</code>, and the GitHub/Google
        OAuth credentials, then run{" "}
        <code className="font-mono text-foreground">bunx prisma migrate dev</code>.
      </p>
    </div>
  );
}
