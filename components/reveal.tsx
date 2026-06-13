"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-into-view reveal.
 * - default: fade + rise
 * - mask: line wipes up from a clipped box (for headings)
 *
 * Implemented with a native IntersectionObserver + CSS transitions, plus a
 * hard fallback timeout so content can NEVER stay hidden if the observer
 * misbehaves. Progressive enhancement: the markup is fully present; this only
 * animates it in.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  mask = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  mask?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement & HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Safety net: never leave content invisible.
    const fallback = window.setTimeout(() => setShown(true), 1600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  if (mask) {
    return (
      <span ref={ref} className={cn("block overflow-hidden", className)}>
        <span
          className="block transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{
            transitionDelay: `${delay}s`,
            transform: shown ? "translateY(0%)" : "translateY(115%)",
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className
      )}
      style={{
        transitionDelay: `${delay}s`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
