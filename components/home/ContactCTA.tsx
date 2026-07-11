import { Calendar } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { LinkButton } from "@/components/ui/LinkButton";
import { profile } from "@/content/profile";

export function ContactCTA() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface/40 p-8 sm:p-10">
      {/* Dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage:
            "linear-gradient(to right, transparent, black 40%, black)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 40%, black)",
        }}
      />

      <div className="relative">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Got something interesting<span className="text-accent">?</span>
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          If you&apos;re working on something worth building — let&apos;s talk.
          I&apos;m always up for a good problem.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={profile.socials.bookCall} variant="solid" external>
            <Calendar className="h-4 w-4" />
            Book a call
          </LinkButton>
          <LinkButton href={profile.socials.linkedin} variant="outline" external>
            <FaLinkedin className="h-4 w-4" />
            Message on LinkedIn
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
