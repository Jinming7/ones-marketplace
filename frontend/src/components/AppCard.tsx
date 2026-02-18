import Image from "next/image";
import Link from "next/link";
import { Download, Star } from "lucide-react";
import { AppCardModel } from "@/lib/types";

interface AppCardProps {
  app: AppCardModel;
  disabled?: boolean;
  disabledLabel?: string;
}

export function AppCard({ app, disabled = false, disabledLabel }: AppCardProps) {
  const primaryTag = app.programs[0]?.label;

  return (
    <Link
      href={disabled ? "#" : `/apps/${app.key}`}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
      }}
      className={`group relative block cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ${
        disabled ? "opacity-55 grayscale" : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      {app.spotlight ? (
        <span className="absolute right-3 top-3 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
          {app.spotlight}
        </span>
      ) : null}

      <div className="mb-3 flex items-start gap-3">
        <Image
          src={app.logoUrl}
          alt={`${app.name} logo`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-lg bg-gray-50 object-cover p-1"
        />
        <div className="min-w-0 pr-16">
          <h3 className="truncate text-base font-semibold text-gray-900">{app.name}</h3>
          <p className="mt-1 text-xs text-gray-400">{app.partnerName}</p>
          {app.category ? (
            <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              {app.category}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-2 h-10 line-clamp-2 text-sm text-gray-500">{app.summary}</p>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {app.rating.toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Download className="h-4 w-4 text-gray-500" />
              {Math.round(app.installs / 1000)}k
            </span>
          </div>
          <span className="rounded-full border border-blue-100 px-3 py-1 text-xs font-medium text-blue-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {disabled ? "Unavailable" : "Install"}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {primaryTag ? (
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{primaryTag}</span>
          ) : null}
          {disabled && disabledLabel ? <span className="text-xs text-slate-500">{disabledLabel}</span> : null}
        </div>
      </div>
    </Link>
  );
}
