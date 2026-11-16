"use client";

import { useEffect, useState } from "react";
import { cvHref, navLinks } from "@/lib/utils";

/** Fixed heads-up bar: brand, section links and the CV button. */
export default function HudNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-u2">
      <a
        href="#about"
        className="px-btn sr-only focus:not-sr-only focus:absolute focus:left-u4 focus:top-u4 focus:z-10"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className="px-box mx-auto flex max-w-6xl items-center justify-between gap-u4 px-u4 py-u2"
      >
        <a href="#scene" className="label text-cream py-u2">
          marcelo<span className="text-amber">.</span>space
        </a>

        <ul className="hidden items-center gap-u6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-term text-mist hover:text-amber py-u2 text-xl uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-u2">
          <a href={cvHref} download className="px-btn !min-h-0 !py-u2">
            CV
          </a>
          <button
            type="button"
            className="px-btn px-btn-ghost !min-h-0 !py-u2 md:hidden"
            aria-expanded={open}
            aria-controls="hud-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="hud-menu" className="px-box mx-auto mt-u2 max-w-6xl p-u2 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-term text-cream hover:bg-night-700 block px-u4 py-u3 text-2xl uppercase"
              >
                <span className="text-amber" aria-hidden>
                  &gt;{" "}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
