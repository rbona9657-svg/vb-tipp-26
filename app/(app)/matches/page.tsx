"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/ui/search-bar";
import { CategoryPills } from "@/components/ui/category-pills";
import { MatchCard } from "@/components/ui/match-card";
import { MATCHES, TEAMS } from "@/lib/data";

const CATEGORIES = ["Mind", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

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
      {/* Search bar */}
      <div className="px-4 pt-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Category pills */}
      <CategoryPills
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Match grid */}
      <div className="px-4 pb-6">
        <p className="text-[13px] text-text-tertiary mb-4">
          {filtered.length} meccs{filtered.length !== 1 ? "" : ""}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-tertiary text-[14px]">Nincs találat</p>
          </div>
        )}
      </div>
    </div>
  );
}
