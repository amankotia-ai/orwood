import { NextResponse } from "next/server";
import { emailQueue } from "@/lib/email-queue";
import { sendSequenceEmail } from "@/lib/email-sender";
import { getPostHogClient } from "@/lib/posthog-server";

/**
 * Cron endpoint — process queued nurture-sequence emails.
 *
 * Call this on a schedule (e.g. every hour via Vercel Cron):
 *   vercel.json → { "crons": [{ "path": "/api/cron/email-drip", "schedule": "0 * * * *" }] }
 *
 * Protected by CRON_SECRET — Vercel sets the Authorization header automatically.
 */
export async function GET(req: Request) {
  // Verify the cron secret to prevent unauthorized access.
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const due = await emailQueue.due();

  if (due.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  let sent = 0;
  const errors: string[] = [];

  for (const item of due) {
    const messageId = await sendSequenceEmail({
      to: item.to,
      track: item.track,
      step: item.step,
      vars: item.vars,
    });

    if (messageId) {
      await emailQueue.markSent(item.id);
      sent++;
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: item.to,
        event: "nurture_email_sent",
        properties: {
          nurture_track: item.track,
          step: item.step,
          message_id: messageId,
        },
      });
    } else {
      errors.push(item.id);
    }
  }

  console.log("[email-drip] cron run", { due: due.length, sent, errors });

  return NextResponse.json({ ok: true, due: due.length, sent, errors });
}
