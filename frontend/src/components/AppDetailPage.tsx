"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
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

const TABS = ["overview", "reviews", "pricing", "support", "installation"] as const;
type TabKey = (typeof TABS)[number];

interface AppDetailPageProps {
  app?: AppDetailModel;
  onBackHome?: () => void;
}

function markdownToBlocks(source: string): string[] {
  return source
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function FeatureHighlights() {
  const items = [
    { icon: Rocket, title: "Boost Efficiency" },
    { icon: Lock, title: "Secure" },
    { icon: BarChart3, title: "Insightful" }
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-4">
          <item.icon className="h-5 w-5 text-blue-600" />
          <p className="mt-2 text-sm font-semibold text-gray-900">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

function MediaGallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-3 rounded-xl border border-gray-100 bg-white p-4">
      <div className="aspect-video rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center text-sm text-gray-500">
        Product Demo / Hero Screenshot
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {images.slice(0, 3).map((item) => (
          <div key={item} className="aspect-video rounded-lg border border-gray-100 bg-gray-50 text-xs text-gray-500 flex items-center justify-center px-2">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkdownDescription({ blocks }: { blocks: string[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h3 className="tracking-tight text-lg font-semibold text-gray-900">Description</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-600">
        {blocks.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function RatingSummary() {
  const bars = [68, 21, 7, 3, 1];
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-5xl font-bold text-gray-900">4.7</p>
          <p className="mt-1 text-sm text-gray-500">Average rating</p>
        </div>
        <div className="min-w-[260px] flex-1 space-y-2">
          {bars.map((value, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-4">{5 - idx}</span>
              <div className="h-2 flex-1 rounded bg-gray-100">
                <div className="h-2 rounded bg-blue-600" style={{ width: `${value}%` }} />
              </div>
              <span className="w-8 text-right">{value}%</span>
            </div>
          ))}
        </div>
        <button className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
          Write a Review
        </button>
      </div>
    </div>
  );
}

function ReviewList() {
  const reviews = [
    { user: "Alice Zhang", role: "Admin", date: "2 days ago", hosting: "Cloud", text: "Reliable integration and clear sync visibility." },
    { user: "Ben Lee", role: "Admin", date: "5 days ago", hosting: "On-Prem", text: "Stable on large on-prem environments with good logs." },
    { user: "Cathy Wu", role: "Admin", date: "1 week ago", hosting: "Cloud", text: "Setup is fast and upgrade path is predictable." }
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.user} className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 ring-2 ring-blue-50 ring-offset-2">
              {review.user.split(" ").map((part) => part[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{review.user}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600">
                  Verified User
                </span>
                <span className="text-xs text-gray-500">
                  {review.role} · {review.date} · {review.hosting}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{review.text}</p>
        </article>
      ))}
    </div>
  );
}

function PriceCalculator({
  teamSize,
  setTeamSize,
  isAnnual,
  setIsAnnual,
  estimatedText
}: {
  teamSize: number;
  setTeamSize: (n: number) => void;
  isAnnual: boolean;
  setIsAnnual: (v: boolean) => void;
  estimatedText: string;
}) {
  const clamp = (value: number) => Math.min(10000, Math.max(1, value));
  const percentage = ((teamSize - 1) / (10000 - 1)) * 100;

  return (
    <div className="space-y-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm">
      <h3 className="tracking-tight text-lg font-semibold text-gray-900">Price Calculator</h3>
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-end">
        <label className="block">
          <p className="text-sm font-medium text-gray-700">How many users?</p>
          <input
            type="number"
            min={1}
            max={10000}
            value={teamSize}
            onChange={(event) => setTeamSize(clamp(Number(event.target.value || "1")))}
            className="mt-2 w-32 border-b-2 border-blue-200 bg-transparent text-3xl font-bold text-gray-900 outline-none focus:border-blue-600"
          />
        </label>
        <div>
          <input
            type="range"
            min={1}
            max={10000}
            value={teamSize}
            onChange={(event) => setTeamSize(clamp(Number(event.target.value)))}
            style={{ background: `linear-gradient(to right, #2563EB ${percentage}%, #E5E7EB ${percentage}%)` }}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>1</span>
            <span>10000</span>
          </div>
        </div>
      </div>
      <div className="inline-flex rounded-full border border-gray-200 p-1 text-sm">
        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className={`rounded-full px-3 py-1 ${!isAnnual ? "bg-blue-600 text-white" : "text-gray-600"}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className={`rounded-full px-3 py-1 ${isAnnual ? "bg-blue-600 text-white" : "text-gray-600"}`}
        >
          Annual (Save 20%)
        </button>
      </div>
      <p className="text-3xl font-bold text-gray-900">Estimated: {estimatedText}</p>
    </div>
  );
}

function ComparisonTable({ isAnnual }: { isAnnual: boolean }) {
  const standard = isAnnual ? 8 : 10;
  const pro = isAnnual ? 9.6 : 12;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h3 className="tracking-tight text-sm font-semibold text-gray-900">Comparison Table</h3>
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
              <td className="border border-gray-200 px-3 py-2">Per-user price</td>
              <td className="border border-gray-200 px-3 py-2">${standard}</td>
              <td className="border border-gray-200 px-3 py-2">${pro}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Workflow automation</td>
              <td className="border border-gray-200 px-3 py-2">Basic</td>
              <td className="border border-gray-200 px-3 py-2">Advanced</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Audit controls</td>
              <td className="border border-gray-200 px-3 py-2">Limited</td>
              <td className="border border-gray-200 px-3 py-2">Full</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InstallationPanel({ hosting }: { hosting: HostingKind }) {
  if (hosting === "cloud") {
    return (
      <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          One-click Install
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">Permissions Required</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Read project metadata</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Write issue links</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Access webhook events</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <h3 className="tracking-tight text-lg font-semibold text-gray-900">Version History</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="border border-gray-200 px-3 py-2 text-left">Version</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Release Date</th>
              <th className="border border-gray-200 px-3 py-2 text-left">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">2.4.1</td>
              <td className="border border-gray-200 px-3 py-2">2026-01-28</td>
              <td className="border border-gray-200 px-3 py-2"><a href="#" className="text-blue-600 hover:underline">Download JAR</a></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">2.4.0</td>
              <td className="border border-gray-200 px-3 py-2">2025-12-14</td>
              <td className="border border-gray-200 px-3 py-2"><a href="#" className="text-blue-600 hover:underline">Download OBR</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppDetailsWidget({ selectedHosting, app }: { selectedHosting: HostingKind; app: AppDetailModel }) {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="tracking-tight text-sm font-semibold text-gray-900">App Details</h3>
      <dl className="mt-3 space-y-2 text-sm text-gray-500">
        <div className="flex justify-between gap-3">
          <dt>Version</dt>
          <dd className="text-gray-900">{selectedHosting === "cloud" ? "Latest" : app.compatibility?.onPremLabel ?? "5.0+"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Last Updated</dt>
          <dd className="text-gray-900">2026-02-18</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>License</dt>
          <dd className="text-gray-900">Commercial</dd>
        </div>
      </dl>
    </div>
  );
}

function ResourcesWidget() {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="tracking-tight text-sm font-semibold text-gray-900">Resources</h3>
      <div className="mt-3 space-y-2 text-sm">
        {["Documentation", "EULA", "Privacy Policy"].map((label) => (
          <a key={label} href="#" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
            {label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}

function TrustWidget() {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="tracking-tight text-sm font-semibold text-gray-900">Trust & Security</h3>
      <div className="mt-3 space-y-3 text-sm text-gray-600">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Cloud Fortified
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Security Reviewed
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">Data Residency</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {["US", "EU", "APAC"].map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{tag}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-900">Compliance</p>
          <ul className="mt-1 space-y-1">
            <li>ISO 27001</li>
            <li>SOC 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SidebarWidgets({ selectedHosting, app }: { selectedHosting: HostingKind; app: AppDetailModel }) {
  const similarApps = [
    { id: "scriptrunner", name: "Jira Sync Pro", rating: "4.9" },
    { id: "github-sync", name: "GitLab CI", rating: "4.7" },
    { id: "slack", name: "Slack Connect", rating: "4.8" }
  ];

  return (
    <aside className="space-y-4">
      <AppDetailsWidget selectedHosting={selectedHosting} app={app} />
      <ResourcesWidget />
      <TrustWidget />
      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="tracking-tight text-sm font-semibold text-gray-900">Similar Apps</h3>
        <div className="mt-3 space-y-2">
          {similarApps.map((item) => (
            <Link key={item.id} href={`/app/${item.id}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
              <AppIcon name={item.name} sizeClassName="h-8 w-8 rounded-md" iconClassName="h-4 w-4" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Rating {item.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function AppDetailPage({ app, onBackHome }: AppDetailPageProps) {
  const [selectedHosting, setSelectedHosting] = useState<HostingKind>("cloud");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [isAnnual, setIsAnnual] = useState(false);
  const [teamSize, setTeamSize] = useState(10);
  const [openInstall, setOpenInstall] = useState(false);

  const supportsOnPrem = app?.supportedHosting?.includes("on-prem") ?? false;
  const primaryCta = selectedHosting === "cloud" ? "Try it free" : supportsOnPrem ? "Free 30-day trial" : "Buy license";
  const secondaryText = selectedHosting === "cloud" ? "Free for up to 10 users" : "Starts at $5/mo";

  const baseStandard = 10;
  const discountMultiplier = isAnnual ? 0.8 : 1;
  const monthlyEstimate = baseStandard * teamSize * discountMultiplier;
  const yearlyEstimate = baseStandard * teamSize * discountMultiplier * 12;
  const estimatedText = `$${(isAnnual ? yearlyEstimate : monthlyEstimate).toLocaleString()}/${isAnnual ? "yr" : "mo"}`;

  const descriptionBlocks = useMemo(() => markdownToBlocks(app?.longDescription ?? ""), [app?.longDescription]);

  if (!app) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header showLogin showPartnerPortal />
        <section className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">App not found</h1>
          <Link href="/" className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Back to Marketplace
          </Link>
        </section>
      </main>
    );
  }

  const renderTabPanel = () => {
    if (activeTab === "overview") {
      return (
        <section className="space-y-4 rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm min-h-[400px]">
          <h2 className="tracking-tight text-xl font-bold text-gray-900">Overview</h2>
          <FeatureHighlights />
          <MediaGallery images={app.detailImages} />
          <MarkdownDescription blocks={descriptionBlocks} />
        </section>
      );
    }

    if (activeTab === "reviews") {
      return (
        <section className="space-y-4 rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm min-h-[400px]">
          <h2 className="tracking-tight text-xl font-bold text-gray-900">Reviews</h2>
          <div className="mt-2">
            <RatingSummary />
          </div>
          <div>
            <ReviewList />
          </div>
        </section>
      );
    }

    if (activeTab === "pricing") {
      return (
        <section className="space-y-4 rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm min-h-[400px]">
          <h2 className="tracking-tight text-xl font-bold text-gray-900">Pricing</h2>
          <PriceCalculator
            teamSize={teamSize}
            setTeamSize={setTeamSize}
            isAnnual={isAnnual}
            setIsAnnual={setIsAnnual}
            estimatedText={estimatedText}
          />
          <ComparisonTable isAnnual={isAnnual} />
        </section>
      );
    }

    if (activeTab === "support") {
      return (
        <section className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm min-h-[400px]">
          <h2 className="tracking-tight text-xl font-bold text-gray-900">Support</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">SLA: 24h response time.</p>
          <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
            Open ticket
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>
      );
    }

    return (
      <section className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm min-h-[400px]">
          <h2 className="tracking-tight text-xl font-bold text-gray-900">Installation</h2>
        <div className="mt-3">
          <InstallationPanel hosting={selectedHosting} />
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Header showLogin showPartnerPortal />

      <section className="mx-auto max-w-7xl border-b border-blue-100/50 bg-gradient-to-br from-blue-50/80 via-white to-white px-6 py-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          {onBackHome ? (
            <button type="button" onClick={onBackHome} className="hover:text-blue-600 hover:underline">Marketplace</button>
          ) : (
            <Link href="/" className="hover:text-blue-600 hover:underline">Marketplace</Link>
          )}
          <span>/</span>
          <Link href="/" className="hover:text-blue-600 hover:underline">{app.category ?? "Apps"}</Link>
          <span>/</span>
          <span className="text-gray-900">{app.name}</span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-sm">
                <AppIcon name={app.name} category={app.category} sizeClassName="h-24 w-24 rounded-2xl" iconClassName="h-10 w-10" />
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
                onChange={(value) => setSelectedHosting(value as HostingKind)}
                options={[
                  { value: "cloud", label: "Cloud" },
                  { value: "on-prem", label: "On-Premise", disabled: !supportsOnPrem }
                ]}
              />
              <button
                type="button"
                onClick={() => {
                  if (selectedHosting === "cloud") setOpenInstall(true);
                }}
                className={`w-full px-4 py-3 text-sm font-bold ${
                  selectedHosting === "cloud"
                    ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    : "rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                }`}
              >
                {primaryCta}
              </button>
              <p className="text-center text-xs text-gray-500">{secondaryText}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-3">
            <p className="inline-flex items-center gap-2 text-sm text-gray-700"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {app.rating.toFixed(1)} rating</p>
            <p className="text-sm text-gray-700">{Math.round(app.installs / 1000)}k installs</p>
            <p className="text-sm text-gray-700">Partner Supported</p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex h-14 items-end space-x-8 overflow-x-auto">
            {TABS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`pb-2.5 text-sm capitalize transition-colors ${
                  activeTab === id
                    ? "border-b-2 border-blue-600 font-bold text-blue-600"
                    : "font-medium text-gray-500 hover:text-gray-900"
                }`}
              >
                {id}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderTabPanel()}
          </div>
        </div>

        <SidebarWidgets selectedHosting={selectedHosting} app={app} />
      </section>

      <InstallModal isOpen={openInstall} appName={app.name} onClose={() => setOpenInstall(false)} onSuccess={() => setOpenInstall(false)} />
    </main>
  );
}
