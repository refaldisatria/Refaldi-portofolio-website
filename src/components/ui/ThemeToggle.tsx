"use client";

import { FaMoon, FaSun } from "react-icons/fa6";
import { useApp } from "@/components/providers/AppProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, t } = useApp();
  const label = theme === "dark" ? t.header.toggleToLight : t.header.toggleToDark;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-sm text-muted transition-all hover:border-accent/50 hover:text-amber-500"
    >
      {/* Ikon dipilih via CSS (class "dark" di <html>) agar tidak ada flicker/mismatch. */}
      <FaMoon className="hidden dark:block" aria-hidden="true" />
      <FaSun className="text-amber-500 dark:hidden" aria-hidden="true" />
    </button>
  );
}
