
import LoginForm from "@/components/admin/LoginForm";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cloud px-5 py-12">
      {/* base gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#eef1f8_45%,#e9edf6_100%)]"
      />

      {/* soft grid, barely visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
      // style={{
      //   backgroundImage:
      //     "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
      //   backgroundSize: "56px 56px",
      // }}
      />

      {/* primary ambient glow, top center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo/15 blur-[110px]"
      />

      {/* secondary glow, lower right, adds depth without competing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo/10 blur-[100px]"
      />

      {/* faint top sheen for a "soft lighting" feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white shadow-md shadow-indigo/25">
            P
          </span>
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-display text-xl font-medium text-ink">Orbi GPS Tracker Admin</h1>
            <p className="text-sm text-steel">Sign in to manage orders.</p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-cloud-line bg-white/90 p-6 shadow-xl shadow-ink/5 backdrop-blur-sm sm:p-8">
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