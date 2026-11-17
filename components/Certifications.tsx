import { certifications, certificationsUnderConstruction } from "@/data/certifications";
import Section from "./ui/Section";

/** A pixel medal: ribbon on top, disc below. Amber when earned, grey while in progress. */
function Medal({ earned }: { earned: boolean }) {
  return (
    <svg
      viewBox="0 0 11 14"
      aria-hidden
      className={`h-[calc(var(--px)*14)] w-[calc(var(--px)*11)] ${earned ? "text-amber" : "text-ash"}`}
    >
      <path className="fill-coral" d="M2 0h3v5h-3zM6 0h3v5h-3z" />
      <path className="fill-rust" d="M4 0h1v5h-1zM6 0h1v5h-1z" />
      <path fill="currentColor" d="M3 5h5v1h2v1h1v5h-1v1h-2v1h-5v-1h-2v-1h-1v-5h1v-1h2z" />
      <path className="fill-night-900" d="M5 7h1v1h1v1h1v1h-2v2h-1v-2h-2v-1h1v-1h1z" />
    </svg>
  );
}

export default function Certifications() {
  return (
    <Section
      id="certifications"
      index="04 — credentials"
      title="Space badges"
      subtitle={
        certificationsUnderConstruction
          ? "Certifications in progress — building my constellation of credentials."
          : "Verified learning milestones."
      }
    >
      {certificationsUnderConstruction && (
        <p className="px-box font-term text-mist mb-u6 p-u4 text-center text-xl">
          Section under construction — actively completing courses on Platzi, university, and
          self-directed AI tracks.
        </p>
      )}

      <ul className="grid gap-u4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <li key={cert.id} className="px-box flex flex-col items-center p-u6 text-center">
            <Medal earned={!cert.inProgress} />
            <h3 className="font-pixel text-cream mt-u4 text-xs leading-relaxed">{cert.name}</h3>
            <p className="font-term text-mist mt-u2 text-xl leading-tight">{cert.platform}</p>
            {cert.year && cert.year !== "—" && (
              <p className="font-term text-haze text-xl leading-tight">{cert.year}</p>
            )}
            {cert.inProgress ? (
              <p className="label text-amber mt-u4">In progress</p>
            ) : (
              <a href={cert.url ?? "#"} className="px-link mt-u4">
                View certificate<span className="sr-only"> — {cert.name}</span>
              </a>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-u6">
        <a href="#contact" className="px-link">
          Ask about current courses &gt;
        </a>
      </p>
    </Section>
  );
}
