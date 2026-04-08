"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-subtle pt-[env(safe-area-inset-top)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon-48x48.png"
            alt="VB Tipp '26"
            width={32}
            height={32}
            className="rounded-[6px]"
          />
          <span className="font-mono text-[15px] font-bold text-brand-gold hidden sm:inline">
            VB Tipp &apos;26
          </span>
        </Link>

        {/* Squad pill + theme toggle + avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-bg-secondary rounded-full px-3 py-1.5">
            <span className="text-[11px]">⚡</span>
            <span className="text-[12px] font-medium text-text-secondary">powered by AI Hungary</span>
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-bg-secondary hover:bg-surface-active transition-colors cursor-pointer"
            )}
            aria-label="Téma váltás"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-text-secondary" />
            ) : (
              <Moon className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          <Avatar initials="R" size="sm" rank={1} />
        </div>
      </div>
    </header>
  );
}
