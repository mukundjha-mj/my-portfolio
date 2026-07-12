"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { profile } from "@/content/profile";

const CAL_NAMESPACE = "book-a-call";

type Variant = "solid" | "outline" | "link";

const styles: Record<Variant, string> = {
  solid:
    "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-2",
  link: "text-muted transition-colors hover:text-foreground",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function CalBookButton({
  variant = "outline",
  className = "",
  children,
}: Props) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={profile.calLink}
      data-cal-config='{"layout":"month_view"}'
      className={`${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
