import type { Project } from "./types";
import { mdd } from "./mdd";
import { brainSpy } from "./brain-spy";
import { airsense } from "./airsense";
import { deepCompression } from "./deep-compression";
import { mediq } from "./mediq";
import { deepfake } from "./deepfake";
import { quantOption } from "./quant-option";
import { arimaLstm } from "./arima-lstm";

/** All projects, source of truth. Add a new project here. */
const registry: Project[] = [
  mdd,
  brainSpy,
  airsense,
  deepCompression,
  mediq,
  deepfake,
  quantOption,
  arimaLstm,
];

/** Projects sorted by ranking (lower `order` first). */
export const projects: Project[] = [...registry].sort((a, b) => a.order - b.order);

/** The 5–7 projects shown on the homepage. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Distinct categories present, in a stable display order. */
export const categories = [
  "Research",
  "Medical CV",
  "Systems",
  "ML",
  "Course",
] as const;

export type { Project } from "./types";
