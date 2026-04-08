"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Meccs, csapat keresése...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 bg-bg-secondary border border-border-subtle rounded-full px-4 py-2.5 transition-all duration-150",
        "focus-within:border-border-strong focus-within:shadow-hover",
        className
      )}
    >
      <Search className="w-4 h-4 text-text-tertiary shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-tertiary outline-none"
      />
    </div>
  );
}
