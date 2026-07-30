"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { fadeUp } from "./variants";

export default function FadeUp(props: AnimationProps) {
  return <BaseMotion {...props} variants={fadeUp} />;
}