import Link from "next/link";
import Image from "next/image";
import { profile } from "@/content/profile";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#experience", label: "Experience" },
];

const CONNECT = [
  { href: profile.socials.github, label: "GitHub" },
  { href: profile.socials.linkedin, label: "LinkedIn" },
  { href: profile.socials.email, label: "Email" },
  { href: profile.socials.bookCall, label: "Book a call" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
            {/* Bio */}
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="rounded-full ring-1 ring-border"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {profile.name}
                  </p>
                  <p className="text-xs text-muted">{profile.role}</p>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
                {profile.footerBio}
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {EXPLORE.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                Connect
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {CONNECT.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center">
            <p>
              © {profile.contributions.year} {profile.name}. All rights reserved.
            </p>
            <p className="font-mono uppercase tracking-wider">
              {profile.footerHandle}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
