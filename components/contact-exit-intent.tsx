"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { Arrow } from "@/components/ui/button";
import {
  CONTACT_FORM_STARTED_EVENT,
  hasContactFormStarted,
} from "@/lib/contact-form-events";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Only fire once per tab session — a visitor who saw it and stayed shouldn't see it again. */
const SHOWN_KEY = "orwood_contact_exit_intent_shown";

/** Give the page a moment to settle before arming, so a fast mouse pass on
 * load (moving toward the tab bar, reading the URL bar, etc.) doesn't fire. */
const ARM_DELAY_MS = 3500;

/**
 * Exit-intent overlay for /contact.
 *
 * The commercial-developer persona called the page "a dead end without
 * proof" — there is no link back to certifications, case studies or
 * /manufacturing before the form asks for a message, and 3 of 6 visitors who
 * reach /contact leave without starting it. This catches a visitor's cursor
 * heading for the tab/URL bar and surfaces the proof (project count,
 * certifications) with a path to the evidence, instead of just a form.
 *
 * Desktop-only by design: exit-intent-by-cursor has no touch equivalent, and
 * a mistimed overlay on mobile would just be an obstruction. Suppressed
 * entirely once the visitor has started the form (see lib/contact-form-events).
 */
export function ContactExitIntent() {
  const [visible, setVisible] = useState(false);
  const armedRef = useRef(false);
  const startedRef = useRef(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;

    try {
      if (sessionStorage.getItem(SHOWN_KEY)) return;
    } catch {
      // proceed without the guard — worst case it can show more than once.
    }

    if (hasContactFormStarted()) return;

    const onStarted = () => {
      startedRef.current = true;
    };
    window.addEventListener(CONTACT_FORM_STARTED_EVENT, onStarted);

    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, ARM_DELAY_MS);

    function onMouseOut(e: MouseEvent) {
      if (!armedRef.current || startedRef.current || firedRef.current) return;
      // Only the true top-edge exit toward the browser chrome: no relatedTarget
      // and a negative/zero clientY, not every mouseout inside the page.
      if (e.relatedTarget || e.clientY > 0) return;

      firedRef.current = true;
      setVisible(true);
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        // still shown for this tab even if it can't be remembered.
      }
      posthog.capture("contact_exit_intent_shown", { page: "/contact" });
    }

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener(CONTACT_FORM_STARTED_EVENT, onStarted);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close("escape");
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function close(reason: "escape" | "backdrop" | "dismiss" | "cta", destination?: string) {
    setVisible(false);
    posthog.capture("contact_exit_intent_closed", {
      reason,
      destination: destination ?? null,
    });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-shell backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close("backdrop");
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-md border border-line bg-bone p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => close("dismiss")}
              aria-label="Close"
              className="absolute right-5 top-5 text-stone transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-clay focus-visible:outline-offset-2"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            <span className="label text-clay">Before you go</span>
            <h2 id="exit-intent-title" className="mt-3 text-2xl leading-tight md:text-[1.7rem]">
              See the proof, not just the form.
            </h2>
            <p className="mt-4 text-stone">
              200+ projects delivered. Fire-rated door sets tested and
              certified to ISO 9001, ISO 14001 and BS EN 1634-1, manufactured
              as complete assemblies rather than sourced components.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/manufacturing"
                onClick={() => close("cta", "/manufacturing")}
                className="group inline-flex items-center justify-between gap-3 bg-ink px-6 py-4 text-[0.82rem] font-medium tracking-wide text-bone transition-colors duration-300 hover:bg-clay"
              >
                <span>View certifications &amp; test reports</span>
                <Arrow className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                onClick={() => close("cta", "/projects")}
                className="group inline-flex items-center justify-between gap-3 border border-line px-6 py-4 text-[0.82rem] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-ink"
              >
                <span>See case studies</span>
                <Arrow className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => close("dismiss")}
              className="mt-6 label text-stone underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              Continue to the form
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
