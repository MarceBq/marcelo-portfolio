import type { CSSProperties } from "react";
import { palette } from "@/lib/palette";
import { ditherTile, hillSprite, ridgeTile } from "@/lib/sprites";
import Alien from "./Alien";
import Character from "./Character";

const ridge = ridgeTile("night700");
const hill = hillSprite();
const groundFade = ditherTile("night900");

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * Everything that stands on the ground: a distant ridge, the hill, and Marcelo
 * on its summit. Both layers slide sideways with the pointer (nearer = more)
 * but never vertically, so the ground stays glued to the bottom of the scene.
 */
export default function Ground() {
  return (
    <>
      <div className="layer" data-depth="6" data-lock-y aria-hidden>
        <div
          className="ridge"
          style={vars({
            "--tile-w": ridge.width,
            "--tile-h": ridge.height,
            "--ground": hill.base - 2,
            backgroundImage: ridge.image,
          })}
        />
      </div>

      <div className="layer" data-depth="12" data-lock-y>
        <div className="layer-frame">
          {/* Drawn first, so the hill hides it until it peeks. */}
          <Alien />
          {/* Flat ground runs the full width; the hill sprite rises out of it. */}
          <div className="ground" style={vars({ "--h": hill.base })} aria-hidden />
          <svg
            viewBox={`0 0 ${hill.width} ${hill.height}`}
            className="sprite hill"
            style={vars({ "--w": hill.width, "--h": hill.height })}
            aria-hidden
          >
            <path fill={palette.pine} d={hill.body} />
            <path fill={palette.moss} d={hill.rim} />
          </svg>
          <div className="hill-top" style={vars({ "--summit": hill.summit })}>
            <Character />
          </div>
          <i className="ground-fade" style={{ backgroundImage: groundFade }} aria-hidden />
        </div>
      </div>
    </>
  );
}
