import { getProjectsByType, type Project, type ProjectType } from "@/data/projects";
import PixelWindow from "./ui/PixelWindow";
import StatBar from "./ui/StatBar";

const groups: { type: ProjectType; index: string; title: string; subtitle: string }[] = [
  {
    type: "dev",
    index: "03a — dev",
    title: "Software Development",
    subtitle: "Full-stack apps, APIs, and interfaces — built to ship.",
  },
  {
    type: "ai",
    index: "03b — ai",
    title: "AI & Automation",
    subtitle: "LLM scripts, agents, and workflows that eliminate repetitive work.",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const isAi = project.type === "ai";

  return (
    <PixelWindow title={project.name} as="h4">
      {(project.aiPowered || project.wip) && (
        <p className="mb-u3 flex flex-wrap gap-u2">
          {project.aiPowered && <span className="label bg-dusk-400 text-ink px-u2">AI-powered</span>}
          {project.wip && <span className="label bg-amber text-ink px-u2">WIP</span>}
        </p>
      )}

      <p className="text-mist leading-relaxed">{project.description}</p>

      {project.wip && project.progress !== undefined && (
        <div className="mt-u4">
          <p className="font-term text-mist mb-u flex justify-between text-lg">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </p>
          <StatBar
            value={Math.round(project.progress / 10)}
            max={10}
            fill={isAi ? "bg-haze" : "bg-teal"}
          />
        </div>
      )}

      <ul className="mt-u4 flex flex-wrap gap-u2" aria-label="Stack">
        {project.tags.map((tag) => (
          <li key={tag} className="px-tag">
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-u4 flex flex-wrap items-center gap-x-u6 gap-y-u2">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-link">
            GitHub<span className="sr-only"> — {project.name}</span>
          </a>
        )}
        {project.demo && !project.wip && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-link">
            Demo<span className="sr-only"> — {project.name}</span>
          </a>
        )}
        {project.wip && !project.demo && (
          <span className="font-term text-mist text-xl">Under construction</span>
        )}
      </p>
    </PixelWindow>
  );
}

/** Plain, scannable list of every project — the quick read for recruiters. */
export default function ProjectList() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-6xl px-5 py-14 md:py-20"
    >
      <h2 id="projects-title" className="sr-only">
        Projects
      </h2>

      <div className="space-y-16">
        {groups.map((group) => (
          <div key={group.type} id={`projects-${group.type}`}>
            <p className="label text-amber">
              <span className="text-haze" aria-hidden>
                {"// "}
              </span>
              {group.index}
            </p>
            <h3 className="font-pixel text-cream mt-u4 text-lg leading-snug sm:text-2xl sm:leading-snug">
              {group.title}
            </h3>
            <p className="text-mist mt-u4 max-w-2xl text-lg">{group.subtitle}</p>

            <div className="mt-u8 grid gap-u4 sm:grid-cols-2">
              {getProjectsByType(group.type).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
