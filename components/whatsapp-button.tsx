"use client";

import posthog from "posthog-js";
import { site } from "@/lib/content";

const MESSAGE = "Hello ORWOOD — I'd like to talk about a project.";

function trackWhatsAppClick() {
  const data = { page: window.location.pathname };
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "whatsapp_click", data);
  } else if (navigator.sendBeacon) {
    navigator.sendBeacon(
      `https://www.google-analytics.com/g/collect?en=whatsapp_click&ep.page=${encodeURIComponent(data.page)}`,
    );
  }
  posthog.capture("whatsapp_clicked", { page: data.page });
}

/** Floating WhatsApp click-to-chat. Uses a placeholder number (site.whatsapp). */
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noreferrer"
      onClick={trackWhatsAppClick}
      aria-label="Chat with ORWOOD on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bone shadow-[0_6px_24px_rgba(24,20,18,0.28)] transition-colors duration-300 hover:bg-clay md:bottom-7 md:right-7 md:h-14 md:w-14"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="h-6 w-6 md:h-7 md:w-7"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-4.53 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.29 3.25.16.21 2.22 3.39 5.38 4.62 2.62 1.03 3.16.83 3.73.78.57-.05 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37-.31-.16-1.84-.91-2.13-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.37.23-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.6-.01Z" />
      </svg>
    </a>
  );
}
