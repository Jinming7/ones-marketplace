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
    logoUrl: "",
    name: "Jira Sync Pro",
    partnerName: "ONES Partner Lab",
    rating: 4.9,
    installs: 12000,
    summary:
      "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
    programs: [{ code: "ONES_CERTIFIED", label: "ONES Certified" }],
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    detailImages: ["Dashboard View", "Config Screen", "Sync Logs"],
    longDescription:
      "<h3>Connect ONES and Jira seamlessly.</h3><p>Synchronize plans and execution with enterprise reliability.</p><p>Designed for multi-team collaboration and auditability.</p>"
  },
  "slack-connect": {
    id: "mock-slack-connect",
    key: "slack-connect",
    logoUrl: "",
    name: "Slack Connect",
    partnerName: "Slack",
    rating: 4.8,
    installs: 45000,
    summary: "Real-time notifications in channels.",
    programs: [{ code: "POPULAR", label: "Popular" }],
    category: "Communication",
    supportedHosting: ["cloud"],
    detailImages: ["Channel Rules", "Alert Preferences", "Delivery Logs"],
    longDescription:
      "<h3>Instant team updates.</h3><p>Route critical signals from ONES to Slack with rich context.</p><p>Fine-grained routing helps reduce noise and improve response time.</p>"
  },
  "gitlab-ci": {
    id: "mock-gitlab-ci",
    key: "gitlab-ci",
    logoUrl: "",
    name: "GitLab CI",
    partnerName: "GitLab",
    rating: 4.7,
    installs: 8000,
    summary: "View pipeline status in ONES tasks.",
    programs: [],
    category: "DevOps",
    supportedHosting: ["on-prem"],
    detailImages: ["Pipeline Matrix", "Job Details", "Release Trigger"],
    longDescription:
      "<h3>Pipeline visibility for enterprise teams.</h3><p>Connect CI execution to ONES delivery plans.</p><p>Track build health, deployment readiness, and release gates in one place.</p>"
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
