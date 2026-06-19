/** DOM action executors. Uses the Web Animations API — no external dependencies. */
import { Action, AnimationStyle, FormField, OverlayPosition, OverlayType, PanoramaEvent } from "./types";

type Emit = (e: PanoramaEvent) => void;

function els(selector?: string): HTMLElement[] {
  if (!selector || typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll(selector)).filter((n): n is HTMLElement => n instanceof HTMLElement);
}

function keyframes(anim: AnimationStyle): Keyframe[] {
  switch (anim) {
    case "fade": return [{ opacity: 0 }, { opacity: 1 }];
    case "slide": return [{ transform: "translateY(16px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }];
    case "zoom": return [{ transform: "scale(0.92)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }];
    case "bounce": return [{ transform: "scale(0.8)", opacity: 0 }, { transform: "scale(1.05)" }, { transform: "scale(1)", opacity: 1 }];
    default: return [];
  }
}

function animateIn(el: HTMLElement, anim: AnimationStyle = "fade", dur = 250): void {
  el.style.display = el.dataset.paDisplay || "";
  if (anim === "none" || typeof el.animate !== "function") return;
  el.animate(keyframes(anim), { duration: dur, easing: "ease-out", fill: "both" });
}

function animateOut(el: HTMLElement, anim: AnimationStyle = "fade", dur = 250, done?: () => void): void {
  if (anim === "none" || typeof el.animate !== "function") { el.style.display = "none"; done?.(); return; }
  const a = el.animate(keyframes(anim).slice().reverse(), { duration: dur, easing: "ease-in", fill: "both" });
  a.onfinish = () => { el.style.display = "none"; done?.(); };
}

function replaceInTextNodes(root: Node, find: string, replace: string, all: boolean): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets: Text[] = [];
  let n = walker.nextNode();
  while (n) { if (n.nodeValue && n.nodeValue.includes(find)) targets.push(n as Text); n = walker.nextNode(); }
  for (const t of targets) {
    t.nodeValue = all ? t.nodeValue!.split(find).join(replace) : t.nodeValue!.replace(find, replace);
  }
}

const POS: Record<OverlayPosition, Partial<CSSStyleDeclaration>> = {
  "center": { top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  "top": { top: "0", left: "50%", transform: "translateX(-50%)" },
  "bottom": { bottom: "0", left: "50%", transform: "translateX(-50%)" },
  "left": { top: "50%", left: "0", transform: "translateY(-50%)" },
  "right": { top: "50%", right: "0", transform: "translateY(-50%)" },
  "top-left": { top: "16px", left: "16px" },
  "top-right": { top: "16px", right: "16px" },
  "bottom-left": { bottom: "16px", left: "16px" },
  "bottom-right": { bottom: "16px", right: "16px" },
};

function buildOverlay(a: any, ruleId: string, emit: Emit): void {
  const id = a.id || "pa-ov-" + ruleId;
  if (document.getElementById(id)) return;
  const wrap = document.createElement("div");
  wrap.id = id;
  wrap.setAttribute("data-pa-rule", ruleId);
  const box = document.createElement("div");
  if (a.html) {
    box.innerHTML = a.html;
  } else if (a.content) {
    const c = a.content;
    let html = "";
    if (c.headline) html += `<h3 style="margin:0 0 8px;font-size:1.25rem;font-weight:600">${c.headline}</h3>`;
    if (c.body) html += `<p style="margin:0 0 16px;font-size:0.95rem;opacity:0.85">${c.body}</p>`;
    if (c.cta) html += `<a href="${c.cta.href}" data-pa-overlay-cta data-rule="${ruleId}" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;font-size:0.82rem;font-weight:500;background:#18120f;color:#f4f3ef;text-decoration:none;letter-spacing:0.025em;transition:background 300ms">${c.cta.text}</a>`;
    box.innerHTML = html;
    const ctaLink = box.querySelector("[data-pa-overlay-cta]");
    if (ctaLink) ctaLink.addEventListener("click", () => emit({ kind: "interaction", ruleId, detail: "overlay_cta_click" }));
  }
  const sty = a.style || {};
  Object.assign(box.style, {
    background: sty.bg || "#fff", color: sty.color || "#111",
    boxShadow: "0 8px 40px rgba(0,0,0,.18)", borderRadius: "12px", padding: "20px", position: "relative",
    maxWidth: sty.maxWidth || "", border: sty.border || "", fontFamily: sty.font || "",
  } as Partial<CSSStyleDeclaration>);

  const type: OverlayType = a.overlay || "corner";
  const pos: OverlayPosition = a.position || (type === "banner" ? "top" : type === "sidebar" ? "right" : type === "corner" ? "bottom-right" : "center");

  Object.assign(wrap.style, { position: "fixed", zIndex: "2147483600" } as Partial<CSSStyleDeclaration>);
  if (type === "fullscreen" || type === "popup") {
    Object.assign(wrap.style, { inset: "0", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.45)" } as Partial<CSSStyleDeclaration>);
  } else {
    Object.assign(wrap.style, POS[pos] as Partial<CSSStyleDeclaration>);
  }
  if (type === "banner") Object.assign(box.style, { borderRadius: "0", width: "100vw", maxWidth: "100vw" } as Partial<CSSStyleDeclaration>);
  if (type === "sidebar") Object.assign(box.style, { height: "100vh", borderRadius: "0", width: "360px", maxWidth: "90vw" } as Partial<CSSStyleDeclaration>);
  if (type === "corner" || type === "tooltip") Object.assign(box.style, { maxWidth: "320px" } as Partial<CSSStyleDeclaration>);

  const isDismissible = a.dismissible !== false && (a.content?.dismiss !== false);
  if (isDismissible) {
    const x = document.createElement("button");
    x.textContent = "×";
    Object.assign(x.style, { position: "absolute", top: "6px", right: "10px", border: "none", background: "transparent", fontSize: "20px", cursor: "pointer", lineHeight: "1" } as Partial<CSSStyleDeclaration>);
    x.addEventListener("click", () => { emit({ kind: "interaction", ruleId, detail: "overlay_dismiss" }); animateOut(wrap, a.animation, 200, () => wrap.remove()); });
    box.appendChild(x);
  }
  wrap.appendChild(box);
  document.body.appendChild(wrap);
  animateIn(wrap, a.animation || "fade", 280);
  emit({ kind: "interaction", ruleId, detail: "overlay_shown" });
  if (a.autoCloseMs && a.autoCloseMs > 0) {
    setTimeout(() => { if (document.getElementById(id)) animateOut(wrap, a.animation, 200, () => wrap.remove()); }, a.autoCloseMs);
  }
}

function injectSection(a: { after: string; content: Record<string, unknown>; style?: Record<string, string> }, ruleId: string, emit: Emit): void {
  const anchor = document.querySelector(a.after);
  if (!anchor) return;
  const section = document.createElement("section");
  section.setAttribute("data-pa-rule", ruleId);
  const s = a.style || {};
  Object.assign(section.style, {
    borderTop: s.borderTop || "", paddingTop: s.py || "", paddingBottom: s.py || "",
    backgroundColor: s.bg || "", fontFamily: s.font || "", color: s.color || "",
  });
  const shell = document.createElement("div");
  shell.className = "shell";
  const c = a.content;
  if (c.eyebrow) {
    const ey = document.createElement("span");
    ey.className = "label text-stone";
    ey.textContent = String(c.eyebrow);
    shell.appendChild(ey);
  }
  if (c.headline) {
    const h = document.createElement("h2");
    h.className = "mt-4 text-[clamp(2rem,4.5vw,3.4rem)]";
    h.textContent = String(c.headline);
    shell.appendChild(h);
  }
  if (c.body) {
    const p = document.createElement("p");
    p.className = "mt-4 max-w-xl text-stone";
    p.textContent = String(c.body);
    shell.appendChild(p);
  }
  if (Array.isArray(c.items)) {
    const grid = document.createElement("div");
    grid.className = "mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3";
    for (const item of c.items as Array<{ label: string; detail: string }>) {
      const card = document.createElement("div");
      card.className = "border-t border-line pt-5";
      const lbl = document.createElement("h3");
      lbl.className = "text-lg";
      lbl.textContent = item.label;
      const det = document.createElement("p");
      det.className = "mt-2 text-sm text-stone";
      det.textContent = item.detail;
      card.appendChild(lbl);
      card.appendChild(det);
      grid.appendChild(card);
    }
    shell.appendChild(grid);
  }
  const cta = c.cta as { text: string; href: string } | undefined;
  if (cta) {
    const link = document.createElement("a");
    link.href = cta.href;
    link.textContent = cta.text;
    link.className = "mt-8 inline-flex items-center gap-3 px-7 py-4 text-[0.82rem] font-medium tracking-wide bg-ink text-bone hover:bg-clay transition-colors duration-300";
    link.addEventListener("click", () => emit({ kind: "interaction", ruleId, detail: "section_cta_click" }));
    shell.appendChild(link);
  }
  section.appendChild(shell);
  anchor.parentNode?.insertBefore(section, anchor.nextSibling);
  emit({ kind: "interaction", ruleId, detail: "section_injected" });
}

function injectField(a: { type: "injectField"; formSelector: string; field: FormField; position?: "start" | "end" | number }): void {
  const form = document.querySelector(a.formSelector);
  if (!form) return;
  const f = a.field;
  const wrap = document.createElement("div");
  wrap.setAttribute("data-pa-field", f.name);
  const label = document.createElement("label");
  label.textContent = f.label;
  label.style.display = "block";
  let input: HTMLElement;
  if (f.inputType === "select") {
    const sel = document.createElement("select");
    sel.name = f.name;
    for (const o of f.options || []) { const opt = document.createElement("option"); opt.value = o; opt.textContent = o; sel.appendChild(opt); }
    input = sel;
  } else {
    const inp = document.createElement("input");
    inp.type = f.inputType || "text";
    inp.name = f.name;
    if (f.placeholder) inp.placeholder = f.placeholder;
    if (f.required) inp.required = true;
    input = inp;
  }
  wrap.appendChild(label);
  wrap.appendChild(input);
  if (a.position === "start") form.insertBefore(wrap, form.firstChild);
  else if (typeof a.position === "number") form.insertBefore(wrap, form.children[a.position] || null);
  else form.appendChild(wrap);
}

export function executeAction(action: Action, ruleId: string, emit: Emit): void {
  try {
    switch (action.type) {
      case "textReplace": {
        const targets = action.selector ? els(action.selector) : (document.body ? [document.body] : []);
        for (const el of targets) {
          if (action.find) replaceInTextNodes(el, action.find, action.replace, action.all !== false);
          else el.textContent = action.replace;
        }
        break;
      }
      case "setVisibility": {
        for (const el of els(action.selector)) {
          if (!el.dataset.paDisplay) el.dataset.paDisplay = getComputedStyle(el).display === "none" ? "" : getComputedStyle(el).display;
          if (action.visible) animateIn(el, action.animation, action.durationMs);
          else animateOut(el, action.animation, action.durationMs);
        }
        break;
      }
      case "setStyle": {
        for (const el of els(action.selector)) for (const [k, v] of Object.entries(action.styles)) el.style.setProperty(k, v);
        break;
      }
      case "addClass": for (const el of els(action.selector)) el.classList.add(action.className); break;
      case "removeClass": for (const el of els(action.selector)) el.classList.remove(action.className); break;
      case "redirect": {
        if (action.newTab) window.open(action.url, "_blank");
        else window.location.assign(action.url);
        break;
      }
      case "modifyButton": {
        for (const el of els(action.selector)) {
          if (action.label !== undefined) el.textContent = action.label;
          if (action.href !== undefined && el instanceof HTMLAnchorElement) el.href = action.href;
          if (action.clickEvent) el.addEventListener("click", () => emit({ kind: "interaction", ruleId, detail: action.clickEvent! }));
          if ((action as any).changes?.addSecondary) {
            const c = (action as any).changes;
            const parent = el.parentElement;
            if (parent && c.secondaryText && c.secondaryHref) {
              const link = document.createElement("a");
              link.href = c.secondaryHref;
              link.textContent = c.secondaryText;
              if (c.secondaryClass) link.className = c.secondaryClass;
              Object.assign(link.style, {
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem 1.75rem", fontSize: "0.82rem", fontWeight: "500",
                letterSpacing: "0.025em", transition: "all 300ms", textDecoration: "none",
              });
              link.setAttribute("data-pa-rule", ruleId);
              link.addEventListener("click", () => emit({ kind: "interaction", ruleId, detail: "secondary_cta_click" }));
              parent.appendChild(link);
            }
          }
        }
        break;
      }
      case "overlay": buildOverlay(action as any, ruleId, emit); break;
      case "injectField": {
        if ("after" in action && typeof (action as any).after === "string") {
          injectSection(action as any, ruleId, emit);
        } else {
          injectField(action as any);
        }
        break;
      }
      case "personalize": {
        for (const el of els(action.selector)) {
          const html = action.html ?? action.fallback ?? "";
          if (html) el.innerHTML = html;
        }
        emit({ kind: "interaction", ruleId, detail: "personalize:" + action.source });
        break;
      }
    }
  } catch (e) {
    emit({ kind: "action_error", ruleId, error: String(e) });
  }
}
