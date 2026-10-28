"use client";

import { useEffect, useState } from "react";
import { FaBars, FaRotateRight, FaXmark } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { profile } from "@/data/profile";

const LINKS = [
  { id: "hero", key: "home" },
  { id: "tentang", key: "about" },
  { id: "proyek", key: "projects" },
  { id: "kontak", key: "contact" },
  { id: "terminal", key: "terminal" },
] as const;

export default function Navbar() {
  const { t, replayBoot } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");

  // Tandai link aktif berdasarkan section yang sedang berada di tengah layar.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = (id: string) =>
    `py-1 transition-colors hover:text-accent-fg ${active === id ? "text-accent-fg" : "text-body"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-header backdrop-blur-md transition-colors duration-300">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-medium text-black focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {t.skipToContent}
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12">
        <a href="#hero" aria-label={t.header.home} className="group flex items-center gap-0.5 font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
          <span>{profile.brand}</span>
          <span className="text-accent-fg transition-transform duration-300 group-hover:scale-125">.</span>
        </a>

        <nav aria-label={t.header.mainNav} className="hidden items-center space-x-8 text-sm font-medium md:flex">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} className={linkClass(l.id)}>
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={replayBoot}
            aria-label={t.header.replayBoot}
            title={t.header.replayBoot}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-xs text-muted transition-all hover:border-accent/50 hover:text-accent-fg sm:flex"
          >
            <FaRotateRight aria-hidden="true" />
          </button>
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-body hover:text-fg md:hidden"
          >
            {menuOpen ? <FaXmark className="text-xl" aria-hidden="true" /> : <FaBars className="text-xl" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label={t.header.mobileNav}
          className="space-y-1 border-b border-line bg-alt px-6 pb-6 pt-2 text-sm font-medium md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={active === l.id ? "true" : undefined}
              className={`block py-3 transition-colors hover:text-accent-fg ${active === l.id ? "text-accent-fg" : "text-body"}`}
            >
              {l.key === "terminal" ? t.nav.terminalMobile : t.nav[l.key]}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              replayBoot();
            }}
            className="flex items-center gap-2 py-3 text-muted transition-colors hover:text-accent-fg sm:hidden"
          >
            <FaRotateRight aria-hidden="true" /> {t.header.replayBoot}
          </button>
        </nav>
      )}
    </header>
  );
}
