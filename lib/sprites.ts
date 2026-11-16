import { palette, type PaletteColor } from "./palette";

/** Small deterministic PRNG so server and client render the same sky. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const toDataUri = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const svgOpen = (w: number, h: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">`;

interface StarTileOptions {
  seed: number;
  /** Tile edge in sprite pixels. The tile repeats, so layers use different sizes. */
  size: number;
  count: number;
  colors: PaletteColor[];
  /** Draw five-pixel plus shapes instead of single pixels. */
  big?: boolean;
}

/** A repeating tile of stars, one sprite pixel each, as a CSS background image. */
export function starTile({ seed, size, count, colors, big }: StarTileOptions) {
  const rand = mulberry32(seed);
  const margin = big ? 2 : 0;
  let rects = "";
  for (let i = 0; i < count; i++) {
    const x = margin + Math.floor(rand() * (size - margin * 2));
    const y = margin + Math.floor(rand() * (size - margin * 2));
    const fill = palette[colors[Math.floor(rand() * colors.length)]];
    rects += big
      ? `<path fill="${fill}" d="M${x} ${y - 1}h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/>`
      : `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
  }
  return toDataUri(`${svgOpen(size, size)}${rects}</svg>`);
}

/**
 * Ordered dither strip (4 wide, 6 tall) that eases one flat sky band into the
 * next without a gradient: 25%, 50%, then 75% coverage of the next colour.
 */
export function ditherTile(color: PaletteColor) {
  const rows = ["x...", "..x.", "x.x.", ".x.x", "xxx.", "x.xx"];
  let rects = "";
  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (cell === "x") rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    });
  });
  return toDataUri(
    `${svgOpen(4, rows.length).replace(">", ` fill="${palette[color]}">`)}${rects}</svg>`,
  );
}
