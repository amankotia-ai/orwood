import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Artwork } from "@/components/artwork";
import { CTA } from "@/components/cta";
import { ArrowLink } from "@/components/ui/button";
import { group, stats } from "@/lib/content";
import { StatCounter } from "@/components/stat-counter";

export const metadata: Metadata = {
  title: "The Group",
  description:
    "ORWOOD operates three owned production houses: Hi Mobilya for furniture, SILADU for materials and surfaces, and ORWOOD Doors for fire-rated and acoustic door systems. One group, one standard.",
};

const brands = [
  {
    ...group[0], // Hi Mobilya
    tone: 0,
    detail:
      "Bespoke and contract furniture produced on dedicated CNC and finishing lines. From a single signature piece to the full FF&E schedule of a 300-key hotel, Hi Mobilya runs the production programme and delivers to site.",
    href: "/manufacturing",
  },
  {
    ...group[1], // SILADU
    tone: 5,
    detail:
      "Veneer matching, solid-wood development and composite engineering. SILADU is the materials house behind every ORWOOD interior: the palette that gives joinery its grain, warmth and finish consistency across an entire project.",
    href: "/manufacturing",
  },
  {
    ...group[2], // ORWOOD Doors
    tone: 4,
    detail:
      "A proprietary acoustic and fire-rated door system. Every ORWOOD door set is designed, manufactured and tested as a complete certified assembly: leaf, frame, seals and hardware from one production line, to one test report.",
    href: "/orwood-doors",
  },
];

const pillars = [
  {
    title: "Single accountability",
    body: "Design, furniture, surfaces and doors come from one organisation. One number to call when a detail needs resolving. No supplier chain to navigate when the programme shifts.",
  },
  {
    title: "Made to specification",
    body: "Because we own the workshops, we can prototype a detail, test it and remake it before it leaves the floor. What arrives on site matches what was drawn.",
  },
  {
    title: "Engineered to last",
    body: "Hospitality and commercial interiors are used hard. Every piece is made for the tenth year, not the opening photograph. The workshops are the guarantee.",
  },
];

export default function GroupPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Three workshops.
            <br />
            One standard.
          </>
        }
        intro="Hi Mobilya, SILADU and ORWOOD Doors are the production houses behind every ORWOOD interior — furniture, surfaces and door systems made in-house, to specification, at scale."
        meta={[
          { k: "Production houses", v: "03" },
          { k: "Made in", v: "İstanbul" },
          { k: "Since", v: "2004" },
          { k: "Countries", v: "15" },
        ]}
      />

      {/* Pull quote */}
      <section className="bg-sand">
        <div className="shell py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <p className="text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.28] tracking-[-0.01em]">
              When the furniture, the surfaces and the doors all come from one
              roof, every detail compounds. There is no gap between what was
              specified and what arrives on site.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <ArrowLink href="/manufacturing">
                See the manufacturing operation
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand cards */}
      <section className="shell py-28 md:py-40">
        <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
          <Reveal mask>The production houses</Reveal>
        </h2>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {brands.map((brand, i) => (
            <Reveal key={brand.id} delay={i * 0.08}>
              <Link href={brand.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Artwork
                    tone={brand.tone}
                    className="h-full w-full"
                    label={brand.name}
                  />
                </div>
                <div className="mt-6 border-t border-line pt-6">
                  <h3 className="text-2xl">{brand.name}</h3>
                  <span className="label mt-1 block text-clay">
                    {brand.role}
                  </span>
                  <p className="mt-4 text-stone">{brand.detail}</p>
                  <span className="link-underline mt-6 inline-block text-sm">
                    Learn more
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-walnut text-paper">
        <div className="shell py-24 md:py-32">
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <div className="text-[clamp(2.6rem,5vw,4.4rem)] leading-none text-bone">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-4 max-w-[14ch] text-sm text-paper/70">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why owned manufacturing matters */}
      <section className="shell py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)]">
              <Reveal mask>Made, not just</Reveal>
              <Reveal mask delay={0.05}>
                specified.
              </Reveal>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xs text-stone">
                Owning the workshops is the difference between specifying a
                detail and guaranteeing it.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="border-t border-line py-8 last:border-b">
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-3 text-stone">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop image */}
      <Reveal>
        <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden md:h-[60vh]">
          <Artwork
            tone={0}
            className="h-full w-full"
            label="Production campus — İkitelli, İstanbul"
          />
        </div>
      </Reveal>

      <CTA
        title="Have a project that needs making?"
        body="Bring us the brief. Our three production houses cover furniture, surfaces and door systems — designed, manufactured and delivered as one programme."
        cta="Start a conversation"
      />
    </>
  );
}
