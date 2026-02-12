import { AppsExplorer } from "@/components/apps/apps-explorer";
import { appList, categoryList } from "@/lib/mock/repository";

export default function AppsPage() {
  return <AppsExplorer apps={appList} categories={categoryList} />;
}
