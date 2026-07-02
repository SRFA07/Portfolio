"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Project, Category } from "@/content/projects/types";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

export function ProjectsExplorer({
  projects,
  categories,
}: {
  projects: Project[];
  categories: readonly Category[];
}) {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const matchesQuery =
        q === "" ||
        [p.title, p.summary, p.tagline, ...p.tags, ...p.stack]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesQuery;
    });
  }, [projects, active, query]);

  const tabs: (Category | "All")[] = ["All", ...categories];

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* category filter */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const count =
              tab === "All"
                ? projects.length
                : projects.filter((p) => p.category === tab).length;
            if (count === 0) return null;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active === tab
                    ? "border-transparent bg-fg text-bg"
                    : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {tab}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* search */}
        <div className="relative md:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:border-line-strong focus:outline-none"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} className="h-full" />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-fg-subtle">
          No projects match that filter.
        </p>
      )}
    </div>
  );
}
