import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

type Variant = "solid" | "invert" | "outline";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bone hover:bg-clay",
  invert: "bg-bone text-ink hover:bg-clay hover:text-bone",
  outline:
    "border border-current text-ink hover:bg-ink hover:text-bone",
};

export function Button({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls = cn(
    "group inline-flex items-center gap-3 px-7 py-4 text-[0.82rem] font-medium tracking-wide transition-colors duration-300",
    variants[variant],
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Minimal text link with an animated underline + arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 label text-ink",
        className
      )}
    >
      <span className="link-underline group-hover:link-underline-on pb-1">
        {children}
      </span>
      <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
