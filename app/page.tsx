import { MarketplaceHomeContent } from '@/components/home/marketplace-home-content';
import { homeApps, homeCategories } from '@/lib/mock/marketplace-home-data';

export default function HomePage() {
  return <MarketplaceHomeContent apps={homeApps} categories={homeCategories} />;
}
