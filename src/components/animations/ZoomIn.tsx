"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { zoomIn } from "./variants";

export default function ZoomIn(props: AnimationProps) {
  return <BaseMotion {...props} variants={zoomIn} />;
}