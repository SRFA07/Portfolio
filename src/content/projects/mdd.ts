import type { Project } from "./types";

export const mdd: Project = {
  slug: "multimodal-mdd-detection",
  title: "Multimodal ML for Early Detection of Major Depressive Disorder",
  tagline:
    "A leakage-safe framework that detects depression from multi-site brain MRI, and reports honest cross-site numbers instead of inflated ones.",
  year: "2026",
  role: "ML Research Intern · CoSmic Lab (SURGE) · Prof. Hamim Zafar",
  duration: "May 2026 – Present",
  category: "Research",
  status: "research",
  featured: true,
  order: 1,
  tags: ["Neuroimaging", "fMRI", "Harmonization", "GNN", "Leakage-safe ML"],
  stack: [
    "Python",
    "scikit-learn",
    "PyTorch",
    "PyTorch Geometric",
    "NumPy",
    "ComBat / neuroHarmonize",
    "nilearn",
  ],
  links: {
    github:
      "https://github.com/SRFA07/Multimodal-Machine-Learning-for-Early-Detection-of-Major-Depressive-Disorder-MDD-Prof.-Hamim-Zafar",
    report: "/reports/MDD_Field_Guide.pdf",
  },
  summary:
    "Depression classifiers on multi-site fMRI routinely report 90%+ accuracy, mostly by secretly recognising which scanner a scan came from. I built the pipeline that refuses to cheat: fit-in-fold harmonization, leave-one-site-out validation, and multimodal fusion. The honest result, pooled ROC-AUC ≈ 0.67, is a real cross-site signal, and the rigour is the contribution.",
  highlights: [
    { value: "0.673", label: "Pooled ROC-AUC", sub: "leave-one-site-out" },
    { value: "25", label: "Scanner sites", sub: "REST-meta-MDD" },
    { value: "2", label: "MRI modalities fused", sub: "functional + structural" },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · Problem",
      heading: "The scanner leaves a bigger fingerprint than the disease",
      blocks: [
        {
          type: "p",
          text: "Major Depressive Disorder affects hundreds of millions of people, yet diagnosis remains subjective. Resting-state fMRI promises an objective biomarker, and the literature is full of models reporting 90%+ accuracy at telling patients from healthy controls. The problem is that most of those numbers are not real.",
        },
        {
          type: "p",
          text: "The data for this project comes from REST-meta-MDD: 2,380 subjects scanned on 25 different machines, which I phenotype-harmonised into a clean 1,707-subject cohort with 7,250+ features each. Every scanner has its own field strength, sequence parameters, and ambient noise, and because different sites recruited different patient-to-control ratios, a model can score well simply by learning to recognise which scanner produced a scan, without ever learning anything about the brain.",
        },
        {
          type: "callout",
          tone: "insight",
          title: "The one idea that governs every design decision",
          text: "The scanner leaves a bigger, more systematic fingerprint on the data than depression does. Every choice in this pipeline, harmonization, validation, fit-in-fold transforms, exists to stop the model from cheating on that fingerprint. A correct model here scores in the high-60s to low-70s; a model reporting 90%+ has almost certainly been fooled by the scanner.",
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 · Constraints",
      heading: "Few subjects, thousands of features, and a hostile confound",
      blocks: [
        {
          type: "list",
          items: [
            "High dimensionality: functional connectivity alone is a 6,670-dimensional vector per subject (7,250+ features in total), against only ~1,707 subjects, more features than people.",
            "Site effects: additive and multiplicative per-scanner offsets that are often larger than the biological signal.",
            "Correlated confounds: age, sex, education, and head motion all differ between patients and controls and all move brain features.",
            "Leakage traps everywhere: any statistic estimated on the full dataset before splitting silently lets test subjects influence their own transform.",
            "A genuinely hard secondary target: predicting continuous HAMD severity within patients (restricted range) may not be recoverable from imaging at all.",
          ],
        },
      ],
    },
    {
      id: "thought-process",
      kicker: "03 · Thought Process",
      heading: "Designing for honesty, not for a big number",
      blocks: [
        {
          type: "p",
          text: "The central decision was the validation scheme, because it defines what 'good' even means. Ordinary k-fold shuffles subjects across sites, so the same scanner appears in both train and test, which is exactly the leak. I chose leave-one-site-out (LOSO): hold out one entire scanner, train on the other 24, rotate through all sites. The held-out scanner never appears in training, so its fingerprint cannot be exploited.",
        },
        {
          type: "callout",
          tone: "note",
          title: "Turning the leak into a measurement",
          text: "Rather than just avoiding k-fold, I run it deliberately as an upper bound. The gap between k-fold and LOSO accuracy quantifies how much apparent performance is site leakage rather than biology, the inflation is itself a reportable finding, not something to hide.",
        },
        {
          type: "p",
          text: "The second decision was where to fit every transform. The subtle form of leakage is estimating a feature mean, a scaling factor, or a harmonization parameter on the whole dataset before splitting. I wrapped every transform so it is fit on the training fold alone and merely applied to the test fold, confound regression, ComBat, standardization, and feature selection all obey this rule.",
        },
        {
          type: "p",
          text: "The third was feature representation. A raw Pearson correlation is a badly-behaved statistic (its variance depends on its own value), so connectivity moves to a variance-stabilised space. Moving from a Fisher-z representation to tangent-space connectivity, combined with ComBat site correction, is what lifted the honest pooled AUC from ≈0.61 to ≈0.67, a real, defensible gain from a better representation rather than from leakage.",
        },
        {
          type: "p",
          text: "Finally, model choice was deliberately conservative. With thousands of features and few subjects, a linear SVM is already extremely flexible and resists overfitting, and its weights are interpretable. It is the baseline every fancier method, XGBoost, and a BrainGNN-style graph network, has to beat. Demonstrating that more parameters than subjects does not help is a legitimate result, not a failure.",
        },
      ],
    },
    {
      id: "architecture",
      kicker: "04 · Technical Architecture",
      heading: "From brain scans to a leakage-safe prediction",
      blocks: [
        {
          type: "diagram",
          id: "mdd-pipeline",
          caption:
            "The multimodal pipeline: two MRI modalities become feature vectors, pass through fit-in-fold preprocessing, feed per-modality models, and are combined by a stacking meta-learner, all inside leave-one-site-out cross-validation.",
        },
        {
          type: "p",
          text: "Two modalities capture different things. Functional connectivity is the Pearson correlation between every pair of 116 AAL brain regions' time series, vectorised over the upper triangle into 6,670 features, plus five voxelwise activity metrics (ALFF, fALFF, ReHo, VMHC, degree centrality) parcellated to 580 regional features. Structural gray-matter volume comes from modulated VBM maps, parcellated to 116 features.",
        },
        {
          type: "callout",
          tone: "caution",
          title: "A detail that is not a detail",
          text: "Parcellating a voxelwise map means overlaying a label atlas that must be resampled to match. Resampling a label image with linear interpolation invents meaningless fractional labels (region 45.5). The pipeline enforces nearest-neighbour interpolation for label maps and linear only for continuous metric maps.",
        },
        {
          type: "p",
          text: "Four preprocessing transforms run in order, each fit on the training fold only: confound regression (projecting out age/sex/education/motion via the hat matrix), ComBat harmonization (empirical-Bayes removal of per-site location and scale effects), z-score standardization, and optional univariate top-k feature selection by point-biserial correlation.",
        },
      ],
    },
    {
      id: "implementation",
      kicker: "05 · Implementation",
      heading: "One interface, many models, nested fusion",
      blocks: [
        {
          type: "p",
          text: "Every model shares a single fit / score interface so the cross-validation engine treats them identically: linear SVM and logistic regression as honest baselines, XGBoost as the nonlinear contender, ridge regression for the continuous HAMD target, and a graph neural network (GCN/GAT) that treats each brain as a graph of 116 regions.",
        },
        {
          type: "p",
          text: "Multimodal fusion uses late fusion via stacking: each modality's base model produces a score, and a small meta-learner learns how to weight them. Crucially, the meta-learner is trained on out-of-fold base predictions from an inner cross-validation, nested CV, so it never sees scores it will be tested on. A weak modality simply earns a small weight instead of dragging a strong one down.",
        },
        {
          type: "p",
          text: "Interpretability is handled correctly rather than naively. You cannot read a linear model's raw weights when features are correlated, so weights pass through the Haufe transform to recover an interpretable activation pattern before being mapped back to anatomical region pairs; SHAP and permutation importance cover the nonlinear models. Convergence with known depression circuitry (default-mode, salience, limbic-prefrontal) is the validity check.",
        },
      ],
    },
    {
      id: "results",
      kicker: "06 · Results",
      heading: "A real cross-site signal, and an honest failure",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "0.673", label: "Best ROC-AUC", sub: "functional XGBoost, pooled OOF" },
            { value: "≈0.61 → 0.67", label: "AUC lift", sub: "tangent FC + ComBat" },
            { value: "0.63", label: "Balanced accuracy", sub: "credible cross-site range" },
          ],
        },
        {
          type: "table",
          caption:
            "Classification (MDD vs HC), pooled out-of-fold under leave-one-site-out. Functional connectivity carries the signal; structural is weak alone; fusion matches functional.",
          columns: ["Model", "Bal. acc", "ROC-AUC", "F1", "PR-AUC"],
          rows: [
            ["functional · logreg", "0.628", "0.671", "0.647", "0.688"],
            ["functional · XGBoost", "0.627", "0.673", "0.670", "0.690"],
            ["functional · GNN", "0.586", "0.614", "0.631", "0.626"],
            ["structural · logreg", "0.563", "0.588", "0.610", "0.597"],
            ["fused · stacking (FC+VBM)", "0.606", "0.645", "0.670", "0.657"],
          ],
          highlightRows: [1],
        },
        {
          type: "callout",
          tone: "insight",
          title: "The honest reading",
          text: "Pooled AUC ≈ 0.67 under LOSO is a genuine, moderate cross-site result, in line with the field's real ceiling (~0.62–0.70), and not comparable to the inflated 0.9+ within-site numbers. Structural MRI is weak on its own and fusion only matches functional, so functional connectivity remains the workhorse.",
        },
        {
          type: "p",
          text: "The severity-regression target tells the opposite story, honestly. Predicting continuous HAMD score from imaging fails across every modality and method, pooled Pearson r is negative everywhere and predictions collapse toward the cohort mean. Purpose-built brain–behaviour methods (CPM, PLS) did not rescue it. The bottleneck is the target, not the code: continuous severity from rs-fMRI in a restricted-range patient sample is largely unsolved, and reporting that clearly is part of the result.",
        },
      ],
    },
    {
      id: "reflection",
      kicker: "07 · Reflection",
      heading: "What I would build next",
      blocks: [
        {
          type: "list",
          items: [
            "Reframe severity as classification (HAMD bins, e.g. <17 vs ≥17), most likely to yield a usable severity result while reusing the classification pipeline.",
            "Run the baseline A/B (no harmonization, Fisher-z) and a k-fold upper bound to publish the exact size of the leakage gap.",
            "Push to a finer functional atlas (Schaefer-200 / Craddock-200) and tune the GNN (GAT, top-k edges, stronger regularisation).",
            "Add clinical covariates and test whether imaging adds incremental value beyond them.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "The takeaway",
          text: "The most defensible contribution is not a record accuracy, it is a rigorous, leakage-free, multi-pipeline comparison with the LOSO/k-fold gap laid bare. In a field crowded with inflated numbers, that honesty is the result.",
        },
      ],
    },
  ],
};
