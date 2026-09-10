"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/** Pixels scrolled before the button appears. */
const SCROLL_THRESHOLD = 320;

const RADIUS = 20;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Global "Back to top" button.
 *
 * - Fades/slides in once the user has scrolled past SCROLL_THRESHOLD.
 * - The ring around the icon fills as a live scroll-progress indicator,
 *   so it doubles as a subtle "how far down the page am I" cue.
 * - Respects prefers-reduced-motion for the scroll behavior.
 * - Mount once near the root layout — it's fixed-positioned and global.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1 fraction scrolled down the page

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrollTop > SCROLL_THRESHOLD);
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-indigo shadow-lg ring-1 ring-cloud-line transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo active:translate-y-0 sm:bottom-8 sm:right-8 ${visible
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-4 opacity-0"
        }`}
    >
      {/* Progress ring */}
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-cloud-line"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="text-indigo transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
      <span className="sr-only">Scroll back to the top of the page</span>
    </button>
  );
}