"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle,
  Building2,
  ShoppingCart,
  Landmark,
  FileText,
  Database,
} from "lucide-react";
import { useTranslations } from "next-intl";
import "./BuiltForTrustSection.css";

const complianceIcons = [Shield, Lock, CheckCircle];
const integrationIcons = [Building2, ShoppingCart, Landmark, FileText, Database];

function TrustBadge({
  icon: Icon,
  label,
  index,
  category,
}: {
  icon: typeof complianceIcons[number];
  label: string;
  index: number;
  category: "compliance" | "integration";
}) {
  const isCompliance = category === "compliance";
  const delay = index * 0.08;

  return (
    <motion.div
      className={`trust-badge ${category}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.3 },
      }}
    >
      {/* Background glow */}
      <div
        className={`trust-badge-glow ${isCompliance ? "compliance-glow" : "integration-glow"}`}
        aria-hidden="true"
      />

      {/* Badge content */}
      <div className="trust-badge-content">
        {/* Icon container */}
        <motion.div
          className="trust-badge-icon"
          whileHover={{
            scale: 1.15,
            rotate: 5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="h-5 w-5" />

          {/* Icon pulse ring */}
          <motion.div
            className="trust-icon-pulse"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Label text */}
        <motion.span
          className="trust-badge-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + 0.1,
          }}
        >
          {label}
        </motion.span>
      </div>

      {/* Border accent */}
      <div className="trust-badge-border" aria-hidden="true" />

      {/* Corner accent (only on compliance) */}
      {isCompliance && <div className="trust-badge-corner" aria-hidden="true" />}
    </motion.div>
  );
}

export function BuiltForTrustSection() {
  const t = useTranslations("built_for_trust");

  const complianceItems = [
    t("compliance.1"),
    t("compliance.2"),
    t("compliance.3"),
  ];

  const integrationItems = [
    t("integrations.1"),
    t("integrations.2"),
    t("integrations.3"),
    t("integrations.4"),
    t("integrations.5"),
  ];

  return (
    <section
      id="built-for-trust"
      aria-label={t("aria_label")}
      className="trust-section"
    >
      {/* Animated gradient background */}
      <div className="trust-bg-gradient" aria-hidden="true" />
      <div className="trust-bg-accent" aria-hidden="true" />

      <div className="trust-container">
        {/* Header */}
        <motion.div
          className="trust-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className="trust-title">{t("title")}</h2>
        </motion.div>

        {/* Divider line */}
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

        {/* Compliance badges section */}
        <motion.div
          className="trust-section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="trust-compliance-grid">
            {complianceItems.map((item, index) => (
              <TrustBadge
                key={`compliance-${index}`}
                icon={complianceIcons[index]}
                label={item}
                index={index}
                category="compliance"
              />
            ))}
          </div>
        </motion.div>

        {/* Spacer line */}
        <motion.div
          className="trust-spacer-line"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            delay: 0.35,
          }}
          aria-hidden="true"
        />

        {/* Integration badges section */}
        <motion.div
          className="trust-section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="trust-integration-grid">
            {integrationItems.map((item, index) => (
              <TrustBadge
                key={`integration-${index}`}
                icon={integrationIcons[index]}
                label={item}
                index={index}
                category="integration"
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          className="trust-bottom-accent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
