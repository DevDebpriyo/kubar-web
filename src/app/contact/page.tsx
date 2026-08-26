"use client";

import { useState, useCallback } from "react";
import { m } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { ContactSuccessModal } from "@/components/contact/ContactSuccessModal";
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
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Store the name for the modal before clearing the form
      setSubmittedName(formData.fullName.split(" ")[0]);
      setSubmitStatus("success");
      setShowSuccessModal(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        category: "",
        website: "",
      });
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <m.form
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onSubmit={handleSubmit}
        className="contact-form"
      >
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-px w-px overflow-hidden opacity-0"
        />
        {/* Full Name */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="contact-form-group"
        >
          <label htmlFor="contact-full-name" className="contact-label">
            {t("form.full_name_label")}
          </label>
          <input
            type="text"
            id="contact-full-name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t("form.full_name_placeholder")}
            className="contact-input"
            required
          />
        </m.div>

        {/* Email */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-form-group"
        >
          <label htmlFor="contact-email" className="contact-label">
            {t("form.email_label")}
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("form.email_placeholder")}
            className="contact-input"
            required
          />
        </m.div>

        {/* Phone */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="contact-form-group"
        >
          <label htmlFor="contact-phone" className="contact-label">
            {t("form.phone_label")}
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("form.phone_placeholder")}
            className="contact-input"
          />
        </m.div>

        {/* Company Name */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="contact-form-group"
        >
          <label htmlFor="contact-company" className="contact-label">
            {t("form.company_name_label")}
          </label>
          <input
            type="text"
            id="contact-company"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder={t("form.company_name_placeholder")}
            className="contact-input"
            required
          />
        </m.div>

        {/* Category */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="contact-form-group"
        >
          <label htmlFor="contact-category" className="contact-label">
            {t("form.category_label")}
          </label>
          <div className="contact-select-wrapper">
            <select
              id="contact-category"
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
        </m.div>

        {/* Error message (inline) */}
        {submitStatus === "error" && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="contact-status-error"
            role="alert"
            aria-live="assertive"
          >
            ✕ {t("form.error")}
          </m.div>
        )}

        <p className="text-xs leading-relaxed text-white/50">
          {t("form.privacy_notice")} {" "}
          <Link
            href="/privacy"
            className="text-white/70 underline underline-offset-4 transition-colors hover:text-white"
          >
            {t("form.privacy_link")}
          </Link>
        </p>

        {/* Submit button */}
        <m.button
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
          {!isSubmitting && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
        </m.button>
      </m.form>

      {/* Success Modal */}
      <ContactSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        senderName={submittedName}
      />
    </>
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
    <m.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="contact-info-section"
    >
      <m.h2
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="contact-info-heading"
      >
        {t("contact_info.heading")}
      </m.h2>

      <div className="contact-info-list">
        {contactItems.map((item) => (
          <m.a
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
          </m.a>
        ))}
      </div>
    </m.div>
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
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="contact-hero-content"
          >
            <m.h1
              variants={fadeInUp}
              className="contact-hero-title"
            >
              {t("main_heading")}
            </m.h1>
            <m.p
              variants={fadeInUp}
              className="contact-hero-description"
            >
              {t("main_description")}
            </m.p>
          </m.div>

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
