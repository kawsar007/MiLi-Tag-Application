"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { site } from "@/constants/product";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cloud-line bg-cloud/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">
            P
          </span>
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-steel transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#order" variant="primary">
            এখনই অর্ডার করুন
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cloud-line md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {isMenuOpen ? (
        <div id="mobile-nav" className="border-t border-cloud-line bg-cloud md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-cloud-card"
              >
                {link.label}
              </a>
            ))}
            <Button href="#order" variant="primary" className="mt-2 w-full">
              এখনই অর্ডার করুন
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
