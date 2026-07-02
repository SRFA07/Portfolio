import { ArrowRight, FileText } from "lucide-react";
import { site } from "@/lib/site";
import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { CopyEmail } from "./copy-email";

export function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 text-center md:px-16 md:py-20">
            <div
              className="pointer-events-none absolute -bottom-32 left-1/2 h-[360px] w-[620px] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
              style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
              aria-hidden
            />
            <Eyebrow className="relative">Contact</Eyebrow>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight text-fg md:text-5xl">
              Looking for someone who solves hard problems?
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              I&apos;m open to software engineering, machine learning, and AI-research
              internships. The fastest way to reach me is email.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              <CopyEmail email={site.email} />
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "primary" })}
              >
                <FileText className="h-4 w-4" />
                Download résumé
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
