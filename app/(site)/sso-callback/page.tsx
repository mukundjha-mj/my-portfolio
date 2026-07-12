import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

/**
 * Completes the direct-to-Google OAuth redirect started in SignIn.tsx
 * (skips Clerk's account-chooser modal). Clerk handles the token exchange
 * and redirects to `redirectUrlComplete` on success.
 */
export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
