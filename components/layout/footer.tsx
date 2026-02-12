import Link from 'next/link';

const footerGroups = [
  {
    title: 'Marketplace',
    links: [
      { href: '/apps', label: 'All Apps' },
      { href: '/categories/project-management', label: 'Categories' },
      { href: '/vendors/ones-official', label: 'Vendors' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/brand-preview', label: 'Brand Preview' },
      { href: '/admin', label: 'Admin' },
      { href: '/', label: 'Changelog' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-300 bg-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">ONES Marketplace</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Discover integration apps, trusted vendors, and automation tools designed for ONES teams.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-gray-900">{group.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} ONES Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
