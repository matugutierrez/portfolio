import type { IconType } from "react-icons";
import {
  SiAmazonwebservices,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type TechMeta = {
  slug: string;
  name: string;
  color: string;
  icon: IconType;
  level: string;
  years: string;
  projects: string;
};

export const techs: TechMeta[] = [
  { slug: "react", name: "React", color: "#61dafb", icon: SiReact, level: "Avanzado", years: "+2", projects: "+14" },
  { slug: "next", name: "Next.js", color: "#ffffff", icon: SiNextdotjs, level: "Avanzado", years: "+2", projects: "+12" },
  { slug: "node", name: "Node.js", color: "#5fa04e", icon: SiNodedotjs, level: "Avanzado", years: "+2", projects: "+16" },
  { slug: "express", name: "Express", color: "#ffffff", icon: SiExpress, level: "Avanzado", years: "+2", projects: "+10" },
  { slug: "typescript", name: "TypeScript", color: "#3178c6", icon: SiTypescript, level: "Avanzado", years: "+2", projects: "+13" },
  { slug: "javascript", name: "JavaScript", color: "#f7df1e", icon: SiJavascript, level: "Avanzado", years: "+3", projects: "+20" },
  { slug: "python", name: "Python", color: "#3776ab", icon: SiPython, level: "Intermedio", years: "+2", projects: "+7" },
  { slug: "postgresql", name: "PostgreSQL", color: "#4169e1", icon: SiPostgresql, level: "Avanzado", years: "+2", projects: "+9" },
  { slug: "mongodb", name: "MongoDB", color: "#47a248", icon: SiMongodb, level: "Intermedio", years: "+2", projects: "+8" },
  { slug: "docker", name: "Docker", color: "#2496ed", icon: SiDocker, level: "Intermedio", years: "+1", projects: "+5" },
  { slug: "git", name: "Git", color: "#f05032", icon: SiGit, level: "Avanzado", years: "+3", projects: "+25" },
  { slug: "github", name: "GitHub", color: "#ffffff", icon: SiGithub, level: "Avanzado", years: "+3", projects: "+25" },
  { slug: "aws", name: "AWS", color: "#ff9900", icon: SiAmazonwebservices, level: "Intermedio", years: "+1", projects: "+4" },
  { slug: "tailwind", name: "Tailwind", color: "#06b6d4", icon: SiTailwindcss, level: "Avanzado", years: "+2", projects: "+15" },
  { slug: "prisma", name: "Prisma", color: "#ffffff", icon: SiPrisma, level: "Intermedio", years: "+1", projects: "+6" },
  { slug: "redis", name: "Redis", color: "#ff4438", icon: SiRedis, level: "Intermedio", years: "+1", projects: "+4" },
];

export function getTech(slug: string) {
  return techs.find((tech) => tech.slug === slug) ?? techs[0];
}
