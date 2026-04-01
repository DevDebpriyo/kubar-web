"use client";

import React, { useState } from "react";
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
  Landmark,
  FileText,
  Hourglass,
  XOctagon,
  Ban,
  ArrowDown,
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
  icon: Icon,
  isActive,
  onHover,
}: {
  phaseIndex: number;
  phaseTitle: string;
  icon: React.ElementType;
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
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </div>

      <div className="story-tab-content">
        <span className="story-tab-step-label">STEP {phaseIndex + 1}</span>
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

  const phaseIcons = [Radar, BrainCircuit, BadgeCheck, TrendingUp];

  const currentPhaseData = phaseMapping[activePhase];
  const currentStepDescriptions = currentPhaseData.stepIndices.map(
    (i) => steps[i]
  );
  
  const oldWaySteps = [
    t("old_way_steps.1"),
    t("old_way_steps.2"),
    t("old_way_steps.3"),
    t("old_way_steps.4"),
  ];

  return (
    <section
      id="story"
      aria-label={t("aria_label")}
      className="story-section"
    >
      <div className="story-gradient-bg" aria-hidden="true" />

      <div className="story-container">
        
        {/* Old Way Flow */}
        <div className="old-way-container">
          <h3 className="old-way-title">
            <Ban className="h-4 w-4" /> {t("old_way_label")}
          </h3>
          <div className="old-way-timeline">
            {[
              { icon: Landmark, text: oldWaySteps[0] },
              { icon: FileText, text: oldWaySteps[1] },
              { icon: Hourglass, text: oldWaySteps[2] },
              { icon: XOctagon, text: oldWaySteps[3], failure: true },
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <motion.div
                  className={`old-way-step ${step.failure ? "failure" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                >
                  <div className="old-way-icon">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="old-way-text">{step.text}</p>
                </motion.div>
                
                {idx < arr.length - 1 && (
                  <motion.div
                    className="old-way-connector"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.1, duration: 0.3 }}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Our Implementation Card */}
        <div className="impl-container">
          {/* Our Implementation Header */}
          <div className="solution-header">
            <motion.div 
              className="story-impl-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>{t("implementation_label")}</span>
            </motion.div>
          </div>

          {/* Phase Tabs */}
          <div className="story-tabs">
            {phaseMapping.map((phase) => (
              <PhaseTabButton
                key={phase.phaseIndex}
                phaseIndex={phase.phaseIndex}
                phaseTitle={phaseTitles[phase.phaseIndex]}
                icon={phaseIcons[phase.phaseIndex]}
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
      </div>
    </section>
  );
}
