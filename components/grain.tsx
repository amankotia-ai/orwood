import { cn } from "@/lib/cn";

/**
 * Film-grain texture overlay. Pure SVG, no JS. Drop into any
 * `relative` container to add tactile depth over flat color.
 */
export function Grain({
  className,
  opacity = 0.45,
  blend = "soft-light",
}: {
  className?: string;
  opacity?: number;
  blend?: "soft-light" | "overlay" | "multiply";
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity, mixBlendMode: blend }}
    >
      <filter id="orwood-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#orwood-grain)" />
    </svg>
  );
}
