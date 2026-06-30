import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Arrow } from "@/components/ui/button";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  featured = false,
  headingLevel = 3,
  className,
}: {
  project: Project;
  featured?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn("group block", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured
            ? "h-[58vh] min-h-[380px] md:h-[76vh]"
            : "aspect-[4/5]"
        )}
      >
        <Artwork
          tone={project.tone}
          src={project.image}
          className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          label={project.location}
          alt={`${project.title} — ${project.location}`}
        />
      </div>

      <div className={cn("mt-6 flex items-baseline justify-between gap-4", featured && "shell")}>
        <Heading
          className={cn(
            "tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
            featured ? "text-2xl md:text-4xl" : "text-2xl"
          )}
        >
          {project.title}
        </Heading>
        <div className="flex shrink-0 items-center gap-3">
          <span className="label text-stone">
            {featured ? `${project.scope} — ${project.year}` : project.year}
          </span>
          <Arrow className="h-3.5 w-3.5 -translate-x-2 text-stone opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </div>
      <p className={cn("mt-2 text-sm text-stone", featured && "shell")}>
        {project.sector} &middot; {featured ? project.summary : project.scope}
      </p>
    </Link>
  );
}
