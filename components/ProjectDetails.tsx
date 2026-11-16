import Image from "next/image";
import type { Project } from "@/data/projects";
import StatBar from "./ui/StatBar";

interface ProjectDetailsProps {
  project: Project;
  /** Show screenshots; on in the planet's window, off in the quick list. */
  withImages?: boolean;
}

/** A project's facts: badges, description, progress, stack and links. */
export default function ProjectDetails({ project, withImages = false }: ProjectDetailsProps) {
  const isAi = project.type === "ai";

  return (
    <>
      {(project.aiPowered || project.wip) && (
        <p className="mb-u3 flex flex-wrap gap-u2">
          {project.aiPowered && <span className="label bg-dusk-400 text-ink px-u2">AI-powered</span>}
          {project.wip && <span className="label bg-amber text-ink px-u2">WIP</span>}
        </p>
      )}

      <p className="text-mist leading-relaxed">{project.description}</p>

      {withImages && project.images && project.images.length > 0 && (
        <ul className="mt-u4 grid gap-u2 sm:grid-cols-2">
          {project.images.map((image) => (
            <li key={image.src} className="px-box bg-night-900 relative aspect-video">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 18rem, 90vw"
                className="object-cover p-u"
              />
            </li>
          ))}
        </ul>
      )}

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
    </>
  );
}
