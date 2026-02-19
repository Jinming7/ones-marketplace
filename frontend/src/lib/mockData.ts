import { AppCardModel, HostingKind } from "./types";

type AppSeed = {
  id: string;
  key: string;
  name: string;
  partnerName: string;
  rating: number;
  installs: number;
  summary: string;
  category: string;
  supportedHosting: HostingKind[];
  onPremLabel?: string;
  cloudFortified?: boolean;
  spotlight?: string;
};

const description = (name: string, summary: string) =>
  `<h3>${name}</h3><p>${summary}</p><p>Designed for enterprise delivery teams with governance, auditability, and scale in mind.</p>`;

function app(seed: AppSeed): AppCardModel {
  return {
    id: seed.id,
    key: seed.key,
    logoUrl: "",
    name: seed.name,
    partnerName: seed.partnerName,
    rating: seed.rating,
    installs: seed.installs,
    summary: seed.summary,
    programs: seed.cloudFortified ? [{ code: "CLOUD_FORTIFIED", label: "Cloud Fortified" }] : [],
    category: seed.category,
    supportedHosting: seed.supportedHosting,
    spotlight: seed.spotlight,
    compatibility: {
      cloudLabel: seed.supportedHosting.includes("cloud") ? "SaaS Ready" : undefined,
      onPremLabel: seed.onPremLabel,
      testedOn: seed.onPremLabel ? `Tested on ${seed.onPremLabel}` : "Tested on ONES SaaS"
    },
    detailImages: ["Dashboard View", "Configuration", "Audit Logs"],
    longDescription: description(seed.name, seed.summary)
  };
}

