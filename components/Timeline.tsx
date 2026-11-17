import { timelineEvents } from "@/data/timeline";
import Section from "./ui/Section";

export default function Timeline() {
  return (
    <Section
      id="timeline"
      index="05 — trajectory"
      title="Flight path"
      subtitle="From self-taught scripts to full-stack and AI pipelines."
    >
      {/* The rail is the list's left border; each stop hangs a square node on it. */}
      <ol className="border-dusk-500 ml-u2 max-w-2xl space-y-u8 border-l-[length:var(--px)] pl-u8">
        {timelineEvents.map((event, i) => (
          <li key={event.id} className="relative">
            <span
              aria-hidden
              className={`absolute left-[calc(var(--px)*-11)] top-u h-u4 w-u4 ${
                i === timelineEvents.length - 1 ? "bg-amber" : "bg-cream"
              }`}
            />
            <p className="label text-amber">{event.date}</p>
            <h3 className="font-term text-cream mt-u text-2xl leading-tight">{event.title}</h3>
            <p className="text-mist mt-u2 leading-relaxed">{event.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
