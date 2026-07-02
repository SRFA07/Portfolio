import { Container, Section, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const groups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["Python", "C++", "C", "SQL", "HTML / CSS", "LaTeX"] },
  {
    title: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "XGBoost", "OpenCV"],
  },
  {
    title: "CV & Medical Imaging",
    items: ["Nilearn", "Nibabel", "TorchIO", "3D CNNs", "Attention / XAI"],
  },
  {
    title: "Methods & Research",
    items: [
      "Leakage-safe validation",
      "ComBat harmonization",
      "Conformal prediction",
      "SHAP / permutation importance",
    ],
  },
  {
    title: "Data & Viz",
    items: ["NumPy", "pandas", "Matplotlib", "Seaborn", "statsmodels"],
  },
  { title: "Backend & Tools", items: ["Flask", "REST APIs", "Docker", "Git", "Linux", "MATLAB"] },
];

export function Skills() {
  return (
    <Section id="skills" className="border-t border-line">
      <Container>
        <Reveal>
          <Eyebrow>Toolkit</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-fg md:text-4xl">
            What I work with
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.05}>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  {g.title}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
