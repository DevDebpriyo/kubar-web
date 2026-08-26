"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import "./navdhan.css";

/* ─── Animation Variants ─────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/* ─── Use Case Card ──────────────────────────────────────── */
function UseCaseCard({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="navdhan-use-case-card"
    >
      <div className="navdhan-use-case-icon">{icon}</div>
      <h3 className="navdhan-use-case-title">{title}</h3>
      <p className="navdhan-use-case-description">{description}</p>
    </m.div>
  );
}

/* ─── Feature Bullet ─────────────────────────────────────── */
function FeatureBullet({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="navdhan-feature-bullet"
    >
      <CheckCircle2 className="navdhan-check-icon" />
      <span>{text}</span>
    </m.div>
  );
}

/* ─── Integration Layer ──────────────────────────────────── */
function IntegrationLayer({
  label,
  items,
  delay,
}: {
  label: string;
  items: string[];
  delay: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="navdhan-integration-layer"
    >
      <h3 className="navdhan-integration-label">{label}</h3>
      <div className="navdhan-integration-items">
        {items.map((item, idx) => (
          <m.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + idx * 0.1 }}
            className="navdhan-integration-item"
          >
            {item}
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

/* ─── CTA Section ────────────────────────────────────────── */
function CTASection({
  title,
  subtitle,
  features,
  tagline,
  ctaText,
  ctaEmail,
  alignment = "left",
}: {
  title: string;
  subtitle: string;
  features: string[];
  tagline?: string;
  ctaText?: string;
  ctaEmail?: string;
  alignment?: "left" | "right";
}) {
  return (
    <div className={`navdhan-cta-section navdhan-cta-${alignment}`}>
      <m.div
        initial={{ opacity: 0, x: alignment === "left" ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="navdhan-cta-content"
      >
        <m.h2
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="navdhan-cta-title"
        >
          {title}
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="navdhan-cta-subtitle"
        >
          {subtitle}
        </m.p>

        <div className="navdhan-cta-features">
          {features.map((feature, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, x: alignment === "left" ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
              className="navdhan-cta-feature"
            >
              <Zap className="navdhan-cta-feature-icon" />
              <span>{feature}</span>
            </m.div>
          ))}
        </div>

        {tagline && (
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="navdhan-cta-tagline"
          >
            {tagline}
          </m.p>
        )}

        {ctaText && ctaEmail && (
          <m.a
            href={`mailto:${ctaEmail}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="navdhan-cta-button"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </m.a>
        )}
      </m.div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function NavDhanPage() {
  const t = useTranslations("navdhan");

  return (
    <main className="navdhan-main">
      <Navbar />

      {/* Hero Section */}
      <section className="navdhan-hero">
        <div className="navdhan-container">
          <div className="navdhan-hero-grid">
            {/* Content */}
            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="navdhan-hero-content"
            >
              <m.h1
                variants={fadeInUp}
                className="navdhan-hero-title"
              >
                {t("hero.title")}
              </m.h1>

              <m.p
                variants={fadeInUp}
                className="navdhan-hero-description"
              >
                {t("hero.description")}
              </m.p>

              <m.a
                variants={fadeInUp}
                href="https://calendly.com/vaibhav-kubar/partnerships-kubar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="navdhan-hero-cta"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4" />
              </m.a>
            </m.div>
          </div>
        </div>

        {/* Background elements */}
        <div className="navdhan-hero-bg" aria-hidden="true">
          <div className="navdhan-orb-1" />
          <div className="navdhan-orb-2" />
        </div>
      </section>

      {/* Problem Section */}
      <section className="navdhan-problem-section">
        <div className="navdhan-container">
          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="navdhan-problem-header"
          >
            <span className="navdhan-eyebrow">{t("problem_section.eyebrow")}</span>
            <h2 className="navdhan-section-title">
              {t("problem_section.subtitle")}
            </h2>
          </m.div>

          <div className="navdhan-problem-grid">
            <m.p
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="navdhan-problem-text"
            >
              {t("problem_section.problem_text")}
            </m.p>

            <m.p
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="navdhan-problem-text navdhan-problem-solution"
            >
              {t("problem_section.solution_text")}
            </m.p>
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section className="navdhan-image-showcase">
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="navdhan-image-showcase-container"
        >
          <Image
            src="/NavDhan-August.png"
            alt="NavDhan Architecture Diagram"
            width={1920}
            height={1080}
            quality={85}
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 64px), 1200px"
            className="navdhan-showcase-image"
          />
        </m.div>
      </section>

      {/* Use Cases */}
      <section className="navdhan-use-cases">
        <div className="navdhan-container">
          <m.h2
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="navdhan-section-title"
          >
            {t("use_cases.title")}
          </m.h2>

          <div className="navdhan-use-cases-grid">
            <UseCaseCard
              title={t("use_cases.cases.1.title")}
              description={t("use_cases.cases.1.description")}
              icon={<TrendingUp className="h-6 w-6" />}
              delay={0.1}
            />
            <UseCaseCard
              title={t("use_cases.cases.2.title")}
              description={t("use_cases.cases.2.description")}
              icon={<Zap className="h-6 w-6" />}
              delay={0.15}
            />
            <UseCaseCard
              title={t("use_cases.cases.3.title")}
              description={t("use_cases.cases.3.description")}
              icon={<Shield className="h-6 w-6" />}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Why NavDhan Works */}
      <section className="navdhan-why-works">
        <div className="navdhan-container">
          <m.h2
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="navdhan-section-title"
          >
            {t("why_works.title")}
          </m.h2>

          <div className="navdhan-why-works-grid">
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="navdhan-why-works-intro"
            >
              <p className="navdhan-why-works-tagline">
                {t("why_works.tagline")}
              </p>
              <p className="navdhan-why-works-message">
                {t("why_works.message")}
              </p>
            </m.div>

            <div className="navdhan-why-works-features">
              <FeatureBullet text={t("why_works.features.1")} delay={0.15} />
              <FeatureBullet text={t("why_works.features.2")} delay={0.2} />
              <FeatureBullet text={t("why_works.features.3")} delay={0.25} />
              <FeatureBullet text={t("why_works.features.4")} delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="navdhan-integrations">
        <div className="navdhan-container">
          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="navdhan-integrations-header"
          >
            <h2 className="navdhan-section-title">
              {t("integrations.title")}
            </h2>
            <p className="navdhan-integrations-subtitle">
              {t("integrations.subtitle")}
            </p>
          </m.div>

          <div className="navdhan-integrations-grid">
            <IntegrationLayer
              label={t("integrations.marketplace_partners.label")}
              items={[
                t("integrations.marketplace_partners.items.1"),
                t("integrations.marketplace_partners.items.2"),
                t("integrations.marketplace_partners.items.3"),
              ]}
              delay={0.1}
            />
            <IntegrationLayer
              label={t("integrations.lender_systems.label")}
              items={[
                t("integrations.lender_systems.items.1"),
                t("integrations.lender_systems.items.2"),
                t("integrations.lender_systems.items.3"),
              ]}
              delay={0.2}
            />
            <IntegrationLayer
              label={t("integrations.data_infra.label")}
              items={[
                t("integrations.data_infra.items.1"),
                t("integrations.data_infra.items.2"),
                t("integrations.data_infra.items.3"),
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* For Banks */}
      <section className="navdhan-for-banks">
        <div className="navdhan-container">
          <CTASection
            title={t("for_banks.title")}
            subtitle={t("for_banks.subtitle")}
            features={[
              t("for_banks.features.1"),
              t("for_banks.features.2"),
              t("for_banks.features.3"),
              t("for_banks.features.4"),
            ]}
            tagline={t("for_banks.tagline")}
            ctaText={t("for_banks.cta")}
            ctaEmail={t("for_banks.cta_email")}
            alignment="left"
          />
        </div>
      </section>

      {/* For MSMEs */}
      <section className="navdhan-for-msmes">
        <div className="navdhan-container">
          <CTASection
            title={t("for_msmes.title")}
            subtitle={t("for_msmes.subtitle")}
            features={[
              t("for_msmes.features.1"),
              t("for_msmes.features.2"),
            ]}
            alignment="right"
          />
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
