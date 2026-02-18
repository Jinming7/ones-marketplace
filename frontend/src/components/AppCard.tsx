import Link from "next/link";
import { Download, ShieldCheck, Star } from "lucide-react";
import { AppCardModel } from "@/lib/types";
import { AppIcon } from "./AppIcon";

interface AppCardProps {
  app: AppCardModel;
  disabled?: boolean;
  disabledLabel?: string;
}

function CompatibilityBadges({ app }: { app: AppCardModel }) {
  const supportsCloud = app.supportedHosting?.includes("cloud") ?? false;
  const supportsOnPrem = app.supportedHosting?.includes("on-prem") ?? false;
  const testedOn = app.compatibility?.testedOn;
  const warning = app.compatibility?.warning;

  if (supportsCloud && supportsOnPrem) {
    return (
      <div className="flex flex-wrap gap-2" title={testedOn}>
        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">☁️ {app.compatibility?.cloudLabel ?? "Cloud Ready"}</span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${
            warning ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          💾 {app.compatibility?.onPremLabel ?? "ONES 6.0+"}
        </span>
      </div>
    );
  }

  if (supportsCloud) {
    return (
      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700" title={testedOn}>
        ☁️ {app.compatibility?.cloudLabel ?? "Cloud Ready"}
      </span>
    );
  }

  if (supportsOnPrem) {
    return (
      <span
        className={`rounded px-2 py-0.5 text-xs font-medium ${
          warning ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
        }`}
        title={testedOn}
      >
        💾 {app.compatibility?.onPremLabel ?? "ONES 6.0+"}
      </span>
    );
  }

  return (
    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600" title={testedOn}>
      All Platforms
    </span>
  );
}

export function AppCard({ app, disabled = false, disabledLabel }: AppCardProps) {
  const isCloudFortified = app.programs.some((program) => program.code === "CLOUD_FORTIFIED");

  return (
    <Link
      href={disabled ? "#" : `/apps/${app.key}`}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
      }}
      className={`group relative block rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ${
        disabled ? "cursor-not-allowed opacity-55 grayscale" : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="flex gap-3">
        <AppIcon name={app.name} category={app.category} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight text-slate-900">{app.name}</h3>
            <div className="flex flex-col items-end gap-1">
              {app.spotlight ? (
                <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700">
                  {app.spotlight}
                </span>
              ) : null}
              {isCloudFortified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  <ShieldCheck className="h-3 w-3" />
                  Cloud Fortified
                </span>
              ) : null}
            </div>
          </div>

          <p className="mt-1 line-clamp-2 h-10 text-sm text-gray-500">{app.summary}</p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {app.category ? (
              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">{app.category}</span>
            ) : null}
            {app.programs
              .filter((item) => item.code !== "CLOUD_FORTIFIED")
              .slice(0, 1)
              .map((item) => (
                <span key={item.code} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {item.label}
                </span>
              ))}
          </div>

          <div className="mt-3 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Download className="h-4 w-4 text-gray-500" />
                  {Math.round(app.installs / 1000)}k installs
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {app.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              By <span className="font-semibold text-gray-600">{app.partnerName}</span>
            </p>
          </div>

          <div className="mt-3 border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
            <CompatibilityBadges app={app} />
            {disabled && disabledLabel ? <span className="text-xs text-gray-500">{disabledLabel}</span> : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
