import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { site } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* subtle grid + accent glow */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
        aria-hidden
      />

      <Container className="relative py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          {/* left: text */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-fg-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Open to SWE · ML · AI-Research internships
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[length:var(--text-display)] font-medium leading-[var(--text-display--line-height)] tracking-[var(--text-display--letter-spacing)] text-fg">
                Syed Reebal
                <br />
                Faakhir Andrabi
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 font-mono text-sm text-fg-muted">
                Machine Learning · Computer Vision ·{" "}
                <a
                  href={site.links.iitk}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  IIT Kanpur
                </a>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
                I build machine-learning systems for high-stakes domains like
                neuroimaging, healthcare, and the environment. I report{" "}
                <span className="text-fg">honest numbers</span>, not inflated ones.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/#work" className={buttonVariants({ variant: "primary" })}>
                  View work
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* right: portrait */}
          <Reveal delay={0.15} className="justify-self-center md:justify-self-end">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[28px] opacity-30 blur-2xl"
                style={{ background: "radial-gradient(circle at 30% 20%, var(--color-accent), transparent 70%)" }}
                aria-hidden
              />
              <div className="relative aspect-[4/5] w-[260px] overflow-hidden rounded-3xl border border-line-strong bg-surface sm:w-[300px]">
                {/* Fallback shown if photo is missing */}
                <div className="absolute inset-0 grid place-items-center font-mono text-5xl text-fg-subtle/40">
                  RA
                </div>
                {/* Drop the portrait at /public/reebal.jpg */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/reebal.jpg"
                  alt="Portrait of Syed Reebal Faakhir Andrabi"
                  className="relative h-full w-full object-cover object-[50%_22%]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
