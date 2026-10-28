import type { Localized } from "./translations";

export interface Project {
  id: string;
  category: string;
  title: string;
  summary: Localized;
  tech: string[];
  /** Kelas Tailwind untuk area preview (gradient + blur dekoratif). */
  previewGradient: string;
  previewGlow: string;
  /** Opsional: gambar preview di /public/projects/. Kosong = dekorasi gradient. */
  image?: string;
  /** Kosong = tombol ditandai "belum tersedia". Jangan isi dengan link palsu. */
  liveUrl: string;
  githubUrl: string;
  /** true = data contoh, tampil dengan label "Contoh" sampai Anda ganti jadi false. */
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    id: "nexura",
    category: "SAAS PLATFORM",
    title: "Nexura Cloud Engine",
    summary: {
      id: "Platform deployment otomatis dan analitik cluster multi-cloud dengan latensi rendah dan dashboard interaktif real-time.",
      en: "Automated deployment platform and multi-cloud cluster analytics with low latency and a real-time interactive dashboard.",
    },
    tech: ["Next.js", "Go"],
    previewGradient: "from-slate-900 to-teal-950/40",
    previewGlow: "bg-accent/10",
    liveUrl: "",
    githubUrl: "",
    placeholder: true,
  },
  {
    id: "Ever Green Lestari",
    category: "Custom Web App",
    title: "Ever Green Lestari",
    summary: {
      id: "Aggregator sistem pembayaran mikro dengan enkripsi end-to-end, webhook idempotency, dan audit trail otomatis.",
      en: "Micro-payment aggregator with end-to-end encryption, idempotent webhooks, and automatic audit trails.",
    },
    tech: ["React", "Nextjs","Firebase"],
    previewGradient: "from-slate-900 to-indigo-950/40",
    previewGlow: "bg-indigo-500/10",
    liveUrl: "",
    githubUrl: "",
    placeholder: true,
  },
  {
    id: "agribot",
    category: "SOFTWARE APPLICATION",
    title: "Agri Bot",
    summary: {
      id: "Aplikasi pemantauan lahan dan asisten keputusan tanam untuk petani, dengan pencatatan data lapangan dan ringkasan harian.",
      en: "Field monitoring app and planting decision assistant for farmers, with field data logging and daily summaries.",
    },
    tech: ["Flutter", "Node.js","firebase"],
    previewGradient: "from-slate-900 to-emerald-950/40",
    previewGlow: "bg-emerald-500/10",
    liveUrl: "",
    githubUrl: "",
    placeholder: true,
  },
];
