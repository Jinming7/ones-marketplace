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
  if (!match) {
    return [0, 0, 0];
  }
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
      <span className="rounded border border-green-100 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        ✅ Compatible: SaaS
      </span>
    );
  }

  const { min, max } = parseOnPremRange(app.compatibility?.onPremLabel);
  if (!min && !max) {
    return (
      <span className="rounded border border-green-100 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        ✅ Compatible: v{currentVersion}
      </span>
    );
  }

  const lowerOk = min ? compareVersion(currentVersion, min) >= 0 : true;
  const upperOk = max ? compareVersion(currentVersion, max) <= 0 : true;
  const compatible = lowerOk && upperOk;

  if (compatible) {
    return (
      <span className="rounded border border-green-100 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
        ✅ Compatible: {currentVersion}
      </span>
    );
  }

  return (
    <span className="rounded border border-amber-100 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
      ⚠️ Requires {app.compatibility?.onPremLabel ?? "v7.0"}
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
      className={`group relative block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 ${
        disabled ? "cursor-not-allowed opacity-60 grayscale" : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="flex gap-4 p-5">
        <div className="h-14 w-14 flex-shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm">
          <AppIcon name={app.name} category={app.category} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-bold tracking-tight text-gray-900">{app.name}</h3>
            <div className="flex flex-col items-end gap-1">
              {app.spotlight ? (
                <span className="rounded border border-purple-100 bg-purple-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-purple-700">
                  {app.spotlight}
                </span>
              ) : null}
              {isCloudFortified ? (
                <span className="inline-flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                  <ShieldCheck className="h-3 w-3" />
                  Cloud Fortified
                </span>
              ) : null}
            </div>
          </div>

          <p className="mb-1 mt-1 text-xs font-medium text-gray-500">By {app.partnerName}</p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">{app.summary}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-50 border-opacity-50 px-5 pb-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-900">{app.rating.toFixed(1)}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Download className="h-4 w-4" />
          {Math.round(app.installs / 1000)}k installs
        </span>
        {app.category ? <span className="text-gray-500">#{app.category}</span> : null}
      </div>

      <div className="flex items-center justify-between bg-gray-50/50 px-5 py-3">
        <div className="flex items-center gap-2">
          <CompatibilityStatus app={app} currentVersion={currentVersion} />
          {disabled && disabledLabel ? <span className="text-xs text-gray-500">{disabledLabel}</span> : null}
        </div>

        <span className="translate-x-2 text-xs font-semibold text-blue-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
          Install
        </span>
      </div>
    </Link>
  );
}
