"use client";

import { useApp } from "@/components/providers/AppProvider";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const { t } = useApp();
  return (
    <section id="proyek" className="scroll-mt-20 px-6 py-24 md:px-12">
      <Reveal className="mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} titleClassName="text-3xl md:text-4xl" />
          <p className="max-w-md text-sm text-muted">{t.projects.intro}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
