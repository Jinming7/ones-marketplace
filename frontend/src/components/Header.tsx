import Link from "next/link";

interface HeaderProps {
  showLogin?: boolean;
  showPartnerPortal?: boolean;
  className?: string;
}

export function Header({ showLogin = true, showPartnerPortal = true, className = "" }: HeaderProps) {
  return (
    <nav className={`border-b border-slate-200 bg-white/95 ${className}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <img src="/placeholder-ones-logo.svg" alt="ONES.com logo" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">
            <a className="hover:text-slate-900" href="#">
              Apps
            </a>
            <a className="hover:text-slate-900" href="#">
              Categories
            </a>
            <a className="hover:text-slate-900" href="#">
              Collections
            </a>
            <a className="hover:text-slate-900" href="#">
              Resources
            </a>
          </div>

          {showPartnerPortal ? (
            <button className="text-sm font-medium text-slate-500 hover:text-slate-800">Partner Portal</button>
          ) : null}

          {showLogin ? (
            <button className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
              Log in
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
