'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { HomeCategory } from '@/lib/mock/marketplace-home-data';
import {
  defaultMarketplaceFilters,
  type MarketplaceSort,
  useMarketplaceFilterStore,
} from '@/store/marketplace-filter-store';

function parseSort(value: string | null): MarketplaceSort {
  if (value === 'rating' || value === 'latest' || value === 'installs') {
    return value;
  }

  return defaultMarketplaceFilters.sortBy;
}

export function useMarketplaceFilters(categories: HomeCategory[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);

  const categoryIds = useMemo(() => new Set(categories.map((item) => item.id)), [categories]);

  const query = useMarketplaceFilterStore((state) => state.query);
  const categoryId = useMarketplaceFilterStore((state) => state.categoryId);
  const sortBy = useMarketplaceFilterStore((state) => state.sortBy);
  const setQuery = useMarketplaceFilterStore((state) => state.setQuery);
  const setCategoryId = useMarketplaceFilterStore((state) => state.setCategoryId);
  const setSortBy = useMarketplaceFilterStore((state) => state.setSortBy);
  const setFilters = useMarketplaceFilterStore((state) => state.setFilters);
  const resetFilters = useMarketplaceFilterStore((state) => state.resetFilters);

  const urlKey = searchParams.toString();

  useEffect(() => {
    const nextQuery = searchParams.get('q') ?? '';
    const rawCategoryId = searchParams.get('category');
    const nextCategoryId = rawCategoryId && categoryIds.has(rawCategoryId) ? rawCategoryId : null;
    const nextSortBy = parseSort(searchParams.get('sort'));

    const changed = query !== nextQuery || categoryId !== nextCategoryId || sortBy !== nextSortBy;

    if (changed) {
      setFilters({
        query: nextQuery,
        categoryId: nextCategoryId,
        sortBy: nextSortBy,
      });
    }

    initializedRef.current = true;
  }, [categoryId, categoryIds, query, searchParams, setFilters, sortBy]);

  useEffect(() => {
    if (!initializedRef.current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }

    if (sortBy !== defaultMarketplaceFilters.sortBy) {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }

    const nextKey = params.toString();
    if (nextKey === urlKey) return;

    router.replace(nextKey ? `${pathname}?${nextKey}` : pathname, { scroll: false });
  }, [categoryId, pathname, query, router, searchParams, sortBy, urlKey]);

  return {
    filters: {
      query,
      categoryId,
      sortBy,
    },
    actions: {
      setQuery,
      setCategoryId,
      setSortBy,
      resetFilters,
    },
  };
}
