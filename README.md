# BimaSatyaDev — Portfolio (Next.js)

Website portofolio one-page: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Desain mengikuti file referensi HTML (dark developer aesthetic, aksen cyan `#00F2C3`).

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local   # lalu isi nilainya (lihat bagian "Form kontak")
npm run dev                  # http://localhost:3000
```

Skrip lain: `npm run lint` · `npm run typecheck` · `npm run build` · `npm start`

## Yang WAJIB Anda ganti (placeholder)

Semua konten ada di `src/data/`, terpisah dari UI.

| File | Isi yang perlu diganti |
|---|---|
| `src/data/profile.ts` | Nama, jabatan, deskripsi, bio, **email**, lokasi, status ketersediaan, **URL sosial** (LinkedIn/Instagram/TikTok/Telegram), link footer (GitHub/LinkedIn), handle Telegram |
| `public/profile.jpg` | **Foto profil Anda.** Jika file belum ada, otomatis tampil placeholder inisial |
| `src/data/projects.ts` | Tiga proyek contoh: judul, kategori, ringkasan, teknologi, `liveUrl`, `githubUrl`. Set `placeholder: false` agar label "Contoh" hilang. Gambar preview opsional di `public/projects/` (isi field `image`) |
| `src/data/experience.ts` | Statistik ("5+ Thn", "40+"), teks About, dan riwayat karier. **Seluruhnya contoh**, bukan data Anda |
| `src/data/skills.ts` | Daftar kartu tech stack dan daftar skill untuk perintah `skills` |
| `src/data/translations.ts` | Semua teks UI dalam Bahasa Indonesia dan Inggris |
| `src/app/layout.tsx` | Metadata SEO (otomatis dari `profile.ts`) |

Aturan tautan: URL yang dikosongkan (`""`) **tidak dirender sebagai link**. Tombol/ikon tampil redup dan ditandai "belum tersedia".
Tidak ada link palsu yang tampak berfungsi.

## Form kontak (pengiriman pesan nyata)

Form memanggil `POST /api/contact` (`src/app/api/contact/route.ts`) yang melakukan:
validasi di server, honeypot anti-bot, pengecekan origin, batas 5 pesan/10 menit per IP,
pembersihan karakter kontrol (anti header-injection), dan pengiriman email teks-polos via [Resend](https://resend.com).

1. Buat akun Resend dan API key di <https://resend.com/api-keys>.
2. Verifikasi domain Anda di Resend (untuk uji coba bisa memakai `onboarding@resend.dev`, tetapi hanya dapat mengirim ke email akun Resend Anda).
3. Isi variabel (di `.env.local` untuk lokal, di Vercel → Settings → Environment Variables untuk produksi):

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=kotak-masuk-anda@domain.com
CONTACT_FROM_EMAIL=Portfolio <kontak@domain-terverifikasi.com>
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
```

Jika tiga variabel pertama belum diisi, form menampilkan pesan kegagalan dengan instruksi konfigurasi
(bukan pesan sukses palsu). Kredensial hanya dibaca di server, tidak pernah dikirim ke klien.

> **Catatan rate limit:** penghitung in-memory bersifat per-instance di serverless, jadi hanya perlindungan dasar.
> Untuk produksi serius aktifkan Vercel Firewall / Attack Challenge Mode atau pakai Upstash Ratelimit.

Ingin layanan lain (SendGrid, SMTP, Formspree)? Ganti blok `fetch("https://api.resend.com/emails", …)` di `route.ts`.

## Deploy ke Vercel

1. Push proyek ke GitHub/GitLab/Bitbucket.
2. Di <https://vercel.com/new> impor repositori. Framework terdeteksi otomatis (Next.js), tanpa setelan build khusus.
3. Tambahkan environment variables di atas, lalu **Deploy**.
4. Setelah domain final ada, set `NEXT_PUBLIC_SITE_URL` ke domain tersebut dan redeploy (dipakai oleh Open Graph, `sitemap.xml`, `robots.txt`).

Atau via CLI: `npm i -g vercel && vercel --prod`.

## Struktur

```
src/
  app/            layout.tsx · page.tsx · globals.css · icon.svg · sitemap.ts · robots.ts
    api/contact/  route.ts (validasi server, rate limit, kirim email)
  components/
    layout/       Navbar · Footer
    sections/     Hero · TechStack · Projects · About · Terminal · Contact
    ui/           BootScreen · ThemeToggle · LanguageSwitcher · ProjectCard · SocialLinks · SectionHeading · Reveal · …
    providers/    AppProvider (bahasa, tema, replay boot)
  data/           profile · projects · experience · skills · translations
  lib/            validation (dipakai klien+server) · prefs · site · utils
```

## Catatan teknis

- **Tema:** class `dark` pada `<html>`, default dark, tersimpan di `localStorage`. Skrip kecil di `<head>` menerapkan tema sebelum paint (tanpa kedip). Warna memakai CSS variable di `globals.css`.
- **Bahasa:** ID/EN, tersimpan di `localStorage`; seluruh konten (termasuk data proyek/pengalaman dan output terminal) ikut berganti.
- **Boot screen:** diputar sekali per sesi tab; tombol replay (⟳) di navbar memutarnya lagi. `prefers-reduced-motion` mempercepat/menghilangkan animasi.
- **Font:** self-hosted lewat paket `@fontsource-variable/*` (Inter, Space Grotesk, JetBrains Mono): tanpa request ke Google saat runtime, tanpa layout shift.
- **Ikon:** `react-icons` (Font Awesome 6 & Simple Icons), sama dengan ikon referensi. Hanya ikon yang dipakai yang masuk bundle.
- **Terminal:** perintah `help`, `skills`, `bio`, `contact`, `clear` (+ riwayat dengan ↑/↓). Output dirender sebagai elemen React biasa, tanpa `dangerouslySetInnerHTML`.
