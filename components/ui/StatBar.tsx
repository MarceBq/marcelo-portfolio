interface StatBarProps {
  /** Filled segments. */
  value: number;
  /** Total segments. */
  max: number;
  /** Tailwind background class for filled segments. */
  fill?: string;
}

/** Segmented RPG-style bar. Decorative: always pair it with a text value. */
export default function StatBar({ value, max, fill = "bg-amber" }: StatBarProps) {
  return (
    <span className="flex gap-u" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-u2 flex-1 ${i < value ? fill : "bg-night-900"}`} />
      ))}
    </span>
  );
}
