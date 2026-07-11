import { Hero } from "@/components/home/Hero";
import { ContributionGraph } from "@/components/home/ContributionGraph";
import { TechStack } from "@/components/home/TechStack";
import { Experience } from "@/components/home/Experience";
import { Education } from "@/components/home/Education";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { LinkButton } from "@/components/ui/LinkButton";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16">
      <Hero />
      <ContributionGraph />
      <TechStack />

      <div className="flex justify-center">
        <LinkButton href="/about" variant="outline">
          More about me
        </LinkButton>
      </div>

      <Experience />
      <Education />
      <ProjectsPreview />
      <ContactCTA />
    </div>
  );
}
