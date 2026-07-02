import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects/types";
import { StatusPill } from "./status-pill";
import { Badge } from "./badge";

export function ProjectCard({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  /** Larger, first-in-list treatment. */
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-7",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover",
        className,
      )}
    >
      {/* header: category + status */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          {project.category}
        </span>
        <StatusPill status={project.status} />
      </div>

      {/* title + tagline */}
      <h3
        className={cn(
          "mt-5 font-medium tracking-tight text-fg",
          priority ? "text-2xl md:text-[28px]" : "text-xl",
        )}
      >
        {project.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted">
        {project.tagline}
      </p>

      {/* highlights */}
      {project.highlights.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {project.highlights.slice(0, 3).map((m) => (
            <div key={m.label}>
              <div className="text-lg font-medium tracking-tight text-fg">{m.value}</div>
              <div className="mt-1 text-[11px] leading-tight text-fg-subtle">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* tags */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {/* affordance */}
      <div className="mt-6 flex items-center gap-1.5 text-sm text-fg-subtle transition-colors group-hover:text-accent">
        Read case study
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
