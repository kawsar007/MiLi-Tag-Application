import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-cloud-line bg-cloud-card sm:block">
      <div className="flex h-16 items-center gap-2 border-b border-cloud-line px-5 font-display text-base font-semibold text-ink">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo text-xs font-bold text-white">
          P
        </span>
        Admin
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-steel transition-colors hover:bg-cloud hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
