import Link from "next/link";

import type { Category } from "@/lib/mock/types";

type CategoriesSectionProps = {
  categories: Category[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Categories</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="rounded-xl border bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <h3 className="font-semibold text-slate-900">{category.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
