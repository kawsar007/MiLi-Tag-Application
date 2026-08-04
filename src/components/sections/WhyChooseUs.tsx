import Container from "@/components/ui/Container";
import {
  CodIcon,
  DeliveryIcon,
  EasyIcon,
  QualityIcon,
  TrustedIcon,
} from "@/components/ui/icons";
import SectionTitle from "@/components/ui/SectionTitle";
import { sellingPoints } from "@/constants/product";
import { Gem } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  quality: QualityIcon,
  cod: CodIcon,
  delivery: DeliveryIcon,
  trusted: TrustedIcon,
  easy: EasyIcon,
  gem: Gem,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-ink py-20 text-cloud sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="www.orbigpstracker.com থেকে কিনুন"
          title="কেন আমাদের কাছ থেকে কিনবেন?"
          tone="dark"
          description="সেরা প্রোডাক্টের সাথে সেরা সার্ভিস - এটাই আমাদের প্রতিশ্রুতি"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sellingPoints.map((point) => {
            const Icon = iconMap[point.id];
            return (
              <div
                key={point.id}
                className="flex flex-col gap-4 rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-cyan/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/15 text-cyan">
                  <Icon />
                </span>
                <h3 className="font-display text-base font-medium text-cloud">{point.title}</h3>
                <p className="text-sm leading-relaxed text-steel-soft">{point.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
