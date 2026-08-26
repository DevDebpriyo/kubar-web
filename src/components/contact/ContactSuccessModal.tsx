"use client";

import { m, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, X, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

/* ─── Overlay backdrop variants ─────────────────────────────── */
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ─── Modal container variants ──────────────────────────────── */
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.25 },
  },
};

/* ─── Child items ───────────────────────────────────────────── */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ─── Floating particle ────────────────────────────────────── */
function FloatingParticle({
  delay,
  x,
  y,
  size,
  color,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}) {
  const variation = ((x * 31 + y * 17 + size * 13 + delay * 100) % 100) / 100;

  return (
    <m.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0],
        y: [0, -40 - variation * 30],
        x: [(variation - 0.5) * 40],
      }}
      transition={{
        duration: 2 + variation,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 1 + variation * 2,
        ease: "easeOut",
      }}
    />
  );
}

/* ─── Main Success Modal ────────────────────────────────────── */
export function ContactSuccessModal({
  isOpen,
  onClose,
  senderName,
}: {
  isOpen: boolean;
  onClose: () => void;
  senderName?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll while modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Trap focus, close on Escape, and restore focus when dismissed. */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <m.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(4,4,12,0.92) 0%, rgba(4,4,12,0.97) 100%)",
              backdropFilter: "blur(12px)",
            }}
            onClick={onClose}
          />

          {/* Modal card */}
          <m.div
            ref={dialogRef}
            className="relative w-full max-w-md overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Message sent successfully"
          >
            {/* Glassmorphic card */}
            <div
              className="relative rounded-3xl p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(12,12,20,0.98) 100%)",
                border: "1px solid rgba(212,146,12,0.2)",
                boxShadow:
                  "0 0 80px rgba(212,146,12,0.08), 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Close button */}
              <m.button
                ref={closeButtonRef}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={onClose}
                whileHover={{
                  scale: 1.1,
                  background: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 text-white/50" />
              </m.button>

              {/* Floating celebration particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <FloatingParticle delay={0.3} x={20} y={30} size={4} color="rgba(212,146,12,0.6)" />
                <FloatingParticle delay={0.5} x={70} y={50} size={3} color="rgba(59,130,246,0.5)" />
                <FloatingParticle delay={0.8} x={40} y={70} size={5} color="rgba(34,197,94,0.5)" />
                <FloatingParticle delay={1.1} x={80} y={25} size={3} color="rgba(212,146,12,0.5)" />
                <FloatingParticle delay={1.4} x={15} y={60} size={4} color="rgba(59,130,246,0.4)" />
                <FloatingParticle delay={0.6} x={55} y={20} size={3} color="rgba(34,197,94,0.4)" />
                <FloatingParticle delay={1.0} x={85} y={65} size={4} color="rgba(212,146,12,0.4)" />
                <FloatingParticle delay={1.3} x={30} y={85} size={3} color="rgba(59,130,246,0.3)" />
              </div>

              {/* Top glow line */}
              <m.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(212,146,12,0.5) 50%, transparent 100%)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Animated check icon */}
                <m.div
                  variants={itemVariants}
                  className="relative mb-6"
                >
                  {/* Outer ring pulse */}
                  <m.div
                    className="absolute inset-0 -m-3 rounded-full"
                    style={{
                      border: "2px solid rgba(34,197,94,0.2)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Second ring */}
                  <m.div
                    className="absolute inset-0 -m-6 rounded-full"
                    style={{
                      border: "1px solid rgba(34,197,94,0.1)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />

                  {/* Icon container */}
                  <m.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)",
                      border: "1px solid rgba(34,197,94,0.25)",
                      boxShadow: "0 0 30px rgba(34,197,94,0.15)",
                    }}
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </m.div>
                </m.div>

                {/* Title */}
                <m.h3
                  variants={itemVariants}
                  className="text-2xl sm:text-[26px] font-bold text-white mb-3 tracking-tight"
                >
                  Message Sent!
                </m.h3>

                {/* Description */}
                <m.p
                  variants={itemVariants}
                  className="text-[15px] text-white/55 leading-relaxed mb-2 max-w-sm"
                >
                  {senderName ? (
                    <>
                      Thank you, <span className="text-[#f0b429] font-medium">{senderName}</span>.{" "}
                    </>
                  ) : (
                    "Thank you. "
                  )}
                  Your message has been received successfully.
                </m.p>

                <m.p
                  variants={itemVariants}
                  className="text-[13px] text-white/35 leading-relaxed mb-7 max-w-xs"
                >
                  Our team will review your inquiry and get back to you within 24 hours.
                </m.p>

                {/* Sparkles badge */}
                <m.div
                  variants={itemVariants}
                  className="flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                  style={{
                    background: "rgba(212,146,12,0.08)",
                    border: "1px solid rgba(212,146,12,0.15)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f0b429]" />
                  <span className="text-[12px] text-[#f0b429] font-medium tracking-wide uppercase">
                    We&apos;ll be in touch soon
                  </span>
                </m.div>

                {/* Close button */}
                <m.button
                  variants={itemVariants}
                  className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-[14px] cursor-pointer overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  onClick={onClose}
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(212,146,12,0.3)",
                    color: "#ffffff",
                    transition: { type: "spring", stiffness: 400, damping: 22 },
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Hover shimmer */}
                  <m.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(212,146,12,0.06) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["-200% center", "200% center"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Got it</span>
                </m.button>
              </div>

              {/* Bottom ambient glow */}
              <div
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,146,12,0.06) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
