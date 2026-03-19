"use client";

import { motion, type Variants } from "framer-motion";
import { CSSProperties } from "react";

const quote: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { delay: 0.3, staggerChildren: 0.08 },
  },
};

const singleWord: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function AnimatedText({
  text,
  className = "",
  highlight = "",
  style,
}: {
  text: string;
  className?: string;
  highlight?: string;
  style?: CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={className}
      style={style}
      variants={quote}
      initial="initial"
      animate="animate"
    >
      {words.map((word, i) => (
        <motion.span
          key={word + "-" + i}
          className={`inline-block ${
            highlight && word.includes(highlight)
              ? "text-[#00C896]"
              : ""
          }`}
          variants={singleWord}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  );
}
