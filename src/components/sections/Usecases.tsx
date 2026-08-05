import Container from "@/components/ui/Container";
import { site } from "@/constants/product";
import { UseCaseIcon, useCases } from "@/constants/usecases";
import ContactCta from "./ContactCta";

export default function UseCases() {
  const whatsappHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;
  const telHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="use-cases" className="bg-ink py-20 text-cloud sm:py-24 lg:py-28" lang="bn">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">
          {/* Left: sticky intro + CTA */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <span className="section-badge border border-cyan-soft/25 bg-cyan-soft/10 text-cyan-soft">
              ব্যবহার ক্ষেত্র
            </span>

            <h2 className="border-l-4 border-cyan-soft py-1 pl-5 font-display text-3xl font-semibold leading-tight text-cloud sm:text-4xl">
              MiLi MiTag কি কি কাজে লাগবে?
            </h2>

            <p className="text-base leading-relaxed text-steel-soft">
              আপনার দৈনন্দিন জীবনের প্রতিটি মূল্যবান জিনিস নিরাপদ রাখতে MiTag ব্যবহার করুন
            </p>

            <div className="flex gap-3 rounded-xl border border-cyan-soft/20 bg-cyan-soft/5 p-4">
              <LightbulbIcon className="h-5 w-5 shrink-0 text-cyan-soft" />
              <p className="text-sm leading-relaxed text-cloud/90">
                <span className="font-semibold text-cyan-soft">আরও অনেক কাজে —</span>{" "}
                যেকোনো জিনিসে MiTag লাগিয়ে ট্র্যাক করুন
              </p>
            </div>

            <ContactCta />
          </div>

          {/* Right: individually-bordered cards with gap + hover lift/glow */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {useCases.map((item) => (
              <div key={item.id} className="group relative rounded-2xl">
                {/* animated gradient glow border — opacity-only transition, GPU-friendly */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo via-cyan-soft to-indigo opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />

                <div className="relative flex items-start gap-4 rounded-2xl border border-ink-line bg-ink-soft px-5 py-5 transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55)] sm:gap-6 sm:px-7 sm:py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-soft/20 bg-cyan-soft/10 text-cyan-soft transition-all duration-300 ease-out group-hover:border-cyan-soft/40 group-hover:bg-cyan-soft/15 sm:h-14 sm:w-14">
                    <UseCaseIconGlyph
                      icon={item.icon}
                      className="h-6 w-6 transition-transform duration-300 ease-out group-hover:scale-110"
                    />
                  </span>

                  <div className="flex flex-col gap-1 pt-0.5">
                    <h3 className="font-display text-base font-semibold text-cloud sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-steel-soft">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
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



// import Container from "@/components/ui/Container";
// import { site } from "@/constants/product";
// import { UseCaseIcon, useCases } from "@/constants/usecases";
// import ContactCta from "./ContactCta";

// export default function UseCases() {
//   const whatsappHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;
//   const telHref = `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`;

//   return (
//     <section id="use-cases" className="bg-cloud py-20 sm:py-24 lg:py-28" lang="bn">
//       <Container>
//         <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">
//           {/* Left: sticky intro + CTA */}
//           <div className="flex flex-col gap-6 lg:sticky lg:top-24">
//             <span className="section-badge">
//               ব্যবহার ক্ষেত্র
//             </span>

//             <h2 className="border-l-4 border-indigo py-1 pl-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
//               MiLi MiTag কি কি কাজে লাগবে?
//             </h2>

//             <p className="text-base leading-relaxed text-steel">
//               আপনার দৈনন্দিন জীবনের প্রতিটি মূল্যবান জিনিস নিরাপদ রাখতে MiTag ব্যবহার করুন
//             </p>

//             <div className="flex gap-3 rounded-xl border border-indigo/15 bg-indigo/5 p-4">
//               <LightbulbIcon className="h-5 w-5 shrink-0 text-indigo" />
//               <p className="text-sm leading-relaxed text-ink">
//                 <span className="font-semibold text-indigo">আরও অনেক কাজে —</span>{" "}
//                 যেকোনো জিনিসে MiTag লাগিয়ে ট্র্যাক করুন
//               </p>
//             </div>

//             <ContactCta />
//           </div>

//           {/* Right: numbered list, styled like the specs table */}
//           <div className="overflow-hidden rounded-2xl border border-cloud-line bg-cloud-card">
//             <div className="divide-y divide-cloud-line">
//               {useCases.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className="group flex items-start gap-4 px-5 py-5 transition-colors duration-200 hover:bg-white sm:gap-6 sm:px-7 sm:py-6"
//                 >
//                   {/* <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo-200 bg-white font-mono text-xs font-semibold tabular-nums text-indigo transition-all duration-300 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white">
//                     {String(index + 1).padStart(2, "0")}
//                   </span> */}

//                   <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-indigo group-hover:text-white group-hover:shadow-xl sm:h-14 sm:w-14">
//                     <UseCaseIconGlyph
//                       icon={item.icon}
//                       className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
//                     />
//                   </span>

//                   <div className="flex flex-col gap-1 pt-0.5">
//                     <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm leading-relaxed text-steel">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
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
