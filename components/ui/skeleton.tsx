import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-bg-tertiary",
        className
      )}
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-xl)] shadow-card overflow-hidden bg-bg-primary">
      <Skeleton className="h-28 rounded-none" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-6" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function LeaderboardRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="w-7 h-5" />
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-5 w-12" />
    </div>
  );
}
