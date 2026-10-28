"use client";

import { useApp } from "@/components/providers/AppProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";
import { techStack } from "@/data/skills";

export default function TechStackSection() {
  const { t } = useApp();
  return (
    <section id="tech" className="scroll-mt-20 border-y border-line-soft bg-alt/60 py-16">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          eyebrow={t.tech.eyebrow}
          title={t.tech.title}
          className="mx-auto mb-10 max-w-xl text-center"
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {techStack.map((tech) => (
            <li
              key={tech.key}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-line-soft bg-soft p-4 text-center transition-all hover:border-accent/40"
            >
              <TechIcon name={tech.key} className={`text-2xl transition-transform group-hover:scale-110 ${tech.color}`} />
              <span className="font-mono text-xs font-medium text-body">{tech.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
