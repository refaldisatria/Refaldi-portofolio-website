"use client";

import { FaInstagram, FaLinkedinIn, FaTelegram, FaTiktok } from "react-icons/fa6";
import { profile, type SocialKey } from "@/data/profile";
import { useApp } from "@/components/providers/AppProvider";

const ICONS: Record<SocialKey, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  telegram: FaTelegram,
};

const base = "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-soft text-body transition-all duration-200";

export default function SocialLinks() {
  const { t } = useApp();
  return (
    <ul className="flex items-center gap-3.5 pt-4" aria-label={t.hero.socialLabel}>
      {profile.socials.map((s) => {
        const Icon = ICONS[s.key];
        return (
          <li key={s.key}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`${base} hover:border-accent hover:text-accent-fg`}
              >
                <Icon className="text-sm" />
              </a>
            ) : (
              <span
                role="img"
                aria-label={`${s.label} (${t.hero.unavailable})`}
                title={`${s.label}: ${t.hero.unavailable}`}
                className={`${base} cursor-not-allowed opacity-40`}
              >
                <Icon className="text-sm" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
