import { notFound } from 'next/navigation';

import { AppHeader } from '@/components/apps/detail/app-header';
import { FeatureOverview } from '@/components/apps/detail/feature-overview';
import { PricingModule } from '@/components/apps/detail/pricing-module';
import { RelatedApps } from '@/components/apps/detail/related-apps';
import { ReviewList } from '@/components/apps/detail/review-list';
import { ScreenshotCarousel } from '@/components/apps/detail/screenshot-carousel';
import { getAppDetailBySlug, getRelatedAppsBySlug } from '@/lib/mock/app-detail-data';

type AppDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function AppDetailPage({ params }: AppDetailPageProps) {
  const app = getAppDetailBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const relatedApps = getRelatedAppsBySlug(params.slug);

  return (
    <section className="space-y-6">
      <AppHeader app={app} />
      <ScreenshotCarousel screenshots={app.screenshots} />
      <FeatureOverview features={app.features} />
      <PricingModule plans={app.pricingPlans} />
      <ReviewList reviews={app.reviews} />
      <RelatedApps apps={relatedApps} />
    </section>
  );
}
