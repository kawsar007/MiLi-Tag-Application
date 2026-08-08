"use client";

import Container from "@/components/ui/Container";
import { heroCopy, site } from "@/constants/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ContactCta from "./ContactCta";

// Product images array - replace with your actual image paths
const productImages = [
  { id: 1, src: "/images/hero/101g1.webp", alt: "Product Image 1" },
  { id: 2, src: "/images/hero/102tag2.jpg", alt: "Product Image 2" },
  { id: 3, src: "/images/hero/103tag5.png", alt: "Product Image 3" },
  { id: 4, src: "/images/hero/104img1.webp", alt: "Product Image 4" },
  { id: 5, src: "/images/hero/105g6.webp", alt: "Product Image 5" },
  { id: 6, src: "/images/hero/106g3.webp", alt: "Product Image 6" },
  { id: 7, src: "/images/hero/107showcase2.webp", alt: "Product Image 7" },
  { id: 8, src: "/images/hero/108showcase1.webp", alt: "Product Image 8" },
  { id: 9, src: "/images/hero/109tag7.jpg", alt: "Product Image 9" },
  { id: 10, src: "/images/hero/110tag1.jpg", alt: "Product Image 10" },
  { id: 11, src: "/images/hero/111pack2.jpg", alt: "Product Image 11" },
  { id: 12, src: "/images/hero/112pack1.jpg", alt: "Product Image 12" },
  { id: 13, src: "/images/hero/113img2.webp", alt: "Product Image 13" },
  { id: 14, src: "/images/hero/114tag4.jpg", alt: "Product Image 14" },
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const activeImage = productImages[activeImageIndex];

  const handleImageChange = useCallback((index: number) => {
    if (index === activeImageIndex || isTransitioning) return;

    setIsTransitioning(true);
    setActiveImageIndex(index);
    setIsZoomed(false);

    setTimeout(() => {
      const activeThumb = thumbnailContainerRef.current?.children[index] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }, 50);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [activeImageIndex, isTransitioning]);

  const goToPrevious = useCallback(() => {
    const newIndex = activeImageIndex === 0 ? productImages.length - 1 : activeImageIndex - 1;
    handleImageChange(newIndex);
  }, [activeImageIndex, handleImageChange]);

  const goToNext = useCallback(() => {
    const newIndex = activeImageIndex === productImages.length - 1 ? 0 : activeImageIndex + 1;
    handleImageChange(newIndex);
  }, [activeImageIndex, handleImageChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  }, [goToPrevious, goToNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStartX(null);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleTouchZoom = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      return;
    }
  };

  return (
    <section id="top" className="relative overflow-hidden bg-cloud text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 py-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:py-14">
        {/* min-w-0: without this, CSS Grid lets this column's content (the heading,
            price row, etc.) force the track wider than the viewport on mobile,
            which is the root cause of the left-shift — see chat explanation. */}
        <div className="order-2 flex min-w-0 flex-col items-start gap-6 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 font-mono text-xs font-semibold uppercase text-indigo shadow-sm">
            {heroCopy.eyebrow}
          </span>

          <h1 className="heading-primary text-ink">
            আপনার মূল্যবান জিনিস <span className="text-indigo">সর্বদা নিরাপদ রাখুন</span>
            {/* Never lose what matters! */}
          </h1>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Never lose what matters!
          </p>
          <p className="max-w-lg text-md font-medium text-ink/80">
            {/* {heroCopy.subtitle} */}
            MiLi MiTag Duo দিয়ে আপনার চাবি, ব্যাগ, মানিব্যাগ ও অন্যান্য যেকোনো গুরুত্বপূর্ণ জিনিস ট্র্যাক করুন। শুরু করুন স্মার্ট ও নিরাপদ জীবন।
          </p>

          <p className="max-w-lg text-md font-medium text-ink/80 flex items-center gap-3">
            <span className="text-indigo">✦</span> Track
            <span className="text-ink/30">|</span> Protect
            <span className="text-ink/30">|</span>
            <span className="text-primary font-semibold">Stay worry-free</span>
          </p>
          {/* 
          <p className="max-w-lg text-md font-medium text-ink/80">Track. Protect. Stay worry-free.</p> */}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="font-display text-4xl font-bold text-ink">
              {site.price.current}
            </span>
            <span className="text-sm text-steel line-through">{site.price.original}</span>
            <span className="rounded-full bg-indigo/10 px-3 py-1 text-xs font-medium text-indigo">
              {site.price.discountLabel}
            </span>
          </div>

          <div className="w-full">
            <ContactCta />
          </div>
        </div>

        {/* min-w-0: same reason as the text column above — allows this column to
            shrink to the actual available width instead of being forced wide by
            its content on narrow screens. */}
        <div className="order-1 flex min-w-0 flex-col items-center gap-4 lg:order-1 lg:items-start">
          <div
            ref={mainImageRef}
            className="relative w-full overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card p-4 sm:p-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchZoom}
            role="img"
            aria-label={`Product image ${activeImageIndex + 1} of ${productImages.length}`}
          >
            <div
              ref={imageContainerRef}
              className="relative aspect-square w-full overflow-hidden cursor-zoom-in lg:cursor-zoom-in"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div
                className="relative w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  className={`
    object-cover transition-opacity duration-300 ease-in-out
    ${isTransitioning ? "opacity-0" : "opacity-100"}
  `}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  draggable={false}
                />
              </div>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow-lg transition-all duration-200 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2 backdrop-blur-sm sm:left-4 z-10"
              aria-label="Previous image"
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink shadow-lg transition-all duration-200 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2 backdrop-blur-sm sm:right-4 z-10"
              aria-label="Next image"
              disabled={isTransitioning}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm lg:hidden z-10">
              {activeImageIndex + 1} / {productImages.length}
            </div>

            <div className="absolute bottom-4 left-4 hidden lg:block">
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {isZoomed ? '🔍 Zoomed' : 'Hover to zoom'}
              </span>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto lg:max-w-full lg:mx-0">
            <div
              ref={thumbnailContainerRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageChange(index)}
                  onMouseEnter={() => handleImageChange(index)}
                  className={`
                    relative flex-1 min-w-[60px] max-w-[80px] sm:min-w-[70px] sm:max-w-[90px] lg:min-w-[80px] lg:max-w-[100px]
                    aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                    hover:scale-105 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2
                    snap-start
                    ${activeImageIndex === index
                      ? 'border-indigo shadow-lg ring-2 ring-indigo/20'
                      : 'border-cloud-line hover:border-indigo/50'
                    }
                  `}
                  aria-label={`View ${image.alt}`}
                  aria-current={activeImageIndex === index ? 'true' : 'false'}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 60px, (max-width: 768px) 70px, 80px"
                    quality={85}
                    draggable={false}
                  />
                  {activeImageIndex === index && (
                    <div className="absolute inset-0 bg-indigo/5 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`
                    h-1.5 rounded-full transition-all duration-200
                    ${activeImageIndex === index
                      ? 'w-6 bg-indigo'
                      : 'w-1.5 bg-cloud-line hover:bg-indigo/50'
                    }
                  `}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}