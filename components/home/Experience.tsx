import { ChevronRight, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
import { getSkillIcon } from "@/lib/skill-icons";

export function Experience() {
  return (
    <section id="experience" className="w-full scroll-mt-20">
      <SectionHeading>Experience</SectionHeading>

      <div className="mt-6 space-y-8">
        {profile.experiences.map((exp) => (
          <div key={exp.company} className="flex gap-4">
            {/* Logo */}
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
              <Building2 className="h-4 w-4 text-muted" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div>
                  <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    {exp.company}
                    {exp.current && (
                      <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </p>
                  <p className="text-sm text-muted">{exp.role}</p>
                </div>
                <p className="font-mono text-xs text-faint">{exp.period}</p>
              </div>

              <ul className="mt-3 space-y-1.5">
                {exp.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-1.5 text-sm leading-6 text-muted"
                  >
                    <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-faint" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.tech.map((t) => {
                    const { Icon, color } = getSkillIcon(t);
                    return (
                      <span
                        key={t}
                        title={t}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-surface-2"
                      >
                        <Icon
                          className="h-3.5 w-3.5"
                          style={
                            color === "currentColor" ? undefined : { color }
                          }
                        />
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
