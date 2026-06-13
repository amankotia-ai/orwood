import { cn } from "@/lib/cn";
import { Grain } from "./grain";

/**
 * Art-directed placeholder visual.
 *
 * A quiet tonal field with film grain — a stand-in for real project
 * photography. Deterministic per `tone` so the same project always looks
 * the same. To swap in a real photo, replace <Artwork/> with <Image/>
 * (the containers already clip + cover).
 */

type Tone = { from: string; to: string; dark: boolean };

const tones: Tone[] = [
  { from: "#26221f", to: "#161210", dark: true }, // charcoal
  { from: "#e7e3da", to: "#d6d0c4", dark: false }, // light greige
  { from: "#bdb6aa", to: "#a39c8f", dark: false }, // mid stone
  { from: "#732017", to: "#4d150e", dark: true }, // oxblood (sparingly)
  { from: "#3a3531", to: "#211d1a", dark: true }, // deep charcoal
  { from: "#efece4", to: "#e1dccf", dark: false }, // pale
];

export function Artwork({
  tone = 0,
  className,
  label,
  alt,
}: {
  tone?: number;
  className?: string;
  label?: string;
  alt?: string;
}) {
  const t = tones[((tone % tones.length) + tones.length) % tones.length];

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundImage: `linear-gradient(168deg, ${t.from}, ${t.to})` }}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      {/* soft directional light from top */}
      <div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
        }}
      />
      <Grain opacity={0.32} blend={t.dark ? "overlay" : "soft-light"} />
      {/* crisp inner hairline so the image area reads intentional */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: t.dark
            ? "inset 0 0 0 1px rgba(255,255,255,0.05)"
            : "inset 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      />
      {label && (
        <span
          className={cn(
            "absolute bottom-4 left-4 text-[0.7rem] font-medium uppercase tracking-[0.18em]",
            t.dark ? "text-bone/60" : "text-ink/45"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
