import type { CSSProperties } from "react";
import { planets, type PlanetPlacement } from "@/data/planets";
import { projects, type Project } from "@/data/projects";
import { palette } from "@/lib/palette";
import { planetSprite } from "@/lib/planets";
import ProjectDetails from "../ProjectDetails";
import Hotspot from "./Hotspot";
import Sprite from "./Sprite";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** A four-pixel moonlet; two copies ride each orbit, one behind the planet and one in front. */
function Moonlet({ moon, side }: { moon: NonNullable<PlanetPlacement["planet"]["moons"]>[number]; side: "front" | "back" }) {
  return (
    <svg
      viewBox="0 0 4 4"
      className={`sprite orbit orbit-${side}`}
      style={vars({ "--w": 4, "--h": 4, "--rx": moon.rx, "--ry": moon.ry, "--period": `${moon.period}s` })}
    >
      <path fill={palette[moon.color]} d="M1 0h2v1h1v2h-1v1h-2v-1h-1v-2h1z" />
      <path fill={palette.ash} d="M0 2h1v1h1v1h-1v-1h-1z" />
    </svg>
  );
}

function Planet({ project, placement }: { project: Project; placement: PlanetPlacement }) {
  const { planet, desktop, mobile } = placement;
  const sprite = planetSprite(planet);
  const clipId = `disc-${project.id}`;
  const moons = planet.moons ?? [];

  return (
    <Hotspot
      name={project.name}
      title={project.name}
      className="planet"
      style={vars({ "--x": `${desktop[0]}%`, "--y": `${desktop[1]}%`, "--mx": `${mobile[0]}%`, "--my": `${mobile[1]}%` })}
      sprite={
        <span className={`planet-body ${planet.float ? "float" : ""}`} aria-hidden>
          {moons.map((moon) => (
            <Moonlet key={moon.period} moon={moon} side="back" />
          ))}
          <svg
            viewBox={`0 0 ${sprite.width} ${sprite.height}`}
            className="sprite"
            style={vars({ "--w": sprite.width, "--h": sprite.height })}
          >
            <Sprite paths={sprite.ringBack} />
            <clipPath id={clipId}>
              <path d={sprite.disc} />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
              {/* The surface strip slides one pixel at a time: the planet turns. */}
              <g
                className="spin"
                style={vars({
                  "--p": sprite.period,
                  animationDuration: `${planet.spin}s`,
                  animationTimingFunction: `steps(${sprite.period})`,
                })}
              >
                <Sprite paths={sprite.strip} />
              </g>
            </g>
            <Sprite paths={sprite.lighting} />
            <Sprite paths={sprite.ringFront} />
          </svg>
          {moons.map((moon) => (
            <Moonlet key={moon.period} moon={moon} side="front" />
          ))}
        </span>
      }
    >
      <ProjectDetails project={project} withImages />
    </Hotspot>
  );
}

/** Every project that has an entry in data/planets.ts, as a planet in the sky. */
export default function Planets() {
  return (
    <>
      {projects.map((project) => {
        const placement = planets[project.id];
        return placement ? <Planet key={project.id} project={project} placement={placement} /> : null;
      })}
    </>
  );
}
