"use client";

import { ListOrdered, Menu, Settings, ShieldCheck, SquareChartGantt, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/admin", label: "Overview", icon: SquareChartGantt },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
  { href: "/admin/product", label: "Product", icon: Settings },
  { href: "/admin/profile", label: "Profile", icon: User },
];

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 300);
  };

  const handleNavClick = () => {
    closeMobileSidebar();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        closeMobileSidebar();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = sidebarRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isMobileOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <button
        ref={menuButtonRef}
        onClick={toggleMobileSidebar}
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200/80 bg-white p-2 text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-white active:scale-95 lg:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop Sidebar - Fixed Position */}
      <aside className="fixed left-0 top-0 hidden h-screen w-56 flex-col border-r border-gray-700 bg-gray-900 lg:flex">
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-700 px-5 font-display text-base font-semibold text-gray-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
            <ShieldCheck className="h-4 w-4" />
          </span>
          Admin
        </div>

        {/* Main Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto p-3" aria-label="Main navigation">
          <ul className="space-y-1">
            {links.slice(0, -1).map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section with Profile */}
        <div className="border-t border-gray-700 p-3">
          <Link
            href="/admin/profile"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActiveLink("/admin/profile")
              ? "bg-gray-800 text-gray-100"
              : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              }`}
            aria-current={isActiveLink("/admin/profile") ? "page" : undefined}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        id="mobile-sidebar"
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          willChange: "transform",
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-700 px-4">
          <div className="flex items-center gap-2 font-display text-base font-semibold text-gray-100">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
            Admin
          </div>
          <button
            ref={closeButtonRef}
            onClick={closeMobileSidebar}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
          style={{
            willChange: "opacity",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        />
      )}
    </>
  );
}



// import { ListOrdered, ShieldCheck, SquareChartGantt } from "lucide-react"; // Assuming you're using lucide-react
// import Link from "next/link";

// const links = [
//   { href: "/admin", label: "Overview", icon: SquareChartGantt },
//   { href: "/admin/orders", label: "Orders", icon: ListOrdered },
// ];

// export default function AdminSidebar() {
//   return (
//     <aside className="hidden w-56 shrink-0 border-r border-gray-700 bg-gray-900 sm:block">
//       <div className="flex h-16 items-center gap-2 border-b border-gray-700 px-5 font-display text-base font-semibold text-gray-100">
//         <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
//           <ShieldCheck />
//         </span>
//         Admin
//       </div>
//       <nav className="flex flex-col gap-1 p-3">
//         {links.map((link) => {
//           const Icon = link.icon;
//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-100"
//             >
//               <Icon className="h-4 w-4" />
//               {link.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }
