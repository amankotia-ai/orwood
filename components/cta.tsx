import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Grain } from "@/components/grain";

export function CTA({
  eyebrow = "Start a project",
  title = "Ready to start a new project with ORWOOD?",
  body = "Tell us what you're building. We'll bring the design, the workshop and the team to deliver it — start to finish.",
  cta = "Get in touch",
  href = "/contact",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-walnut text-paper">
      <Grain opacity={0.32} blend="overlay" />
      {/* deep oxblood light */}
      <div
        className="pointer-events-none absolute -left-[10%] top-1/2 h-[120%] w-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "#732017", opacity: 0.22 }}
      />
      <div className="shell relative grid gap-10 py-28 md:grid-cols-12 md:items-end md:py-40">
        <div className="md:col-span-8">
          <h2 data-pano="cta-headline" className="max-w-3xl text-[clamp(2.4rem,5.5vw,4.6rem)] text-bone">
            <Reveal mask delay={0.05}>
              {title}
            </Reveal>
          </h2>
          <Reveal delay={0.1}>
            <p data-pano="cta-body" className="mt-7 max-w-md text-paper/70">{body}</p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <Reveal delay={0.15}>
            <Button href={href} variant="invert">
              {cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
