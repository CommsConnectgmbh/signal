"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CSSProperties } from "react";

const quote: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { delay: 0.15, staggerChildren: 0.06 },
  },
};

const singleWord: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedWord: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
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
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];
  return (
    <motion.h1
      className={className}
      style={style}
      variants={quote}
      initial="initial"
      animate="animate"
    >
      {words.map((word, i) => {
        const cleaned = word.replace(/[^\p{L}\p{N}]/gu, "");
        const isHighlighted = highlightWords.includes(cleaned);
        return (
          <motion.span
            key={word + "-" + i}
            className={`inline-block ${isHighlighted ? "text-[#2D7FF9]" : ""}`}
            variants={reduced ? reducedWord : singleWord}
          >
            {word}&nbsp;
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
