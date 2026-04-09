import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Base skeleton — shimmer gradient using the phase 1 keyframe.
 * Matches the bet365-inspired dark palette with a subtle yellow-tinted sweep.
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-sm)]",
        "bg-surface-2 border border-border-subtle",
        className
      )}
      aria-hidden="true"
      style={style}
    >
      <div
        className="absolute inset-0 animate-[shimmer_2s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255, 204, 0, 0.04) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default overflow-hidden">
      {/* Meta row */}
      <div className="px-4 pt-3 pb-2.5 flex items-center gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      {/* Teams row */}
      <div className="px-5 py-4 border-y border-border-subtle flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-2.5 w-8" />
          </div>
        </div>
        <Skeleton className="h-6 w-10" />
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="flex-1 space-y-1.5 items-end flex flex-col">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-2.5 w-8" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      {/* Odds row */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-14 rounded-[var(--radius-sm)]" />
          <Skeleton className="h-14 rounded-[var(--radius-sm)]" />
          <Skeleton className="h-14 rounded-[var(--radius-sm)]" />
        </div>
        <Skeleton className="h-9 w-full rounded-[var(--radius-sm)]" />
      </div>
    </div>
  );
}

export function LeaderboardRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle last:border-b-0">
      <Skeleton className="h-4 w-6 ml-1" />
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-2.5 w-40" />
      </div>
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-4 rounded-sm" />
    </div>
  );
}

export function PodiumSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 items-end">
      {[0, 1, 2].map((i) => {
        const tall = i === 1;
        return (
          <div
            key={i}
            className={cn(
              "rounded-[var(--radius-lg)] bg-bg-secondary border border-border-default p-5 flex flex-col items-center gap-3",
              tall ? "pt-8" : "pt-7"
            )}
          >
            <Skeleton
              className={cn("rounded-full", tall ? "w-16 h-16" : "w-14 h-14")}
            />
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className={cn("w-20", tall ? "h-7" : "h-5")} />
            <Skeleton className="h-3 w-12" />
          </div>
        );
      })}
    </div>
  );
}
