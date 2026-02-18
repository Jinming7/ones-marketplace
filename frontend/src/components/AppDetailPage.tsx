"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Lock,
  Rocket,
  ShieldCheck,
  Star
} from "lucide-react";
import { Header } from "@/components/Header";
import { AppIcon } from "@/components/AppIcon";
import { CustomSelect } from "@/components/CustomSelect";
import { InstallModal } from "@/components/InstallModal";
import { AppDetailModel, HostingKind } from "@/lib/types";

type TabKey = "Overview" | "Reviews" | "Pricing" | "Support" | "Installation";

interface AppDetailPageProps {
  app?: AppDetailModel;
  onBackHome?: () => void;
}

function MarkdownDescription({ content }: { content: string }) {
  const lines = content
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-7 text-gray-600">
      {lines.map((line, index) => {
        if (line.startsWith("### ")) return <h4 key={index} className="text-base font-semibold text-gray-900">{line.replace("### ", "")}</h4>;
        if (line.startsWith("## ")) return <h3 key={index} className="text-lg font-semibold text-gray-900">{line.replace("## ", "")}</h3>;
        if (line.startsWith("# ")) return <h2 key={index} className="text-xl font-bold text-gray-900">{line.replace("# ", "")}</h2>;
        if (line.startsWith("- ")) {
          return (
            <p key={index} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
              <span>{line.replace("- ", "")}</span>
            </p>
          );
        }
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}

function DetailSidebar({ selectedHosting, app }: { selectedHosting: HostingKind; app: AppDetailModel }) {
  return (
    <aside className="space-y-4 xl:col-span-1">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">App Details</h3>
        <dl className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between gap-3">
            <dt>Version</dt>
            <dd className="text-right text-gray-900">
              {selectedHosting === "cloud" ? "Latest (Cloud)" : app.compatibility?.onPremLabel ?? "v4.0+"}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Last Updated</dt>
            <dd className="text-right text-gray-900">2 days ago</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>License Type</dt>
            <dd className="text-right text-gray-900">Commercial</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
        <div className="mt-3 space-y-2 text-sm">
          {["Documentation", "EULA", "Privacy Policy"].map((item) => (
            <a key={item} href="#" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              {item}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">Trust & Security</h3>
        <div className="mt-3 space-y-3 text-sm text-gray-600">
          <p className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-blue-700" title="Verified by cloud security controls">
            <ShieldCheck className="h-4 w-4" />
            Cloud Fortified
          </p>
          <p>
            <span className="font-medium text-gray-800">Data Residency:</span> US / EU / APAC
          </p>
          <p>
            <span className="font-medium text-gray-800">Compliance:</span> ISO 27001, SOC 2
          </p>
        </div>
      </div>
    </aside>
  );
}

function OverviewTab({ app }: { app: AppDetailModel }) {
  const markdownText = `## Overview
${app.summary}

### Key capabilities
- Real-time bi-directional sync
- Flexible mapping and policy controls
- Audit-ready change logs`;

  return (
    <section className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <Rocket className="h-5 w-5 text-blue-600" />
          <p className="mt-2 text-sm font-semibold text-gray-900">Boost Efficiency</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <Lock className="h-5 w-5 text-emerald-600" />
          <p className="mt-2 text-sm font-semibold text-gray-900">Secure</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
          <p className="mt-2 text-sm font-semibold text-gray-900">Insightful</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="aspect-video rounded-lg border border-gray-200 bg-gray-100">
          <div className="flex h-full items-center justify-center text-sm text-gray-500">Media Gallery / Demo Video</div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <MarkdownDescription content={`${markdownText}\n\n${app.longDescription}`} />
      </div>
    </section>
  );
}

function ReviewsTab() {
  const distribution = [66, 24, 7, 2, 1];
  const reviews = [
    { name: "Alice", role: "Engineering Manager", date: "2026-02-01", hosting: "Cloud", text: "Great reliability and easy rollout." },
    { name: "Brian", role: "DevOps Lead", date: "2026-01-18", hosting: "On-Prem", text: "Good controls for enterprise policy." },
    { name: "Cathy", role: "QA Director", date: "2026-01-10", hosting: "Cloud", text: "Stable sync and clear activity logs." }
  ];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="mt-2 text-5xl font-bold text-gray-900">4.7</p>
        </div>
        <div className="space-y-2">
          {distribution.map((value, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs text-gray-600">
              <span className="w-4">{5 - idx}</span>
              <div className="h-2 flex-1 rounded bg-gray-100">
                <div className="h-2 rounded bg-blue-600" style={{ width: `${value}%` }} />
              </div>
              <span className="w-8 text-right">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">{review.name}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {review.role} · {review.hosting}
            </p>
            <p className="mt-2 text-sm text-gray-600">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingTab() {
  const [teamSize, setTeamSize] = useState(10);
  const [isAnnual, setIsAnnual] = useState(false);
  const standardUnit = isAnnual ? 8 : 10;
  const proUnit = isAnnual ? 9.6 : 12;
  const cycleMultiplier = isAnnual ? 12 : 1;
  const standardTotal = standardUnit * teamSize * cycleMultiplier;
  const proTotal = proUnit * teamSize * cycleMultiplier;
  const standardSave = 10 * teamSize * 12 - 8 * teamSize * 12;
  const proSave = 12 * teamSize * 12 - 9.6 * teamSize * 12;

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-900">Simple, transparent pricing</h2>
        <div className="mt-5 flex flex-wrap items-center gap-6">
          <label className="text-sm font-medium text-gray-700">
            Seats: <span className="font-semibold text-gray-900">{teamSize}</span>
            <input
              type="range"
              min={1}
              max={1000}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="mt-2 w-72 accent-blue-600"
            />
          </label>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`rounded px-3 py-1.5 text-sm ${!isAnnual ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`rounded px-3 py-1.5 text-sm ${isAnnual ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Annual (-20%)
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold text-gray-900">Standard</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">${standardUnit}</p>
          <p className="text-xs text-gray-500">Per user / month</p>
          <p className="mt-2 text-sm text-gray-600">
            Estimated total: ${standardTotal.toFixed(0)}/{isAnnual ? "yr" : "mo"}
          </p>
          {isAnnual ? (
            <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              You save ${standardSave.toFixed(0)}/yr
            </p>
          ) : null}
        </div>
        <div className="rounded-xl border-2 border-blue-500 bg-white p-5">
          <p className="text-sm font-semibold text-gray-900">Pro</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">${proUnit}</p>
          <p className="text-xs text-gray-500">Per user / month</p>
          <p className="mt-2 text-sm text-gray-600">
            Estimated total: ${proTotal.toFixed(0)}/{isAnnual ? "yr" : "mo"}
          </p>
          {isAnnual ? (
            <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              You save ${proSave.toFixed(0)}/yr
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-gray-900">Plan Comparison</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 px-3 py-2 text-left">Feature</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Standard</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">Sync Frequency</td>
                <td className="border border-gray-200 px-3 py-2">15 min</td>
                <td className="border border-gray-200 px-3 py-2">Real-time</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">Audit Trail</td>
                <td className="border border-gray-200 px-3 py-2">Basic</td>
                <td className="border border-gray-200 px-3 py-2">Advanced</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SupportTab() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
      <p className="font-medium text-gray-900">SLA</p>
      <p className="mt-1">24-hour first response on business days.</p>
      <p className="mt-4 font-medium text-gray-900">Docs & Ticketing</p>
      <div className="mt-2 space-y-2">
        <a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
          Documentation
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <br />
        <a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
          Submit Support Ticket
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

function InstallationTab({ selectedHosting }: { selectedHosting: HostingKind }) {
  if (selectedHosting === "cloud") {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">One-click install</h3>
        <p className="mt-2 text-sm text-gray-600">Install directly to your ONES cloud workspace and start in minutes.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 px-3 py-2 text-left">Version</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Date</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2">2.4.1</td>
                <td className="border border-gray-200 px-3 py-2">2026-01-28</td>
                <td className="border border-gray-200 px-3 py-2">Stability improvements</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2">2.4.0</td>
                <td className="border border-gray-200 px-3 py-2">2025-12-15</td>
                <td className="border border-gray-200 px-3 py-2">New mapping templates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Download OBR/JAR
        </button>
      </div>
    </section>
  );
}

export function AppDetailPage({ app, onBackHome }: AppDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [selectedHosting, setSelectedHosting] = useState<HostingKind>("cloud");
  const [installOpen, setInstallOpen] = useState(false);

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header showLogin showPartnerPortal />
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">App not found</h1>
          <Link href="/" className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Back to Marketplace
          </Link>
        </section>
      </main>
    );
  }

  const supportsOnPrem = app.supportedHosting?.includes("on-prem");
  const actionText = selectedHosting === "cloud" ? "Try it free" : supportsOnPrem ? "Free 30-day trial" : "Buy license";
  const actionSubtext = selectedHosting === "cloud" ? "Free for up to 10 users" : "Starts at $5/mo";
  const tabs: TabKey[] = ["Overview", "Reviews", "Pricing", "Support", "Installation"];

  return (
    <main className="min-h-screen bg-slate-50">
      <Header showLogin showPartnerPortal />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          {onBackHome ? (
            <button type="button" onClick={onBackHome} className="hover:text-blue-600 hover:underline">Marketplace</button>
          ) : (
            <Link href="/" className="hover:text-blue-600 hover:underline">Marketplace</Link>
          )}
          <span>/</span>
          <span>{app.category ?? "Apps"}</span>
          <span>/</span>
          <span className="text-gray-800">{app.name}</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-8 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
              <AppIcon name={app.name} category={app.category} sizeClassName="h-20 w-20 rounded-xl" iconClassName="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{app.name}</h1>
              <p className="mt-1 text-base font-medium text-blue-600">{app.partnerName}</p>
              <p className="mt-2 text-sm text-gray-500">Compatible with ONES Project</p>
            </div>
          </div>

          <div className="w-full max-w-xs space-y-3">
            <CustomSelect
              value={selectedHosting}
              onChange={(v) => setSelectedHosting(v as HostingKind)}
              options={[
                { value: "cloud", label: "Cloud" },
                { value: "on-prem", label: "On-Premise", disabled: !supportsOnPrem }
              ]}
            />
            <button
              type="button"
              onClick={() => {
                if (selectedHosting === "cloud") setInstallOpen(true);
              }}
              className={`w-full rounded-md px-4 py-3 text-sm font-bold shadow-md ${
                selectedHosting === "cloud"
                  ? "bg-gradient-to-r from-amber-300 to-blue-600 text-white hover:from-amber-400 hover:to-blue-700"
                  : "border border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
              }`}
            >
              {actionText}
            </button>
            <p className="text-center text-xs text-gray-500">{actionSubtext}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-gray-50/40 p-5 md:grid-cols-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {app.rating.toFixed(1)} rating</p>
          <p className="text-sm text-gray-600">{Math.round(app.installs / 1000)}k installs</p>
          <p className="text-sm text-gray-600">Partner Supported</p>
          <p className="inline-flex items-center gap-2 text-sm text-blue-700"><ShieldCheck className="h-4 w-4" /> Cloud Fortified</p>
        </div>
      </section>

      <section className="sticky top-0 z-10 border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            {activeTab === "Overview" ? <OverviewTab app={app} /> : null}
            {activeTab === "Reviews" ? <ReviewsTab /> : null}
            {activeTab === "Pricing" ? <PricingTab /> : null}
            {activeTab === "Support" ? <SupportTab /> : null}
            {activeTab === "Installation" ? <InstallationTab selectedHosting={selectedHosting} /> : null}
          </div>
          <DetailSidebar app={app} selectedHosting={selectedHosting} />
        </div>
      </section>

      <InstallModal isOpen={installOpen} appName={app.name} onClose={() => setInstallOpen(false)} onSuccess={() => setInstallOpen(false)} />
    </main>
  );
}
