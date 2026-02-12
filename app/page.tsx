import { Suspense } from "react";

import { HeroSection } from "@/components/home/hero-section";
import { HomeContent } from "@/components/home/home-content";
import { HomeSectionsSkeleton } from "@/components/home/home-sections-skeleton";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
