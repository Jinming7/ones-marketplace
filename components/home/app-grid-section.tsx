import { AppCard } from "@/components/apps/app-card";
import type { AppItem, Vendor } from "@/lib/mock/types";

type AppGridSectionProps = {
  title: string;
  apps: AppItem[];
  vendorMap: Map<string, Vendor>;
};

export function AppGridSection({ title, apps, vendorMap }: AppGridSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} vendor={vendorMap.get(app.vendorId)} />
        ))}
      </div>
    </section>
  );
}
