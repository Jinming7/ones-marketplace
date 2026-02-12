import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "Apps" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-300 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900">
          <span className="h-2 w-2 rounded-full bg-brand" />
          ONES Marketplace
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
