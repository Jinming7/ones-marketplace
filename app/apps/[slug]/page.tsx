import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getAppBySlug, getVendorById } from "@/lib/mock/repository";

type AppDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function AppDetailPage({ params }: AppDetailPageProps) {
  const app = getAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const vendor = getVendorById(app.vendorId);

  return (
    <section className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-slate-500">App Detail</p>
        <h1 className="mt-1 text-3xl font-semibold text-slate-900">{app.name}</h1>
        <p className="mt-2 text-slate-600">{app.description}</p>
        <p className="mt-3 text-sm text-slate-500">Vendor: {vendor?.name ?? "Unknown"}</p>
        <div className="mt-6">
          <Button>Install (Mock)</Button>
        </div>
      </div>
    </section>
  );
}
