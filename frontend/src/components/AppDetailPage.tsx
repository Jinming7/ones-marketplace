"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, Star } from "lucide-react";
import { AppDetailModel } from "@/lib/types";

type HostingOption = "CLOUD" | "ONPREM_K8S" | "ONPREM_BINARY";

const tabs = ["Overview", "Reviews", "Pricing", "Support"] as const;
type TabKey = (typeof tabs)[number];

interface AppDetailPageProps {
  app: AppDetailModel;
}

const mediaItems = ["Dashboard View", "Config Screen", "Sync Logs"];

const hostingConfig: Record<
  HostingOption,
  {
    label: string;
    ctaLabel: string;
    compatibility: string;
    version: string;
    updatedAt: string;
    hostingText: string;
    resources: string[];
  }
> = {
  CLOUD: {
    label: "Cloud",
    ctaLabel: "Try for free",
    compatibility: "Compatible with ONES.com",
    version: "v2.4.1 (Auto-updates)",
    updatedAt: "2 days ago",
    hostingText: "Cloud",
    resources: ["Cloud Installation Guide", "Partner Support", "Privacy Policy"]
  },
  ONPREM_K8S: {
    label: "On-Premise (K8s)",
    ctaLabel: "Download .opkg",
    compatibility: "Requires ONES Core v5.4+",
    version: "v2.3.0 (Manual update)",
    updatedAt: "8 days ago",
    hostingText: "On-Premise (K8s)",
    resources: ["Server Deployment Docs", "K8s Helm Guide", "Security Whitepaper"]
  },
  ONPREM_BINARY: {
    label: "On-Premise (Binary)",
    ctaLabel: "Download .opkg",
    compatibility: "Requires ONES Core v5.4+",
    version: "v2.3.0 (Manual update)",
    updatedAt: "9 days ago",
    hostingText: "On-Premise (Binary)",
    resources: ["Server Deployment Docs", "Binary Install Manual", "Security Whitepaper"]
  }
};

function InstallModal({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (team: string) => void;
}) {
  const [team, setTeam] = useState("Engineering Team");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/50" onClick={onClose}>
      <div
        className="mx-auto mt-24 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-slate-900">Install Jira Sync Pro</h3>

        <div className="mt-5 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Select your ONES Team:</label>
            <select
              value={team}
              onChange={(event) => setTeam(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option>Engineering Team</option>
              <option>Design Team</option>
              <option>Sandbox</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Permissions required:</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Read Tasks
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Write Issues
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(team)}
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Confirm Installation
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppDetailPage({ app }: AppDetailPageProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [hosting, setHosting] = useState<HostingOption>("CLOUD");
  const [showSticky, setShowSticky] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const summary = useMemo(
    () =>
      app.summary ||
      "The #1 integration app for engineering teams using ONES for planning and Jira for execution.",
    [app.summary]
  );

  const selectedHosting = hostingConfig[hosting];

  useEffect(() => {
    const onScroll = () => {
      const threshold = (heroRef.current?.offsetTop ?? 0) + (heroRef.current?.offsetHeight ?? 220);
      setShowSticky(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const timer = setTimeout(() => setToastMessage(""), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handlePrimaryAction = () => {
    if (hosting === "CLOUD") {
      setModalOpen(true);
      return;
    }

    setToastMessage("Package download started: jira-sync-pro.opkg");
  };

  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 z-[60] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={app.logoUrl}
              alt={`${app.name} logo`}
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-50 object-cover p-0.5"
            />
            <span className="text-sm font-semibold text-slate-900">Jira Sync Pro</span>
          </div>
          <button
            onClick={handlePrimaryAction}
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {selectedHosting.ctaLabel}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <Link className="text-slate-500 hover:text-blue-700 hover:underline" href="/">
            Marketplace
          </Link>
          <span className="text-slate-400">/</span>
          <a className="text-slate-500 hover:text-blue-700 hover:underline" href="#">
            DevOps
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700">Jira Sync Pro</span>
        </div>

        <section ref={heroRef} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

            <div className="flex flex-col items-end gap-3">
              <label className="text-sm font-medium text-slate-700">
                View for:
                <select
                  value={hosting}
                  onChange={(event) => setHosting(event.target.value as HostingOption)}
                  className="ml-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="CLOUD">Cloud</option>
                  <option value="ONPREM_K8S">On-Premise (K8s)</option>
                  <option value="ONPREM_BINARY">On-Premise (Binary)</option>
                </select>
              </label>
              <button
                onClick={handlePrimaryAction}
                className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {selectedHosting.ctaLabel}
              </button>
              <p className="text-sm text-slate-500">{selectedHosting.compatibility}</p>
            </div>
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

                  <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">Why use this app?</p>
                    <p className="mt-1 text-sm text-slate-700">
                      Keep planning in ONES and execution in Jira synchronized without manual status updates.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm leading-7">
                    <h3 className="text-base font-semibold text-slate-900">Core capabilities</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <strong>Real-time bi-directional sync</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <strong>Field mapping configuration</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <strong>Enterprise-grade retry and audit logs</strong>
                      </li>
                    </ul>
                  </div>

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
                  <dd className="text-slate-900">{selectedHosting.version}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Last updated</dt>
                  <dd className="text-slate-900">{selectedHosting.updatedAt}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Hosting</dt>
                  <dd className="text-right text-slate-900">{selectedHosting.hostingText}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Categories</dt>
                  <dd className="text-right text-slate-900">DevOps, Project Management</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Resources</h3>
              <div className="mt-3 space-y-2 text-sm">
                {selectedHosting.resources.map((item) => (
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

      <InstallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(team) => {
          setModalOpen(false);
          setToastMessage(`Installed successfully for ${team}`);
        }}
      />

      {toastMessage ? (
        <div className="fixed bottom-6 right-6 z-[80] rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toastMessage}
        </div>
      ) : null}
    </>
  );
}
