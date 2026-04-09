"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  glow?: boolean;
}

const variantStyles: Record<Variant, string> = {
  /**
   * Primary: electric yellow on dark green text — bet365 CTA style.
   * Add `glow` prop for the pulsing yellow glow shadow.
   */
  primary: cn(
    "bg-yellow-500 text-green-950",
    "hover:bg-yellow-400",
    "shadow-[0_0_0_1px_var(--yellow-500),_0_0_16px_rgba(255,204,0,0.25)]",
    "hover:shadow-[0_0_0_1px_var(--yellow-400),_0_0_24px_var(--yellow-glow)]"
  ),
  secondary: cn(
    "bg-surface-2 text-text-primary border border-border-default",
    "hover:bg-surface-3 hover:border-border-strong"
  ),
  ghost: "bg-transparent text-text-primary hover:bg-surface-hover",
  outline: cn(
    "bg-transparent border border-border-strong text-text-primary",
    "hover:border-yellow-500 hover:text-yellow-400"
  ),
  danger: cn(
    "bg-live-red text-white",
    "hover:bg-[#ff5555]",
    "shadow-[0_0_0_1px_var(--live-red),_0_0_16px_var(--live-red-glow)]"
  ),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-[var(--radius-sm)]",
  md: "h-11 px-5 text-[14px] rounded-[var(--radius-sm)]",
  lg: "h-13 px-7 text-[15px] rounded-[var(--radius-sm)] min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "font-display font-bold uppercase tracking-[0.3px]",
        "transition-all duration-150 ease-out cursor-pointer select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        variantStyles[variant],
        sizeStyles[size],
        glow && variant === "primary" && "animate-glow-pulse",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
