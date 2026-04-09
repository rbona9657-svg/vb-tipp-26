import { Skeleton, MatchCardSkeleton, PodiumSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Hero countdown */}
      <div className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default overflow-hidden">
        <div className="px-6 py-10 flex flex-col items-center gap-5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-3 w-40" />
          <div className="flex gap-3">
            <Skeleton className="h-20 w-20 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 w-20 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 w-20 rounded-[var(--radius-md)]" />
            <Skeleton className="h-20 w-20 rounded-[var(--radius-md)]" />
          </div>
        </div>
      </div>

      {/* Next matches section header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-52" />
          </div>
          <Skeleton className="h-7 w-20 rounded-[var(--radius-sm)]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MatchCardSkeleton />
          <MatchCardSkeleton />
          <MatchCardSkeleton />
        </div>
      </div>

      {/* Podium */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-7 w-24 rounded-[var(--radius-sm)]" />
        </div>
        <PodiumSkeleton />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[88px] rounded-[var(--radius-lg)]" />
        ))}
      </div>
    </div>
  );
}
