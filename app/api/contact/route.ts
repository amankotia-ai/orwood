import { NextResponse } from "next/server";

/**
 * Enquiry endpoint (stub).
 *
 * Validates the payload and accepts the enquiry. No mail provider is wired yet —
 * drop one in where marked below:
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

  // TODO: send the enquiry via your provider of choice (see note above).
  console.log("[contact] new enquiry", {
    name,
    email,
    company: data.company,
    country: data.country,
    projectType: data.projectType,
    budget: data.budget,
  });

  return NextResponse.json({ ok: true });
}
