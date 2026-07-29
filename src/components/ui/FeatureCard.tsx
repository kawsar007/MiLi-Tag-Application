import type { FeatureItem } from "@/types";

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-cloud-line bg-cloud-card p-6 shadow-[0_1px_0_rgba(20,22,26,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(20,22,26,0.25)]">
      <span className="font-mono text-xs text-steel">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-display text-lg font-medium text-ink">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-steel">{feature.description}</p>
      <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo to-cyan transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
}
