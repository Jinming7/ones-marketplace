"use client";

import { useMemo, useState } from "react";
import { Bot, Search, ShieldCheck, Sparkles } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { FilterPopover } from "@/components/FilterPopover";
import { Header } from "@/components/Header";
import { AppCardModel } from "@/lib/types";

const apps: AppCardModel[] = [
  { key: "scriptrunner-ones", name: "ScriptRunner for ONES", partnerName: "Adaptavist", rating: 4.9, installs: 12000, summary: "Automate workflows with scripts and custom rules.", programs: [{ code: "STAFF_PICK", label: "Staff Pick" }], category: "Automation", supportedHosting: ["cloud", "on-prem"], spotlight: "Spotlight", logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80" },
  { key: "tempo-timesheets", name: "Tempo Timesheets", partnerName: "Tempo", rating: 4.7, installs: 17000, summary: "Track team effort and billing-ready timesheets.", programs: [], category: "Time Tracking", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=120&q=80" },
  { key: "drawio-embed", name: "Draw.io Embed", partnerName: "diagrams.net", rating: 4.8, installs: 21000, summary: "Embed architecture diagrams into product docs.", programs: [], category: "Design", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=120&q=80" },
  { key: "zephyr-scale", name: "Zephyr Scale", partnerName: "SmartBear", rating: 4.6, installs: 9000, summary: "Manage test plans, executions, and traceability.", programs: [], category: "Test Management", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&q=80" },
  { key: "gliffy-diagrams", name: "Gliffy Diagrams", partnerName: "Perforce", rating: 4.4, installs: 7000, summary: "Create technical diagrams directly in ONES.", programs: [], category: "Design", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=120&q=80" },
  { key: "table-filter-charts", name: "Table Filter and Charts", partnerName: "StiltSoft", rating: 4.8, installs: 15000, summary: "Analyze issue data with pivot tables and charts.", programs: [{ code: "POPULAR", label: "Popular" }], category: "Reporting", supportedHosting: ["cloud", "on-prem"], spotlight: "Staff Pick", logoUrl: "https://images.unsplash.com/photo-1551281044-8b7da5f7f6f6?w=120&q=80" },
  { key: "eazybi-reports", name: "EazyBI Reports", partnerName: "EazyBI", rating: 4.7, installs: 13000, summary: "Advanced BI dashboards for delivery analytics.", programs: [], category: "Reporting", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80" },
  { key: "slack-connect", name: "Slack Connect", partnerName: "Slack", rating: 4.8, installs: 45000, summary: "Real-time incident and release alerts in channels.", programs: [{ code: "POPULAR", label: "Popular" }], category: "Communication", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=120&q=80" },
  { key: "github-sync", name: "GitHub Sync", partnerName: "GitHub", rating: 4.7, installs: 18000, summary: "Sync pull requests and deployments to ONES tasks.", programs: [], category: "DevOps", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=120&q=80" },
  { key: "gitlab-ci", name: "GitLab CI", partnerName: "GitLab", rating: 4.7, installs: 8000, summary: "View pipeline status in ONES tasks.", programs: [], category: "DevOps", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&q=80" },
  { key: "jenkins-pipelines", name: "Jenkins Pipelines", partnerName: "Jenkins", rating: 4.4, installs: 20000, summary: "Trigger builds from ONES release gates.", programs: [], category: "DevOps", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120&q=80" },
  { key: "miro-whiteboard", name: "Miro Whiteboard", partnerName: "Miro", rating: 4.8, installs: 25000, summary: "Collaborative whiteboards in project spaces.", programs: [{ code: "FEATURED", label: "Featured" }], category: "Collaboration", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=120&q=80" },
  { key: "notion-import", name: "Notion Wiki Import", partnerName: "Notion", rating: 4.3, installs: 5000, summary: "Migrate docs and structure to ONES Wiki.", programs: [], category: "Productivity", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80" },
  { key: "harvest-track", name: "Harvest Time Tracking", partnerName: "Harvest", rating: 4.6, installs: 9000, summary: "Track effort on tasks and export to billing.", programs: [], category: "Time Tracking", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&q=80" },
  { key: "intercom-chat", name: "Intercom Chat", partnerName: "Intercom", rating: 4.7, installs: 6000, summary: "Surface customer context inside issues.", programs: [], category: "Service", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&q=80" },
  { key: "servicenow-sync", name: "ServiceNow Sync", partnerName: "ServiceNow", rating: 4.5, installs: 6200, summary: "Bridge ITSM tickets with engineering backlog.", programs: [], category: "Service", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=120&q=80" },
  { key: "salesforce-crm", name: "Salesforce CRM Connector", partnerName: "Salesforce", rating: 4.4, installs: 7400, summary: "Sync account milestones and release status.", programs: [], category: "CRM", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&q=80" },
  { key: "powerbi-reports", name: "Power BI Reports", partnerName: "Microsoft", rating: 4.6, installs: 11000, summary: "Executive dashboards from ONES data models.", programs: [], category: "Reporting", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&q=80" },
  { key: "splunk-observability", name: "Splunk Observability", partnerName: "Splunk", rating: 4.5, installs: 4100, summary: "Link incidents to deployments and traces.", programs: [], category: "Security", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=120&q=80" },
  { key: "okta-sso", name: "Okta SSO", partnerName: "Okta", rating: 4.8, installs: 19000, summary: "Enterprise authentication and user lifecycle.", programs: [], category: "Security", supportedHosting: ["cloud", "on-prem"], logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&q=80" },
  { key: "figma-bridge", name: "Figma Bridge", partnerName: "Figma", rating: 4.9, installs: 15000, summary: "Embed live prototypes in requirements.", programs: [], category: "Design", supportedHosting: ["cloud"], logoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=120&q=80" },
  { key: "sonarqube-gate", name: "SonarQube Quality Gate", partnerName: "SonarSource", rating: 4.5, installs: 4000, summary: "Track code quality gates in releases.", programs: [], category: "DevOps", supportedHosting: ["on-prem"], logoUrl: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=120&q=80" }
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedHostings, setSelectedHostings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(apps.map((item) => item.category).filter(Boolean))) as string[];
    return unique.map((category) => ({ value: category, label: category }));
  }, []);

  const hostingOptions = [
    { value: "cloud", label: "ONES Cloud" },
    { value: "on-prem", label: "ONES On-Premise" }
  ];

  const onPremOnlyMode =
    selectedHostings.length === 1 && selectedHostings.includes("on-prem");

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const bySearch =
        search.trim().length === 0 ||
        `${app.name} ${app.partnerName} ${app.summary}`.toLowerCase().includes(search.toLowerCase());

      const byCategory =
        selectedCategories.length === 0 ||
        (app.category ? selectedCategories.includes(app.category) : false);

      const byHosting =
        selectedHostings.length === 0 ||
        selectedHostings.some((hosting) => app.supportedHosting?.includes(hosting as "cloud" | "on-prem"));

      return bySearch && byCategory && byHosting;
    });
  }, [search, selectedCategories, selectedHostings]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header showLogin showPartnerPortal />

      <section
        className="relative overflow-hidden border-b border-slate-200"
        style={{
          background: "radial-gradient(circle at 35% 20%, #ffffff 0%, #ffffff 38%, #eff6ff 100%)"
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Discover apps for your team
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
            Browse enterprise-ready integrations, automation, and reporting extensions for ONES.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex min-w-[320px] flex-1 items-center rounded-full border border-slate-200 bg-white p-2 shadow-md shadow-slate-200/60">
              <Search className="ml-3 h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search apps, categories..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <FilterPopover
              label="Hosting"
              options={hostingOptions}
              selectedValues={selectedHostings}
              onChange={setSelectedHostings}
            />

            <FilterPopover
              label="Categories"
              options={categoryOptions}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-xl font-semibold text-slate-900">Featured Collections</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="h-64 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-100 via-white to-white p-6 shadow-sm transition-all duration-300 hover:translate-y-1 hover:shadow-lg">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">Cloud Fortified Apps</h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">
              Security-reviewed integrations designed for regulated engineering workflows.
            </p>
            <a href="#" className="mt-8 inline-flex text-sm font-medium text-blue-700 hover:underline">
              Explore collection →
            </a>
          </article>

          <article className="h-64 rounded-2xl border border-slate-200 bg-gradient-to-br from-violet-100 via-white to-white p-6 shadow-sm transition-all duration-300 hover:translate-y-1 hover:shadow-lg">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">New & Noteworthy</h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">
              Freshly released apps with modern UX and high-growth adoption.
            </p>
            <a href="#" className="mt-8 inline-flex text-sm font-medium text-blue-700 hover:underline">
              Explore collection →
            </a>
          </article>

          <article className="h-64 rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-100 via-white to-white p-6 shadow-sm transition-all duration-300 hover:translate-y-1 hover:shadow-lg">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">AI Productivity</h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">
              AI copilots and automation assistants for faster planning and delivery.
            </p>
            <a href="#" className="mt-8 inline-flex text-sm font-medium text-blue-700 hover:underline">
              Explore collection →
            </a>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">All Apps</h2>
          <span className="text-sm text-slate-500">{filteredApps.length} apps</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredApps.map((app) => {
            const disabled = onPremOnlyMode && !app.supportedHosting?.includes("on-prem");
            return (
              <AppCard
                key={app.key}
                app={app}
                disabled={disabled}
                disabledLabel={disabled ? "Not available for On-Premise" : undefined}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
