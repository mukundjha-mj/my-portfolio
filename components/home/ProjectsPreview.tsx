import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { profile } from "@/content/profile";

export function ProjectsPreview() {
  const featured = profile.projects.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="w-full">
      <SectionHeading>Projects</SectionHeading>

      <div className="mt-6 space-y-3">
        {featured.map((project) => (
          <ProjectCard key={project.name} project={project} compact />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <LinkButton href="/projects" variant="outline">
          See More Cool Stuff
        </LinkButton>
      </div>
    </section>
  );
}
