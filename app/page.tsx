import { Hero } from "@/components/home/Hero";
import { ContributionGraph } from "@/components/home/ContributionGraph";
import { TechStack } from "@/components/home/TechStack";
import { Experience } from "@/components/home/Experience";
import { Education } from "@/components/home/Education";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { LinkButton } from "@/components/ui/LinkButton";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-14 px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero + first sections cascade in on load */}
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal delay={90}>
        <ContributionGraph />
      </Reveal>
      <Reveal delay={180}>
        <TechStack />
      </Reveal>

      <Reveal delay={240} className="flex justify-center">
        <LinkButton href="/about" variant="outline">
          More about me
        </LinkButton>
      </Reveal>

      {/* These reveal as they scroll into view */}
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Education />
      </Reveal>
      <Reveal>
        <ProjectsPreview />
      </Reveal>
      <Reveal>
        <ContactCTA />
      </Reveal>
    </div>
  );
}
