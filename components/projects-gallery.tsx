"use client";

import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectsGallery() {
  const [lead, ...rest] = projects;

  return (
    <div className="pb-32 md:pb-40">
      {/* Lead project — full bleed */}
      <Reveal>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <ProjectCard project={lead} featured />
        </motion.div>
      </Reveal>

      {/* Remaining projects — two-up grid */}
      <motion.div
        layout
        className="shell mt-20 grid gap-x-8 gap-y-20 sm:grid-cols-2 md:mt-28 md:gap-x-12 md:gap-y-28"
      >
        <AnimatePresence mode="popLayout">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <motion.div
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
            </Reveal>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
