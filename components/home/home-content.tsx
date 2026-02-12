import { AppGridSection } from "@/components/home/app-grid-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { getHomeData, getVendorMap } from "@/lib/mock/repository";

export async function HomeContent() {
  const { popularApps, recommendedApps, categories } = await getHomeData();
  const vendorMap = getVendorMap();

  return (
    <div className="space-y-10">
      <AppGridSection title="Popular Apps" apps={popularApps} vendorMap={vendorMap} />
      <CategoriesSection categories={categories} />
      <AppGridSection title="Recommended For You" apps={recommendedApps} vendorMap={vendorMap} />
    </div>
  );
}
