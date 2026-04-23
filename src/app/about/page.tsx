"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Target,
  Compass,
  Zap,
  Shield,
  Globe,
  Award,
  Briefcase,
  Plus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { RoadmapSection } from "@/components/about/RoadmapSection";
import "./about.css";

/* ── Components ─────────────────────────────────────────────── */
function FadeInView({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const cards = [
    {
      icon: Zap,
      color: {
        border: "rgba(212, 146, 12, 0.3)",
        bg: "rgba(212, 146, 12, 0.1)",
        hoverBorder: "rgba(212, 146, 12, 0.8)",
        hoverBg: "rgba(212, 146, 12, 0.2)",
        text: "#d4920c",
      },
    },
    {
      icon: Shield,
      color: {
        border: "rgba(59, 130, 246, 0.3)",
        bg: "rgba(59, 130, 246, 0.1)",
        hoverBorder: "rgba(59, 130, 246, 0.8)",
        hoverBg: "rgba(59, 130, 246, 0.2)",
        text: "#3b82f6",
      },
    },
    {
      icon: Globe,
      color: {
        border: "rgba(34, 197, 94, 0.3)",
        bg: "rgba(34, 197, 94, 0.1)",
        hoverBorder: "rgba(34, 197, 94, 0.8)",
        hoverBg: "rgba(34, 197, 94, 0.2)",
        text: "#22c55e",
      },
    },
  ];

  return (
    <main className="relative">
      <Navbar />
      <div className="about-page-container">
        {/* ── Background Overlays ─────────────────────────────── */}
        <div className="fixed inset-0 pointer-events-none noise-overlay opacity-30 z-0"></div>
        <div className="fixed inset-0 pointer-events-none hex-bg-dark opacity-15 z-0 delay-[50ms]"></div>

        {/* ── Hero Section ──────────────────────────────────────── */}
        <section ref={heroRef} className="about-hero">
          <div className="about-hero-bg"></div>

          <motion.div
            className="about-section-container px-6 sm:px-10 lg:px-12"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="flex flex-col items-start gap-5 max-w-4xl pt-8 sm:pt-10 lg:pt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="about-badge"
              >
                <Compass className="w-4 h-4" />
                {t("hero.badge")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[46px] sm:text-[62px] lg:text-[78px] font-extrabold leading-[1.05] tracking-tight text-white mb-2 flex items-center gap-4"
              >
                <img
                  src="/logo.png"
                  alt="Kubar Labs"
                  className="h-[60px] sm:h-[80px] lg:h-[100px] w-auto"
                />
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl sm:text-3xl lg:text-4xl text-[#d4920c] font-bold leading-snug max-w-3xl mt-2 mb-4 text-pretty"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-lg sm:text-xl lg:text-2xl text-white/70 font-medium leading-relaxed max-w-3xl mt-2 mb-4 text-pretty"
              >
                {t("hero.intro")}
              </motion.p>
            </div>
          </motion.div>

          {/* Hero glow lines */}
          <div
            className="absolute z-0 pointer-events-none select-none left-0 bottom-0 top-[20%] w-px bg-gradient-to-b from-transparent via-[rgba(212,146,12,0.15)] to-transparent"
            style={{ left: "10%" }}
          />
          <div
            className="absolute z-0 pointer-events-none select-none right-0 bottom-0 top-[15%] w-px bg-gradient-to-b from-transparent via-[rgba(212,146,12,0.15)] to-transparent"
            style={{ right: "10%" }}
          />
        </section>

        {/* ── Mission & Vision ──────────────────────────────────── */}
        <section className="about-section z-10">
          <div className="about-section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeInView>
                <div className="space-y-6 lg:pe-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                    <span className="gradient-text-gold">
                      {t("mission_vision.mission_label")}
                    </span>
                  </h2>
                  <div className="about-story-highlight">
                    <p>{t("mission_vision.mission_text")}</p>
                  </div>
                </div>

                <div className="mt-16 space-y-6 lg:pe-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                    <span className="gradient-text-gold">
                      {t("mission_vision.vision_label")}
                    </span>
                  </h2>
                  <div className="about-story-highlight border-l-[rgba(19,136,8,0.8)] bg-gradient-to-r from-[rgba(19,136,8,0.05)] to-transparent">
                    <p>{t("mission_vision.vision_text")}</p>
                  </div>
                </div>
              </FadeInView>

              {/* Glowing Decorative Element */}
              <FadeInView
                delay={0.2}
                className="relative hidden lg:flex items-center justify-center h-[500px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,146,12,0.15)] to-transparent rounded-full filter blur-[80px]"></div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative w-80 h-80 rounded-full border border-[rgba(212,146,12,0.25)] flex items-center justify-center p-4 bg-[rgba(10,10,20,0.5)] backdrop-blur-xl"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-[rgba(255,255,255,0.15)] flex items-center justify-center">
                    <Target className="w-16 h-16 text-[rgba(212,146,12,0.8)]" />
                  </div>
                </motion.div>

                {/* Orbital elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#d4920c] rounded-full shadow-[0_0_15px_#d4920c] transform -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              </FadeInView>
            </div>
          </div>
          <div className="relative mt-6 h-4 sm:mt-7 -mb-16">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-white/24 to-transparent" />
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{ scale: [1, 1.14, 1], opacity: [0.75, 1, 0.75] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "rgba(19,136,8,0.82)",
                boxShadow: "0 0 14px rgba(19,136,8,0.55)",
              }}
            />
          </div>
        </section>

        {/* ── Why We Exist ──────────────────────────────────────── */}
        <section className="about-section z-10 bg-[rgba(10,10,15,0.4)] relative overflow-hidden">
          <div className="about-section-container">
            <FadeInView className="about-section-header">
              <h2 className="about-section-title">{t("why_we_exist.title")}</h2>
            </FadeInView>

            {/* Rotating halo */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[rgba(212,146,12,0.08)] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </motion.div>

            <FadeInView
              delay={0.2}
              className="about-story-block text-left mt-12 bg-[rgba(255,255,255,0.02)] p-8 sm:p-12 rounded-3xl border border-[rgba(255,255,255,0.05)] backdrop-blur-sm space-y-6"
            >
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t("why_we_exist.p1")}
              </motion.p>
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("why_we_exist.p2")}
              </motion.p>
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t("why_we_exist.p3")}
              </motion.p>
              <motion.p
                className="text-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t("why_we_exist.p4")}
              </motion.p>
              <div className="mt-8 pt-8 flex justify-center border-t border-[rgba(255,255,255,0.05)]">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#d4920c] to-transparent rounded-full shadow-[0_0_10px_#d4920c]" />
              </div>
            </FadeInView>
          </div>
        </section>

        {/* ── How We Work / Pillars ─────────────────────────────── */}
        <section className="about-section z-10">
          <div className="about-section-container w-full overflow-hidden">
            <FadeInView className="about-section-header">
              <div className="built-bg-gradient" aria-hidden="true" />
              <h2 className="about-section-title">{t("how_we_work.title")}</h2>
              <p className="about-section-subtitle mx-auto max-w-3xl text-balance">
                {t("how_we_work.subtitle")}
              </p>
            </FadeInView>

            <div className="about-feature-grid mt-12">
              {cards.map(({ icon: Icon, color }, i) => {
                const cardIndex = i + 1;
                return (
                  <FadeInView
                    key={cardIndex}
                    delay={0.1 * cardIndex}
                    className="about-feature-card group h-full justify-start"
                  >
                    <div className="about-feature-card-glow" />

                    <div className="relative z-10">
                      <div
                        className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center border transition-all duration-300"
                        style={{
                          borderColor: color.border,
                          background: color.bg,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = color.hoverBorder;
                          e.currentTarget.style.background = color.hoverBg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = color.border;
                          e.currentTarget.style.background = color.bg;
                        }}
                      >
                        <Icon
                          style={{ color: color.text }}
                          className="w-6 h-6"
                        />
                      </div>

                      <h3 className="about-feature-title group-hover:text-white transition-colors duration-300">
                        {t(`how_we_work.pillars.${cardIndex}.title`)}
                      </h3>
                      <p className="mt-3 about-feature-desc group-hover:text-[rgba(255,255,255,0.9)] transition-colors duration-300 text-base leading-relaxed text-pretty">
                        {t(`how_we_work.pillars.${cardIndex}.desc`)}
                      </p>
                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Horizons ──────────────────────────────────────────── */}
        <section className="about-section z-10 bg-gradient-to-b from-[rgba(10,10,15,0.4)] to-transparent overflow-hidden object-cover relative">
          {/* Animated Radial lines background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-[rgba(212,146,12,0.6)] rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                style={{
                  width: `${(i + 1) * 20}vw`,
                  height: `${(i + 1) * 20}vw`,
                }}
              />
            ))}
          </div>

          <div className="about-section-container text-center w-full">
            <FadeInView className="about-section-header mb-16">
              <h2 className="about-section-title">{t("horizons.title")}</h2>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-8 max-w-5xl mx-auto">
              {[1, 2].map((i) => (
                <FadeInView
                  key={i}
                  delay={0.2 * i}
                  className="flex flex-col items-center"
                >
                  <div className="about-horizon-circle mb-8 shrink-0">
                    <div className="text-center p-6 relative z-10">
                      <div className="text-sm font-bold tracking-wider text-[rgba(19,136,8,0.8)] mb-2 uppercase">
                        {t(`horizons.items.${i}.label`)}
                      </div>
                      <div className="text-4xl font-light text-[rgba(212,146,12,0.8)] mb-3">
                        0{i}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {t(`horizons.items.${i}.title`)}
                      </h3>
                    </div>
                  </div>
                  <p className="about-feature-desc text-center max-w-[400px] text-[17px] leading-relaxed">
                    {t(`horizons.items.${i}.desc`)}
                  </p>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline / Roadmap ────────────────────────────────── */}
        <RoadmapSection />

        {/* ── Recognition / Traction ────────────────────────────── */}
        <section className="py-20 sm:py-32 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(5,5,10,0.8)] relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-[rgba(212,146,12,0.05)] blur-[100px] pointer-events-none rounded-[100%]" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {t("traction.title")}
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
                {t("traction.desc")}
              </p>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <FadeInView
                delay={0.2}
                className="bg-[rgba(255,255,255,0.02)] p-8 sm:p-12 rounded-3xl border border-[rgba(255,255,255,0.03)] backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold text-[#d4920c] mb-8">
                  {t("traction.recognitions_title")}
                </h3>
                <ul className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <li
                      key={i}
                      className="flex items-start text-white/80 text-lg"
                    >
                      <Award className="w-6 h-6 text-[#138808] mr-4 mt-0.5 shrink-0" />
                      <span>{t(`traction.recognitions.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </FadeInView>

              <FadeInView
                delay={0.4}
                className="bg-[rgba(255,255,255,0.02)] p-8 sm:p-12 rounded-3xl border border-[rgba(255,255,255,0.03)] backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold text-[#d4920c] mb-8">
                  {t("traction.partnerships_title")}
                </h3>
                <ul className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li
                      key={i}
                      className="flex items-start text-white/80 text-lg"
                    >
                      <Briefcase className="w-6 h-6 text-[#138808] mr-4 mt-0.5 shrink-0" />
                      <span>{t(`traction.partnerships.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ── Work With Us ──────────────────────────────────────── */}
        <section className="about-section z-10 !pt-0">
          <div className="about-section-container max-w-7xl mx-auto w-full">
            <FadeInView className="text-center mb-16">
              <h2 className="about-section-title">{t("work_with_us.title")}</h2>
              <p className="text-white/65 text-lg mx-auto max-w-3xl mt-6 leading-relaxed">
                {t("work_with_us.subtitle")}
              </p>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <FadeInView
                  key={i}
                  delay={i * 0.1}
                  className="bg-[rgba(10,10,20,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] p-8 sm:p-10 rounded-2xl hover:border-[rgba(212,146,12,0.3)] transition-colors duration-300 flex flex-col items-center text-center group"
                >
                  <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#d4920c] transition-colors">
                    {t(`work_with_us.items.${i}.title`)}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-10 flex-1 text-[17px]">
                    {t(`work_with_us.items.${i}.desc`)}
                  </p>
                  <a
                    href={
                      i === 2
                        ? "/api"
                        : i === 3
                          ? "mailto:partnerships@kubar.tech"
                          : "/contact"
                    }
                    className="about-cta-btn group w-full flex text-center justify-center items-center"
                  >
                    <span>{t(`work_with_us.items.${i}.button`)}</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
