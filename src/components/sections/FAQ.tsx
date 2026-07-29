import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FAQItem from "@/components/ui/FAQItem";
import { faqs } from "@/constants/product";

export default function FAQ() {
  return (
    <section id="faq" className="bg-ink py-4 text-cloud sm:py-6">
      <div className="border-t border-ink-line" />
      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <SectionTitle
          eyebrow="Before you order"
          title="Questions people ask before checkout"
          tone="dark"
        />

        <div className="max-w-2xl">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} defaultOpen={index === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
