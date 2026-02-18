import { AppCardModel } from "./types";

export const marketplaceApps: AppCardModel[] = [
  {
    id: "scriptrunner",
    key: "scriptrunner-pro",
    name: "ScriptRunner Pro",
    partnerName: "Adaptavist",
    rating: 4.9,
    installs: 12000,
    summary: "Advanced automation engine for workflow scripting.",
    programs: [{ code: "CLOUD_FORTIFIED", label: "Cloud Fortified" }],
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    spotlight: "Spotlight",
    compatibility: { cloudLabel: "SaaS Ready", onPremLabel: "ONES 6.0+", testedOn: "Tested on ONES 6.10.1" },
    logoUrl: "",
    detailImages: ["Automation Dashboard", "Script Editor", "Audit Trail"],
    longDescription:
      "<h3>Automate with confidence</h3><p>ScriptRunner Pro helps enterprise teams enforce standards and reduce manual work through scripted automations.</p><p>It supports policy-aware execution, rollback, and traceable operation history.</p>"
  },
  {
    id: "tempo",
    key: "tempo-timesheets",
    name: "Tempo Timesheets",
    partnerName: "Tempo",
    rating: 4.7,
    installs: 17000,
    summary: "Track team effort and billing-ready timesheets.",
    programs: [],
    category: "Time Tracking",
    supportedHosting: ["cloud"],
    compatibility: { cloudLabel: "SaaS Ready", testedOn: "Tested on ONES SaaS" },
    logoUrl: "",
    detailImages: ["Timesheet Calendar", "Worklog Report", "Team Capacity"],
    longDescription:
      "<h3>Time visibility at scale</h3><p>Tempo Timesheets gives delivery leads a clear view of effort allocation and forecasting across teams.</p><p>Export-ready reports help finance and operations workflows.</p>"
  },
  {
    id: "gliffy",
    key: "gliffy-diagrams",
    name: "Gliffy Diagrams",
    partnerName: "Perforce",
    rating: 4.4,
    installs: 7000,
    summary: "Create technical diagrams directly in ONES.",
    programs: [],
    category: "Design",
    supportedHosting: ["on-prem"],
    compatibility: { onPremLabel: "ONES 5.0 - 5.4", testedOn: "Tested on ONES 5.4.3", warning: true },
    logoUrl: "",
    detailImages: ["Diagram Board", "Template Library", "Export Panel"],
    longDescription:
      "<h3>Diagram-first collaboration</h3><p>Gliffy Diagrams enables architecture and flowchart creation in context with requirement and delivery artifacts.</p><p>It is best suited for teams on legacy on-prem environments.</p>"
  },
  {
    id: "zephyr",
    key: "zephyr-scale",
    name: "Zephyr Scale",
    partnerName: "SmartBear",
    rating: 4.6,
    installs: 9000,
    summary: "Manage test plans, executions, and traceability.",
    programs: [],
    category: "Test Management",
    supportedHosting: ["cloud", "on-prem"],
    compatibility: { cloudLabel: "SaaS Ready", onPremLabel: "ONES 6.0+", testedOn: "Tested on ONES 6.10.1" },
    logoUrl: "",
    detailImages: ["Test Plan", "Execution Matrix", "Coverage Report"],
    longDescription:
      "<h3>Quality operations in one place</h3><p>Zephyr Scale provides test lifecycle orchestration tightly coupled with development workflows.</p><p>From planning to execution to traceability, teams get a unified quality signal.</p>"
  },
  {
    id: "drawio",
    key: "drawio-embed",
    name: "Draw.io Embed",
    partnerName: "diagrams.net",
    rating: 4.8,
    installs: 21000,
    summary: "Embed architecture diagrams into product docs.",
    programs: [{ code: "FEATURED", label: "Featured" }],
    category: "Design",
    supportedHosting: ["cloud"],
    compatibility: { cloudLabel: "SaaS Ready", testedOn: "Tested on ONES SaaS" },
    logoUrl: "",
    detailImages: ["Canvas", "Connector Library", "Publish Link"],
    longDescription:
      "<h3>Visualize systems faster</h3><p>Embed editable diagrams inside ONES docs to reduce context switching in architecture review cycles.</p><p>Supports team templates and revision tracking.</p>"
  },
  {
    id: "eazybi",
    key: "eazybi-reports",
    name: "EazyBI Reports",
    partnerName: "EazyBI",
    rating: 4.7,
    installs: 13000,
    summary: "Advanced BI dashboards for delivery analytics.",
    programs: [],
    category: "Reporting",
    supportedHosting: ["on-prem"],
    compatibility: { onPremLabel: "ONES 6.0+", testedOn: "Tested on ONES 6.10.1" },
    logoUrl: "",
    detailImages: ["Executive Dashboard", "Custom Measures", "Trend Explorer"],
    longDescription:
      "<h3>Enterprise reporting depth</h3><p>EazyBI offers powerful multidimensional analytics for PMO and leadership reporting.</p><p>Build custom metrics and benchmark delivery trends over time.</p>"
  },
  {
    id: "slack",
    key: "slack-connect",
    name: "Slack Connect",
    partnerName: "Slack",
    rating: 4.8,
    installs: 45000,
    summary: "Real-time incident and release alerts in channels.",
    programs: [{ code: "POPULAR", label: "Popular" }],
    category: "Communication",
    supportedHosting: ["cloud"],
    compatibility: { cloudLabel: "SaaS Ready", testedOn: "Tested on ONES SaaS" },
    logoUrl: "",
    detailImages: ["Notification Rules", "Channel Routing", "Event History"],
    longDescription:
      "<h3>Faster team alignment</h3><p>Slack Connect routes critical updates from ONES directly to team channels for immediate visibility.</p><p>Alert fatigue is reduced through scoped routing and ownership tags.</p>"
  },
  {
    id: "github-sync",
    key: "github-sync",
    name: "GitHub Sync",
    partnerName: "GitHub",
    rating: 4.7,
    installs: 18000,
    summary: "Sync pull requests and deployments to ONES tasks.",
    programs: [],
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"],
    compatibility: { cloudLabel: "SaaS Ready", onPremLabel: "ONES 6.0+", testedOn: "Tested on ONES 6.9.4" },
    logoUrl: "",
    detailImages: ["PR Timeline", "Deploy Events", "Branch Policy"],
    longDescription:
      "<h3>Code to plan continuity</h3><p>GitHub Sync links engineering execution signals to roadmap context in ONES.</p><p>Teams can trace feature status from planning through merge and deployment.</p>"
  },
  {
    id: "jenkins",
    key: "jenkins-pipelines",
    name: "Jenkins Pipelines",
    partnerName: "Jenkins",
    rating: 4.4,
    installs: 20000,
    summary: "Trigger builds from ONES release gates.",
    programs: [],
    category: "DevOps",
    supportedHosting: ["on-prem"],
    compatibility: { onPremLabel: "ONES 5.4 - 6.2", testedOn: "Tested on ONES 6.2.0" },
    logoUrl: "",
    detailImages: ["Pipeline Trigger", "Build Matrix", "Artifact Status"],
    longDescription:
      "<h3>Controlled release automation</h3><p>Jenkins Pipelines provides release-gated automation for server-heavy environments.</p><p>Integrates with approval workflows and deployment evidence tracking.</p>"
  },
  {
    id: "okta",
    key: "okta-sso",
    name: "Okta SSO",
    partnerName: "Okta",
    rating: 4.8,
    installs: 19000,
    summary: "Enterprise authentication and user lifecycle.",
    programs: [{ code: "CLOUD_FORTIFIED", label: "Cloud Fortified" }],
    category: "Security",
    supportedHosting: ["cloud", "on-prem"],
    compatibility: { cloudLabel: "SaaS Ready", onPremLabel: "ONES 6.0+", testedOn: "Tested on ONES 6.10.1" },
    logoUrl: "",
    detailImages: ["SSO Config", "Lifecycle Rules", "Audit Logs"],
    longDescription:
      "<h3>Identity governance</h3><p>Okta SSO centralizes access and lifecycle policies for enterprise compliance posture.</p><p>Supports role-based mapping and secure authentication standards.</p>"
  },
  {
    id: "notion",
    key: "notion-import",
    name: "Notion Wiki Import",
    partnerName: "Notion",
    rating: 4.3,
    installs: 5000,
    summary: "Migrate docs and structure to ONES Wiki.",
    programs: [],
    category: "Office/Doc",
    supportedHosting: ["cloud"],
    compatibility: { cloudLabel: "SaaS Ready", testedOn: "Tested on ONES SaaS" },
    logoUrl: "",
    detailImages: ["Import Wizard", "Mapping Review", "Migration Log"],
    longDescription:
      "<h3>Fast knowledge migration</h3><p>Notion Wiki Import accelerates transition to ONES knowledge base with hierarchy and link preservation.</p><p>Teams can validate migrated structures before final publish.</p>"
  }
];
