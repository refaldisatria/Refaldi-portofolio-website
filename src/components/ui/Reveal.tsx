"use client";

import { useEffect, useRef, useState } from "react";

/** Fade-in saat masuk viewport. Dinonaktifkan oleh prefers-reduced-motion (lihat globals.css). */
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
