"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { dictionary, type Dictionary, type Lang } from "@/data/translations";
import { readLangSnapshot, readTheme, subscribe, writeLang, writeTheme, type Theme } from "@/lib/prefs";
import BootScreen from "@/components/ui/BootScreen";

interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
  theme: Theme;
  toggleTheme: () => void;
  replayBoot: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam <AppProvider>");
  return ctx;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  // Server selalu "id"/"dark"; klien menyesuaikan setelah hydration (tanpa mismatch).
  const lang = useSyncExternalStore(subscribe, readLangSnapshot, () => "id" as Lang);
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const [bootRun, setBootRun] = useState(0);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);
  const toggleTheme = useCallback(() => writeTheme(readTheme() === "dark" ? "light" : "dark"), []);
  const replayBoot = useCallback(() => setBootRun((n) => n + 1), []);

  const value = useMemo<AppContextValue>(
    () => ({ lang, setLang, t: dictionary[lang], theme, toggleTheme, replayBoot }),
    [lang, setLang, theme, toggleTheme, replayBoot],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* key = bootRun: setiap replay me-remount komponen sehingga state-nya bersih. */}
      <BootScreen key={bootRun} forceRun={bootRun > 0} />
    </AppContext.Provider>
  );
}
