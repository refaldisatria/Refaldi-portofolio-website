import { FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa6";
import { SiFlutter, SiPostgresql, SiTailwindcss, SiTypescript } from "react-icons/si";
import type { TechKey } from "@/data/skills";

const ICONS: Record<TechKey, React.ComponentType<{ className?: string }>> = {
  react: FaReact,
  node: FaNodeJs,
  ts: SiTypescript,
  flutter: SiFlutter,
  postgres: SiPostgresql,
  docker: FaDocker,
  tailwind: SiTailwindcss,
  git: FaGitAlt,
};

export default function TechIcon({ name, className }: { name: TechKey; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
