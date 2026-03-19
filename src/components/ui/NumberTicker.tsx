"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: 2500,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = value >= 1000
          ? new Intl.NumberFormat("de-DE").format(Math.floor(latest))
          : Math.floor(latest).toString();
        ref.current.textContent = prefix + formatted + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, prefix, value]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
