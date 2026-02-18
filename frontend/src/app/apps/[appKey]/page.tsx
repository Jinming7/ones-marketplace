import { AppDetailPage } from "@/components/AppDetailPage";
import { getAppDetail } from "@/lib/api";
import { AppDetailModel } from "@/lib/types";

interface AppDetailRouteProps {
  params: Promise<{ appKey: string }>;
}

const mockDetailByKey: Record<string, AppDetailModel> = {
  "jira-sync-pro": {
    id: "mock-jira-sync-pro",
    key: "jira-sync-pro",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80",
    name: "Jira Sync Pro",
    partnerName: "ONES Partner Lab",
    rating: 4.9,
    installs: 12000,
    summary:
      "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
    programs: [{ code: "ONES_CERTIFIED", label: "ONES Certified" }],
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"]
  },
  "slack-connect": {
    id: "mock-slack-connect",
    key: "slack-connect",
    logoUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=120&q=80",
    name: "Slack Connect",
    partnerName: "Slack",
    rating: 4.8,
    installs: 45000,
    summary: "Real-time notifications in channels.",
    programs: [{ code: "POPULAR", label: "Popular" }],
    category: "Communication",
    supportedHosting: ["cloud"]
  },
  "gitlab-ci": {
    id: "mock-gitlab-ci",
    key: "gitlab-ci",
    logoUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=120&q=80",
    name: "GitLab CI",
    partnerName: "GitLab",
    rating: 4.7,
    installs: 8000,
    summary: "View pipeline status in ONES tasks.",
    programs: [],
    category: "DevOps",
    supportedHosting: ["on-prem"]
  }
};

export default async function AppDetailRoute({ params }: AppDetailRouteProps) {
  const { appKey } = await params;

  try {
    const app = await getAppDetail(appKey);
    return <AppDetailPage app={app} />;
  } catch {
    const app = mockDetailByKey[appKey] ?? mockDetailByKey["jira-sync-pro"];
    return <AppDetailPage app={app} />;
  }
}
