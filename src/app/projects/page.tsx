import type { Metadata } from "next";
import { projects, categories } from "@/content/projects";
import { Container, Eyebrow } from "@/components/layout/container";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The complete archive of Syed Reebal Faakhir Andrabi's work: research, medical computer vision, systems, and ML.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-20 md:py-28">
      <Eyebrow>Archive</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-fg md:text-5xl">
        Everything I&apos;ve built
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
        Research, medical computer vision, systems, and machine learning. Filter by
        area or search across the stack.
      </p>

      <div className="mt-14">
        <ProjectsExplorer projects={projects} categories={categories} />
      </div>
    </Container>
  );
}
