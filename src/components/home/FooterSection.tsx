"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./FooterSection.css";

export function FooterSection() {
  const t = useTranslations("footer");

  const footerLinks = [
    { label: t("links.about"), href: "/about" },
    { label: t("links.navdhan"), href: "/products/navdhan" },
    { label: t("links.contact"), href: "/contact" },
    { label: t("links.privacy"), href: "#privacy" },
    { label: "Substack", href: "https://kubarlabs.substack.com/" },
  ];

  return (
    <footer className="footer-section">
      {/* Animated background gradients */}
      <div className="footer-bg-gradient-1" aria-hidden="true" />
      <div className="footer-bg-gradient-2" aria-hidden="true" />

      <div className="footer-container">
        {/* Main CTA Section */}
        <motion.div
          className="footer-cta-section"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Main heading */}
          <motion.h2
            className="footer-main-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {t("main_cta_title")}
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            className="footer-cta-buttons"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Email CTA */}
            <motion.a
              href={`mailto:${t("email_link")}`}
              className="footer-btn footer-btn-primary"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Mail className="footer-btn-icon" />
              <motion.div
                className="footer-btn-shine"
                animate={{
                  opacity: [0, 0.3, 0],
                  x: [-100, 100],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
            </motion.a>

            {/* Schedule Call CTA */}
            <motion.a
              href={t("schedule_link")}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn footer-btn-secondary"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Calendar className="footer-btn-icon" />
              <span>{t("schedule_call")}</span>
              <motion.div
                className="footer-btn-arrow"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="footer-divider"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          aria-hidden="true"
        />

        {/* Footer Navigation */}
        <motion.nav
          className="footer-nav"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <ul className="footer-nav-list">
            {footerLinks.map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.45 + index * 0.05,
                  duration: 0.5,
                }}
              >
                <Link href={link.href} className="footer-nav-link">
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Bottom section with copyright and credits */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="footer-bottom-line" aria-hidden="true" />

          <div className="footer-bottom-content">
            {/* Copyright */}
            <p className="footer-copyright">{t("copyright")}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
