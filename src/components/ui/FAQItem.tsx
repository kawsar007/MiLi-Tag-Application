"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

interface FAQItemProps {
  faq: FaqItem;
  defaultOpen?: boolean;
}

export default function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ink-line/60">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-medium text-cloud sm:text-lg">
          {faq.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-line text-cyan transition-transform duration-300 ${
            isOpen ? "rotate-45 border-cyan" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-panel-${faq.id}`}
        role="region"
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-sm leading-relaxed text-steel-soft">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
