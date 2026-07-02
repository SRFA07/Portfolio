import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, BookText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getProject, allSlugs, projects } from "@/content/projects";
import { Container } from "@/components/layout/container";
import { StatusPill } from "@/components/ui/status-pill";
import { Badge } from "@/components/ui/badge";
import { BlockRenderer } from "@/components/projects/block-renderer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

const metaLinks = [
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "demo", label: "Live demo", Icon: ExternalLink },
  { key: "paper", label: "Paper", Icon: BookText },
  { key: "report", label: "Report", Icon: FileText },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <article className="pb-24">
      {/* hero */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <Container className="relative py-16 md:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {project.category}
            </span>
            <span className="text-fg-subtle">·</span>
            <StatusPill status={project.status} />
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-medium leading-tight tracking-tight text-fg md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {project.tagline}
          </p>

          {/* meta grid */}
          <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Role" value={project.role} />
            <Meta label="Timeline" value={project.duration ?? project.year} />
            <Meta label="Category" value={project.category} />
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Links
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {metaLinks.map(({ key, label, Icon }) => {
                  const href = project.links[key];
                  if (!href) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* stack chips */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </Container>
      </header>

      {/* highlights band */}
      {project.highlights.length > 0 && (
        <div className="border-b border-line bg-bg-subtle">
          <Container className="grid gap-6 py-10 sm:grid-cols-3">
            {project.highlights.map((m) => (
              <div key={m.label}>
                <div className="text-3xl font-medium tracking-tight text-fg">{m.value}</div>
                <div className="mt-1.5 text-sm text-fg-muted">{m.label}</div>
                {m.sub && <div className="mt-0.5 text-xs text-fg-subtle">{m.sub}</div>}
              </div>
            ))}
          </Container>
        </div>
      )}

      {/* body */}
      <Container className="py-16">
        {project.sections ? (
          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
            {/* TOC */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 space-y-2">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  Contents
                </div>
                {project.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {s.heading}
                  </a>
                ))}
              </nav>
            </aside>

            {/* sections */}
            <div className="max-w-3xl space-y-16">
              {project.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  {s.kicker && (
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {s.kicker}
                    </div>
                  )}
                  <h2 className="mt-3 text-2xl font-medium tracking-tight text-fg md:text-3xl">
                    {s.heading}
                  </h2>
                  <div className="mt-6">
                    <BlockRenderer blocks={s.blocks} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[15px] leading-relaxed text-fg-muted">{project.summary}</p>
            <p className="mt-6 text-sm text-fg-subtle">
              A full written case study for this project is in progress. In the
              meantime, the code and report tell the story.
            </p>
          </div>
        )}
      </Container>

      {/* next project */}
      <Container>
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-hover"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              Next project
            </div>
            <div className="mt-1.5 text-lg font-medium text-fg">{next.title}</div>
          </div>
          <ArrowLeft className="h-5 w-5 rotate-180 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </Container>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </div>
      <div className="mt-2 text-sm text-fg">{value}</div>
    </div>
  );
}
