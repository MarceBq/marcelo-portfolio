import type { ReactNode } from "react";

interface PixelWindowProps {
  /** Text in the title bar. */
  title: string;
  children: ReactNode;
  className?: string;
  /** Heading level for the title; sections use h2, nested windows h3. */
  as?: "h2" | "h3" | "h4";
  id?: string;
}

/** A retro game window: notched frame, title bar, content. */
export default function PixelWindow({
  title,
  children,
  className = "",
  as: Heading = "h3",
  id,
}: PixelWindowProps) {
  return (
    <div className={`px-box ${className}`}>
      <div className="px-titlebar">
        <span className="bg-amber h-u2 w-u2 shrink-0" aria-hidden />
        <Heading id={id} className="flex-1">
          {title}
        </Heading>
        <span className="bg-night-900 h-u2 w-u2 shrink-0" aria-hidden />
        <span className="bg-night-900 h-u2 w-u2 shrink-0" aria-hidden />
      </div>
      <div className="p-u4 sm:p-u6">{children}</div>
    </div>
  );
}
