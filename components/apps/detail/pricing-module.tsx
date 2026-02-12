import type { AppPricingPlan } from '@/lib/mock/app-detail-data';

type PricingModuleProps = {
  plans: AppPricingPlan[];
};

export function PricingModule({ plans }: PricingModuleProps) {
  return (
    <section className="rounded-lg border border-gray-300 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
      <p className="mt-1 text-sm text-gray-600">Transparent plans for growing product and engineering teams.</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`rounded-lg border p-4 ${plan.recommended ? 'border-brand bg-brand/5' : 'border-gray-300 bg-gray-100'}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">{plan.name}</h3>
              {plan.recommended ? <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white">Popular</span> : null}
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900">{plan.priceLabel}</p>
            <p className="text-xs text-gray-600">{plan.billingLabel}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
