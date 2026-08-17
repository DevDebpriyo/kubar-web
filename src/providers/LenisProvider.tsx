"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrameId: number | null = null;
    let detachScrollListener: (() => void) | null = null;

    const stopLenis = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      detachScrollListener?.();
      detachScrollListener = null;

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const startLenis = () => {
      if (motionPreference.matches || lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      detachScrollListener = lenis.on("scroll", (event) => {
        window.dispatchEvent(
          new CustomEvent("lenis-scroll", {
            detail: {
              progress: event.progress,
              scroll: event.scroll,
            },
          }),
        );
      });

      const update = (time: number) => {
        lenis.raf(time);
        animationFrameId = window.requestAnimationFrame(update);
      };

      animationFrameId = window.requestAnimationFrame(update);
    };

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    startLenis();

    return () => {
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
      stopLenis();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
