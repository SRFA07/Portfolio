import type { Project } from "./types";

export const brainSpy: Project = {
  slug: "brain-spy-alzheimers",
  title: "Brain Spy: Deciphering Alzheimer's from MRI",
  tagline:
    "A deep-learning framework that classifies Alzheimer's from 3D brain MRI, with an attention module that shows which regions drove each decision.",
  year: "2025",
  role: "Deep Learning · BCS Club Summer Project",
  duration: "May 2025 – Sep 2025",
  category: "Medical CV",
  status: "research",
  featured: true,
  order: 2,
  tags: ["3D MRI", "Attention / XAI", "ADNI", "Award-winning"],
  stack: ["Python", "PyTorch", "TorchIO", "Nibabel", "NumPy", "Kaggle (2× T4)"],
  links: {
    github: "https://github.com/SRFA07/BCS-IITK-Summer-Project-Brain-Spy",
    report: "/reports/BrainSpy.pdf",
  },
  summary:
    "On the ADNI-1 cohort (1,891 scans, 650 subjects), I built an MRI preprocessing pipeline, using Neural Pre-Processing for joint skull-stripping, bias correction, and normalization, cutting preprocessing time 9× versus SynthStrip, and benchmarked 10+ architectures for Alzheimer's-vs-healthy classification. My Modified AXIAL model (frozen ResNet-152 + Attention-XAI fusion) reached 97% test accuracy, and enforcing strict subject-wise validation exposed and corrected a fatal data-leakage issue behind a reported 99% pipeline. Won IIT Kanpur's Best Research Project award (S&T Council).",
  highlights: [
    { value: "97%", label: "Test accuracy", sub: "Modified AXIAL (ours)" },
    { value: "0.965", label: "Macro F1", sub: "AD vs CN" },
    { value: "0.85", label: "Subject-wise acc", sub: "leakage-corrected" },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · Problem",
      heading: "Reading a brain scan is slow, subjective, and easy to fake",
      blocks: [
        {
          type: "p",
          text: "Alzheimer's disease affects over 55 million people and its prevalence is projected to triple by 2050. It is progressive and irreversible, so early detection, during the preclinical and mild-cognitive-impairment stages, is where intervention matters most. Structural MRI can reveal the hallmark changes (hippocampal atrophy, cortical thinning, ventricular enlargement) years before severe symptoms, but reading those scans by hand is slow, needs specialist expertise, and varies between radiologists.",
        },
        {
          type: "p",
          text: "Deep learning can standardise that assessment and scale to thousands of scans. The catch is that MRI-based Alzheimer's classification has a credibility problem: many published pipelines report 95–99% accuracy by using random train/test splits, which let scans from the same patient land in both sets. The model then learns to recognise the person, not the disease.",
        },
        {
          type: "callout",
          tone: "insight",
          title: "The goal, stated honestly",
          text: "Build an accurate, interpretable classifier for Alzheimer's vs healthy controls, and prove it generalises to unseen patients by validating the way the inflated papers do not.",
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 · Constraints",
      heading: "Big volumes, small cohort, weak hardware",
      blocks: [
        {
          type: "list",
          items: [
            "Data: the ADNI-1 1.5T subset, 1,891 usable scans from ~650 subjects, small by computer-vision standards, so overfitting is a constant threat.",
            "Dimensionality: each 3D MRI volume is large; processing full volumes directly is expensive and overfits fast.",
            "Acquisition variability: scans span GE, Philips, and Siemens scanners, introducing domain shift.",
            "Interpretability: clinicians need to see why a model decided what it did, not just a label.",
            "Compute: everything ran on Kaggle's free tier, 2× NVIDIA T4 GPUs, so preprocessing and training had to be efficient.",
          ],
        },
      ],
    },
    {
      id: "thought-process",
      kicker: "03 · Thought Process",
      heading: "Fast preprocessing, slice-level attention, and honest splits",
      blocks: [
        {
          type: "p",
          text: "The first bottleneck was preprocessing. Standard skull-stripping toolkits are accurate but slow (SynthStrip ~16s/scan, FreeSurfer far more), which is unworkable across ~1,900 volumes on free hardware. I moved to Neural Pre-Processing (NPP), a learned model that jointly performs skull-stripping, intensity normalization, and spatial normalization while estimating the bias field, cutting preprocessing time roughly 9× and making full-cohort processing feasible.",
        },
        {
          type: "p",
          text: "The second decision was 2D vs 3D. Pure 3D CNNs see the whole volume but are heavy and overfit on a small cohort; naive 2D CNNs classify each slice independently and then vote, which throws away the relationship between slices. I built on the AXIAL idea instead: extract per-slice features, then learn an attention weight for each slice and fuse them into one subject-level representation, so the model decides which slices matter and produces a single, explainable prediction per scan.",
        },
        {
          type: "p",
          text: "The third, and the one I care about most, was validation. Several strong-looking baselines were only strong because of leakage. I re-ran everything under strict subject-wise splitting, where all of a patient's scans are confined to one split, and used it to identify and correct a fatal data-leakage issue in a pipeline that had reported 99% accuracy.",
        },
      ],
    },
    {
      id: "architecture",
      kicker: "04 · Technical Architecture",
      heading: "Modified AXIAL and a multi-view variant",
      blocks: [
        {
          type: "diagram",
          id: "axial-architecture",
          caption:
            "Modified AXIAL: entropy-selected axial slices pass through a frozen ResNet-152, an attention module weights and sums them into a 2048-D subject vector, and an MLP head classifies AD vs CN with saliency for interpretability.",
        },
        {
          type: "p",
          text: "For each scan I select ~100 informative axial slices (entropy-based selection), center-crop to 128×128, and pass them through a frozen ResNet-152 backbone to get per-slice feature vectors. A small attention network maps each vector through a linear layer + tanh to a scalar score, softmax-normalises the scores across slices, and takes a weighted sum, collapsing the whole scan into a single 2048-dimensional subject embedding that an MLP head classifies.",
        },
        {
          type: "p",
          text: "I also built ThreeHeadADNet, a multi-view variant: it runs a dual-branch CNN (small and large receptive fields) over the central axial, coronal, and sagittal slices, then fuses the three 256-D view vectors with a learnable softmax attention, mirroring how radiologists examine multiple orientations.",
        },
      ],
    },
    {
      id: "implementation",
      kicker: "05 · Implementation",
      heading: "Benchmarking 10+ architectures fairly",
      blocks: [
        {
          type: "p",
          text: "To make the comparison meaningful I implemented and benchmarked more than ten architectures on the same data and protocol: transfer-learning baselines (ResNet-152, VGG-19, AlexNet, LeNet), 3D models (ADNet3D, Dual-branch 3D CNN), a DHO-optimised CapsNet, the M3T multi-plane transformer, a ViT, the original AXIAL, and my Modified AXIAL and ThreeHeadADNet. Modified AXIAL trained with Adam at 1e-4 on a 72/8/20 split.",
        },
        {
          type: "callout",
          tone: "caution",
          title: "Leakage caught in the act",
          text: "Transfer-learning baselines initially posted 93–96% test accuracy, but those runs had test scans leaking into training. Marked and excluded, they are kept only for comparison, never as real results.",
        },
      ],
    },
    {
      id: "results",
      kicker: "06 · Results",
      heading: "State-of-competitive accuracy that survives honest validation",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "97.0%", label: "Test accuracy", sub: "Modified AXIAL" },
            { value: "0.965", label: "Macro F1", sub: "AD vs CN" },
            { value: "0.85 / 0.84", label: "Subject-wise acc", sub: "leakage-free" },
          ],
        },
        {
          type: "table",
          caption:
            "Standard split (leakage-free entries only). Our two models lead; AXIAL and ADNet3D shown for reference.",
          columns: ["Model", "Test acc", "Macro F1"],
          rows: [
            ["Modified AXIAL (ours)", "0.970", "0.965"],
            ["Dual CNN · Multi-View (ours)", "0.967", "0.967"],
            ["Dual CNN · Single-View", "0.950", "0.950"],
            ["AXIAL (baseline)", "0.856", "— (MCC 0.712)"],
            ["ADNet3D", "—", "0.708"],
          ],
          highlightRows: [0],
        },
        {
          type: "p",
          text: "Under the stricter subject-wise protocol, accuracy naturally drops, but honestly. Modified AXIAL holds 85% and the multi-view model 84%, comfortably ahead of majority-voting and transformer baselines re-evaluated the same way. That gap between the leaked 99% and the true ~85% is precisely the point of the project.",
        },
      ],
    },
    {
      id: "reflection",
      kicker: "07 · Reflection",
      heading: "Toward earlier, explainable diagnosis",
      blocks: [
        {
          type: "list",
          items: [
            "sMCI vs pMCI: distinguishing stable from progressive mild cognitive impairment via unsupervised learning, K-Means on entropy-slice features reached a 0.759 silhouette; an autoencoder + clustering is in progress.",
            "Multimodal fusion: fold in the ADNI genetic and clinical biomarkers alongside imaging via cross-attention.",
            "Vision Transformers: promising but compute-bound on the free tier, worth revisiting with more hardware.",
            "Interpretation: GradCAM, saliency, and layer-wise relevance propagation to check the model attends to the hippocampus and temporal regions, as the biology predicts.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Recognition",
          text: "Brain Spy won IIT Kanpur's Best Research Project award from the Science & Technology Council.",
        },
      ],
    },
  ],
};
