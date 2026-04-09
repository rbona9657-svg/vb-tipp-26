import { Skeleton } from "@/components/ui/skeleton";

export default function TournamentLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-7 w-24 rounded-[var(--radius-xs)]" />
      </div>

      {/* Progress */}
      <div className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* Sections */}
      {Array.from({ length: 3 }).map((_, s) => (
        <div
          key={s}
          className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-[var(--radius-md)]" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-2.5 w-44" />
              </div>
            </div>
            <Skeleton className="h-6 w-14 rounded-[var(--radius-xs)]" />
          </div>
          <div className="p-4 grid grid-cols-6 sm:grid-cols-8 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[68px] rounded-[var(--radius-md)]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
