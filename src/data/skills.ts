/** Daftar kartu Tech Stack (urutan = urutan tampil) + daftar skill untuk perintah `skills`. */
export type TechKey = "react" | "node" | "ts" | "flutter" | "postgres" | "docker" | "tailwind" | "git";

export const techStack: { key: TechKey; name: string; color: string }[] = [
  { key: "react", name: "React / Next.js", color: "text-cyan-600 dark:text-cyan-400" },
  { key: "node", name: "Node.js", color: "text-emerald-600 dark:text-emerald-400" },
  { key: "ts", name: "TypeScript", color: "text-blue-600 dark:text-blue-400" },
  { key: "flutter", name: "Flutter", color: "text-sky-600 dark:text-sky-400" },
  { key: "postgres", name: "PostgreSQL", color: "text-blue-600 dark:text-blue-400" },
  { key: "docker", name: "Docker", color: "text-blue-600 dark:text-blue-500" },
  { key: "tailwind", name: "Tailwind CSS", color: "text-teal-600 dark:text-teal-300" },
  { key: "git", name: "Git / CI/CD", color: "text-orange-600 dark:text-orange-400" },
];

/** PLACEHOLDER: sesuaikan dengan keahlian Anda. */
export const skillList: string[] = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Flutter",
  "PostgreSQL", "Docker", "Tailwind CSS", "Git", "CI/CD", "REST API",
];
