import { ShowcaseRow, showcaseRows } from "@/constants/product";
import Image from "next/image";

export default function FeatureShowcase() {
  return (
    <section aria-label="Product highlights" className="bg-cloud text-ink">
      {showcaseRows.map((row) => (
        <ShowcaseRowItem key={row.id} row={row} />
      ))}
    </section>
  );
}

function ShowcaseRowItem({ row }: { row: ShowcaseRow }) {
  const imageOrderClass = row.imageSide === "left" ? "lg:order-1" : "lg:order-2";
  const textOrderClass = row.imageSide === "left" ? "lg:order-2" : "lg:order-1";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 py-2 md:py-6">
      {/* Text panel: always first in source order (mobile reads text before image) */}
      <div
        className={`order-1 flex min-h-[280px] flex-col justify-center gap-4 px-6 py-14 sm:min-h-[320px] sm:px-12 sm:py-16 lg:min-h-[420px] lg:px-16 ${textOrderClass}`}
      >
        <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {row.heading}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-steel sm:text-base">
          {row.description}
        </p>
      </div>

      {/* Image panel: full-bleed, no padding, no rounding */}
      <div
        className={`relative order-2 min-h-[280px] sm:min-h-[320px] lg:min-h-[420px] ${imageOrderClass}`}
      >
        <Image
          src={row.image.src}
          alt={row.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}