import type { PlanetConfig } from "@/lib/planets";

export interface PlanetPlacement {
  planet: PlanetConfig;
  /** Centre of the planet on wide screens, as a percentage of the scene (x, y). */
  desktop: [x: number, y: number];
  /** Centre on narrow screens, where the scene is tall and planets zigzag down it. */
  mobile: [x: number, y: number];
}

/**
 * One planet per project, keyed by the project's id in data/projects.ts.
 * To add a project to the sky, add an entry here; projects without one still
 * appear in the list below the scene.
 */
export const planets: Record<string, PlanetPlacement> = {
  // Blue gas giant with a moon in tow.
  "dev-dashboard": {
    planet: {
      radius: 11,
      surface: { kind: "bands", colors: ["sky", "blue", "sky", "blue", "night600", "blue"], storm: "cream" },
      shade: "night700",
      glint: "cream",
      moons: [{ color: "mist", rx: 18, ry: 5, period: 26 }],
      spin: 110,
      seed: 3,
    },
    desktop: [88, 54],
    mobile: [30, 60],
  },
  // Ocean world with continents and ice caps.
  "dev-graphql-api": {
    planet: {
      radius: 9,
      surface: { kind: "continents", ocean: "blue", land: "moss", highland: "teal", caps: "cream" },
      shade: "night700",
      glint: "cream",
      spin: 90,
      float: true,
      seed: 8,
    },
    desktop: [30, 17],
    mobile: [26, 45],
  },
  // Small, old, cratered rock: where it all started.
  "dev-portfolio-v1": {
    planet: {
      radius: 6,
      surface: { kind: "craters", base: "mist", pit: "haze", rim: "dusk500" },
      shade: "ash",
      glint: "cream",
      spin: 140,
      seed: 21,
    },
    desktop: [11, 21],
    mobile: [27, 36],
  },
  // The big one: amber giant with rings.
  "ai-automation-scripts": {
    planet: {
      radius: 12,
      surface: { kind: "bands", colors: ["peach", "amber", "sand", "amber", "coral", "amber", "peach"], storm: "rust" },
      shade: "rust",
      glint: "cream",
      ring: { colors: ["sand", "peach"], tilt: -14 },
      spin: 120,
      float: true,
      seed: 5,
    },
    desktop: [57, 33],
    mobile: [66, 53],
  },
  // Molten world with two small moons.
  "ai-n8n-pipeline": {
    planet: {
      radius: 8,
      surface: { kind: "spots", base: "coral", spots: ["amber", "rust"] },
      shade: "rust",
      glint: "peach",
      moons: [
        { color: "sand", rx: 13, ry: 4, period: 17 },
        { color: "haze", rx: 17, ry: 6, period: 31 },
      ],
      spin: 80,
      seed: 13,
    },
    desktop: [43, 13],
    mobile: [72, 66],
  },
  // Violet ice world with a thin tilted ring.
  "ai-rag-kb": {
    planet: {
      radius: 9,
      surface: { kind: "streaks", base: "dusk400", streaks: ["haze", "cream"] },
      shade: "night600",
      glint: "cream",
      ring: { colors: ["teal", "haze"], tilt: 20 },
      spin: 100,
      seed: 34,
    },
    desktop: [46, 60],
    mobile: [27, 73],
  },
  // Young green world, just forming, with one moon.
  "ai-skill-agent": {
    planet: {
      radius: 6,
      surface: { kind: "spots", base: "moss", spots: ["teal", "pine"] },
      shade: "pine",
      glint: "cream",
      moons: [{ color: "cream", rx: 10, ry: 3, period: 14 }],
      spin: 70,
      float: true,
      seed: 55,
    },
    desktop: [72, 47],
    mobile: [34, 80],
  },
};
