import type { CSSProperties } from "react";
import { spritePaths, type Legend } from "@/lib/sprites";
import Sprite from "./Sprite";

/*
 * A small green visitor who lives behind the hill. Every so often it rises
 * just far enough to peek over the slope, waves, and ducks back down.
 * An original sprite; the two arm positions alternate to make the wave.
 */
const legend: Legend = {
  t: "teal",
  m: "moss", // shaded side
  a: "amber", // antenna tips
  W: "cream", // eyes
  K: "ink", // pupils and mouth
};

const body = spritePaths(
  [
    "...a......a...",
    "...t......t...",
    "....t....t....",
    "....tttttt....",
    "...mtttttttt..",
    "..mKWttttKWt..",
    "..mKWttttKWt..",
    "..mttttttttt..",
    "...mttKKttt...",
    "....mttttt....",
    ".....mttm.....",
    "....mttttt....",
    "...mttttttt...",
    "...mttttttt...",
    "...mttttttt...",
    "...mttttttt...",
    "...mttttttt...",
    "...mttttttt...",
  ],
  legend,
);

const blank = "..............";
const armUp = spritePaths(
  [blank, blank, blank, blank, blank, blank, blank, blank, "............t.", "............t.", "...........t..", "..........t...", blank, blank, blank, blank, blank, blank],
  legend,
);
const armOut = spritePaths(
  [blank, blank, blank, blank, blank, blank, blank, blank, blank, ".............t", "...........tt.", "..........t...", blank, blank, blank, blank, blank, blank],
  legend,
);

export default function Alien() {
  return (
    <div className="alien" aria-hidden>
      <svg viewBox="0 0 14 18" className="sprite" style={{ "--w": 14, "--h": 18 } as CSSProperties}>
        <Sprite paths={body} />
        <g className="first-half" style={{ animationDuration: "0.5s" }}>
          <Sprite paths={armUp} />
        </g>
        <g className="second-half" style={{ animationDuration: "0.5s" }}>
          <Sprite paths={armOut} />
        </g>
      </svg>
    </div>
  );
}
