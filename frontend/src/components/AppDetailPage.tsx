"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, Star } from "lucide-react";
import { AppDetailModel } from "@/lib/types";

const tabs = ["Overview", "Reviews", "Pricing", "Support"] as const;
type TabKey = (typeof tabs)[number];

interface AppDetailPageProps {
  app: AppDetailModel;
}

const mediaItems = ["Dashboard View", "Config Screen", "Sync Logs"];

export function AppDetailPage({ app }: AppDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  const summary = useMemo(
    () =>
      app.summary ||
      "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
    [app.summary]
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-4 text-sm text-slate-500">Marketplace / DevOps / Jira Sync Pro</div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <Image
              src={app.logoUrl}
              alt={`${app.name} logo`}
              width={80}
              height={80}
              className="h-20 w-20 rounded-xl border border-slate-200 bg-slate-50 object-cover p-1"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Jira Sync Pro</h1>
              <div className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                ONES Certified
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.9 (12k installs)
              </div>
            </div>
          </div>
          <button className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800">
            Try for free
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="aspect-video rounded-lg border border-slate-200 bg-slate-100 shadow-md shadow-slate-300/35">
              <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
                Dashboard View
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {mediaItems.map((item) => (
                <div
                  key={item}
                  className="aspect-video rounded-lg border border-slate-200 bg-slate-100 text-center text-xs font-medium text-slate-500"
                >
                  <div className="flex h-full items-center justify-center px-2">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Overview" ? (
              <div className="space-y-5 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">Connect ONES and Jira seamlessly.</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Real-time bi-directional sync
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Field mapping configuration
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    Enterprise-grade retry and audit logs
                  </li>
                </ul>
                <p className="leading-7">
                  {summary} It helps product and engineering teams maintain a single source of truth while
                  working across planning and delivery systems.
                </p>
                <p className="leading-7">
                  Designed for enterprise workflows, the integration supports flexible mapping, secure
                  connectivity, and scalable synchronization policies that align with your governance model.
                </p>
              </div>
            ) : null}

            {activeTab === "Reviews" ? (
              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 p-4">
                  "Reliable sync and easy setup. Helped us cut status update overhead." - Platform Team
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  "The field mapping is flexible enough for our multi-project setup." - PMO
                </div>
              </div>
            ) : null}

            {activeTab === "Pricing" ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Free trial: 14 days</p>
                <p>Standard: $5 per user / month</p>
                <p>Enterprise: Custom contract</p>
              </div>
            ) : null}

            {activeTab === "Support" ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Response SLA: within 1 business day</p>
                <p>Support channels: Email, ticket portal, onboarding session</p>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">App Details</h3>
            <dl className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between gap-3">
                <dt>Version</dt>
                <dd className="text-slate-900">2.4.1</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Last updated</dt>
                <dd className="text-slate-900">2 days ago</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Hosting</dt>
                <dd className="text-right text-slate-900">Cloud, On-Premise</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Resources</h3>
            <div className="mt-3 space-y-2 text-sm">
              {[
                "Documentation",
                "Partner Support",
                "Privacy Policy"
              ].map((item) => (
                <a key={item} href="#" className="flex items-center gap-1 text-blue-700 hover:underline">
                  {item}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Vendor</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50" />
              <p className="text-sm text-slate-700">
                Built by <span className="font-semibold text-slate-900">ONES Partner Lab</span>
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
