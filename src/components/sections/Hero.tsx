import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { heroCopy, site } from "@/constants/product";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-cloud">
      {/* subtle grid texture, kept quiet so the pulse rings stay the focal motion */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
            {heroCopy.eyebrow}
          </span>

          <h1 className="font-display text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
            {heroCopy.title}
          </h1>

          <p className="max-w-lg text-lg text-steel-soft">{heroCopy.subtitle}</p>
          <p className="max-w-lg text-sm leading-relaxed text-steel">{heroCopy.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="font-display text-2xl font-semibold text-cloud">
              {site.price.current}
            </span>
            <span className="text-sm text-steel line-through">{site.price.original}</span>
            <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-cyan">
              {site.price.discountLabel}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="#order" variant="primary">
              Order with COD
            </Button>
            <Button href="#product" variant="secondary">
              See full specs
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          {/* <PulseDevice /> */}
          <Image src="/mili1.webp" alt="Product Image" height={400} width={400} />
        </div>
      </Container>
    </section>
  );
}
