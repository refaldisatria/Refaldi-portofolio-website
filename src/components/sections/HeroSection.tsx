"use client";

import Image from "next/image";
import { FaCode } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";
import SocialLinks from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export default function HeroSection({ hasPhoto }: { hasPhoto: boolean }) {
  const { lang, t } = useApp();
  const snip = profile.codeSnippet;

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-80px)] scroll-mt-20 items-center justify-center overflow-hidden px-6 py-12 md:px-12 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Kolom kiri */}
        <div className="z-10 flex min-w-0 flex-col justify-center space-y-6 lg:col-span-7">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.22em] text-accent-fg md:text-base">{t.hero.greeting}</p>

          <h1 className="font-display text-[clamp(2.25rem,9vw,4.75rem)] font-black uppercase leading-[0.95] tracking-tight">
            <span className="block break-words text-fg">{profile.nameLine1}</span>
            <span className="stroke-text -mt-1 block break-words md:-mt-2">{profile.nameLine2}</span>
          </h1>

          <p className="font-display text-2xl font-semibold leading-snug text-fg sm:text-3xl md:text-4xl">
            {t.hero.rolePrefix} <span className="font-bold text-accent-fg">{profile.roleHighlight}</span>
            <br className="hidden sm:inline" /> {profile.roleLine}
          </p>

          <p className="max-w-xl text-base font-normal leading-relaxed text-muted md:text-lg">{profile.description[lang]}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#proyek"
              className="glow-cyan inline-flex transform items-center justify-center gap-3 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110 active:scale-95"
            >
              <span>{t.hero.ctaProjects}</span>
              <span className="text-lg" aria-hidden="true">→</span>
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-transparent px-8 py-3.5 text-sm font-medium text-fg transition-all hover:border-accent/60 hover:bg-soft"
            >
              {t.hero.ctaContact}
            </a>
          </div>

          <SocialLinks />
        </div>

        {/* Kolom kanan: portal foto */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <div className="relative flex aspect-square w-full max-w-[320px] items-center justify-center sm:max-w-[420px] md:max-w-[460px]">
            <div className="hero-portal-ring absolute inset-0 rounded-full" />
            <div className="pointer-events-none absolute -inset-4 rounded-full border border-teal-500/10" />

            <div className="glow-portal group relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 shadow-2xl">
              {hasPhoto ? (
                <Image
                  src={profile.photo}
                  alt={`${t.hero.photoAlt}: ${profile.fullName}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 460px, (min-width: 640px) 420px, 320px"
                  className="object-cover object-center saturate-[1.05] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  role="img"
                  aria-label={t.hero.photoPlaceholder}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-[#10161a] to-[#0a2a29] px-8 text-center"
                >
                  <span className="font-display text-6xl font-black text-accent/80 sm:text-7xl">{profile.initials}</span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-slate-400 sm:text-xs">
                    <FaCode aria-hidden="true" /> {t.hero.photoPlaceholder}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Badge: Available for Work */}
            <div className="absolute -top-1 right-2 z-20 sm:right-6">
              <div className="inline-flex items-center gap-2.5 rounded-lg border border-teal-500/30 bg-[#0e1315]/90 px-4 py-2 font-mono text-[11px] font-medium tracking-wider text-slate-200 shadow-lg backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#00F2C3]" aria-hidden="true" />
                <span>{profile.availability.badge}</span>
              </div>
            </div>

            {/* Overlay kode */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 z-20 max-w-[280px] rounded-r-xl border border-l-4 border-white/10 border-l-[#00F2C3] bg-[#0c1012]/95 p-4 font-mono text-xs shadow-2xl backdrop-blur-md sm:-left-8 sm:max-w-[320px]"
            >
              <p className="text-[11px] text-slate-500">{snip.open}</p>
              <p className="py-1 pl-3 text-sm font-semibold text-white">
                {snip.prefix}
                <span className="text-[#00F2C3]">{snip.call}</span>()
              </p>
              <p className="text-[11px] text-slate-500">{snip.close}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
