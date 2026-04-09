"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Search input — bet365 dark style with yellow focus glow and clearable value.
 */
export function SearchBar({
  placeholder = "Meccs, csapat keresése...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-3",
        "bg-surface-1 border border-border-default rounded-[var(--radius-md)]",
        "transition-all duration-150",
        "focus-within:border-yellow-500 focus-within:shadow-[0_0_0_1px_var(--yellow-500),_0_0_16px_var(--yellow-glow)]",
        className
      )}
    >
      <Search className="w-4 h-4 text-text-tertiary shrink-0" strokeWidth={2.4} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary outline-none font-medium"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="shrink-0 p-1 rounded-full text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
          aria-label="Törlés"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.4} />
        </button>
      )}
    </div>
  );
}
