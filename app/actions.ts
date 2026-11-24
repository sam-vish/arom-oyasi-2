"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { formSpecs, type FormKind, type FormState } from "@/lib/forms";
import { sbInsert, supabaseEnabled } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500; // humans don't submit a form 2.5s after it renders

async function verifyTurnstile(token: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot + timing still apply
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || !to) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}

async function store(table: string, row: Record<string, unknown>) {
  if (supabaseEnabled) return sbInsert(table, row);
  if (process.env.NODE_ENV !== "production") {
    // Local preview without Supabase: keep submissions in .data/ so nothing is lost.
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "submissions.ndjson"), JSON.stringify({ table, ...row }) + "\n");
    return;
  }
  throw new Error("No storage configured: set SUPABASE_URL and SUPABASE_ANON_KEY.");
}

export async function submitForm(kind: FormKind, _prev: FormState, formData: FormData): Promise<FormState> {
  const spec = formSpecs[kind];
  if (!spec) return { status: "error", message: "Unknown form." };

  // Spam traps: hidden field must be empty, and the form can't be submitted instantly.
  const honeypot = String(formData.get("website") ?? "");
  const renderedAt = Number(formData.get("_t") ?? 0);
  if (honeypot || (renderedAt && Date.now() - renderedAt < MIN_FILL_MS)) {
    return { status: "success", message: spec.success }; // look successful to bots
  }
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response") as string | null))) {
    return { status: "error", message: "Please complete the verification and try again." };
  }

  const row: Record<string, unknown> = {};
  const fieldErrors: Record<string, string> = {};

  for (const [name, rule] of Object.entries(spec.fields)) {
    if (rule.checkbox) {
      const on = formData.get(name) === "on";
      if (rule.required && !on) fieldErrors[name] = "Please confirm to continue.";
      row[name] = on;
      continue;
    }
    const value = String(formData.get(name) ?? "").trim();
    if (rule.required && !value) fieldErrors[name] = "This field is required.";
    else if (value && rule.email && !EMAIL_RE.test(value)) fieldErrors[name] = "Enter a valid email address.";
    else if (value && rule.max && value.length > rule.max) fieldErrors[name] = `Keep this under ${rule.max} characters.`;
    row[name] = value || null;
  }

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  try {
    await store(spec.table, row);
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: "Something went wrong sending your form. Please try again, or email info@aromeosayi.org.",
    };
  }

  // Notifications are best-effort: a failed email never loses the stored submission.
  const inbox = process.env[spec.inboxEnv] || process.env.TEAM_INBOX || "";
  const email = typeof row.email === "string" ? row.email : undefined;
  const rows = Object.entries(row)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#777">${escapeHtml(k)}</td><td>${escapeHtml(String(v ?? ""))}</td></tr>`)
    .join("");
  await Promise.allSettled([
    sendEmail(inbox, spec.subject, `<table>${rows}</table>`, email),
    spec.autoReply && email
      ? sendEmail(email, spec.autoReply.subject, `<p>${escapeHtml(spec.autoReply.body)}</p><p>Office of Apostle Arome Osayi<br/>aromeosayi.org</p>`)
      : Promise.resolve(),
  ]);

  return { status: "success", message: spec.success };
}
