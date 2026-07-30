import Container from "@/components/ui/Container";
import { site } from "@/constants/product";

const developerWhatsapp = "8801638600627";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-5">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 md:flex-row">
          {/* Left */}
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>

          {/* Center */}
          <a
            href={`https://wa.me/${developerWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-emerald-50"
          >
            <span>Made with</span>

            <span className="text-red-500 transition-transform duration-300 group-hover:scale-125">
              ❤️
            </span>

            <span>by</span>

            <span className="font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
              Kawsar
            </span>
          </a>

          {/* Right */}
          <span className="font-medium">
            ক্যাশ অন ডেলিভারি • ঢাকা ও সারা বাংলাদেশ
          </span>
        </div>
      </Container>
    </footer>
  );
}

// import Container from "@/components/ui/Container";
// import { site } from "@/constants/product";

// export default function Footer() {
//   return (
//     <footer className="border-t border-ink-line bg-ink text-steel-soft">
//       {/* <Container className="grid gap-10 py-14 sm:grid-cols-3">
//         <div className="flex flex-col gap-3">
//           <span className="flex items-center gap-2 font-display text-lg font-semibold text-cloud">
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">
//               P
//             </span>
//             {site.name}
//           </span>
//           <p className="max-w-xs text-sm leading-relaxed">
//             Everyday audio gear, sold direct with Cash on Delivery — no account, no advance payment.
//           </p>
//         </div>

//         <div className="flex flex-col gap-3">
//           <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Explore</span>
//           <nav className="flex flex-col gap-2" aria-label="Footer">
//             {site.nav.map((link) => (
//               <a key={link.href} href={link.href} className="text-sm transition-colors hover:text-cyan">
//                 {link.label}
//               </a>
//             ))}
//           </nav>
//         </div>

//         <div className="flex flex-col gap-3">
//           <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Follow</span>
//           <div className="flex gap-3">
//             {site.social.map((s) => (
//               <a
//                 key={s.label}
//                 href={s.href}
//                 aria-label={s.label}
//                 className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-xs transition-colors hover:border-cyan hover:text-cyan"
//               >
//                 {s.label.slice(0, 1)}
//               </a>
//             ))}
//           </div>
//         </div>
//       </Container> */}

//       <div className="border-t border-ink-line">
//         <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-steel sm:flex-row">
//           <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
//           <span>ক্যাশ অন ডেলিভারি · ঢাকা &amp; দেশব্যাপী</span>
//         </Container>
//       </div>
//     </footer>
//   );
// }