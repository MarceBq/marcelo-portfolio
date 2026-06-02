import StarField from "@/components/StarField";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsSlider from "@/components/SkillsSlider";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <StarField />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <SkillsSlider />

        <Projects
          id="projects-dev"
          category="dev"
          index="03a — dev"
          title="Software Development"
          subtitle="Full-stack apps, APIs, and interfaces — built to ship."
        />
        <Projects
          id="projects-ai"
          category="ai"
          index="03b — ai"
          title="AI & Automation"
          subtitle="LLM scripts, agents, and workflows that eliminate repetitive work."
        />

        <Certifications />
        <Timeline />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-space-border py-8 text-center">
        <p className="font-display text-sm text-stellar-muted">
          Marcelo · <span className="text-stellar-cyan">2026</span>
        </p>
        <p className="font-mono text-xs text-stellar-muted/70 mt-2">
          Built with Next.js, Tailwind & Framer Motion
        </p>
      </footer>
    </>
  );
}
