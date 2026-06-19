/* ============================================================
   Email sender — Resend integration with template loading
   ============================================================ */

import { Resend } from "resend";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./content";
import type { EmailTrack } from "./email-segments";

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://orwood.com";
const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? `ORWOOD <${site.email}>`;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? site.whatsapp;

/** Template variable map injected into every email. */
function globalVars(recipientEmail: string): Record<string, string> {
  return {
    "{{baseUrl}}": BASE_URL,
    "{{whatsappNumber}}": WHATSAPP_NUMBER,
    "{{unsubscribeUrl}}": `${BASE_URL}/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`,
  };
}

/**
 * Load an HTML email template from disk and replace {{vars}}.
 * Templates live at marketing/emails/{track}/0N-*.html
 */
async function loadTemplate(
  track: EmailTrack,
  step: number,
  extraVars?: Record<string, string>,
): Promise<{ subject: string; preview: string; html: string }> {
  const dir = join(process.cwd(), "marketing", "emails", track);
  const padded = String(step).padStart(2, "0");

  // Find the template file matching this step number.
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(dir);
  const file = files.find((f) => f.startsWith(`${padded}-`) && f.endsWith(".html"));
  if (!file) throw new Error(`Template not found: ${track}/${padded}-*.html`);

  let html = await readFile(join(dir, file), "utf-8");

  // Extract subject and preview from the HTML comment header.
  const subjectMatch = html.match(/Subject:\s*(.+)/);
  const previewMatch = html.match(/Preview:\s*(.+)/);
  const subject = subjectMatch?.[1]?.trim() ?? "ORWOOD";
  const preview = previewMatch?.[1]?.trim() ?? "";

  // Replace template variables.
  const vars = { ...globalVars(""), ...extraVars };
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(key, value);
  }

  return { subject, preview, html };
}

export type SendEmailOpts = {
  to: string;
  track: EmailTrack;
  step: number;
  /** Extra template variables, e.g. recipient name. */
  vars?: Record<string, string>;
};

/**
 * Send a single email from the nurture sequence.
 * Returns the Resend message ID on success.
 */
export async function sendSequenceEmail(
  opts: SendEmailOpts,
): Promise<string | null> {
  const allVars = {
    ...globalVars(opts.to),
    ...opts.vars,
  };

  const { subject, html } = await loadTemplate(opts.track, opts.step, allVars);

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: opts.to,
    subject,
    html,
  });

  if (error) {
    console.error("[email-sender] Resend error", error);
    return null;
  }

  console.log("[email-sender] sent", {
    to: opts.to,
    track: opts.track,
    step: opts.step,
    messageId: data?.id,
  });

  return data?.id ?? null;
}
