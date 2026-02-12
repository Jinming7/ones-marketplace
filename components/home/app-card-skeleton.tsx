export function AppCardSkeleton() {
  return (
    <article className="rounded-lg border border-gray-300 bg-white p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 animate-pulse rounded-md bg-gray-300/60" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300/60" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-300/50" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-300/40" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-300/40" />
        <div className="h-3 w-4/6 animate-pulse rounded bg-gray-300/40" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300/50" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300/50" />
      </div>
      <div className="mt-5 h-3 w-full animate-pulse rounded bg-gray-300/40" />
      <div className="mt-5 h-9 w-full animate-pulse rounded-md bg-gray-300/60" />
    </article>
  );
}
