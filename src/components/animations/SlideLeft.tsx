"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { slideLeft } from "./variants";

export default function SlideLeft(props: AnimationProps) {
  return <BaseMotion {...props} variants={slideLeft} />;
}