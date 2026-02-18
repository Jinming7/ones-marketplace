import Link from "next/link";
import { Download, ShieldCheck, Star } from "lucide-react";
import { AppCardModel } from "@/lib/types";
import { AppIcon } from "./AppIcon";

interface AppCardProps {
  app: AppCardModel;
  disabled?: boolean;
  disabledLabel?: string;
  currentVersion?: string;
}

type ParsedVersion = [number, number, number];

function parseVersion(version: string): ParsedVersion {
  const match = version.match(/(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!match) return [0, 0, 0];
  return [Number(match[1]), Number(match[2]), Number(match[3] ?? 0)];
}

function compareVersion(a: string, b: string): number {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] > pb[i]) return 1;
    if (pa[i] < pb[i]) return -1;
  }
  return 0;
}

function parseOnPremRange(label?: string): { min?: string; max?: string } {
  if (!label) return {};

  const plus = label.match(/(\d+\.\d+)\+/);
  if (plus) return { min: plus[1] };

  const range = label.match(/(\d+\.\d+)\s*-\s*(\d+\.\d+)/);
  if (range) return { min: range[1], max: range[2] };

  const single = label.match(/(\d+\.\d+(?:\.\d+)?)/);
  if (single) return { min: single[1], max: single[1] };

  return {};
}

function CompatibilityStatus({ app, currentVersion }: { app: AppCardModel; currentVersion?: string }) {
  const supportsOnPrem = app.supportedHosting?.includes("on-prem") ?? false;

  if (!currentVersion || !supportsOnPrem) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50/50 px-2 py-1 text-xs font-medium text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        vSaaS Ready
      </span>
    );
  }

  const { min, max } = parseOnPremRange(app.compatibility?.onPremLabel);
  if (!min && !max) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50/50 px-2 py-1 text-xs font-medium text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        v{currentVersion} Ready
      </span>
    );
  }

  const lowerOk = min ? compareVersion(currentVersion, min) >= 0 : true;
  const upperOk = max ? compareVersion(currentVersion, max) <= 0 : true;
  const compatible = lowerOk && upperOk;

  if (compatible) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50/50 px-2 py-1 text-xs font-medium text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        v{currentVersion} Ready
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50/50 px-2 py-1 text-xs font-medium text-amber-600">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Requires {app.compatibility?.onPremLabel ?? "v5.x"}
    </span>
  );
}

export function AppCard({ app, disabled = false, disabledLabel, currentVersion }: AppCardProps) {
  const isCloudFortified = app.programs.some((program) => program.code === "CLOUD_FORTIFIED");

  return (
    <Link
      href={disabled ? "#" : `/apps/${app.key}`}
      onClick={(event) => {
        if (disabled) event.preventDefault();
      }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-60 grayscale"
          : "hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      }`}
    >
      <span className="pointer-events-none absolute right-4 top-4 translate-y-[-4px] rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-all group-hover:opacity-100">
        Install
      </span>

      <div className="flex gap-4">
        <div className="mr-4 h-14 w-14 flex-shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm">
          <AppIcon name={app.name} category={app.category} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-blue-600">
              {app.name}
            </h3>
            <div className="flex items-center gap-1.5">
              {app.spotlight ? (
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600">
                  {app.spotlight}
                </span>
              ) : null}
              {isCloudFortified ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  <ShieldCheck className="h-3 w-3" />
                  Cloud
                </span>
              ) : null}
            </div>
          </div>

          <p className="mt-1 text-xs font-medium text-gray-400">{app.partnerName}</p>
          <p className="mt-3 h-10 line-clamp-2 text-sm leading-relaxed text-gray-500">{app.summary}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1 text-gray-700">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{app.rating.toFixed(1)}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-gray-400">
            <Download className="h-3.5 w-3.5" />
            {Math.round(app.installs / 1000)}k
          </span>
          {app.category ? <span className="text-gray-400">#{app.category}</span> : null}
        </div>

        <CompatibilityStatus app={app} currentVersion={currentVersion} />
      </div>

      {disabled && disabledLabel ? <p className="mt-2 text-xs text-gray-400">{disabledLabel}</p> : null}
    </Link>
  );
}
