"use client";

import OrderForm from "@/components/order/OrderForm";
import Container from "@/components/ui/Container";
import { defaultDeliveryArea, DeliveryArea, site } from "@/constants/product";
import { useState } from "react";
import OrderSummaryCard from "../ui/OrderSummaryCard";

// TODO: point this at your real product name field if one exists (e.g. site.product.name)
const productName = "MiTag Duo — Smart Item Tracker";
const productImage = "/mili1.webp";

export default function Contact() {
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>(defaultDeliveryArea);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-cloud py-16 sm:py-20">
      <Container className="flex flex-col gap-16">
        <div id="order" className="scroll-mt-24 flex flex-col gap-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cloud-line bg-cloud-card px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-indigo">
              Ready when you are
            </span>
            <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              Order {productName} — pay {site.price.current} when it arrives
            </h2>
            <p className="max-w-md text-sm text-steel">
              Fill in your details below, or call us directly — no account, no advance payment.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-8">
            <div className="rounded-2xl border border-cloud-line bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-6 font-display text-lg font-semibold text-ink">
                অর্ডার করতে ফর্মটি পূরণ করতে হবে
              </h3>
              <OrderForm
                onQuantityChange={setQuantity}
                onDeliveryAreaChange={setDeliveryArea}
                onSubmittingChange={setIsSubmitting}
                onOrderConfirmedChange={setConfirmedOrderId}
              />
            </div>

            <OrderSummaryCard
              productName={productName}
              productImage={productImage}
              unitPrice={site.price.current}
              originalPrice={site.price.original}
              quantity={quantity}
              deliveryArea={deliveryArea}
              isSubmitting={isSubmitting}
              orderConfirmed={confirmedOrderId !== null}
            />
          </div>

          {/* <div className="flex flex-wrap justify-center gap-4">
            <Button href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} variant="secondary">
              Call {site.contact.phone}
            </Button>
            <Button href={`mailto:${site.contact.email}`} variant="ghost">
              Email us
            </Button>
          </div> */}
        </div>

        {/* <div className="grid gap-10 sm:grid-cols-3">
          <SectionTitle eyebrow="Get in touch" title="Talk to a real person" align="left" />

          <div className="flex flex-col gap-2 sm:col-span-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Phone</span>
            <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="text-ink hover:text-indigo">
              {site.contact.phone}
            </a>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Email</span>
            <a href={`mailto:${site.contact.email}`} className="text-ink hover:text-indigo">
              {site.contact.email}
            </a>
            <span className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-steel">Address</span>
            <span className="text-ink">{site.contact.address}</span>
          </div>
        </div> */}
      </Container>
    </section>
  );
}