"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const phrases = [
  "Full Stack Developer",
  "AI Engineer",
  "Problem Solver",
  "Builder",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setPhraseIndex((i) => (i + 1) % phrases.length);
          }
        }
      },
      deleting ? 40 : 75
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-5 pt-24 pb-20 max-w-6xl mx-auto"
    >
      {/* Occasional meteor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/4 -left-20 w-32 h-px bg-gradient-to-r from-transparent via-stellar-cyan to-transparent opacity-60"
          animate={{ x: ["0vw", "120vw"], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "easeIn" }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-xs text-stellar-muted flex items-center gap-2 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
        Lima, PE · Open to work
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-mono text-sm text-stellar-muted mb-2"
      >
        <span className="text-stellar-cyan/70">&gt;</span> role.init(
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-mono text-lg md:text-xl text-stellar-cyan mb-2 min-h-[1.75rem]"
        aria-live="polite"
      >
        {text}
        <span className="inline-block w-0.5 h-5 bg-stellar-cyan ml-0.5 animate-pulse align-middle" />
      </motion.div>

      <motion.p className="font-mono text-sm text-stellar-muted" >
        <span className="text-stellar-cyan/70"></span> )
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-stellar-text"
        style={{
          textShadow: "0 0 60px rgba(56, 189, 248, 0.25)",
        }}
      >
        Marcelo
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-5 text-lg md:text-xl text-stellar-muted max-w-xl"
      >
        Building real solutions with code and AI — from Lima to the universe.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#projects-dev"
          className="font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg bg-stellar-cyan text-space-deep hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
        >
          Explore Projects
        </a>
        <a
          href="#contact"
          className="font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg border border-space-border text-stellar-text hover:border-stellar-cyan/50 hover:text-stellar-cyan hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm bg-space-glass/40"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stellar-muted animate-float"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">scroll</span>
        <ChevronDown size={20} className="text-stellar-cyan" />
      </motion.a>
    </section>
  );
}
