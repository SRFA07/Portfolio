import { GraduationCap } from "lucide-react";
import { experience, education } from "@/content/experience";
import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-line">
      <Container>
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-fg md:text-4xl">
            Research, product, and the classroom
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.5fr_1fr]">
          {/* timeline */}
          <div className="relative border-l border-line pl-8">
            {experience.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.05}>
                <div className="relative pb-10 last:pb-0">
                  {/* dot */}
                  <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-line-strong bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-medium text-fg">{item.role}</h3>
                    <span className="font-mono text-xs text-fg-subtle">{item.period}</span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-accent">{item.org}</div>

                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* education */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-accent" />
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  Education
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {education.map((e) => (
                  <div key={e.degree} className="border-b border-line pb-6 last:border-0 last:pb-0">
                    <div className="text-sm font-medium text-fg">{e.degree}</div>
                    <div className="mt-1 text-xs text-fg-muted">{e.org}</div>
                    <div className="mt-0.5 font-mono text-xs text-fg-subtle">{e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
