import LoginForm from "@/components/admin/LoginForm";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cloud px-5 py-12">
      {/* subtle ambient glow, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo/10 blur-3xl"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white shadow-md shadow-indigo/25">
            P
          </span>
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-display text-xl font-medium text-ink">Orbi MiLi MiTag Admin</h1>
            <p className="text-sm text-steel">Sign in to manage orders.</p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-cloud-line bg-white p-6 shadow-xl shadow-ink/5 sm:p-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-steel">
          Restricted access — authorized administrators only.
        </p>
      </div>
    </div>
  );
}


// import LoginForm from "@/components/admin/LoginForm";
// import { Suspense } from "react";

// export default function AdminLoginPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-ink px-5">
//       <div className="flex w-full max-w-sm flex-col items-center gap-8">
//         <div className="flex flex-col items-center gap-2 text-center">
//           <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">
//             P
//           </span>
//           <h1 className="font-display text-xl font-medium text-cloud">MiLi Tag Admin</h1>
//           <p className="text-sm text-steel-soft">Sign in to manage orders.</p>
//         </div>

//         <div className="w-full rounded-2xl border border-ink-line bg-ink-soft p-6">
//           <Suspense fallback={null}>
//             <LoginForm />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }
