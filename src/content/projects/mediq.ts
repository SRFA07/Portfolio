import type { Project } from "./types";

export const mediq: Project = {
  slug: "mediq-symptom-triage",
  title: "MediQ: Interpretable Symptom-to-Disease Triage",
  tagline:
    "An end-to-end ML product that maps reported symptoms to a ranked differential diagnosis, and is honest about what its 100% test accuracy really means.",
  year: "2025",
  role: "Author · Society of Civil Engineers Summer Project",
  duration: "Jun 2025 – Aug 2025",
  category: "ML",
  status: "shipped",
  featured: true,
  order: 5,
  tags: ["Random Forest", "Flask", "Full-stack ML", "Data Fusion", "Explainability"],
  stack: ["Python", "scikit-learn", "pandas", "Flask"],
  links: {
    github: "https://github.com/SRFA07/MediQ",
    report: "/reports/MediQ.pdf",
  },
  summary:
    "Fused eight messy medical CSVs into one clean feature matrix and a structured knowledge base, trained a 300-tree Random Forest to map 132 binary symptoms to 41 diseases, and served it behind a Flask dashboard with autocomplete, a confidence gauge, and a ranked top-5 differential. The report is deliberate that the 100% held-out accuracy reflects a synthetically-templated dataset, evidence the pipeline is correct, not that the model has clinical skill.",
  highlights: [
    { value: "41 / 132", label: "Diseases / symptoms", sub: "4,920 training records" },
    { value: "Top-5", label: "Differential dx", sub: "ranked probabilities" },
    { value: "8 → 1", label: "CSVs fused", sub: "into one clean matrix" },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · Problem",
      heading: "Symptom-googling is anxious, noisy, and unstructured",
      blocks: [
        {
          type: "p",
          text: "When people feel unwell they type symptoms into a search engine and get a wall of conflicting results. MediQ asks a simpler question: what if a model took a clean list of symptoms and responded like an organised triage assistant, not to replace a doctor, but to turn scattered symptom information into a single, ranked, explainable answer?",
        },
        {
          type: "p",
          text: "It is deliberately two things at once: a full supervised-learning product lifecycle (source → clean → engineer → train → evaluate → serve), and a study in responsible framing, because health is exactly where an impressive-looking model can be dangerously misleading.",
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 · Constraints",
      heading: "Eight messy spreadsheets and a duty to be honest",
      blocks: [
        {
          type: "list",
          items: [
            "Data fusion: eight CSVs with trailing spaces, inconsistent capitalisation, embedded typos, duplicated columns, and list-valued cells stored as strings.",
            "Multi-class scale: 41 diseases described by 132 binary symptom features.",
            "Explainability: the output can't be one opaque guess, it needs ranked alternatives and a transparent severity signal.",
            "Deployment: wrap the model behind a responsive web app with a clear safety disclaimer.",
            "Reproducibility: the whole pipeline must regenerate every artifact deterministically from one script.",
          ],
        },
      ],
    },
    {
      id: "thought-process",
      kicker: "03 · Thought Process",
      heading: "Fuse the data, pick a transparent model, stay honest",
      blocks: [
        {
          type: "p",
          text: "The project is a data-fusion problem as much as a modelling one. The move that makes eight independently-authored files joinable is a shared canonicalisation layer: functions that lower-case, collapse whitespace, and repair known typos so the same disease spelled three ways resolves to one key. Only one table trains the classifier; the other seven become a knowledge base joined to the prediction at inference time.",
        },
        {
          type: "p",
          text: "I framed diagnosis as multi-class classification over a bag-of-symptoms binary vector, and chose a Random Forest deliberately: it handles high-dimensional binary features gracefully, is robust to irrelevant symptoms, and gives per-class probabilities almost for free. Those probabilities power the confidence gauge and the top-5 differential, so the output shows its reasoning rather than hiding it. Alongside it, a non-learned symptom-burden score sums clinical severity weights for a transparent second signal.",
        },
        {
          type: "callout",
          tone: "caution",
          title: "Why 100% accuracy is a caveat, not a trophy",
          text: "The dataset is synthetically templated, each disease maps to an almost fixed symptom signature, perfectly balanced, with little of the ambiguity real patients present. A flexible model learns it trivially. The score proves the pipeline is engineered correctly; it does not demonstrate clinical skill, and the report says so plainly.",
        },
      ],
    },
    {
      id: "architecture",
      kicker: "04 · Technical Architecture",
      heading: "Offline training, online serving",
      blocks: [
        {
          type: "diagram",
          id: "mediq-pipeline",
          caption:
            "Two stages bridged by on-disk artifacts: an offline script fuses eight CSVs, trains the forest, and writes the model, symptom lexicon, and knowledge base; a stateless Flask app loads them once and serves ranked predictions.",
        },
        {
          type: "p",
          text: "The offline stage reads raw data, builds the feature matrix and knowledge base, fits the model, and writes four artifacts (the model bundle, a symptom lexicon for autocomplete, the disease knowledge base, and an evaluation report). The online stage is a stateless Flask service that loads those artifacts once at start-up and answers /predict requests, the expensive work happens once, the app stays fast.",
        },
      ],
    },
    {
      id: "implementation",
      kicker: "05 · Implementation",
      heading: "From literal-string cells to soft-voted probabilities",
      blocks: [
        {
          type: "list",
          items: [
            "Cleaning: canonical disease/symptom keys repair typos and snap to snake_case; duplicate symptom columns are merged by element-wise max so no signal is lost.",
            "Encoding: each record becomes a 132-dimensional binary vector; the same encoding is reconstructed from the user's selections at inference.",
            "Knowledge base: seven reference tables folded into one dictionary; list-valued cells parsed safely with a literal evaluator that falls back to delimiter splitting, giving complete coverage across all 41 diseases.",
            "Model: a 300-tree Random Forest with √p feature subsampling and balanced_subsample weighting, trained on a stratified 80/20 split with a fixed seed; predict_proba drives the ranked differential.",
          ],
        },
      ],
    },
    {
      id: "results",
      kicker: "06 · Results",
      heading: "Correct end-to-end, and candid about its ceiling",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "1.00", label: "Macro-F1", sub: "984-sample held-out test" },
            { value: "Sub-second", label: "Inference", sub: "stateless Flask API" },
            { value: "100%", label: "KB coverage", sub: "all 41 diseases" },
          ],
        },
        {
          type: "p",
          text: "On the 984-record held-out test set the model classifies every disease correctly, a clean diagonal confusion matrix and Macro-F1 of 1.00. What that genuinely validates is end-to-end correctness: the cleaning, keying, encoding, training, and serialisation all work, and the served model reproduces training-time behaviour exactly. On messy real clinical data, performance would be materially lower, and the app foregrounds a medical-safety disclaimer to match.",
        },
      ],
    },
    {
      id: "reflection",
      kicker: "07 · Reflection",
      heading: "From convincing demo to trustworthy tool",
      blocks: [
        {
          type: "list",
          items: [
            "Train and validate on de-identified real clinical data with genuine noise, comorbidity, and missingness.",
            "Add an 'uncertain' pathway, abstention or out-of-distribution detection, so unfamiliar symptom sets are flagged, not force-classified into one of 41 known diseases.",
            "Calibrate the confidence (isotonic / Platt) so it reflects true likelihoods.",
            "Surface per-prediction attributions (SHAP) and containerise the service for production.",
          ],
        },
      ],
    },
  ],
};
