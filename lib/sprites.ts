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

/* ── Sprites ────────────────────────────────────────────────────────── */

export interface SpritePath {
  fill: string;
  d: string;
}

type PixelFn = (x: number, y: number) => PaletteColor | null;

/** Walk a pixel grid and emit one path per colour, merging horizontal runs. */
export function pixelsToPaths(width: number, height: number, pixel: PixelFn): SpritePath[] {
  const byColor = new Map<PaletteColor, string>();
  for (let y = 0; y < height; y++) {
    let x = 0;
    while (x < width) {
      const color = pixel(x, y);
      let end = x + 1;
      while (end < width && pixel(end, y) === color) end++;
      if (color) {
        const run = end - x;
        byColor.set(color, `${byColor.get(color) ?? ""}M${x} ${y}h${run}v1h-${run}z`);
      }
      x = end;
    }
  }
  return Array.from(byColor, ([color, d]) => ({ fill: palette[color], d }));
}

export type Legend = Record<string, PaletteColor>;

/**
 * Hand-drawn sprites are written as rows of characters; the legend maps each
 * character to a palette colour and anything else is transparent.
 * `offsetY` places a part (head, torso, legs) at its row in the full sprite.
 */
export function spritePaths(rows: string[], legend: Legend, offsetY = 0): SpritePath[] {
  const width = rows[0].length;
  if (rows.some((row) => row.length !== width)) {
    throw new Error("Sprite rows must all be the same width");
  }
  return pixelsToPaths(width, rows.length + offsetY, (x, y) =>
    y < offsetY ? null : (legend[rows[y - offsetY][x]] ?? null),
  );
}

/**
 * The moon: a lit disc with a shaded limb, craters, and a dithered halo.
 * Light comes from the upper right. The halo is returned as a bare path so the
 * caller can colour it (it brightens on hover and focus).
 */
export function moonSprite(radius = 22) {
  const pad = 7;
  const size = (radius + pad) * 2;
  const c = size / 2;
  const craters = [
    { x: -8, y: -7, r: 4.2 },
    { x: 7, y: 3, r: 5.2 },
    { x: -4, y: 9, r: 3.2 },
    { x: 9, y: -10, r: 2.4 },
    { x: -13, y: 2, r: 2.2 },
    { x: 1, y: -3, r: 1.6 },
    { x: 12, y: 12, r: 1.6 },
  ];

  const body = pixelsToPaths(size, size, (px, py) => {
    const x = px + 0.5 - c;
    const y = py + 0.5 - c;
    if (Math.hypot(x, y) > radius) return null;
    for (const crater of craters) {
      if (Math.hypot(x - crater.x, y - crater.y) <= crater.r) {
        // The wall nearest the light is in shadow.
        const inShadow = Math.hypot(x - (crater.x - 1), y - (crater.y + 1)) > crater.r - 0.4;
        return inShadow ? "mist" : "sand";
      }
    }
    // Limb darkening on the side away from the light.
    return Math.hypot(x - 4, y + 4) > radius - 1.5 ? "sand" : "cream";
  });

  let halo = "";
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const d = Math.hypot(px + 0.5 - c, py + 0.5 - c);
      const inner = d > radius + 1.5 && d <= radius + 4.5 && (px + py) % 2 === 0;
      const outer = d > radius + 4.5 && d <= radius + 6.5 && px % 2 === 0 && py % 2 === 0;
      if (inner || outer) halo += `M${px} ${py}h1v1h-1z`;
    }
  }

  return { size, body, halo };
}

/**
 * The foreground hill: flat ground that swells into a rounded rise in the
 * middle of the sprite. Returns the dark body and the moonlit grass rim, plus
 * the ground and summit heights (in pixels from the bottom) so the caller can
 * line up the flat ground and stand things on top.
 */
export function hillSprite({ width = 400, base = 14, rise = 44, spread = 80, seed = 5 } = {}) {
  const rand = mulberry32(seed);
  const headroom = 2;
  const height = base + rise + headroom;
  const tops = Array.from({ length: width }, (_, x) => {
    const bump = rise * Math.exp(-(((x + 0.5 - width / 2) / spread) ** 2));
    return height - base - Math.round(bump);
  });

  let body = `M0 ${height}`;
  let rim = "";
  for (let x = 0; x < width; ) {
    let end = x + 1;
    while (end < width && tops[end] === tops[x]) end++;
    const run = end - x;
    body += `V${tops[x]}h${run}`;
    rim += `M${x} ${tops[x]}h${run}v1h-${run}z`;
    x = end;
  }
  body += `V${height}z`;

  for (let x = 0; x < width; x++) {
    // A second, dithered row softens the rim; the odd blade of grass pokes above it.
    if (x % 2 === 0) rim += `M${x} ${tops[x] + 1}h1v1h-1z`;
    if (rand() < 0.14) rim += `M${x} ${tops[x] - 1}h1v1h-1z`;
  }

  return { width, height, base, summit: base + rise, body, rim };
}

/** A distant mountain ridge as a seamless repeating tile (two-pixel steps). */
export function ridgeTile(color: PaletteColor, width = 240, height = 36) {
  const wave = (x: number, cycles: number, phase: number) =>
    Math.sin((x / width) * Math.PI * 2 * cycles + phase);
  let d = `M0 ${height}`;
  for (let x = 0; x < width; x += 2) {
    const h = 15 + 9 * wave(x, 2, 1) + 6 * wave(x, 5, 2) + 3 * wave(x, 9, 4);
    d += `V${height - Math.round(h / 2) * 2}h2`;
  }
  d += `V${height}z`;
  return {
    width,
    height,
    image: toDataUri(`${svgOpen(width, height)}<path fill="${palette[color]}" d="${d}"/></svg>`),
  };
}
