import { cn } from "@/lib/utils";

type LiveDotSize = "xs" | "sm" | "md";
type LiveDotVariant = "red" | "green" | "yellow";

interface LiveDotProps {
  size?: LiveDotSize;
  variant?: LiveDotVariant;
  label?: string;
  className?: string;
}

const sizeMap: Record<LiveDotSize, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
};

const variantColor: Record<LiveDotVariant, string> = {
  red: "bg-live-red",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

/**
 * Pulsing indicator dot used next to LIVE, countdown, and active state labels.
 * The pulse animation is defined in globals.css (@keyframes live-pulse).
 */
export function LiveDot({
  size = "sm",
  variant = "red",
  label,
  className,
}: LiveDotProps) {
  if (!label) {
    return (
      <span
        className={cn(
          "inline-block rounded-full animate-live-pulse shrink-0",
          sizeMap[size],
          variantColor[variant],
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const labelColor =
    variant === "red"
      ? "text-live-red"
      : variant === "green"
        ? "text-green-500"
        : "text-yellow-500";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-block rounded-full animate-live-pulse shrink-0",
          sizeMap[size],
          variantColor[variant]
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "font-display font-extrabold text-[11px] uppercase tracking-[0.6px]",
          labelColor
        )}
      >
        {label}
      </span>
    </span>
  );
}
