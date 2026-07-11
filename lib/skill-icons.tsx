import type { ComponentType, CSSProperties } from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiElasticsearch,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiSequelize,
  SiApachekafka,
  SiDocker,
  SiLinux,
  SiNginx,
  SiCloudflare,
  SiVercel,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiUbuntu,
  SiPostman,
  SiExpress,
  SiSocketdotio,
  SiJsonwebtokens,
  SiLangchain,
} from "react-icons/si";
import {
  Waypoints,
  ListOrdered,
  Sparkles,
  Cloud,
  Code2,
  Drama,
} from "lucide-react";

type IconCmp = ComponentType<{
  className?: string;
  style?: CSSProperties;
}>;

export type SkillIcon = { Icon: IconCmp; color: string };

/** Map a skill name (from content/profile.ts) to a brand logo + brand color. */
export const SKILL_ICONS: Record<string, SkillIcon> = {
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Java: { Icon: SiOpenjdk, color: "#ED8B00" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "currentColor" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Express: { Icon: SiExpress, color: "currentColor" },
  WebSocket: { Icon: Waypoints, color: "currentColor" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  RabbitMQ: { Icon: SiRabbitmq, color: "#FF6600" },
  BullMQ: { Icon: ListOrdered, color: "currentColor" },
  Elasticsearch: { Icon: SiElasticsearch, color: "#43C3B0" },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Prisma: { Icon: SiPrisma, color: "currentColor" },
  Sequelize: { Icon: SiSequelize, color: "#52B0E7" },
  Kafka: { Icon: SiApachekafka, color: "currentColor" },
  JWT: { Icon: SiJsonwebtokens, color: "currentColor" },
  "REST APIs": { Icon: Waypoints, color: "currentColor" },
  "AI SDK": { Icon: Sparkles, color: "currentColor" },
  Azure: { Icon: Cloud, color: "#0078D4" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Linux: { Icon: SiLinux, color: "currentColor" },
  Nginx: { Icon: SiNginx, color: "#009639" },
  Cloudflare: { Icon: SiCloudflare, color: "#F38020" },
  Vercel: { Icon: SiVercel, color: "currentColor" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "currentColor" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  Ubuntu: { Icon: SiUbuntu, color: "#E95420" },
  Playwright: { Icon: Drama, color: "#2EAD33" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  "Socket.io": { Icon: SiSocketdotio, color: "currentColor" },
  LangGraph: { Icon: SiLangchain, color: "currentColor" },
};

const FALLBACK: SkillIcon = { Icon: Code2, color: "currentColor" };

export function getSkillIcon(name: string): SkillIcon {
  return SKILL_ICONS[name] ?? FALLBACK;
}
