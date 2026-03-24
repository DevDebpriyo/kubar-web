"use client";

import {
  Box,
  BadgeIndianRupee,
  Radar,
  FileClock,
  BrainCircuit,
  BadgeCheck,
  Wallet,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import "./VisualStorySection.css";

const stepIcons = [
  Box,
  BadgeIndianRupee,
  Radar,
  FileClock,
  BrainCircuit,
  BadgeCheck,
  Wallet,
  TrendingUp,
] as const;

function StepCard({ title, description, icon: Icon, index }: { title: string; description: string; icon: (typeof stepIcons)[number]; index: number }) {
  return (
    <div className="story-step-card">
      <div className="story-step-content">
        <div className="story-step-icon">
          <Icon className="h-6 w-6" />
          <span className="story-step-number">{index + 1}</span>
        </div>
        <div className="story-step-text">
          <p className="story-step-title">{title}</p>
          <p className="story-step-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function VisualStorySection() {
  const t = useTranslations("visual_story");

  const steps = [
    t("steps.1"),
    t("steps.2"),
    t("steps.3"),
    t("steps.4"),
    t("steps.5"),
    t("steps.6"),
    t("steps.7"),
    t("steps.8"),
  ];

  const phaseTitles = [
    t("implementation_phases.1"),
    t("implementation_phases.2"),
    t("implementation_phases.3"),
    t("implementation_phases.4"),
  ];

  return (
    <section
      id="story"
      aria-label={t("aria_label")}
      className="relative overflow-hidden bg-[#04040c]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 500px at 50% -20%, rgba(212,146,12,0.11), transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header section with Old Way and Implementation Label */}
        <div className="story-header px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16">
          {/* Old Way Block */}
          <div className="story-old-way mb-16 sm:mb-20">
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/18 to-transparent"
              aria-hidden="true"
            />
            <p className="text-center text-[10.5px] font-semibold tracking-[0.24em] text-white/35 uppercase">
              {t("old_way_label")}
            </p>
            <p className="mt-2 text-center text-[14px] sm:text-[15px] leading-[1.6] text-white/42 text-pretty">
              {t("old_way_path")}
            </p>
          </div>

          {/* Implementation Label */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.02] px-3.5 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#d4920c]/85" />
            <p className="text-[10.5px] font-semibold tracking-[0.24em] text-white/48 uppercase">
              {t("implementation_label")}
            </p>
          </div>

          {/* Phase Indicators */}
          <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {phaseTitles.map((title, index) => (
              <div key={title} className="story-phase-indicator">
                <div className="story-phase-dot">
                  <span>{index + 1}</span>
                </div>
                <p className="story-phase-label">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simple grid cards layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {steps.map((description, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <StepCard
                  title={`${t("steps." + (index + 1))}`}
                  description={description}
                  icon={Icon}
                  index={index}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
