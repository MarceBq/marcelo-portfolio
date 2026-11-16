import Ground from "./Ground";
import Moon from "./Moon";
import Planets from "./Planets";
import Sky from "./Sky";
import SceneMotion from "./SceneMotion";

const roles = ["Full Stack Developer", "AI Engineer", "Problem Solver", "Builder"];

/** The opening scene: sky, title, moon, one planet per project, and Marcelo on his hill. */
export default function Scene() {
  return (
    <section id="scene" className="scene" aria-labelledby="scene-title">
      <Sky />
      <SceneMotion />

      {/* Title first in the DOM so it is read and focused before the sky. */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col px-5 pb-24 pt-24 lg:justify-center">
        <div className="pointer-events-auto max-w-md">
        <p className="font-term text-xl text-mist flex items-center gap-u2">
          <span className="blink inline-block h-u2 w-u2 bg-teal" aria-hidden />
          Lima, PE · Open to work
        </p>

        <h1
          id="scene-title"
          className="title-shadow font-pixel text-cream mt-u4 text-[calc(var(--px)*12)] leading-none sm:text-[calc(var(--px)*16)]"
        >
          Marcelo
        </h1>

        {/* One role at a time on screen; the full list is read out once. */}
        <p className="font-term text-amber relative mt-u4 h-8 text-[1.75rem] leading-8">
          <span className="sr-only">{roles.join(", ")}</span>
          <span aria-hidden>
            {roles.map((role, i) => (
              <span
                key={role}
                className="role absolute left-0 top-0 whitespace-nowrap"
                style={{ animationDelay: `${i * 3}s` }}
              >
                &gt; {role}
              </span>
            ))}
          </span>
        </p>

        <p className="text-cream mt-u4 max-w-md text-lg leading-relaxed">
          Building real solutions with code and AI — from Lima to the universe.
        </p>

        <div className="mt-u6 flex flex-wrap gap-u3">
          <a href="#projects" className="px-btn">
            Explore Projects
          </a>
          <a href="#contact" className="px-btn px-btn-ghost">
            Get in Touch
          </a>
        </div>

        <p className="font-term text-mist mt-u4 text-xl leading-tight">
          <span className="text-amber" aria-hidden>
            *{" "}
          </span>
          Every planet is a project. The moon is me.
        </p>
        </div>
      </div>

      {/* The moon and the project planets share one layer. */}
      <div className="layer" data-depth="5">
        <div className="layer-frame">
          <Moon />
          <Planets />
        </div>
      </div>

      <Ground />

      <a
        href="#about"
        className="label text-cream hover:text-amber absolute bottom-u2 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-u2 p-u2"
      >
        Scroll
        <svg className="bob" width="20" height="12" viewBox="0 0 5 3" aria-hidden>
          <path fill="currentColor" d="M0 0h5v1h-1v1h-1v1h-1v-1h-1v-1h-1z" />
        </svg>
      </a>
    </section>
  );
}
