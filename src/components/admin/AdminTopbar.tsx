"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminSession } from "@/types/order";

export default function AdminTopbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.admin) setAdmin(data.admin);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-cloud-line bg-cloud-card px-5 sm:px-8">
      <span className="font-display text-lg font-medium text-ink">Pulse Pro Admin</span>
      <div className="flex items-center gap-4">
        {admin ? (
          <span className="hidden text-sm text-steel sm:inline">
            {admin.name} · {admin.email}
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-full border border-cloud-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-indigo hover:text-indigo disabled:opacity-60"
        >
          {isLoggingOut ? "Logging out…" : "Log out"}
        </button>
      </div>
    </header>
  );
}
