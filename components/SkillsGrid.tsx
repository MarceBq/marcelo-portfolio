"use client";

import { motion } from "framer-motion";
import { skills, categoryMeta, levelLabels, type SkillCategory } from "@/data/skills";
import { levelWidth } from "@/lib/utils";

const categories: SkillCategory[] = ["dev", "ai", "devops"];

export default function SkillsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, ci) => {
        const meta = categoryMeta[cat];
        const items = skills.filter((s) => s.category === cat);

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1, duration: 0.5 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-space-border">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-stellar-cyan/10 text-stellar-cyan font-mono text-sm">
                {meta.icon}
              </span>
              <h3 className="font-display text-sm font-semibold">{meta.title}</h3>
            </div>

            <ul className="space-y-4">
              {items.map((skill) => (
                <li key={skill.name} className="flex gap-3 items-start">
                  <i className={`${skill.icon} text-2xl shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs text-stellar-text truncate">
                        {skill.name}
                      </span>
                      <span
                        className={`font-mono text-[0.55rem] uppercase px-1.5 py-0.5 rounded shrink-0 ${
                          skill.level === "solid"
                            ? "bg-stellar-cyan/15 text-stellar-cyan"
                            : skill.level === "intermediate"
                              ? "bg-white/5 text-stellar-muted"
                              : "bg-white/5 text-stellar-muted/70"
                        }`}
                      >
                        {levelLabels[skill.level]}
                      </span>
                    </div>
                    <div className="h-1 bg-space-void rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${levelWidth[skill.level]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-stellar-cyan/60 to-stellar-cyan rounded-full"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
