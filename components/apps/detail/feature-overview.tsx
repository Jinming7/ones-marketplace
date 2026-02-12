import { CheckCircle2 } from 'lucide-react';

type FeatureOverviewProps = {
  features: string[];
};

export function FeatureOverview({ features }: FeatureOverviewProps) {
  return (
    <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-gray-900">Feature Overview</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 rounded-md border border-gray-300 bg-gray-100 p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <p className="text-sm text-gray-700">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
