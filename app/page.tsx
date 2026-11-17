import HudNav from "@/components/ui/HudNav";
import Scene from "@/components/scene/Scene";
import About from "@/components/About";
import SkillsGrid from "@/components/SkillsGrid";
import ProjectList from "@/components/ProjectList";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <HudNav />

      <main>
        <Scene />
        <About />
        <SkillsGrid />
        <ProjectList />
        <Certifications />
        <Timeline />
        <Contact />
      </main>

      <footer className="border-ink border-t-[length:var(--px)] py-8 text-center">
        <p className="label text-mist">
          Marcelo · <span className="text-amber">2026</span>
        </p>
        <p className="font-term text-mist mt-u2 text-lg">
          Built with Next.js &amp; Tailwind — every sprite drawn in code
        </p>
      </footer>
    </>
  );
}
