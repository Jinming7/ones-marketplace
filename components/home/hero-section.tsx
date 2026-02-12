import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onPrimaryAction: () => void;
};

export function HeroSection({ query, onQueryChange, onPrimaryAction }: HeroSectionProps) {
  const highlights = ['Verified Vendors', 'Enterprise Ready', 'Fast Installation'];

  return (
    <section className="relative overflow-hidden rounded-lg border border-gray-300 bg-gradient-to-br from-white via-gray-100 to-white p-6 shadow-soft md:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative max-w-4xl">
        <div className="inline-flex rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          ONES Marketplace
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          Discover trusted apps that fit your delivery workflow.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
          Install production-ready integrations, automation agents, and analytics tools from verified vendors.
        </p>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative w-full md:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search by app, vendor, tag, or capability"
              className="h-11 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <Button size="lg" className="bg-brand text-white hover:bg-brand-hover" onClick={onPrimaryAction}>
            Explore Apps
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {highlights.map((item) => (
            <span key={item} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
