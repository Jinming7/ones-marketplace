import Link from 'next/link';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { HomeApp } from '@/lib/mock/marketplace-home-data';

type AppCardProps = {
  app: HomeApp;
};

const iconTones = [
  'bg-brand/10 text-brand',
  'bg-gray-300/60 text-gray-900',
  'bg-brand/20 text-brand',
  'bg-gray-100 text-gray-900',
];

function getAppInitials(name: string) {
  const tokens = name.split(' ').filter(Boolean);
  if (tokens.length === 1) return tokens[0].slice(0, 2).toUpperCase();
  return `${tokens[0][0] ?? ''}${tokens[1][0] ?? ''}`.toUpperCase();
}

export function AppCard({ app }: AppCardProps) {
  const tone = iconTones[Number(app.id.replace('app-', '')) % iconTones.length] ?? iconTones[0];

  return (
    <article className="group flex h-full flex-col rounded-lg border border-gray-300 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-sm font-semibold ${tone}`}>
          {getAppInitials(app.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">{app.name}</h3>
          <Link href={`/vendors/${app.vendorSlug}`} className="text-xs text-gray-600 transition-colors hover:text-brand">
            {app.vendor}
          </Link>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
        <span className="rounded-full border border-gray-300 bg-gray-100 px-2 py-1">{app.tags[0]}</span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-brand text-brand" />
          {app.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">{app.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {app.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-gray-600">
        <span>{app.installs.toLocaleString()} installs</span>
        <span>{app.tags.length} tags</span>
      </div>

      <div className="mt-5">
        <Button asChild size="sm" className="w-full bg-brand text-white hover:bg-brand-hover">
          <Link href={`/apps/${app.slug}`}>{app.cta}</Link>
        </Button>
      </div>
    </article>
  );
}
