import { Award, Users } from "lucide-react";
import { awards, leadership, type Achievement } from "@/content/experience";
import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

function Column({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Award;
  title: string;
  items: Achievement[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-accent" />
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
          {title}
        </div>
      </div>
      <ul className="mt-6 space-y-6">
        {items.map((item) => (
          <li key={item.title} className="border-b border-line pb-6 last:border-0 last:pb-0">
            <div className="text-sm font-medium leading-snug text-fg">{item.title}</div>
            <div className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" className="border-t border-line">
      <Container>
        <Reveal>
          <Eyebrow>Recognition</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-fg md:text-4xl">
            Awards & leadership
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <Reveal>
            <Column icon={Award} title="Awards & honors" items={awards} />
          </Reveal>
          <Reveal delay={0.05}>
            <Column icon={Users} title="Positions of responsibility" items={leadership} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
