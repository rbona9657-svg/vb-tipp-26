import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  rank?: number;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-[12px]",
  md: "w-10 h-10 text-[14px]",
  lg: "w-12 h-12 text-[16px]",
};

function getRankColor(rank?: number) {
  if (rank === 1) return "bg-medal-gold text-white";
  if (rank === 2) return "bg-medal-silver text-white";
  if (rank === 3) return "bg-medal-bronze text-white";
  return "bg-bg-tertiary text-text-secondary";
}

export function Avatar({ initials, size = "md", rank, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold select-none shrink-0",
        sizeStyles[size],
        getRankColor(rank),
        className
      )}
    >
      {initials}
    </div>
  );
}
