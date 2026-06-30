import { NextResponse } from "next/server";
import { resolveTrack } from "@/lib/email-segments";
import { sendSequenceEmail } from "@/lib/email-sender";
import { enqueueSequence } from "@/lib/email-queue";
import { getPostHogClient } from "@/lib/posthog-server";

/**
 * Enquiry endpoint.
 *
 * Validates the payload, resolves the nurture-email segment,
 * sends the Day 0 welcome email immediately via Resend,
 * and enqueues the remaining drip sequence for later delivery.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required" },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  // Resolve the nurture-email track from project type, budget, and message.
  const track = resolveTrack({
    projectType: String(data.projectType ?? ""),
    budget: String(data.budget ?? ""),
    message,
  });

  console.log("[contact] new enquiry", {
    name,
    email,
    company: data.company,
    country: data.country,
    projectType: data.projectType,
    budget: data.budget,
    track,
    _attribution: data._attribution ?? null,
  });

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: email,
    event: "enquiry_received",
    properties: {
      name,
      company: data.company ?? null,
      country: data.country ?? null,
      project_type: data.projectType ?? null,
      budget: data.budget ?? null,
      nurture_track: track,
      referrer_project: (data._attribution as Record<string, unknown> | null)?.referrerProject ?? null,
    },
  });
  posthog.identify({
    distinctId: email,
    properties: {
      name,
      email,
      company: data.company ?? null,
      country: data.country ?? null,
    },
  });

  // posthog-node only queues capture()/identify() calls — it does not send
  // them until the internal buffer is flushed. On Vercel's serverless
  // runtime the function can freeze the instant the response is sent, which
  // silently drops anything still in flight. Awaiting flush() here forces
  // the queued events out over the network before we respond, so this
  // enquiry is never lost even though we reuse a singleton client across
  // invocations.
  await posthog.flush();

  // Send the Day 0 welcome email immediately.
  if (process.env.RESEND_API_KEY) {
    const messageId = await sendSequenceEmail({
      to: email,
      track,
      step: 1,
      vars: { "{{recipientName}}": name },
    });

    if (messageId) {
      // Enqueue the remaining emails (steps 2…N) for scheduled delivery.
      await enqueueSequence({
        to: email,
        track,
        vars: { "{{recipientName}}": name },
      });
    }
  } else {
    console.log(
      "[contact] RESEND_API_KEY not set — skipping email send. " +
        "Set it in .env.local to activate the nurture sequence.",
    );
  }

  return NextResponse.json({ ok: true, track });
}
