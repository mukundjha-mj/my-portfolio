import { ArrowUpRight, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/content/profile";

/**
 * Featured project spotlight — fills the right column of the About page's
 * two-card row (the reference uses a photo collage here; we surface the top
 * featured project instead).
 */
export function FeaturedSpotlight() {
  const project =
    profile.projects.find((p) => p.featured) ?? profile.projects[0];
  if (!project) return null;

  const href = project.url ?? project.repo;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/40 p-6">
      <div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-accent" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-faint">
            Featured project
          </span>
        </div>
        <h3 className="mt-4 font-space text-lg font-semibold leading-snug text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted">
          {project.description}
        </p>
      </div>

      <div>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-[11px] text-faint"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-4 text-xs">
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
            >
              View project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
            >
              <SiGithub className="h-3.5 w-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
