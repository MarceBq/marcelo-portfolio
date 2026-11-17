import type { CSSProperties } from "react";

interface StatBarProps {
  /** Filled segments. */
  value: number;
  /** Total segments. */
  max: number;
  /** Tailwind text-colour class; filled segments take the current colour. */
  fill?: string;
}

/**
 * Segmented RPG-style bar, drawn by a single element (see .stat-bar).
 * Decorative: always pair it with a text value.
 */
export default function StatBar({ value, max, fill = "text-amber" }: StatBarProps) {
  return (
    <span
      className={`stat-bar ${fill}`}
      style={{ "--value": value, "--max": max } as CSSProperties}
      aria-hidden
    />
  );
}
