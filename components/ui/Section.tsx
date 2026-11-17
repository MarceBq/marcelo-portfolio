import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** A content section below the scene, with the shared heading treatment. */
export default function Section({ id, index, title, subtitle, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-6xl px-5 py-14 md:py-20"
    >
      <p className="label text-amber">
        <span className="text-haze" aria-hidden>
          {"// "}
        </span>
        {index}
      </p>
      <h2
        id={`${id}-title`}
        className="font-pixel text-cream mt-u4 text-lg leading-snug sm:text-2xl sm:leading-snug"
      >
        {title}
      </h2>
      {subtitle && <p className="text-mist mt-u4 max-w-2xl text-lg">{subtitle}</p>}
      <div className="mt-u8">{children}</div>
    </section>
  );
}
