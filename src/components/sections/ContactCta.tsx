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
        <Button
          href={whatsappHref}
          variant="secondary"
          className="justify-center"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <WhatsAppIcon className="h-5 w-5" />
            <span className="font-semibold">WhatsApp</span>
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
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="white"
        d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.15-.17.2-.34.22-.63.07-.3-.15-1.24-.46-2.37-1.47-.87-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.7-.7 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.56-.34Z"
      />
      <path
        fill="white"
        d="M12 3.6a8.4 8.4 0 0 0-7.26 12.6L4 20.4l4.32-1.14A8.4 8.4 0 1 0 12 3.6Zm0 1.2a7.2 7.2 0 1 1-3.85 13.3l-.28-.18-2.4.63.64-2.34-.18-.29A7.2 7.2 0 0 1 12 4.8Z"
      />
    </svg>
  );
}