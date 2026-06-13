"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectRegion, type Project } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

type Dim = "industry" | "region" | "year";
type Filter = Record<Dim, string>;

const CLEAR: Filter = { industry: "All", region: "All", year: "All" };

const years = Array.from(new Set(projects.map((p) => p.year)))
  .sort()
  .reverse();

const FACETS: { key: Dim; label: string; values: string[] }[] = [
  {
    key: "industry",
    label: "Industry",
    values: ["All", "Hospitality", "Commercial", "Residential"],
  },
  { key: "region", label: "Region", values: ["All", "GCC", "Türkiye", "UK & Europe"] },
  { key: "year", label: "Year", values: ["All", ...years] },
];

const valueOf = (p: Project, dim: Dim) =>
  dim === "industry"
    ? p.sector
    : dim === "region"
      ? projectRegion(p)
      : p.year;

const matches = (p: Project, f: Filter) =>
  FACETS.every(({ key }) => f[key] === "All" || valueOf(p, key) === f[key]);

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>(CLEAR);

  const list = projects.filter((p) => matches(p, filter));
  const active = (Object.keys(filter) as Dim[]).some((k) => filter[k] !== "All");

  return (
    <div className="shell pb-24 md:pb-32">
      {/* Faceted filter bar */}
      <div className="sticky top-[4.75rem] z-30 -mx-[var(--spacing-shell)] mb-12 border-y border-line bg-paper/85 px-[var(--spacing-shell)] py-5 backdrop-blur-md md:top-20">
        <div className="space-y-2.5">
          {FACETS.map((facet) => (
            <div
              key={facet.key}
              className="flex flex-wrap items-center gap-x-6 gap-y-1.5"
            >
              <span className="label w-14 shrink-0 text-stone-soft">
                {facet.label}
              </span>
              {facet.values.map((v) => {
                const selected = filter[facet.key] === v;
                const count = projects.filter((p) =>
                  matches(p, { ...filter, [facet.key]: v })
                ).length;
                const disabled = count === 0 && !selected;
                return (
                  <button
                    key={v}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      setFilter((f) => ({ ...f, [facet.key]: v }))
                    }
                    className={cn(
                      "label relative inline-flex items-center gap-1.5 py-1 transition-colors duration-300",
                      selected ? "text-ink" : "text-stone hover:text-ink",
                      disabled &&
                        "cursor-not-allowed text-stone-soft/40 hover:text-stone-soft/40"
                    )}
                  >
                    {v}
                    <sup
                      className={cn(
                        "text-[0.62rem]",
                        selected ? "text-clay" : "text-stone-soft"
                      )}
                    >
                      {count}
                    </sup>
                    {selected && (
                      <motion.span
                        layoutId={`underline-${facet.key}`}
                        className="absolute -bottom-1 left-0 h-px w-full bg-clay"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Result line */}
        <div className="mt-3 flex items-center gap-5 border-t border-line-soft pt-3">
          <span className="label text-stone">
            {list.length} {list.length === 1 ? "project" : "projects"}
          </span>
          {active && (
            <button
              type="button"
              onClick={() => setFilter(CLEAR)}
              className="label text-stone underline-offset-4 transition-colors hover:text-clay hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-14 md:gap-y-24"
      >
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              id={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="scroll-mt-44"
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="py-20 text-center text-stone">
          No projects match those filters.
        </p>
      )}
    </div>
  );
}
