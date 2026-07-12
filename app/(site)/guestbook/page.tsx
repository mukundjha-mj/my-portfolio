import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { getEntries } from "@/lib/guestbook";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import { GuestbookList } from "@/components/guestbook/GuestbookList";
import { SignIn } from "@/components/guestbook/SignIn";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Guestbook | ${profile.name}`,
  description: "Sign in and leave a message.",
};

// Auth + DB reads depend on the request; never statically prerender.
export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  // Clerk auto-provisions a temporary dev instance when its keys are unset
  // (local dev only), so we only gate the guestbook on having a database —
  // Clerk surfaces its own errors if it's genuinely unconfigured elsewhere.
  const configured = Boolean(process.env.DATABASE_URL);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumb current="Guestbook" />

      <Reveal>
        <div>
          <h1 className="font-space text-3xl font-semibold tracking-tight text-foreground">
            Guestbook<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Leave a message, a hello, or where you&apos;re visiting from. Sign
            in with GitHub or Google to post.
          </p>
        </div>
      </Reveal>

      {configured ? <GuestbookContent /> : <SetupNotice />}
    </div>
  );
}

async function GuestbookContent() {
  try {
    const [user, entries] = await Promise.all([currentUser(), getEntries()]);
    return (
      <>
        {user ? (
          <GuestbookForm
            user={{
              name: user.fullName ?? user.username,
              image: user.imageUrl,
            }}
          />
        ) : (
          <SignIn />
        )}

        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="font-space text-xl font-semibold tracking-tight text-foreground">
              Notes<span className="text-accent">.</span>
            </h2>
            <span className="font-mono text-xs text-faint">
              {entries.length} signed
            </span>
          </div>
          <GuestbookList entries={entries} signedIn={Boolean(user)} />
        </section>
      </>
    );
  } catch (err) {
    // Log the real error for the developer; show visitors a friendly, generic
    // message instead of leaking internal details.
    console.error("Guestbook: failed to load entries", err);
    return (
      <div className="rounded-xl border border-border bg-surface/40 p-5 text-sm text-muted">
        The guestbook is taking a short break — please check back in a moment.
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
        <code className="font-mono text-foreground">.env</code>, fill in your
        Postgres <code className="font-mono">DATABASE_URL</code>, and add your
        Clerk keys (<code className="font-mono">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>,{" "}
        <code className="font-mono">CLERK_SECRET_KEY</code>) from{" "}
        <code className="font-mono text-foreground">dashboard.clerk.com</code>{" "}
        — enable GitHub and Google under SSO Connections.
      </p>
    </div>
  );
}
