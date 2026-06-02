"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stellar-cyan mb-3">
        <span className="text-stellar-muted">{"//"}</span> {index}
      </p>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stellar-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-stellar-muted max-w-2xl text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
