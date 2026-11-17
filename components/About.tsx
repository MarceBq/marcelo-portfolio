import AboutIntro from "./AboutIntro";
import Section from "./ui/Section";
import PixelWindow from "./ui/PixelWindow";

const terminalLines = [
  { prompt: true, text: "marcelo@lima ~ $ whoami" },
  { prompt: false, text: "Full Stack Developer · AI Engineer" },
  { prompt: false, text: "Software Engineering Student" },
  { prompt: true, text: "marcelo@lima ~ $ cat mission.txt" },
  { prompt: false, text: '"If a problem exists, build the solution."' },
];

export default function About() {
  return (
    <Section
      id="about"
      index="01 — about"
      title="Builder mindset. Honest orbit."
      subtitle="Self-taught, always learning, always shipping."
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <AboutIntro />
        </div>

        <PixelWindow title="~/marcelo — zsh">
          <div className="font-term space-y-1 text-xl leading-snug sm:text-2xl">
            {terminalLines.map((line) => (
              <p key={line.text} className={line.prompt ? "text-teal" : "text-cream"}>
                {line.text}
              </p>
            ))}
            <p className="text-teal">
              marcelo@lima ~ ${" "}
              <span className="blink bg-teal inline-block h-[0.7em] w-[0.45em]" aria-hidden />
            </p>
          </div>
        </PixelWindow>
      </div>
    </Section>
  );
}
