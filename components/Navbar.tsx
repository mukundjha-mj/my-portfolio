"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/content/profile";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-2xl items-center justify-between gap-2 rounded-full px-2.5 py-2 transition-all duration-300 ${
          scrolled
            ? "border border-border bg-background/70 shadow-sm backdrop-blur-md"
            : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="Home" className="shrink-0 pl-1">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full object-cover ring-1 ring-border"
          />
        </Link>

        <ul className="flex items-center gap-0.5 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ${
                  isActive(link.href)
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-0.5 pr-1">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <SiGithub className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <FaLinkedin className="h-[18px] w-[18px]" />
          </a>
          <span className="mx-0.5 hidden h-4 w-px bg-border sm:block" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
