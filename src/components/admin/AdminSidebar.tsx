import { ListOrdered, ShieldCheck, SquareChartGantt } from "lucide-react"; // Assuming you're using lucide-react
import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview", icon: SquareChartGantt },
  { href: "/admin/orders", label: "Orders", icon: ListOrdered },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-gray-700 bg-gray-900 sm:block">
      <div className="flex h-16 items-center gap-2 border-b border-gray-700 px-5 font-display text-base font-semibold text-gray-100">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
          <ShieldCheck />
        </span>
        Admin
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-100"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
