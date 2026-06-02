export interface Certification {
  id: string;
  name: string;
  platform: string;
  year?: string;
  url?: string;
  icon: string; // devicon or emoji fallback
  inProgress?: boolean;
}

/** Placeholder structure — section shows "building" state until real certs are added */
export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Software Engineering Fundamentals",
    platform: "In progress · University",
    year: "2025",
    icon: "🎓",
    inProgress: true,
  },
  {
    id: "cert-2",
    name: "Full Stack with React",
    platform: "Platzi / Coursera",
    year: "—",
    icon: "📡",
    inProgress: true,
  },
  {
    id: "cert-3",
    name: "AI & LLM Integration",
    platform: "Self-directed + platforms",
    year: "—",
    icon: "✦",
    inProgress: true,
  },
];

export const certificationsUnderConstruction = true;
