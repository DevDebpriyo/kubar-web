"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, motion, animate, useInView } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function AnimatedStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(count, value, {
        duration: 2.4,
        delay: delay + 1.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      });
      return controls.stop;
    }
  }, [isInView, value, delay, count]);

  return (
    <div ref={ref} className="flex flex-col gap-1 min-w-0">
      <div className="flex items-baseline gap-0.5">
        <motion.span
          className="text-[22px] sm:text-[24px] font-black text-white tracking-[-0.03em] leading-none stat-value"
        >
          {rounded}
        </motion.span>
        <span
          className="text-[20px] sm:text-[22px] font-black leading-none tracking-[-0.02em]"
          style={{ color: "#d4920c" }}
        >
          {suffix}
        </span>
      </div>
      <span className="text-[11.5px] text-white/38 font-medium whitespace-nowrap tracking-[0.01em]">
        {label}
      </span>
    </div>
  );
}
