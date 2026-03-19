"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix, prefix]);

  return <span ref={ref} className={className} />;
}
