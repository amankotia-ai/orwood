"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change + lock scroll while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="shell flex h-[4.75rem] items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label="ORWOOD — home"
            className="flex items-center gap-2 text-ink"
          >
            <span className="text-lg font-semibold tracking-[0.32em]">
              ORWOOD
            </span>
            <span className="mb-2 h-1 w-1 bg-clay" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-x-6 md:flex lg:gap-x-8">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "label group relative transition-colors duration-300",
                    active ? "text-ink" : "text-stone hover:text-ink"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-px bg-clay transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="group ml-2 hidden items-center gap-2 border border-line px-4 py-2.5 text-ink transition-colors duration-300 hover:border-ink lg:inline-flex"
            >
              <span className="label">Start a project</span>
              <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </nav>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col items-end gap-1.5 md:hidden"
          >
            <span className="h-px w-7 bg-ink" />
            <span className="h-px w-5 bg-ink" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-walnut text-bone md:hidden"
          >
            <div className="shell flex h-[4.75rem] items-center justify-between">
              <span className="text-lg font-semibold tracking-[0.32em]">
                ORWOOD
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="relative h-7 w-7"
              >
                <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bone" />
                <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-bone" />
              </button>
            </div>

            <nav aria-label="Main" className="shell flex flex-1 flex-col justify-center gap-2 pb-16">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 border-b border-line-inv-soft py-5"
                  >
                    <span className="label text-bone/50">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-5xl tracking-tight transition-colors group-hover:text-clay">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell flex items-center justify-between border-t border-line-inv-soft py-6 text-bone/60">
              <a href={`mailto:${site.email}`} className="label">
                {site.email}
              </a>
              <div className="flex gap-5">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} className="label hover:text-bone">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
