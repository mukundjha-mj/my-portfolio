"use client";

import { useEffect } from "react";

// This Next.js version passes `unstable_retry` (not `reset`) to error boundaries.
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-4 py-24 sm:px-6">
      <h2 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-muted">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
