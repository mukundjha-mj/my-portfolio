"use client";

import { useState } from "react";
// The default `useSignIn` (from "@clerk/nextjs") is the newer Signals-based
// hook, whose `signIn.sso()` API has ambiguous redirect-param semantics in
// this Clerk version. The "legacy" hook returns the classic SignInResource
// with the well-documented `authenticateWithRedirect` method we want here.
import { useSignIn } from "@clerk/nextjs/legacy";
import { FcGoogle } from "react-icons/fc";

export function SignIn() {
  const { signIn, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    if (!isLoaded || loading) return;
    setLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/guestbook",
      });
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface/40 p-2">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={!isLoaded || loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2 disabled:opacity-60"
      >
        <FcGoogle className="h-4 w-4" />
        {loading ? "Redirecting…" : "Sign in with Google to leave a message"}
      </button>
    </div>
  );
}
