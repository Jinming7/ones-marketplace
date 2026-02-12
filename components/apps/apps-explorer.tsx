"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import type { AppItem, Category } from "@/lib/mock/types";
import { useAppFilterStore } from "@/store/app-filter-store";

type AppsExplorerProps = {
  apps: AppItem[];
  categories: Category[];
};

export function AppsExplorer({ apps, categories }: AppsExplorerProps) {
  const query = useAppFilterStore((state) => state.query);
  const setQuery = useAppFilterStore((state) => state.setQuery);

  const filteredApps = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return apps;

    return apps.filter((app) => {
      return (
        app.name.toLowerCase().includes(normalized) ||
        app.tagline.toLowerCase().includes(normalized)
      );
    });
  }, [apps, query]);

  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">Apps</h1>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps..."
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring md:w-72"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredApps.map((app) => (
          <article key={app.id} className="rounded-lg border bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{app.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{app.tagline}</p>
            <p className="mt-3 text-xs text-slate-500">
              Categories: {app.categoryIds.map((id) => categoryMap.get(id) ?? id).join(", ")}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>⭐ {app.rating}</span>
              <span>{app.installCount.toLocaleString()} installs</span>
            </div>
            <div className="mt-4">
              <Button asChild size="sm">
                <Link href={`/apps/${app.slug}`}>View Details</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
