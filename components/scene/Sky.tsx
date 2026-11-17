import type { CSSProperties } from "react";
import { palette, type PaletteColor } from "@/lib/palette";
import { ditherTile, starTile } from "@/lib/sprites";

/** Flat colour bands from zenith to horizon; `h` is a share of the viewport height. */
const bands: { color: PaletteColor; h: number }[] = [
  { color: "night900", h: 38 },
  { color: "night800", h: 22 },
  { color: "night700", h: 17 },
  { color: "night600", h: 13 },
  { color: "dusk500", h: 7 },
  { color: "dusk400", h: 9 },
];

interface Field {
  seed: number;
  /** Tile edge in sprite pixels; every field uses a different one so repeats never line up. */
  tile: number;
  count: number;
  colors: PaletteColor[];
  big?: boolean;
  /** Seconds for the field to drift one full tile. */
  drift: number;
  /** Twinkle period and phase, for fields that blink. */
  twinkle?: [period: string, delay: string];
}

/** Star layers, far to near. depth = pointer offset in sprite pixels, scroll = scroll lag. */
const layers: { depth: number; scroll: number; fields: Field[] }[] = [
  {
    depth: 2,
    scroll: 0.5,
    fields: [{ seed: 11, tile: 150, count: 60, colors: ["ash", "dusk400", "ash"], drift: 900 }],
  },
  {
    depth: 4,
    scroll: 0.38,
    fields: [
      { seed: 23, tile: 210, count: 40, colors: ["mist", "haze", "cream"], drift: 700 },
      { seed: 31, tile: 170, count: 9, colors: ["cream"], drift: 560, twinkle: ["3.7s", "0s"] },
      { seed: 47, tile: 190, count: 10, colors: ["cream", "peach"], drift: 620, twinkle: ["5.3s", "-1.9s"] },
      { seed: 59, tile: 230, count: 12, colors: ["cream", "sky"], drift: 760, twinkle: ["6.1s", "-4.2s"] },
    ],
  },
  {
    depth: 8,
    scroll: 0.26,
    fields: [
      { seed: 71, tile: 400, count: 11, colors: ["cream", "amber", "cream"], big: true, drift: 1000, twinkle: ["7.3s", "-3s"] },
    ],
  },
];

// Tiles are plain data URIs, built once when the module loads.
const rendered = layers.map((layer) => ({
  ...layer,
  fields: layer.fields.map((f) => ({
    key: f.seed,
    twinkle: Boolean(f.twinkle),
    style: {
      backgroundImage: starTile({ seed: f.seed, size: f.tile, count: f.count, colors: f.colors, big: f.big }),
      "--tile": f.tile,
      "--drift": f.drift + "s",
      animationTimingFunction: f.twinkle ? "steps(" + f.tile + "), step-end" : "steps(" + f.tile + ")",
      ...(f.twinkle && { "--twinkle": f.twinkle[0], "--twinkle-delay": f.twinkle[1] }),
    } as CSSProperties,
  })),
}));

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * The night sky: dithered colour bands plus three star layers.
 * Each field drifts one sprite pixel at a time; SceneMotion offsets each layer
 * by pointer and scroll according to its data-depth.
 */
export default function Sky() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="sky-bands">
        {bands.map((band, i) => (
          <div
            key={band.color}
            className="sky-band"
            style={vars({ "--h": band.h, background: palette[band.color] })}
          >
            {bands[i + 1] && (
              <i
                className="sky-dither"
                style={{ backgroundImage: ditherTile(bands[i + 1].color) }}
              />
            )}
          </div>
        ))}
      </div>

      {rendered.map((layer) => (
        <div key={layer.depth} className="layer" data-depth={layer.depth} data-scroll={layer.scroll}>
          {layer.fields.map((field) => (
            <div
              key={field.key}
              className={field.twinkle ? "stars twinkle" : "stars"}
              style={field.style}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
