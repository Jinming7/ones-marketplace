"use client";

import type { ComponentType } from "react";
import { Button, Card, Typography } from "@ones-design/core";

type UnsafeComponent = ComponentType<Record<string, unknown>>;

const OnesButton = Button as unknown as UnsafeComponent;
const OnesCard = Card as unknown as UnsafeComponent;
const OnesTypography = Typography as unknown as {
  Title: UnsafeComponent;
  Paragraph: UnsafeComponent;
  Text: UnsafeComponent;
};

export function BrandPreviewContent() {
  return (
    <div className="w-full space-y-6">
      <section className="rounded-lg border bg-card p-6 shadow-soft">
        <OnesTypography.Title level={3}>ONES Brand Preview</OnesTypography.Title>
        <OnesTypography.Paragraph className="text-gray-600">
          This page validates token wiring and ONES Design component integration.
        </OnesTypography.Paragraph>
        <div className="flex items-center gap-3">
          <OnesButton type="primary">Primary Action</OnesButton>
          <OnesButton type="default">Secondary Action</OnesButton>
        </div>
      </section>

      <OnesCard title="Surface Preview" className="rounded-md shadow-soft">
        <div className="space-y-2">
          <OnesTypography.Text className="text-gray-900">
            Tokenized surface with neutral background and soft shadow.
          </OnesTypography.Text>
          <OnesTypography.Text className="text-gray-600">
            Colors, radius and shadow are mapped from `/brand/tokens.json` through CSS variables.
          </OnesTypography.Text>
        </div>
      </OnesCard>

      <section className="rounded-lg border bg-card p-6">
        <OnesTypography.Title level={5}>Palette Preview</OnesTypography.Title>
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
