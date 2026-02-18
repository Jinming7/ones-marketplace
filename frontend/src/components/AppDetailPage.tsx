"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Download, ExternalLink, ShieldCheck, Star, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { AppIcon } from "@/components/AppIcon";
import { InstallModal } from "@/components/InstallModal";
import { AppDetailModel, HostingKind } from "@/lib/types";

type TabKey = "Overview" | "Reviews" | "Pricing" | "Support";

interface AppDetailPageProps {
  app?: AppDetailModel;
  onBackHome?: () => void;
}

function formatInstalls(installs: number): string {
  if (installs >= 1000) return `${Math.round(installs / 1000)}k+`;
  return `${installs}`;
}

export function AppDetailPage({ app, onBackHome }: AppDetailPageProps) {
  const [selectedHosting, setSelectedHosting] = useState<HostingKind>("cloud");
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [modalOpen, setModalOpen] = useState(false);

  if (!app) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header showLogin showPartnerPortal />
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">App not found</h1>
          <p className="mt-3 text-slate-500">The app you requested does not exist in the marketplace data.</p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Marketplace
          </Link>
        </section>
      </main>
    );
  }

  const supportsOnPrem = app.supportedHosting?.includes("on-prem") ?? false;
  const onPremCompatibility = app.compatibility?.onPremLabel ?? "ONES On-Premise v4.0+";
  const compatibilityText =
    selectedHosting === "cloud" ? "Works with ONES Cloud" : `Works with ${onPremCompatibility}`;
  const ctaText = selectedHosting === "cloud" ? "Try it free" : "Download";

  const resources = useMemo(
    () =>
      selectedHosting === "cloud"
        ? ["Cloud Installation Guide", "Documentation", "EULA"]
        : ["On-Prem Deployment Guide", "Server Installation Docs", "EULA"],
    [selectedHosting]
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Header showLogin showPartnerPortal />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          {onBackHome ? (
            <button type="button" onClick={onBackHome} className="text-slate-500 hover:text-blue-600 hover:underline">
              Marketplace
            </button>
          ) : (
            <Link href="/" className="text-slate-500 hover:text-blue-600 hover:underline">
              Marketplace
            </Link>
          )}
          <span className="text-slate-300">/</span>
          <Link href="/" className="text-slate-500 hover:text-blue-600 hover:underline">
            {app.category ?? "Apps"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">{app.name}</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-gray-100 bg-white shadow-lg">
              <AppIcon
                name={app.name}
                category={app.category}
                sizeClassName="h-24 w-24 rounded-2xl"
                iconClassName="h-10 w-10"
              />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900">{app.name}</h1>
              <p className="text-base font-medium text-blue-600">{app.partnerName}</p>
              <p className="mt-2 text-gray-500">{compatibilityText}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <label className="text-sm font-medium text-gray-700">
              View for:
              <select
                value={selectedHosting}
                onChange={(event) => setSelectedHosting(event.target.value as HostingKind)}
                className="ml-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
              >
                <option value="cloud">Cloud</option>
                <option value="on-prem" disabled={!supportsOnPrem}>
                  On-Premise
                </option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                if (selectedHosting === "cloud") setModalOpen(true);
              }}
              className="rounded-md bg-blue-600 px-8 py-3 text-base font-bold text-white shadow-md hover:bg-blue-700"
            >
              {ctaText}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-gray-200 bg-gray-50/30 p-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Star Rating</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {app.rating.toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Installs</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Download className="h-4 w-4 text-gray-600" />
              {formatInstalls(app.installs)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Support</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Users className="h-4 w-4 text-gray-600" />
              Partner Supported
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Trust Badge</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              {app.programs.some((program) => program.code === "CLOUD_FORTIFIED")
                ? "Cloud Fortified"
                : "Security Reviewed"}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-10 border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-8">
            {(["Overview", "Reviews", "Pricing", "Support"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-8 px-6 pb-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="aspect-video rounded-xl border border-gray-200 bg-gray-100 shadow-md">
            <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">
              YouTube Video / Carousel
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {app.detailImages.slice(0, 3).map((image) => (
              <div key={image} className="aspect-video rounded-lg border border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
                <div className="flex h-full items-center justify-center px-3">{image}</div>
              </div>
            ))}
          </div>

          {activeTab === "Overview" ? (
            <article className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{app.summary}</p>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Key capabilities</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Bi-directional synchronization for workflow entities
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Flexible field mapping and conflict handling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Audit-ready event logs for enterprise governance
                </li>
              </ul>
              <div className="prose prose-slate mt-5 max-w-none text-sm" dangerouslySetInnerHTML={{ __html: app.longDescription }} />
            </article>
          ) : null}

          {activeTab === "Reviews" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Customer Reviews</p>
              <p className="mt-2">Reliable setup and predictable sync behavior across complex enterprise projects.</p>
            </div>
          ) : null}

          {activeTab === "Pricing" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">Pricing</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="border border-gray-200 px-4 py-2 text-left">Plan</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Highlights</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Free</td>
                      <td className="border border-gray-200 px-4 py-2">$0</td>
                      <td className="border border-gray-200 px-4 py-2">Single project sync</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Enterprise</td>
                      <td className="border border-gray-200 px-4 py-2">Contact sales</td>
                      <td className="border border-gray-200 px-4 py-2">Unlimited projects and audit controls</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activeTab === "Support" ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
              <p>SLA: 24h first response</p>
              <p className="mt-2">Email: support@partner.com</p>
              <a href="#" className="mt-2 inline-flex items-center gap-1 font-medium text-blue-600 hover:underline">
                Partner support portal
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <div className="mt-3 space-y-2 text-sm">
              {resources.map((item) => (
                <a key={item} href="#" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                  {item}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900">App Details</h3>
            <dl className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between gap-3">
                <dt>Version</dt>
                <dd className="text-right text-gray-900">
                  {selectedHosting === "cloud" ? "Latest (Auto-update)" : app.compatibility?.onPremLabel ?? "v4.0+"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Last Updated</dt>
                <dd className="text-right text-gray-900">2 days ago</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>License</dt>
                <dd className="text-right text-gray-900">Commercial</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <InstallModal
        isOpen={modalOpen}
        appName={app.name}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setModalOpen(false)}
      />
    </main>
  );
}
