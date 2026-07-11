import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: `Things ${profile.name} has built.`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Projects<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
        A selection of things I&apos;ve designed, built, and shipped — from side
        projects to production systems.
      </p>

      <div className="mt-8 space-y-3">
        {profile.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
