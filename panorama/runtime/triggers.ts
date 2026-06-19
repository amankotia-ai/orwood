/** Pure trigger evaluation — no DOM. Fully unit-testable. */
import { Matcher, TriggerCondition, VisitorContext, LiveSignals } from "./types";

export function applyMatcher(actual: unknown, m: Matcher): boolean {
  const ci = m.caseInsensitive !== false;
  const norm = (v: unknown): unknown => (ci && typeof v === "string" ? v.toLowerCase() : v);
  const a = norm(actual);
  const val = Array.isArray(m.value) ? m.value.map(norm) : norm(m.value as unknown);

  switch (m.op) {
    case "exists": return actual !== undefined && actual !== null && actual !== "";
    case "notExists": return actual === undefined || actual === null || actual === "";
    case "equals": return a === val;
    case "notEquals": return a !== val;
    case "contains": return typeof a === "string" && typeof val === "string" && a.includes(val);
    case "notContains": return !(typeof a === "string" && typeof val === "string" && a.includes(val));
    case "startsWith": return typeof a === "string" && typeof val === "string" && a.startsWith(val);
    case "endsWith": return typeof a === "string" && typeof val === "string" && a.endsWith(val);
    case "matches": {
      try { return typeof actual === "string" && new RegExp(String(m.value), ci ? "i" : "").test(actual); }
      catch { return false; }
    }
    case "in": return Array.isArray(val) && (val as unknown[]).includes(a);
    case "notIn": return Array.isArray(val) && !(val as unknown[]).includes(a);
    case "gt": return Number(actual) > Number(m.value);
    case "gte": return Number(actual) >= Number(m.value);
    case "lt": return Number(actual) < Number(m.value);
    case "lte": return Number(actual) <= Number(m.value);
    default: return false;
  }
}

export function evaluateCondition(c: TriggerCondition, ctx: VisitorContext, live: LiveSignals): boolean {
  switch (c.type) {
    case "all": return c.conditions.every((x) => evaluateCondition(x, ctx, live));
    case "any": return c.conditions.some((x) => evaluateCondition(x, ctx, live));
    case "not": return !evaluateCondition(c.condition, ctx, live);

    case "pageViewCount": {
      let count: number;
      if (c.path) {
        count = Object.entries(ctx.pathViews)
          .filter(([p]) => applyMatcher(p, c.path as Matcher))
          .reduce((s, [, n]) => s + n, 0);
      } else {
        const w = c.timeframe?.window ?? "all";
        count = ctx.viewCounts[w] ?? ctx.session.pageViews;
      }
      return applyMatcher(count, c.match);
    }
    case "timeOnPage": return live.timeOnPageSec >= c.seconds;
    case "inactivity": return live.idleSec >= c.seconds;
    case "sessionDuration": return live.sessionDurationSec >= c.seconds;
    case "scrollDepth": return live.scrollPercent >= c.percent;
    case "elementVisible": return live.visibleSelectors.has(c.selector);
    case "exitIntent": return live.exitIntent;
    case "engagementScore": return applyMatcher(ctx.engagementScore, c.match);

    case "journey": {
      if (c.order === "any") return c.path.every((p) => live.journey.includes(p));
      let i = 0;
      for (const step of live.journey) { if (step === c.path[i]) i++; if (i === c.path.length) return true; }
      return i === c.path.length;
    }
    case "funnelStep": return live.funnelSteps.has(c.step) === c.reached;

    case "utm": return applyMatcher(ctx.utm[c.param], c.match);
    case "referrer": return applyMatcher(ctx.referrer, c.match);
    case "geo": return applyMatcher(ctx.geo[c.field], c.match);
    case "device": return applyMatcher((ctx.device as Record<string, unknown>)[c.field], c.match);
    case "session": return applyMatcher((ctx.session as Record<string, unknown>)[c.field], c.match);
    case "currentPath": return applyMatcher(ctx.path, c.match);
    default: return false;
  }
}
