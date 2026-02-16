import Image from "next/image";
import Link from "next/link";
import { Download, Star } from "lucide-react";
import { AppCardModel } from "@/lib/types";

interface AppCardProps {
  app: AppCardModel;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`/apps/${app.key}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex items-start gap-3">
        <Image
          src={app.logoUrl}
          alt={`${app.name} logo`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-xl border border-slate-200 object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-slate-900">{app.name}</h3>
          <p className="text-sm text-slate-500">{app.partnerName}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-6 text-slate-700">{app.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {app.programs.map((program) => (
          <span
            key={program.code}
            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
          >
            {program.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {app.rating.toFixed(1)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Download className="h-4 w-4 text-slate-500" />
          {app.installs.toLocaleString()} installs
        </span>
      </div>
    </Link>
  );
}
