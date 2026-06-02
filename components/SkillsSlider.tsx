"use client";

import { marqueeSkills } from "@/data/skills";
import SectionHeading from "./SectionHeading";
import SkillsGrid from "./SkillsGrid";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="marquee-row group overflow-hidden py-4">
      <div
        className={`flex w-max gap-10 items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {items.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 shrink-0 px-4 py-2 rounded-lg border border-space-border bg-space-glass/50 backdrop-blur-md"
          >
            <i className={`${skill.icon} text-3xl`} />
            <span className="font-mono text-xs text-stellar-muted whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSlider() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeading
          index="02 — stack"
          title="Tech in orbit"
          subtitle="Infinite marquee of tools I use — categorized below with honest levels."
        />
      </div>

      <div className="relative mb-16 space-y-2">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-space-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-space-deep to-transparent z-10 pointer-events-none" />
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <div className="max-w-6xl mx-auto px-5">
        <SkillsGrid />
      </div>
    </section>
  );
}
