import { Suspense } from "react";

import { AppsExplorer } from "@/components/apps/apps-explorer";
import { appList, categoryList } from "@/lib/mock/repository";

export default function AppsPage() {
  return (
    <Suspense fallback={<div className="h-24 animate-pulse rounded-lg border border-gray-300 bg-white" />}>
      <AppsExplorer apps={appList} categories={categoryList} />
    </Suspense>
  );
}
