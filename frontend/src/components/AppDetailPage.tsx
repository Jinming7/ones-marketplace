"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ExternalLink, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { InstallModal } from "@/components/InstallModal";
import { AppDetailModel, HostingKind } from "@/lib/types";

type DetailHosting = "cloud" | "on-prem";

const tabs = ["Overview", "Reviews", "Pricing", "Support"] as const;
type TabKey = (typeof tabs)[number];

interface AppDetailPageProps {
  app: AppDetailModel;
}

const mediaItems = ["Dashboard View", "Config Screen", "Sync Logs"];

export function AppDetailPage({ app }: AppDetailPageProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [showSticky, setShowSticky] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cloudInstalled, setCloudInstalled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedHosting = (searchParams.get("hosting") === "on-prem" ? "on-prem" : "cloud") as DetailHosting;

  const supportedHosting: HostingKind[] = app.supportedHosting ?? ["cloud", "on-prem"];
  const hostingAvailable = supportedHosting.includes(selectedHosting);

  const ctaLabel = useMemo(() => {
    if (!hostingAvailable) {
      return selectedHosting === "on-prem" ? "Not available for On-Premise" : "Not available for Cloud";
    }

    if (selectedHosting === "cloud") {
      return cloudInstalled ? "Launch App" : "Try for free";
    }

    return "Download App (.opkg)";
  }, [selectedHosting, hostingAvailable, cloudInstalled]);

  const resources = useMemo(() => {
    if (selectedHosting === "cloud") {
      return ["Cloud Installation Guide", "Partner Support", "Privacy Policy"];
    }

    return ["Server Deployment Docs", "License Activation", "Security Whitepaper"];
  }, [selectedHosting]);

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

  const handleSwitchHosting = (value: DetailHosting) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("hosting", value);
    router.replace(`${pathname}?${next.toString()}`);
  };

  const handlePrimaryAction = () => {
    if (!hostingAvailable) {
      return;
    }

    if (selectedHosting === "cloud") {
      if (cloudInstalled) {
        setToastMessage("Launching app...");
      } else {
        setModalOpen(true);
      }
      return;
    }

    setToastMessage("Downloading jira-sync-pro-2.4.1.opkg");
  };

  return (
    <>
      <Header showLogin showPartnerPortal />

      <div
        className={`fixed left-0 right-0 top-0 z-[55] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur transition-transform duration-300 ${
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
            <span className="text-sm font-semibold text-slate-900">{app.name}</span>
          </div>
          <button
            onClick={handlePrimaryAction}
            disabled={!hostingAvailable}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              hostingAvailable
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            {ctaLabel}
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <Link className="text-slate-500 hover:text-blue-700 hover:underline" href="/">
            Marketplace
          </Link>
          <span className="text-slate-400">/</span>
          <Link className="text-slate-500 hover:text-blue-700 hover:underline" href="/?category=DevOps">
            DevOps
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700">{app.name}</span>
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
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{app.name}</h1>
                <div className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  ONES Certified
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {app.rating.toFixed(1)} ({Math.round(app.installs / 1000)}k installs)
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <label className="text-sm font-medium text-slate-700">
                View for:
                <select
                  value={selectedHosting}
                  onChange={(event) => handleSwitchHosting(event.target.value as DetailHosting)}
                  className="ml-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="cloud">Cloud</option>
                  <option value="on-prem">On-Premise</option>
                </select>
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrimaryAction}
                  disabled={!hostingAvailable}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    selectedHosting === "cloud"
                      ? hostingAvailable
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                      : hostingAvailable
                        ? "border border-blue-600 text-blue-700 hover:bg-blue-50"
                        : "cursor-not-allowed border border-slate-300 text-slate-400"
                  }`}
                >
                  {ctaLabel}
                </button>
                {selectedHosting === "on-prem" ? (
                  <a href="#" className="text-sm font-medium text-blue-700 hover:underline">
                    Get License
                  </a>
                ) : null}
              </div>

              <p className="text-sm text-slate-500">
                {selectedHosting === "cloud"
                  ? "Compatible with ONES.com"
                  : "Compatible: ONES 3.10 - 4.2"}
              </p>
            </div>
          </div>
        </section>

        {selectedHosting === "on-prem" ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Requires ONES Server 3.10+
          </div>
        ) : null}

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
                  <h3 className="text-base font-semibold text-slate-900">Core capabilities</h3>
                  <ul className="space-y-2 text-sm">
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
                  <p className="leading-7">{app.summary}</p>
                </div>
              ) : null}

              {activeTab === "Reviews" ? (
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="rounded-lg border border-slate-200 p-4">
                    "Reliable sync and easy setup. Helped us cut status update overhead." - Platform Team
                  </div>
                </div>
              ) : null}

              {activeTab === "Pricing" ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700">
                        <th className="border border-slate-200 px-3 py-2 text-left">Feature</th>
                        <th className="border border-slate-200 px-3 py-2 text-left">Free Tier</th>
                        <th className="border border-slate-200 px-3 py-2 text-left">Pro Tier</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr>
                        <td className="border border-slate-200 px-3 py-2">Sync Frequency</td>
                        <td className="border border-slate-200 px-3 py-2">15 min</td>
                        <td className="border border-slate-200 px-3 py-2">Real-time</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-200 px-3 py-2">Projects</td>
                        <td className="border border-slate-200 px-3 py-2">2</td>
                        <td className="border border-slate-200 px-3 py-2">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null}

              {activeTab === "Support" ? (
                <div className="space-y-2 text-sm text-slate-700">
                  <p>SLA: 24h response</p>
                  <p>Email: support@partner.com</p>
                  <a href="#" className="inline-flex items-center gap-1 text-blue-700 hover:underline">
                    Documentation
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
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
                  <dd className="text-slate-900">
                    {selectedHosting === "cloud" ? "Latest (Auto-update)" : "2.4.1"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Hosting</dt>
                  <dd className="text-right text-slate-900">
                    {selectedHosting === "cloud" ? "SaaS" : "On-Premise"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Compatible</dt>
                  <dd className="text-right text-slate-900">
                    {selectedHosting === "cloud" ? "ONES.com" : "ONES 3.10 - 4.2"}
                  </dd>
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
                {resources.map((item) => (
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
        appName={app.name}
        onClose={() => setModalOpen(false)}
        onSuccess={(team) => {
          setModalOpen(false);
          setCloudInstalled(true);
          setToastMessage(`Installed successfully for ${team}`);
        }}
      />

      {toastMessage ? (
        <div className="fixed bottom-6 right-6 z-[85] rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toastMessage}
        </div>
      ) : null}
    </>
  );
}
