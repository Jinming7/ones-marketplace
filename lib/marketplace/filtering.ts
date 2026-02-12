import type { HomeApp } from '@/lib/mock/marketplace-home-data';
import type { MarketplaceSort } from '@/store/marketplace-filter-store';

export type MarketplaceFilters = {
  query: string;
  categoryId: string | null;
  sortBy: MarketplaceSort;
};

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function isSubsequence(input: string, pattern: string) {
  if (!pattern) return true;
  let cursor = 0;

  for (const char of input) {
    if (char === pattern[cursor]) {
      cursor += 1;
      if (cursor === pattern.length) return true;
    }
  }

  return false;
}

function fuzzyMatch(input: string, keyword: string) {
  const source = normalize(input);
  const token = normalize(keyword);
  if (!token) return true;

  return source.includes(token) || isSubsequence(source, token);
}

export function matchesAppQuery(app: HomeApp, query: string) {
  const normalized = normalize(query);
  if (!normalized) return true;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const fields = [app.name, app.vendor, app.description, ...app.tags];

  return tokens.every((token) => fields.some((field) => fuzzyMatch(field, token)));
}

function getAppNumericId(appId: string) {
  const value = Number(appId.replace('app-', ''));
  return Number.isNaN(value) ? 0 : value;
}

export function sortApps(apps: HomeApp[], sortBy: MarketplaceSort) {
  const sorted = [...apps];

  sorted.sort((left, right) => {
    if (sortBy === 'rating') {
      if (right.rating !== left.rating) return right.rating - left.rating;
      return right.installs - left.installs;
    }

    if (sortBy === 'latest') {
      return getAppNumericId(right.id) - getAppNumericId(left.id);
    }

    if (right.installs !== left.installs) return right.installs - left.installs;
    return right.rating - left.rating;
  });

  return sorted;
}

export function filterAndSortApps(apps: HomeApp[], filters: MarketplaceFilters) {
  const filtered = apps.filter((app) => {
    const queryMatched = matchesAppQuery(app, filters.query);
    if (!queryMatched) return false;
    if (!filters.categoryId) return true;
    return app.categoryId === filters.categoryId;
  });

  return sortApps(filtered, filters.sortBy);
}
