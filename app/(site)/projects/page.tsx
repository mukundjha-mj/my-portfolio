import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: `Things ${profile.name} has built.`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumb current="Projects" />

      <Reveal>
        <div>
          <h1 className="font-space text-3xl font-semibold tracking-tight text-foreground">
            Projects<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Backend systems, full-stack products, and tools — things I&apos;ve
            designed, built, and shipped.
          </p>
        </div>
      </Reveal>

      <div className="space-y-3">
        {profile.projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 60}>
            <ProjectCard project={project} compact />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
