import Link from "next/link";
import { Artwork } from "@/components/artwork";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Artwork
          tone={project.tone}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          label={project.location}
          alt={`${project.title} — ${project.location}`}
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl">{project.title}</h3>
        <span className="label shrink-0 text-stone">{project.year}</span>
      </div>
      <p className="mt-1.5 text-sm text-stone">
        {project.sector} &middot; {project.scope}
      </p>
    </Link>
  );
}
