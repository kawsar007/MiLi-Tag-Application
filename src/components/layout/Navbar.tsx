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
            MT
          </span>
          {site.name}
        </a>
        {/* <a
          href="#top"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
            <span className="font-display text-base font-bold tracking-tight text-white">
              MT
            </span>

            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              MiLi Tag
            </span>

            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-steel">
              Smart Tracker
            </span>
          </div>
        </a> */}

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
