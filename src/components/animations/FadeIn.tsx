"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { fadeIn } from "./variants";

export default function FadeIn(props: AnimationProps) {
  return <BaseMotion {...props} variants={fadeIn} />;
}