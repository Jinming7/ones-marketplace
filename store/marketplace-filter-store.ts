import { create } from 'zustand';

export type MarketplaceSort = 'installs' | 'rating' | 'latest';

export type MarketplaceFilterState = {
  query: string;
  categoryId: string | null;
  sortBy: MarketplaceSort;
  setQuery: (query: string) => void;
  setCategoryId: (categoryId: string | null) => void;
  setSortBy: (sortBy: MarketplaceSort) => void;
  setFilters: (payload: Partial<Pick<MarketplaceFilterState, 'query' | 'categoryId' | 'sortBy'>>) => void;
  resetFilters: () => void;
};

export const defaultMarketplaceFilters: Pick<MarketplaceFilterState, 'query' | 'categoryId' | 'sortBy'> = {
  query: '',
  categoryId: null,
  sortBy: 'installs',
};

export const useMarketplaceFilterStore = create<MarketplaceFilterState>((set) => ({
  ...defaultMarketplaceFilters,
  setQuery: (query) => set({ query }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilters: (payload) =>
    set((state) => ({
      query: payload.query ?? state.query,
      categoryId: payload.categoryId === undefined ? state.categoryId : payload.categoryId,
      sortBy: payload.sortBy ?? state.sortBy,
    })),
  resetFilters: () => set(defaultMarketplaceFilters),
}));
