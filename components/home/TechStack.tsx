import { profile } from "@/content/profile";
import { getSkillIcon } from "@/lib/skill-icons";

export function TechStack() {
  return (
    <section className="flex flex-wrap justify-center gap-2">
      {profile.skills.map((skill) => {
        const { Icon, color } = getSkillIcon(skill);
        return (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Icon
              className="h-3.5 w-3.5"
              style={color === "currentColor" ? undefined : { color }}
            />
            {skill}
          </span>
        );
      })}
    </section>
  );
}
