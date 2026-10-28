"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { skillList } from "@/data/skills";

type Entry =
  | { id: number; kind: "welcome" }
  | { id: number; kind: "cmd"; text: string }
  | { id: number; kind: "help" | "skills" | "bio" | "contact" }
  | { id: number; kind: "unknown"; text: string };

const COMMANDS = ["help", "skills", "bio", "contact", "clear"] as const;
const MAX_ENTRIES = 200;
const PROMPT = "BimaSatyadev:~$";

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-[#00F2C3]">{children}</span>;
}

export default function TerminalSection() {
  const { lang, t } = useApp();
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, kind: "welcome" }]);
  const [value, setValue] = useState("");
  const nextId = useRef(1);
  const history = useRef<string[]>([]);
  const historyIdx = useRef(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll hanya kontainer terminal (bukan halaman) ke output terbaru.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const run = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    history.current.push(text);
    historyIdx.current = -1;
    const cmd = text.toLowerCase();

    if (cmd === "clear") {
      setEntries([]);
      return;
    }
    const id = () => nextId.current++;
    const echo: Entry = { id: id(), kind: "cmd", text };
    const result: Entry =
      cmd === "help" || cmd === "skills" || cmd === "bio" || cmd === "contact"
        ? { id: id(), kind: cmd }
        : { id: id(), kind: "unknown", text };
    setEntries((prev) => [...prev, echo, result].slice(-MAX_ENTRIES));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    if (e.key === "ArrowUp" && h.length) {
      e.preventDefault();
      historyIdx.current = historyIdx.current === -1 ? h.length - 1 : Math.max(0, historyIdx.current - 1);
      setValue(h[historyIdx.current]);
    } else if (e.key === "ArrowDown" && historyIdx.current !== -1) {
      e.preventDefault();
      if (historyIdx.current >= h.length - 1) {
        historyIdx.current = -1;
        setValue("");
      } else {
        historyIdx.current += 1;
        setValue(h[historyIdx.current]);
      }
    }
  };

  const block = "border-l-2 border-[#00F2C3]/60 py-1 pl-4 text-slate-300";

  const render = (e: Entry) => {
    switch (e.kind) {
      case "welcome":
        return (
          <p key={e.id} className="text-slate-400">
            {t.terminal.welcome} <span className="font-semibold text-[#00F2C3]">help</span> {t.terminal.welcomeAfter}
          </p>
        );
      case "cmd":
        // e.text dirender sebagai teks biasa oleh React (otomatis di-escape).
        return (
          <div key={e.id} className="flex flex-wrap items-center gap-x-2 text-white">
            <Accent>{PROMPT}</Accent> <span className="break-all">{e.text}</span>
          </div>
        );
      case "help":
        return (
          <div key={e.id} className={block}>
            <p>{t.terminal.helpTitle}</p>
            {COMMANDS.map((c) => (
              <p key={c}>
                • <Accent>{c}</Accent> : {t.terminal.help[c]}
              </p>
            ))}
          </div>
        );
      case "skills":
        return (
          <div key={e.id} className={block}>
            {t.terminal.skillsTitle} {skillList.join(", ")}.
          </div>
        );
      case "bio":
        return (
          <div key={e.id} className={block}>
            <p>
              <Accent>{profile.fullName}</Accent> — {profile.roleHighlight} / {profile.roleLine}
            </p>
            <p>{profile.bio[lang]}</p>
          </div>
        );
      case "contact":
        return (
          <div key={e.id} className={block}>
            <p>
              {t.terminal.emailLabel}: {profile.email || "—"}
            </p>
            {profile.telegramHandle && <p>Telegram: {profile.telegramHandle}</p>}
            <p>
              {t.terminal.statusLabel}: {profile.availability.status[lang]}
            </p>
          </div>
        );
      case "unknown":
        return (
          <div key={e.id} className="pl-4 text-rose-400">
            {t.terminal.unknown} &apos;<span className="break-all">{e.text}</span>&apos;. {t.terminal.unknownHint}
          </div>
        );
    }
  };

  return (
    <section id="terminal" className="scroll-mt-20 px-6 py-20 md:px-12">
      <Reveal className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-fg">{t.terminal.eyebrow}</span>
          <h2 className="font-display text-3xl font-bold text-fg">{t.terminal.title}</h2>
          <p className="text-sm text-muted">
            {t.terminal.introBefore}{" "}
            {["help", "skills", "bio", "contact"].map((c, i, arr) => (
              <span key={c}>
                <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-accent-fg">{c}</code>
                {i < arr.length - 1 ? ", " : ""}
              </span>
            ))}{" "}
            {t.terminal.introAfter}{" "}
            <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-accent-fg">clear</code>.
          </p>
        </div>

        {/* Jendela terminal: selalu gelap di kedua tema, seperti terminal sungguhan */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0b0f12] shadow-2xl">
          <div className="flex select-none items-center justify-between border-b border-white/10 bg-[#14191d] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-rose-500/80" aria-hidden="true" />
              <span className="inline-block h-3 w-3 rounded-full bg-amber-500/80" aria-hidden="true" />
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
              <span className="ml-3 truncate font-mono text-xs text-slate-400">guest@BimaSatyadev-machine:~</span>
            </div>
            <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">zsh 5.9</span>
          </div>

          <div
            ref={bodyRef}
            role="log"
            aria-live="polite"
            aria-label={t.terminal.outputLabel}
            onClick={() => {
              if (!window.getSelection()?.toString()) inputRef.current?.focus();
            }}
            className="terminal-scrollbar max-h-[380px] min-h-[220px] space-y-3 overflow-y-auto p-6 font-mono text-xs md:text-sm"
          >
            {entries.map(render)}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-[#090c0e] px-4 py-3 font-mono text-sm focus-within:ring-1 focus-within:ring-inset focus-within:ring-[#00F2C3]/50"
          >
            <label htmlFor="terminal-input" className="shrink-0 text-[#00F2C3]">
              {PROMPT}
              <span className="sr-only"> {t.terminal.inputLabel}</span>
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={200}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              placeholder={t.terminal.placeholder}
              className="w-full min-w-0 border-0 bg-transparent p-0 font-mono text-base text-white outline-none placeholder:text-slate-600 focus:ring-0 md:text-sm"
            />
          </form>
        </div>
      </Reveal>
    </section>
  );
}
