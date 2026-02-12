"use client";

import { Button } from "@/components/ui/button";

export function BrandPreviewContent() {
  return (
    <div className="w-full space-y-6">
      <section className="rounded-lg border bg-card p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-gray-900">ONES Brand Preview</h2>
        <p className="mt-2 text-gray-600">
          This page validates token wiring and ONES Design component integration.
        </p>
        <div className="flex items-center gap-3">
          <Button className="bg-brand text-white hover:bg-brand-hover">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
        </div>
      </section>

      <section className="rounded-md border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-gray-900">Surface Preview</h3>
        <div className="space-y-2">
          <p className="text-gray-900">
            Tokenized surface with neutral background and soft shadow.
          </p>
          <p className="text-gray-600">
            Colors, radius and shadow are mapped from `/brand/tokens.json` through CSS variables.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold text-gray-900">Palette Preview</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border bg-brand p-4 text-white">Brand</div>
          <div className="rounded-sm border bg-brand-hover p-4 text-white">Brand Hover</div>
          <div className="rounded-sm border bg-gray-100 p-4 text-gray-900">Gray 100</div>
          <div className="rounded-sm border bg-white p-4 text-gray-900">White</div>
        </div>
      </section>
    </div>
  );
}
