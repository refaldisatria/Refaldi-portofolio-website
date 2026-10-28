import type { Localized } from "./translations";

/** PLACEHOLDER: seluruh angka dan riwayat karier di bawah adalah contoh. Ganti dengan data asli Anda. */
export const stats: { value: Localized; label: Localized; placeholder: boolean }[] = [
  { value: { id: "1+ Thn", en: "1+ Yrs" }, label: { id: "Pengalaman Kerja", en: "Work Experience" }, placeholder: true },
  { value: { id: "3+", en: "3+" }, label: { id: "Proyek Selesai", en: "Projects Done" }, placeholder: true },
];

export const aboutText: { text: Localized; placeholder: boolean } = {
  text: {
    id: "Berpengalaman membangun aplikasi berbasis web berskala enterprise. Berfokus pada arsitektur perangkat lunak yang tangguh, clean code, serta pengalaman antarmuka yang intuitif dan responsif.",
    en: "Experienced in building enterprise-scale web applications. Focused on robust software architecture, clean code, and intuitive, responsive interface experiences.",
  },
  placeholder: true,
};

export interface Experience {
  period: Localized;
  role: Localized;
  company: string;
  type: Localized;
  description: Localized;
  current: boolean;
  placeholder: boolean;
}

export const experience: Experience[] = [
  {
    period: { id: "2024 - Sekarang", en: "2024 - Present" },
    role: { id: "Lead Full-stack Developer", en: "Lead Full-stack Developer" },
    company: "Coe Interest",
    type: { id: "Full-time", en: "Full-time" },
    description: {
      id: "Memimpin tim rekayasa perangkat lunak dalam perancangan arsitektur microservices dan integrasi sistem pembayaran multi-tenant.",
      en: "Leading the software engineering team in designing a microservices architecture and integrating a multi-tenant payment system.",
    },
    current: true,
    placeholder: true,
  },
  {
    period: { id: "2026 - Sekarang", en: "2026 - Sekarang" },
    role: { id: "Frontend Engineer", en: "Frontend Backend Engineer" },
    company: "La Praise Dessert",
    type: { id: "Yogyakarta", en: "Yogyakarta" },
    description: {
      id: "Mengembangkan RESTful dan GraphQL API berperforma tinggi dengan database PostgreSQL dan optimasi Redis caching.",
      en: "Built high-performance RESTful and GraphQL APIs with PostgreSQL and Redis caching optimization.",
    },
    current: false,
    placeholder: true,
  },
];
