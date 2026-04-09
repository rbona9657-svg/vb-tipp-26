import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "gold" | "success" | "error" | "info" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-2 border border-border-default text-text-secondary",
  gold: "bg-yellow-bg border border-yellow-500/40 text-yellow-400",
  success: "bg-[rgba(16,184,110,0.12)] border border-green-500/40 text-green-400",
  error: "bg-[rgba(255,59,59,0.12)] border border-live-red/40 text-live-red",
  info: "bg-[rgba(88,167,224,0.12)] border border-[rgba(88,167,224,0.4)] text-fifa-blue",
  outline: "bg-transparent border border-border-strong text-text-tertiary",
};

/**
 * Small status/label badge — bet365 style with subtle border + bg tint.
 */
export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[var(--radius-xs)]",
        "font-display font-extrabold text-[10px] uppercase tracking-[0.6px] leading-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
