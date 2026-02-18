import { AppDetailPage } from "@/components/AppDetailPage";
import { getAppDetail } from "@/lib/api";

interface AppDetailRouteProps {
  params: Promise<{ appKey: string }>;
}

export default async function AppDetailRoute({ params }: AppDetailRouteProps) {
  const { appKey } = await params;

  try {
    const app = await getAppDetail(appKey);
    return <AppDetailPage app={app} />;
  } catch {
    return (
      <AppDetailPage
        app={{
          id: "mock-jira-sync-pro",
          key: "jira-sync-pro",
          logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80",
          name: "Jira Sync Pro",
          partnerName: "ONES Partner Lab",
          rating: 4.9,
          installs: 12000,
          summary:
            "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
          programs: [{ code: "ONES_CERTIFIED", label: "ONES Certified" }]
        }}
      />
    );
  }
}
