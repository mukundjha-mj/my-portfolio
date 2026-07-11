import { SiGithub, SiGoogle } from "react-icons/si";
import { signInGitHub, signInGoogle } from "@/lib/guestbook";

export function SignIn() {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5">
      <p className="text-sm text-muted">
        Sign in to leave a message in the guestbook.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <form action={signInGitHub}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-2 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2/70"
          >
            <SiGithub className="h-4 w-4" />
            Sign in with GitHub
          </button>
        </form>
        <form action={signInGoogle}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-2 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2/70"
          >
            <SiGoogle className="h-4 w-4" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
