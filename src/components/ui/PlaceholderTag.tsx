"use client";

import { useApp } from "@/components/providers/AppProvider";

/** Label kecil untuk data contoh. Hilang otomatis saat `placeholder: false` di file data. */
export default function PlaceholderTag() {
  const { t } = useApp();
  return (
    <span className="ml-2 rounded border border-amber-500/40 px-1.5 py-px align-middle font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
      {t.placeholder}
    </span>
  );
}
