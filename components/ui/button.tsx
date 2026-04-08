"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-gold text-white hover:bg-brand-gold-hover active:scale-[0.97] shadow-sm",
  secondary:
    "bg-bg-tertiary text-text-primary hover:bg-surface-active",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-hover",
  outline:
    "bg-transparent border border-border-default text-text-primary hover:border-border-strong hover:bg-surface-hover",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
  md: "h-10 px-5 text-[14px] rounded-[var(--radius-sm)]",
  lg: "h-12 px-6 text-[16px] rounded-[var(--radius-sm)]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
