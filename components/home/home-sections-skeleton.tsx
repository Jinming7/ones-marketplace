import { AppCardSkeleton } from "@/components/apps/app-card-skeleton";

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <AppCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomeSectionsSkeleton() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />
        <SkeletonGrid count={8} />
      </section>
      <section className="space-y-4">
        <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-xl border bg-slate-200" />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="h-7 w-44 animate-pulse rounded bg-slate-200" />
        <SkeletonGrid count={4} />
      </section>
    </div>
  );
}
