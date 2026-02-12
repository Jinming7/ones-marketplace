import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="rounded-2xl border bg-white p-6 md:p-10">
      <p className="text-sm font-semibold text-blue-600">ONES Marketplace</p>
      <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Discover apps that extend your ONES workflows
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Find integrations, automation tools, and reporting extensions built for modern software teams.
      </p>

      <form action="/apps" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          name="q"
          placeholder="Search apps, vendors, or categories"
          className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" className="h-11 px-6">
          Search
        </Button>
      </form>

      <div className="mt-4">
        <Button asChild variant="outline">
          <Link href="/apps">Explore All Apps</Link>
        </Button>
      </div>
    </section>
  );
}
