import { site } from "@/lib/site";
import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const focus = [
  "Neuroimaging & medical AI",
  "Computer vision",
  "Environmental forecasting",
  "Deep learning & GNNs",
  "Leakage-safe evaluation",
];

export function About() {
  return (
    <Section id="about" className="border-t border-line">
      <Container>
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-fg md:text-4xl">
                Curious about the ideas as much as the technology
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-fg-muted">
                <p>
                  I&apos;m a third-year undergraduate at{" "}
                  <a
                    href={site.links.iitk}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    IIT Kanpur
                  </a>,{" "}
                  enrolled in Civil Engineering, but I taught myself into machine
                  learning, computer vision, and intelligent systems that solve
                  real-world problems. My work spans neuroimaging, healthcare AI,
                  environmental forecasting, and deep learning, and across all of it I
                  care as much about the reasoning behind a system as the system itself.
                </p>
                <p>
                  A recurring thread runs through my projects: methodological honesty.
                  Whether it&apos;s leave-one-site-out validation on multi-site MRI,
                  subject-wise splitting to expose data leakage, or out-of-time testing
                  for forecasting, I&apos;d rather report a defensible number than an
                  impressive one.
                </p>
                <p>
                  I read philosophy because it reminds me that every answer begins with
                  a better question, a mindset that shapes how I engineer: stay curious,
                  think from first principles, and build with purpose. Off the screen,
                  I serve as Maintenance Secretary on the Hall Executive Committee of
                  Hall 3, and I swim, play football, and listen to classical music.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-7">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Focus areas
              </div>
              <ul className="mt-5 space-y-3">
                {focus.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-fg">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-fg-muted">
                Currently: multimodal MDD detection research and evolving a PM2.5
                forecaster into an air-quality decision agent.
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
