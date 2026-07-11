import { ExternalLink, Box } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/content/profile";

// `compact` (home preview) matches the reference: clickable card, name +
// one-line description, no tags/links shown. Full mode (/projects) shows
// tags and explicit Code/Live links.
export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  if (compact) {
    const href = project.url ?? project.repo;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong hover:bg-surface-2/60"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
          <Box className="h-5 w-5 text-muted" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm leading-6 text-muted">
            {project.description}
          </p>
        </div>
      </a>
    );
  }

  return (
    <div className="group flex items-start gap-4 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong hover:bg-surface-2/60">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
        <Box className="h-5 w-5 text-muted" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
        <p className="mt-1 text-sm leading-6 text-muted">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-[11px] text-faint"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(project.repo || project.url) && (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
              >
                <SiGithub className="h-3.5 w-3.5" />
                Code
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
