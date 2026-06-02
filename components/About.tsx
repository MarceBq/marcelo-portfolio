"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const terminalLines = [
  { prompt: true, text: "marcelo@lima ~ $ whoami" },
  { prompt: false, text: "Full Stack Developer · AI Engineer" },
  { prompt: false, text: "Software Engineering Student" },
  { prompt: true, text: 'marcelo@lima ~ $ cat mission.txt' },
  { prompt: false, text: '"If a problem exists, build the solution."' },
  { prompt: true, text: "marcelo@lima ~ $ _" },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const id = setInterval(() => {
      n = Math.min(n + step, target);
      setCount(n);
      if (n >= target) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold text-stellar-cyan">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section id="about" className="relative py-24 md:py-32 px-5 max-w-6xl mx-auto">
      <SectionHeading
        index="01 — about"
        title="Builder mindset. Honest orbit."
        subtitle="Self-taught, always learning, always shipping."
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-6">
            🟢 Open to work
          </span>

          <p className="text-stellar-muted text-lg leading-relaxed mb-4">
            I&apos;m a <strong className="text-stellar-text">self-taught developer</strong> driven by
            constant challenges and continuous learning. AI fascinates me — not as hype, but as a
            tool to build things that matter.
          </p>
          <p className="text-stellar-muted text-lg leading-relaxed mb-8">
            Currently studying <strong className="text-stellar-text">Software Engineering</strong> while
            shipping full-stack apps and automation pipelines. If a problem exists, there&apos;s a
            solution waiting to be built.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <Counter target={5} suffix="+" />
              <p className="font-mono text-[0.65rem] uppercase text-stellar-muted mt-2">
                Active tech
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <Counter target={2} />
              <p className="font-mono text-[0.65rem] uppercase text-stellar-muted mt-2">
                AI projects
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <Counter target={1} suffix="+" />
              <p className="font-mono text-[0.65rem] uppercase text-stellar-muted mt-2">
                Years building
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -top-6 -right-2 w-24 h-24 lg:w-32 lg:h-32 opacity-80" aria-hidden>
            <div className="planet-sphere" />
          </div>

          <div className="glass-card overflow-hidden rounded-xl border border-space-border">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-space-border bg-space-void/80">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="flex-1 text-center font-mono text-[0.6rem] text-stellar-muted">
                ~/marcelo — zsh
              </span>
            </div>
            <div className="p-5 font-mono text-xs md:text-sm min-h-[200px] space-y-1.5">
              {terminalLines.map((line, i) =>
                i < visibleLines ? (
                  <div key={i} className={line.prompt ? "text-stellar-cyan/90" : "text-stellar-muted"}>
                    {line.prompt && <span className="text-stellar-cyan/50">› </span>}
                    {line.text}
                  </div>
                ) : null
              )}
              {visibleLines < terminalLines.length && (
                <span className="inline-block w-1.5 h-3.5 bg-stellar-cyan animate-pulse" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
