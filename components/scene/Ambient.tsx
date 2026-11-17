import type { CSSProperties } from "react";
import { palette } from "@/lib/palette";
import { spritePaths, type Legend } from "@/lib/sprites";
import Sprite from "./Sprite";

/*
 * Background life: things that cross the sky now and then. Each one is an
 * original sprite on a long CSS loop that spends most of its time off screen,
 * so the sky stays calm. Purely decorative, hence hidden from assistive tech.
 */

const cometLegend: Legend = { C: "cream", s: "sand", h: "haze", D: "dusk400", d: "dusk500" };
// Falls down and to the left, trailing a tail two pixels along for every one up.
const comet = spritePaths(
  [
    "............d.",
    "..........dd..",
    "........DD....",
    "......hh......",
    "....hh........",
    "CCss..........",
    "CC............",
  ],
  cometLegend,
);

const satelliteLegend: Legend = { b: "blue", S: "sky", m: "mist", A: "amber" };
const satellite = spritePaths(
  [
    "......m......",
    "bSbS.mmm.bSbS",
    "SbSbmmAmmSbSb",
    "bSbS.mmm.bSbS",
  ],
  satelliteLegend,
);

const shipLegend: Legend = { m: "cream", a: "sand", C: "sky", R: "coral", F: "amber", f: "peach" };
// A small shuttle, nose to the left. The flame is drawn apart so it can flicker.
const ship = spritePaths(
  [
    ".........RR....",
    ".....mmmmRRR...",
    "...mmCCmmmmmm..",
    ".mmmmCCmmmmmm..",
    "...mmmmmmmmmm..",
    ".....aaaaRRR...",
    ".........RR....",
  ],
  shipLegend,
);
const shipFlameCore = spritePaths(["", "", "", ".............F.", "", "", ""].map(pad(15)), shipLegend);
const shipFlameOuter = spritePaths(
  ["", "", ".............F.", "..............f", ".............F.", "", ""].map(pad(15)),
  shipLegend,
);

/** Pads a sprite row with transparent pixels to a fixed width. */
function pad(width: number) {
  return (row: string) => row.padEnd(width, ".");
}

const size = (w: number, h: number) => ({ "--w": w, "--h": h }) as CSSProperties;
const vars = (v: Record<string, string | number>) => v as CSSProperties;

export default function Ambient() {
  return (
    <div className="layer" data-depth="3" data-scroll="0.3" aria-hidden>
      <div className="layer-frame">
        {/* Two shooting stars on different rhythms; the second is mirrored. */}
        <div className="comet" style={vars({ "--x": "92%", "--y": "4%", "--dir": 1, "--every": "23s", "--delay": "-19s" })}>
          <svg viewBox="0 0 14 7" className="sprite" style={size(14, 7)}>
            <Sprite paths={comet} />
          </svg>
        </div>
        <div className="comet" style={vars({ "--x": "18%", "--y": "3%", "--dir": -1, "--every": "37s", "--delay": "-21s" })}>
          <svg viewBox="0 0 14 7" className="sprite" style={{ ...size(14, 7), transform: "scaleX(-1)" }}>
            <Sprite paths={comet} />
          </svg>
        </div>

        {/* A satellite drifts across the top of the sky, its beacon blinking. */}
        <div className="satellite">
          <svg viewBox="0 0 13 4" className="sprite" style={size(13, 4)}>
            <Sprite paths={satellite} />
            <rect className="blink" x="6" y="0" width="1" height="1" fill={palette.coral} />
          </svg>
        </div>

        {/* Once in a while a shuttle hurries past the other way. */}
        <div className="ship">
          <svg viewBox="0 0 15 7" className="sprite float" style={size(15, 7)}>
            <Sprite paths={ship} />
            <Sprite paths={shipFlameCore} />
            <g className="blink" style={{ animationDuration: "0.3s" }}>
              <Sprite paths={shipFlameOuter} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
