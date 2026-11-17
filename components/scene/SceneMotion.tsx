"use client";

import { useEffect } from "react";

/**
 * Drives the parts of the scene CSS cannot do alone:
 *  - parallax: offsets every [data-depth] layer by pointer and scroll,
 *    snapped to whole sprite pixels so nothing lands between pixels;
 *  - pausing: stops CSS animations while the tab is hidden or the scene is
 *    scrolled out of view;
 *  - arrow keys: move focus between the moon and the planets.
 * Renders nothing. With prefers-reduced-motion it leaves the scene still.
 */
export default function SceneMotion() {
  useEffect(() => {
    const scene = document.getElementById("scene");
    if (!scene) return;
    const root = document.documentElement;

    const onVisibility = () => {
      if (document.hidden) root.dataset.paused = "";
      else delete root.dataset.paused;
    };
    document.addEventListener("visibilitychange", onVisibility);

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        scene.removeAttribute("data-offscreen");
        // Scroll events were ignored while off screen, so catch the layers up.
        schedule();
      } else {
        scene.setAttribute("data-offscreen", "");
      }
    });
    io.observe(scene);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const layers = Array.from(scene.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
      el,
      depth: Number(el.dataset.depth),
      scroll: Number(el.dataset.scroll ?? 0),
      lockY: el.dataset.lockY !== undefined,
    }));

    let px = 4;
    const readPx = () => {
      px = parseFloat(getComputedStyle(root).getPropertyValue("--px")) || 4;
    };
    readPx();

    // Pointer position in -1..1, eased toward its target each frame.
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      const scrollY = window.scrollY;
      for (const layer of layers) {
        const dx = Math.round(-x * layer.depth) * px;
        const dy = layer.lockY
          ? 0
          : Math.round(-y * layer.depth * 0.5) * px +
            Math.round((scrollY * layer.scroll) / px) * px;
        layer.el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
      if (Math.abs(targetX - x) > 0.002 || Math.abs(targetY - y) > 0.002) schedule();
    };
    const schedule = () => {
      if (!frame && onScreen && !reduced.matches) frame = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      if (!finePointer.matches) return;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };
    const onResize = () => {
      readPx();
      schedule();
    };

    // With a hotspot focused, the arrow keys step through the others.
    const onKey = (e: KeyboardEvent) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      const current = document.activeElement;
      if (!step || !(current instanceof HTMLElement) || !current.matches(".hotspot")) return;
      const spots = Array.from(scene.querySelectorAll<HTMLElement>(".hotspot"));
      const next = spots[(spots.indexOf(current) + step + spots.length) % spots.length];
      e.preventDefault();
      next.focus();
    };
    scene.addEventListener("keydown", onKey);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    schedule();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      scene.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
