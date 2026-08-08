"use client";

import type { AdminSession } from "@/types/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminTopbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/mili-tag/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.admin) setAdmin(data.admin);
      })
      .catch(() => { });
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
      setShowLogoutModal(false);
    }
  }

  // Generate initials for avatar fallback
  const initials = admin?.name
    ? admin.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "A";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-end sm:justify-between border-b border-cloud-line/80 bg-cloud-card/80 px-4 sm:px-8 backdrop-blur-md transition-all">

        {/* Left section / Brand identifier — Hidden on Mobile */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <span className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
            Admin Workspace
          </span>
        </div>

        {/* Right section / Profile & Logout */}
        <div className="flex items-center gap-3 sm:gap-6">
          {admin ? (
            <div className="flex items-center gap-3 border-r border-cloud-line pr-3 sm:pr-6">
              {/* User Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-xs ring-2 ring-cloud-line sm:h-9 sm:w-9">
                {initials}
              </div>

              {/* User Name (Desktop shows Name + Email, Mobile can show Name or be hidden if preferred) */}
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-none text-ink sm:text-sm hidden sm:inline">
                  {admin.name}
                </span>
                {/* Email hidden on Mobile */}
                <span className="mt-1 hidden text-xs text-steel sm:inline">
                  {admin.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-8 w-24 animate-pulse rounded-full bg-cloud-line/40 sm:w-32"></div>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="group inline-flex items-center gap-2 rounded-lg border border-cloud-line bg-white/50 px-3 py-1.5 text-xs font-medium text-ink shadow-xs transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 active:scale-95 sm:px-3.5"
          >
            <svg
              className="h-3.5 w-3.5 text-steel transition-colors group-hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => !isLoggingOut && setShowLogoutModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">
                  Confirm Logout
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Are you sure you want to log out of the admin panel? You will need to sign in again to manage orders.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging out…</span>
                  </>
                ) : (
                  "Log out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import type { AdminSession } from "@/types/order";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AdminTopbar() {
//   const router = useRouter();
//   const [admin, setAdmin] = useState<AdminSession | null>(null);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     fetch("/api/auth/me")
//       .then((res) => (res.ok ? res.json() : null))
//       .then((data) => {
//         if (!cancelled && data?.admin) setAdmin(data.admin);
//       })
//       .catch(() => { });
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   async function handleLogout() {
//     setIsLoggingOut(true);
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//       router.push("/admin/login");
//       router.refresh();
//     } finally {
//       setIsLoggingOut(false);
//     }
//   }

//   return (
//     <header className="flex h-16 items-center justify-end border-b border-cloud-line bg-cloud-card px-5 sm:px-8">
//       {/* <span className="font-display text-lg font-medium text-ink">Orbi GPS Tracker Admin</span> */}
//       <div className="flex items-center gap-4">
//         {admin ? (
//           <span className="hidden text-sm text-steel sm:inline">
//             {admin.name} · {admin.email}
//           </span>
//         ) : null}
//         <button
//           type="button"
//           onClick={handleLogout}
//           disabled={isLoggingOut}
//           className="rounded-full border border-cloud-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-indigo hover:text-indigo disabled:opacity-60"
//         >
//           {isLoggingOut ? "Logging out…" : "Log out"}
//         </button>
//       </div>
//     </header>
//   );
// }
