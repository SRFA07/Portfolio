import type { ReactNode } from "react";

/**
 * Registry of hand-built SVG diagrams referenced by { type: "diagram", id }.
 * Colours use the design-system CSS variables so diagrams theme automatically.
 */

const line = "var(--color-line-strong)";
const surface = "var(--color-surface)";
const fg = "var(--color-fg)";
const muted = "var(--color-fg-muted)";
const subtle = "var(--color-fg-subtle)";
const accent = "var(--color-accent)";
const accentSoft = "var(--color-accent-soft)";

function Box({
  x,
  y,
  w,
  h,
  title,
  lines = [],
  accented = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accented?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={accented ? accentSoft : surface}
        stroke={accented ? accent : line}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + 22}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={600}
        fill={accented ? accent : fg}
      >
        {title}
      </text>
      {lines.map((l, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={y + 40 + i * 15}
          textAnchor="middle"
          fontSize={10.5}
          fill={subtle}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={muted} strokeWidth={1.5} fill="none">
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} />
      <path d={`M ${x2 - 8} ${y - 4} L ${x2} ${y} L ${x2 - 8} ${y + 4}`} />
    </g>
  );
}

function MddPipeline() {
  return (
    <svg
      viewBox="0 0 960 260"
      className="w-full"
      role="img"
      aria-label="Multimodal MDD pipeline from MRI inputs to a leakage-safe prediction"
    >
      {/* LOSO enclosure around preprocessing → models → fusion */}
      <rect
        x={366}
        y={44}
        width={576}
        height={172}
        rx={14}
        fill="none"
        stroke={accent}
        strokeOpacity={0.4}
        strokeDasharray="5 5"
      />
      <text x={654} y={36} textAnchor="middle" fontSize={11} fill={accent}>
        Leave-one-site-out CV · every transform fit on training sites only
      </text>

      {/* Stage 1: inputs */}
      <Box x={16} y={70} w={150} h={54} title="fMRI" lines={["FC 6,670-D · ROI 580"]} />
      <Box x={16} y={136} w={150} h={54} title="sMRI (VBM)" lines={["gray-matter · 116"]} />

      {/* Stage 2: features */}
      <Box x={200} y={98} w={150} h={64} title="Feature build" lines={["Fisher-z / tangent", "AAL-116 atlas"]} />

      {/* Stage 3: preprocessing */}
      <Box
        x={386}
        y={98}
        w={150}
        h={64}
        title="Fit-in-fold prep"
        lines={["confounds · ComBat", "standardize"]}
      />

      {/* Stage 4: models */}
      <Box
        x={572}
        y={98}
        w={150}
        h={64}
        title="Per-modality models"
        lines={["SVM · LogReg", "XGBoost · GNN"]}
      />

      {/* Stage 5: fusion → output */}
      <Box
        x={758}
        y={98}
        w={168}
        h={64}
        title="Stacking → P(MDD)"
        lines={["nested-CV meta-learner"]}
        accented
      />

      {/* arrows */}
      <Arrow x1={166} x2={200} y={116} />
      <Arrow x1={166} x2={200} y={150} />
      <Arrow x1={350} x2={386} y={130} />
      <Arrow x1={536} x2={572} y={130} />
      <Arrow x1={722} x2={758} y={130} />
    </svg>
  );
}

/** Generic left-to-right pipeline of 5 stages, last one accented. */
function Pipeline({
  label,
  stages,
}: {
  label?: string;
  stages: { title: string; lines?: string[]; accented?: boolean }[];
}) {
  // Fixed 5-column layout tuned for a 960-wide viewBox.
  const xs = [8, 196, 384, 590, 778];
  const ws = [150, 150, 168, 150, 174];
  const y = label ? 78 : 64;
  const h = 68;
  const cy = y + h / 2;
  return (
    <svg
      viewBox={`0 0 960 ${label ? 190 : 172}`}
      className="w-full"
      role="img"
      aria-label={label ?? "pipeline diagram"}
    >
      {label && (
        <text x={480} y={30} textAnchor="middle" fontSize={11} fill={accent}>
          {label}
        </text>
      )}
      {stages.slice(0, 5).map((s, i) => (
        <Box
          key={i}
          x={xs[i]}
          y={y}
          w={ws[i]}
          h={h}
          title={s.title}
          lines={s.lines}
          accented={s.accented}
        />
      ))}
      {stages.slice(0, 4).map((_, i) => (
        <Arrow key={i} x1={xs[i] + ws[i]} x2={xs[i + 1]} y={cy} />
      ))}
    </svg>
  );
}

const AxialArchitecture = () => (
  <Pipeline
    label="Modified AXIAL · evaluated under strict subject-wise splitting"
    stages={[
      { title: "Axial slices", lines: ["100 × 128²", "entropy-selected"] },
      { title: "ResNet-152", lines: ["frozen backbone"] },
      { title: "Attention-XAI", lines: ["per-slice α → Σ"] },
      { title: "2048-D vector", lines: ["subject-level"] },
      { title: "MLP → AD / CN", lines: ["+ saliency"], accented: true },
    ]}
  />
);

const AirsenseLoop = () => (
  <Pipeline
    label="Perceive → reason → act loop"
    stages={[
      { title: "Live AQI + weather", lines: ["CPCB · IMD"] },
      { title: "Forecaster agent", lines: ["ST-GNN + conformal"] },
      { title: "Shared state", lines: ["forecast + intervals"] },
      { title: "Agents", lines: ["route · notify · LLM+RAG"] },
      { title: "User", lines: ["route / alert / answer"], accented: true },
    ]}
  />
);

const DeepCompressionStages = () => (
  <Pipeline
    label="Fine-tuning restores accuracy after prune & quantize"
    stages={[
      { title: "VGG-11", lines: ["37.2 MB · baseline"] },
      { title: "① Prune", lines: ["90% sparsity"] },
      { title: "② Quantize", lines: ["k-means · 8/5-bit"] },
      { title: "③ Huffman", lines: ["entropy coding"] },
      { title: "Compressed", lines: ["1.57 MB · 23.8×"], accented: true },
    ]}
  />
);

const MediqPipeline = () => (
  <Pipeline
    label="Offline training (once) → online serving (fast, stateless)"
    stages={[
      { title: "8 CSVs", lines: ["raw medical data"] },
      { title: "ETL + keys", lines: ["clean + harmonize"] },
      { title: "Matrix + KB", lines: ["4,920 × 132"] },
      { title: "Random Forest", lines: ["300 trees"] },
      { title: "Flask API → UI", lines: ["top-5 differential"], accented: true },
    ]}
  />
);

const registry: Record<string, () => ReactNode> = {
  "mdd-pipeline": MddPipeline,
  "axial-architecture": AxialArchitecture,
  "airsense-loop": AirsenseLoop,
  "deep-compression-stages": DeepCompressionStages,
  "mediq-pipeline": MediqPipeline,
};

export function Diagram({ id }: { id: string }) {
  const Component = registry[id];
  if (!Component) {
    return (
      <div className="grid h-40 place-items-center text-sm text-fg-subtle">
        [diagram: {id}]
      </div>
    );
  }
  return <Component />;
}
