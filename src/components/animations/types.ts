import { HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

export interface AnimationProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}