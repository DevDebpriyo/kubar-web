"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import "./contact.css";

/* ─── Animation Variants ─────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/* ─── Contact Form Component ────────────────────────────── */
function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="contact-form"
    >
      {/* Two-column input row */}
      <div className="contact-form-row">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="contact-form-group"
        >
          <label className="contact-label">
            {t("form.first_name_label")}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t("form.first_name_placeholder")}
            className="contact-input"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="contact-form-group"
        >
          <label className="contact-label">
            {t("form.last_name_label")}
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t("form.last_name_placeholder")}
            className="contact-input"
            required
          />
        </motion.div>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.email_label")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("form.email_placeholder")}
          className="contact-input"
          required
        />
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.phone_label")}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t("form.phone_placeholder")}
          className="contact-input"
        />
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.message_label")}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("form.message_placeholder")}
          className="contact-textarea"
          rows={5}
          required
        />
      </motion.div>

      {/* Status message */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="contact-status-success"
        >
          ✓ {t("form.success")}
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="contact-status-error"
        >
          ✕ {t("form.error")}
        </motion.div>
      )}

      {/* Submit button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="contact-submit-btn"
      >
        {isSubmitting ? t("form.submitting") : t("form.submit")}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </motion.button>
    </motion.form>
  );
}

/* ─── Contact Info Component ────────────────────────────── */
function ContactInfo() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      label: t("contact_info.partner_label"),
      email: t("contact_info.partner_email"),
      icon: "🤝",
      delay: 0.1,
    },
    {
      label: t("contact_info.support_label"),
      email: t("contact_info.support_email"),
      icon: "💬",
      delay: 0.15,
    },
    {
      label: t("contact_info.media_label"),
      email: t("contact_info.media_email"),
      icon: "📢",
      delay: 0.2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="contact-info-section"
    >
      <motion.h2
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="contact-info-heading"
      >
        {t("contact_info.heading")}
      </motion.h2>

      <div className="contact-info-list">
        {contactItems.map((item) => (
          <motion.a
            key={item.email}
            href={`mailto:${item.email}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: item.delay }}
            whileHover={{ x: 4 }}
            className="contact-info-item"
          >
            <div className="contact-info-icon">{item.icon}</div>
            <div className="contact-info-content">
              <p className="contact-info-label">{item.label}</p>
              <p className="contact-info-email">{item.email}</p>
            </div>
            <Mail className="contact-info-arrow" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main className="contact-main">
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="contact-hero-content"
          >
            <motion.h1
              variants={fadeInUp}
              className="contact-hero-title"
            >
              {t("main_heading")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="contact-hero-description"
            >
              {t("main_description")}
            </motion.p>
          </motion.div>

          {/* Background elements */}
          <div className="contact-hero-bg" aria-hidden="true">
            <div className="contact-gradient-orb-1" />
            <div className="contact-gradient-orb-2" />
          </div>
        </div>
      </section>

      {/* Form + Info Section */}
      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-grid">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </main>
  );
}
