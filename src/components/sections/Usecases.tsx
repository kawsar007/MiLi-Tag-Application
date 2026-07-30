// import Button from "@/components/ui/Button";
// import Container from "@/components/ui/Container";
// import { site } from "@/constants/product";
// import { UseCaseIcon, useCases } from "@/constants/usecases";

// export default function UseCases() {
//   const whatsappHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;
//   const telHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

//   return (
//     <section id="use-cases" className="bg-cloud py-20 sm:py-24" lang="bn">
//       <Container className="flex flex-col items-center gap-10 sm:gap-12">
//         <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
//           <span className="inline-flex items-center gap-2 rounded-full border border-cloud-line bg-cloud-card px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-indigo">
//             ব্যবহার ক্ষেত্র
//           </span>

//           <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
//             MiLi MiTag{" "}
//             <span className="text-indigo">কি কি কাজে লাগবে?</span>
//           </h2>

//           <p className="text-base leading-relaxed text-steel">
//             আপনার দৈনন্দিন জীবনের প্রতিটি মূল্যবান জিনিস নিরাপদ রাখতে MiTag ব্যবহার করুন
//           </p>
//         </div>

//         <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-5">
//           {useCases.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-start gap-4 rounded-2xl border border-cloud-line bg-cloud-card p-5 transition-colors duration-200 hover:border-indigo/30 sm:p-6"
//             >
//               <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cloud-line bg-white text-indigo">
//                 <UseCaseIconGlyph icon={item.icon} className="h-6 w-6" />
//               </span>

//               <div className="flex flex-col gap-1">
//                 <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
//                   {item.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed text-steel">{item.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo/20 bg-indigo/5 px-5 py-3 text-center">
//           <LightbulbIcon className="h-5 w-5 shrink-0 text-indigo" />
//           <p className="text-sm text-ink sm:text-base">
//             <span className="font-semibold text-indigo">আরও অনেক কাজে!</span>{" "}
//             যেকোনো জিনিসে MiTag লাগিয়ে ট্র্যাক করুন
//           </p>
//         </div>

//         <div className="flex w-full max-w-md flex-col gap-3">
//           <Button href="#order" variant="primary" className="w-full justify-center">
//             <span className="inline-flex items-center justify-center gap-2">
//               <PhoneIcon className="h-4 w-4" />
//               অর্ডার করতে চাই
//             </span>
//           </Button>

//           <div className="grid grid-cols-2 gap-3">
//             <Button href={whatsappHref} variant="secondary" className="justify-center">
//               <span className="inline-flex items-center justify-center gap-2">
//                 <WhatsAppIcon className="h-4 w-4" />
//                 WhatsApp
//               </span>
//             </Button>
//             <Button href={telHref} variant="ghost" className="justify-center">
//               <span className="inline-flex items-center justify-center gap-2">
//                 <PhoneIcon className="h-4 w-4" />
//                 কল করুন
//               </span>
//             </Button>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

