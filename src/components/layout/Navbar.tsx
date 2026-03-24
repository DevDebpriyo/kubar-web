"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

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
        className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-90"
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
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative"
    >
      <button
        className="relative px-3.5 py-2 text-[13.5px] font-medium text-white/55 hover:text-white rounded-lg transition-colors duration-200 group flex items-center gap-1.5"
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
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-white/10 bg-[rgba(10,10,22,0.95)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,22,0.95) 0%, rgba(15,15,30,0.95) 100%)",
            }}
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
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {product.href ? (
                    <Link
                      href={product.href}
                      className="group relative block px-4 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/6 active:bg-white/8"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#d4920c] to-[#f5bc35] shrink-0" />
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[14px] text-white group-hover:text-[#f5bc35] transition-colors duration-200">
                            {product.name}
                          </div>
                          <div className="text-[12.5px] text-white/45 group-hover:text-white/60 transition-colors duration-200 line-clamp-2">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="group relative block w-full text-left px-4 py-3.5 rounded-lg transition-all duration-200 cursor-not-allowed opacity-70 hover:bg-white/3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[14px] text-white/60">
                              {product.name}
                            </div>
                            <div className="text-[12.5px] text-white/35 line-clamp-2">
                              {product.description}
                            </div>
                          </div>
                        </div>
                        {/* Status Badge */}
                        {product.status && (
                          <div className="shrink-0 px-2 py-1 rounded-full bg-white/8 border border-white/15 text-[11px] font-medium text-white/50 whitespace-nowrap">
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

function DesktopNav({ navLinks }: { navLinks: NavLink[] }) {
  const t = useTranslations("nav");
  // Filter out 'products' from navLinks as we handle it separately
  const filteredLinks = navLinks.filter((link) => link.href !== "#products");

  return (
    <nav
      className="hidden lg:flex items-center gap-0.5"
      aria-label={t("main_nav_aria")}
    >
      {/* Products Dropdown */}
      <ProductsDropdown />

      {/* Other nav links */}
      {filteredLinks.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            href={link.href}
            className="relative px-3.5 py-2 text-[13.5px] font-medium text-white/55 hover:text-white rounded-lg transition-colors duration-200 group"
          >
            <span className="relative z-10">{link.label}</span>
            {/* Hover background */}
            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}

function CTAButton({ ctaLabel }: { ctaLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex items-center"
    >
      <Link
        href="/contact"
        className="group flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-[#080602] bg-linear-to-r from-[#f5bc35] to-[#d4920c] hover:from-[#f8c94a] hover:to-[#e09d12] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,146,12,0.35)] hover:scale-103 active:scale-97"
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

  const filteredLinks = navLinks.filter((link) => link.href !== "#products");

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
            className="fixed inset-0 z-40 bg-[#04040c]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/9 overflow-hidden"
            style={{
              background: "rgba(8, 8, 20, 0.96)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              boxShadow:
                "0 16px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
              <KubarLogo />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label={closeMenuAria}
              >
                <X className="w-4 h-4" />
              </button>
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
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
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
                                className="flex flex-col px-3 py-2.5 text-[14px] text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 group"
                              >
                                <span className="font-medium text-white/75 group-hover:text-white">
                                  {product.name}
                                </span>
                                <span className="text-[12px] text-white/40 group-hover:text-white/50">
                                  {product.description}
                                </span>
                              </Link>
                            ) : (
                              <div className="flex items-start justify-between gap-2 px-3 py-2.5 text-[14px] opacity-60">
                                <div>
                                  <div className="font-medium text-white/60">
                                    {product.name}
                                  </div>
                                  <div className="text-[12px] text-white/40">
                                    {product.description}
                                  </div>
                                </div>
                                {product.status && (
                                  <div className="shrink-0 px-2 py-1 rounded-full bg-white/8 border border-white/15 text-[10px] font-medium text-white/50 whitespace-nowrap">
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
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-3 py-3 text-[15px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
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
          // Progress for the thin top border line (0 → 1 over the full page scroll)
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
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
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? "rgba(4, 4, 12, 0.82)" : "transparent",
          backdropFilter: isScrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: isScrolled
            ? "blur(24px) saturate(1.6)"
            : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.065)"
            : "1px solid transparent",
        }}
      >
        {/* Scroll-progress line at very top */}
        <div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#d4920c] via-[#f5bc35] to-[#d4920c] transition-opacity duration-500"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: scrollProgress > 0.02 ? 0.7 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-17">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <KubarLogo />
            </motion.div>

            {/* Desktop nav (centered) */}
            <div className="flex-1 flex justify-center">
              <DesktopNav navLinks={navLinks} />
            </div>

            {/* Right side: CTA + mobile trigger */}
            <div className="flex items-center gap-3">
              <CTAButton ctaLabel={t("cta")} />

              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                aria-label={t("open_menu_aria")}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-4.5 h-4.5" />
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
