import { Download, ShieldCheck, Star } from "lucide-react";
import { AppCardModel } from "@/lib/types";
import { AppIcon } from "./AppIcon";

interface AppCardProps {
  app: AppCardModel;
  disabled?: boolean;
  disabledLabel?: string;
  currentVersion?: string;
  onSelect?: (appId: string) => void;
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
      <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-100/50 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
        SaaS Ready
      </span>
    );
  }

  const { min, max } = parseOnPremRange(app.compatibility?.onPremLabel);
  if (!min && !max) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-100/50 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        v{currentVersion} Ready
      </span>
    );
  }

  const lowerOk = min ? compareVersion(currentVersion, min) >= 0 : true;
  const upperOk = max ? compareVersion(currentVersion, max) <= 0 : true;
  const compatible = lowerOk && upperOk;

  if (compatible) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-100/50 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        v{currentVersion} Ready
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-100/50 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
      Requires v5.x
    </span>
  );
}

export function AppCard({ app, disabled = false, disabledLabel, currentVersion, onSelect }: AppCardProps) {
  const isCloudFortified = app.programs.some((program) => program.code === "CLOUD_FORTIFIED");

  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled && onSelect) {
          onSelect(app.id);
        }
      }}
      className={`group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-left transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-60 grayscale"
          : "hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      }`}
    >
      {!disabled ? (
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-md border border-blue-600 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:bg-blue-50">
          View Details
        </span>
      ) : null}

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

      <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
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

        <CompatibilityStatus app={app} currentVersion={currentVersion} />
      </div>

      {disabled && disabledLabel ? <p className="mt-3 text-xs text-gray-400">{disabledLabel}</p> : null}
    </button>
  );
}
