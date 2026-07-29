import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import OrderForm from "@/components/order/OrderForm";
import { site } from "@/constants/product";

export default function Contact() {
  return (
    <section id="contact" className="bg-cloud py-20 sm:py-24">
      <Container className="flex flex-col gap-14">
        <div id="order" className="scroll-mt-24 rounded-3xl bg-indigo px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-soft">
            Ready when you are
          </p>
          <h2 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
            Order Pulse Pro — pay {site.price.current} when it arrives
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            Fill in your details below, or call us directly — no account, no advance payment.
          </p>

          <div className="mx-auto mt-8 max-w-lg">
            <OrderForm />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} variant="secondary">
              Call {site.contact.phone}
            </Button>
            <Button href={`mailto:${site.contact.email}`} variant="ghost" className="border-white/40 text-white hover:border-white hover:text-white">
              Email us
            </Button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
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
        </div>
      </Container>
    </section>
  );
}
