"use client";

import type { FaqItem } from "@/types";
import { useState } from "react";

interface FAQItemProps {
  faq: FaqItem;
  defaultOpen?: boolean;
}

export default function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cloud-line">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-medium text-ink sm:text-lg">
          {faq.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cloud-line text-indigo transition-transform duration-300 ${isOpen ? "rotate-45 border-indigo" : ""
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
          {Array.isArray(faq.answer) ? (
            <ul className="pb-5 pr-10 list-disc space-y-2 pl-5 leading-relaxed text-md text-ink/80">
              {faq.answer.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="pb-5 pr-10 leading-relaxed text-md text-ink/80">
              {faq.answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
