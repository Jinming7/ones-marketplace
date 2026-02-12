import { Button } from '@/components/ui/button';
import type { MarketplaceSort } from '@/store/marketplace-filter-store';

type FilterToolbarProps = {
  total: number;
  activeCategoryId: string | null;
  hasActiveFilter: boolean;
  sortBy: MarketplaceSort;
  onSortChange: (sort: MarketplaceSort) => void;
  onClear: () => void;
};

const sortOptions: Array<{ value: MarketplaceSort; label: string }> = [
  { value: 'installs', label: 'Most Installs' },
  { value: 'rating', label: 'Highest Rating' },
  { value: 'latest', label: 'Latest' },
];

export function FilterToolbar({
  total,
  activeCategoryId,
  hasActiveFilter,
  sortBy,
  onSortChange,
  onClear,
}: FilterToolbarProps) {
  return (
    <section className="rounded-lg border border-gray-300 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{total}</span> apps
          {activeCategoryId !== null ? ' in selected category' : ''}.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as MarketplaceSort)}
              className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {hasActiveFilter ? (
            <Button variant="outline" size="sm" className="border-gray-300" onClick={onClear}>
              Clear Filters
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
