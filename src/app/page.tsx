import { existsSync } from "node:fs";
import path from "node:path";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TerminalSection from "@/components/sections/TerminalSection";
import FloatingBadge from "@/components/ui/FloatingBadge";
import { profile } from "@/data/profile";

export default function Home() {
  // Dicek saat build/render di server: jika foto belum ada, tampilkan placeholder (bukan gambar rusak).
  const hasPhoto = existsSync(path.join(process.cwd(), "public", profile.photo.replace(/^\//, "")));

  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection hasPhoto={hasPhoto} />
        <TechStackSection />
        <ProjectsSection />
        <AboutSection />
        <TerminalSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingBadge />
    </>
  );
}
