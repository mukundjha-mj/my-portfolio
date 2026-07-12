import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Box, ExternalLink } from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LinkButton } from "@/components/ui/LinkButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSkillIcon } from "@/lib/skill-icons";
import { profile, type Project } from "@/content/profile";

// Only render projects that actually exist in content/profile.ts. Any other
// slug 404s at the routing layer.
export const dynamicParams = false;

function getProject(slug: string): Project | undefined {
  return profile.projects.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Projects | ${profile.name}` };
  return {
    title: `${project.name} | ${profile.name}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasLinks = Boolean(project.repo || project.url || project.youtubeUrl);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumb
        current={project.name}
        parent={{ label: "Projects", href: "/projects" }}
      />

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface/40">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.name}
              width={1200}
              height={630}
              className="aspect-[1200/630] w-full object-cover"
              preload
            />
          ) : (
            <div className="flex aspect-[1200/630] w-full items-center justify-center bg-surface-2/60">
              <Box className="h-12 w-12 text-muted" />
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div>
          <h1 className="font-space text-3xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.description}
          </p>
        </div>
      </Reveal>

      {hasLinks && (
        <Reveal delay={100} className="flex flex-wrap gap-3">
          {project.repo && (
            <LinkButton href={project.repo} external>
              <SiGithub className="h-4 w-4" />
              View on GitHub
            </LinkButton>
          )}
          {project.url && (
            <LinkButton href={project.url} external>
              <ExternalLink className="h-4 w-4" />
              Live site
            </LinkButton>
          )}
          {project.youtubeUrl && (
            <LinkButton href={project.youtubeUrl} external>
              <SiYoutube className="h-4 w-4" />
              View on YouTube
            </LinkButton>
          )}
        </Reveal>
      )}

      {project.longDescription && (
        <Reveal delay={140}>
          <p className="text-sm leading-6 text-muted">
            {project.longDescription}
          </p>
        </Reveal>
      )}

      {project.tags && project.tags.length > 0 && (
        <Reveal delay={180}>
          <div>
            <SectionHeading>Tech Stack</SectionHeading>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => {
                const { Icon, color } = getSkillIcon(tag);
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <Icon
                      className="h-3.5 w-3.5"
                      style={color === "currentColor" ? undefined : { color }}
                    />
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
