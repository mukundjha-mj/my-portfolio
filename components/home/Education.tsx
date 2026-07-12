import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";

export function Education() {
  return (
    <section className="w-full">
      <SectionHeading>Education</SectionHeading>

      <div className="mt-6 space-y-6">
        {profile.education.map((ed) => (
          <div key={ed.school} className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
              <GraduationCap className="h-4 w-4 text-muted" />
            </div>
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {ed.school}
                </p>
                <p className="text-sm text-muted">{ed.degree}</p>
              </div>
              <p className="font-mono text-xs text-faint">{ed.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
