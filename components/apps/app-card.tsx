import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { AppItem, Vendor } from "@/lib/mock/types";

type AppCardProps = {
  app: AppItem;
  vendor?: Vendor;
};

export function AppCard({ app, vendor }: AppCardProps) {
  return (
    <article className="group rounded-xl border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-lg">
          <span>{app.icon}</span>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {app.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">{app.name}</h3>
        <p className="text-sm text-slate-500">{vendor?.name ?? "Unknown Vendor"}</p>
        <p className="line-clamp-2 text-sm text-slate-600">{app.tagline}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{app.installCount.toLocaleString()} installs</span>
        <span>⭐ {app.rating.toFixed(1)}</span>
      </div>

      <div className="mt-4">
        <Button asChild variant="outline" size="sm" className="w-full group-hover:border-slate-400">
          <Link href={`/apps/${app.slug}`}>View App</Link>
        </Button>
      </div>
    </article>
  );
}
