/* ============================================================
   Email sequence queue
   Schedules nurture-sequence emails for deferred sending.

   Storage: pluggable via EmailQueueStore interface.
   • Vercel KV / Upstash Redis → use KvEmailQueueStore (below)
   • For local dev without KV, the API route falls back to
     console logging the schedule (no emails are lost — the
     Day 0 email still sends immediately via Resend).
   ============================================================ */

import type { EmailTrack } from "./email-segments";
import { TRACK_SCHEDULE } from "./email-segments";

/* ── Types ─────────────────────────────────────────────────── */

export type QueuedEmail = {
  id: string;
  to: string;
  track: EmailTrack;
  step: number;
  /** ISO-8601 timestamp when this email should be sent. */
  sendAt: string;
  /** Extra template variables. */
  vars?: Record<string, string>;
  /** Whether this email has been sent. */
  sent: boolean;
};

/** Abstract store — swap in Redis, KV, Postgres, etc. */
export interface EmailQueueStore {
  /** Add items to the queue. */
  enqueue(items: QueuedEmail[]): Promise<void>;
  /** Return all unsent items whose sendAt is in the past. */
  due(): Promise<QueuedEmail[]>;
  /** Mark an item as sent. */
  markSent(id: string): Promise<void>;
}

/* ── In-memory / KV store implementation ───────────────────── */

/**
 * Vercel KV (Upstash Redis) backed queue store.
 * Falls back to an in-memory map when KV env vars are missing
 * (local dev). The in-memory store resets on cold-start — fine
 * for dev; use KV or a database in production.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Load the @vercel/kv client dynamically.
 * Returns null when the package isn't installed or env vars are missing.
 */
async function getKv(): Promise<any | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

class KvEmailQueueStore implements EmailQueueStore {
  private mem = new Map<string, QueuedEmail>();

  async enqueue(items: QueuedEmail[]): Promise<void> {
    const kv = await getKv();
    if (kv) {
      const pipeline = kv.pipeline();
      for (const item of items) {
        pipeline.hset(`email:${item.id}`, item as unknown as Record<string, string>);
        pipeline.zadd("email:schedule", {
          score: new Date(item.sendAt).getTime(),
          member: item.id,
        });
      }
      await pipeline.exec();
    } else {
      for (const item of items) {
        this.mem.set(item.id, item);
      }
    }
  }

  async due(): Promise<QueuedEmail[]> {
    const now = Date.now();
    const kv = await getKv();

    if (kv) {
      const ids: string[] = await kv.zrangebyscore("email:schedule", 0, now);
      const results: QueuedEmail[] = [];
      for (const id of ids) {
        const item: QueuedEmail | null = await kv.hgetall(`email:${id}`);
        if (item && !item.sent) results.push(item);
      }
      return results;
    }

    return [...this.mem.values()].filter(
      (e) => !e.sent && new Date(e.sendAt).getTime() <= now,
    );
  }

  async markSent(id: string): Promise<void> {
    const kv = await getKv();
    if (kv) {
      await kv.hset(`email:${id}`, { sent: true });
      await kv.zrem("email:schedule", id);
    } else {
      const item = this.mem.get(id);
      if (item) item.sent = true;
    }
  }
}

/* ── Singleton store ───────────────────────────────────────── */

export const emailQueue: EmailQueueStore = new KvEmailQueueStore();

/* ── Helpers ───────────────────────────────────────────────── */

/**
 * Enqueue the full drip sequence for a new enquiry.
 * Step 1 (Day 0) is sent immediately by the API route,
 * so this enqueues steps 2 … N with their day offsets.
 */
export async function enqueueSequence(opts: {
  to: string;
  track: EmailTrack;
  vars?: Record<string, string>;
}): Promise<QueuedEmail[]> {
  const schedule = TRACK_SCHEDULE[opts.track];
  const now = Date.now();
  const MS_PER_DAY = 86_400_000;

  const items: QueuedEmail[] = schedule.slice(1).map((dayOffset, i) => ({
    id: `${opts.to}:${opts.track}:${i + 2}:${now}`,
    to: opts.to,
    track: opts.track,
    step: i + 2, // steps are 1-indexed; step 1 already sent
    sendAt: new Date(now + dayOffset * MS_PER_DAY).toISOString(),
    vars: opts.vars,
    sent: false,
  }));

  await emailQueue.enqueue(items);

  console.log("[email-queue] enqueued", {
    to: opts.to,
    track: opts.track,
    count: items.length,
    schedule: items.map((e) => ({ step: e.step, sendAt: e.sendAt })),
  });

  return items;
}
