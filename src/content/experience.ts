export interface TimelineItem {
  role: string;
  org: string;
  period: string;
  kind: "research" | "work";
  points: string[];
  tags?: string[];
}

export const experience: TimelineItem[] = [
  {
    role: "Machine Learning Research Intern",
    org: "CoSmic Lab (SURGE) · Prof. Hamim Zafar · IIT Kanpur",
    period: "May 2026 – Present",
    kind: "research",
    points: [
      "Building an end-to-end multimodal pipeline for early detection of Major Depressive Disorder from rs-fMRI, structural MRI, and clinical biomarkers.",
      "Engineered a REST-meta-MDD cohort (2,380 subjects, 25 sites) into a harmonized 1,707-subject master dataset with 7,250+ features each.",
      "Built a parallel Nilearn engine for large-scale ROI / NIfTI feature extraction and a leakage-free late-fusion architecture validated with leave-one-site-out CV and ComBat.",
    ],
    tags: ["Neuroimaging", "PyTorch", "Nilearn", "Harmonization"],
  },
  {
    role: "Founder's Office Intern, Product & Growth",
    org: "Cherrie",
    period: "Dec 2025 – Feb 2026",
    kind: "work",
    points: [
      "Spearheaded the zero-to-one market entry for a safety-centric dating platform, formulating a go-to-market strategy around experiential marketing and offline mixer events.",
      "Drove a women-first user-acquisition motion built on safety propositions, converting offline engagement into a verified early-adopter pipeline.",
    ],
    tags: ["Product", "Growth", "GTM"],
  },
];

export interface EducationItem {
  degree: string;
  org: string;
  period: string;
}

export const education: EducationItem[] = [
  {
    degree: "B.Tech, Civil Engineering",
    org: "Indian Institute of Technology Kanpur",
    period: "2024 – Present",
  },
  {
    degree: "Class XII (JKBOSE)",
    org: "Burn Hall School, Srinagar",
    period: "2024",
  },
  {
    degree: "Class X (JKBOSE)",
    org: "Burn Hall School, Srinagar",
    period: "2022",
  },
];

export interface Achievement {
  title: string;
  detail: string;
}

export const awards: Achievement[] = [
  {
    title: "Best Research Project: S&T Council, IIT Kanpur",
    detail: "Awarded for BrainSpy, the Alzheimer's-detection deep-learning framework.",
  },
  {
    title: "NSEC: Centre Top 10%",
    detail: "National Standard Examination in Chemistry, India's foremost Chemistry Olympiad.",
  },
  {
    title: "Inter-Hall General Championship 2025–26: Winners",
    detail: "Led Hall 3 to the overall GC title, coordinating 1,500+ residents.",
  },
  {
    title: "Sports & culture medals",
    detail: "Gold in Weightlifting and Carrom; Silver in Football, Carrom, and the Galaxy Parade.",
  },
];

export const leadership: Achievement[] = [
  {
    title: "Maintenance Secretary: Hall Executive Committee, Hall 3",
    detail:
      "Elected by a 600+ electorate; drafted a ₹15L+ budget and mobilised ₹20L+ to renovate hall facilities.",
  },
  {
    title: "Events Organiser: Antaragni '26 (Roadtrip Junoon)",
    detail:
      "Coordinated within a ₹2Cr+ festival budget; onboarded sponsorships worth ₹7L+ across 7+ metro roadtrips.",
  },
  {
    title: "Hall Captain: Takneek (Inter-Hall Tech Championship)",
    detail: "Led a 750-member contingent across 11 problem statements to a 2nd-place overall finish.",
  },
  {
    title: "Student Guide: Counselling Service, IIT Kanpur",
    detail: "Mentored 5 first-year students through their transition into campus academic life.",
  },
];
