'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import { DebugBorder } from '@/components/debug/debug-border';
import { AppCard } from '@/components/home/app-card';
import { AppCardSkeleton } from '@/components/home/app-card-skeleton';
import { CategoryEntryGrid } from '@/components/home/category-entry-grid';
import { FilterToolbar } from '@/components/home/filter-toolbar';
import { HeroSection } from '@/components/home/hero-section';
import { SectionHeader } from '@/components/home/section-header';
import { useDebugUI } from '@/hooks/use-debug-ui';
import { useMarketplaceFilters } from '@/hooks/use-marketplace-filters';
import { filterAndSortApps } from '@/lib/marketplace/filtering';
import type { HomeApp, HomeCategory } from '@/lib/mock/marketplace-home-data';

type MarketplaceHomeContentProps = {
  apps: HomeApp[];
  categories: HomeCategory[];
};

const skeletonPlaceholders = Array.from({ length: 8 }, (_, index) => `skeleton-${index}`);

export function MarketplaceHomeContent({ apps, categories }: MarketplaceHomeContentProps) {
  const debugEnabled = useDebugUI();
  const { filters, actions } = useMarketplaceFilters(categories);
  const deferredQuery = useDeferredValue(filters.query);

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
    return filterAndSortApps(apps, {
      query: deferredQuery,
      categoryId: filters.categoryId,
      sortBy: filters.sortBy,
    });
  }, [apps, deferredQuery, filters.categoryId, filters.sortBy]);

  const featuredApps = useMemo(() => {
    return filteredApps.filter((app) => app.featured).slice(0, 8);
  }, [filteredApps]);

  const recommendedApps = useMemo(() => {
    return filteredApps.filter((app) => app.recommended).slice(0, 6);
  }, [filteredApps]);

  const primaryTarget = filters.categoryId ? '#popular-apps' : '#recommended-apps';
  const hasActiveFilter = Boolean(filters.query.trim()) || filters.categoryId !== null;

  return (
    <DebugBorder
      enabled={debugEnabled}
      componentName="MarketplaceHomeContent"
      filePath="components/home/marketplace-home-content.tsx"
    >
      <div className="space-y-12 pb-2">
        <DebugBorder enabled={debugEnabled} componentName="HeroSection" filePath="components/home/hero-section.tsx">
          <HeroSection
            query={filters.query}
            onQueryChange={(value) => {
              actions.setQuery(value);
              triggerSectionLoading();
            }}
            onPrimaryAction={() => {
              const target = document.querySelector(primaryTarget);
              target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        </DebugBorder>

        <DebugBorder
          enabled={debugEnabled}
          componentName="CategorySection"
          filePath="components/home/category-entry-grid.tsx"
        >
          <section className="space-y-4" id="categories">
            <SectionHeader
              title="Categories"
              description="Enter by domain to find apps that align with your team workflow."
            />
            <CategoryEntryGrid
              categories={categories}
              activeCategoryId={filters.categoryId}
              onSelectCategory={(categoryId) => {
                actions.setCategoryId(categoryId);
                triggerSectionLoading();
              }}
            />
          </section>
        </DebugBorder>

        <DebugBorder
          enabled={debugEnabled}
          componentName="FilterToolbar"
          filePath="components/home/filter-toolbar.tsx"
        >
          <FilterToolbar
            total={filteredApps.length}
            activeCategoryId={filters.categoryId}
            hasActiveFilter={hasActiveFilter}
            sortBy={filters.sortBy}
            onSortChange={(sort) => {
              actions.setSortBy(sort);
              triggerSectionLoading();
            }}
            onClear={() => {
              actions.resetFilters();
              triggerSectionLoading();
            }}
          />
        </DebugBorder>

        <DebugBorder
          enabled={debugEnabled}
          componentName="PopularAppsSection"
          filePath="components/home/marketplace-home-content.tsx"
        >
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
                  <AppCard key={app.id} app={app} debug={debugEnabled} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
                No popular apps matched your current filter.
              </div>
            )}
          </section>
        </DebugBorder>

        <DebugBorder
          enabled={debugEnabled}
          componentName="RecommendedAppsSection"
          filePath="components/home/marketplace-home-content.tsx"
        >
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
                  <AppCard key={app.id} app={app} debug={debugEnabled} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
                No recommended apps matched your current filter.
              </div>
            )}
          </section>
        </DebugBorder>
      </div>
    </DebugBorder>
  );
}
