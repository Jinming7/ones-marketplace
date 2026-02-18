"use client";

import { useMemo, useState } from "react";
import { Bot, ShieldCheck, Sparkles, Star, Search } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { Header } from "@/components/Header";
import { AppCardModel, HostingKind } from "@/lib/types";

type HomeHostingFilter = "all" | "cloud" | "on-prem";

const mockApps: AppCardModel[] = [
  {
    key: "jira-sync-pro",
    logoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80",
    name: "Jira Sync Pro",
    partnerName: "ONES Partner Lab",
    rating: 4.9,
    installs: 12000,
    summary: "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
    programs: [{ code: "ESSENTIAL", label: "Essential" }],
    category: "DevOps",
    supportedHosting: ["cloud", "on-prem"]
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
    category: "Communication",
    supportedHosting: ["cloud"]
  },
  {
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
    category: "Design",
    supportedHosting: ["cloud"]
  }
];

const collectionItems = [
  { title: "Official Picks", icon: <Star className="h-4 w-4" />, style: "from-blue-100 to-indigo-100" },
  { title: "New & Noteworthy", icon: <Sparkles className="h-4 w-4" />, style: "from-cyan-100 to-blue-100" },
  { title: "Security & Compliance", icon: <ShieldCheck className="h-4 w-4" />, style: "from-slate-100 to-blue-100" },
  { title: "AI Power", icon: <Bot className="h-4 w-4" />, style: "from-violet-100 to-blue-100" }
];

function IntegrationHubVisual() {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-md rounded-3xl border border-white/70 bg-white/55 p-8 shadow-xl shadow-blue-100/70 backdrop-blur-xl">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 420 320" fill="none">
        <path d="M90 70 Q 180 130 210 160" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M325 90 Q 250 130 210 160" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M120 240 Q 165 200 210 160" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M305 238 Q 258 200 210 160" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-blue-600/90 shadow-[0_0_50px_rgba(37,99,235,0.55)] animate-core-pulse" />
      <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/90" />

      <div className="absolute left-8 top-10 animate-float-slow rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-md shadow-slate-300/35 backdrop-blur">
        CRM
      </div>
      <div className="absolute right-8 top-16 animate-float-medium rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-md shadow-slate-300/35 backdrop-blur">
        DevOps
      </div>
      <div className="absolute left-12 bottom-12 animate-float-fast rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-md shadow-slate-300/35 backdrop-blur">
        AI
      </div>
      <div className="absolute right-10 bottom-10 animate-float-slow rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-md shadow-slate-300/35 backdrop-blur">
        Analytics
      </div>
    </div>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [hostingFilter, setHostingFilter] = useState<HomeHostingFilter>("all");

  const categories = useMemo(() => {
    const all = Array.from(new Set(mockApps.map((item) => item.category ?? "General")));
    return ["All", ...all];
  }, []);
  const [activeCategory, setActiveCategory] = useState("All");

  const matchesHosting = (appHosting: HostingKind[] | undefined) => {
    if (!appHosting || hostingFilter === "all") {
      return true;
    }
    return appHosting.includes(hostingFilter);
  };

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
      <Header showLogin showPartnerPortal />

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
            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center rounded-full border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/70">
                <Search className="ml-3 h-5 w-5 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search apps, categories..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                <span className="font-medium">Show apps for:</span>
                <select
                  value={hostingFilter}
                  onChange={(event) => setHostingFilter(event.target.value as HomeHostingFilter)}
                  className="bg-transparent text-sm outline-none"
                >
                  <option value="all">All Hosting</option>
                  <option value="cloud">ONES Cloud</option>
                  <option value="on-prem">ONES On-Premise</option>
                </select>
              </div>
            </div>
          </div>

          <IntegrationHubVisual />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-lg font-semibold text-slate-900">Featured Collections</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collectionItems.map((collection) => (
            <article
              key={collection.title}
              className={`rounded-xl border border-white/70 bg-gradient-to-br ${collection.style} p-4 shadow-sm`}
            >
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1 text-xs font-medium text-slate-700">
                {collection.icon}
                {collection.title}
              </div>
            </article>
          ))}
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
          {visibleApps.map((app) => {
            const disabled =
              hostingFilter === "on-prem" && !matchesHosting(app.supportedHosting);
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
