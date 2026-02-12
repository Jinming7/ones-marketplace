import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border bg-white p-8">
        <p className="text-sm font-medium text-blue-600">ONES Marketplace</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Discover apps to power your ONES workflow
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Browse integrations, automation add-ons and reporting tools from verified vendors.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/apps">Browse Apps</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin">Open Admin</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
