import type { HomeCategory } from '@/lib/mock/marketplace-home-data';

type CategoryEntryGridProps = {
  categories: HomeCategory[];
  activeCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

export function CategoryEntryGrid({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoryEntryGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`rounded-md border p-4 text-left transition ${
          activeCategoryId === null
            ? 'border-brand bg-brand/5 shadow-soft'
            : 'border-gray-300 bg-white hover:border-brand/50 hover:bg-gray-100'
        }`}
      >
        <p className="text-sm font-semibold text-gray-900">All Categories</p>
        <p className="mt-1 text-xs text-gray-600">Browse all integrations and tools.</p>
      </button>

      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`rounded-md border p-4 text-left transition ${
              isActive
                ? 'border-brand bg-brand/5 shadow-soft'
                : 'border-gray-300 bg-white hover:border-brand/50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-gray-900">{category.name}</p>
              <span className="text-xs text-brand">{isActive ? 'Selected' : 'Enter'}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-600">{category.description}</p>
          </button>
        );
      })}
    </div>
  );
}
