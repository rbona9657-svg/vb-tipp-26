import { Skeleton } from "@/components/ui/skeleton";

export default function ScoringLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-3 w-72" />
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[104px] rounded-[var(--radius-lg)]" />
        ))}
      </div>

      {/* Two list sections */}
      {Array.from({ length: 2 }).map((_, s) => (
        <div key={s} className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-6 w-20 rounded-[var(--radius-xs)]" />
          </div>
          <div className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 border-b border-border-subtle last:border-b-0"
              >
                <Skeleton className="h-10 w-10 rounded-[var(--radius-md)]" />
                <Skeleton className="h-3.5 flex-1 max-w-xs" />
                <Skeleton className="h-5 w-10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
