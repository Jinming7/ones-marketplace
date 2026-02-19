"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/CustomSelect";
import { AppGrid } from "@/components/AppGrid";
import { FilterBar } from "@/components/FilterBar";
import { SpotlightSection } from "@/components/SpotlightSection";
import { marketplaceApps } from "@/lib/mockData";

const versions = ["5.4.3", "6.2.0", "6.10.1", "7.0.0"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedHostings, setSelectedHostings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState("6.10.1");

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
            <CustomSelect
              value={currentVersion}
              onChange={setCurrentVersion}
              options={versions.map((version) => ({ value: version, label: `v${version}` }))}
              className="w-[120px]"
              triggerClassName="rounded-full"
            />
            <span className="text-sm text-slate-500">{filteredApps.length} apps</span>
          </div>
        </div>

        <AppGrid
          apps={filteredApps}
          currentVersion={currentVersion}
          onPremOnlyMode={onPremOnlyMode}
        />
      </section>
    </main>
  );
}
