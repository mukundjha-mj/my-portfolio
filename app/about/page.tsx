import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Experience } from "@/components/home/Experience";
import { Education } from "@/components/home/Education";
import { TechStack } from "@/components/home/TechStack";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: `About ${profile.name} — ${profile.role}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16">
      <section>
        <div className="flex items-center gap-4">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover ring-1 ring-border"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              About {profile.firstName}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
          <p>{profile.intro}</p>
          <p>
            I care most about the parts of software people never see — the data
            models, the queues, the caches, the failure modes. I like turning
            fuzzy product ideas into systems that stay fast and correct as they
            grow.
          </p>
          <p>
            Outside of shipping, I enjoy writing about what I learn and talking
            shop with anyone building something ambitious. Grab my email or book
            a call — I&apos;m always up for a good problem.
          </p>
        </div>
      </section>

      <section>
        <SectionHeading>Tech I reach for</SectionHeading>
        <div className="mt-6">
          <TechStack />
        </div>
      </section>

      <Experience />
      <Education />
    </div>
  );
}
