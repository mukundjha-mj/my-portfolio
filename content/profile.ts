/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to make the portfolio yours.
 *  Everything the site renders (name, links, experience, projects,
 *  skills, etc.) is driven from here.
 * ─────────────────────────────────────────────────────────────
 */

export type Skill = string;

export type Experience = {
  company: string;
  role: string;
  companyUrl?: string;
  period: string;
  current?: boolean;
  logo?: string; // path in /public, optional
  bullets: string[];
  tech?: Skill[]; // shown as small icons under the entry
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  logo?: string;
};

export type Project = {
  name: string;
  description: string;
  url?: string;
  repo?: string;
  logo?: string; // path in /public, optional
  tags?: string[];
  featured?: boolean;
};

export const profile = {
  // ── Identity ────────────────────────────────────────────────
  name: "Balmukund Jha",
  firstName: "Balmukund",
  role: "Backend & Full-Stack Developer",
  verified: true,
  siteUrl: "https://balmukundjha.dev",
  metaDescription:
    "Backend-focused full-stack developer building scalable systems, APIs, and products that ship.",

  // ── Hero ────────────────────────────────────────────────────
  photo: "/me.svg",
  tagline:
    "Backend-focused full-stack developer who loves building scalable systems and shipping real products.",
  intro:
    "MCA student at VIT Vellore building backend systems that actually ship. Currently a Web Developer Intern at The Dark Store India, working on e-commerce backends, third-party API integrations, and performance.",

  // Monospace fact list under the intro
  currentRole: "Web Developer Intern",
  currentCompany: "The Dark Store India",
  currentCompanyUrl: "#",
  location: "Vellore, India",
  email: "mukundjha204@gmail.com",
  phone: "+91 82944 95929",
  // Optional highlight line (set to null to hide). e.g. a ranking or credential.
  highlight: null as { label: string; url: string } | null,
  schoolLine: "MCA @ VIT Vellore, graduating 2026",

  // ── Contribution graph ──────────────────────────────────────
  // The heat-map is now pulled live from GitHub via `githubUsername`.
  // `year` is still used for the footer copyright line.
  contributions: { year: 2026 },
  githubUsername: "mukundjha-mj",

  // ── Socials ─────────────────────────────────────────────────
  socials: {
    github: "https://github.com/mukundjha-mj",
    linkedin: "https://www.linkedin.com/in/mukundjha-mj/",
    email: "mailto:mukundjha204@gmail.com",
    bookCall: "mailto:mukundjha204@gmail.com",
  },

  // ── Skills / tech stack ─────────────────────────────────────
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "REST APIs",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Prisma",
    "Redis",
    "RabbitMQ",
    "JWT",
    "Docker",
    "Linux",
    "Git",
    "GitHub",
  ] satisfies Skill[],

  // ── Experience ──────────────────────────────────────────────
  experiences: [
    {
      company: "The Dark Store India Pvt. Ltd.",
      role: "Web Developer Intern",
      period: "Jun 2026 – Present",
      current: true,
      bullets: [
        "Integrated third-party APIs and services to support core business and operational workflows, handling request/response logic and error handling.",
        "Built and maintained backend logic for e-commerce workflows, working with data layers to support dynamic storefront functionality.",
        "Collaborated with stakeholders to translate business requirements into scalable, maintainable web solutions.",
        "Optimized application performance through efficient data handling and reduced load times across key user flows.",
      ],
      tech: ["Node.js", "Express", "JavaScript", "MongoDB", "REST APIs"],
    },
  ] satisfies Experience[],

  // ── Education ────────────────────────────────────────────────
  education: [
    {
      school: "Vellore Institute of Technology",
      degree: "Master of Computer Applications",
      period: "2024 – 2026",
    },
    {
      school: "Munger University",
      degree: "Bachelor of Computer Applications",
      period: "2020 – 2024",
    },
  ] satisfies Education[],

  // ── Projects ─────────────────────────────────────────────────
  projects: [
    {
      name: "CuraNet — Healthcare Records & Consent Management",
      description:
        "An EHR platform supporting 12 core workflows, 25+ REST endpoints, RBAC, and PostgreSQL-backed patient records with a 15+ table relational schema via Prisma. Includes consent-based access control (grant, revoke, time-limit) with full audit logging and a Universal Health ID for portable records across providers.",
      url: "http://curanet.in/",
      repo: "https://github.com/mukundjha-mj/curanet-backend",
      tags: ["Node.js", "Express", "TypeScript", "React", "PostgreSQL", "Prisma", "JWT"],
      featured: true,
    },
    {
      name: "Microservices Uber Backend",
      description:
        "A scalable ride-hailing backend built with a microservices architecture — secure JWT auth, trip booking workflows, and driver–passenger matching with real-time inter-service communication via message queues. Database indexing and query optimization cut API response time by 35%.",
      repo: "https://github.com/mukundjha-mj/Microservices-Uber-Backend",
      tags: ["Node.js", "Express", "MongoDB", "RabbitMQ", "JWT"],
      featured: true,
    },
    {
      name: "NetShield — Network Control & Website Blocking Tool",
      description:
        "A system-level network filtering tool that blocks distracting websites using domain- and keyword-based rules across HTTP/HTTPS traffic. Built a local proxy server and DNS filter in Node.js to inspect requests and enforce rules in real time, with a REST API and CLI for ban/unban workflows and Windows proxy automation.",
      repo: "https://github.com/mukundjha-mj/netshield",
      tags: ["Node.js", "Express", "JavaScript", "CLI"],
    },
  ] satisfies Project[],

  // ── Footer ───────────────────────────────────────────────────
  footerBio:
    "Backend & full-stack developer. I build scalable systems, clean APIs, and products people actually use.",
  footerHandle: "@mukundjha-mj",
} as const;

export type Profile = typeof profile;
