"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { readBootSeen, subscribe, writeBootSeen } from "@/lib/prefs";

const STEPS = [
  { p: 25, status: "Loading kernel core...", log: "[0.024s] Kernel modules initialized." },
  { p: 55, status: "Mounting portfolio stack...", log: "[0.052s] Next.js & UI engines online." },
  { p: 85, status: "Resolving network sockets...", log: "[0.088s] Security certificates verified." },
  { p: 100, status: "System Ready!", log: "[0.120s] Starting BimaSatyaDev environment." },
];

type Phase = "running" | "fading" | "hidden";

export default function BootScreen({ forceRun }: { forceRun: boolean }) {
  // Sudah diputar di sesi ini? -> lewati (kecuali replay manual). Server selalu false.
  const seen = useSyncExternalStore(subscribe, readBootSeen, () => false);
  const skip = seen && !forceRun;

  const [phase, setPhase] = useState<Phase>("running");
  const [step, setStep] = useState(0); // jumlah langkah yang sudah tampil

  useEffect(() => {
    if (skip) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = reduce ? 90 : 260;
    const fade = reduce ? 0 : 600;
    const timers: number[] = [];

    let n = 0;
    const interval = window.setInterval(() => {
      n += 1;
      setStep(n);
      if (n >= STEPS.length) {
        window.clearInterval(interval);
        timers.push(
          window.setTimeout(() => {
            setPhase("fading");
            timers.push(
              window.setTimeout(() => {
                writeBootSeen();
                setPhase("hidden");
              }, fade),
            );
          }, reduce ? 100 : 350),
        );
      }
    }, gap);

    return () => {
      window.clearInterval(interval);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [skip]);

  if (skip || phase === "hidden") return null;

  const current = step > 0 ? STEPS[step - 1] : null;
  const percent = current ? current.p : 15;
  const status = current ? current.status : "Loading memory stack...";

  return (
    <div
      id="boot-screen"
      role="status"
      aria-live="polite"
      aria-label="System boot"
      className={`fixed inset-0 z-50 flex select-none flex-col items-center justify-center bg-[#07090a] p-6 font-mono text-xs text-[#00F2C3] transition-opacity duration-700 md:text-sm ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md space-y-4 rounded-xl border border-teal-500/20 bg-[#111518] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="flex items-center gap-2 font-semibold">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#00F2C3]" />
            SYS_BOOT // BIMASATYADEV_CORE
          </span>
          <span className="text-xs text-slate-400">v2.4.0</span>
        </div>
        <div className="min-h-[110px] space-y-1 font-mono text-slate-300">
          <p className="text-slate-400">[0.001s] Initializing kernel modules...</p>
          {STEPS.slice(0, step).map((s) => (
            <p key={s.p} className="text-slate-300">{s.log}</p>
          ))}
        </div>
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between font-mono text-[11px] text-slate-400">
            <span>{status}</span>
            <span>{percent}%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Boot progress"
          >
            <div className="h-full bg-[#00F2C3] transition-all duration-300 ease-out" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
