import type { CSSProperties } from "react";
import { socials } from "@/data/contact";
import { moonSprite } from "@/lib/sprites";
import { cvHref } from "@/lib/utils";
import AboutIntro from "../AboutIntro";
import Hotspot from "./Hotspot";
import Sprite from "./Sprite";

const moon = moonSprite();

/** The moon is the way in to "about me" and contact. */
export default function Moon() {
  return (
    <Hotspot
      name="About me"
      title="The Moon — about me"
      className="moon"
      sprite={
        <svg
          viewBox={`0 0 ${moon.size} ${moon.size}`}
          className="sprite float"
          style={{ "--w": moon.size, "--h": moon.size } as CSSProperties}
          aria-hidden
        >
          <path className="halo" fill="currentColor" d={moon.halo} />
          <Sprite paths={moon.body} />
        </svg>
      }
    >
      <AboutIntro />

      <h3 className="label text-amber mt-u8">Contact</h3>
      <p className="text-mist mt-u3 leading-relaxed">
        Based in Lima, open to remote. Whether you&apos;re hiring, collaborating, or just want to
        talk tech — I&apos;d love to hear from you.
      </p>
      <ul className="mt-u3 flex flex-wrap gap-x-u6 gap-y-u2">
        {socials.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="px-link"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-u6 flex flex-wrap gap-u2">
        <a href="#contact" className="px-btn">
          Send a message
        </a>
        <a href={cvHref} download className="px-btn px-btn-ghost">
          Download CV
        </a>
      </p>
    </Hotspot>
  );
}
