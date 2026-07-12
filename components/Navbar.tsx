"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LiveActivity } from "./LiveActivity";
import { Avatar } from "@/components/ui/Avatar";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and lock body scroll while open.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-2xl items-center justify-between gap-2 rounded-full px-2.5 py-2 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border border-border bg-background/70 shadow-sm backdrop-blur-md"
            : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="Home" className="shrink-0 pl-1">
          <Avatar size={30} />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-0.5 text-sm sm:flex">
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
          {/* Socials + theme toggle stay visible on desktop; hidden on
              mobile where they live inside the dropdown instead. */}
          <LiveActivity className="hidden sm:flex" />
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground sm:inline-flex"
          >
            <SiGithub className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground sm:inline-flex"
          >
            <FaLinkedin className="h-[18px] w-[18px]" />
          </a>
          <span className="mx-0.5 hidden h-4 w-px bg-border sm:block" />
          <ThemeToggle />

          {/* Mobile-only hamburger toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground sm:hidden"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-2xl sm:hidden">
          <div className="rounded-2xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur-md">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                      isActive(link.href)
                        ? "font-medium text-foreground"
                        : "text-muted hover:bg-surface-2 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mx-2 my-1.5 h-px bg-border" />
            <div className="flex flex-wrap items-center gap-1 px-2 py-1">
              <LiveActivity className="flex" />
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <SiGithub className="h-[18px] w-[18px]" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <FaLinkedin className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
