"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Optional stellar cursor — hidden on touch devices */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-screen"
      animate={{
        x: pos.x - 6,
        y: pos.y - 6,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
    >
      <div className="w-3 h-3 rounded-full bg-stellar-cyan shadow-glow" />
      <div className="absolute inset-0 -m-3 rounded-full border border-stellar-cyan/30 w-9 h-9" />
    </motion.div>
  );
}
