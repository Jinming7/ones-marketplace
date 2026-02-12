export function AppCardSkeleton() {
  return (
    <article className="rounded-xl border bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-4 h-8 w-full animate-pulse rounded-md bg-slate-200" />
    </article>
  );
}
