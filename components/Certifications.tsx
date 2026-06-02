"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { certifications, certificationsUnderConstruction } from "@/data/certifications";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 px-5 max-w-6xl mx-auto">
      <SectionHeading
        index="04 — credentials"
        title="Space badges"
        subtitle={
          certificationsUnderConstruction
            ? "Certifications in progress — building my constellation of credentials."
            : "Verified learning milestones."
        }
      />

      {certificationsUnderConstruction && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-4 rounded-xl border border-dashed border-stellar-cyan/25 bg-stellar-cyan/5 font-mono text-sm text-stellar-muted text-center"
        >
          🛸 Section under construction — actively completing courses on Platzi, university, and
          self-directed AI tracks.
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative group"
          >
            {/* Hexagonal badge feel via clip */}
            <div className="badge-hex glass-card p-6 h-full flex flex-col items-center text-center hover:border-stellar-cyan/30 hover:shadow-glow transition-all duration-400">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 bg-gradient-to-br from-stellar-cyan/20 to-nebula-purple/20 border border-space-border group-hover:animate-pulse-glow">
                {cert.icon}
              </div>
              <h3 className="font-display text-sm font-semibold text-stellar-text mb-1">
                {cert.name}
              </h3>
              <p className="font-mono text-[0.65rem] text-stellar-muted mb-1">{cert.platform}</p>
              {cert.year && (
                <p className="font-mono text-[0.6rem] text-stellar-cyan/70 mb-4">{cert.year}</p>
              )}
              {cert.inProgress ? (
                <span className="mt-auto font-mono text-[0.6rem] uppercase tracking-wider text-amber-400/90 flex items-center gap-1">
                  <Award size={12} /> In progress
                </span>
              ) : (
                <a
                  href={cert.url ?? "#"}
                  className="mt-auto inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider text-stellar-cyan hover:underline"
                >
                  View certificate <ArrowRight size={12} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-stellar-cyan hover:underline"
      >
        Ask about current courses <ArrowRight size={14} />
      </motion.a>
    </section>
  );
}
