"use client";

import Image from "next/image";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useApp();
  const unavailable = t.projects.unavailable;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all hover:border-accent/50">
      {/* Area visual / preview (selalu gelap, seperti "layar" proyek) */}
      <div className={`relative flex h-48 flex-col justify-between overflow-hidden border-b border-line bg-linear-to-tr p-6 ${project.previewGradient}`}>
        {project.image && (
          <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-40" />
        )}
        <div className={`absolute -bottom-4 -right-4 h-32 w-32 rounded-full blur-2xl ${project.previewGlow}`} aria-hidden="true" />
        <span className="relative font-mono text-xs font-semibold text-[#00F2C3]">
          {project.category}
          {project.placeholder && <PlaceholderTag />}
        </span>
        <h3 className="relative font-display text-xl font-bold text-white transition-colors group-hover:text-[#00F2C3]">{project.title}</h3>
        <ul className="relative flex gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded bg-black/40 px-2 py-0.5 font-mono text-[11px] text-slate-300">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-6 p-6">
        <p className="text-sm leading-relaxed text-muted">{project.summary[lang]}</p>
        <div className="flex items-center justify-between border-t border-line-soft pt-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-accent-fg hover:underline"
            >
              {t.projects.live} <FaArrowUpRightFromSquare className="text-[10px]" aria-hidden="true" />
              <span className="sr-only"> — {project.title}</span>
            </a>
          ) : (
            <span className="flex cursor-not-allowed items-center gap-1 font-mono text-xs text-muted opacity-60" aria-disabled="true">
              {t.projects.live}: {unavailable}
            </span>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projects.github}: ${project.title}`}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              <FaGithub aria-hidden="true" />
            </a>
          ) : (
            <span
              role="img"
              aria-label={`GitHub: ${unavailable}`}
              title={`GitHub: ${unavailable}`}
              className="cursor-not-allowed text-sm text-muted opacity-40"
            >
              <FaGithub aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
