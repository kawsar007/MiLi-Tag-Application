import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo text-sm font-bold text-white">
            P
          </span>
          <h1 className="font-display text-xl font-medium text-cloud">Pulse Pro Admin</h1>
          <p className="text-sm text-steel-soft">Sign in to manage orders.</p>
        </div>

        <div className="w-full rounded-2xl border border-ink-line bg-ink-soft p-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
