import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  intro,
  meta,
}: {
  /** Accepted for call-site compatibility; no longer rendered. */
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: { k: string; v: string }[];
}) {
  return (
    <header className="shell relative pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <h1 className="text-[clamp(2.8rem,8vw,7rem)] leading-[1.0] md:col-span-9">
          {title}
        </h1>
        {intro && (
          <div className="self-end md:col-span-3">
            <Reveal delay={0.15}>
              <p className="text-pretty text-lg text-stone">{intro}</p>
            </Reveal>
          </div>
        )}
      </div>

      {meta && (
        <Reveal delay={0.2}>
          <dl className="mt-16 flex flex-wrap gap-x-16 gap-y-8 border-t border-line pt-7">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="label text-stone">{m.k}</dt>
                <dd className="mt-2 text-2xl tracking-[-0.02em]">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </header>
  );
}
