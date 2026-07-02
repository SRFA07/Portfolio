"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Seconds to delay the entrance. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
}

/**
 * Subtle fade-and-rise on scroll into view. Respects prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 18, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
