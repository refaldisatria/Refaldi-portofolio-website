import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---- Rate limit sederhana (in-memory) ----
 * Catatan: di serverless (Vercel) memori tidak dibagi antar instance, jadi ini hanya
 * lapisan dasar. Untuk perlindungan kuat gunakan Vercel Firewall/WAF atau Upstash Ratelimit. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  // 1) Hanya terima dari origin yang sama (mengurangi penyalahgunaan lintas situs).
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      /* origin tidak valid */
    }
    if (originHost !== host) return json({ ok: false, code: "forbidden" }, 403);
  }

  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ ok: false, code: "bad_request" }, 415);
  }

  // 2) Rate limit per IP.
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, code: "rate_limited" }, 429);

  // 3) Parse body (batasi ukuran) + validasi di server.
  let payload: unknown;
  try {
    const text = await req.text();
    if (text.length > 10_000) return json({ ok: false, code: "too_large" }, 413);
    payload = JSON.parse(text);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  // Honeypot: bot mengisi field tersembunyi. Pura-pura sukses tanpa mengirim apa pun.
  if (payload && typeof payload === "object" && (payload as Record<string, unknown>).website) {
    return json({ ok: true }, 200);
  }

  const result = validateContact(payload);
  if (!result.ok) return json({ ok: false, code: "invalid", errors: result.errors }, 422);
  const { name, email, message } = result.data;

  // 4) Konfigurasi (hanya dari environment variable server).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return json({ ok: false, code: "not_configured" }, 503);

  // 5) Kirim lewat Resend (REST). Isi dikirim sebagai teks polos, bukan HTML.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Pesan portofolio dari ${name}`,
        text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] provider error", res.status); // tanpa membocorkan detail ke klien
      return json({ ok: false, code: "send_failed" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] send failed", err instanceof Error ? err.name : "unknown");
    return json({ ok: false, code: "send_failed" }, 502);
  }
}

export function GET() {
  return json({ ok: false, code: "method_not_allowed" }, 405);
}
