/** Validasi form kontak. Dipakai bersama oleh klien (UX) dan server (otoritas). */
export type ContactField = "name" | "email" | "message";
export type ContactErrorCode =
  | "nameRequired" | "nameLength"
  | "emailRequired" | "emailInvalid"
  | "messageRequired" | "messageShort" | "messageLong";

export interface ContactInput { name: string; email: string; message: string }
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export const LIMITS = { nameMax: 80, emailMax: 254, messageMin: 10, messageMax: 2000 } as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function validateContact(raw: unknown): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  // Hapus karakter kontrol (termasuk CR/LF) dari nama & email untuk mencegah header injection.
  const stripCtl = (v: string) => v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  const name = stripCtl(str(src.name));
  const email = stripCtl(str(src.email));
  const message = str(src.message).replace(/\r\n/g, "\n").trim();

  const errors: ContactErrors = {};
  if (!name) errors.name = "nameRequired";
  else if (name.length > LIMITS.nameMax) errors.name = "nameLength";

  if (!email) errors.email = "emailRequired";
  else if (email.length > LIMITS.emailMax || !EMAIL_RE.test(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length < LIMITS.messageMin) errors.message = "messageShort";
  else if (message.length > LIMITS.messageMax) errors.message = "messageLong";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
