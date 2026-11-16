import type { PaletteColor } from "./palette";
import { pixelsToPaths, type SpritePath } from "./sprites";

/** What a planet's surface is made of. Every kind wraps seamlessly so it can rotate. */
export type Surface =
  | { kind: "bands"; colors: PaletteColor[]; storm?: PaletteColor }
  | { kind: "continents"; ocean: PaletteColor; land: PaletteColor; highland: PaletteColor; caps?: PaletteColor }
  | { kind: "craters"; base: PaletteColor; pit: PaletteColor; rim: PaletteColor }
  | { kind: "spots"; base: PaletteColor; spots: [PaletteColor, PaletteColor] }
  | { kind: "streaks"; base: PaletteColor; streaks: [PaletteColor, PaletteColor] };

export interface PlanetConfig {
  /** Radius in sprite pixels. */
  radius: number;
  surface: Surface;
  /** Colour of the side facing away from the light. */
  shade: PaletteColor;
  /** Colour of the small highlight facing the light. */
  glint: PaletteColor;
  ring?: { colors: [outer: PaletteColor, inner: PaletteColor]; tilt: number };
  moons?: { color: PaletteColor; rx: number; ry: number; period: number }[];
  /** Seconds for one full rotation. */
  spin: number;
  /** Gently bobs up and down when true. */
  float?: boolean;
  seed: number;
}

/** Cheap, stable 0..1 noise for a pixel. */
function hasher(seed: number) {
  return (a: number, b = 0) => {
    let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(seed, 982451653)) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
}

/** Builds the surface as a function of longitude u (wraps at `period`) and latitude v. */
function surfaceFn(surface: Surface, period: number, size: number, seed: number) {
  const hash = hasher(seed);
  // Shortest horizontal distance on a surface that wraps around.
  const wrap = (du: number) => {
    const m = ((du % period) + period) % period;
    return m > period / 2 ? m - period : m;
  };
  const blobs = (count: number, minR: number, maxR: number, squash = 1) =>
    Array.from({ length: count }, (_, i) => {
      const r = minR + hash(i, 3) * (maxR - minR);
      return {
        u: hash(i, 1) * period,
        v: size * (0.12 + hash(i, 2) * 0.76),
        ru: r,
        rv: r * squash,
        tone: hash(i, 4),
      };
    });
  const within = (b: { u: number; v: number; ru: number; rv: number }, u: number, v: number) =>
    Math.hypot(wrap(u + 0.5 - b.u) / b.ru, (v + 0.5 - b.v) / b.rv);

  switch (surface.kind) {
    case "bands": {
      const n = surface.colors.length;
      const storm = { u: period * 0.3, v: size * 0.63, ru: size * 0.2, rv: size * 0.1 };
      return (u: number, v: number): PaletteColor => {
        if (surface.storm && within(storm, u, v) <= 1) return surface.storm;
        const band = Math.floor((v / size) * n);
        // Each band's edge ripples on its own phase.
        const ripple = Math.round(1.1 * Math.sin((u / period) * Math.PI * 6 + band * 1.9));
        const row = Math.min(size - 1, Math.max(0, v + ripple));
        return surface.colors[Math.min(n - 1, Math.floor((row / size) * n))];
      };
    }
    case "continents": {
      const land = blobs(10, size * 0.16, size * 0.3, 0.8);
      return (u: number, v: number): PaletteColor => {
        const capEdge = 1 + (hash(u, 9) > 0.55 ? 1 : 0);
        if (surface.caps && (v < capEdge || v >= size - capEdge)) return surface.caps;
        let nearest = Infinity;
        for (const b of land) nearest = Math.min(nearest, within(b, u, v));
        // Noise on the threshold gives ragged coastlines.
        if (nearest > 0.85 + hash(u, v) * 0.3) return surface.ocean;
        return nearest < 0.4 ? surface.highland : surface.land;
      };
    }
    case "craters": {
      const pits = blobs(8, size * 0.12, size * 0.24);
      return (u: number, v: number): PaletteColor => {
        for (const b of pits) {
          if (within(b, u, v) <= 1) {
            const inShadow = within({ ...b, u: b.u - 1, v: b.v + 1 }, u, v) > 1 - 0.5 / b.ru;
            return inShadow ? surface.rim : surface.pit;
          }
        }
        return surface.base;
      };
    }
    case "spots": {
      const marks = blobs(14, size * 0.05, size * 0.13);
      return (u: number, v: number): PaletteColor => {
        for (const b of marks) {
          if (within(b, u, v) <= 1) return surface.spots[b.tone > 0.5 ? 0 : 1];
        }
        return surface.base;
      };
    }
    case "streaks": {
      // Diagonal streaks; the spacing divides the period so they wrap cleanly.
      const gap = period / 4;
      return (u: number, v: number): PaletteColor => {
        const s = (((u + v * 2) % gap) + gap) % gap;
        if (hash(u, v) < 0.12) return surface.base;
        if (s < 2) return surface.streaks[0];
        if (s >= gap / 2 && s < gap / 2 + 1) return surface.streaks[1];
        return surface.base;
      };
    }
  }
}

