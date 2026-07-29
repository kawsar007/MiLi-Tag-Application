import Container from "@/components/ui/Container";
import { heroCopy, site } from "@/constants/product";
import Image from "next/image";
import ContactCta from "./ContactCta";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cloud text-ink">
      {/* subtle grid texture, kept quiet so the content stays the focal point */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        // style={{
        //   backgroundImage:
        //     "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
        //   backgroundSize: "56px 56px",
        // }}
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="order-2 flex flex-col items-start gap-6 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-cloud-line bg-cloud-card px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-indigo">
            {heroCopy.eyebrow}
          </span>

          <h1 className="font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {heroCopy.title}
          </h1>

          <p className="max-w-lg text-lg text-ink/80">{heroCopy.subtitle}</p>
          {/* <p className="max-w-lg text-sm leading-relaxed text-steel">{heroCopy.description}</p> */}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="font-display text-2xl font-semibold text-ink">
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

        <div className="order-1 flex justify-center lg:order-1 lg:justify-start">
          <div className="overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card p-4 sm:p-6">
            <Image
              src="/mili1.webp"
              alt="Product Image"
              height={400}
              width={400}
              priority
              className="h-auto w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}