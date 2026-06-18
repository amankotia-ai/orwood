import { NextResponse } from "next/server";
import { resolveTrack, TRACK_SCHEDULE } from "@/lib/email-segments";

/**
 * Enquiry endpoint (stub).
 *
 * Validates the payload, resolves the nurture-email segment, and accepts the
 * enquiry. No mail provider is wired yet — drop one in where marked below:
 *   • Resend:    await resend.emails.send({ from, to, subject, html })
 *   • Formspree: forward the body to your form endpoint
 *   • CRM:       POST to your CRM's lead API
 * Add the provider key as an env var (e.g. RESEND_API_KEY) — never hard-code it.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required" },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  // Resolve the nurture-email track from project type, budget, and message.
  const track = resolveTrack({
    projectType: String(data.projectType ?? ""),
    budget: String(data.budget ?? ""),
    message,
  });

  const schedule = TRACK_SCHEDULE[track];

  // TODO: send the enquiry via your provider of choice (see note above).
  // When wiring the mail provider, enqueue the track-specific email sequence:
  //   templates live at marketing/emails/{track}/01-*.html … 0N-*.html
  //   send schedule: schedule[i] = day offset for email i
  console.log("[contact] new enquiry", {
    name,
    email,
    company: data.company,
    country: data.country,
    projectType: data.projectType,
    budget: data.budget,
    track,
    schedule,
    _attribution: data._attribution ?? null,
  });

  return NextResponse.json({ ok: true, track });
}
