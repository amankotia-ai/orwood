import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function ArticleCTA({
  label,
  href,
  description,
}: {
  label: string;
  href: string;
  description: string;
}) {
  return (
    <Reveal delay={0.1}>
      <div className="mx-auto mt-16 max-w-2xl border-t border-b border-line py-12">
        <span className="label text-clay">Next step</span>
        <h3 className="mt-4 text-2xl tracking-[-0.01em] md:text-3xl">
          {label}
        </h3>
        <p className="mt-3 max-w-lg text-stone">{description}</p>
        <div className="mt-8">
          <Button href={href}>{label}</Button>
        </div>
      </div>
    </Reveal>
  );
}
