import { BadgeCheck, MapPin, Mail, GraduationCap, Code2, FileText } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="w-full">
      {/* Name + avatar */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Avatar
          size={112}
          priority
          className="h-16 w-16 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28"
        />
        <div className="min-w-0">
          <h1 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-space text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            <span className="font-normal text-muted">Hi, I&apos;m</span>
            <span className="font-semibold">{profile.firstName}</span>
            {profile.verified && (
              <BadgeCheck className="h-5 w-5 shrink-0 fill-accent text-background sm:h-6 sm:w-6" />
            )}
          </h1>
          <p className="mt-2 max-w-md font-mono text-sm leading-6 text-muted">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* Intro paragraph */}
      <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">{profile.intro}</p>

      {/* Monospace fact list */}
      <ul className="mt-6 space-y-2 font-mono text-sm text-muted">
        <li className="flex items-center gap-2">
          <Code2 className="h-4 w-4 shrink-0 text-faint" />
          <span>
            {profile.currentRole} @{" "}
            {profile.currentCompanyUrl && profile.currentCompanyUrl !== "#" ? (
              <a
                href={profile.currentCompanyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-accent"
              >
                {profile.currentCompany}
              </a>
            ) : (
              <span className="font-semibold text-foreground">
                {profile.currentCompany}
              </span>
            )}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-faint" />
          <span>{profile.location}</span>
        </li>
        <li className="flex min-w-0 items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-faint" />
          <a
            href={`mailto:${profile.email}`}
            className="min-w-0 break-all hover:text-foreground"
          >
            {profile.email}
          </a>
        </li>
        {profile.highlight && (
          <li className="flex items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-faint" />
            <a
              href={profile.highlight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border-strong underline-offset-4 hover:text-foreground"
            >
              {profile.highlight.label}
            </a>
          </li>
        )}
        <li className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 shrink-0 text-faint" />
          <span>{profile.schoolLine}</span>
        </li>
      </ul>
    </section>
  );
}
