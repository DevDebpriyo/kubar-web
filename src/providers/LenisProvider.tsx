"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Dispatch custom scroll event for Navbar and other listeners
    const onScroll = (event: { progress: number; scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            progress: event.progress,
            scroll: event.scroll,
          },
        }),
      );
    };
    lenis.on("scroll", onScroll);

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis through GSAP's ticker instead of a manual rAF loop.
    // This ensures Lenis and ScrollTrigger share the same animation frame,
    // which prevents the 1-frame lag that causes scrub jitter.
    const tickerFn = (time: number) => {
      // GSAP passes time in seconds; Lenis.raf expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    // Disable lag smoothing so GSAP never skips frames on slow machines.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
