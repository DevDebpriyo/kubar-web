"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ComponentProps,
} from "react";
import {
  m,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

type NavLink = {
  label: string;
  href: string;
};

type NavbarVariant = "source" | "approved";

function IntentLink({
  href,
  onPointerEnter,
  onFocus,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const prefetch = () => {
    if (typeof href === "string" && href.startsWith("/")) {
      router.prefetch(href);
    }
  };

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onPointerEnter={(event) => {
        prefetch();
        onPointerEnter?.(event);
      }}
      onFocus={(event) => {
        prefetch();
        onFocus?.(event);
      }}
    />
  );
}

function KubarLogo() {
  const t = useTranslations("nav");

  return (
    <IntentLink href="/" className="group shrink-0" aria-label={t("logo_alt")}>
      <Image
        src="/logo.png"
        alt={t("logo_alt")}
        width={144}
        height={42}
        sizes="144px"
        priority
        className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-90"
      />
    </IntentLink>
  );
}

function ProductsDropdown({ variant }: { variant: NavbarVariant }) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const products =
    variant === "approved"
      ? [
          {
            name: "NavDhan",
            description:
              "Unified credit infrastructure for commerce-tech and B2B platforms",
            href: "/products/navdhan",
          },
          {
            name: "Kubar Protocol",
            description:
              "Cross-border trade-finance infrastructure in development",
            href: "/products/kubar-protocol",
          },
        ]
      : [
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
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
      className="relative"
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsOpen(false);
        }}
        className="relative px-3.5 py-2 text-[13.5px] font-medium text-white/55 hover:text-white rounded-lg transition-colors duration-200 group flex items-center gap-1.5"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="desktop-products-menu"
      >
        <span className="relative z-10">{t("products")}</span>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </m.div>
        {/* Hover background */}
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="desktop-products-menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-white/10 bg-[rgba(10,10,22,0.95)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,22,0.95) 0%, rgba(15,15,30,0.95) 100%)",
            }}
          >
            <div className="p-2">
              {products.map((product, idx) => (
                <m.div
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
                    <IntentLink
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
                    </IntentLink>
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
                </m.div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function SocialsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { name: "Substack", href: "https://kubarlabs.substack.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/kubarlabs/" },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
      className="relative"
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsOpen(false);
        }}
        className="relative px-3.5 py-2 text-[13.5px] font-medium text-white/55 hover:text-white rounded-lg transition-colors duration-200 group flex items-center gap-1.5"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="desktop-socials-menu"
      >
        <span className="relative z-10">Socials</span>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </m.div>
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            id="desktop-socials-menu"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/10 bg-[rgba(10,10,22,0.95)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,22,0.95) 0%, rgba(15,15,30,0.95) 100%)",
            }}
          >
            <div className="p-2">
              {socials.map((s) => (
                <m.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/6"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-4 h-4 text-white/50 group-hover:text-[#f5bc35] transition-colors shrink-0">
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
                  <div className="font-medium text-[14px] text-white group-hover:text-[#f5bc35]">
                    {s.name}
                  </div>
                </m.a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function DesktopNav({
  navLinks,
  variant,
}: {
  navLinks: NavLink[];
  variant: NavbarVariant;
}) {
  const t = useTranslations("nav");
  // Filter out 'products' and 'socials' from navLinks as we handle them separately
  const filteredLinks = navLinks.filter((link) => link.href !== "#products" && link.href !== "#socials");

  return (
    <nav
      className="hidden lg:flex items-center gap-0.5"
      aria-label={t("main_nav_aria")}
    >
      {/* Products Dropdown */}
      <ProductsDropdown variant={variant} />

      {/* Other nav links */}
      {filteredLinks.map((link, i) => (
        <m.div
          key={link.href}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15 + i * 0.06,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <IntentLink
            href={link.href}
            className="relative px-3.5 py-2 text-[13.5px] font-medium text-white/55 hover:text-white rounded-lg transition-colors duration-200 group"
          >
            <span className="relative z-10">{link.label}</span>
            {/* Hover background */}
            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
          </IntentLink>
        </m.div>
      ))}

      {/* Socials Dropdown */}
      <SocialsDropdown />
    </nav>
  );
}

function CTAButton({ ctaLabel }: { ctaLabel: string }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="hidden lg:flex items-center"
    >
      <IntentLink
        href="/contact"
        className="group flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-[#080602] bg-linear-to-r from-[#f5bc35] to-[#d4920c] hover:from-[#f8c94a] hover:to-[#e09d12] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(212,146,12,0.35)] hover:scale-103 active:scale-97"
      >
        {ctaLabel}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </IntentLink>
    </m.div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  ctaLabel,
  closeMenuAria,
  mobileNavAria,
  variant,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  ctaLabel: string;
  closeMenuAria: string;
  mobileNavAria: string;
  variant: NavbarVariant;
}) {
  const t = useTranslations("nav");
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  const products =
    variant === "approved"
      ? [
          {
            name: "NavDhan",
            description:
              "Unified credit infrastructure for commerce-tech and B2B platforms",
            href: "/products/navdhan",
          },
          {
            name: "Kubar Protocol",
            description:
              "Cross-border trade-finance infrastructure in development",
            href: "/products/kubar-protocol",
          },
        ]
      : [
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
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#04040c]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <m.div
            ref={drawerRef}
            key="drawer"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/9 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={mobileNavAria}
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
                ref={closeButtonRef}
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
              <m.div
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
                  aria-expanded={isProductsOpen}
                  aria-controls="mobile-products-menu"
                  className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  <span>{t("products")}</span>
                  <m.div
                    animate={{ rotate: isProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </m.div>
                </button>

                {/* Product items */}
                <AnimatePresence>
                  {isProductsOpen && (
                    <m.div
                      id="mobile-products-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {products.map((product, idx) => (
                          <m.div
                            key={product.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: idx * 0.05,
                              duration: 0.2,
                            }}
                          >
                            {product.href ? (
                              <IntentLink
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
                              </IntentLink>
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
                          </m.div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>

              {/* Other nav links */}
              {filteredLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.05,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                >
                  <IntentLink
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-3 py-3 text-[15px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </IntentLink>
                </m.div>
              ))}

              {/* Socials section */}
              <m.div
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
                  aria-expanded={isSocialsOpen}
                  aria-controls="mobile-socials-menu"
                  className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  <span>Socials</span>
                  <m.div
                    animate={{ rotate: isSocialsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </m.div>
                </button>

                <AnimatePresence>
                  {isSocialsOpen && (
                    <m.div
                      id="mobile-socials-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {socials.map((s, idx) => (
                          <m.div
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
                              className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 group"
                            >
                              <div className="w-4 h-4 text-white/50 group-hover:text-[#f5bc35] transition-colors">
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
                              <span className="font-medium text-white/75 group-hover:text-white">
                                {s.name}
                              </span>
                            </a>
                          </m.div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </nav>

            {/* CTA */}
            <div className="px-5 pb-5 pt-2">
              <IntentLink
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[14px] text-[#080602] bg-linear-to-r from-[#f5bc35] to-[#d4920c] hover:from-[#f8c94a] hover:to-[#e09d12] transition-all duration-200"
              >
                {ctaLabel}
                <ArrowUpRight className="w-4 h-4" />
              </IntentLink>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar({ variant = "approved" }: { variant?: NavbarVariant }) {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollProgress = useMotionValue(0);
  const scrollProgressOpacity = useTransform(
    scrollProgress,
    [0, 0.02],
    [0, 0.7],
  );
  const isScrolledRef = useRef(false);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const navLinks: NavLink[] = [
    { label: t("products"), href: "#products" },
    { label: "Socials", href: "#socials" },
    {
      label: variant === "approved" ? "About" : t("about"),
      href: "/about",
    },
    { label: t("contact"), href: "/contact" },
    {
      label: variant === "approved" ? "Team" : t("team"),
      href: "/team",
    },
  ];
  const ctaLabel = variant === "approved" ? "Get in touch" : t("cta");

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

          const nextIsScrolled = scrollY > 24;
          if (nextIsScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextIsScrolled;
            setIsScrolled(nextIsScrolled);
          }
          // Progress for the thin top border line (0 → 1 over the full page scroll)
          const progress = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;
          scrollProgress.set(Math.min(Math.max(progress, 0), 1));
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

      const nextIsScrolled = lenisScroll > 24;
      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
      scrollProgress.set(Math.min(Math.max(lenisProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleLenisScroll as EventListener);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleLenisScroll as EventListener);
    };
  }, [scrollProgress]);

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
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
        <m.div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#d4920c] via-[#f5bc35] to-[#d4920c] transition-opacity duration-500"
          style={{
            width: "100%",
            scaleX: scrollProgress,
            transformOrigin: "left",
            opacity: scrollProgressOpacity,
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-17">
            {/* Logo */}
            <m.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <KubarLogo />
            </m.div>

            {/* Desktop nav (centered) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <DesktopNav navLinks={navLinks} variant={variant} />
            </div>

            {/* Right side: CTA + mobile trigger */}
            <div className="flex shrink-0 items-center gap-3">
              <CTAButton ctaLabel={ctaLabel} />

              {/* Mobile menu button */}
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex lg:hidden w-9 h-9 shrink-0 rounded-xl border border-white/10 items-center justify-center text-white/85 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                aria-label={t("open_menu_aria")}
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </m.button>
            </div>
          </div>
        </div>
      </m.header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navLinks={navLinks}
        ctaLabel={ctaLabel}
        closeMenuAria={t("close_menu_aria")}
        mobileNavAria={t("mobile_nav_aria")}
        variant={variant}
      />
    </>
  );
}
