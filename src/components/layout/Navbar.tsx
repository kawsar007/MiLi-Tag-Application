"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { site } from "@/constants/product";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cloud-line bg-cloud/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        {/* <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">
            MT
          </span>
          {site.name}
        </a> */}
        <Link
          href="#top"
          className="group flex items-center gap-3 font-display transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 focus-visible:rounded"
        >
          {/* Logo Mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo to-indigo/80 text-sm font-bold text-white shadow-md shadow-indigo/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo/30 group-hover:scale-105">
            <span className="relative z-10">MT</span>
          </div>

          {/* Brand Name */}
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold transition-colors duration-300 text-indigo">
              Orbi
            </span>
            <span className="text-lg font-light text-ink/60">
              MiLi
            </span>
            <span className="text-lg font-semibold transition-colors duration-300 text-indigo/80">
              MiTag
            </span>
          </div>
        </Link>

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
