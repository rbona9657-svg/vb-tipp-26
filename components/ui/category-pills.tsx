"use client";

import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ categories, active, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3 px-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
            active === cat
              ? "bg-text-primary text-bg-primary"
              : "bg-bg-tertiary text-text-secondary hover:bg-surface-active hover:text-text-primary"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
