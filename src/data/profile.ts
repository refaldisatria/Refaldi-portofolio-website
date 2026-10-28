import type { Localized } from "./translations";

/**
 * PLACEHOLDER: semua nilai di file ini adalah contoh. Ganti dengan data Anda.
 * URL kosong ("") = tautan disembunyikan / ditandai "belum tersedia".
 */
export type SocialKey = "linkedin" | "instagram" | "tiktok" | "telegram";
export interface SocialLink { key: SocialKey; label: string; url: string }

export const profile: {
  brand: string; initials: string; nameLine1: string; nameLine2: string; fullName: string;
  roleHighlight: string; roleLine: string; description: Localized; bio: Localized;
  email: string; locationLine: Localized; locationNote: Localized; responseNote: Localized;
  availability: { badge: string; status: Localized };
  codeSnippet: { open: string; call: string; prefix: string; close: string };
  photo: string; socials: SocialLink[]; footerLinks: { github: string; linkedin: string }; telegramHandle: string;
} = {
  brand: "BimaSatyaDev",
  initials: "BS",
  nameLine1: "MUH REFALDI SATRIA",
  nameLine2: "DANENDRA",
  fullName: "Muh Refaldi Satria Danendra",
  roleHighlight: "Full-stack Developer",
  roleLine: "Web & Software Engineer",
  description: {
    id: "Saya merancang dan membangun aplikasi web modern dari antarmuka hingga sistem backend yang cepat, aman, dan mudah dikembangkan.",
    en: "I design and build modern web applications, from the interface to backend systems that are fast, secure, and easy to extend.",
  },
  bio: {
    id: "Full-stack Developer yang berfokus pada arsitektur web berperforma tinggi, sistem backend andal, dan desain antarmuka modern.",
    en: "A Full-stack Developer focused on high-performance web architecture, reliable backend systems, and modern interface design.",
  },
  /** Isi dengan email asli Anda, mis. "halo@domain-anda.com". Kosong = kartu menampilkan "belum diatur". */
  email: "",
  locationLine: { id: "Indonesia (GMT+7 / WIB)", en: "Indonesia (GMT+7 / WIB)" },
  locationNote: { id: "Tersedia untuk kerja Remote & Onsite.", en: "Available for Remote & Onsite work." },
  responseNote: { id: "Respons rata-rata dalam 24 jam kerja.", en: "Average response within 24 business hours." },
  availability: {
    badge: "AVAILABLE FOR WORK",
    status: { id: "Terbuka untuk freelance & full-time", en: "Open for freelance & full-time roles" },
  },
  codeSnippet: { open: "<fullstack-developer>", call: "intoReality", prefix: "ideas.", close: "</fullstack-developer>" },
  /** Path foto di folder /public. Jika file tidak ada, placeholder ditampilkan. */
  photo: "/profil.png",
  socials: [
    { key: "linkedin", label: "LinkedIn", url: "www.linkedin.com/in/muhammad-refaldi-satria-danendra-841609350" },
    { key: "instagram", label: "Instagram", url: "https://www.instagram.com/refaldisd__/" },
    { key: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@refaldidanendra?is_from_webapp=1&sender_device=pc" },
    { key: "telegram", label: "Telegram", url: "https://t.me/Danendrasatria" },
  ],
  footerLinks: { github: "https://github.com/refaldisatria", linkedin: "www.linkedin.com/in/muhammad-refaldi-satria-danendra-841609350" },
  telegramHandle: "",
};
