const stats = [
  { value: "5+", label: "Active tech" },
  { value: "2", label: "AI projects" },
  { value: "1+", label: "Years building" },
];

/** The bio and stats, shared by the About section and the moon's panel. */
export default function AboutIntro() {
  return (
    <>
      <p className="font-term text-teal flex items-center gap-u2 text-xl">
        <span className="bg-teal inline-block h-u2 w-u2" aria-hidden />
        Open to work
      </p>

      <p className="text-mist mt-u4 text-lg leading-relaxed">
        I&apos;m a <strong className="text-cream">self-taught developer</strong> driven by constant
        challenges and continuous learning. AI fascinates me — not as hype, but as a tool to build
        things that matter.
      </p>
      <p className="text-mist mt-u4 text-lg leading-relaxed">
        Currently studying <strong className="text-cream">Software Engineering</strong> while
        shipping full-stack apps and automation pipelines. If a problem exists, there&apos;s a
        solution waiting to be built.
      </p>

      <dl className="mt-u6 grid grid-cols-3 gap-u2">
        {stats.map((stat) => (
          <div key={stat.label} className="px-box bg-night-900 flex flex-col-reverse p-u3 text-center">
            <dt className="label text-mist mt-u3">{stat.label}</dt>
            <dd className="font-pixel text-amber text-xl sm:text-2xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
