import Link from "next/link";
import { group, services, site, siteLinks } from "@/lib/content";
import { Grain } from "@/components/grain";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-espresso text-paper/90">
      <Grain opacity={0.3} blend="overlay" />

      <div className="shell relative grid gap-12 pb-10 pt-20 md:grid-cols-12 md:gap-8 md:pt-28">
        {/* Mark + promise */}
        <div className="md:col-span-5">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.32em] text-bone"
          >
            ORWOOD
          </Link>
          <p className="mt-6 max-w-xs font-serif text-2xl leading-tight text-paper/80">
            {site.promise}
          </p>
          <div className="mt-8 flex gap-5">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="label text-bone/60 transition-colors hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer — Explore" className="md:col-span-2">
          <h3 className="label text-bone/60">Explore</h3>
          <ul className="mt-5 space-y-3">
            {siteLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-paper/80 transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Footer — Services" className="md:col-span-2">
          <h3 className="label text-bone/60">Services</h3>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link
                  href="/services"
                  className="text-paper/80 transition-colors hover:text-bone"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Studio */}
        <div className="md:col-span-3">
          <h3 className="label text-bone/60">Studio</h3>
          <address className="mt-5 space-y-1 text-paper/80 not-italic">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.city}</p>
          </address>
          <div className="mt-5 space-y-1">
            <a
              href={`mailto:${site.email}`}
              className="block text-paper/80 transition-colors hover:text-bone"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="block text-paper/80 transition-colors hover:text-bone"
            >
              {site.phone}
            </a>
          </div>
          <p className="mt-5 text-sm text-bone/50">
            A group of{" "}
            {group.map((g, i) => (
              <span key={g.id}>
                {g.name}
                {i < group.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Legal bar */}
      <div className="shell relative flex flex-col gap-3 border-t border-line-inv-soft py-6 text-sm text-bone/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} ORWOOD — {site.tagline}
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="label transition-colors hover:text-bone"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="label transition-colors hover:text-bone"
          >
            Terms
          </Link>
          <Link
            href="/sitemap"
            className="label transition-colors hover:text-bone"
          >
            Sitemap
          </Link>
          <span className="label">Designed &amp; built in-house</span>
        </div>
      </div>

      {/* Oversized signature wordmark */}
      <div
        aria-hidden
        className="relative -mb-[0.18em] select-none overflow-hidden px-[var(--spacing-shell)] leading-[0.72]"
      >
        <span className="block text-[20vw] font-semibold tracking-tight text-paper/[0.05]">
          ORWOOD
        </span>
      </div>
    </footer>
  );
}
