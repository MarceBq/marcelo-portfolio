"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { timelineEvents } from "@/data/timeline";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative py-24 md:py-32 px-5 max-w-4xl mx-auto">
      <SectionHeading
        index="05 — trajectory"
        title="Flight path"
        subtitle="From self-taught scripts to full-stack and AI pipelines."
      />

      <div ref={containerRef} className="relative">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-space-border overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-stellar-cyan via-nebula-purple/40 to-stellar-cyan"
            style={{ height: lineHeight }}
          />
        </div>

        <ul className="space-y-14">
          {timelineEvents.map((event, i) => {
            const alignRight = i % 2 === 1;
            return (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${
                  alignRight ? "" : ""
                }`}
              >
                <div
                  className={`absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-space-deep border-2 border-stellar-cyan flex items-center justify-center z-10 shadow-[0_0_14px_rgba(56,189,248,0.45)]`}
                >
                  <Star size={10} className="text-stellar-cyan" />
                </div>

                {/* Date — left on desktop for even, right column for odd */}
                <div
                  className={`${
                    alignRight
                      ? "md:col-start-2 md:pl-10"
                      : "md:col-start-1 md:text-right md:pr-10"
                  }`}
                >
                  <p className="font-mono text-xs text-stellar-cyan mb-1">{event.date}</p>
                </div>

                {/* Content */}
                <div
                  className={`mt-1 ${
                    alignRight
                      ? "md:col-start-1 md:row-start-1 md:text-right md:pr-10"
                      : "md:col-start-2 md:pl-10"
                  }`}
                >
                  <h3 className="font-display text-base font-semibold text-stellar-text">
                    {event.title}
                  </h3>
                  <p className="text-sm text-stellar-muted mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
