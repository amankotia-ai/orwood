import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectsGallery } from "@/components/projects-gallery";
import { CTA } from "@/components/cta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected interiors by ORWOOD across hospitality, commercial and residential — designed, made and delivered as turnkey projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        index="2022 — 2024"
        title={
          <>
            Interiors we were
            <br />
            part of.
          </>
        }
        intro="A selection across hospitality, commercial and residential. Each one designed, manufactured and delivered by the same house."
      />
      <ProjectsGallery />
      <CTA
        eyebrow="Selected work"
        title="Your project could be next."
        body="Bring us the brief — we'll bring the studio, the workshops and the team to deliver it."
        cta="Start a project"
      />
    </>
  );
}
