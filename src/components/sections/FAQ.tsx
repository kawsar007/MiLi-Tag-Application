import Container from "@/components/ui/Container";
import FAQItem from "@/components/ui/FAQItem";
import SectionTitle from "@/components/ui/SectionTitle";
import { faqs, productContents } from "@/constants/product";
import Image from "next/image";

export default function FAQ() {
  return (
    <section id="faq" className="bg-cloud py-4 text-ink sm:py-6">
      <div className="border-t border-cloud-line" />
      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <SectionTitle title="Tech Specs" />

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id} faq={faq} defaultOpen={index === 0} />
            ))}
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl border border-cloud-line bg-cloud-card px-6 pb-8 pt-16 sm:px-8 sm:pt-20">
              <div className="absolute left-1/2 top-0 h-12 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-ink sm:h-14 sm:w-36">
                <div className="absolute left-1/2 top-1/2 h-5 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cloud-card sm:h-6 sm:w-16" />
              </div>

              <h3 className="text-center font-display text-xl font-bold text-ink sm:text-2xl">
                Included in the Box
              </h3>

              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-8 sm:mt-10 sm:gap-x-10">
                {productContents.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-24 flex-col items-center gap-3 text-center sm:w-28"
                  >
                    {item.image ? (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cloud-line bg-cloud sm:h-20 sm:w-20">
                        <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : null}
                    <span className="text-sm leading-snug text-steel sm:text-base">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
