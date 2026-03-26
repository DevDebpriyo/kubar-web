"use client";

import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
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

// Organize steps into phases
const phaseMapping = [
  { phaseIndex: 0, stepIndices: [0, 1] },
  { phaseIndex: 1, stepIndices: [2, 3] },
  { phaseIndex: 2, stepIndices: [4, 5] },
  { phaseIndex: 3, stepIndices: [6, 7] },
];

function PhaseTabButton({
  phaseIndex,
  phaseTitle,
  isActive,
  onHover,
}: {
  phaseIndex: number;
  phaseTitle: string;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <motion.button
      className="story-tab-button"
      onMouseEnter={onHover}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-active={isActive}
      initial={false}
    >
      <div className="story-tab-number">
        <motion.span
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {phaseIndex + 1}
        </motion.span>
      </div>

      <div className="story-tab-content">
        <motion.h4
          className="story-tab-title"
          animate={{
            color: isActive
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0.6)",
          }}
          transition={{ duration: 0.3 }}
        >
          {phaseTitle}
        </motion.h4>
      </div>

      {isActive && (
        <motion.div
          className="story-tab-indicator"
          layoutId="phaseIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function SubStep({
  icon: Icon,
  description,
  index,
}: {
  icon: (typeof stepIcons)[number];
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="story-substep"
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 20, y: -10 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="story-substep-icon">
        <Icon className="h-5 w-5" />
      </div>
      <p className="story-substep-text">{description}</p>
    </motion.div>
  );
}

export function VisualStorySection() {
  const t = useTranslations("visual_story");
  const [activePhase, setActivePhase] = useState(0);

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

  const currentPhaseData = phaseMapping[activePhase];
  const currentStepDescriptions = currentPhaseData.stepIndices.map(
    (i) => steps[i]
  );

  return (
    <section
      id="story"
      aria-label={t("aria_label")}
      className="story-section"
    >
      <div className="story-gradient-bg" aria-hidden="true" />

      <div className="story-container">
        {/* Header */}
        <div className="story-header-content">
          {/* Old Way Block */}
          <div className="story-old-way">
            <div className="story-old-way-line" aria-hidden="true" />
            <p className="story-old-way-label">
              {t("old_way_label")}
            </p>
            <p className="story-old-way-text">
              {t("old_way_path")}
            </p>
          </div>

          {/* Implementation Badge */}
          <div className="story-impl-badge">
            <Sparkles className="h-4 w-4" />
            <span>{t("implementation_label")}</span>
          </div>
        </div>

        {/* Phase Tabs */}
        <div className="story-tabs">
          {phaseMapping.map((phase) => (
            <PhaseTabButton
              key={phase.phaseIndex}
              phaseIndex={phase.phaseIndex}
              phaseTitle={phaseTitles[phase.phaseIndex]}
              isActive={activePhase === phase.phaseIndex}
              onHover={() => setActivePhase(phase.phaseIndex)}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="story-content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              className="story-phase-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Phase Title & Description Box */}
              <div className="story-phase-header-box">
                <div className="story-phase-badge">
                  {activePhase + 1}
                </div>
                <div>
                  <h3 className="story-phase-title">
                    {phaseTitles[activePhase]}
                  </h3>
                  <p className="story-phase-step-indicator">
                    {currentPhaseData.stepIndices.length} implementation step
                    {currentPhaseData.stepIndices.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Sub-steps */}
              <div className="story-substeps-container">
                <AnimatePresence mode="sync">
                  {currentPhaseData.stepIndices.map((stepIndex, idx) => {
                    const Icon = stepIcons[stepIndex];
                    return (
                      <SubStep
                        key={stepIndex}
                        icon={Icon}
                        description={currentStepDescriptions[idx]}
                        index={idx}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
