/** Panorama runtime orchestrator. Zero dependencies. */
import { LiveSignals, PanoramaEvent, PanoramaOptions, Rule, RuleSet, TriggerCondition, VisitorContext } from "./types";
import { buildContext } from "./context";
import { evaluateCondition } from "./triggers";
import { executeAction } from "./actions";

const ls = (k: string): string | null => { try { return typeof localStorage !== "undefined" ? localStorage.getItem(k) : null; } catch { return null; } };
const lsSet = (k: string, v: string): void => { try { if (typeof localStorage !== "undefined") localStorage.setItem(k, v); } catch { /* ignore */ } };
const ss = (k: string): string | null => { try { return typeof sessionStorage !== "undefined" ? sessionStorage.getItem(k) : null; } catch { return null; } };
const ssSet = (k: string, v: string): void => { try { if (typeof sessionStorage !== "undefined") sessionStorage.setItem(k, v); } catch { /* ignore */ } };

function visitorId(): string {
  let id = ls("pa_vid");
  if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); lsSet("pa_vid", id); }
  return id;
}

function hash32(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function walkConditions(c: TriggerCondition, fn: (c: TriggerCondition) => void): void {
  fn(c);
  if (c.type === "all" || c.type === "any") c.conditions.forEach((x) => walkConditions(x, fn));
  else if (c.type === "not") walkConditions(c.condition, fn);
}

export class PanoramaEngine {
  private ctx!: VisitorContext;
  private vid: string;
  private applied = new Set<string>();
  private started = false;
  private interval: ReturnType<typeof setInterval> | null = null;
  private lastActivity = Date.now();
  private maxScroll = 0;
  private cleanups: Array<() => void> = [];
  private live: LiveSignals = {
    scrollPercent: 0, timeOnPageSec: 0, idleSec: 0, sessionDurationSec: 0,
    exitIntent: false, visibleSelectors: new Set(), journey: [], funnelSteps: new Set(),
  };

  constructor(private ruleset: RuleSet, private opts: PanoramaOptions = {}) {
    this.vid = typeof window !== "undefined" ? visitorId() : "ssr";
  }

  private emit(e: PanoramaEvent): void { try { this.opts.onEvent?.(e); } catch { /* ignore */ } }

  /** Host app hook: record an SPA navigation so journey/funnel triggers see it. */
  recordPath(path: string): void { this.live.journey.push(path); this.ctx && (this.ctx.path = path); this.evaluate(); }
  recordFunnelStep(step: string): void { this.live.funnelSteps.add(step); this.evaluate(); }
  setConsent(ok: boolean): void { if (this.ctx) this.ctx.consent = ok; this.evaluate(); }
  getContext(): VisitorContext { return this.ctx; }

  start(): void {
    if (this.started || typeof window === "undefined") return;
    this.started = true;
    this.ctx = buildContext(this.opts);
    this.live.journey.push(this.ctx.path);

    const veil = !!this.opts.antiFlicker && typeof document !== "undefined";
    if (veil) document.documentElement.style.visibility = "hidden";
    const reveal = () => { if (veil) document.documentElement.style.visibility = ""; };
    if (veil) setTimeout(reveal, this.opts.antiFlickerTimeoutMs ?? 1500);

    this.setupTrackers();
    this.evaluate();
    reveal();
  }

  stop(): void { if (this.interval) clearInterval(this.interval); this.cleanups.forEach((c) => c()); this.cleanups = []; this.started = false; }

  private on(target: EventTarget, ev: string, h: EventListener, opt?: AddEventListenerOptions): void {
    target.addEventListener(ev, h, opt);
    this.cleanups.push(() => target.removeEventListener(ev, h, opt));
  }

  private setupTrackers(): void {
    const activity = () => { this.lastActivity = Date.now(); };
    for (const ev of ["mousemove", "keydown", "scroll", "touchstart", "click"]) this.on(window, ev, activity, { passive: true });

    this.on(window, "scroll", () => {
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.round(((window.scrollY || doc.scrollTop) / total) * 100));
      if (pct > this.maxScroll) { this.maxScroll = pct; this.live.scrollPercent = pct; this.evaluate(); }
    }, { passive: true });

    this.on(document, "mouseout", ((e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0 && !this.live.exitIntent) { this.live.exitIntent = true; this.evaluate(); }
    }) as EventListener);

    // IntersectionObserver for elementVisible triggers
    const selectors = new Set<string>();
    for (const r of this.ruleset.rules) walkConditions(r.audience, (c) => { if (c.type === "elementVisible") selectors.add(c.selector); });
    if (selectors.size && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver((entries) => {
        let changed = false;
        for (const en of entries) if (en.isIntersecting) {
          for (const sel of selectors) if ((en.target as Element).matches(sel)) { this.live.visibleSelectors.add(sel); changed = true; }
        }
        if (changed) this.evaluate();
      }, { threshold: 0.5 });
      selectors.forEach((sel) => document.querySelectorAll(sel).forEach((el) => io.observe(el)));
      this.cleanups.push(() => io.disconnect());
    }

    this.interval = setInterval(() => {
      this.live.timeOnPageSec += 1;
      this.live.sessionDurationSec = Math.round((Date.now() - this.ctx.session.sessionStart) / 1000);
      this.live.idleSec = Math.round((Date.now() - this.lastActivity) / 1000);
      this.evaluate();
    }, 1000);
  }

  private periodKey(per: "session" | "day" | "ever"): string {
    if (per === "day") return new Date().toISOString().slice(0, 10);
    if (per === "session") return ss("pa_session_start") || "s";
    return "ever";
  }

  private freqCount(rule: Rule): number {
    if (!rule.frequencyCap) return 0;
    const key = `pa_fc_${rule.id}_${rule.frequencyCap.per}_${this.periodKey(rule.frequencyCap.per)}`;
    return parseInt((rule.frequencyCap.per === "session" ? ss(key) : ls(key)) || "0", 10) || 0;
  }
  private freqBump(rule: Rule): void {
    if (!rule.frequencyCap) return;
    const key = `pa_fc_${rule.id}_${rule.frequencyCap.per}_${this.periodKey(rule.frequencyCap.per)}`;
    const n = this.freqCount(rule) + 1;
    if (rule.frequencyCap.per === "session") ssSet(key, String(n)); else lsSet(key, String(n));
  }

  private inSchedule(rule: Rule): boolean {
    if (!rule.schedule) return true;
    const now = Date.now();
    if (rule.schedule.start && now < Date.parse(rule.schedule.start)) return false;
    if (rule.schedule.end && now > Date.parse(rule.schedule.end)) return false;
    return true;
  }

  private evaluate(): void {
    if (!this.ctx) return;
    const rules = this.ruleset.rules
      .filter((r) => r.status === "active")
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    for (const rule of rules) {
      if (this.applied.has(rule.id)) continue;
      if (!this.inSchedule(rule)) continue;
      if (rule.consentRequired && !this.ctx.consent) { continue; }
      if (rule.frequencyCap && this.freqCount(rule) >= rule.frequencyCap.max) continue;
      if (!evaluateCondition(rule.audience, this.ctx, this.live)) continue;

      this.emit({ kind: "rule_matched", ruleId: rule.id, segment: rule.segment, metric: rule.metric });

      // Deterministic holdout (control group) — never applies, but is recorded for measurement.
      if (rule.holdout && rule.holdout > 0) {
        const bucket = hash32(`${this.vid}:${rule.id}`) / 0xffffffff;
        if (bucket < rule.holdout) {
          this.applied.add(rule.id);
          this.emit({ kind: "rule_held_out", ruleId: rule.id });
          continue;
        }
      }

      this.applied.add(rule.id);
      this.freqBump(rule);
      for (const action of rule.actions) executeAction(action, rule.id, (e) => this.emit(e));
      this.emit({ kind: "rule_applied", ruleId: rule.id, actions: rule.actions.length });
    }
  }
}
