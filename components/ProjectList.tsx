import { getProjectsByType, type ProjectType } from "@/data/projects";
import ProjectDetails from "./ProjectDetails";
import PixelWindow from "./ui/PixelWindow";

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
                <PixelWindow key={project.id} title={project.name} as="h4">
                  <ProjectDetails project={project} />
                </PixelWindow>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
