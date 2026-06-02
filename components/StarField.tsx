"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
}

/** Animated deep-space star field with parallax depth */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let animId = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(220, Math.floor((w * h) / 5000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * w,
        r: Math.random() * 1.4 + 0.3,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / w;
      mouseY = e.clientY / h;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(3, 2, 10, 0.25)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2 + (mouseX - 0.5) * 30;
      const cy = h / 2 + (mouseY - 0.5) * 30;

      stars.forEach((star) => {
        star.z -= 0.4;
        if (star.z <= 0) {
          star.z = w;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }

        const k = 128 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;
        const pr = star.r * k * 0.5;

        if (px < 0 || px >= w || py < 0 || py >= h) return;

        const alpha = Math.min(1, (1 - star.z / w) * 1.2);
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${alpha * 0.85})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
