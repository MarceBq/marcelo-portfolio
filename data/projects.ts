export type ProjectType = "dev" | "ai";

export interface Project {
  id: string;
  type: ProjectType;
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  wip?: boolean;
  progress?: number;
  aiPowered?: boolean;
}

export const projects: Project[] = [
  // Software Development
  {
    id: "dev-dashboard",
    type: "dev",
    name: "DevOps Dashboard",
    description:
      "Full-stack panel built with Next.js and MongoDB to monitor Docker containers, dev servers, and project health from a single glass UI.",
    tags: ["Next.js", "MongoDB", "Docker", "Tailwind"],
    github: "https://github.com",
    wip: true,
    progress: 40,
  },
  {
    id: "dev-graphql-api",
    type: "dev",
    name: "TaskFlow API",
    description:
      "GraphQL API with React client for team task management — queries, mutations, and real-time-style updates for small teams.",
    tags: ["React", "GraphQL", "Node.js", "MySQL"],
    github: "https://github.com",
    demo: "https://github.com",
  },
  {
    id: "dev-portfolio-v1",
    type: "dev",
    name: "Spatial Portfolio v1",
    description:
      "First iteration of this portfolio — vanilla HTML/CSS/JS with terminal aesthetics. Evolved into this Next.js build.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
  },
  // AI & Automation
  {
    id: "ai-automation-scripts",
    type: "ai",
    name: "AI Automation Scripts",
    description:
      "Python toolkit integrating LLMs to automate document processing, email triage, and repetitive workflows — hours saved, not slides.",
    tags: ["Python", "OpenAI", "Anthropic", "CLI"],
    github: "https://github.com",
    aiPowered: true,
  },
  {
    id: "ai-n8n-pipeline",
    type: "ai",
    name: "n8n LLM Pipeline",
    description:
      "Visual automation flows connecting webhooks, APIs, and language models for content generation and data enrichment.",
    tags: ["n8n", "Python", "REST APIs"],
    wip: true,
    progress: 55,
    aiPowered: true,
  },
  {
    id: "ai-rag-kb",
    type: "ai",
    name: "RAG Knowledge Base",
    description:
      "Personal docs indexer with retrieval-augmented generation — ask grounded questions about your own notes and codebase.",
    tags: ["Python", "Embeddings", "Vector DB"],
    wip: true,
    progress: 20,
    aiPowered: true,
  },
  {
    id: "ai-skill-agent",
    type: "ai",
    name: "Skill Agent Orchestrator",
    description:
      "Agent framework experiment chaining specialized skills (search, code, write) with LLM routing and tool use.",
    tags: ["Python", "Agents", "OpenCode"],
    wip: true,
    progress: 10,
    aiPowered: true,
  },
];

export const getProjectsByType = (type: ProjectType) =>
  projects.filter((p) => p.type === type);
