export type SkillLevel = "learning" | "intermediate" | "solid";
export type SkillCategory = "dev" | "ai" | "devops";

export interface Skill {
  name: string;
  icon: string; // devicon class suffix e.g. "devicon-react-original"
  level: SkillLevel;
  category: SkillCategory;
}

export const levelLabels: Record<SkillLevel, string> = {
  learning: "Learning",
  intermediate: "Intermediate",
  solid: "Solid",
};

/** All technologies for the infinite marquee slider */
export const marqueeSkills: Pick<Skill, "name" | "icon">[] = [
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Next.js", icon: "devicon-nextjs-original" },
  { name: "GraphQL", icon: "devicon-graphql-plain colored" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "C#", icon: "devicon-csharp-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "n8n", icon: "devicon-nodejs-plain colored" },
];

export const skills: Skill[] = [
  // Software Dev
  { name: "JavaScript", icon: "devicon-javascript-plain colored", level: "intermediate", category: "dev" },
  { name: "React / Next.js", icon: "devicon-react-original colored", level: "intermediate", category: "dev" },
  { name: "GraphQL", icon: "devicon-graphql-plain colored", level: "learning", category: "dev" },
  { name: "MongoDB / SQL", icon: "devicon-mongodb-plain colored", level: "intermediate", category: "dev" },
  { name: "C#", icon: "devicon-csharp-plain colored", level: "learning", category: "dev" },
  { name: "Python", icon: "devicon-python-plain colored", level: "solid", category: "dev" },
  { name: "HTML / CSS", icon: "devicon-html5-plain colored", level: "intermediate", category: "dev" },
  // AI & Automation
  { name: "LLM Scripts & APIs", icon: "devicon-python-plain colored", level: "intermediate", category: "ai" },
  { name: "n8n Workflows", icon: "devicon-nodejs-plain colored", level: "learning", category: "ai" },
  { name: "AI Agents (Skill Agent)", icon: "devicon-vscode-plain colored", level: "learning", category: "ai" },
  { name: "OpenCode / Claude Code", icon: "devicon-vscode-plain colored", level: "intermediate", category: "ai" },
  { name: "Automation Pipelines", icon: "devicon-bash-plain", level: "intermediate", category: "ai" },
  // DevOps
  { name: "Linux · Kubuntu · zsh", icon: "devicon-linux-plain", level: "intermediate", category: "devops" },
  { name: "Docker", icon: "devicon-docker-plain colored", level: "intermediate", category: "devops" },
  { name: "GitHub · Git", icon: "devicon-github-original", level: "intermediate", category: "devops" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", level: "intermediate", category: "devops" },
];

export const categoryMeta = {
  dev: { title: "Software Development", icon: "{ }" },
  ai: { title: "AI & Automation", icon: "✦" },
  devops: { title: "DevOps & Environment", icon: "◎" },
} as const;
