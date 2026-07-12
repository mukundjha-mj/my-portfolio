import type { Metadata } from "next";
import { MapPin, Code2, GraduationCap } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubStatsCard } from "@/components/home/GitHubStatsCard";
import { FeaturedSpotlight } from "@/components/home/FeaturedSpotlight";
import { ContributionGraph } from "@/components/home/ContributionGraph";
import { Experience } from "@/components/home/Experience";
import { Education } from "@/components/home/Education";
import { TechStack } from "@/components/home/TechStack";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: `About ${profile.name} — ${profile.role}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumb current="About" />

      <Reveal>
        <section>
          {/* Name + avatar */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar size={80} className="h-16 w-16 sm:h-20 sm:w-20" />
            <div>
              <h1 className="font-space text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {profile.name}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-1.5 font-mono text-xs leading-5 text-muted sm:text-sm">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* Monospace fact list */}
          <ul className="mt-6 space-y-2 font-mono text-sm text-muted">
            <li className="flex items-center gap-2">
              <Code2 className="h-4 w-4 shrink-0 text-faint" />
              <span>
                {profile.currentRole} @{" "}
                <span className="font-semibold text-foreground">
                  {profile.currentCompany}
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-faint" />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 shrink-0 text-faint" />
              <span>{profile.schoolLine}</span>
            </li>
          </ul>

          {/* Intro paragraphs */}
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <p>{profile.intro}</p>
            <p>
              I care most about the parts of software people never see — the
              data models, the queues, the caches, the failure modes. I like
              turning fuzzy product ideas into systems that stay fast and
              correct as they grow.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Two-card row: live GitHub stats + featured project */}
      <Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <GitHubStatsCard />
          <FeaturedSpotlight />
        </div>
      </Reveal>

      {/* Contribution graph */}
      <Reveal>
        <ContributionGraph />
      </Reveal>

      <Reveal>
        <section>
          <SectionHeading>Tech I reach for</SectionHeading>
          <div className="mt-6">
            <TechStack />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Education />
      </Reveal>
    </div>
  );
}
