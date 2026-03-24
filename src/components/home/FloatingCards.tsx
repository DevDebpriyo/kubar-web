"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Zap, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

/* ─────────────────────────────────────────────────
   Card 1 · Loan Approval notification
───────────────────────────────────────────────── */
function LoanApprovalCard() {
  const t = useTranslations("cards.loan_approval");

  return (
    <div className="absolute top-2 right-0 z-20 w-52">
      {/* Float layer */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        {/* Entrance + hover layer */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.025,
            y: -3,
            transition: { type: "spring", stiffness: 380, damping: 22 },
          }}
          className="glass-card p-4 cursor-default"
        >
          {/* Top row */}
          <div className="flex items-start gap-2.5 mb-3.5">
            <div className="w-7 h-7 rounded-full bg-green-500/12 border border-green-500/25 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] text-white/45 font-medium uppercase tracking-[0.08em] mb-0.5">
                {t("label")}
              </div>
              <div className="text-white font-black text-[18px] tracking-[-0.03em] leading-none stat-value">
                {t("amount")}
              </div>
            </div>
          </div>

          {/* Processing time */}
          <div className="flex items-center justify-between text-[11px] mb-2.5">
            <span className="text-white/40">{t("processing_label")}</span>
            <span className="text-green-400 font-semibold">
              {t("processing_time")}
            </span>
          </div>

          {/* Match score bar */}
          <div>
            <div className="flex justify-between text-[10.5px] mb-1.5">
              <span className="text-white/38">{t("match_label")}</span>
              <span className="font-semibold" style={{ color: "#f0b429" }}>
                {t("match_value")}
              </span>
            </div>
            <div className="h-0.75 bg-white/6.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #f5bc35, #d4920c)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "87%" }}
                transition={{
                  duration: 1.4,
                  delay: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Card 2 · Credit Intelligence  (featured / gold)
───────────────────────────────────────────────── */
function CreditIntelligenceCard() {
  const t = useTranslations("cards.credit");
  const bars = [42, 68, 52, 84, 63, 92, 71];

  return (
    <div className="absolute top-23.5 left-0 z-10 w-67">
      {/* Float layer */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        style={{ willChange: "transform" }}
      >
        {/* Entrance + hover layer */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.02,
            y: -3,
            transition: { type: "spring", stiffness: 340, damping: 24 },
          }}
          className="glass-card-gold p-5 cursor-default"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[10.5px] text-white/40 font-medium uppercase tracking-[0.08em] mb-1">
                {t("header")}
              </div>
              <div className="text-white font-semibold text-[13.5px] leading-tight">
                {t("msme_name")}
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#d4920c]/14 border border-[#d4920c]/28 flex items-center justify-center shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-[#f0b429]" />
            </div>
          </div>

          {/* Score row */}
          <div className="flex items-end gap-2.5 mb-3.5">
            <div>
              <div className="text-white/38 text-[10.5px] mb-0.5">
                {t("score_label")}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[32px] font-black tracking-[-0.04em] leading-none stat-value"
                style={{ color: "#f0b429" }}
              >
                {t("score")}
              </motion.div>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-0.5 text-[11px] font-semibold text-green-400">
                <ArrowUpRight className="w-3 h-3" />
                <span>{t("change")}</span>
              </div>
              <div className="text-[10px] text-white/28 mt-0.5">
                {t("change_period")}
              </div>
            </div>
          </div>

          {/* Animated bar chart */}
          <div className="flex items-end gap-0.75 h-9 mb-3.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-0.75 origin-bottom"
                style={{
                  height: `${(h / 100) * 36}px`,
                  background:
                    i === 5
                      ? "linear-gradient(180deg, #f5bc35 0%, #d4920c 100%)"
                      : "rgba(255,255,255,0.1)",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  delay: 1.3 + i * 0.07,
                  duration: 0.45,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6 mb-3" />

          {/* Best rate */}
          <div className="flex items-center justify-between">
            <span className="text-white/38 text-[11px]">
              {t("rate_label")}
            </span>
            <span
              className="text-[13px] font-bold tracking-[-0.01em]"
              style={{ color: "#f0b429" }}
            >
              {t("rate")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Card 3 · NBFC Network status
───────────────────────────────────────────────── */
function NBFCNetworkCard() {
  const t = useTranslations("cards.nbfc");
  const lenders = [
    { name: t("lender_1_name"), amount: t("lender_1_amount"), dot: "#d4920c" },
    { name: t("lender_2_name"), amount: t("lender_2_amount"), dot: "#3b82f6" },
  ];

  return (
    <div className="absolute bottom-8 right-2 z-15 w-57">
      {/* Float layer */}
      <motion.div
        animate={{ y: [0, -11, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.2,
        }}
        style={{ willChange: "transform" }}
      >
        {/* Entrance + hover layer */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.025,
            y: -3,
            transition: { type: "spring", stiffness: 380, damping: 22 },
          }}
          className="glass-card p-4 cursor-default"
        >
          {/* Status row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* Pulsing dot */}
              <div className="relative w-4 h-4 flex items-center justify-center">
                <motion.div
                  className="absolute w-4 h-4 rounded-full bg-green-500/20"
                  animate={{
                    scale: [1, 1.9, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-white font-semibold text-[13px]">
                {t("status")}
              </span>
            </div>
            <Zap className="w-3.5 h-3.5 text-[#f0b429]" />
          </div>

          {/* Lender list */}
          <div className="flex flex-col gap-2">
            {lenders.map((l, i) => (
              <motion.div
                key={l.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.55 + i * 0.1,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: l.dot }}
                  />
                  <span className="text-white/55 text-[11.5px]">{l.name}</span>
                </div>
                <span className="text-white/80 text-[11.5px] font-medium">
                  {l.amount}
                </span>
              </motion.div>
            ))}
            {/* More hint */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />
              <span className="text-white/25 text-[11px]">{t("more")}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────── */
export function FloatingCards() {
  return (
    <div className="relative w-full h-full">
      {/* Hex-grid decorative background */}
      <div
        className="absolute inset-0 rounded-2xl opacity-28"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='48' viewBox='0 0 56 48'%3E%3Cpath d='M0 24L14 0h28L56 24L42 48H14Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.7'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 48px",
        }}
      />

      {/* Decorative SVG connector lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4920c" stopOpacity="0" />
            <stop offset="50%" stopColor="#d4920c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4920c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Card 1 ↔ Card 2 connector */}
        <line
          x1="62%"
          y1="22%"
          x2="57%"
          y2="42%"
          stroke="url(#cg1)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="line-flow"
          style={{ animationDelay: "0.4s" }}
        />
        {/* Card 2 ↔ Card 3 connector */}
        <line
          x1="52%"
          y1="60%"
          x2="68%"
          y2="78%"
          stroke="url(#cg2)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="line-flow"
          style={{ animationDelay: "1.2s" }}
        />
      </svg>

      {/* Cards — render order: back to front */}
      <CreditIntelligenceCard />
      <LoanApprovalCard />
      <NBFCNetworkCard />

      {/* Ambient glow beneath cards */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260,
          height: 260,
          top: "44%",
          left: "38%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(212,146,12,0.07) 0%, transparent 70%)",
          filter: "blur(34px)",
        }}
      />
    </div>
  );
}
