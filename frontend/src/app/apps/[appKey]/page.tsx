import { AppDetailPage } from "@/components/AppDetailPage";
import { getAppDetail } from "@/lib/api";

interface AppDetailRouteProps {
  params: Promise<{ appKey: string }>;
}

export default async function AppDetailRoute({ params }: AppDetailRouteProps) {
  const { appKey } = await params;
  const app = await getAppDetail(appKey);

  return <AppDetailPage app={app} />;
}
