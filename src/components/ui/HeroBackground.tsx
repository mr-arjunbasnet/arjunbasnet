"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function HeroBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C8C2BA 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Gradient fade — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      {/* Decorative ring — top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-border"
        style={{
          x: useSpring(
            useMotionValue(0),
            { stiffness: 20, damping: 15 }
          ),
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      />

      {/* Inner ring — top right */}
      <motion.div
        className="absolute -top-16 -right-16 w-[320px] h-[320px] rounded-full border border-border/60"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      />

      {/* Floating ring — bottom left */}
      <motion.div
        className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-border/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      />

      {/* Parallax accent shape — follows mouse subtly */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary opacity-60"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-primary opacity-40"
        style={{
          x: useSpring(mouseX, { stiffness: 15, damping: 20 }),
          y: useSpring(mouseY, { stiffness: 15, damping: 20 }),
        }}
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
