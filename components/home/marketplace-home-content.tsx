'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { AppCard } from '@/components/home/app-card';
import { AppCardSkeleton } from '@/components/home/app-card-skeleton';
import { CategoryEntryGrid } from '@/components/home/category-entry-grid';
import { HeroSection } from '@/components/home/hero-section';
import { SectionHeader } from '@/components/home/section-header';
import type { HomeApp, HomeCategory } from '@/lib/mock/marketplace-home-data';

type MarketplaceHomeContentProps = {
  apps: HomeApp[];
  categories: HomeCategory[];
};

const skeletonPlaceholders = Array.from({ length: 8 }, (_, index) => `skeleton-${index}`);

function matchesQuery(app: HomeApp, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return (
    app.name.toLowerCase().includes(normalized) ||
    app.vendor.toLowerCase().includes(normalized) ||
    app.description.toLowerCase().includes(normalized) ||
    app.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

function filterApps(apps: HomeApp[], query: string, categoryId: string | null) {
  return apps.filter((app) => {
    const queryMatched = matchesQuery(app, query);
    if (!queryMatched) return false;
    if (!categoryId) return true;
    return app.categoryId === categoryId;
  });
}

export function MarketplaceHomeContent({ apps, categories }: MarketplaceHomeContentProps) {
  const [query, setQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  function triggerSectionLoading() {
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }
    setIsLoading(true);
    loadingTimerRef.current = window.setTimeout(() => {
      setIsLoading(false);
      loadingTimerRef.current = null;
    }, 260);
  }

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  const filteredApps = useMemo(() => {
    return filterApps(apps, query, activeCategoryId);
  }, [activeCategoryId, apps, query]);

  const featuredApps = useMemo(() => {
    return filteredApps.filter((app) => app.featured).slice(0, 8);
  }, [filteredApps]);

  const recommendedApps = useMemo(() => {
    return filteredApps.filter((app) => app.recommended).slice(0, 6);
  }, [filteredApps]);

  const primaryTarget = activeCategoryId ? '#popular-apps' : '#recommended-apps';
  const hasActiveFilter = Boolean(query.trim()) || activeCategoryId !== null;

  return (
    <div className="space-y-12 pb-2">
      <HeroSection
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          triggerSectionLoading();
        }}
        onPrimaryAction={() => {
          const target = document.querySelector(primaryTarget);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <section className="space-y-4" id="categories">
        <SectionHeader
          title="Categories"
          description="Enter by domain to find apps that align with your team workflow."
        />
        <CategoryEntryGrid
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(categoryId) => {
            setActiveCategoryId(categoryId);
            triggerSectionLoading();
          }}
        />
      </section>

      <section className="rounded-lg border border-gray-300 bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredApps.length}</span> apps
            {activeCategoryId !== null ? ' in selected category' : ''}.
          </p>
          {hasActiveFilter ? (
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              onClick={() => {
                setQuery('');
                setActiveCategoryId(null);
                triggerSectionLoading();
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      </section>

      <section className="space-y-4" id="popular-apps">
        <SectionHeader
          title="Popular Apps"
          description="Top installed apps across ONES teams this month."
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skeletonPlaceholders.map((key) => (
              <AppCardSkeleton key={key} />
            ))}
          </div>
        ) : featuredApps.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
            No popular apps matched your current filter.
          </div>
        )}
      </section>

      <section className="space-y-4" id="recommended-apps">
        <SectionHeader
          title="Recommended for You"
          description="Curated suggestions based on current trends and delivery needs."
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skeletonPlaceholders.slice(0, 6).map((key) => (
              <AppCardSkeleton key={key} />
            ))}
          </div>
        ) : recommendedApps.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
            No recommended apps matched your current filter.
          </div>
        )}
      </section>
    </div>
  );
}
