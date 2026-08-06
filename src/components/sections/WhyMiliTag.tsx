import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { whyOrbiMili } from "@/constants/product";
import { BatteryMedium, Bluetooth, Droplets, MapPin, ShieldCheck, Smartphone, Thermometer, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  location: MapPin,
  bluetooth: Bluetooth,
  battery: BatteryMedium,
  waterproof: Droplets,
  android: Smartphone,
  button: Zap,
  temperature: Thermometer,
  certified: ShieldCheck,
};

export default function WhyMiliTag() {
  return (
    <section id="why-us" className="bg-ink py-20 text-cloud sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="কেন Orbi MiLi MiTag Duo?"
          title="অসাধারণ ফিচারস যা আপনাকে নিশ্চিন্ত রাখবে"
          tone="dark"
          description="আধুনিক প্রযুক্তি ও উচ্চমানের ডিজাইনের সমন্বয়ে তৈরি MiLi MiTag আপনার দৈনন্দিন জীবনকে আরও সহজ করবে"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyOrbiMili.map((point) => {
            const Icon = iconMap[point.id];
            return (
              <div
                key={point.id}
                className="flex flex-col gap-4 rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors duration-300 hover:border-cyan/50"
              >
                <div className="flex justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/15 text-cyan">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="font-display text-base font-medium text-cloud text-center">{point.title}</h3>
                <p className="text-sm leading-relaxed text-steel-soft text-center">{point.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
