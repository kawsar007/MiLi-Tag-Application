import Container from "@/components/ui/Container";
import Link from "next/link";

export default function LostToFoundBanner() {
  return (
    <section className="bg-cloud">
      <Container className="flex justify-center py-3 sm:py-4">
        <Link
          href="#product"
          aria-label="See how MiTag turns lost items into found ones"
          className="group inline-flex items-center gap-1.5 sm:gap-3 lg:gap-4"
        >
          <span className="flex flex-col items-end text-right leading-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-steel sm:text-[10px] lg:text-xs">
              From
            </span>
            <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-ink sm:text-2xl lg:text-4xl">
              Lost
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink transition-colors duration-200 group-hover:bg-indigo" />
            <span className="h-px w-4 shrink-0 border-t-2 border-dashed border-steel/50 transition-colors duration-200 group-hover:border-indigo/70 sm:w-8 lg:w-14" />
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-ink transition-colors duration-200 group-hover:text-indigo sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            <span className="h-px w-4 shrink-0 border-t-2 border-dashed border-steel/50 transition-colors duration-200 group-hover:border-indigo/70 sm:w-8 lg:w-14" />
            <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-ink transition-all duration-200 group-hover:translate-x-1 group-hover:text-indigo sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
          </span>

          <span className="flex flex-col items-start text-left leading-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-steel sm:text-[10px] lg:text-xs">
              To
            </span>
            <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-ink sm:text-2xl lg:text-4xl">
              Found
            </span>
          </span>
        </Link>
      </Container>
    </section>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <circle cx={12} cy={9} r={2.3} stroke="currentColor" strokeWidth={1.8} />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12h14M13 6l7 6-7 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// import Container from "@/components/ui/Container";
// import Link from "next/link";

// export default function LostToFoundBanner() {
//   return (
//     <section className="relative overflow-hidden border-b border-cloud-line bg-gradient-to-r from-cloud via-white to-cloud">
//       {/* subtle premium sheen */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.04),transparent)]"
//       />

//       <Container className="flex justify-center py-1.5 sm:py-2">
//         <Link
//           href="#product"
//           aria-label="See how MiTag turns lost items into found ones"
//           className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 lg:gap-3"
//         >
//           {/* From / Lost */}
//           <span className="flex flex-col items-end leading-none">
//             <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-steel/80 sm:text-[9px]">
//               From
//             </span>
//             <span className="font-display text-base font-extrabold uppercase tracking-tight text-ink sm:text-lg lg:text-xl">
//               Lost
//             </span>
//           </span>

//           {/* Connector + icons */}
//           <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
//             <span className="h-1 w-1 shrink-0 rounded-full bg-ink/80 transition-colors duration-300 group-hover:bg-indigo" />
//             <span className="h-px w-3 shrink-0 border-t border-dashed border-steel/40 transition-colors duration-300 group-hover:border-indigo/60 sm:w-5 lg:w-8" />
//             <MapPinIcon className="h-3 w-3 shrink-0 text-ink/80 transition-colors duration-300 group-hover:text-indigo sm:h-3.5 sm:w-3.5" />
//             <span className="h-px w-3 shrink-0 border-t border-dashed border-steel/40 transition-colors duration-300 group-hover:border-indigo/60 sm:w-5 lg:w-8" />
//             <ArrowIcon className="h-3 w-3 shrink-0 text-ink/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-indigo sm:h-3.5 sm:w-3.5" />
//           </span>

//           {/* To / Found */}
//           <span className="flex flex-col items-start leading-none">
//             <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-steel/80 sm:text-[9px]">
//               To
//             </span>
//             <span className="font-display text-base font-extrabold uppercase tracking-tight text-ink sm:text-lg lg:text-xl">
//               Found
//             </span>
//           </span>

//           {/* subtle CTA pill that appears on larger screens */}
//           <span className="ml-1.5 hidden items-center gap-1 rounded-full bg-indigo/8 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-indigo transition-all duration-300 group-hover:bg-indigo/12 sm:inline-flex lg:ml-2 lg:px-2.5 lg:text-[10px]">
//             See how
//             <svg
//               viewBox="0 0 12 12"
//               className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
//               fill="none"
//               aria-hidden="true"
//             >
//               <path
//                 d="M2 6h7M6.5 3.5 9.5 6l-3 2.5"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </span>
//         </Link>
//       </Container>
//     </section>
//   );
// }

// function MapPinIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
//         stroke="currentColor"
//         strokeWidth={1.8}
//         strokeLinejoin="round"
//       />
//       <circle cx={12} cy={9} r={2.3} stroke="currentColor" strokeWidth={1.8} />
//     </svg>
//   );
// }

// function ArrowIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
//       <path
//         d="M4 12h14M13 6l7 6-7 6"
//         stroke="currentColor"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }