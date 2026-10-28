/**
 * Penyimpanan preferensi (tema, bahasa, status boot) yang aman untuk SSR/hydration.
 * Dipakai lewat useSyncExternalStore: server selalu memakai nilai default,
 * klien menyesuaikan setelah hydration tanpa hydration mismatch.
 */
import type { Lang } from "@/data/translations";

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(cb: Listener): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function emit() {
  listeners.forEach((l) => l());
}

/* ---- Bahasa ---- */
export function readLang(): Lang {
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}
export function writeLang(lang: Lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    /* penyimpanan diblokir: abaikan, tetap berfungsi di sesi ini */
  }
  document.documentElement.lang = lang;
  memoryLang = lang;
  emit();
}
let memoryLang: Lang | null = null;
export function readLangSnapshot(): Lang {
  return memoryLang ?? readLang();
}

/* ---- Tema (class "dark" pada <html>; default dark) ---- */
export type Theme = "dark" | "light";
export function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
export function writeTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* abaikan */
  }
  emit();
}

/* ---- Boot: sudah diputar di sesi ini? ---- */
export function readBootSeen(): boolean {
  try {
    return sessionStorage.getItem("boot-seen") === "1";
  } catch {
    return false;
  }
}
export function writeBootSeen() {
  try {
    sessionStorage.setItem("boot-seen", "1");
  } catch {
    /* abaikan */
  }
}

/** Skrip inline kecil di <head>: terapkan tema/boot-seen sebelum paint agar tidak berkedip. */
export const PRE_HYDRATION_SCRIPT = `try{var d=document.documentElement;if(localStorage.getItem("theme")==="light")d.classList.remove("dark");if(sessionStorage.getItem("boot-seen")==="1")d.classList.add("boot-seen");if(localStorage.getItem("lang")==="en")d.lang="en"}catch(e){}`;