// function UseCaseIconGlyph({ icon, className }: { icon: UseCaseIcon; className?: string }) {
//   switch (icon) {
//     case "key":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <circle cx={8} cy={8} r={3.5} stroke="currentColor" strokeWidth={1.8} />
//           <path
//             d="M10.5 10.5 20 20M15.5 15.5l2-2M18 18l2-2"
//             stroke="currentColor"
//             strokeWidth={1.8}
//             strokeLinecap="round"
//           />
//         </svg>
//       );
//     case "wallet":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <rect x={3} y={6} width={18} height={13} rx={2} stroke="currentColor" strokeWidth={1.8} />
//           <path d="M3 10h18" stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={16.5} cy={14} r={1.2} fill="currentColor" />
//         </svg>
//       );
//     case "bag":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <rect x={3} y={8} width={18} height={12} rx={2} stroke="currentColor" strokeWidth={1.8} />
//           <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth={1.8} />
//         </svg>
//       );
//     case "luggage":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <rect x={5} y={7} width={14} height={13} rx={2} stroke="currentColor" strokeWidth={1.8} />
//           <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth={1.8} />
//           <path d="M9 11v6M15 11v6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
//         </svg>
//       );
//     case "bike":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <circle cx={6} cy={17} r={3} stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={18} cy={17} r={3} stroke="currentColor" strokeWidth={1.8} />
//           <path
//             d="M6 17l4-8h4l4 8M10 9H8m5-4h3l2 4"
//             stroke="currentColor"
//             strokeWidth={1.8}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       );
//     case "paw":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <circle cx={12} cy={15.5} r={4} stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={7} cy={8.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={12} cy={6.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={17} cy={8.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
//         </svg>
//       );
//     case "child":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <circle cx={12} cy={7} r={3} stroke="currentColor" strokeWidth={1.8} />
//           <path
//             d="M6 20v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"
//             stroke="currentColor"
//             strokeWidth={1.8}
//             strokeLinecap="round"
//           />
//         </svg>
//       );
//     case "car":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//           <path
//             d="M4 16V12l2-5h12l2 5v4"
//             stroke="currentColor"
//             strokeWidth={1.8}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <rect x={2.5} y={16} width={19} height={3.5} rx={1} stroke="currentColor" strokeWidth={1.8} />
//           <circle cx={7} cy={17.75} r={0.9} fill="currentColor" />
//           <circle cx={17} cy={17.75} r={0.9} fill="currentColor" />
//         </svg>
//       );
//     default:
//       return null;
//   }
// }

// function LightbulbIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.45.9 1 .9 1.6v.5h5.2v-.5c0-.6.3-1.15.9-1.6A6 6 0 0 0 12 3Z"
//         stroke="currentColor"
//         strokeWidth={1.8}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function PhoneIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 11 11 0 0 0 3.4.55 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A17.2 17.2 0 0 1 2.8 4.4 1.2 1.2 0 0 1 4 3.2h3.35a1.2 1.2 0 0 1 1.2 1.2 11 11 0 0 0 .55 3.4 1.2 1.2 0 0 1-.3 1.2Z"
//         stroke="currentColor"
//         strokeWidth={1.6}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function WhatsAppIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
//         stroke="currentColor"
//         strokeWidth={1.6}
//         strokeLinejoin="round"
//       />
//       <path
//         d="M8.5 9.2c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .6.4.2.5.6 1.4.6 1.5.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.2-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 1.8 1.1 2.1 1.2.2.1.4.1.5-.1.2-.2.6-.7.8-.9.2-.2.3-.2.5-.1.2.1 1.3.6 1.6.8.2.1.4.2.4.3.1.2.1 1-.2 1.4-.4.5-1.3.9-1.8.9-.5.1-1 .1-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 .9-2.2Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }


import Container from "@/components/ui/Container";
import { site } from "@/constants/product";
import { UseCaseIcon, useCases } from "@/constants/usecases";
import ContactCta from "./ContactCta";

