import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import { profile } from "@/data/profile";
import { PRE_HYDRATION_SCRIPT } from "@/lib/prefs";
import { getSiteUrl } from "@/lib/site";

const title = `${profile.brand} | ${profile.fullName} - ${profile.roleHighlight} / ${profile.roleLine}`;
const description = profile.description.id;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  applicationName: profile.brand,
  authors: [{ name: profile.fullName }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.brand,
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "/",
  },
  twitter: { card: "summary", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0e",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // "dark" = tema default. suppressHydrationWarning karena skrip pra-hydration bisa mengubah class/lang.
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        {/* Skrip statis (bukan input pengguna): terapkan tema & status boot sebelum paint. */}
        <script dangerouslySetInnerHTML={{ __html: PRE_HYDRATION_SCRIPT }} />
        <noscript>
          <style>{`#boot-screen{display:none!important}.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-screen overflow-x-hidden bg-bg font-sans text-body">
        {/* Ambient glow */}
        <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full blur-[140px]" style={{ background: "var(--glow-a)" }} />
        <div aria-hidden="true" className="pointer-events-none fixed bottom-10 right-0 -z-10 h-[600px] w-[600px] rounded-full blur-[160px]" style={{ background: "var(--glow-b)" }} />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
