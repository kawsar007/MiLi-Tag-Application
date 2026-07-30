"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { slideRight } from "./variants";

export default function SlideRight(props: AnimationProps) {
  return <BaseMotion {...props} variants={slideRight} />;
}