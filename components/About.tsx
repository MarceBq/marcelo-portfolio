import Section from "./ui/Section";
import PixelWindow from "./ui/PixelWindow";

const terminalLines = [
  { prompt: true, text: "marcelo@lima ~ $ whoami" },
  { prompt: false, text: "Full Stack Developer · AI Engineer" },
  { prompt: false, text: "Software Engineering Student" },
  { prompt: true, text: "marcelo@lima ~ $ cat mission.txt" },
  { prompt: false, text: '"If a problem exists, build the solution."' },
];

const stats = [
  { value: "5+", label: "Active tech" },
  { value: "2", label: "AI projects" },
  { value: "1+", label: "Years building" },
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
          <p className="font-term text-teal flex items-center gap-u2 text-xl">
            <span className="bg-teal inline-block h-u2 w-u2" aria-hidden />
            Open to work
          </p>

          <p className="text-mist mt-u4 text-lg leading-relaxed">
            I&apos;m a <strong className="text-cream">self-taught developer</strong> driven by
            constant challenges and continuous learning. AI fascinates me — not as hype, but as a
            tool to build things that matter.
          </p>
          <p className="text-mist mt-u4 text-lg leading-relaxed">
            Currently studying <strong className="text-cream">Software Engineering</strong> while
            shipping full-stack apps and automation pipelines. If a problem exists, there&apos;s a
            solution waiting to be built.
          </p>

          <dl className="mt-u8 grid grid-cols-3 gap-u2">
            {stats.map((stat) => (
              <div key={stat.label} className="px-box flex flex-col-reverse p-u4 text-center">
                <dt className="label text-mist mt-u3">{stat.label}</dt>
                <dd className="font-pixel text-amber text-xl sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
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
