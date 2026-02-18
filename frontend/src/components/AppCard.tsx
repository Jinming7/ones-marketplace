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
      className={`group block cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${
        disabled
          ? "opacity-55 grayscale"
          : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="mb-4 flex items-start gap-3">
        <Image
          src={app.logoUrl}
          alt={`${app.name} logo`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-lg bg-gray-50 object-cover p-1"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">{app.name}</h3>
          {primaryTag ? (
            <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              {primaryTag}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-2 h-10 line-clamp-2 text-sm text-gray-500">{app.summary}</p>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <div className="text-xs text-gray-400">{app.partnerName}</div>
        <div className="mt-2 flex items-center justify-between">
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
        {disabled && disabledLabel ? <p className="mt-2 text-xs text-slate-500">{disabledLabel}</p> : null}
      </div>
    </Link>
  );
}
