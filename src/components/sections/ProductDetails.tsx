import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "@/components/ui/FeatureCard";
import { features, specs } from "@/constants/product";

export default function ProductDetails() {
  return (
    <section id="product" className="bg-cloud py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          eyebrow="What's inside"
          title="Built around four things people actually notice"
          description="Every spec below earns its place in the case — nothing here is decoration."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card">
          <div className="border-b border-cloud-line px-6 py-4">
            <h3 className="font-display text-lg font-medium text-ink">Specifications</h3>
          </div>
          <dl className="divide-y divide-cloud-line">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <dt className="text-sm text-steel">{spec.label}</dt>
                <dd className="font-mono text-sm text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
