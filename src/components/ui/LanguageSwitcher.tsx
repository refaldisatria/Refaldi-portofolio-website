"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";
import { LANGS, type Lang } from "@/data/translations";

const NAMES: Record<Lang, string> = { id: "Bahasa Indonesia", en: "English" };

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.header.language}: ${NAMES[lang]}`}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-line bg-soft px-3 font-mono text-xs font-medium uppercase text-body transition-all hover:border-accent/40"
      >
        <span>{lang}</span>
        <FaChevronDown className={`text-[10px] text-muted transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="menu"
          aria-label={t.header.language}
          className="absolute right-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-lg border border-line bg-card py-1 shadow-xl"
        >
          {LANGS.map((l) => (
            <li key={l} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={lang === l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-soft ${
                  lang === l ? "text-accent-fg" : "text-body"
                }`}
              >
                <span>{NAMES[l]}</span>
                <span className="uppercase text-muted">{l}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
