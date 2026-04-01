"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { HeroBackground } from "./HeroBackground";
import { FloatingCards } from "./FloatingCards";

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ─── Sub-components ─────────────────────────────────────── */

function HeroHeadline() {
  const t = useTranslations("hero.title");

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-0">
      {/* Line 1 */}
      <h1 className="font-extrabold leading-[1.04] tracking-[-0.035em]">
        <span className="block text-[46px] sm:text-[58px] lg:text-[68px] xl:text-[78px] text-white">
          {t("line1")}
        </span>
        {/* Line 2 — lighter weight for contrast */}
        <span className="block text-[46px] sm:text-[58px] lg:text-[68px] xl:text-[78px] text-white/48 font-light">
          {t("line2")}
        </span>
        {/* Line 3 — gold gradient highlight */}
        <span
          className="block text-[46px] sm:text-[58px] lg:text-[68px] xl:text-[78px]"
          style={{
            background:
              "linear-gradient(135deg, #ff9933 0%, #ff9933 32%, #ff9933 68%, #ff9933 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("line3")}
        </span>
      </h1>
    </motion.div>
  );
}

function HeroSubcopy() {
  const t = useTranslations("hero");

  return (
    <motion.p
      variants={itemVariants}
      className="text-[16.5px] sm:text-[17.5px] lg:text-[18px] leading-[1.75] text-white/52 max-w-130 text-pretty"
    >
      {t.rich("subtitle", {
        nbfc: (chunks) => (
          <span className="text-[#8eb8ff] font-medium">{chunks}</span>
        ),
        msme: (chunks) => (
          <span className="text-[#4ed56f] font-semibold">{chunks}</span>
        ),
      })}
    </motion.p>
  );
}

function HeroCTAs() {
  const t = useTranslations("hero");

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pt-1"
    >
      {/* Primary CTA */}
      <motion.a
        href="/contact"
        className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[15px] text-[#080602] overflow-hidden select-none cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #f5bc35 0%, #d4920c 100%)",
        }}
        aria-label={t("cta_primary_aria")}
        whileHover={{
          scale: 1.04,
          y: -2,
          transition: { type: "spring", stiffness: 420, damping: 20 },
        }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Shimmer layer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% center", "200% center"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
        {/* Glow beneath */}
        <motion.div
          className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{ background: "rgba(212,146,12,0.5)" }}
        />
        <span className="relative z-10">{t("cta_primary")}</span>
        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.a>

      {/* Secondary CTA */}
      <motion.a
        href="#demo"
        className="group flex items-center gap-2.5 px-6 py-3.25 rounded-full border border-white/12 text-white/65 font-medium text-[15px] transition-all duration-300 hover:border-white/22 hover:text-white hover:bg-white/4 cursor-pointer select-none"
        aria-label={t("cta_secondary_aria")}
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 420, damping: 20 },
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Play icon circle */}
        <div className="w-6.5 h-6.5 rounded-full border border-white/16 flex items-center justify-center group-hover:border-white/30 transition-colors duration-200 shrink-0">
          <Play className="w-2.25 h-2.25 fill-white/65 text-white/65 group-hover:fill-white group-hover:text-white transition-colors duration-200 ml-px" />
        </div>
        {t("cta_secondary")}
      </motion.a>
    </motion.div>
  );
}

/* ─── Decorative gradient lines behind hero content ─────── */
function HeroGlowLines() {
  return (
    <div
      className="absolute pointer-events-none select-none"
      aria-hidden="true"
      style={{
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1px",
        height: "62%",
        background:
          "linear-gradient(to bottom, transparent 0%, rgba(212,146,12,0.14) 25%, rgba(19,136,8,0.12) 62%, transparent 100%)",
      }}
    />
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on hero content
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col overflow-hidden"
      aria-label={t("aria_label")}
    >
      {/* Layered background */}
      <HeroBackground />

      {/* Decorative vertical glow line */}
      <HeroGlowLines />

      {/* ── Main content area ── */}
      <motion.div
        className="relative z-10 mb-10 flex-1 flex items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 pb-10 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.82fr] items-center gap-10 lg:gap-4 xl:gap-0">
            {/* ── Left column: copy ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 lg:gap-7 max-w-170"
            >
              <HeroHeadline />
              <HeroSubcopy />
              <HeroCTAs />
            </motion.div>

            {/* ── Right column: floating cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="hidden lg:block relative h-130 xl:h-140"
            >
              <FloatingCards />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
