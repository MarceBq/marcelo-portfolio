import type { SkillLevel } from "@/data/skills";

/** Filled segments (out of 5) for each skill level's stat bar. */
export const levelSegments: Record<SkillLevel, number> = {
  learning: 2,
  intermediate: 3,
  solid: 4,
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certs" },
  { href: "#timeline", label: "Path" },
  { href: "#contact", label: "Contact" },
] as const;

/** Drop the file at public/cv.pdf and the CV button starts working. */
export const cvHref = "/cv.pdf";
