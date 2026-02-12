import { AppCard } from '@/components/home/app-card';
import type { HomeApp } from '@/lib/mock/marketplace-home-data';

type RelatedAppsProps = {
  apps: HomeApp[];
};

export function RelatedApps({ apps }: RelatedAppsProps) {
  if (apps.length === 0) return null;

  return (
    <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-gray-900">Related Apps</h2>
      <p className="mt-1 text-sm text-gray-600">More tools often installed together by similar teams.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
