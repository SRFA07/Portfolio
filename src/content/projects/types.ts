/**
 * Typed content model for projects.
 * A project renders both as a card (summary/highlights) and, when `sections`
 * are present, as a full case-study page following the narrative template:
 * Problem → Challenge → Thought Process → Architecture → Implementation → Results → Reflection.
 *
 * Adding a project = create one file in this folder and register it in `index.ts`.
 */

export type Category = "Research" | "Medical CV" | "Systems" | "ML" | "Course";

export type Status = "research" | "shipped" | "design-spec" | "in-progress";

/** A single headline number shown on cards and in results. */
export interface Metric {
  label: string;
  value: string;
  sub?: string;
}

/** Flexible case-study body blocks, rendered by <BlockRenderer />. */
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "callout";
      tone?: "note" | "insight" | "caution";
      title?: string;
      text: string;
    }
  | {
      type: "table";
      caption?: string;
      columns: string[];
      rows: string[][];
      highlightRows?: number[];
    }
  | { type: "metrics"; items: Metric[] }
  | { type: "code"; lang?: string; caption?: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "diagram"; id: string; caption?: string };

export interface CaseSection {
  /** Stable id for in-page anchors / table of contents. */
  id: string;
  /** Kicker shown above the heading, e.g. "01, Problem". */
  kicker?: string;
  heading: string;
  blocks: Block[];
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
  report?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line summary for hero + card. */
  tagline: string;
  year: string;
  role: string;
  duration?: string;
  category: Category;
  status: Status;
  /** Featured on the homepage. */
  featured: boolean;
  /** Lower = higher priority in featured/archive ordering. */
  order: number;
  /** Short tech tags for chips. */
  tags: string[];
  /** Full stack list for the hero meta panel. */
  stack: string[];
  links: ProjectLinks;
  /** 2–4 sentence description used on cards. */
  summary: string;
  /** 2–3 headline metrics shown on the card and case-study hero. */
  highlights: Metric[];
  /** Full case-study body. Optional until authored. */
  sections?: CaseSection[];
}