export default function UseCases() {
  const whatsappHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;
  const telHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="use-cases" className="bg-cloud py-20 sm:py-24 lg:py-28" lang="bn">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">
          {/* Left: sticky intro + CTA */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <span className="section-badge">
              ব্যবহার ক্ষেত্র
            </span>

            <h2 className="border-l-4 border-indigo py-1 pl-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              MiLi MiTag কি কি কাজে লাগবে?
            </h2>

            <p className="text-base leading-relaxed text-steel">
              আপনার দৈনন্দিন জীবনের প্রতিটি মূল্যবান জিনিস নিরাপদ রাখতে MiTag ব্যবহার করুন
            </p>

            <div className="flex gap-3 rounded-xl border border-indigo/15 bg-indigo/5 p-4">
              <LightbulbIcon className="h-5 w-5 shrink-0 text-indigo" />
              <p className="text-sm leading-relaxed text-ink">
                <span className="font-semibold text-indigo">আরও অনেক কাজে —</span>{" "}
                যেকোনো জিনিসে MiTag লাগিয়ে ট্র্যাক করুন
              </p>
            </div>

            <ContactCta />
          </div>

          {/* Right: numbered list, styled like the specs table */}
          <div className="overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card">
            <div className="divide-y divide-cloud-line">
              {useCases.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex items-start gap-4 px-5 py-5 transition-colors duration-200 hover:bg-white sm:gap-6 sm:px-7 sm:py-6"
                >
                  <span className="pt-1 font-mono text-xs tabular-nums text-steel/70 sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cloud-line bg-cloud text-steel transition-colors duration-200 group-hover:border-indigo/30 group-hover:text-indigo sm:h-12 sm:w-12">
                    <UseCaseIconGlyph icon={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>

                  <div className="flex flex-col gap-1 pt-0.5">
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-steel">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function UseCaseIconGlyph({ icon, className }: { icon: UseCaseIcon; className?: string }) {
  switch (icon) {
    case "key":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx={8} cy={8} r={3.5} stroke="currentColor" strokeWidth={1.8} />
          <path
            d="M10.5 10.5 20 20M15.5 15.5l2-2M18 18l2-2"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x={3} y={6} width={18} height={13} rx={2} stroke="currentColor" strokeWidth={1.8} />
          <path d="M3 10h18" stroke="currentColor" strokeWidth={1.8} />
          <circle cx={16.5} cy={14} r={1.2} fill="currentColor" />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x={3} y={8} width={18} height={12} rx={2} stroke="currentColor" strokeWidth={1.8} />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth={1.8} />
        </svg>
      );
    case "luggage":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x={5} y={7} width={14} height={13} rx={2} stroke="currentColor" strokeWidth={1.8} />
          <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth={1.8} />
          <path d="M9 11v6M15 11v6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      );
    case "bike":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx={6} cy={17} r={3} stroke="currentColor" strokeWidth={1.8} />
          <circle cx={18} cy={17} r={3} stroke="currentColor" strokeWidth={1.8} />
          <path
            d="M6 17l4-8h4l4 8M10 9H8m5-4h3l2 4"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "paw":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx={12} cy={15.5} r={4} stroke="currentColor" strokeWidth={1.8} />
          <circle cx={7} cy={8.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
          <circle cx={12} cy={6.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
          <circle cx={17} cy={8.5} r={1.8} stroke="currentColor" strokeWidth={1.8} />
        </svg>
      );
    case "child":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx={12} cy={7} r={3} stroke="currentColor" strokeWidth={1.8} />
          <path
            d="M6 20v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      );
    case "car":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 16V12l2-5h12l2 5v4"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x={2.5} y={16} width={19} height={3.5} rx={1} stroke="currentColor" strokeWidth={1.8} />
          <circle cx={7} cy={17.75} r={0.9} fill="currentColor" />
          <circle cx={17} cy={17.75} r={0.9} fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.45.9 1 .9 1.6v.5h5.2v-.5c0-.6.3-1.15.9-1.6A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// function PhoneIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 11 11 0 0 0 3.4.55 1.2 1.2 0 0 1 1.2 1.2V20a1.2 1.2 0 0 1-1.2 1.2A17.2 17.2 0 0 1 2.8 4.4 1.2 1.2 0 0 1 4 3.2h3.35a1.2 1.2 0 0 1 1.2 1.2 11 11 0 0 0 .55 3.4 1.2 1.2 0 0 1-.3 1.2Z"
//         stroke="currentColor"
//         strokeWidth={1.6}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function WhatsAppIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
//         stroke="currentColor"
//         strokeWidth={1.6}
//         strokeLinejoin="round"
//       />
//       <path
//         d="M8.5 9.2c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .6.4.2.5.6 1.4.6 1.5.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.2-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 1.8 1.1 2.1 1.2.2.1.4.1.5-.1.2-.2.6-.7.8-.9.2-.2.3-.2.5-.1.2.1 1.3.6 1.6.8.2.1.4.2.4.3.1.2.1 1-.2 1.4-.4.5-1.3.9-1.8.9-.5.1-1 .1-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 .9-2.2Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }