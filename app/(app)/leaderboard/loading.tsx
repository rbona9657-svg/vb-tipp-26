import {
  Skeleton,
  LeaderboardRowSkeleton,
  PodiumSkeleton,
} from "@/components/ui/skeleton";

export default function LeaderboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-3 w-64" />
      </div>

      {/* Tabs */}
      <div className="inline-flex gap-1 p-1 rounded-[var(--radius-md)] bg-surface-1 border border-border-default">
        <Skeleton className="h-9 w-28 rounded-[var(--radius-sm)]" />
        <Skeleton className="h-9 w-28 rounded-[var(--radius-sm)]" />
      </div>

      {/* Podium */}
      <div className="pt-3 pb-1">
        <PodiumSkeleton />
      </div>

      {/* Rest of list */}
      <div className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default overflow-hidden">
        <div className="px-4 py-3 border-b border-border-default">
          <Skeleton className="h-3 w-16" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <LeaderboardRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
