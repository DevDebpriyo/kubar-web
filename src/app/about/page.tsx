"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import "./about.css";

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

/* ─── Mission Section ────────────────────────────────────── */
function MissionSection() {
  const t = useTranslations("about");

  return (
    <section className="about-mission-section">
      <div className="about-container">
        {/* Hero subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="about-badge-container"
        >
          <div className="about-badge">{t("mission_section.subtitle")}</div>
        </motion.div>

        {/* Main message */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="about-mission-content"
        >
          {/* Intro */}
          <motion.p
            variants={fadeInUp}
            className="about-mission-intro"
          >
            {t("mission_section.intro")}
          </motion.p>

          {/* Emphasis line */}
          <motion.div
            variants={fadeInUp}
            className="about-emphasis-line"
          >
            {t("mission_section.message")}
          </motion.div>

          {/* Full description */}
          <motion.p
            variants={fadeInUp}
            className="about-mission-description"
          >
            {t("mission_section.description")}
          </motion.p>
        </motion.div>

        {/* Background elements */}
        <div className="about-mission-bg" aria-hidden="true">
          <div className="about-gradient-orb-1" />
          <div className="about-gradient-orb-2" />
        </div>
      </div>
    </section>
  );
}

/* ─── Story Section (01) ────────────────────────────────── */
function StorySection() {
  const t = useTranslations("about");

  return (
    <section className="about-story-section">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="about-numbered-section"
        >
          {/* Badge number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="about-badge-number"
          >
            {t("story_section.badge")}
          </motion.div>

          {/* Title and content grid */}
          <div className="about-section-grid">
            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="about-section-title-col"
            >
              <h2 className="about-section-title">
                {t("story_section.title")}
              </h2>
              <p className="about-section-subtitle">
                {t("story_section.subtitle")}
              </p>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="about-section-content"
            >
              <motion.p variants={fadeInUp} className="about-highlight-text">
                {t("story_section.question")}
              </motion.p>

              <motion.p variants={fadeInUp} className="about-body-text">
                {t("story_section.description")}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="about-insight-text"
              >
                {t("story_section.insight")}
              </motion.p>

              <motion.p variants={fadeInUp} className="about-body-text">
                {t("story_section.closing")}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="about-section-divider"
      />
    </section>
  );
}

/* ─── Vision Section (02) ────────────────────────────────── */
function VisionSection() {
  const t = useTranslations("about");

  return (
    <section className="about-vision-section">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="about-numbered-section"
        >
          {/* Badge number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="about-badge-number about-badge-blue"
          >
            {t("vision_section.badge")}
          </motion.div>

          {/* Title and content grid */}
          <div className="about-section-grid">
            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="about-section-title-col"
            >
              <h2 className="about-section-title">
                {t("vision_section.title")}
              </h2>
              <p className="about-section-subtitle">
                {t("vision_section.subtitle")}
              </p>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="about-section-content"
            >
              <motion.p variants={fadeInUp} className="about-body-text">
                {t("vision_section.description")}
              </motion.p>

              <motion.p variants={fadeInUp} className="about-highlight-text">
                {t("vision_section.goal")}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="about-section-divider"
      />
    </section>
  );
}

/* ─── Team Section (03) ──────────────────────────────────── */
function TeamSection() {
  const t = useTranslations("about");

  return (
    <section className="about-team-section">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="about-numbered-section"
        >
          {/* Badge number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="about-badge-number"
          >
            {t("team_section.badge")}
          </motion.div>

          {/* Title and content grid */}
          <div className="about-section-grid">
            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="about-section-title-col"
            >
              <h2 className="about-section-title">
                {t("team_section.title")}
              </h2>
              <p className="about-section-subtitle">
                {t("team_section.subtitle")}
              </p>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="about-section-content"
            >
              <motion.p variants={fadeInUp} className="about-body-text">
                {t("team_section.description")}
              </motion.p>

              <motion.p variants={fadeInUp} className="about-highlight-text">
                {t("team_section.closing")}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="about-section-divider"
      />
    </section>
  );
}

/* ─── Closing Section ────────────────────────────────────── */
function ClosingSection() {
  const t = useTranslations("about");

  return (
    <section className="about-closing-section">
      <div className="about-closing-content">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="about-closing-title"
        >
          {t("closing_section.title")}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="about-closing-text-group"
        >
          <motion.p
            variants={fadeInUp}
            className="about-closing-message"
          >
            {t("closing_section.message")}
          </motion.p>

          <motion.div variants={fadeInUp} className="about-closing-emphasis">
            <p>{t("closing_section.final")}</p>
            <p>{t("closing_section.brand")}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="about-closing-bg" aria-hidden="true">
        <div className="about-gradient-orb-3" />
        <div className="about-gradient-orb-4" />
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────── */
function CTASection() {
  const t = useTranslations("about");

  return (
    <section className="about-cta-section">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="about-cta-card"
      >
        <div className="about-cta-content">
          <h2 className="about-cta-title">
            {t("cta_section.title")}
          </h2>
          <p className="about-cta-description">
            {t("cta_section.description")}
          </p>
        </div>

        <motion.a
          href={`mailto:${t("cta_section.button_email")}`}
          className="about-cta-button"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span>{t("cta_section.button")}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="about-main">
      <Navbar />
      <MissionSection />
      <StorySection />
      <VisionSection />
      <TeamSection />
      <ClosingSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
