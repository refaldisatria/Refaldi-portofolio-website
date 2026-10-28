"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { LIMITS, validateContact, type ContactErrors, type ContactField } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-field px-4 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-1 focus:ring-accent ${
    invalid ? "border-rose-500" : "border-line"
  }`;

export default function ContactSection() {
  const { lang, t } = useApp();
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (field !== "website" && errors[field as ContactField]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("error");
      setFeedback(t.contact.invalidForm);
      return;
    }

    setErrors({});
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, website: values.website }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; code?: string; errors?: ContactErrors } | null;

      if (res.ok && json?.ok === true) {
        setStatus("success");
        setFeedback(t.contact.success);
        setValues({ name: "", email: "", message: "", website: "" });
        return;
      }
      setStatus("error");
      if (res.status === 422 && json?.errors) {
        setErrors(json.errors);
        setFeedback(t.contact.invalidForm);
      } else if (res.status === 429) setFeedback(t.contact.rateLimited);
      else if (json?.code === "not_configured") setFeedback(t.contact.notConfigured);
      else setFeedback(t.contact.failed);
    } catch {
      setStatus("error");
      setFeedback(t.contact.failed);
    }
  };

  const err = (f: ContactField) => (errors[f] ? t.contact.errors[errors[f]!] : null);
  const labelClass = "font-mono text-xs text-muted";
  const cardClass = "space-y-2 rounded-2xl border border-line bg-card p-6";

  return (
    <section id="kontak" className="scroll-mt-20 border-t border-line-soft bg-alt px-6 py-24 md:px-12 dark:bg-[#0a0d0f]">
      <Reveal className="mx-auto max-w-5xl space-y-12">
        <div className="mx-auto max-w-xl space-y-2 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-fg">{t.contact.eyebrow}</span>
          <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">{t.contact.title}</h2>
          <p className="text-sm text-muted">{t.contact.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Kartu info */}
          <div className="space-y-4 md:col-span-5">
            <div className={cardClass}>
              <span className="font-mono text-xs text-accent-fg">{t.contact.emailCard}</span>
              {profile.email ? (
                <p className="break-all text-base font-semibold text-fg">
                  <a href={`mailto:${profile.email}`} className="hover:text-accent-fg">{profile.email}</a>
                </p>
              ) : (
                <p className="text-base font-semibold text-muted">{t.contact.emailNotSet}</p>
              )}
              <p className="text-xs text-muted">{profile.responseNote[lang]}</p>
            </div>
            <div className={cardClass}>
              <span className="font-mono text-xs text-accent-fg">{t.contact.locationCard}</span>
              <p className="text-base font-semibold text-fg">{profile.locationLine[lang]}</p>
              <p className="text-xs text-muted">{profile.locationNote[lang]}</p>
            </div>
            <div className={cardClass}>
              <span className="font-mono text-xs text-accent-fg">{t.contact.availabilityCard}</span>
              <p className="flex items-center gap-2 text-base font-semibold text-fg">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {profile.availability.status[lang]}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-line bg-card p-6 md:col-span-7 md:p-8">
            <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="contact-feedback">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="c-name" className={labelClass}>{t.contact.name}</label>
                  <input
                    id="c-name" name="name" type="text" autoComplete="name" required
                    maxLength={LIMITS.nameMax + 20}
                    value={values.name} onChange={set("name")}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined}
                    placeholder={t.contact.namePlaceholder} className={fieldClass(!!errors.name)}
                  />
                  {err("name") && <p id="c-name-err" className="text-xs text-rose-500">{err("name")}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="c-email" className={labelClass}>{t.contact.email}</label>
                  <input
                    id="c-email" name="email" type="email" autoComplete="email" required
                    value={values.email} onChange={set("email")}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined}
                    placeholder="email@domain.com" className={fieldClass(!!errors.email)}
                  />
                  {err("email") && <p id="c-email-err" className="text-xs text-rose-500">{err("email")}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="c-message" className={labelClass}>{t.contact.message}</label>
                <textarea
                  id="c-message" name="message" rows={4} required
                  value={values.message} onChange={set("message")}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined}
                  placeholder={t.contact.messagePlaceholder} className={fieldClass(!!errors.message)}
                />
                <div className="flex justify-between gap-4">
                  <p id="c-message-err" className="text-xs text-rose-500">{err("message")}</p>
                  <p className="shrink-0 font-mono text-[11px] text-muted">
                    {values.message.length}/{LIMITS.messageMax} {t.contact.charCount}
                  </p>
                </div>
              </div>

              {/* Honeypot anti-spam: disembunyikan dari pengguna & pembaca layar */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="c-website">Website</label>
                <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-accent py-3.5 font-sans text-sm font-semibold text-black transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "loading" ? t.contact.sending : <>{t.contact.send} <span aria-hidden="true">→</span></>}
              </button>

              <div id="contact-feedback" aria-live="polite">
                {status === "success" && (
                  <p role="status" className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                    {feedback}
                  </p>
                )}
                {status === "error" && feedback && (
                  <p role="alert" className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
