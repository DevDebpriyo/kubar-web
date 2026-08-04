"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Zap,
  Code2,
  CheckCircle2,
  Brain,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import "./TwoOutcomesSection.css";

type TabType = "marketplaces" | "institutions";

const marketplaceIcons = [TrendingUp, Users, Zap, Code2] as const;
const institutionIcons = [CheckCircle2, Brain, BarChart3, Shield] as const;

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  isActive,
  accentRgb,
}: {
  icon: typeof marketplaceIcons[number];
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  accentRgb: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group outcomes-feature-card"
    >
      {/* Gradient background blur */}
      <div
        className="outcomes-card-glow"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb}, ${0.12 + index * 0.03}), rgba(${accentRgb}, ${0.04 + index * 0.02}))`,
        }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="outcomes-card-content">
        {/* Icon container with animated border */}
        <motion.div
          className="outcomes-card-icon-wrapper"
          whileHover={{
            scale: 1.08,
          }}
        >
          <div className="outcomes-card-icon">
            <Icon className="h-5 w-5" />
          </div>
          {/* Animated corner accent */}
          <div className="outcomes-icon-accent" aria-hidden="true" />
        </motion.div>

        {/* Text content */}
        <div className="outcomes-card-text">
          <motion.h3
            className="outcomes-card-title"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="outcomes-card-description"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Hover indicator dot */}
        <motion.div
          className="outcomes-card-dot"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Border gradient on hover */}
      <div className="outcomes-card-border" aria-hidden="true" />
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  activeColor,
  children,
}: {
  active: boolean;
  onClick: () => void;
  activeColor: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`outcomes-tab-button ${active ? "active" : ""}`}
    >
      <motion.div
        className="outcomes-tab-content"
        animate={{
          color: active ? activeColor : "rgba(255, 255, 255, 0.48)",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {active && (
        <motion.div
          className="outcomes-tab-indicator"
          layoutId="outcomes-underline"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export function TwoOutcomesSection() {
  const [activeTab, setActiveTab] = useState<TabType>("marketplaces");
  const t = useTranslations("two_outcomes");

  const marketplaceFeatures = [
    {
      title: t("marketplaces.features.1.title"),
      description: t("marketplaces.features.1.description"),
    },
    {
      title: t("marketplaces.features.2.title"),
      description: t("marketplaces.features.2.description"),
    },
    {
      title: t("marketplaces.features.3.title"),
      description: t("marketplaces.features.3.description"),
    },
    {
      title: t("marketplaces.features.4.title"),
      description: t("marketplaces.features.4.description"),
    },
  ];

  const institutionFeatures = [
    {
      title: t("institutions.features.1.title"),
      description: t("institutions.features.1.description"),
    },
    {
      title: t("institutions.features.2.title"),
      description: t("institutions.features.2.description"),
    },
    {
      title: t("institutions.features.3.title"),
      description: t("institutions.features.3.description"),
    },
    {
      title: t("institutions.features.4.title"),
      description: t("institutions.features.4.description"),
    },
  ];

  const currentFeatures =
    activeTab === "marketplaces" ? marketplaceFeatures : institutionFeatures;
  const currentSubtitle =
    activeTab === "marketplaces"
      ? t("marketplaces.subtitle")
      : t("institutions.subtitle");
  const currentCta =
    activeTab === "marketplaces" ? t("marketplaces.cta") : t("institutions.cta");
  const currentEmail =
    activeTab === "marketplaces"
      ? t("marketplaces.cta_email")
      : t("institutions.cta_email");

  const currentIcons =
    activeTab === "marketplaces" ? marketplaceIcons : institutionIcons;
  const accentRgb = activeTab === "marketplaces" ? "212, 146, 12" : "19, 136, 8";
  const accentColor =
    activeTab === "marketplaces" ? "rgb(212, 146, 12)" : "rgb(19, 136, 8)";

  return (
    <section
      id="outcomes"
      aria-label={t("aria_label")}
      className="outcomes-section"
      data-accent={activeTab === "institutions" ? "institutions" : "marketplaces"}
    >
      {/* Animated gradient background */}
      <div className="outcomes-bg-gradient" aria-hidden="true" />

      <div className="outcomes-container">
        {/* Header */}
        <motion.div
          className="outcomes-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className="outcomes-title">{t("title")}</h2>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          className="outcomes-tabs-wrapper"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="outcomes-tabs">
            <TabButton
              active={activeTab === "marketplaces"}
              onClick={() => setActiveTab("marketplaces")}
              activeColor={accentColor}
            >
              {t("marketplaces.tab")}
            </TabButton>
            <TabButton
              active={activeTab === "institutions"}
              onClick={() => setActiveTab("institutions")}
              activeColor={accentColor}
            >
              {t("institutions.tab")}
            </TabButton>
          </div>
        </motion.div>

        {/* Content area */}
        <div className="outcomes-content">
          {/* Subtitle and CTA */}
          <motion.div
            className="outcomes-text-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={`${activeTab}-text`}
          >
            <motion.p
              className="outcomes-subtitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {currentSubtitle}
            </motion.p>

            <motion.a
              href={`mailto:${currentEmail}`}
              className="outcomes-cta-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{
                x: 4,
                transition: { duration: 0.2 },
              }}
            >
              {currentCta}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Feature cards grid */}
          <div className="outcomes-cards-grid">
            <AnimatePresence mode="wait">
              {currentFeatures.map((feature, index) => {
                const Icon = currentIcons[index];
                return (
                  <FeatureCard
                    key={`${activeTab}-${index}`}
                    icon={Icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                    isActive={true}
                    accentRgb={accentRgb}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
