"use client";

import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/data/profile";

/** Badge mengambang kanan-bawah (ada di referensi). Berfungsi sebagai tombol kembali ke atas. */
export default function FloatingBadge() {
  const { t } = useApp();
  return (
    <aside className="fixed bottom-6 right-6 z-30 hidden sm:block">
      <a
        href="#hero"
        aria-label={t.hero.backToTop}
        title={t.hero.backToTop}
        className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-card/90 shadow-xl backdrop-blur-md transition-all hover:border-accent"
      >
        <span className="font-display text-sm font-black tracking-tighter text-fg transition-colors group-hover:text-accent-fg">
          {profile.initials}
          <span className="text-accent-fg">.</span>
        </span>
      </a>
    </aside>
  );
}
