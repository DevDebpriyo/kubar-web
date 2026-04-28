"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
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
  Building2,
  Users,
  MapPin,
  Rocket,
  Lock,
  ChevronDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { RoadmapSection } from "@/components/about/RoadmapSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import "./about.css";
import "@/components/home/BuiltBySection.css";
import "@/components/home/BuiltForTrustSection.css";
import { FooterSection } from "@/components/home/FooterSection";

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

type TractionCardItem = {
  id: number;
  year: string;
};

function TractionFlipCard({
  item,
  index,
  type,
  title,
}: {
  item: TractionCardItem;
  index: number;
  type: "recognition" | "partnership";
  title: string;
}) {
  const isRecognition = type === "recognition";
  const Icon = isRecognition ? Award : Briefcase;
  const tone = isRecognition
    ? index % 2 === 0
      ? "amber"
      : "emerald"
    : index % 2 === 0
      ? "sky"
      : "amber";
  const delay = index * 0.08;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const mobileContentId = `traction-mobile-details-${type}-${item.id}`;

  return (
    <motion.article
      className="trust-flip-card group"
      data-tone={tone}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -6 }}
      tabIndex={0}
      aria-label={`${title}. ${item.year}`}
    >
      <div className="trust-flip-card-inner">
        <div className="trust-flip-face trust-flip-front">
          <div className="trust-face-grid" aria-hidden="true" />

          <div className="trust-front-meta">
            <Badge variant="outline" className="trust-layer-badge">
              {isRecognition ? "Recognition" : "Partnership"}
            </Badge>
            <div className="trust-front-icon-shell">
              <Icon className="trust-front-icon" aria-hidden="true" />
            </div>
          </div>

          <h3 className="trust-front-title line-clamp-3 leading-tight text-white mb-2">
            {title}
          </h3>
          <p className="trust-front-tagline">Year: {item.year}</p>

          <Separator className="trust-front-separator" />

          <div className="trust-front-tags" aria-label="Tags">
            <Badge variant="secondary" className="trust-tag-badge">
              {item.year}
            </Badge>
            <Badge variant="secondary" className="trust-tag-badge">
              {isRecognition ? "Award" : "Collaboration"}
            </Badge>
          </div>

          <div className="trust-front-graphic" aria-hidden="true">
            <div className="trust-graphic-glow" />

            <div className="trust-graphic-logo font-mono text-xl sm:text-3xl font-black text-white/40 group-hover:text-white/70 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </div>

            <svg
              className="trust-graphic-waves"
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,45 C50,45 60,15 100,15 C140,15 150,45 200,45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeDasharray: "200 200", strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.path
                d="M0,30 C40,30 50,5 100,5 C150,5 160,30 200,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <Icon className="trust-graphic-icon opacity-50" strokeWidth={1} />
            <div className="trust-graphic-scanline" />
          </div>

          <div className="trust-front-meter" aria-hidden="true">
            <span className="trust-meter-segment" />
            <span className="trust-meter-segment" />
            <span className="trust-meter-segment" />
          </div>

          <div className="trust-mobile-controls">
            <button
              type="button"
              className="trust-mobile-toggle"
              aria-expanded={isExpanded}
              aria-controls={mobileContentId}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <span className="trust-mobile-toggle-text">
                {isExpanded ? "Hide Details" : "View Details"}
              </span>
              <ChevronDown
                className="trust-mobile-toggle-icon"
                aria-hidden="true"
                data-expanded={isExpanded}
              />
            </button>
          </div>

          <div
            id={mobileContentId}
            className="trust-mobile-details"
            data-expanded={isExpanded}
          >
            <div className="trust-back-meta">
              <Badge variant="outline" className="trust-back-badge">
                Details
              </Badge>
              <span className="trust-back-layer">{item.year}</span>
            </div>
            <h3 className="trust-back-title">{title}</h3>
            <Separator className="trust-back-separator" />
            <p className="trust-back-context">
              {isRecognition
                ? "This recognition validates our commitment to innovation and excellence in the fintech ecosystem."
                : "This partnership enables us to expand our presence and deliver greater value to the financial market."}
            </p>
          </div>
        </div>

        <div className="trust-flip-face trust-flip-back">
          <div className="trust-face-grid" aria-hidden="true" />
          <div className="trust-back-meta">
            <Badge variant="outline" className="trust-back-badge">
              Details
            </Badge>
            <span className="trust-back-layer">{item.year}</span>
          </div>
          <h3 className="trust-back-title">{title}</h3>
          <Separator className="trust-back-separator" />
          <p className="trust-back-context">
            {isRecognition
              ? "This recognition validates our commitment to innovation and excellence in the fintech ecosystem."
              : "This partnership enables us to expand our presence and deliver greater value to the financial market."}
          </p>

          <div className="trust-back-footer">
            <Badge variant="secondary" className="trust-back-assurance">
              {isRecognition ? "Industry Validation" : "Strategic Alliance"}
            </Badge>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");

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
        <div className="relative z-0">
          <section className="about-hero w-full min-h-screen lg:h-screen">
            <div className="about-hero-bg"></div>

            <div className="about-section-container px-6 sm:px-10 lg:px-12 w-full min-h-screen lg:h-full flex items-center justify-center lg:pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full pb-10 ">
                {/* Left Side: Text Content */}
                <div className="flex flex-col items-start gap-5 max-w-2xl mx-auto lg:mx-0 lg:mt-0">
                  {/* <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="about-badge mt-20"
                  >
                    <Compass className="w-4 h-4" />
                    {t("hero.badge")}
                  </motion.div> */}

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-[46px] sm:text-[62px] lg:text-[70px] xl:text-[78px] font-extrabold leading-[1.05] tracking-tight text-white mb-2 flex flex-col items-start gap-2 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-3"
                  >
                    <img
                      src="/logo.png"
                      alt="Kubar Labs"
                      className="hidden lg:block h-11 xl:h-[52px] w-auto shrink-0 animate-fadeInUp animation-delay-300"
                    />
                    <span>{t("hero.title")}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-[#d4920c] font-bold leading-snug max-w-xl mt-2 mb-2 text-pretty"
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
                    className="text-lg sm:text-xl lg:text-xl xl:text-2xl text-white/70 font-medium leading-relaxed max-w-xl mt-2 mb-4 text-pretty"
                  >
                    {t("hero.intro")}
                  </motion.p>
                </div>

                {/* Right Side: Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative w-full flex justify-center lg:justify-end"
                >
                  {/* Decorative Background Blur */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-[#d4920c]/20 to-[#138808]/20 rounded-full blur-[80px] pointer-events-none" />

                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 w-full max-w-[360px] sm:max-w-[600px] xl:max-w-[700px] rounded-3xl overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20 mix-blend-overlay" />
                    <img
                      src="/mobileScreen.png"
                      alt="Mobile App Demo"
                      className="w-full h-auto object-cover rounded-3xl relative z-10"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>

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
        </div>

        {/* ── Mission & Vision ──────────────────────────────────── */}
        <section className="about-section z-10 bg-background relative border-t border-white/10 pt-16 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)]">
          <div className="about-section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeInView>
                <div className="space-y-6 lg:pe-10">
                  <h2 className="text-3xl mt-12 sm:text-4xl font-bold text-white leading-tight">
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
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[rgba(212,146,12,0.1)] rounded-full filter blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-[rgba(59,130,246,0.08)] rounded-full filter blur-[100px]"
            />
          </div>

          <div className="about-section-container relative z-10">
            <FadeInView className="about-section-header !-mt-5 mb-12">
              <h2 className="about-section-title">{t("why_we_exist.title")}</h2>
              <motion.div
                className="trust-divider"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                aria-hidden="true"
              />
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <FadeInView delay={0.1} className="md:col-span-5 h-full">
                <div className="h-full relative group overflow-hidden bg-[rgba(255,255,255,0.02)] p-8 sm:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col items-start justify-center transition-all duration-500 hover:border-[rgba(212,146,12,0.4)] hover:bg-[rgba(212,146,12,0.02)] hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(212,146,12,0.2)]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-110 pointer-events-none">
                    <Building2 className="w-32 h-32 text-[#d4920c]" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(212,146,12,0.1)] border border-[rgba(212,146,12,0.2)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Building2 className="w-7 h-7 text-[#d4920c]" />
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
                    {t("why_we_exist.p1")}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4920c]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                </div>
              </FadeInView>

              {/* Card 2 */}
              <FadeInView delay={0.2} className="md:col-span-7 h-full">
                <div className="h-full relative group overflow-hidden bg-[rgba(255,255,255,0.02)] p-8 sm:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col items-start justify-center transition-all duration-500 hover:border-[rgba(59,130,246,0.4)] hover:bg-[rgba(59,130,246,0.02)] hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.2)]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-110 pointer-events-none">
                    <Users className="w-32 h-32 text-[#3b82f6]" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Users className="w-7 h-7 text-[#3b82f6]" />
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
                    {t("why_we_exist.p2")}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                </div>
              </FadeInView>

              {/* Card 3 */}
              <FadeInView delay={0.3} className="md:col-span-7 h-full">
                <div className="h-full relative group overflow-hidden bg-[rgba(255,255,255,0.02)] p-8 sm:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col items-start justify-center transition-all duration-500 hover:border-[rgba(34,197,94,0.4)] hover:bg-[rgba(34,197,94,0.02)] hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(34,197,94,0.2)]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-110 pointer-events-none">
                    <MapPin className="w-32 h-32 text-[#22c55e]" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <MapPin className="w-7 h-7 text-[#22c55e]" />
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
                    {t("why_we_exist.p3")}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                </div>
              </FadeInView>

              {/* Card 4 */}
              <FadeInView delay={0.4} className="md:col-span-5 h-full">
                <div className="h-full relative group overflow-hidden bg-gradient-to-br from-[#d4920c]/10 to-[rgba(255,255,255,0.02)] p-8 sm:p-10 rounded-3xl border border-[#d4920c]/30 backdrop-blur-md flex flex-col items-start justify-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,146,12,0.15)] hover:-translate-y-1">
                  <div className="absolute inset-0 bg-[rgba(212,146,12,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700 transform group-hover:translate-x-4 group-hover:-translate-y-4 pointer-events-none">
                    <Rocket className="w-40 h-40 text-[#d4920c]" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4920c] to-[#f5bc35] shadow-[0_0_20px_rgba(212,146,12,0.4)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Rocket className="w-8 h-8 text-[#0a0a0f]" />
                  </div>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl leading-snug relative z-10">
                    {t("why_we_exist.p4")}
                  </h3>
                </div>
              </FadeInView>
            </div>
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
              <motion.div
                className="trust-divider"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                aria-hidden="true"
              />
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
        <section className="relative pb-16 z-10 bg-gradient-to-b from-[rgba(10,10,15,0.4)] via-[rgba(15,15,20,0.8)] to-[rgba(10,10,15,0.4)] overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                x: ["-10%", "10%", "-10%"],
                y: ["-10%", "10%", "-10%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#138808] rounded-full filter blur-[180px] opacity-10"
            />
            <motion.div
              animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-10%", "10%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white rounded-full filter blur-[180px] opacity-5"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <FadeInView className="text-center mb-24">
              <h2 className="horizon-section-title font-black text-white mb-6 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {t("horizons.title")}
              </h2>
              <motion.div
                className="trust-divider"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                aria-hidden="true"
              />
            </FadeInView>

            <div className="relative">
              {/* Connecting Beam (Desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#3b82f6]/20 via-[#3b82f6]/20 to-[#3b82f6]/10 -translate-y-1/2 z-0">
                <motion.div
                  className="absolute top-1/2 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent -translate-y-1/2 shadow-[0_0_15px_#3b82f6]"
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Connecting Beam (Mobile/Tablet) */}
              <div className="lg:hidden absolute left-1/2 top-[10%] bottom-[10%] w-0.5 bg-gradient-to-b from-[#3b82f6]/20 via-[#3b82f6]/20 to-[#3b82f6]/10 -translate-x-1/2 z-0">
                <motion.div
                  className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-[#3b82f6] to-transparent -translate-x-1/2 shadow-[0_0_15px_#3b82f6]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                {/* Horizon 1 */}
                <FadeInView delay={0.2} className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#138808]/20 to-transparent rounded-[2.5rem] filter blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="relative h-full bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[2.5rem] p-8 sm:p-12 transition-all duration-700 hover:-translate-y-1 hover:border-[#138808]/20 hover:bg-[rgba(19,136,8,0.02)] hover:shadow-[0_10px_40px_-15px_rgba(19,136,8,0.15)] overflow-hidden flex flex-col">
                    {/* Decor lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#138808] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#138808] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6 relative z-10">
                      <div className="inline-flex items-center gap-3 border border-[#138808]/30 bg-[#138808]/10 px-5 py-2.5 rounded-full backdrop-blur-md w-fit">
                        <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
                        <span className="text-[#138808] font-bold tracking-[0.2em] uppercase text-sm">
                          {t(`horizons.items.1.label`)}
                        </span>
                      </div>
                      <div className="text-6xl font-black text-white/5 group-hover:text-[#138808]/20 transition-colors duration-700 select-none">
                        01
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Image
                        src="/nd_logo.png"
                        alt="NavDhan"
                        width={120}
                        height={36}
                        className="h-16 sm:h-22 w-auto object-contain drop-shadow-sm -translate-y-3.5 sm:-translate-y-5"
                      />
                      <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 group-hover:text-[#138808] transition-colors duration-500 relative z-10">
                        {t(`horizons.items.1.title`)}
                      </h3>
                    </div>
                    <p className="text-white/70 text-lg leading-loose text-pretty relative z-10 group-hover:text-white/90 transition-colors duration-500">
                      {t(`horizons.items.1.desc`)}
                    </p>

                    {/* Status badge (Bottom Right) */}
                    <div className="mt-auto pt-8 flex justify-end relative z-10">
                      <motion.div
                        className="built-status-badge live w-fit"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={{
                          boxShadow: [
                            "0 0 12px rgba(74, 132, 255, 0.3)",
                            "0 0 24px rgba(74, 132, 255, 0.6)",
                            "0 0 12px rgba(74, 132, 255, 0.3)",
                          ],
                        }}
                        transition={{
                          delay: 0.3,
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <div className="built-status-icon">
                          <Zap className="h-3.5 w-3.5" />
                        </div>
                        <span className="built-status-text">Live</span>
                      </motion.div>
                    </div>

                    {/* Watermark/Background Icon */}
                    <div className="absolute -bottom-10 -right-10 text-[#138808]/5 group-hover:text-[#138808]/10 transition-colors duration-700 transform group-hover:scale-105 pointer-events-none">
                      <Target className="w-64 h-64" />
                    </div>
                  </div>
                </FadeInView>

                {/* Horizon 2 */}
                <FadeInView delay={0.4} className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] filter blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="relative h-full bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-[2.5rem] p-8 sm:p-12 transition-all duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col">
                    {/* Decor lines */}
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-white/50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

                    <div className="flex flex-col sm:flex-row-reverse sm:items-center justify-between mb-12 gap-6 relative z-10">
                      <div className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-2.5 rounded-full backdrop-blur-md w-fit sm:self-end group-hover:border-white/40 transition-colors duration-500">
                        <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                        <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-sm">
                          {t(`horizons.items.2.label`)}
                        </span>
                      </div>
                      <div className="text-6xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-700 select-none">
                        02
                      </div>
                    </div>

                    <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 group-hover:text-white transition-colors duration-500 sm:text-right relative z-10">
                      {t(`horizons.items.2.title`)}
                    </h3>

                    <p className="text-white/70 text-lg leading-loose text-pretty relative z-10 group-hover:text-white/90 transition-colors duration-500 sm:text-right">
                      {t(`horizons.items.2.desc`)}
                    </p>

                    {/* Status badge (Bottom Right) */}
                    <div className="mt-auto pt-8 flex justify-end relative z-10">
                      <motion.div
                        className="built-status-badge w-fit"
                        style={{
                          border: "1.5px solid rgba(255, 255, 255, 0.4)",
                          background: "rgba(255, 255, 255, 0.1)",
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="built-status-icon">
                          <Lock className="h-3.5 w-3.5" />
                        </div>
                        <span className="built-status-text">Coming soon</span>
                      </motion.div>
                    </div>

                    {/* Watermark/Background Icon */}
                    <div className="absolute -bottom-10 -left-10 text-white/5 group-hover:text-white/10 transition-colors duration-700 transform group-hover:scale-105 pointer-events-none">
                      <Globe className="w-64 h-64" />
                    </div>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline / Roadmap ────────────────────────────────── */}
        <RoadmapSection />

        {/* ── Recognition / Traction ────────────────────────────── */}
        <section className="pt-12 sm:pt-20 pb-14 relative overflow-hidden bg-[#05050a] border-t border-white/[0.02]">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#d4920c]/5 rounded-full filter blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#138808]/5 rounded-full filter blur-[120px] mix-blend-screen" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header Section */}
            <FadeInView className="flex flex-col items-center text-center mb-20 sm:mb-28">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#d4920c] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                  Milestones
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 mb-8 tracking-tight">
                {t("traction.title")}
              </h2>
              <div className="relative p-8 sm:p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] max-w-4xl mx-auto shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#d4920c]/50 to-transparent" />
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed text-pretty font-light">
                  {t("traction.desc")}
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#138808]/50 to-transparent" />
              </div>
            </FadeInView>

            {/* Single Path Layout for Items */}
            <div className="flex flex-col gap-20 -mt-14">
              {/* Recognitions Section */}
              <div>
                <FadeInView
                  delay={0.2}
                  className="flex items-center gap-6 mb-12 justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4920c]/20 to-[#d4920c]/5 border border-[#d4920c]/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,146,12,0.15)]">
                    <Award className="w-8 h-8 text-[#d4920c]" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight text-center">
                    {t("traction.recognitions_title")}
                  </h3>
                </FadeInView>

                <div className="trust-cards-grid">
                  {[
                    { id: 1, year: "2026" },
                    { id: 2, year: "2025" },
                    { id: 3, year: "2024" },
                    { id: 4, year: "2024" },
                  ].map((item, index) => (
                    <TractionFlipCard
                      key={item.id}
                      item={item}
                      index={index}
                      type="recognition"
                      title={t(`traction.recognitions.${item.id}`)}
                    />
                  ))}
                </div>
              </div>

              {/* Partnerships Section */}
              <div>
                <FadeInView
                  delay={0.4}
                  className="flex items-center gap-6 mb-12 justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#138808]/20 to-[#138808]/5 border border-[#138808]/20 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(19,136,8,0.15)]">
                    <Briefcase className="w-8 h-8 text-[#138808]" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight text-center">
                    {t("traction.partnerships_title")}
                  </h3>
                </FadeInView>

                <div className="space-y-4">
                  {[
                    { id: 1, year: "2025" },
                    { id: 2, year: "2025" },
                    { id: 3, year: "2025" },
                    { id: 4, year: "2025" },
                    { id: 5, year: "2024" },
                  ].map((item, index) => (
                    <FadeInView key={item.id} delay={0.5 + index * 0.1}>
                      <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#138808]/40 hover:bg-gradient-to-br hover:from-[#138808]/[0.08] hover:to-transparent transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(19,136,8,0.2)] hover:-translate-y-1 cursor-default">
                        {/* Hover Gradient Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#138808]/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                        <div className="grid grid-cols-[auto_1fr] items-center gap-4 sm:gap-10 relative z-10">
                          {/* Column 1: Serial Number */}
                          <div className="text-[#138808]/30 group-hover:text-[#138808] font-black text-xl sm:text-3xl font-mono transition-colors duration-300">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Column 2: Name */}
                          <p className="text-white/70 group-hover:text-white/95 text-base sm:text-xl font-medium leading-relaxed transition-colors duration-300">
                            {t(`traction.partnerships.${item.id}`)}
                          </p>
                        </div>
                      </div>
                    </FadeInView>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Work With Us ──────────────────────────────────────── */}
        <section className="about-section z-10 -mt-14 sm:-mt-16">
          <div className="about-section-container max-w-7xl mx-auto w-full">
            <FadeInView className="text-center mb-16">
              <h2 className="about-section-title">{t("work_with_us.title")}</h2>
              <p className="text-white/65 text-lg mx-auto max-w-3xl mt-6 leading-relaxed">
                {t("work_with_us.subtitle")}
              </p>
              <motion.div
                className="trust-divider"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                aria-hidden="true"
              />
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
      <FooterSection />
    </main>
  );
}
