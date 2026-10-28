"use client";

import { FaCodeBranch } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";
import PlaceholderTag from "@/components/ui/PlaceholderTag";
import Reveal from "@/components/ui/Reveal";
import { aboutText, experience, stats } from "@/data/experience";

export default function AboutSection() {
  const { lang, t } = useApp();
  return (
    <section id="tentang" className="scroll-mt-20 border-t border-line-soft bg-alt/80 px-6 py-20 md:px-12">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Kiri: bio */}
        <div className="space-y-6 lg:col-span-5">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-fg">{t.about.eyebrow}</span>
          <h2 className="font-display text-3xl font-bold text-fg">{t.about.heading}</h2>
          <p className="text-sm leading-relaxed text-muted">
            {aboutText.text[lang]}
            {aboutText.placeholder && <PlaceholderTag />}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((s) => (
              <div key={s.label.en} className="rounded-xl border border-line bg-soft p-4">
                <p className="font-display text-2xl font-bold text-accent-fg">{s.value[lang]}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {s.label[lang]}
                  {s.placeholder && <PlaceholderTag />}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: timeline */}
        <div className="space-y-6 lg:col-span-7">
          <h3 className="flex items-center gap-2 border-b border-line pb-3 font-mono text-lg text-fg">
            <FaCodeBranch className="text-accent-fg" aria-hidden="true" /> {t.about.timelineTitle}
          </h3>
          <ol className="ml-2 space-y-6 border-l-2 border-line pl-6">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period.en}`} className="group relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full transition ${
                    job.current ? "bg-accent group-hover:scale-125" : "bg-slate-500 group-hover:bg-accent"
                  }`}
                />
                <span className={`font-mono text-xs ${job.current ? "text-accent-fg" : "text-muted"}`}>{job.period[lang]}</span>
                <h4 className="mt-0.5 text-base font-bold text-fg">
                  {job.role[lang]}
                  {job.placeholder && <PlaceholderTag />}
                </h4>
                <p className="font-mono text-xs text-muted">
                  {job.company} • {job.type[lang]}
                </p>
                <p className="mt-2 text-sm text-muted">{job.description[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
