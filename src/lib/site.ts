/**
 * Central site configuration.
 */
export const site = {
  name: "Syed Reebal Faakhir Andrabi",
  shortName: "Reebal",
  // Roles shown under the name in the hero.
  roles: ["Machine Learning", "Computer Vision", "IIT Kanpur"],
  tagline:
    "I build and rigorously validate machine-learning systems for high-stakes domains, and I report honest numbers.",
  location: "IIT Kanpur, India",
  email: "reebalf24@iitk.ac.in", // institute email from resume; swap if you prefer another
  // Role-specific résumés (add/rename by dropping a PDF in public/resumes/).
  resumes: [
    { label: "SDE", href: "/resumes/SDE.pdf" },
    { label: "Finance", href: "/resumes/Finance.pdf" },
    { label: "Consult", href: "/resumes/Consult.pdf" },
    { label: "Core", href: "/resumes/Core.pdf" },
    { label: "Analyst", href: "/resumes/Analyst.pdf" },
  ],
  links: {
    github: "https://github.com/SRFA07",
    linkedin: "https://www.linkedin.com/in/reebal-andrabi-95ab37322/",
    iitk: "https://www.iitk.ac.in",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export type Site = typeof site;
