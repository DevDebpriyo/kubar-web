"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

interface LenisProviderProps {
  children: React.ReactNode;
}

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrameId: number | null = null;
    let detachScrollListener: (() => void) | null = null;

    const startAnimationLoop = () => {
      if (animationFrameId !== null || document.hidden) return;

      const update = (time: number) => {
        lenisRef.current?.raf(time);
        animationFrameId = window.requestAnimationFrame(update);
      };

      animationFrameId = window.requestAnimationFrame(update);
    };

    const pauseAnimationLoop = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      lenisRef.current?.stop();
    };

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

      lenis.start();
      startAnimationLoop();
    };

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAnimationLoop();
      } else if (!motionPreference.matches) {
        if (!lenisRef.current) startLenis();
        lenisRef.current?.start();
        startAnimationLoop();
      }
    };

    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLenis();

    return () => {
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopLenis();
    };
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
