import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function BackgroundFX() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Silky-smooth spring physics for 3D depth lag
  const springConfig = { damping: 50, stiffness: 120, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary Emerald Singularity / Blackhole Core */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-[120px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Secondary Ambient Depth Glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-emerald-400/10 blur-[80px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Deep Space Vignette Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(3,7,18,0))] pointer-events-none" />
    </div>
  );
}