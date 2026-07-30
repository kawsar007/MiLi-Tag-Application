"use client";

import { motion, useReducedMotion, Variants } from "motion/react";
import { AnimationProps } from "./types";

interface BaseMotionProps extends AnimationProps {
  variants: Variants;
}

export default function BaseMotion({
  children,
  className,
  variants,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  ...props
}: BaseMotionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}