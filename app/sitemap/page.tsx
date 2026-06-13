import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Arrow } from "@/components/ui/button";
import { siteLinks, projects, sectors, journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "A complete index of the ORWOOD website — every page, project and journal entry, in one place.",
};

type SitemapLink = { label: string; href: string };

const groups: { title: string; links: SitemapLink[] }[] = [
  {
    title: "Pages",
    links: [{ label: "Home", href: "/" }, ...siteLinks],
  },
  {
    title: "Projects",
    links: projects.map((p) => ({
      label: p.title,
      href: `/projects/${p.id}`,
    })),
  },
  {
    title: "Industries",
    links: sectors.map((s) => ({
      label: s.title,
      href: `/industries/${s.id}`,
    })),
  },
  {
    title: "Insights / Journal",
    links: journal.map((a) => ({ label: a.title, href: `/journal/${a.id}` })),
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        index="Find your way"
        title={
          <>
            Everything,
            <br />
            in one place.
          </>
        }
        intro="A complete index of the ORWOOD website — every page, project and journal entry."
      />

      <div className="shell pb-28 md:pb-40">
        <div className="grid gap-x-16 gap-y-16 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={(gi % 2) * 0.06}>
              <section>
                <h2 className="label text-stone-soft">{g.title}</h2>
                <ul className="mt-6">
                  {g.links.map((l) => (
                    <li key={`${g.title}-${l.href}`}>
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-4 border-b border-line py-4 first:border-t"
                      >
                        <span className="text-lg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                          {l.label}
                        </span>
                        <Arrow className="h-4 w-4 shrink-0 -translate-x-2 text-stone opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
