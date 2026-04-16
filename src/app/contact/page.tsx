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
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
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
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        category: "",
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onSubmit={handleSubmit}
      className="contact-form"
    >
      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.full_name_label")}
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={t("form.full_name_placeholder")}
          className="contact-input"
          required
        />
      </motion.div>

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

      {/* Company Name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.28 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.company_name_label")}
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder={t("form.company_name_placeholder")}
          className="contact-input"
          required
        />
      </motion.div>

      {/* Category */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="contact-form-group"
      >
        <label className="contact-label">
          {t("form.category_label")}
        </label>
        <div className="contact-select-wrapper">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="contact-input contact-select"
            required
          >
            <option value="" disabled hidden>
              {t("form.category_placeholder")}
            </option>
            <option value="bank">{t("form.category_options.bank")}</option>
            <option value="fintech">{t("form.category_options.fintech")}</option>
            <option value="nbfc">{t("form.category_options.nbfc")}</option>
            <option value="b2b_marketplace">{t("form.category_options.b2b_marketplace")}</option>
            <option value="b2b_platform">{t("form.category_options.b2b_platform")}</option>
            <option value="erp">{t("form.category_options.erp")}</option>
            <option value="other">{t("form.category_options.other")}</option>
          </select>
        </div>
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
