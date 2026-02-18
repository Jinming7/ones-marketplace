"use client";

import { useMemo, useState } from "react";
import { Figma, Github, Search } from "lucide-react";
import { AppCard } from "@/components/AppCard";

const mockApps = [
  {
    key: "jira-sync-pro",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80",
    name: "Jira Sync Pro",
    partnerName: "Atlassian",
    rating: 4.9,
    installs: 12000,
    summary: "Two-way sync for issues and sprints.",
    programs: [{ code: "ESSENTIAL", label: "Essential" }],
    category: "DevOps"
  },
  {
    key: "slack-connect",
    logoUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=120&q=80",
    name: "Slack Connect",
    partnerName: "Slack",
    rating: 4.8,
    installs: 45000,
    summary: "Real-time notifications in channels.",
    programs: [{ code: "POPULAR", label: "Popular" }],
    category: "Communication"
  },
  {
    key: "gitlab-cicd",
    logoUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=120&q=80",
    name: "GitLab CI/CD",
    partnerName: "GitLab",
    rating: 4.7,
    installs: 8000,
    summary: "View pipeline status in ONES tasks.",
    programs: [],
    category: "DevOps"
  },
  {
    key: "figma-bridge",
    logoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=120&q=80",
    name: "Figma Bridge",
    partnerName: "Figma",
    rating: 4.9,
    installs: 15000,
    summary: "Embed live prototypes in requirements.",
    programs: [],
    category: "Design"
  },
  {
    key: "sentry-monitor",
    logoUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=120&q=80",
    name: "Sentry Monitor",
    partnerName: "Sentry",
    rating: 4.6,
    installs: 3000,
    summary: "Link crash reports to bug tickets.",
    programs: [],
    category: "DevOps"
  },
  {
    key: "zendesk-support",
    logoUrl: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=120&q=80",
    name: "Zendesk Support",
    partnerName: "Zendesk",
    rating: 4.5,
    installs: 10000,
    summary: "Turn tickets into engineering tasks.",
    programs: [],
    category: "Service"
  },
  {
    key: "jenkins-pipelines",
    logoUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&q=80",
    name: "Jenkins Pipelines",
    partnerName: "Jenkins",
    rating: 4.4,
    installs: 20000,
    summary: "Trigger builds from ONES releases.",
    programs: [],
    category: "DevOps"
  },
  {
    key: "miro-whiteboard",
    logoUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=120&q=80",
    name: "Miro Whiteboard",
    partnerName: "Miro",
    rating: 4.8,
    installs: 25000,
    summary: "Brainstorm embedded in wiki pages.",
    programs: [{ code: "FEATURED", label: "Featured" }],
    category: "Collaboration"
  },
  {
    key: "notion-wiki-import",
    logoUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80",
    name: "Notion Wiki Import",
    partnerName: "Notion",
    rating: 4.3,
    installs: 5000,
    summary: "Migrate docs seamlessly.",
    programs: [],
    category: "Productivity"
  },
  {
    key: "harvest-time-tracking",
    logoUrl: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=120&q=80",
    name: "Harvest Time Tracking",
    partnerName: "Harvest",
    rating: 4.6,
    installs: 9000,
    summary: "Track time on tasks automatically.",
    programs: [],
    category: "Business"
  },
  {
    key: "intercom-chat",
    logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&q=80",
    name: "Intercom Chat",
    partnerName: "Intercom",
    rating: 4.7,
    installs: 6000,
    summary: "View customer context in issues.",
    programs: [],
    category: "Service"
  },
  {
    key: "github-copilot-integration",
    logoUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=120&q=80",
    name: "GitHub Copilot Integration",
    partnerName: "GitHub",
    rating: 5,
    installs: 2000,
    summary: "AI-assisted description writing.",
    programs: [{ code: "NEW", label: "New" }],
    category: "AI"
  }
];

function IntegrationHubVisual() {
  const satellites = [
    {
      label: "CRM",
      icon: <span className="text-xs font-semibold text-slate-700">CRM</span>,
      cls: "left-8 top-10 animate-float-slow"
    },
    {
      label: "DevOps",
      icon: <span className="text-xs font-semibold text-slate-700">DevOps</span>,
      cls: "right-8 top-16 animate-float-medium"
    },
    {
      label: "GitHub",
      icon: <Github className="h-4 w-4 text-slate-700" />,
      cls: "left-12 bottom-12 animate-float-fast"
    },
    {
      label: "Figma",
      icon: <Figma className="h-4 w-4 text-blue-700" />,
      cls: "right-10 bottom-10 animate-float-slow"
    }
  ];

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-md rounded-3xl border border-white/70 bg-white/55 p-8 shadow-xl shadow-blue-100/70 backdrop-blur-xl">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 420 340" fill="none">
        <path d="M100 75 Q 190 130 210 170" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M320 95 Q 250 130 210 170" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M115 255 Q 170 210 210 170" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M305 255 Q 260 210 210 170" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-blue-600/90 shadow-[0_0_50px_rgba(37,99,235,0.55)] animate-core-pulse" />
      <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/90" />

      {satellites.map((satellite) => (
        <div
          key={satellite.label}
          className={`absolute ${satellite.cls} inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 shadow-md shadow-slate-300/35 backdrop-blur`}
        >
          {satellite.icon}
          <span className="text-xs font-medium text-slate-600">{satellite.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const categories = useMemo(() => {
    const all = Array.from(new Set(mockApps.map((item) => item.category)));
    return ["All", ...all];
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const visibleApps = useMemo(() => {
    return mockApps.filter((app) => {
      const byCategory = activeCategory === "All" || app.category === activeCategory;
      const bySearch =
        search.trim().length === 0 ||
        `${app.name} ${app.partnerName} ${app.summary}`.toLowerCase().includes(search.toLowerCase());
      return byCategory && bySearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="inline-flex items-center gap-2">
            <img src="/placeholder-ones-logo.svg" alt="ONES.com logo" className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-7 text-sm text-slate-600 lg:flex">
              <a className="hover:text-slate-900" href="#">
                Apps
              </a>
              <a className="hover:text-slate-900" href="#">
                Categories
              </a>
              <a className="hover:text-slate-900" href="#">
                Collections
              </a>
              <a className="hover:text-slate-900" href="#">
                Resources
              </a>
            </div>
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 md:inline-flex">
              Log in
            </button>
            <button className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
              Try for free
            </button>
          </div>
        </div>
      </nav>

      <section
        className="relative overflow-hidden border-b border-slate-200"
        style={{
          background:
            "radial-gradient(circle at 35% 20%, #ffffff 0%, #ffffff 35%, #eff6ff 100%)"
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
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Discover apps for your team
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              Enhance your ONES workflow with powerful extensions.
            </p>
            <div className="mt-8 flex items-center rounded-full border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
              <Search className="ml-3 h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search apps, categories..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                Search
              </button>
            </div>
          </div>

          <IntegrationHubVisual />
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-5 text-sm text-slate-500">{visibleApps.length} apps found</div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleApps.map((app) => (
            <AppCard key={app.key} app={app} />
          ))}
        </div>
      </section>
    </main>
  );
}
