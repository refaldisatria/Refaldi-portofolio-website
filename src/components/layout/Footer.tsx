"use client";

import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/data/profile";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href) {
    return (
      <span className="cursor-not-allowed opacity-50" title="—" aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent-fg">
      {children}
    </a>
  );
}

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t border-line bg-bg px-6 py-10 md:px-12 dark:bg-[#07090a]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 font-mono text-xs text-muted md:flex-row">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <span className="font-display text-base font-bold text-fg">
            {profile.brand}
            <span className="text-accent-fg">.</span>
          </span>
          <span>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.fullName}. {t.footer.rights}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#hero" className="transition-colors hover:text-accent-fg">
            {t.footer.backToTop} ↑
          </a>
          <FooterLink href={profile.footerLinks.github}>{t.footer.github}</FooterLink>
          <FooterLink href={profile.footerLinks.linkedin}>{t.footer.linkedin}</FooterLink>
        </div>
      </div>
    </footer>
  );
}
