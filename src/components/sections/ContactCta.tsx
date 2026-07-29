import Button from "@/components/ui/Button";
import { site } from "@/constants/product";

export default function ContactCta() {
  const whatsappHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;
  const telHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Button href="#order" variant="primary" className="w-full justify-center">
        <span className="inline-flex items-center justify-center gap-2">
          <PhoneIcon className="h-4 w-4" />
          অর্ডার করতে চাই
        </span>
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button href={whatsappHref} variant="secondary" className="justify-center">
          <span className="inline-flex items-center justify-center gap-2">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </span>
        </Button>
        <Button href={telHref} variant="ghost" className="justify-center">
          <span className="inline-flex items-center justify-center gap-2">
            <PhoneIcon className="h-4 w-4" />
            কল করুন
          </span>
        </Button>
      </div>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 11 11 0 0 0 3.4.55 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A17.2 17.2 0 0 1 2.8 4.4 1.2 1.2 0 0 1 4 3.2h3.35a1.2 1.2 0 0 1 1.2 1.2 11 11 0 0 0 .55 3.4 1.2 1.2 0 0 1-.3 1.2Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9.2c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .6.4.2.5.6 1.4.6 1.5.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.2-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 1.8 1.1 2.1 1.2.2.1.4.1.5-.1.2-.2.6-.7.8-.9.2-.2.3-.2.5-.1.2.1 1.3.6 1.6.8.2.1.4.2.4.3.1.2.1 1-.2 1.4-.4.5-1.3.9-1.8.9-.5.1-1 .1-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 .9-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}