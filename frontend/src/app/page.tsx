"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { AppGrid } from "@/components/AppGrid";
import { FilterBar } from "@/components/FilterBar";
import { SpotlightSection } from "@/components/SpotlightSection";
import { marketplaceApps } from "@/lib/mockData";
import { AppCardModel } from "@/lib/types";

const versions = ["5.4.3", "6.2.0", "6.10.1", "7.0.0"];

function AppDetailView({ app, onBack }: { app: AppCardModel; onBack: () => void }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </button>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{app.name}</h2>
        <p className="mt-2 text-sm text-slate-500">By {app.partnerName}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {app.detailImages.map((item) => (
            <div key={item} className="aspect-video rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-500 flex items-center justify-center">
              {item}
            </div>
          ))}
        </div>

        <div className="prose prose-sm mt-6 max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: app.longDescription }} />

        <div className="mt-6 grid gap-3 text-sm text-gray-600 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-3">Rating: {app.rating.toFixed(1)}</div>
          <div className="rounded-lg bg-gray-50 p-3">Installs: {Math.round(app.installs / 1000)}k</div>
          <div className="rounded-lg bg-gray-50 p-3">Compatibility: {app.compatibility?.onPremLabel ?? app.compatibility?.cloudLabel ?? "N/A"}</div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedHostings, setSelectedHostings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState("6.10.1");
  const [currentView, setCurrentView] = useState<"home" | "detail">("home");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(marketplaceApps.map((item) => item.category).filter(Boolean))) as string[];
    return unique.map((category) => ({ value: category, label: category }));
  }, []);

  const hostingOptions = [
    { value: "cloud", label: "ONES Cloud" },
    { value: "on-prem", label: "ONES On-Premise" }
  ];

  const onPremOnlyMode = selectedHostings.length === 1 && selectedHostings.includes("on-prem");

  const filteredApps = useMemo(() => {
    return marketplaceApps.filter((app) => {
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

  const selectedApp = useMemo(
    () => marketplaceApps.find((item) => item.id === selectedAppId),
    [selectedAppId]
  );

  if (currentView === "detail" && selectedApp) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header showLogin showPartnerPortal />
        <AppDetailView
          app={selectedApp}
          onBack={() => {
            setCurrentView("home");
            setSelectedAppId(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header showLogin showPartnerPortal />

      <section
        className="relative overflow-visible border-b border-gray-200"
        style={{ background: "radial-gradient(circle at 35% 20%, #ffffff 0%, #ffffff 38%, #eff6ff 100%)" }}
      >
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Discover apps for your team
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
            Browse enterprise-ready integrations, automation, and reporting extensions for ONES.
          </p>

          <FilterBar
            search={search}
            onSearchChange={setSearch}
            hostingOptions={hostingOptions}
            categoryOptions={categoryOptions}
            selectedHostings={selectedHostings}
            onHostingsApply={setSelectedHostings}
            selectedCategories={selectedCategories}
            onCategoriesApply={setSelectedCategories}
          />
        </div>
      </section>

      <SpotlightSection />

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">All Apps</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Current ONES version</span>
            <select
              value={currentVersion}
              onChange={(event) => setCurrentVersion(event.target.value)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400"
            >
              {versions.map((version) => (
                <option key={version} value={version}>
                  v{version}
                </option>
              ))}
            </select>
            <span className="text-sm text-slate-500">{filteredApps.length} apps</span>
          </div>
        </div>

        <AppGrid
          apps={filteredApps}
          currentVersion={currentVersion}
          onPremOnlyMode={onPremOnlyMode}
          onSelectApp={(appId) => {
            setSelectedAppId(appId);
            setCurrentView("detail");
          }}
        />
      </section>
    </main>
  );
}
