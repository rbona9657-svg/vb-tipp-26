"use client";

import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
  className?: string;
}

/**
 * Horizontal scrollable pill filter — bet365-style dark theme.
 * Active pill uses yellow fill with green-950 text + glow shadow.
 */
export function CategoryPills({
  categories,
  active,
  onSelect,
  className,
}: CategoryPillsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-hide py-3 px-4",
        className
      )}
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full whitespace-nowrap cursor-pointer",
              "font-display font-bold text-[12px] uppercase tracking-[0.5px]",
              "transition-all duration-150 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
              isActive
                ? "bg-yellow-500 text-green-950 shadow-[0_0_0_1px_var(--yellow-500),_0_0_16px_var(--yellow-glow)]"
                : "bg-surface-1 border border-border-default text-text-secondary hover:bg-surface-2 hover:text-text-primary hover:border-border-strong"
            )}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
