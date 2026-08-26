"use client";

import { m } from "framer-motion";
import {
  Shield,
  Building2,
  ArrowUpRight,
  Link2,
} from "lucide-react";

/* ─────────────────────────────────────────────────
   Shared animation easing
───────────────────────────────────────────────── */
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────
   Pulsing Node — small glowing dot with rings
───────────────────────────────────────────────── */
function PulsingNode({
  cx,
  cy,
  color,
  delay = 0,
  size = 4,
}: {
  cx: number;
  cy: number;
  color: string;
  delay?: number;
  size?: number;
}) {
  return (
    <g>
      {/* Outer ring pulse */}
      <m.circle
        cx={cx}
        cy={cy}
        r={size * 2.5}
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.4, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Core dot */}
      <m.circle
        cx={cx}
        cy={cy}
        r={size}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.3,
        }}
      />
      {/* Glow */}
      <circle cx={cx} cy={cy} r={size * 3} fill={color} opacity={0.08} />
    </g>
  );
}

/* ─────────────────────────────────────────────────
   Animated Data Flow Path
───────────────────────────────────────────────── */
function DataFlowPath({
  d,
  color,
  delay = 0,
  duration = 4,
}: {
  d: string;
  color: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <g>
      {/* Background path */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1}
        opacity={0.12}
        strokeDasharray="4 8"
      />
      {/* Animated flow */}
      <m.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </g>
  );
}

/* ─────────────────────────────────────────────────
   Central Hub — the core infrastructure node
───────────────────────────────────────────────── */
function CentralHub() {
  return (
    <m.div
      className="absolute z-20"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: smoothEase }}
    >
      {/* Rotating ring */}
      <m.div
        className="absolute inset-0 -m-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full border border-dashed"
          style={{ borderColor: "rgba(212, 146, 12, 0.2)" }}
        />
      </m.div>

      {/* Counter-rotating ring */}
      <m.div
        className="absolute inset-0 -m-12"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{ borderColor: "rgba(255, 255, 255, 0.04)" }}
        />
      </m.div>

      {/* Hub body */}
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center relative"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,146,12,0.2) 0%, rgba(212,146,12,0.05) 100%)",
          border: "1px solid rgba(212,146,12,0.3)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 40px rgba(212,146,12,0.15)",
        }}
      >
        <Link2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#f0b429]" />

        {/* Breathing glow */}
        <m.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(212,146,12,0.1)",
              "0 0 40px rgba(212,146,12,0.25)",
              "0 0 20px rgba(212,146,12,0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </m.div>
  );
}

