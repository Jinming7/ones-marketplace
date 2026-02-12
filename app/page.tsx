import { Suspense } from 'react';

import { MarketplaceHomeContent } from '@/components/home/marketplace-home-content';
import { homeApps, homeCategories } from '@/lib/mock/marketplace-home-data';

function HomePageFallback() {
  return (
    <div className="space-y-4">
      <div className="h-48 animate-pulse rounded-lg border border-gray-300 bg-white" />
      <div className="h-16 animate-pulse rounded-lg border border-gray-300 bg-white" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="h-64 animate-pulse rounded-lg border border-gray-300 bg-white" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <MarketplaceHomeContent apps={homeApps} categories={homeCategories} />
    </Suspense>
  );
}
