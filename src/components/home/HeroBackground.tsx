"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Base fill ── */}
      <div className="absolute inset-0 bg-[#04040c]" />

      {/* ── Dot-grid texture ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.052) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Radial vignette — fades dot-grid at edges ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, #04040c 85%)",
        }}
      />

      {/* ── Orb 1: warm gold — top-right ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 780,
          height: 780,
          top: -260,
          right: -180,
          background:
            "radial-gradient(circle at 40% 40%, rgba(212,146,12,0.22) 0%, rgba(212,146,12,0.06) 45%, transparent 70%)",
          filter: "blur(48px)",
          willChange: "transform, opacity",
        }}
        animate={{
          x: [0, 44, -18, 0],
          y: [0, -36, 26, 0],
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.7, 0.95, 0.6, 0.7],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 1],
        }}
      />

      {/* ── Orb 2: deep indigo — bottom-left ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          bottom: -200,
          left: -200,
          background:
            "radial-gradient(circle at 55% 55%, rgba(72,52,200,0.16) 0%, rgba(50,30,160,0.06) 45%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
        animate={{
          x: [0, -32, 28, 0],
          y: [0, 28, -22, 0],
          scale: [1, 0.94, 1.08, 1],
          opacity: [0.55, 0.8, 0.45, 0.55],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
          times: [0, 0.45, 0.75, 1],
        }}
      />

      {/* ── Orb 3: diffuse gold — center breathing pulse ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          top: "38%",
          left: "42%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,146,12,0.09) 0%, transparent 65%)",
          filter: "blur(70px)",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.22, 0.88, 1],
          opacity: [0.45, 0.72, 0.32, 0.45],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
          times: [0, 0.45, 0.75, 1],
        }}
      />

      {/* ── Orb 4: slim teal accent — mid-right ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "55%",
          right: -120,
          background:
            "radial-gradient(circle, rgba(20,160,140,0.08) 0%, transparent 65%)",
          filter: "blur(56px)",
          willChange: "transform",
        }}
        animate={{
          y: [0, -24, 20, 0],
          opacity: [0.35, 0.55, 0.25, 0.35],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 9,
        }}
      />

      {/* ── Horizontal separator gradient line ── */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "18%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.035) 20%, rgba(212,146,12,0.12) 50%, rgba(255,255,255,0.035) 80%, transparent 100%)",
        }}
      />

      {/* ── Top gradient edge — blends with navbar ── */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 140,
          background: "linear-gradient(to bottom, #04040c 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom gradient edge — blends into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 160,
          background: "linear-gradient(to top, #04040c 0%, transparent 100%)",
        }}
      />

      {/* ── Subtle noise texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
