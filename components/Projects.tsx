"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { getProjectsByType, type ProjectType } from "@/data/projects";
import SectionHeading from "./SectionHeading";

interface ProjectsSectionProps {
  category: ProjectType;
  id: string;
  index: string;
  title: string;
  subtitle: string;
}

function ProjectCard({
  project,
  variant,
}: {
  project: ReturnType<typeof getProjectsByType>[0];
  variant: ProjectType;
}) {
  const isAi = variant === "ai";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`group relative glass-card rounded-xl p-6 overflow-hidden transition-all duration-400 hover:-translate-y-1.5 ${
        isAi
          ? "border-nebula-purple/20 hover:border-nebula-purple/50 hover:shadow-glow-purple"
          : "border-space-border hover:border-stellar-cyan/40 hover:shadow-glow"
      }`}
    >
      {isAi && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-nebula-purple/60 to-transparent animate-scan" />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4 relative">
        {project.aiPowered && (
          <span className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-1 rounded border border-nebula-purple/40 bg-nebula-purple/10 text-nebula-purple">
            ✦ AI-powered
          </span>
        )}
        {project.wip && (
          <span className="font-mono text-[0.6rem] uppercase tracking-wider px-2 py-1 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">
            WIP
          </span>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold text-stellar-text mb-2 relative">
        {project.name}
      </h3>
      <p className="text-stellar-muted text-sm leading-relaxed mb-4 relative">
        {project.description}
      </p>

      {project.wip && project.progress !== undefined && (
        <div className="mb-4 relative">
          <div className="flex justify-between font-mono text-[0.6rem] text-stellar-muted mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1 bg-space-void rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              className={`h-full rounded-full ${
                isAi
                  ? "bg-gradient-to-r from-nebula-purple/60 to-nebula-purple"
                  : "bg-gradient-to-r from-stellar-cyan/60 to-stellar-cyan"
              }`}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5 relative">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.6rem] px-2 py-0.5 rounded border border-space-border bg-space-void/60 text-stellar-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 relative">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider px-3 py-2 rounded-lg border border-space-border hover:border-stellar-cyan/50 text-stellar-muted hover:text-stellar-cyan transition-colors"
          >
            <Github size={14} /> GitHub
          </a>
        )}
        {project.demo && !project.wip && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider px-3 py-2 rounded-lg transition-colors ${
              isAi
                ? "bg-nebula-purple/20 text-nebula-purple hover:bg-nebula-purple/30"
                : "bg-stellar-cyan/15 text-stellar-cyan hover:bg-stellar-cyan/25"
            }`}
          >
            <ExternalLink size={14} /> Demo
          </a>
        )}
        {project.wip && !project.demo && (
          <span className="font-mono text-[0.65rem] uppercase tracking-wider px-3 py-2 rounded-lg border border-space-border text-stellar-muted/50 cursor-not-allowed">
            Under construction
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects({ category, id, index, title, subtitle }: ProjectsSectionProps) {
  const items = getProjectsByType(category);

  return (
    <section id={id} className="relative py-16 md:py-24 px-5 max-w-6xl mx-auto">
      <SectionHeading index={index} title={title} subtitle={subtitle} />
      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} variant={category} />
        ))}
      </div>
    </section>
  );
}
