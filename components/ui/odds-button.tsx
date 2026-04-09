"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface OddsButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  label: ReactNode;
  oddsValue: ReactNode;
  selected?: boolean;
  flash?: "up" | "down" | null;
}

/**
 * Bet365-style odds button. Shows the outcome label (1 / X / 2) with a
 * multiplier-style value underneath. Selected state lights up with a yellow
 * glow shadow, matching the redesign etalon. `flash="up" | "down"` triggers a
 * brief background flash to signal a value change.
 */
export function OddsButton({
  label,
  oddsValue,
  selected = false,
  flash = null,
  className,
  disabled,
  ...props
}: OddsButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1",
        "min-h-[56px] px-3 py-2",
        "rounded-[var(--radius-sm)] border cursor-pointer select-none",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-2",
        selected
          ? "bg-yellow-500 border-yellow-500 text-green-950 shadow-[0_0_0_1px_var(--yellow-500),_0_0_24px_var(--yellow-glow)]"
          : "bg-surface-2 border-border-default text-text-primary hover:bg-surface-3 hover:border-border-strong",
        flash === "up" && "animate-flash-up",
        flash === "down" && "animate-flash-down",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "font-display font-bold text-[13px] leading-none",
          selected ? "text-green-950" : "text-text-secondary"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono font-extrabold text-[16px] leading-none tabular-nums",
          selected ? "text-green-950" : "text-text-primary"
        )}
      >
        {oddsValue}
      </span>
    </button>
  );
}
