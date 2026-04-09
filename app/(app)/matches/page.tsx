"use client";

import { useState, useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { SearchBar } from "@/components/ui/search-bar";
import { CategoryPills } from "@/components/ui/category-pills";
import { MatchCard } from "@/components/ui/match-card";
import { MATCHES, TEAMS } from "@/lib/data";

const CATEGORIES = [
  "Mind",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

function groupLabel(cat: string): string | null {
  if (cat.length === 1 && cat >= "A" && cat <= "L") return cat;
  return null;
}

export default function MatchesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Mind");

  const filtered = useMemo(() => {
    let list = MATCHES;

    const group = groupLabel(activeCategory);
    if (group) {
      list = list.filter((m) => m.group === group);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          TEAMS[m.home]?.name.toLowerCase().includes(q) ||
          TEAMS[m.away]?.name.toLowerCase().includes(q) ||
          m.home.toLowerCase().includes(q) ||
          m.away.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q)
      );
    }

    return list;
  }, [search, activeCategory]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* ─── Header ─── */}
      <div className="px-4 pt-6 pb-2">
        <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-1">
          Meccsek
        </p>
        <h1 className="font-display font-black text-[32px] sm:text-[40px] tracking-tight text-text-primary leading-none">
          Tippeld meg.
        </h1>
      </div>

      {/* ─── Search ─── */}
      <div className="px-4 pt-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* ─── Category pills ─── */}
      <CategoryPills
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* ─── Results meta ─── */}
      <div className="px-4 flex items-center gap-2 mb-4">
        <CalendarDays className="w-3.5 h-3.5 text-text-tertiary" />
        <span className="font-mono font-bold text-[12px] text-text-primary">
          {filtered.length}
        </span>
        <span className="font-display font-bold text-[11px] uppercase tracking-[0.6px] text-text-tertiary">
          meccs {activeCategory !== "Mind" && `· ${activeCategory} csoport`}
        </span>
      </div>

      {/* ─── Match grid ─── */}
      <div className="px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-2 border border-border-default mb-3">
              <CalendarDays className="w-6 h-6 text-text-tertiary" />
            </div>
            <p className="font-display font-bold text-[14px] text-text-primary">
              Nincs találat
            </p>
            <p className="text-[12px] text-text-tertiary mt-1">
              Próbáld más szűrővel vagy kereséssel
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
