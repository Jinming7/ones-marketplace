import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "Apps" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          ONES Marketplace
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
