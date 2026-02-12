import Link from 'next/link';
import { Star } from 'lucide-react';

import { InstallAction } from '@/components/apps/detail/install-action';
import type { AppDetailModel } from '@/lib/mock/app-detail-data';

type AppHeaderProps = {
  app: AppDetailModel;
};

export function AppHeader({ app }: AppHeaderProps) {
  return (
    <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-lg font-semibold text-brand">
            {app.iconText}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand">{app.categoryName}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{app.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
              <Link href={`/vendors/${app.vendorSlug}`} className="font-medium transition-colors hover:text-brand">
                {app.vendor}
              </Link>
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-brand text-brand" />
                {app.rating.toFixed(1)}
              </span>
              <span>{app.installs.toLocaleString()} installs</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{app.description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <InstallAction appName={app.name} />
        </div>
      </div>
    </section>
  );
}
