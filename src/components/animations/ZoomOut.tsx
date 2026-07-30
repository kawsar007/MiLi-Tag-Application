"use client";

import BaseMotion from "./BaseMotion";
import { AnimationProps } from "./types";
import { zoomOut } from "./variants";

export default function ZoomOut(props: AnimationProps) {
  return <BaseMotion {...props} variants={zoomOut} />;
}