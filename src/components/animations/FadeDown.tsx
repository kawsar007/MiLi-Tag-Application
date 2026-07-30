"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { fadeDown } from "./variants";

export default function FadeDown(props: AnimationProps) {
  return <BaseMotion {...props} variants={fadeDown} />;
}