export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "t1",
    date: "2022",
    title: "Self-taught journey begins",
    description:
      "Started with Python, Linux on Kubuntu, and the drive to automate everyday problems.",
  },
  {
    id: "t2",
    date: "2023",
    title: "First shipped projects",
    description:
      "Built web experiments, scripting tools, and adopted a proper dev environment with zsh and Docker.",
  },
  {
    id: "t3",
    date: "2024",
    title: "Full stack & AI focus",
    description:
      "Dived into React, Next.js, databases, and LLM integration — from scripts to pipelines.",
  },
  {
    id: "t4",
    date: "2025",
    title: "Software Engineering studies",
    description:
      "Formalizing CS fundamentals while shipping side projects and automation workflows.",
  },
  {
    id: "t5",
    date: "Now",
    title: "Open to opportunities",
    description:
      "Seeking teams that value builders, honest growth, and people who solve real problems.",
  },
];