export const marketplaceApps: AppCardModel[] = [
  app({
    id: "scriptrunner",
    key: "scriptrunner-pro",
    name: "ScriptRunner Pro",
    partnerName: "Adaptavist",
    rating: 4.9,
    installs: 12000,
    summary: "Advanced automation engine for workflow scripting.",
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.0+",
    cloudFortified: true,
    spotlight: "Spotlight"
  }),
  app({
    id: "tempo",
    key: "tempo-timesheets",
    name: "Tempo Timesheets",
    partnerName: "Tempo",
    rating: 4.7,
    installs: 17000,
    summary: "Track team effort and billing-ready timesheets.",
    category: "Time Tracking",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "gliffy",
    key: "gliffy-diagrams",
    name: "Gliffy Diagrams",
    partnerName: "Perforce",
    rating: 4.4,
    installs: 7000,
    summary: "Create technical diagrams directly in ONES.",
    category: "Design",
    supportedHosting: ["on-prem"],
    onPremLabel: "ONES 5.0 - 5.4"
  }),
  app({
    id: "zephyr",
    key: "zephyr-scale",
    name: "Zephyr Scale",
    partnerName: "SmartBear",
    rating: 4.6,
    installs: 9000,
    summary: "Manage test plans, executions, and traceability.",
    category: "Test Management",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.0+"
  }),
  app({
    id: "drawio",
    key: "drawio-embed",
    name: "Draw.io Embed",
    partnerName: "diagrams.net",
    rating: 4.8,
    installs: 21000,
    summary: "Embed architecture diagrams into product docs.",
    category: "Design",
    supportedHosting: ["cloud"],
    spotlight: "Featured"
  }),
  app({
    id: "eazybi",
    key: "eazybi-reports",
    name: "EazyBI Reports",
    partnerName: "EazyBI",
    rating: 4.7,
    installs: 13000,
    summary: "Advanced BI dashboards for delivery analytics.",
    category: "Reporting",
    supportedHosting: ["on-prem"],
    onPremLabel: "ONES 6.0+"
  }),
  app({
    id: "slack",
    key: "slack-connect",
    name: "Slack Connect",
    partnerName: "Slack",
    rating: 4.8,
    installs: 45000,
    summary: "Real-time incident and release alerts in channels.",
    category: "Communication",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "github-sync",
    key: "github-sync",
    name: "GitHub Sync",
    partnerName: "GitHub",
    rating: 4.7,
    installs: 18000,
    summary: "Sync pull requests and deployments to ONES tasks.",
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.0+"
  }),
  app({
    id: "jenkins",
    key: "jenkins-pipelines",
    name: "Jenkins Pipelines",
    partnerName: "Jenkins",
    rating: 4.4,
    installs: 20000,
    summary: "Trigger builds from ONES release gates.",
    category: "DevOps",
    supportedHosting: ["on-prem"],
    onPremLabel: "ONES 5.4 - 6.2"
  }),
  app({
    id: "okta",
    key: "okta-sso",
    name: "Okta SSO",
    partnerName: "Okta",
    rating: 4.8,
    installs: 19000,
    summary: "Enterprise authentication and user lifecycle.",
    category: "Security",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.0+",
    cloudFortified: true
  }),
  app({
    id: "notion",
    key: "notion-import",
    name: "Notion Wiki Import",
    partnerName: "Notion",
    rating: 4.3,
    installs: 5000,
    summary: "Migrate docs and structure to ONES Wiki.",
    category: "Office/Doc",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "miro",
    key: "miro-whiteboard",
    name: "Miro Whiteboard",
    partnerName: "Miro",
    rating: 4.8,
    installs: 25000,
    summary: "Collaborative brainstorming directly in ONES wiki pages.",
    category: "Collaboration",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "figma-bridge",
    key: "figma-bridge",
    name: "Figma Bridge",
    partnerName: "Figma",
    rating: 4.9,
    installs: 15000,
    summary: "Embed live design prototypes in requirement documents.",
    category: "Design",
    supportedHosting: ["cloud"],
    spotlight: "Spotlight"
  }),
  app({
    id: "sentry",
    key: "sentry-monitor",
    name: "Sentry Monitor",
    partnerName: "Sentry",
    rating: 4.6,
    installs: 3000,
    summary: "Link runtime crash reports to ONES bug tickets.",
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.2+"
  }),
  app({
    id: "zendesk",
    key: "zendesk-support",
    name: "Zendesk Support",
    partnerName: "Zendesk",
    rating: 4.5,
    installs: 10000,
    summary: "Turn support tickets into prioritized engineering tasks.",
    category: "Service",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "harvest",
    key: "harvest-time",
    name: "Harvest Time Tracking",
    partnerName: "Harvest",
    rating: 4.6,
    installs: 9000,
    summary: "Track time across ONES tasks automatically.",
    category: "Business",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 5.8+"
  }),
  app({
    id: "intercom",
    key: "intercom-chat",
    name: "Intercom Chat",
    partnerName: "Intercom",
    rating: 4.7,
    installs: 6000,
    summary: "View customer conversations in issue context.",
    category: "Service",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "copilot",
    key: "copilot-integration",
    name: "AI Copilot Integration",
    partnerName: "ONES AI",
    rating: 5.0,
    installs: 2000,
    summary: "AI-assisted story writing and acceptance criteria.",
    category: "AI",
    supportedHosting: ["cloud"],
    spotlight: "New"
  }),
  app({
    id: "table-filter",
    key: "table-filter-charts",
    name: "Table Filter and Charts",
    partnerName: "StiltSoft",
    rating: 4.5,
    installs: 11000,
    summary: "Build data tables and charts for project reporting.",
    category: "Reporting",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.0+"
  }),
  app({
    id: "xray-tests",
    key: "xray-test-management",
    name: "Xray Test Management",
    partnerName: "Xblend",
    rating: 4.8,
    installs: 14000,
    summary: "Enterprise-grade test planning and execution traceability.",
    category: "Test Management",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.1+",
    cloudFortified: true
  }),
  app({
    id: "crm-hub",
    key: "crm-hub",
    name: "CRM Hub Connector",
    partnerName: "SalesWave",
    rating: 4.4,
    installs: 7800,
    summary: "Sync deals, accounts, and tasks between CRM and ONES.",
    category: "CRM",
    supportedHosting: ["cloud"]
  }),
  app({
    id: "sonarqube",
    key: "sonarqube-quality",
    name: "SonarQube Quality Gate",
    partnerName: "SonarSource",
    rating: 4.7,
    installs: 8400,
    summary: "Expose code quality gates in release management workflows.",
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    onPremLabel: "ONES 6.4+"
  })
];
