import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

export function Featured() {
  return (
    <Section id="work">
      <Container>
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-fg md:text-4xl">
              Systems I&apos;ve built and rigorously validated
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-accent"
            >
              Full archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.05}
              className={cn(i === 0 && "md:col-span-2")}
            >
              <ProjectCard project={project} priority={i === 0} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
