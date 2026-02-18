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

function compatibilityText(app: AppCardModel, currentVersion?: string): string {
  const supportsOnPrem = app.supportedHosting?.includes("on-prem") ?? false;

  if (!currentVersion || !supportsOnPrem) {
    return "SaaS Ready";
  }

  const { min, max } = parseOnPremRange(app.compatibility?.onPremLabel);
  if (!min && !max) {
    return `v${currentVersion} Ready`;
  }

  const lowerOk = min ? compareVersion(currentVersion, min) >= 0 : true;
  const upperOk = max ? compareVersion(currentVersion, max) <= 0 : true;
  const compatible = lowerOk && upperOk;

  if (compatible) {
    return `v${currentVersion} Ready`;
  }

  return `Needs ${app.compatibility?.onPremLabel ?? "v7.0"}`;
}

export function AppCard({ app, disabled = false, disabledLabel, currentVersion }: AppCardProps) {
  const isCloudFortified = app.programs.some((program) => program.code === "CLOUD_FORTIFIED");

  return (
    <Link
      href={disabled ? "#" : `/apps/${app.key}`}
      onClick={(event) => {
        if (disabled) event.preventDefault();
      }}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 transition-shadow ${
        disabled ? "cursor-not-allowed opacity-60 grayscale" : "hover:shadow-lg"
      }`}
    >
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="h-12 w-12 flex-shrink-0 rounded-lg shadow-sm">
            <AppIcon name={app.name} category={app.category} />
          </div>

          <div className="flex flex-col items-end gap-1">
            {app.spotlight ? (
              <span className="whitespace-nowrap rounded bg-purple-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600">
                {app.spotlight}
              </span>
            ) : null}
            {isCloudFortified ? (
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                <ShieldCheck className="h-3 w-3" />
                Cloud
              </span>
            ) : null}
          </div>
        </div>

        <div className="mb-6 flex-grow">
          <h3 className="mb-1 line-clamp-1 text-lg font-bold leading-tight tracking-tight text-gray-900">
            {app.name}
          </h3>
          <p className="mb-2 text-sm text-gray-500">{app.partnerName}</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">{app.summary}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {app.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {Math.round(app.installs / 1000)}k
          </span>
        </div>

        <span className="whitespace-nowrap rounded border border-gray-100 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
          {compatibilityText(app, currentVersion)}
        </span>
      </div>

      {disabled && disabledLabel ? <p className="mt-3 text-xs text-gray-400">{disabledLabel}</p> : null}
    </Link>
  );
}
