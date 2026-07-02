import type { Project } from "./types";

export const deepfake: Project = {
  slug: "deepfake-detection-benchmark",
  title: "Deepfake Detection: MesoNet-4 vs Xception",
  tagline:
    "A benchmark of two deepfake detectors on Celeb-DF v2, measured not just on accuracy but on latency, FLOPs, and robustness to media degradation.",
  year: "2026",
  role: "Course Project · EE656 · Prof. Nischal Kumar Verma",
  duration: "May 2026 – Present",
  category: "Course",
  status: "shipped",
  featured: false,
  order: 6,
  tags: ["Deepfake", "Xception", "MesoNet", "Celeb-DF v2", "Robustness"],
  stack: ["Python", "PyTorch", "Jupyter"],
  links: {
    github: "https://github.com/SRFA07/EE-656-Course-Project",
  },
  summary:
    "Built a deepfake-detection pipeline benchmarking MesoNet-4 against Xception on 6,392 face images from Celeb-DF v2, trained for 30 epochs each. Beyond accuracy, I evaluated AUC-ROC, inference latency, FLOPs, and robustness under Gaussian noise and JPEG compression, landing at 0.90 / 0.92 AUC-ROC and identifying MesoNet for edge deployment and Xception for robustness.",
  highlights: [
    { value: "0.90 / 0.92", label: "AUC-ROC", sub: "MesoNet-4 / Xception" },
    { value: "6,392", label: "Face images", sub: "Celeb-DF v2 · 30 epochs" },
    { value: "Latency + FLOPs", label: "Beyond accuracy", sub: "robustness-tested" },
  ],
};
