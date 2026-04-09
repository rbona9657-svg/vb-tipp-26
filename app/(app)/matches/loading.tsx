import { Skeleton, MatchCardSkeleton } from "@/components/ui/skeleton";

export default function MatchesLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="px-4 pt-6 pb-2 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-10 w-44" />
      </div>

      <div className="px-4 pt-4">
        <Skeleton className="h-12 w-full rounded-[var(--radius-md)]" />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3 px-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-9 w-16 shrink-0 rounded-full"
          />
        ))}
      </div>

      <div className="px-4 mb-4">
        <Skeleton className="h-3 w-24" />
      </div>

      <div className="px-4 pb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MatchCardSkeleton />
        <MatchCardSkeleton />
        <MatchCardSkeleton />
        <MatchCardSkeleton />
        <MatchCardSkeleton />
        <MatchCardSkeleton />
      </div>
    </div>
  );
}