/* ─────────────────────────────────────────────────
   Platform Card — floating glassmorphic data card
───────────────────────────────────────────────── */
function PlatformCard({
  label,
  value,
  icon: Icon,
  color,
  position,
  delay,
  floatDuration,
  floatOffset,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay: number;
  floatDuration: number;
  floatOffset: number;
}) {
  return (
    <div className="absolute z-30" style={position}>
      <m.div
        animate={{ y: [0, floatOffset, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
      >
        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay, ease: smoothEase }}
          className="relative group cursor-default"
          whileHover={{
            scale: 1.04,
            y: -3,
            transition: { type: "spring", stiffness: 400, damping: 22 },
          }}
        >
          <div
            className="px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${color}25`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            {/* Top row */}
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${color}14`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color }}
                />
              </div>
              <span className="text-[10px] sm:text-[10.5px] text-white/40 font-medium uppercase tracking-[0.08em]">
                {label}
              </span>
            </div>

            {/* Value */}
            <div
              className="text-base sm:text-lg font-bold tracking-tight leading-none"
              style={{ color }}
            >
              {value}
            </div>

            {/* Status dot */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <m.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22c55e" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-[9px] sm:text-[10px] text-white/30 font-medium">
                Illustrative
              </span>
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Stats Mini-Card — small floating stat element
───────────────────────────────────────────────── */
function StatsMiniCard({
  label,
  value,
  change,
  position,
  delay,
  floatDuration,
  floatOffset,
}: {
  label: string;
  value: string;
  change: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay: number;
  floatDuration: number;
  floatOffset: number;
}) {
  return (
    <div className="absolute z-30" style={position}>
      <m.div
        animate={{ y: [0, floatOffset, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay, ease: smoothEase }}
          className="cursor-default"
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 22 },
          }}
        >
          <div
            className="px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl backdrop-blur-xl"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <div className="text-[9px] sm:text-[10px] text-white/35 font-medium uppercase tracking-[0.08em] mb-1.5">
              {label}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-white font-bold text-sm sm:text-base tracking-tight leading-none">
                {value}
              </span>
              <span className="text-green-400 text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5 pb-px">
                <ArrowUpRight className="w-2.5 h-2.5" />
                {change}
              </span>
            </div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Hex Grid Background Pattern
───────────────────────────────────────────────── */
function HexGridBg() {
  return (
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='48' viewBox='0 0 56 48'%3E%3Cpath d='M0 24L14 0h28L56 24L42 48H14Z' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='0.7'/%3E%3C/svg%3E")`,
        backgroundSize: "56px 48px",
        opacity: 0.5,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────
   Network SVG Layer — connection paths + nodes
───────────────────────────────────────────────── */
function NetworkLayer() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Gold gradient */}
        <linearGradient id="aboutGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4920c" stopOpacity="0" />
          <stop offset="50%" stopColor="#d4920c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4920c" stopOpacity="0" />
        </linearGradient>
        {/* Blue gradient */}
        <linearGradient id="aboutBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        {/* Green gradient */}
        <linearGradient id="aboutGreen" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
          <stop offset="50%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Flow paths connecting the cards ── */}
      {/* Top-left → Center */}
      <DataFlowPath
        d="M 120 120 C 200 120 220 230 300 250"
        color="#d4920c"
        delay={0}
        duration={5}
      />
      {/* Top-right → Center */}
      <DataFlowPath
        d="M 480 100 C 420 140 360 200 300 250"
        color="#3b82f6"
        delay={1.5}
        duration={4.5}
      />
      {/* Bottom-left → Center */}
      <DataFlowPath
        d="M 100 400 C 160 380 220 310 300 250"
        color="#22c55e"
        delay={0.8}
        duration={5.5}
      />
      {/* Bottom-right → Center */}
      <DataFlowPath
        d="M 500 380 C 440 340 360 290 300 250"
        color="#d4920c"
        delay={2.2}
        duration={4}
      />
      {/* Center → Right mid */}
      <DataFlowPath
        d="M 300 250 C 380 230 420 180 500 200"
        color="#3b82f6"
        delay={3}
        duration={5}
      />

      {/* ── Junction nodes ── */}
      <PulsingNode cx={300} cy={250} color="#f0b429" size={5} delay={0} />
      <PulsingNode cx={120} cy={120} color="#d4920c" size={3} delay={0.5} />
      <PulsingNode cx={480} cy={100} color="#3b82f6" size={3} delay={1} />
      <PulsingNode cx={100} cy={400} color="#22c55e" size={3} delay={1.5} />
      <PulsingNode cx={500} cy={380} color="#d4920c" size={3} delay={2} />
      <PulsingNode cx={500} cy={200} color="#3b82f6" size={3} delay={2.5} />

      {/* Small decorative nodes */}
      <PulsingNode cx={200} cy={180} color="rgba(255,255,255,0.3)" size={1.5} delay={3} />
      <PulsingNode cx={400} cy={300} color="rgba(255,255,255,0.3)" size={1.5} delay={3.5} />
      <PulsingNode cx={250} cy={350} color="rgba(212,146,12,0.4)" size={1.5} delay={4} />
      <PulsingNode cx={380} cy={150} color="rgba(59,130,246,0.4)" size={1.5} delay={4.5} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────
   Main Export — About Hero Illustration
───────────────────────────────────────────────── */
export function AboutHeroIllustration() {
  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] xl:h-[540px]">
      {/* Hex grid background */}
      <HexGridBg />

      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,146,12,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          top: "25%",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Network connection paths */}
      <NetworkLayer />

      {/* Central hub */}
      <CentralHub />

      {/* ── Floating Glass Cards ── */}

      {/* Top-left: NBFC Partners */}
      <PlatformCard
        label="Lender Network"
        value="Multi-Lender"
        icon={Building2}
        color="#d4920c"
        position={{ top: "6%", left: "2%" }}
        delay={0.6}
        floatDuration={6}
        floatOffset={-10}
      />

      {/* Top-right: Trust Score */}
      <PlatformCard
        label="Pre-Qualification"
        value="Lender-Configured"
        icon={Shield}
        color="#3b82f6"
        position={{ top: "2%", right: "4%" }}
        delay={0.9}
        floatDuration={7}
        floatOffset={8}
      />

      {/* Bottom-left: Disbursals */}
      <StatsMiniCard
        label="Initial Launch"
        value="15–20 Loans"
        change="Target"
        position={{ bottom: "12%", left: "0%" }}
        delay={1.2}
        floatDuration={5.5}
        floatOffset={-8}
      />

      {/* Mid-right: Success Rate */}
      <StatsMiniCard
        label="SDK Integrations"
        value="In Discussion"
        change="Phase 2"
        position={{ top: "42%", right: "-2%" }}
        delay={1.4}
        floatDuration={5}
        floatOffset={-6}
      />

      {/* ── Decorative particle ring ── */}
      <m.div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: 280,
          height: 280,
          marginTop: -140,
          marginLeft: -140,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <m.div
            key={angle}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(140px) translateY(-50%)`,
            }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: angle / 120,
            }}
          />
        ))}
      </m.div>
    </div>
  );
}