/**
 * Draws a planet as layers: the far half of the ring, the disc (a clip shape
 * plus a surface strip wide enough to scroll one full rotation behind it),
 * fixed lighting on top, then the near half of the ring.
 */
export function planetSprite(config: PlanetConfig) {
  const r = config.radius;
  const size = r * 2;
  const period = r * 4;

  // Ring geometry, and the canvas needed to hold it.
  const ring = config.ring;
  const tilt = ((ring?.tilt ?? 0) * Math.PI) / 180;
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const ringRx = r * 1.85;
  const ringRy = ringRx * 0.3;
  const halfW = ring ? Math.ceil(Math.hypot(ringRx * cos, ringRy * sin)) : r;
  const halfH = ring ? Math.max(r, Math.ceil(Math.hypot(ringRx * sin, ringRy * cos))) : r;
  const width = (halfW + 1) * 2;
  const height = (halfH + 1) * 2;
  const cx = width / 2;
  const cy = height / 2;

  const inDisc = (x: number, y: number) => Math.hypot(x + 0.5 - cx, y + 0.5 - cy) <= r;

  // The disc outline, used to clip the scrolling surface.
  let disc = "";
  for (let y = cy - r; y < cy + r; y++) {
    let x = cx - r;
    while (x < cx + r) {
      if (!inDisc(x, y)) {
        x++;
        continue;
      }
      let end = x;
      while (end < cx + r && inDisc(end, y)) end++;
      disc += `M${x} ${y}h${end - x}v1h-${end - x}z`;
      x = end;
    }
  }

  const surface = surfaceFn(config.surface, period, size, config.seed);
  const left = cx - r;
  const top = cy - r;
  const strip = pixelsToPaths(left + period + size, height, (x, y) =>
    x < left || y < top || y >= top + size ? null : surface((x - left) % period, y - top),
  );

  // Light from the upper right: a small glint, a dithered terminator, a dark limb.
  const lightX = cx + r * 0.4;
  const lightY = cy - r * 0.4;
  const lighting = pixelsToPaths(width, height, (x, y) => {
    if (!inDisc(x, y)) return null;
    const fromLight = Math.hypot(x + 0.5 - lightX, y + 0.5 - lightY);
    const t = fromLight / r;
    if (t > 1.24) return config.shade;
    if (t > 0.98) return (x + y) % 2 === 0 ? config.shade : null;
    // The glint stays a couple of pixels whatever the planet's size.
    return fromLight < 1.2 ? config.glint : null;
  });

  const ringHalf = (front: boolean) =>
    ring
      ? pixelsToPaths(width, height, (x, y) => {
          const dx = x + 0.5 - cx;
          const dy = y + 0.5 - cy;
          const along = dx * cos + dy * sin;
          const across = -dx * sin + dy * cos;
          if (across > 0 !== front) return null;
          const e = Math.hypot(along / ringRx, across / ringRy);
          if (e > 1 || e <= 0.64) return null;
          if (e > 0.86) return ring.colors[0];
          return e > 0.8 ? null : ring.colors[1];
        })
      : [];

  return {
    width,
    height,
    period,
    disc,
    strip,
    lighting,
    ringBack: ringHalf(false),
    ringFront: ringHalf(true),
  };
}
