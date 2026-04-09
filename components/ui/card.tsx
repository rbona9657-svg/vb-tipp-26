import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardVariant = "default" | "elevated" | "glow-yellow" | "glow-green" | "glow-red";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg-secondary shadow-card border border-border-default",
  elevated: "bg-bg-secondary shadow-elevated border border-border-default",
  "glow-yellow":
    "bg-bg-secondary border border-yellow-500 shadow-[0_0_0_1px_var(--yellow-500),_0_0_24px_var(--yellow-glow)]",
  "glow-green":
    "bg-bg-secondary border border-green-500 shadow-[0_0_0_1px_var(--green-500),_0_0_24px_rgba(16,184,110,0.3)]",
  "glow-red":
    "bg-bg-secondary border border-live-red shadow-[0_0_0_1px_var(--live-red),_0_0_20px_var(--live-red-glow)]",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export function Card({
  hoverable = false,
  variant = "default",
  padding = "none",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        "transition-all duration-200 ease-out",
        variantStyles[variant],
        paddingStyles[padding],
        hoverable &&
          variant === "default" &&
          "cursor-pointer hover:shadow-hover hover:border-border-strong hover:-translate-y-[2px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-5 pt-5 pb-3 border-b border-border-subtle", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-5 py-3 border-t border-border-subtle", className)}
      {...props}
    >
      {children}
    </div>
  );
}
