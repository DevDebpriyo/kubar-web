"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

type NavLink = {
  label: string;
  href: string;
};

function KubarLogo() {
  const t = useTranslations("nav");

  return (
    <Link href="/" className="group shrink-0" aria-label={t("logo_alt")}>
      <Image
        src="/logo.png"
        alt={t("logo_alt")}
        width={144}
        height={42}
        priority
        className="h-9 w-auto transition-all duration-300 group-hover:opacity-90 brightness-0 dark:brightness-100"
      />
    </Link>
  );
}

function ProductsDropdown() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    {
      name: t("products_dropdown.navdhan.name"),
      description: t("products_dropdown.navdhan.description"),
      href: t("products_dropdown.navdhan.href"),
    },
    {
      name: t("products_dropdown.bre.name"),
      description: t("products_dropdown.bre.description"),
      status: t("products_dropdown.bre.status"),
    },
    {
      name: t("products_dropdown.underwriting.name"),
      description: t("products_dropdown.underwriting.description"),
      status: t("products_dropdown.underwriting.status"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      <button
        className="relative px-3.5 py-2 text-[13.5px] font-medium text-foreground/70 hover:text-foreground dark:text-white/55 dark:hover:text-white rounded-lg transition-colors duration-200 group flex items-center gap-1.5 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="relative z-10">{t("products")}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
        {/* Hover background */}
        <span className="absolute inset-0 rounded-lg bg-foreground/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-border dark:border-white/10 bg-card/95 dark:bg-[rgba(10,10,22,0.95)] backdrop-blur-xl shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
          >
            <div className="p-2">
              {products.map((product, idx) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  {product.href ? (
                    <Link
                      href={product.href}
                      className="group relative block px-4 py-3.5 rounded-lg transition-all duration-200 hover:bg-accent dark:hover:bg-white/6 active:bg-accent/80"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#d4920c] to-[#f5bc35] shrink-0" />
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[14px] text-foreground group-hover:text-[#d4920c] dark:text-white dark:group-hover:text-[#f5bc35] transition-colors duration-200">
                            {product.name}
                          </div>
                          <div className="text-[12.5px] text-muted-foreground dark:text-white/45 group-hover:text-foreground/80 dark:group-hover:text-white/60 transition-colors duration-200 line-clamp-2">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="group relative block w-full text-left px-4 py-3.5 rounded-lg transition-all duration-200 cursor-not-allowed opacity-70 hover:bg-accent/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[14px] text-muted-foreground dark:text-white/60">
                              {product.name}
                            </div>
                            <div className="text-[12.5px] text-muted-foreground/60 dark:text-white/35 line-clamp-2">
                              {product.description}
                            </div>
                          </div>
                        </div>
                        {/* Status Badge */}
                        {product.status && (
                          <div className="shrink-0 px-2 py-1 rounded-full bg-muted border border-border text-[11px] font-medium text-muted-foreground dark:bg-white/8 dark:border-white/15 dark:text-white/50 whitespace-nowrap">
                            {product.status}
                          </div>
                        )}
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SocialsDropdown() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { name: "Substack", href: "https://kubarlabs.substack.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/kubarlabs/" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      <button
        className="relative px-3.5 py-2 text-[13.5px] font-medium text-foreground/70 hover:text-foreground dark:text-white/55 dark:hover:text-white rounded-lg transition-colors duration-200 group flex items-center gap-1.5 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="relative z-10">Socials</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
        <span className="absolute inset-0 rounded-lg bg-foreground/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border dark:border-white/10 bg-card/95 dark:bg-[rgba(10,10,22,0.95)] backdrop-blur-xl shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
          >
            <div className="p-2">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 hover:bg-accent dark:hover:bg-white/6"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-4 h-4 text-muted-foreground group-hover:text-[#d4920c] dark:text-white/50 dark:group-hover:text-[#f5bc35] transition-colors shrink-0">
                    {s.name === "LinkedIn" ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.851 0-2.133 1.445-2.133 2.939v5.667H9.353V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.264 2.372 4.264 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                      </svg>
                    )}
                  </div>
                  <div className="font-medium text-[14px] text-foreground group-hover:text-[#d4920c] dark:text-white dark:group-hover:text-[#f5bc35]">
                    {s.name}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DesktopNav({ navLinks }: { navLinks: NavLink[] }) {
  const t = useTranslations("nav");
  const filteredLinks = navLinks.filter((link) => link.href !== "#products" && link.href !== "#socials");

  return (
    <nav
      className="hidden lg:flex items-center gap-0.5"
      aria-label={t("main_nav_aria")}
    >
      <ProductsDropdown />

      {filteredLinks.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + i * 0.06,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <Link
            href={link.href}
            className="relative px-3.5 py-2 text-[13.5px] font-medium text-foreground/70 hover:text-foreground dark:text-white/55 dark:hover:text-white rounded-lg transition-colors duration-200 group"
          >
            <span className="relative z-10">{link.label}</span>
            <span className="absolute inset-0 rounded-lg bg-foreground/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
        </motion.div>
      ))}

      <SocialsDropdown />
    </nav>
  );
}

function CTAButton({ ctaLabel }: { ctaLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="hidden lg:flex items-center"
    >
      <Link
        href="/contact"
        className="group flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-[#080602] bg-linear-to-r from-[#f5bc35] to-[#d4920c] hover:from-[#f8c94a] hover:to-[#e09d12] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,146,12,0.35)] hover:scale-103 active:scale-97 cursor-pointer select-none"
      >
        {ctaLabel}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  ctaLabel,
  closeMenuAria,
  mobileNavAria,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  ctaLabel: string;
  closeMenuAria: string;
  mobileNavAria: string;
}) {
  const t = useTranslations("nav");
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const products = [
    {
      name: t("products_dropdown.navdhan.name"),
      description: t("products_dropdown.navdhan.description"),
      href: t("products_dropdown.navdhan.href"),
    },
    {
      name: t("products_dropdown.bre.name"),
      description: t("products_dropdown.bre.description"),
      status: t("products_dropdown.bre.status"),
    },
    {
      name: t("products_dropdown.underwriting.name"),
      description: t("products_dropdown.underwriting.description"),
      status: t("products_dropdown.underwriting.status"),
    },
  ];

  const socials = [
    { name: "Substack", href: "https://kubarlabs.substack.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/kubarlabs/" },
  ];

  const filteredLinks = navLinks.filter((link) => link.href !== "#products" && link.href !== "#socials");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm dark:bg-[#04040c]/60"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-border dark:border-white/9 overflow-hidden bg-card/95 dark:bg-[rgba(8,8,20,0.96)] backdrop-blur-2xl shadow-2xl"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-white/7">
              <KubarLogo />
              <div className="flex items-center gap-2">
                <AnimatedThemeToggler
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-secondary text-foreground hover:bg-accent transition-all duration-200 cursor-pointer"
                  duration={400}
                  variant="circle"
                />
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-border dark:border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground dark:text-white/60 dark:hover:text-white transition-all duration-200"
                  aria-label={closeMenuAria}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="px-3 py-3" aria-label={mobileNavAria}>
              {/* Products section */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.06,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-foreground/80 dark:text-white/65 hover:text-foreground dark:hover:text-white rounded-xl hover:bg-accent dark:hover:bg-white/5 transition-all duration-200"
                >
                  <span>{t("products")}</span>
                  <motion.div
                    animate={{ rotate: isProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Product items */}
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {products.map((product, idx) => (
                          <motion.div
                            key={product.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: idx * 0.05,
                              duration: 0.2,
                            }}
                          >
                            {product.href ? (
                              <Link
                                href={product.href}
                                onClick={onClose}
                                className="flex flex-col px-3 py-2.5 text-[14px] text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent dark:hover:bg-white/5 transition-all duration-200 group"
                              >
                                <span className="font-medium text-foreground/85 dark:text-white/75 group-hover:text-foreground dark:group-hover:text-white">
                                  {product.name}
                                </span>
                                <span className="text-[12px] text-muted-foreground/80 dark:text-white/40 group-hover:text-muted-foreground">
                                  {product.description}
                                </span>
                              </Link>
                            ) : (
                              <div className="flex items-start justify-between gap-2 px-3 py-2.5 text-[14px] opacity-60">
                                <div>
                                  <div className="font-medium text-muted-foreground dark:text-white/60">
                                    {product.name}
                                  </div>
                                  <div className="text-[12px] text-muted-foreground/60 dark:text-white/40">
                                    {product.description}
                                  </div>
                                </div>
                                {product.status && (
                                  <div className="shrink-0 px-2 py-1 rounded-full bg-muted border border-border text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                                    {product.status}
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other nav links */}
              {filteredLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.05,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-3 py-3 text-[15px] font-medium text-foreground/80 dark:text-white/65 hover:text-foreground dark:hover:text-white rounded-xl hover:bg-accent dark:hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Socials section */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <button
                  onClick={() => setIsSocialsOpen(!isSocialsOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-foreground/80 dark:text-white/65 hover:text-foreground dark:hover:text-white rounded-xl hover:bg-accent dark:hover:bg-white/5 transition-all duration-200"
                >
                  <span>Socials</span>
                  <motion.div
                    animate={{ rotate: isSocialsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSocialsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {socials.map((s, idx) => (
                          <motion.div
                            key={s.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.18 }}
                          >
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent dark:hover:bg-white/5 transition-all duration-200 group"
                            >
                              <div className="w-4 h-4 text-muted-foreground group-hover:text-[#d4920c] dark:text-white/50 dark:group-hover:text-[#f5bc35] transition-colors">
                                {s.name === "LinkedIn" ? (
                                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.851 0-2.133 1.445-2.133 2.939v5.667H9.353V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.264 2.372 4.264 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                                  </svg>
                                )}
                              </div>
                              <span className="font-medium text-foreground/85 dark:text-white/75 group-hover:text-foreground dark:group-hover:text-white">
                                {s.name}
                              </span>
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </nav>

            {/* CTA */}
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[14px] text-[#080602] bg-linear-to-r from-[#f5bc35] to-[#d4920c] hover:from-[#f8c94a] hover:to-[#e09d12] transition-all duration-200"
              >
                {ctaLabel}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navLinks: NavLink[] = [
    { label: t("products"), href: "#products" },
    { label: "Socials", href: "#socials" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
    { label: t("team"), href: "/team" },
  ];

  useEffect(() => {
    let ticking = false;
    let hasLenisSignal = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (hasLenisSignal) {
            ticking = false;
            return;
          }

          const scrollingElement =
            document.scrollingElement ?? document.documentElement;
          const scrollY = window.scrollY;
          const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
          );
          const scrollableHeight = Math.max(
            scrollingElement.scrollHeight - window.innerHeight,
            documentHeight - window.innerHeight,
          );

          setIsScrolled(scrollY > 24);
          const progress = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;
          setScrollProgress(Math.min(Math.max(progress, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleLenisScroll = (event: Event) => {
      const customEvent = event as CustomEvent<{
        progress?: number;
        scroll?: number;
      }>;

      hasLenisSignal = true;

      const lenisProgress = customEvent.detail?.progress ?? 0;
      const lenisScroll = customEvent.detail?.scroll ?? 0;

      setIsScrolled(lenisScroll > 24);
      setScrollProgress(Math.min(Math.max(lenisProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleLenisScroll as EventListener);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleLenisScroll as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 dark:bg-[#04040c]/82 backdrop-blur-xl border-b border-border dark:border-white/7 shadow-sm dark:shadow-none"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Scroll-progress line at top */}
        <div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#d4920c] via-[#f5bc35] to-[#d4920c] transition-opacity duration-500"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress > 0.02 ? 0.85 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-17">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <KubarLogo />
            </motion.div>

            {/* Desktop nav (centered) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <DesktopNav navLinks={navLinks} />
            </div>

            {/* Right side: Theme Toggler + CTA + mobile trigger */}
            <div className="flex shrink-0 items-center gap-3">
              <AnimatedThemeToggler
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border dark:border-white/12 bg-card/80 dark:bg-white/5 text-foreground dark:text-white hover:bg-secondary dark:hover:bg-white/10 transition-all duration-200 cursor-pointer shadow-xs"
                duration={450}
                variant="circle"
              />

              <CTAButton ctaLabel={t("cta")} />

              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex lg:hidden w-9 h-9 shrink-0 rounded-xl border border-border dark:border-white/10 items-center justify-center text-foreground/85 dark:text-white/85 hover:text-foreground dark:hover:text-white hover:bg-accent dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
                aria-label={t("open_menu_aria")}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        ctaLabel={t("cta")}
        closeMenuAria={t("close_menu_aria")}
        mobileNavAria={t("mobile_nav_aria")}
      />
    </>
  );
}
