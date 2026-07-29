"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { galleryImages, type GalleryImage, type GallerySize } from "@/constants/gallery";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ImageGalleryProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  images?: GalleryImage[];
  /** Section id for anchor links / nav, mirrors <section id="product"> pattern. */
  id?: string;
};

/**
 * Bento-style span classes. Depth/hierarchy is expressed through size,
 * not shadow — consistent with the border-driven card language used
 * elsewhere in the product (see ProductDetails specs table).
 */
const SPAN_CLASSES: Record<GallerySize, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2 sm:row-span-1",
  tall: "row-span-2",
  md: "row-span-1",
};

export default function ImageGallery({
  eyebrow = "Gallery",
  title = "A closer look, from every angle",
  description = "Every shot below is here to show something real — the material, the finish, the day-to-day use.",
  images = galleryImages,
  id = "gallery",
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section id={id} className="bg-cloud py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[240px] sm:grid-cols-3 sm:gap-5 lg:auto-rows-[260px] lg:grid-cols-4">
          {images.map((image, index) => (
            <GalleryTile
              key={image.id}
              image={image}
              className={SPAN_CLASSES[image.size ?? "md"]}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Container>

      {activeImage ? (
        <Lightbox
          image={activeImage}
          onClose={close}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </section>
  );
}

function GalleryTile({
  image,
  className = "",
  onOpen,
}: {
  image: GalleryImage;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open larger view: ${image.alt}`}
      className={[
        "group relative col-span-2 row-span-1 overflow-hidden rounded-2xl",
        "border border-cloud-line bg-cloud-card",
        "transition-shadow duration-300 ease-out",
        "hover:shadow-[0_8px_30px_-8px_rgba(15,23,42,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cloud",
        className,
      ].join(" ")}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06]"
      />

      {/* Ink-tinted gradient overlay, quiet at rest, present on hover/focus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      {image.caption ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left font-display text-sm font-medium text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5 sm:text-base">
          {image.caption}
        </span>
      ) : null}

      {/* Border intensifies on hover in place of a resting shadow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-ink/0 transition-all duration-300 ease-out group-hover:ring-ink/10"
      />
    </button>
  );
}

function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 900px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {image.caption ? (
          <div className="flex items-center justify-between gap-4 border-t border-cloud-line px-6 py-4">
            <p className="font-display text-sm font-medium text-ink sm:text-base">
              {image.caption}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-cloud-line bg-cloud-card text-ink transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <span aria-hidden>&times;</span>
        </button>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cloud-line bg-cloud-card text-ink transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <span aria-hidden>&larr;</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cloud-line bg-cloud-card text-ink transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <span aria-hidden>&rarr;</span>
        </button>
      </div>
    </div>
  );
}