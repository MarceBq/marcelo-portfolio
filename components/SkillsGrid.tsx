import { skills, categoryMeta, levelLabels, type SkillCategory } from "@/data/skills";
import { levelSegments } from "@/lib/utils";
import Section from "./ui/Section";
import PixelWindow from "./ui/PixelWindow";
import StatBar from "./ui/StatBar";

const categories: SkillCategory[] = ["dev", "ai", "devops"];

/** The stack, shown as character-sheet stats: one window per category. */
export default function SkillsGrid() {
  return (
    <Section
      id="skills"
      index="02 — stack"
      title="Tech in orbit"
      subtitle="Tools I use — categorized with honest levels."
    >
      <div className="grid gap-u4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <PixelWindow key={cat} title={categoryMeta[cat].title}>
            <ul className="space-y-u4">
              {skills
                .filter((skill) => skill.category === cat)
                .map((skill) => (
                  <li key={skill.name}>
                    <div className="font-term mb-u2 flex items-baseline justify-between gap-u3 text-xl leading-tight">
                      <span className="text-cream">{skill.name}</span>
                      <span className={skill.level === "solid" ? "text-amber" : "text-mist"}>
                        {levelLabels[skill.level]}
                      </span>
                    </div>
                    <StatBar
                      value={levelSegments[skill.level]}
                      max={5}
                      fill={skill.level === "solid" ? "bg-amber" : "bg-teal"}
                    />
                  </li>
                ))}
            </ul>
          </PixelWindow>
        ))}
      </div>
    </Section>
  );
}
